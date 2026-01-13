"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function useRegister() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Erreur de connexion")
                return
            }

            router.push("/login")
        } catch (err) {
            setError("Erreur serveur")
            console.error(err)
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
        loading,
        error,
        handleRegister,
    }
}

/*import { useState } from 'react';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Erreur lors de l'inscription");
        return null;
      }

      console.log("✅ Utilisateur créé:", json);
      return json;
      
    } catch (err) {
      console.error("❌ Erreur:", err);
      setError("Erreur de connexion au serveur");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
}*/