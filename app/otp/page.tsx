"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { OTPForm } from "@/components/otp-form"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function OTPPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""
  const mode = searchParams.get("mode") || ""
  
  console.log("OTPPage - email:", email, "mode:", mode)

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xs flex-col gap-6">
        <OTPForm email={email} mode={mode} />
      </div>
    </div>
  )
}

