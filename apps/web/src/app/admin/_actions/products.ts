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

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const longDescription = formData.get("longDescription") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const inStock = formData.get("inStock") === "true";
  const detailsRaw = formData.get("details") as string;
  const details = detailsRaw
    ? detailsRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  if (!name || !category || isNaN(price) || price < 0) {
    throw new Error("Datos inválidos");
  }

  await db.product.create({
    data: {
      name: name.trim(),
      category: category.trim(),
      price,
      description: description?.trim() || null,
      longDescription: longDescription?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
      inStock,
      details,
    },
  });

  revalidatePath("/tienda");
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const longDescription = formData.get("longDescription") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const inStock = formData.get("inStock") === "true";
  const detailsRaw = formData.get("details") as string;
  const details = detailsRaw
    ? detailsRaw.split("\n").map((d) => d.trim()).filter(Boolean)
    : [];

  if (!name || !category || isNaN(price) || price < 0) {
    throw new Error("Datos inválidos");
  }

  await db.product.update({
    where: { id },
    data: {
      name: name.trim(),
      category: category.trim(),
      price,
      description: description?.trim() || null,
      longDescription: longDescription?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
      inStock,
      details,
    },
  });

  revalidatePath("/tienda");
  revalidatePath(`/tienda/${id}`);
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  const hasOrders = await db.orderItem.findFirst({ where: { productId: id } });
  if (hasOrders) {
    throw new Error("No se puede eliminar un producto que tiene pedidos asociados.");
  }

  await db.product.delete({ where: { id } });

  revalidatePath("/tienda");
  revalidatePath("/admin/productos");
}
