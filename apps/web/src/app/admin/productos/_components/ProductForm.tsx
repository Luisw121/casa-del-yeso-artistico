"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { createProduct, updateProduct } from "@/app/admin/_actions/products";
import ImageUpload from "./ImageUpload";

type ProductData = {
  id?: string;
  name: string;
  category: string | null;
  price: number;
  description: string | null;
  longDescription: string | null;
  details: string[];
  imageUrl: string | null;
  inStock: boolean;
};

const SUGGESTED_CATEGORIES = ["Herramientas", "Materiales", "Artesanías", "Otros"];

export default function ProductForm({ product }: { product?: ProductData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>(product?.details ?? [""]);
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [imageUrl, setImageUrl] = useState<string | null>(product?.imageUrl ?? null);

  function addDetail() {
    setDetails((d) => [...d, ""]);
  }

  function removeDetail(index: number) {
    setDetails((d) => d.filter((_, i) => i !== index));
  }

  function updateDetail(index: number, value: string) {
    setDetails((d) => d.map((item, i) => (i === index ? value : item)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    // Replace the details textarea with computed details
    formData.set("details", details.join("\n"));
    formData.set("inStock", String(inStock));
    formData.set("imageUrl", imageUrl ?? "");

    startTransition(async () => {
      try {
        if (product?.id) {
          await updateProduct(product.id, formData);
        } else {
          await createProduct(formData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al guardar el producto");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-night mb-1.5">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={product?.name}
            placeholder="Ej: Espátula profesional"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-night focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-brand-night mb-1.5">
            Categoría <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            required
            list="categories-list"
            defaultValue={product?.category ?? ""}
            placeholder="Ej: Herramientas"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-night focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold"
          />
          <datalist id="categories-list">
            {SUGGESTED_CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-brand-night mb-1.5">
            Precio (USD) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            defaultValue={product?.price}
            placeholder="0.00"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-night focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold"
          />
        </div>

        {/* Descripción corta */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-night mb-1.5">
            Descripción corta
          </label>
          <textarea
            name="description"
            rows={2}
            defaultValue={product?.description ?? ""}
            placeholder="Descripción breve que aparece en la tarjeta del producto"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-night focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold resize-none"
          />
        </div>

        {/* Descripción larga */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-night mb-1.5">
            Descripción completa
          </label>
          <textarea
            name="longDescription"
            rows={4}
            defaultValue={product?.longDescription ?? ""}
            placeholder="Descripción detallada que aparece en la página del producto"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-night focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold resize-none"
          />
        </div>

        {/* Imagen */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-night mb-1.5">
            Imagen del producto
          </label>
          <ImageUpload currentUrl={imageUrl} onChange={setImageUrl} />
        </div>
      </div>

      {/* Detalles / especificaciones */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-brand-night">
            Especificaciones (opcional)
          </label>
          <button
            type="button"
            onClick={addDetail}
            className="text-xs text-brand-gold hover:text-brand-gold/80 flex items-center gap-1 font-medium"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar línea
          </button>
        </div>
        <div className="space-y-2">
          {details.map((detail, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={detail}
                onChange={(e) => updateDetail(i, e.target.value)}
                placeholder={`Ej: Material: acero inoxidable`}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-brand-night focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold"
              />
              <button
                type="button"
                onClick={() => removeDetail(i)}
                className="p-2.5 rounded-xl border border-gray-200 text-brand-night/40 hover:text-red-500 hover:border-red-200 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {details.length === 0 && (
          <p className="text-xs text-brand-night/40 mt-1">
            Sin especificaciones. Haz clic en &ldquo;Agregar línea&rdquo; para añadir.
          </p>
        )}
      </div>

      {/* Stock toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setInStock((v) => !v)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            inStock ? "bg-green-500" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              inStock ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm font-medium text-brand-night">
          {inStock ? "En stock" : "Agotado"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-brand-night text-brand-ivory px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-night/90 transition-colors disabled:opacity-60"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {product?.id ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-brand-night/70 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
