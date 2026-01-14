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
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Welcome back</CardTitle>
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
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-slate-200">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm text-purple-400 underline-offset-4 hover:text-purple-300 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={login.password}
                  onChange={(e) => login.setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
                  required 
                />
              </Field>
              {login.error && <p className="text-red-400 text-sm">{login.error}</p>}
              <Field>
                <Button 
                  type="submit"
                  disabled={login.loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                  {login.loading ? "Connexion..." : "Login"}
                </Button>
                <FieldDescription 
                  className="text-center text-slate-400 hover:text-slate-300 cursor-pointer"
                  onClick={() => {
                    router.push("/signup");
                  }}>
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
