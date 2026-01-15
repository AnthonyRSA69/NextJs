import { useState } from "react"
import { useRouter } from "next/navigation"

export function useResetPassword() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        
        setLoading(true)
        setError("")

        try {
            //On va update la bdd si tout est ok
            const response = await fetch("/api/auth/password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, confirmPassword }),
            })

            console.log("Status:", response.status)

            const data = await response.json()
            console.log("Réponse:", data)

            if (!response.ok) {
                if (response.status === 400 && data.validation) {
                    console.log("Erreurs de validation:", data.validation)
                    // Afficher le premier message d'erreur de validation
                    const firstError = data.validation[0];
                    setError(firstError.message || "Erreur de validation");
                    return
                }
                
                setError(data.message || "Erreur lors de la réinitialisation")
                return
            }

            console.log("Reinitialisation réussie")
            // On retourne sur login
            router.push(`/login`)

        } catch (err: any) {
            console.error("Erreur:", err)
            setError("Erreur de connexion au serveur")
        } finally {
            setLoading(false)
        }
    }
    
    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        error,
        handleResetPassword,
    }
}