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
import { useCalcul } from "../app/hooks/use-calculatrice"

export function CalculatriceForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
const calcul = useCalcul();
  //   const[nombre1, setNombre1] = useState(0);
  //   const[nombre2, setNombre2] = useState(0);
  //   const[resultat, setResult] = useState(0);

  //   const nombre_1 = (e:any) => {
  //     setNombre1(Number(e.target.value));
  //   }
  //   const nombre_2 = (e:any) => {
  //     setNombre2(Number(e.target.value));
  //   }   

  // useEffect(() => {
  //   setResult(nombre1 + nombre2);
  //   console.log("Resultat: ", resultat);
  // }, [nombre1, nombre2])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <div style={{ marginTop: "20px" }}>
            <strong>Résultat: {calcul.result}</strong>
          </div>
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "10px" }}>
              <Button id="button7" type="button" onClick={() => calcul.handleNumberClick(7)}>7</Button>
              <Button id="button8" type="button" onClick={() => calcul.handleNumberClick(8)}>8</Button>
              <Button id="button9" type="button" onClick={() => calcul.handleNumberClick(9)}>9</Button>
              <Button id="buttonC" type="button" style={{backgroundColor: "red" }} onClick={calcul.clear}>C</Button>
              <Button id="button4" type="button" onClick={() => calcul.handleNumberClick(4)}>4</Button>
              <Button id="button5" type="button" onClick={() => calcul.handleNumberClick(5)}>5</Button>
              <Button id="button6" type="button" onClick={() => calcul.handleNumberClick(6)}>6</Button>
              <Button id="buttondiv" type="button" onClick={calcul.button3Click}>/</Button>
              <Button id="button1" type="button" onClick={() => calcul.handleNumberClick(1)}>1</Button>
              <Button id="button2" type="button" onClick={() => calcul.handleNumberClick(2)}>2</Button>
              <Button id="button3" type="button" onClick={() => calcul.handleNumberClick(3)}>3</Button>
              <Button id="buttonfois" type="button" onClick={calcul.button4Click}>*</Button>
              <Button id="button0" type="button" style={{gridColumn: "span 2" }} onClick={() => calcul.handleNumberClick(0)}>0</Button>
              <Button id="buttonegal" type="button" onClick={calcul.handleEquals}>=</Button>
              <Button id="buttonplus" type="button" onClick={calcul.button1Click}>+</Button>
            </div>
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
