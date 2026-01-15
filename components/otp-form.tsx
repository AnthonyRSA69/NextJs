"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOTP } from "@/app/hooks/use-otp"

interface OTPFormProps {
  email: string
  mode  : string
  onSuccess?: () => void
}

export function OTPForm({ email, mode, onSuccess, ...props }: OTPFormProps & React.ComponentProps<typeof Card>) {
  const otpCode  = useOTP(email)

  console.log("OTPForm - mode:", mode, "success:", otpCode.success)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("OTPForm - submitting with email:", email, "code:", otpCode.code)
    await otpCode.verify()
    if (otpCode.success && onSuccess) {
      onSuccess()
    }
  }

  if (otpCode.success && mode === "reset") {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white" {...props}>
        <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-400">✓ Succès!</CardTitle>
        <CardDescription className="text-slate-400">Vous allez être redirigée vers la page de reinitialisation de votre mdp</CardDescription>
        </CardHeader>
        <CardContent>
          <a 
          href="/reset-password" 
          className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded">
            Se connecter
          </a>
        </CardContent>
      </Card>
    )
  }

  if (otpCode.success) {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white" {...props}>
        <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-400">✓ Succès!</CardTitle>
        <CardDescription className="text-slate-400">Votre compte a été créé avec succès</CardDescription>
        </CardHeader>
        <CardContent>
          <a href="/login" className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded">
            Se connecter
          </a>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white" {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vérifier votre email</CardTitle>
        <CardDescription className="text-slate-400">Code envoyé à {email}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <InputOTP 
                maxLength={6} 
                value={otpCode.code}
                onChange={otpCode.setCode}
                disabled={otpCode.loading}
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:bg-slate-700 *:data-[slot=input-otp-slot]:border-slate-600 *:data-[slot=input-otp-slot]:text-white *:data-[slot=input-otp-slot]:focus:border-purple-500 *:data-[slot=input-otp-slot]:focus:ring-purple-500">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {otpCode.error && <FieldDescription className="text-center text-red-400 mt-2">{otpCode.error}</FieldDescription>}
            </Field>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              disabled={otpCode.loading || otpCode.code.length !== 6}
            >
              {otpCode.loading ? "Vérification en cours..." : "Vérifier"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

