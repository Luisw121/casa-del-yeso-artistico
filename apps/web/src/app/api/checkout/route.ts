import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { items, successUrl, cancelUrl } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      // Apple Pay y Google Pay se habilitan automáticamente via Stripe
      line_items: items.map((item: { name: string; price: number; quantity: number; image?: string }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            ...(item.image && { images: [item.image] }),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: successUrl ?? `${process.env.NEXTAUTH_URL}/checkout/success`,
      cancel_url: cancelUrl ?? `${process.env.NEXTAUTH_URL}/tienda`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Error al crear sesión de pago" }, { status: 500 });
  }
}
