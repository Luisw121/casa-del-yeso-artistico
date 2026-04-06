"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import {
  Sparkles, Flower2, RefreshCw, Home, Columns, Flower,
  StretchVertical, Fence, Layers, Grid3x3, Waves, ShoppingBag, MessageCircle,
} from "lucide-react";

const WA_NUMBER = "593939603613";
const WA_GYPSUM = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hola, me interesa el servicio de *Tumbados de Gypsum de Alta Calidad*. ¿Pueden darme más información y una cotización?"
)}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: "easeOut" as Easing },
  }),
};

const servicios = [
  {
    icon: Sparkles,
    titulo: "Creación de Molduras a su Gusto",
    subtitulo: "Imagen o figura personalizada",
    descripcion: "Diseñamos y fabricamos molduras únicas basadas en la imagen o figura que usted elija. Su idea, nuestra artesanía.",
    destacado: true,
  },
  { icon: Flower2,         titulo: "Ornamentos Decorativos",           descripcion: "Fabricación de ornamentos decorativos para interiores y exteriores con acabados de alta calidad." },
  { icon: RefreshCw,       titulo: "Restauración de Artesanías",       descripcion: "Devolvemos la vida a sus piezas artesanales dañadas o deterioradas con técnicas especializadas." },
  { icon: Home,            titulo: "Piezas para el Hogar",             descripcion: "Fabricación de piezas especiales para la decoración de su hogar, adaptadas a cada espacio." },
  { icon: Columns,         titulo: "Cornisas, Columnas, Arcos y Bóvedas", descripcion: "Fabricación de cornisas, columnas, arcos, bóvedas y placas 3D en yeso, cemento y fibra de vidrio." },
  { icon: Flower,          titulo: "Maceteros a Medida",               descripcion: "Maceteros personalizados en yeso, cemento y fibra de vidrio. Resistentes, elegantes y únicos." },
  { icon: StretchVertical, titulo: "Postes en Diferentes Medidas",     descripcion: "Fabricación de postes decorativos y estructurales en distintas medidas según su necesidad." },
  { icon: Fence,           titulo: "Cercas Decorativas",               descripcion: "Diseño y fabricación de cercas decorativas que combinan estética y durabilidad." },
  { icon: Grid3x3,         titulo: "Bordillos y Bloques Decorativos",  descripcion: "Fabricación de bordillos y bloques decorativos para exteriores, jardines y andenes." },
  { icon: Layers,          titulo: "Balaustros y Pasamanos",           descripcion: "Fabricación de balaustros y pasamanos con diseños clásicos y modernos a pedido." },
  { icon: Waves,           titulo: "Fabricación para Piscinas",        descripcion: "Elementos decorativos y estructurales fabricados especialmente para el entorno de piscinas." },
  { icon: ShoppingBag,     titulo: "Artesanías",                       descripcion: "Elaboración de artesanías en yeso artístico: figuras, esculturas y piezas decorativas únicas." },
];

export default function ServiciosPage() {
  const destacado = servicios[0];
  const resto = servicios.slice(1);

  return (
    <div className="min-h-screen bg-[#030305]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-block text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-gold border border-brand-gold/25 px-4 py-1.5 rounded-full mb-6"
          >
            Nuestros Servicios
          </motion.span>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-heading font-bold text-white leading-[1.05] text-5xl sm:text-6xl lg:text-7xl"
          >
            ¿Qué{" "}
            <span style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              fabricamos?
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 text-white/35 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Especialistas en yeso artístico, cemento y fibra de vidrio.
            Cada pieza hecha a mano con detalle y precisión.
          </motion.p>

          {/* Línea decorativa */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mx-auto mt-8 w-12 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          />
        </div>
      </section>

      {/* ── TARJETA ESTRELLA ── */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="relative overflow-hidden rounded-3xl border border-brand-gold/20 bg-[#0a0a10] p-8 sm:p-10 group hover:border-brand-gold/40 transition-all duration-500"
          >
            {/* Glows */}
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-brand-gold/6 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/10 transition-all duration-700" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-gold/4 rounded-full blur-3xl pointer-events-none" />
            {/* Línea superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as Easing }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold/15 shrink-0"
              >
                <destacado.icon className="h-7 w-7 text-brand-gold" />
              </motion.div>

              <div className="flex-1">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-gold/50">Servicio estrella</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">{destacado.titulo}</h2>
                <p className="text-brand-gold/60 text-sm font-medium mt-0.5">{destacado.subtitulo}</p>
                <p className="text-white/35 mt-3 leading-relaxed text-sm">{destacado.descripcion}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GRID DE SERVICIOS ── */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resto.map((s, i) => (
              <motion.div
                key={s.titulo}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i % 6}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className="group relative overflow-hidden bg-[#080810] border border-white/4 hover:border-brand-gold/20 rounded-2xl p-5 flex flex-col gap-3 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-gold/8 group-hover:bg-brand-gold/15 transition-colors">
                  <s.icon className="h-4 w-4 text-brand-gold/70 group-hover:text-brand-gold transition-colors" />
                </div>
                <div className="relative">
                  <h3 className="font-heading text-sm font-bold text-white/75 group-hover:text-white/95 transition-colors leading-snug">
                    {s.titulo}
                  </h3>
                  <p className="text-white/25 text-xs mt-1.5 leading-relaxed group-hover:text-white/35 transition-colors">
                    {s.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GYPSUM CTA ── */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          {/* Separador */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent mb-10" />

          <motion.a
            href={WA_GYPSUM}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border border-brand-gold/15 bg-[#0a0a10] p-8 sm:p-10 hover:border-brand-gold/45 transition-all duration-400 cursor-pointer"
          >
            {/* Glows */}
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/10 transition-all duration-600" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
            {/* Shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/3 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

            <div className="relative flex items-center gap-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold/12 group-hover:bg-brand-gold/22 transition-colors shrink-0">
                <Home className="h-7 w-7 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-gold/50">Servicio especializado</span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white/90 mt-1">
                  Tumbados de Gypsum de Alta Calidad
                </h2>
                <p className="text-white/30 text-sm mt-1.5 leading-relaxed max-w-md">
                  Transformamos techos con gypsum premium. Diseños a medida, acabados impecables y entrega puntual.
                </p>
              </div>
            </div>

            <div className="relative flex items-center gap-2 bg-brand-gold text-brand-night font-bold text-sm px-7 py-3.5 rounded-full shadow-[0_0_24px_rgba(201,168,76,0.2)] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] transition-all duration-300 shrink-0 self-start sm:self-center">
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </div>
          </motion.a>
        </div>
      </section>
    </div>
  );
}
