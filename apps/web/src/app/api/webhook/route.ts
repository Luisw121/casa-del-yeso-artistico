import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export const runtime = "nodejs";

// Necesario: Stripe envía el body como raw bytes para verificar la firma
export async function POST(req: Request) {
  const stripe = getStripeServer();
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const userId = session.metadata?.userId;
    const itemsRaw = session.metadata?.items ?? null;
    const total = (session.amount_total ?? 0) / 100;
    const stripeSessionId = session.id;

    if (!userId || total <= 0) {
      return NextResponse.json({ received: true });
    }

    try {
      // Idempotente: no crear duplicados si el success page ya lo creó
      await db.order.upsert({
        where: { stripeSessionId },
        create: {
          userId,
          total,
          stripeSessionId,
          notes: itemsRaw,
          status: "PENDIENTE",
        },
        update: {},
      });
    } catch (err) {
      console.error("Error saving order from webhook:", err);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
