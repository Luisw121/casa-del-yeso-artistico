import Image from "next/image";
import { db } from "@/lib/db";
import ProductGrid from "./ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tienda de Materiales y Productos",
  description:
    "Compra materiales de yeso artístico, molduras, placas de gypsum y herramientas para decoración en Guatemala. Envío a todo el país.",
  keywords: [
    "tienda yeso artístico Guatemala",
    "comprar gypsum Guatemala",
    "materiales decoración",
    "molduras yeso comprar",
    "placas gypsum precio",
  ],
  alternates: {
    canonical: "https://www.lacasadelyesoartistico.com/tienda",
  },
  openGraph: {
    title: "Tienda | La Casa del Yeso Artístico",
    description: "Materiales de yeso artístico y gypsum en Guatemala.",
    url: "https://www.lacasadelyesoartistico.com/tienda",
  },
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
      <section className="bg-[#0A0A0A] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} categories={categories} />
          <p className="mt-10 text-center text-sm text-white/25">
            Catálogo en expansión — nuevos productos disponibles próximamente.
          </p>
        </div>
      </section>

      {/* Muestrario de Molduras — solo exhibición */}
      <section className="bg-black py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-3">
              Muestrario
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Catálogo de Molduras
            </h2>
            <p className="mt-2 text-sm text-white/40 max-w-lg">
              Diseños disponibles para tus techos y espacios. Consulta con nosotros para precios y disponibilidad.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/catalogo-molduras.jpg"
              alt="Catálogo de molduras decorativas en yeso"
              width={1400}
              height={1400}
              className="w-full h-auto object-contain"
            />
            {/* Etiqueta de solo muestra */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white/70 text-[10px] tracking-widest uppercase border border-white/20 px-3 py-1.5 rounded-full">
              Solo muestra
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/25">
            ¿Te interesa algún diseño? <a href="/contacto" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">Contáctanos</a> para cotizar.
          </p>
        </div>
      </section>
    </>
  );
}
