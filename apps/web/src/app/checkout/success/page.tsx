import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStripeServer } from "@/lib/stripe";
import { db } from "@/lib/db";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (session_id) {
    try {
      const stripe = getStripeServer();
      const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

      const userId = stripeSession.metadata?.userId;
      const itemsRaw = stripeSession.metadata?.items;
      const total = (stripeSession.amount_total ?? 0) / 100;

      if (userId && stripeSession.payment_status === "paid" && total > 0) {
        const existing = await db.order.findUnique({
          where: { stripeSessionId: session_id },
        });

        if (!existing) {
          await db.order.create({
            data: {
              userId,
              total,
              stripeSessionId: session_id,
              notes: itemsRaw ?? null,
              status: "PENDIENTE",
            },
          });
        }
      }
    } catch {
      // si falla el guardado no bloqueamos la página de éxito
    }
  }

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-brand-night mb-3">
          ¡Pago exitoso!
        </h1>
        <p className="text-brand-night/60 mb-8">
          Tu pedido ha sido recibido. Te contactaremos pronto para coordinar la
          entrega. También puedes escribirnos por WhatsApp al{" "}
          <a
            href="https://wa.me/593939603613"
            className="text-brand-gold hover:underline"
          >
            +593 939 603 613
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            render={<Link href="/tienda" />}
            className="bg-brand-night text-brand-ivory hover:bg-brand-night/90"
          >
            Seguir comprando
          </Button>
          <Button
            render={<Link href="/dashboard" />}
            variant="outline"
            className="border-brand-night/20 text-brand-night hover:bg-brand-night/5"
          >
            Ver mis pedidos
          </Button>
        </div>
      </div>
    </div>
  );
}
