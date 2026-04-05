"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();

  const validStatuses = ["PENDIENTE", "EN_PROCESO", "COMPLETADO", "CANCELADO"];
  if (!validStatuses.includes(status)) {
    throw new Error("Estado inválido");
  }

  await db.order.update({
    where: { id: orderId },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { status: status as any },
  });

  revalidatePath("/admin/pedidos");
  revalidatePath("/dashboard");
}
