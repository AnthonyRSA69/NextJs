/*"use client"

import { ResetPasswordForm } from "@/components/reset-password-form"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  if (!token) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="text-center">
            <p className="text-red-600">Lien de réinitialisation invalide ou expiré.</p>
            <a href="/forgot-password" className="text-blue-600 hover:underline mt-4 inline-block">
              Demander un nouveau lien
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
*/