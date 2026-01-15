/*"use client"

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
// import { useResetPassword } from "@/app/hooks/use-reset-password"
import Link from "next/link"

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  token: string
}

export function ResetPasswordForm({
  className,
  token,
  ...props
}: ResetPasswordFormProps) {
  const resetPassword = useResetPassword(token)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resetPassword.success ? (
            <div className="space-y-4">
              <p className="text-green-600 text-center">
                Password reset successfully! Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={resetPassword.handleResetPassword}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={resetPassword.password}
                    onChange={(e) => resetPassword.setPassword(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={resetPassword.confirmPassword}
                    onChange={(e) => resetPassword.setConfirmPassword(e.target.value)}
                    required
                  />
                  <FieldDescription>
                    Must contain at least 8 characters.
                  </FieldDescription>
                </Field>
                {resetPassword.error && (
                  <p className="text-red-500 text-sm">{resetPassword.error}</p>
                )}
                <Field>
                  <Button type="submit" disabled={resetPassword.loading}>
                    {resetPassword.loading ? "Resetting..." : "Reset"}
                  </Button>
                  <FieldDescription className="text-center">
                    <Link href="/login" className="underline-offset-4 hover:underline">
                      Back to login
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
*/