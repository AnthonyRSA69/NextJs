// STRIPE Checkout API
import Stripe from "stripe";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(request: Request) {
  try {
    let customerEmail: string | undefined = undefined;
    let customerId: string | undefined = undefined;

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

        }
      }
    }
    if (customerEmail) {

      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
  
        const customer = await stripe.customers.create({ email: customerEmail });
        customerId = customer.id;
      }
    }

    const sessionParams: any = {
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
    };
    if (customerId) {
      sessionParams.customer = customerId;
    } else if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }
    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE CHECKOUT ERROR]", error);
    if (error && error.stack) {
      console.error("[STRIPE CHECKOUT ERROR STACK]", error.stack);
    }
    return NextResponse.json(
      { error: "Erreur Stripe", details: error?.message || error },
      { status: 500 }
    );
  }
}