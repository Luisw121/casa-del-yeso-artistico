import { db } from "@/lib/db";
import ProductGrid from "./ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tienda",
};

export default async function TiendaPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      description: true,
      imageUrl: true,
      inStock: true,
    },
  });

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-night py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Tienda
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-ivory">
            Herramientas y materiales
            <br />
            <span className="text-brand-gold">de primer uso</span>
          </h1>
          <p className="mt-4 text-brand-ivory/70 max-w-xl mx-auto">
            Todo lo que necesitas para tu proyecto: herramientas profesionales,
            materiales de construcción y artesanías decorativas.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-brand-ivory py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} categories={categories} />
          <p className="mt-10 text-center text-sm text-brand-night/40">
            Catálogo en expansión — nuevos productos disponibles próximamente.
          </p>
        </div>
      </section>
    </>
  );
}
