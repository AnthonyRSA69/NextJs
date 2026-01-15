"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from "react"
import { useSubscription } from "@/app/hooks/use-subscription"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Formate une date Stripe en français
const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
  
export default function Page() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const { getSubscriptions, cancelSubscription, loading: subLoading } = useSubscription();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subs = await getSubscriptions();
        setSubscriptions(subs);
      } catch (err) {
        toast.error("Erreur lors du chargement des abonnements");
      }
    };
    fetchSubscriptions();
  }, [getSubscriptions]);

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler votre abonnement?")) return;
    
    try {
      await cancelSubscription(subscriptionId);
      toast.success("Abonnement annulé");
      const updated = subscriptions.map(s => 
        s.id === subscriptionId ? { ...s, cancel_at_period_end: true } : s
      );
      setSubscriptions(updated);
    } catch (err) {
      toast.error("Erreur lors de l'annulation");
    }
  };

  const handleReactivateSubscription = async (subscriptionId: string) => {
    try {
      await fetch("/api/stripe/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });
      toast.success("Abonnement réactivé");
      const updated = subscriptions.map(s => 
        s.id === subscriptionId ? { ...s, cancel_at_period_end: false } : s
      );
      setSubscriptions(updated);
    } catch (err) {
      toast.error("Erreur lors de la réactivation");
    }
  };

  return (
    <div className="dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-svh">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
                {subscriptions.length > 0 && (
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-400/30 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Abonnements actifs</h2>
                    <div className="space-y-4">
                      {subscriptions.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-purple-400/20">
                          <div>
                            <p className="text-white font-semibold">
                              {sub.items.data[0]?.price?.product?.name || "Abonnement"}
                            </p>
                            <p className="text-purple-200 text-sm">
                              Statut: <span className="capitalize">{sub.status}</span>
                            </p>
                            {sub.cancel_at_period_end && sub.cancel_at && (
                              <p className="text-red-400 text-sm">
                                ⚠️ Annulation le {formatDate(sub.cancel_at)}
                              </p>
                            )}
                          </div>
                          {sub.cancel_at_period_end ? (
                            <Button
                              onClick={() => handleReactivateSubscription(sub.id)}
                              disabled={subLoading}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              {subLoading ? "Réactivation..." : "Réactiver"}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleCancelSubscription(sub.id)}
                              disabled={subLoading}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              {subLoading ? "Annulation..." : "Résilier"}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                
                <SectionCards />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
