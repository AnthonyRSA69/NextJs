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
            const forgotmdp  = await fetch("/api/auth/forgot-opassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            if (!forgotmdp .ok) {}
        }
        catch (err) {
        }
    }
    return {
        email,
        setEmail,
        loading,
        setLoading,
        error,
        setError,
    }
}