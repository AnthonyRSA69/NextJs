"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IRegister } from "../interfaces/users"

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
            console.log("Envoi:", { ...formData, password: "***", confirmPassword: "***" })
            
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            console.log("Status:", response.status)

            const data = await response.json()
            console.log("Réponse:", data)

            if (!response.ok) {
                if (response.status === 400 && data.validation) {
                    console.log("Erreurs de validation:", data.validation)
                    
                    // Extraction des messages depuis les objets
                    const messages = data.validation.map((err: ValidationError) => err.message)
                    console.log("Messages extraits:", messages)
                    
                    setValidationErrors(messages)
                    setError("Veuillez corriger les erreurs ci-dessous")
                    return
                }
                
                setError(data.message || "Erreur lors de l'inscription")
                return
            }

            console.log("Inscription réussie")
            router.push("/login?registered=true")
            
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