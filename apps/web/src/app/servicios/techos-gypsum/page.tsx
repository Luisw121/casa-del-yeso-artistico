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
  MessageCircle,
} from "lucide-react";

const WA_NUMBER = "593967021791";
const WA_GYPSUM = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hola, me interesa el servicio de *Tumbados de Gypsum de Alta Calidad*. ¿Pueden darme más información y una cotización?"
)}`;

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
    <div className="min-h-screen bg-[#050508]">
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
            className="mt-5 text-brand-ivory/40 text-lg max-w-xl mx-auto"
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
            className="relative overflow-hidden rounded-3xl border border-brand-gold/25 bg-[#0c0c14] p-8 sm:p-10"
          >
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold/15 shrink-0">
                <destacado.icon className="h-7 w-7 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-gold/60">
                  Servicio estrella
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-ivory mt-1">
                  {destacado.titulo}
                </h2>
                <p className="text-brand-gold/70 text-sm font-medium mt-0.5">{destacado.subtitulo}</p>
                <p className="text-brand-ivory/45 mt-3 leading-relaxed">{destacado.descripcion}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resto.map((s, i) => (
              <motion.div
                key={s.titulo}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="group bg-[#0a0a10] border border-white/5 hover:border-brand-gold/25 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:bg-[#0e0e18]"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/18 transition-colors">
                  <s.icon className="h-4 w-4 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-brand-ivory/90 group-hover:text-brand-gold transition-colors leading-snug">
                    {s.titulo}
                  </h3>
                  <p className="text-white/30 text-xs mt-1.5 leading-relaxed">
                    {s.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Gypsum — CTA WhatsApp */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <motion.a
            href={WA_GYPSUM}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border border-brand-gold/20 bg-[#0c0c14] p-8 sm:p-10 hover:border-brand-gold/50 transition-all duration-300 cursor-pointer"
          >
            {/* Glow */}
            <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-brand-gold/6 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/12 transition-all duration-500" />

            <div className="relative flex items-center gap-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold/15 group-hover:bg-brand-gold/25 transition-colors shrink-0">
                <Home className="h-7 w-7 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-gold/60">
                  Servicio especializado
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-ivory mt-1">
                  Tumbados de Gypsum de Alta Calidad
                </h2>
                <p className="text-white/35 text-sm mt-1.5 leading-relaxed max-w-md">
                  Transformamos techos con gypsum premium. Diseños a medida, acabados impecables y entrega puntual.
                </p>
              </div>
            </div>

            <div className="relative flex items-center gap-2 bg-brand-gold text-brand-night font-semibold text-sm px-6 py-3 rounded-full group-hover:bg-brand-gold/90 transition-colors shrink-0 self-start sm:self-center">
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </div>
          </motion.a>
        </div>
      </section>
    </div>
  );
}
