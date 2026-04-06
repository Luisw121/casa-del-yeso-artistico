"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import {
  Sparkles,
  Flower2,
  RefreshCw,
  Home,
  Columns,
  Flower,
  StretchVertical,
  Fence,
  Layers,
  Grid3x3,
  Waves,
  ShoppingBag,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as Easing },
  }),
};

const servicios = [
  {
    icon: Sparkles,
    titulo: "Creación de Molduras a su Gusto",
    subtitulo: "Imagen o figura personalizada",
    descripcion:
      "Diseñamos y fabricamos molduras únicas basadas en la imagen o figura que usted elija. Su idea, nuestra artesanía.",
    destacado: true,
  },
  {
    icon: Flower2,
    titulo: "Ornamentos Decorativos",
    descripcion: "Fabricación de ornamentos decorativos para interiores y exteriores con acabados de alta calidad.",
  },
  {
    icon: RefreshCw,
    titulo: "Restauración de Artesanías",
    descripcion: "Devolvemos la vida a sus piezas artesanales dañadas o deterioradas con técnicas especializadas.",
  },
  {
    icon: Home,
    titulo: "Piezas para el Hogar",
    descripcion: "Fabricación de piezas especiales para la decoración de su hogar, adaptadas a cada espacio.",
  },
  {
    icon: Columns,
    titulo: "Cornisas, Columnas, Arcos y Bóvedas",
    descripcion:
      "Fabricación de cornisas, columnas, arcos, bóvedas y placas 3D en yeso, cemento y fibra de vidrio.",
  },
  {
    icon: Flower,
    titulo: "Maceteros a Medida",
    descripcion:
      "Maceteros personalizados en yeso, cemento y fibra de vidrio. Resistentes, elegantes y únicos.",
  },
  {
    icon: StretchVertical,
    titulo: "Postes en Diferentes Medidas",
    descripcion: "Fabricación de postes decorativos y estructurales en distintas medidas según su necesidad.",
  },
  {
    icon: Fence,
    titulo: "Cercas Decorativas",
    descripcion: "Diseño y fabricación de cercas decorativas que combinan estética y durabilidad.",
  },
  {
    icon: Grid3x3,
    titulo: "Bordillos y Bloques Decorativos",
    descripcion: "Fabricación de bordillos y bloques decorativos para exteriores, jardines y andenes.",
  },
  {
    icon: Layers,
    titulo: "Balaustros y Pasamanos",
    descripcion: "Fabricación de balaustros y pasamanos con diseños clásicos y modernos a pedido.",
  },
  {
    icon: Waves,
    titulo: "Fabricación para Piscinas",
    descripcion: "Elementos decorativos y estructurales fabricados especialmente para el entorno de piscinas.",
  },
  {
    icon: ShoppingBag,
    titulo: "Artesanías",
    descripcion: "Elaboración de artesanías en yeso artístico: figuras, esculturas y piezas decorativas únicas.",
  },
];

export default function ServiciosPage() {
  const destacado = servicios[0];
  const resto = servicios.slice(1);

  return (
    <div className="min-h-screen bg-brand-night">
      {/* Hero */}
      <section className="py-20 lg:py-28 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-block text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-gold border border-brand-gold/30 px-4 py-1.5 rounded-full mb-6"
          >
            Nuestros Servicios
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-ivory leading-tight"
          >
            ¿Qué{" "}
            <span className="text-brand-gold">fabricamos?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 text-brand-ivory/50 text-lg max-w-xl mx-auto"
          >
            Especialistas en yeso artístico, cemento y fibra de vidrio. Cada pieza hecha a mano con detalle y precisión.
          </motion.p>
        </div>
      </section>

      {/* Tarjeta destacada */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 via-[#111122] to-[#111122] p-8 sm:p-10"
          >
            {/* Glow decoration */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold/20 shrink-0">
                <destacado.icon className="h-7 w-7 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-gold/70">
                  Servicio estrella
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-ivory mt-1">
                  {destacado.titulo}
                </h2>
                <p className="text-brand-gold/80 text-sm font-medium mt-0.5">{destacado.subtitulo}</p>
                <p className="text-brand-ivory/55 mt-3 leading-relaxed">{destacado.descripcion}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resto.map((s, i) => (
              <motion.div
                key={s.titulo}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="group bg-[#111122] border border-brand-ivory/5 hover:border-brand-gold/30 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:bg-[#16162a]"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                  <s.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-brand-ivory group-hover:text-brand-gold transition-colors leading-snug">
                    {s.titulo}
                  </h3>
                  <p className="text-brand-ivory/45 text-sm mt-2 leading-relaxed">
                    {s.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
