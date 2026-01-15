import Stripe from "stripe";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Récupère l'email de l'utilisateur depuis le token
function getEmailFromToken(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) return null;

  try {
    const decoded: any = jwt.verify(tokenMatch[1], process.env.JWT_SECRET || "cle-secrete");
    return decoded?.email || null;
  } catch (e) {
    return null;
  }
}

// GET - Récupère les abonnements de l'utilisateur
export async function GET(request: Request) {
  try {
    const email = getEmailFromToken(request);
    if (!email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length === 0) {
      return NextResponse.json({ subscriptions: [] });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      limit: 10,
    });

    return NextResponse.json({ subscriptions: subscriptions.data });
  } catch (error: any) {
    console.error("[STRIPE ERROR]", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des abonnements" },
      { status: 500 }
    );
  }
}

// POST - Réactive un abonnement en annulation
export async function POST(request: Request) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "subscriptionId requis" }, { status: 400 });
    }

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    return NextResponse.json({ subscription, message: "Abonnement réactivé" });
  } catch (error: any) {
    console.error("[STRIPE ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la réactivation" },
      { status: 500 }
    );
  }
}

// DELETE - Annule un abonnement
export async function DELETE(request: Request) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "subscriptionId requis" }, { status: 400 });
    }

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({ subscription, message: "Abonnement annulé" });
  } catch (error: any) {
    console.error("[STRIPE ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'annulation" },
      { status: 500 }
    );
  }
}
