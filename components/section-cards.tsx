"use client"

import { IconTrendingDown, IconTrendingUp, IconCrown } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SectionCards() {
  const handleStripeCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } 

  return (
    <div className="flex justify-center px-4 lg:px-6">

      <Card className="@container/card w-full max-w-md from-purple-900/40 to-slate-900/40 border-purple-400/30 hover:border-purple-400/50 hover:shadow-purple-500/20 bg-linear-to-t shadow-lg backdrop-blur-sm transition-all duration-300">
        <CardHeader className="text-center">
          <CardDescription className="text-purple-200">Fonctionnalités premium</CardDescription>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold text-white @[250px]/card:text-3xl">
            Accès Premium
            <IconCrown className="size-5 text-yellow-500" />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">PRO</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-center gap-3 text-sm">
          <p className="text-purple-200/80 text-center">
            Débloquez toutes les fonctionnalités avancées de la plateforme.
          </p>
          <p className="text-3xl font-bold text-white">20€ <span className="text-base font-normal text-purple-300">/ mois</span></p>
          <Button onClick={handleStripeCheckout} className="cursor-pointer bg-purple-600 hover:bg-purple-500 hover:shadow-md hover:shadow-purple-500/30 transition-all duration-200">
            Payer maintenant
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}