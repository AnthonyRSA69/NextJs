"use client"

import { cn } from "@/lib/utils"
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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForgotPassword } from "@/app/hooks/use-forgot-password"
import { useRouter } from "next/navigation"


export function ForgotPasswordForm ({
  className,
  ...props
}: React.ComponentProps<"div">) {  
  const router = useRouter();
  const ForgotPassword = useForgotPassword();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mot de passe oublié</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={ForgotPassword.handleForgotPassword}>{}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-slate-200">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={ForgotPassword.email}
                  onChange={(e) => ForgotPassword.setEmail(e.target.value)}
                  placeholder="m@example.com"
                  disabled={ForgotPassword.loading}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </Field>
              <Field>
                <Button 
                  type="submit"
                  disabled={ForgotPassword.loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                  >{ForgotPassword.loading ? "Envoie du code..." : "Envoyer le code"}
                </Button>
                <FieldDescription 
                  className="text-center text-slate-400 hover:text-slate-300 cursor-pointer"
                  >
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
