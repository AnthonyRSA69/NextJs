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
import { useEffect, useState } from "react"


export function CalculatriceForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const[nombre1, setNombre1] = useState(0);
    const[nombre2, setNombre2] = useState(0);
    const[resultat, setResult] = useState(0);

    const nombre_1 = (e:any) => {
      setNombre1(Number(e.target.value));
    }
    const nombre_2 = (e:any) => {
      setNombre2(Number(e.target.value));
    }   

  useEffect(() => {
    setResult(nombre1 + nombre2);
    console.log("Resultat: ", resultat);
  }, [nombre1, nombre2])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form>
            <Field>
                <FieldLabel htmlFor="nombre1">Nombre 1</FieldLabel>
                    <Input
                    id="nombre1"
                    type="number"
                    value={nombre1}
                    onChange={nombre_1}
                    placeholder="Entrez le premier nombre"
                    />
            </Field>
            <Field>
                <FieldLabel htmlFor="nombre2">Nombre 2</FieldLabel>
                    <Input
                    id="nombre2"
                    type="number"
                    value={nombre2}
                    onChange={nombre_2}
                    placeholder="Entrez le deuxième nombre"
                    />
            </Field>
            <Field>
                <Button type="button">Calculer</Button>
            </Field>
            <div>Résultat: {resultat}</div>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
