import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ShoppingBag, User, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const statusColors: Record<string, string> = {
    PENDIENTE: "bg-yellow-100 text-yellow-700",
    EN_PROCESO: "bg-blue-100 text-blue-700",
    COMPLETADO: "bg-green-100 text-green-700",
    CANCELADO: "bg-red-100 text-red-700",
  };

  const statusLabels: Record<string, string> = {
    PENDIENTE: "Pendiente",
    EN_PROCESO: "En proceso",
    COMPLETADO: "Completado",
    CANCELADO: "Cancelado",
  };

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-1">
            Mi cuenta
          </p>
          <h1 className="font-heading text-3xl font-bold text-brand-night">
            Bienvenido, {session.user.name?.split(" ")[0] ?? "Cliente"}
          </h1>
          <p className="text-brand-night/60 mt-1 text-sm">{session.user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-brand-night/5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-brand-night">{orders.length}</p>
              <p className="text-sm text-brand-night/60">Pedidos realizados</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-brand-night/5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
              <User className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-brand-night capitalize">
                {((session.user as { role?: string }).role ?? "CLIENTE").toLowerCase()}
              </p>
              <p className="text-sm text-brand-night/60">Tipo de cuenta</p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl border border-brand-night/5 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-brand-night/5 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-brand-night">Mis pedidos</h2>
            <Button
              render={<Link href="/tienda" />}
              size="sm"
              className="bg-brand-gold text-brand-night hover:bg-brand-gold/90 font-semibold"
            >
              Nueva compra
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="h-10 w-10 text-brand-night/20 mx-auto mb-3" />
              <p className="text-brand-night/40 text-sm">Aún no tienes pedidos</p>
              <Link href="/tienda" className="mt-3 inline-block text-sm text-brand-gold hover:underline">
                Explorar tienda
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-brand-night/5">
              {orders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-brand-night">
                      Pedido #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-brand-night/50 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("es-EC", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-brand-night">${order.total.toFixed(2)}</p>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tienda" className="text-sm text-brand-night/50 hover:text-brand-gold transition-colors">
            Ir a la tienda →
          </Link>
          <Link href="/contacto" className="text-sm text-brand-night/50 hover:text-brand-gold transition-colors">
            Contactar soporte →
          </Link>
        </div>
      </div>
    </div>
  );
}
