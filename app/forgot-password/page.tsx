import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {<ForgotPasswordForm />}
      </div>
    </div>
  )
}
