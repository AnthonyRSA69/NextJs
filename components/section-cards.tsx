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
    <div className="*:data-[slot=card]:from-purple-900/40 *:data-[slot=card]:to-slate-900/40 *:data-[slot=card]:border-purple-400/30 *:data-[slot=card]:hover:border-purple-400/50 *:data-[slot=card]:hover:shadow-purple-500/20 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-lg *:data-[slot=card]:backdrop-blur-sm *:data-[slot=card]:transition-all *:data-[slot=card]:duration-300 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-purple-200">Fonctionnalités premium</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-white @[250px]/card:text-3xl">
            Accès Premium
            <IconCrown className="size-5 text-yellow-500" />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">PRO</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-3 text-sm">
          <p className="text-purple-200/80">
            Débloquez toutes les fonctionnalités avancées de la plateforme.
          </p>
          <Button onClick={handleStripeCheckout} className="cursor-pointer bg-purple-600 hover:bg-purple-500 hover:shadow-md hover:shadow-purple-500/30 transition-all duration-200">
            Payer
          </Button>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-purple-200">Nouveaux Clients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-white @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="cursor-pointer">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-100">
            Baisse de 20% cette période <IconTrendingDown className="size-4" />
          </div>
          <div className="text-purple-200/70">
            L'acquisition nécessite une attention
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-purple-200">Comptes Actifs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-white @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="cursor-pointer">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-100">
            Bonne rétention d'utilisateurs <IconTrendingUp className="size-4" />
          </div>
          <div className="text-purple-200/70">
            L'engagement dépasse les objectifs
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-purple-200">Taux de Croissance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-white @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="cursor-pointer">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-100">
            Augmentation stable des performances <IconTrendingUp className="size-4" />
          </div>
          <div className="text-purple-200/70">
            Conforme aux projections de croissance
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}