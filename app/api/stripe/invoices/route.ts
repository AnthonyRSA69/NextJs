import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function GET() {
  try {
    const invoices = await stripe.invoices.list({ limit: 10 });
    return NextResponse.json({ invoices: invoices.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des factures" }, { status: 500 });
  }
}
