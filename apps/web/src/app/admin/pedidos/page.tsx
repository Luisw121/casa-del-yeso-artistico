import { db } from "@/lib/db";
import OrderStatusSelect from "./_components/OrderStatusSelect";

export const metadata = { title: "Pedidos — Admin" };

const statusLabel: Record<string, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  COMPLETADO: "Completado",
  CANCELADO: "Cancelado",
};

const statusColor: Record<string, string> = {
  PENDIENTE: "text-yellow-700",
  EN_PROCESO: "text-blue-700",
  COMPLETADO: "text-green-700",
  CANCELADO: "text-red-600",
};

export default async function AdminPedidosPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELADO")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-night">Pedidos</h1>
          <p className="text-brand-night/50 text-sm mt-1">
            {orders.length} pedido{orders.length !== 1 ? "s" : ""} ·{" "}
            <span className="text-green-600 font-medium">
              ${totalRevenue.toFixed(2)} en ingresos
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium"># Pedido</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Cliente</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Total</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Estado</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-brand-night/40">
                    No hay pedidos aún.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-brand-night/60">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-night">
                        {order.user.name ?? "—"}
                      </p>
                      <p className="text-xs text-brand-night/40">{order.user.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-night">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusSelect
                        orderId={order.id}
                        currentStatus={order.status}
                        statusLabel={statusLabel}
                        statusColor={statusColor}
                      />
                    </td>
                    <td className="px-6 py-4 text-brand-night/50 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("es-EC", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
