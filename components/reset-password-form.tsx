"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useResetPassword } from "@/app/hooks/use-reset-password"
import { useRouter } from "next/navigation"


export function ResetPasswordForm ({
  className,
  ...props
}: React.ComponentProps<"div">) {  
  const router = useRouter();
  const ResetPassword = useResetPassword();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mot de passe oublié</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={ResetPassword.handleResetPassword}>{}
            <FieldGroup>
              <Field>
                  <Field>
                    <FieldLabel htmlFor="password" className="text-slate-200">Email</FieldLabel>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={ResetPassword.email}
                      onChange={(e) => ResetPassword.setEmail(e.target.value)}
                      disabled={ResetPassword.loading}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                      required 
                    />
                    <FieldLabel htmlFor="password" className="text-slate-200">Nouveau Mot de passe</FieldLabel>
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      value={ResetPassword.password}
                      onChange={(e) => ResetPassword.setPassword(e.target.value)}
                      disabled={ResetPassword.loading}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                      required 
                    />
                    <FieldLabel htmlFor="password" className="text-slate-200">Confirmer le mot de passe</FieldLabel>
                    <Input 
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={ResetPassword.confirmPassword}
                      onChange={(e) => ResetPassword.setConfirmPassword(e.target.value)}
                      disabled={ResetPassword.loading}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                      required 
                    />
                  </Field>
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={ResetPassword.loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                  >
                    {ResetPassword.loading ? "Reinitialisation en cours..." : "Reinitialiser le mot de passe"}
                  </Button>
                </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
