import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 10 });
    return NextResponse.json({ payments: payments.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des paiements" }, { status: 500 });
  }
}
