// STRIPE Invoice API
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function DELETE(req: Request) {
  try {
    const { invoiceId } = await req.json();
    if (!invoiceId) {
      return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
    }
    // Récupérer la facture pour connaître son statut
    const invoice = await stripe.invoices.retrieve(invoiceId);
    if (invoice.status === "draft") {
      // Les factures draft peuvent être supprimées
      await stripe.invoices.del(invoiceId);
      return NextResponse.json({ deleted: true });
    } else if (invoice.status === "open") {
      // Les factures open peuvent être annulées
      const voided = await stripe.invoices.voidInvoice(invoiceId);
      return NextResponse.json({ invoice: voided });
    } else {
      return NextResponse.json({ error: `Impossible de supprimer une facture au statut '${invoice.status}'.` }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.sessionId) {
      const session = await stripe.checkout.sessions.retrieve(body.sessionId);
      if (!session.customer) {
        return NextResponse.json({ error: "Aucun client lié à la session Stripe." }, { status: 400 });
      }
      await stripe.invoiceItems.create({
        customer: session.customer as string,
        price_data: {
            currency: "usd",
            product: process.env.STRIPE_PRODUCT_ID ?? "",
            unit_amount: 2000,
        },
        quantity: 1,
      });
      const invoice = await stripe.invoices.create({
        customer: session.customer as string,
        auto_advance: true,
      });
      return NextResponse.json({ invoice });
    }
    const { paymentId } = body;
    if (paymentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
      if (!paymentIntent.customer) {
        return NextResponse.json({ error: "Aucun client lié au paiement." }, { status: 400 });
      }
      await stripe.invoiceItems.create({
        customer: paymentIntent.customer as string,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        description: "Facture générée pour le paiement Stripe",
      });
      const invoice = await stripe.invoices.create({
        customer: paymentIntent.customer as string,
        auto_advance: true,
      });
      return NextResponse.json({ invoice });
    }
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
