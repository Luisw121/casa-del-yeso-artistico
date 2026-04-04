import { NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const stripe = getStripeServer();
    const session = await auth();
    const { items, successUrl, cancelUrl } = await req.json();

    const baseUrl =
      process.env.NEXTAUTH_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      payment_method_options: {
        card: { request_three_d_secure: "automatic" },
      },
      line_items: items.map(
        (item: { name: string; price: number; quantity: number; image?: string }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              ...(item.image && { images: [item.image] }),
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })
      ),
      metadata: {
        userId: session?.user?.id ?? "",
        items: JSON.stringify(
          items.map((i: { name: string; price: number; quantity: number }) => ({
            name: i.name,
            price: i.price,
            qty: i.quantity,
          }))
        ).slice(0, 500),
      },
      success_url:
        successUrl ??
        `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl ?? `${baseUrl}/tienda`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Error al crear sesión de pago" },
      { status: 500 }
    );
  }
}
