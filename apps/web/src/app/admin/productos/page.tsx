import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { db } from "@/lib/db";
import DeleteProductButton from "./_components/DeleteProductButton";

export const metadata = { title: "Productos — Admin" };

export default async function AdminProductosPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-night">Productos</h1>
          <p className="text-brand-night/50 text-sm mt-1">
            {products.length} producto{products.length !== 1 ? "s" : ""} en catálogo
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-brand-night text-brand-ivory px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-night/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Producto</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Categoría</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Precio</th>
                <th className="text-left px-6 py-3 text-brand-night/50 font-medium">Stock</th>
                <th className="text-right px-6 py-3 text-brand-night/50 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-brand-night/40">
                    No hay productos. Crea el primero.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-night">{product.name}</p>
                      {product.description && (
                        <p className="text-xs text-brand-night/40 mt-0.5 line-clamp-1">
                          {product.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-brand-night/70">
                      {product.category ?? "—"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-night">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.inStock ? "En stock" : "Agotado"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/productos/${product.id}/editar`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-brand-night/70 hover:bg-gray-100 transition-colors text-xs font-medium"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Editar
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
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
