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
import { useRegister } from "@/app/hooks/use-register"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const register = useRegister()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Créer votre compte</CardTitle>
          <CardDescription className="text-slate-400">
            Entrez vos informations ci-dessous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={register.handleRegister}> {}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName" className="text-slate-200">Prénom</FieldLabel>
                <Input 
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={register.firstName}
                  onChange={(e) => register.setFirstName(e.target.value)}
                  placeholder="Jean" 
                  disabled={register.loading}
                  className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                  required 
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="lastName" className="text-slate-200">Nom</FieldLabel>
                <Input 
                  id="lastName"
                  name="lastName"
                  type="text" 
                  value={register.lastName}
                  onChange={(e) => register.setLastName(e.target.value)}
                  placeholder="Dupont"
                  disabled={register.loading}
                  className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                  required 
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="email" className="text-slate-200">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={register.email}
                  onChange={(e) => register.setEmail(e.target.value)}
                  placeholder="m@example.com"
                  disabled={register.loading}
                  className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                  required
                />
              </Field>
              
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" className="text-slate-200">Mot de passe</FieldLabel>
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      value={register.password}
                      onChange={(e) => register.setPassword(e.target.value)}
                      disabled={register.loading}
                      className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                      required 
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password" className="text-slate-200">
                      Confirmer
                    </FieldLabel>
                    <Input 
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={register.confirmPassword}
                      onChange={(e) => register.setConfirmPassword(e.target.value)}
                      disabled={register.loading}
                      className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                      required 
                    />
                  </Field>
                </Field>
                <FieldDescription className="text-slate-400">
                  Minimum 8 caractères
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={register.loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold transition-all duration-200"
                >
                  {register.loading ? "Création en cours..." : "Créer un compte"}
                </Button>
                <FieldDescription className="text-center text-slate-400 hover:text-slate-300 cursor-pointer transition-colors duration-200">
                  Vous avez déjà un compte? <a href="/login" className="text-purple-400 hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] underline transition-all duration-200">Se connecter</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}