"use client"
import { useState } from "react";

export function useOTP(email: string) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function send() {
    await fetch("/api/auth/otp/send", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async function verify() {
    if (code.length !== 6) {
      setError("Le code doit avoir 6 chiffres")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/otp/verify", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Code incorrect")
        return
      }

      setSuccess(true)
    } catch (err) {
      setError("Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  return { 
    email, 
    code, 
    setCode,
    loading, 
    error, 
    success,
    send, 
    verify
  };
}