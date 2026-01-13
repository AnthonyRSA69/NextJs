"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const handlePayment = async () => {
    const res = await fetch("api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Accédez aux fonctionnalités premium</p>
          <Button onClick={handlePayment}>
            Payer avec Stripe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}