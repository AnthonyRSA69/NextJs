"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IRegister } from "../interfaces/users"
import { useOTP } from "./use-otp"

interface ValidationError {
    error: boolean
    message: string
    code: string
}

export function useRegister() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        
        setLoading(true)
        setError("")
        setValidationErrors([])

        const formData: IRegister = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }

        try {            
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })


            const data = await response.json()

            if (!response.ok) {
                if (response.status === 400 && data.validation) {
                    const messages = data.validation.map((err: ValidationError) => err.message)                    
                    setValidationErrors(messages)
                    setError("Veuillez corriger les erreurs ci-dessus")
                    return
                }
                
                setError(data.message || "Erreur lors de l'inscription")
                return
            }

            console.log("Inscription réussie, OTP envoyé")
            router.push(`/otp?email=${email}`)

        } catch (err: any) {
            console.error("Erreur:", err)
            setError("Erreur de connexion au serveur")
        } finally {
            setLoading(false)
        }
    }
    
    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        error,
        validationErrors,
        handleRegister,
    }
}