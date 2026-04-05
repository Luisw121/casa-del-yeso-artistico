"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Package, Check, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  category: string | null;
  price: number;
  description: string | null;
  longDescription: string | null;
  details: string[];
  imageUrl: string | null;
  inStock: boolean;
};

type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
};

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: RelatedProduct[];
}) {
  const router = useRouter();
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.id === product.id);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  async function handleBuyNow() {
    const origin = window.location.origin;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: product.name, price: product.price, quantity }],
        successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/tienda/${product.id}`,
      }),
    });

    if (!res.ok) {
      alert("Error al iniciar el pago. Intente de nuevo.");
      return;
    }

    const data = await res.json();
    if (data.url) router.push(data.url);
  }

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          href="/tienda"
          className="inline-flex items-center gap-1.5 text-sm text-brand-night/50 hover:text-brand-gold transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-2xl border border-brand-night/5 shadow-sm h-72 md:h-full min-h-72 overflow-hidden flex items-center justify-center"
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Package className="h-20 w-20 text-brand-gold/30" />
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="flex flex-col gap-5"
          >
            <div>
              {product.category && (
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
                  {product.category}
                </p>
              )}
              <h1 className="font-heading text-3xl font-bold text-brand-night leading-tight">
                {product.name}
              </h1>
              {!product.inStock && (
                <Badge className="mt-2 bg-red-100 text-red-600 border-red-200">
                  Agotado
                </Badge>
              )}
            </div>

            <p className="text-brand-night/60 leading-relaxed">
              {product.longDescription ?? product.description}
            </p>

            {product.details.length > 0 && (
              <ul className="space-y-1.5">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm text-brand-night/70">
                    <Check className="h-4 w-4 text-brand-gold shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-heading text-3xl font-bold text-brand-night">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-brand-night/40">USD</span>
            </div>

            {product.inStock && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-brand-night/60">Cantidad:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg border border-brand-night/10 flex items-center justify-center hover:bg-brand-night/5 transition-colors disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-semibold text-brand-night w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg border border-brand-night/10 flex items-center justify-center hover:bg-brand-night/5 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-brand-gold text-brand-night hover:bg-brand-gold/90 font-semibold"
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    ¡Agregado!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {inCart ? "Agregar más" : "Agregar al carrito"}
                  </>
                )}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                variant="outline"
                className="flex-1 border-brand-night/20 text-brand-night hover:bg-brand-night hover:text-brand-ivory font-semibold transition-colors"
              >
                Comprar ahora
              </Button>
            </div>

            <p className="text-xs text-brand-night/40 text-center">
              Pago seguro con Stripe · Visa, Mastercard, Apple Pay
            </p>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-xl font-bold text-brand-night mb-6">
              Más en {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/tienda/${p.id}`}
                  className="bg-white rounded-2xl border border-brand-night/5 shadow-sm p-5 hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-28 bg-gradient-to-br from-brand-night/5 to-brand-gold/10 rounded-xl overflow-hidden flex items-center justify-center mb-4">
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover" unoptimized />
                    ) : (
                      <Package className="h-8 w-8 text-brand-gold/40" />
                    )}
                  </div>
                  <p className="font-heading font-bold text-brand-night text-sm group-hover:text-brand-gold transition-colors">
                    {p.name}
                  </p>
                  <p className="font-bold text-brand-gold mt-1">${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
