"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      }),
    });

    if (!res.ok) {
      alert("Error al iniciar el pago. Intente de nuevo.");
      return;
    }

    const data = await res.json();
    if (data.url) {
      clearCart();
      router.push(data.url);
    }
  }

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative text-brand-ivory hover:bg-white/10"
          />
        }
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 text-[10px] font-bold bg-brand-gold text-brand-night rounded-full flex items-center justify-center leading-none">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-brand-ivory border-brand-night/10 w-80 sm:w-96 flex flex-col p-0"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-brand-night/10 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-brand-night">
            Mi carrito
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-brand-night/50">
                ({totalItems} {totalItems === 1 ? "producto" : "productos"})
              </span>
            )}
          </h2>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-brand-night/40 hover:text-red-500 transition-colors"
            >
              Vaciar
            </button>
          )}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="h-10 w-10 text-brand-night/20 mb-3" />
              <p className="text-brand-night/40 text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 border border-brand-night/5 flex gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-night text-sm leading-snug truncate">
                    {item.name}
                  </p>
                  <p className="text-brand-gold font-bold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-brand-night/30 hover:text-red-500 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 rounded-md bg-brand-night/5 flex items-center justify-center hover:bg-brand-night/10 transition-colors disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold text-brand-night w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-brand-night/5 flex items-center justify-center hover:bg-brand-night/10 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-brand-night/10 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-night/60">Subtotal</span>
              <span className="font-heading font-bold text-brand-night text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-brand-night text-brand-ivory hover:bg-brand-night/90 font-semibold"
            >
              Proceder al pago
            </Button>
            <p className="text-[11px] text-center text-brand-night/40">
              Pago seguro con Stripe · Visa, Mastercard, Apple Pay
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
