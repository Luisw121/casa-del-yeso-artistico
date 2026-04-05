"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/admin/_actions/orders";

const STATUS_OPTIONS = ["PENDIENTE", "EN_PROCESO", "COMPLETADO", "CANCELADO"];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
  statusLabel,
  statusColor,
}: {
  orderId: string;
  currentStatus: string;
  statusLabel: Record<string, string>;
  statusColor: Record<string, string>;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch {
        alert("Error al actualizar el estado");
      }
    });
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 cursor-pointer disabled:opacity-60 ${statusColor[currentStatus] ?? "text-gray-600"}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {statusLabel[s] ?? s}
        </option>
      ))}
    </select>
  );
}
