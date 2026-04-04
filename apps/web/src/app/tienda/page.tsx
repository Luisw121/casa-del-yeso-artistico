"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { addItem } = useCart();

  const filtered = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-night py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Tienda
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-heading text-4xl sm:text-5xl font-bold text-brand-ivory"
          >
            Herramientas y materiales
            <br />
            <span className="text-brand-gold">de primer uso</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-4 text-brand-ivory/70 max-w-xl mx-auto"
          >
            Todo lo que necesitas para tu proyecto: herramientas profesionales,
            materiales de construcción y artesanías decorativas.
          </motion.p>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-brand-ivory py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
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
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i % 4}
                className="bg-white rounded-2xl border border-brand-night/5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              >
                {/* Product image — click to detail */}
                <Link href={`/tienda/${product.id}`} className="block h-44 bg-gradient-to-br from-brand-night/5 to-brand-gold/10 flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Package className="h-12 w-12 text-brand-gold/40" />
                </Link>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/tienda/${product.id}`} className="hover:text-brand-gold transition-colors">
                      <h3 className="font-heading text-base font-bold text-brand-night leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    {!product.stock && (
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
                      disabled={!product.stock}
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
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

          <p className="mt-10 text-center text-sm text-brand-night/40">
            Catálogo en expansión — nuevos productos disponibles próximamente.
          </p>
        </div>
      </section>
    </>
  );
}
