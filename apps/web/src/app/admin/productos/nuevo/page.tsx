import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../_components/ProductForm";

export const metadata = { title: "Nuevo producto — Admin" };

export default function NuevoProductoPage() {
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
        <h1 className="font-heading text-2xl font-bold text-brand-night">Nuevo producto</h1>
        <p className="text-brand-night/50 text-sm mt-1">
          El producto aparecerá en la tienda inmediatamente al crearlo.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <ProductForm />
      </div>
    </div>
  );
}
