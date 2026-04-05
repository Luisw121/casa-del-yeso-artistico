import { db } from "@/lib/db";
import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";

export const metadata = { title: "Dashboard Admin" };

const statusLabel: Record<string, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  COMPLETADO: "Completado",
  CANCELADO: "Cancelado",
};

const statusColor: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  EN_PROCESO: "bg-blue-100 text-blue-700",
  COMPLETADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-600",
};

export default async function AdminDashboard() {
  const [revenueAgg, ordersByStatus, totalProducts, recentOrders] = await Promise.all([
    db.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELADO" } },
    }),
    db.order.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
    db.product.count(),
    db.order.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const totalRevenue = revenueAgg._sum.total ?? 0;
  const totalOrders = ordersByStatus.reduce((sum, g) => sum + g._count.id, 0);
  const pendingOrders =
    ordersByStatus.find((g) => g.status === "PENDIENTE")?._count.id ?? 0;

  const stats = [
    {
      label: "Ingresos totales",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Pedidos totales",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pedidos pendientes",
      value: pendingOrders,
      icon: TrendingUp,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Productos activos",
      value: totalProducts,
      icon: Package,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-brand-night">Dashboard</h1>
        <p className="text-brand-night/50 text-sm mt-1">
          Resumen general de La Casa del Yeso Artístico
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-brand-night/50 font-medium mb-1">{label}</p>
                <p className="font-heading text-2xl font-bold text-brand-night">{value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-brand-night">Últimos pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Pedido</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Cliente</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Total</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Estado</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-brand-night/40">
                    No hay pedidos aún.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-mono text-xs text-brand-night/60">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-3 text-brand-night">
                      {order.user.name ?? order.user.email}
                    </td>
                    <td className="px-6 py-3 font-semibold text-brand-night">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {statusLabel[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-brand-night/50">
                      {new Date(order.createdAt).toLocaleDateString("es-EC")}
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
