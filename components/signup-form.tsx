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
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={register.handleRegister}> {}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input 
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={register.firstName}
                  onChange={(e) => register.setFirstName(e.target.value)}
                  placeholder="John" 
                  disabled={register.loading}
                  required 
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input 
                  id="lastName"
                  name="lastName"
                  type="text" 
                  value={register.lastName}
                  onChange={(e) => register.setLastName(e.target.value)}
                  placeholder="Doe"
                  disabled={register.loading}
                  required 
                />
              </Field>
              
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={register.email}
                  onChange={(e) => register.setEmail(e.target.value)}
                  placeholder="m@example.com"
                  disabled={register.loading}
                  required
                />
              </Field>
              
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      value={register.password}
                      onChange={(e) => register.setPassword(e.target.value)}
                      disabled={register.loading}
                      required 
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input 
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={register.confirmPassword}
                      onChange={(e) => register.setConfirmPassword(e.target.value)}
                      disabled={register.loading}
                      required 
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={register.loading}
                  className="w-full"
                >
                  {register.loading ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login" className="underline">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}