import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import ProductForm from "../../_components/ProductForm";

export const metadata = { title: "Editar producto — Admin" };

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1.5 text-sm text-brand-night/50 hover:text-brand-gold transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-brand-night">Editar producto</h1>
        <p className="text-brand-night/50 text-sm mt-1">{product.name}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
