"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/_actions/products";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;

    startTransition(async () => {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Error al eliminar el producto");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors text-xs font-medium disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      Eliminar
    </button>
  );
}
