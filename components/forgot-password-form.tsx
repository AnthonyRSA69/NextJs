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
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
// import { useForgotPassword } from "@/app/hooks/use-forgot-password"
import Link from "next/link"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const forgotPassword = useForgotPassword()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Mot de passe oublié</CardTitle>
          <CardDescription>
            Entrez votre email pour recevoir un lien de réinitialisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {forgotPassword.success ? (
            <div className="space-y-4">
              <p className="text-green-600 text-center">
                Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.
              </p>
              {forgotPassword.resetUrl && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">
                    Mode développement - Lien de réinitialisation :
                  </p>
                  <Link 
                    href={forgotPassword.resetUrl} 
                    className="text-sm text-primary underline break-all"
                  >
                    {forgotPassword.resetUrl}
                  </Link>
                </div>
              )}
              <div className="text-center">
                <Link href="/login" className="text-sm underline-offset-4 hover:underline">
                  Retour à la connexion
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={forgotPassword.handleForgotPassword}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={forgotPassword.email}
                    onChange={(e) => forgotPassword.setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                {forgotPassword.error && (
                  <p className="text-red-500 text-sm">{forgotPassword.error}</p>
                )}
                <Field>
                  <Button type="submit" disabled={forgotPassword.loading}>
                    {forgotPassword.loading ? "Envoi..." : "Envoyer le lien"}
                  </Button>
                  <FieldDescription className="text-center">
                    <Link href="/login" className="underline-offset-4 hover:underline">
                      Retour à la connexion
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
