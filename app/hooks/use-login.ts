import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useLogin() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Erreur de connexion")
                return
            }

            router.push("/dashboard")
        } catch (err) {
            setError("Erreur serveur")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
    }
}