"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Package, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  category: string | null;
  price: number;
  description: string | null;
  imageUrl: string | null;
  inStock: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { addItem } = useCart();

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    const q = query.toLowerCase().trim();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q) ||
      (p.category ?? "").toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Search bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={0}
        className="relative mb-6"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-night/40 pointer-events-none" />
        <input
          type="text"
          autoComplete="off"
          readOnly={!searchFocused}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full bg-white border border-brand-night/10 rounded-xl pl-11 pr-10 py-3 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-night/30 hover:text-brand-night transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={0}
        className="flex flex-wrap gap-2 mb-10"
      >
        {["Todos", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-brand-night text-brand-ivory"
                : "bg-white text-brand-night/60 border border-brand-night/10 hover:border-brand-gold hover:text-brand-night"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i % 4}
            className="bg-white rounded-2xl border border-brand-night/5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
          >
            <Link
              href={`/tienda/${product.id}`}
              className="block relative h-44 bg-gradient-to-br from-brand-night/5 to-brand-gold/10 overflow-hidden hover:opacity-90 transition-opacity"
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
                <div className="h-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-brand-gold/40" />
                </div>
              )}
            </Link>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link
                  href={`/tienda/${product.id}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  <h3 className="font-heading text-base font-bold text-brand-night leading-snug">
                    {product.name}
                  </h3>
                </Link>
                {!product.inStock && (
                  <Badge className="shrink-0 bg-red-100 text-red-600 border-red-200 text-xs">
                    Agotado
                  </Badge>
                )}
              </div>
              <p className="text-xs text-brand-night/50 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="font-heading text-lg font-bold text-brand-night">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  disabled={!product.inStock}
                  onClick={() =>
                    addItem({ id: product.id, name: product.name, price: product.price })
                  }
                  className="flex items-center gap-1.5 text-xs font-semibold bg-brand-gold text-brand-night px-3 py-1.5 rounded-lg hover:bg-brand-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Agregar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-brand-night/40 py-16">
          {query ? `No se encontraron productos para "${query}"` : "No hay productos en esta categoría."}
        </p>
      )}
    </>
  );
}
