import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProductDetail from "./ProductDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id }, select: { name: true } });
  return { title: product?.name ?? "Producto" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await db.product.findUnique({ where: { id } });
  if (!product) notFound();

  const related = await db.product.findMany({
    where: { category: product.category, id: { not: product.id }, inStock: true },
    take: 3,
    select: { id: true, name: true, price: true },
  });

  return <ProductDetail product={product} related={related} />;
}
