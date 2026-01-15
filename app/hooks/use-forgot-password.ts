import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useForgotPassword() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const forgotmdp  = await fetch("/api/auth/password-forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            if (!forgotmdp.ok) {}
        }
        catch (err) {
        }
        
        // on envoie sur la page de l'otp avec l'email et le mode à reset 
        // afin de bien aller sur reset apres la validation du code et pas sur login
        router.push(`/otp?email=${email}&mode=reset`)
    }
    return {
        email,
        setEmail,
        loading,
        setLoading,
        error,
        setError,
        handleForgotPassword,
    }
}