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
import { useLogin } from "@/app/hooks/use-login"
import { useRouter } from "next/navigation"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {  
  const login = useLogin();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Bienvenue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={login.handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-slate-200">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={login.email}
                  onChange={(e) => login.setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-slate-200">Password</FieldLabel>
                  <a
                    href="/password-forgot"
                    className="ml-auto text-sm text-purple-400 underline-offset-4 hover:text-purple-300 hover:underline hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-200"
                  >
                    Mot de passe oublié?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={login.password}
                  onChange={(e) => login.setPassword(e.target.value)}
                  className="bg-slate-700/80 border-slate-600 text-white placeholder:text-slate-400 hover:bg-slate-600/80 hover:border-purple-400/50 focus:bg-slate-600/80 focus:border-purple-500 focus:ring-purple-500/30 transition-all duration-200"
                  required 
                />
              </Field>
              {login.error && <p className="text-red-400 text-sm">{login.error}</p>}
              <Field>
                <Button 
                  type="submit"
                  disabled={login.loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold transition-all duration-200">
                  {login.loading ? "Connexion en cours..." : "Se connecter"}
                </Button>
                <FieldDescription 
                  className="text-center text-slate-400 hover:text-slate-300 cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    router.push("/signup");
                  }}>
                  Pas encore de compte? <a href="/signup" className="text-purple-400 hover:text-pink-400 underline-offset-4 hover:underline transition-all duration-200">S&apos;inscrire</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
