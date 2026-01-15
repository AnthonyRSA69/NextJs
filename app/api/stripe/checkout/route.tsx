import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    let customerEmail: string | undefined = undefined;
    let customerId: string | undefined = undefined;
    // Try to get JWT from cookies
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const tokenMatch = cookieHeader.match(/token=([^;]+)/);
      if (tokenMatch) {
        const token = tokenMatch[1];
        try {
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
          if (decoded && decoded.email) {
            customerEmail = decoded.email;
          }
        } catch (e) {
          // Invalid token, ignore
        }
      }
    }

    // If we have an email, try to find or create a Stripe customer
    if (customerEmail) {
      // Try to find existing customer
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        // Create new customer
        const customer = await stripe.customers.create({ email: customerEmail });
        customerId = customer.id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Abonnement Premium",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/cancel`,
      ...(customerId ? { customer: customerId } : {}),
      ...(customerEmail ? { customer_email: customerEmail } : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur Stripe" },
      { status: 500 }
    );
  }
}