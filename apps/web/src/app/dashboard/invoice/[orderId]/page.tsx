import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PrintButton } from "./PrintButton";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order || order.userId !== session.user.id) notFound();

  // Parsear items del notes (JSON guardado en checkout)
  let items: { name: string; price: number; qty: number }[] = [];
  try {
    if (order.notes) items = JSON.parse(order.notes);
  } catch {
    // notes no tiene formato de items
  }

  const invoiceNumber = `FAC-${order.id.slice(-8).toUpperCase()}`;
  const date = new Date(order.createdAt).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusLabels: Record<string, string> = {
    PENDIENTE: "Pendiente",
    EN_PROCESO: "En proceso",
    COMPLETADO: "Completado",
    CANCELADO: "Cancelado",
  };

  return (
    <>
      {/* Botón de imprimir — no aparece en impresión */}
      <div className="print:hidden bg-brand-ivory min-h-screen flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl mb-6 flex items-center justify-between">
          <a
            href="/dashboard"
            className="text-sm text-brand-night/50 hover:text-brand-gold transition-colors"
          >
            ← Volver al dashboard
          </a>
          <PrintButton />
        </div>

        {/* Factura */}
        <InvoiceDocument
          invoiceNumber={invoiceNumber}
          date={date}
          order={order}
          items={items}
          statusLabels={statusLabels}
          userName={order.user.name ?? session.user.name ?? "Cliente"}
          userEmail={order.user.email ?? session.user.email ?? ""}
        />
      </div>

      {/* Vista de impresión directa */}
      <div className="hidden print:block">
        <InvoiceDocument
          invoiceNumber={invoiceNumber}
          date={date}
          order={order}
          items={items}
          statusLabels={statusLabels}
          userName={order.user.name ?? session.user.name ?? "Cliente"}
          userEmail={order.user.email ?? session.user.email ?? ""}
        />
      </div>
    </>
  );
}

function InvoiceDocument({
  invoiceNumber,
  date,
  order,
  items,
  statusLabels,
  userName,
  userEmail,
}: {
  invoiceNumber: string;
  date: string;
  order: { id: string; total: number; status: string; createdAt: Date };
  items: { name: string; price: number; qty: number }[];
  statusLabels: Record<string, string>;
  userName: string;
  userEmail: string;
}) {
  return (
    <div className="w-full max-w-2xl bg-white shadow-lg print:shadow-none p-10 print:p-8 font-sans">
      {/* Cabecera */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="font-heading text-2xl font-bold text-[#1A1A2E]">
            La Casa del <span className="text-[#C9A96E]">Yeso Artístico</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">Loja, Ecuador</p>
          <p className="text-sm text-gray-500">casadelyesoartistico@hotmail.com</p>
          <p className="text-sm text-gray-500">+593 939 603 613</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-200 uppercase tracking-widest">
            Factura
          </p>
          <p className="text-sm font-semibold text-[#1A1A2E] mt-1">{invoiceNumber}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-[#C9A96E] mb-8" />

      {/* Datos del cliente */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Facturado a
        </p>
        <p className="font-semibold text-[#1A1A2E]">{userName}</p>
        <p className="text-sm text-gray-500">{userEmail}</p>
      </div>

      {/* Tabla de productos */}
      <table className="w-full mb-8 text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-semibold text-gray-500 uppercase text-xs tracking-wider">
              Producto
            </th>
            <th className="text-center py-2 font-semibold text-gray-500 uppercase text-xs tracking-wider w-16">
              Cant.
            </th>
            <th className="text-right py-2 font-semibold text-gray-500 uppercase text-xs tracking-wider w-24">
              Precio
            </th>
            <th className="text-right py-2 font-semibold text-gray-500 uppercase text-xs tracking-wider w-24">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-3 text-[#1A1A2E]">{item.name}</td>
                <td className="py-3 text-center text-gray-600">{item.qty}</td>
                <td className="py-3 text-right text-gray-600">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-3 text-right font-semibold text-[#1A1A2E]">
                  ${(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-4 text-center text-gray-400 text-sm"
              >
                Pedido #{order.id.slice(-8).toUpperCase()}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end mb-8">
        <div className="w-48">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Subtotal</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>IVA (0%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-[#1A1A2E] text-lg border-t border-[#C9A96E] pt-2">
            <span>Total</span>
            <span>${order.total.toFixed(2)} USD</span>
          </div>
        </div>
      </div>

      {/* Estado */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Estado:
        </span>
        <span className="text-xs font-bold text-[#1A1A2E]">
          {statusLabels[order.status] ?? order.status}
        </span>
      </div>

      {/* Pie */}
      <div className="border-t border-gray-200 pt-6 text-xs text-gray-400 text-center">
        <p>
          Gracias por su compra. Para cualquier consulta contáctenos por WhatsApp al{" "}
          <span className="text-[#C9A96E]">+593 939 603 613</span>
        </p>
        <p className="mt-1">
          Sistema desarrollado por{" "}
          <span className="font-semibold">Narvek System</span>
        </p>
      </div>
    </div>
  );
}
