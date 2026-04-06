"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants, type Easing } from "framer-motion";
import { useSession } from "next-auth/react";
import { ArrowRight, ShoppingBag, Zap, Star, Clock, Users } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: "easeOut" as Easing },
  }),
};

const stats = [
  { icon: Star,  value: "12+",  label: "Años de experiencia" },
  { icon: Users, value: "500+", label: "Proyectos completados" },
  { icon: Clock, value: "24/7", label: "Servicios urgentes" },
  { icon: Zap,   value: "100%", label: "Garantía de calidad" },
];

const marqueeItems = [
  "Molduras a medida", "Tumbados de Gypsum", "Artesanías únicas",
  "Plomería", "Electricidad", "Impermeabilización", "Columnas & Arcos",
  "Balaustros", "Maceteros", "Cercas decorativas",
];

export default function HomePage() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#050508] overflow-hidden min-h-[92vh] flex flex-col justify-center">

        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image src="/hero-bg.jpg" alt="" fill className="object-cover object-center" style={{ opacity: 0.28 }} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/30 to-[#050508]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/70 via-transparent to-[#050508]/70" />
        </div>

        {/* Glow dorado detrás del título */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Contenido */}
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 text-center">

          {/* Badges */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {["Gypsum & Techos", "Artesanías a medida", "Multiservicios 24h"].map((t) => (
              <span key={t} className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/35 border border-white/8 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {t}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-heading font-bold text-brand-ivory leading-[1.05] text-5xl sm:text-6xl lg:text-[5.5rem]"
          >
            Traemos tu{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              figura favorita
            </span>
            <br />
            <span className="text-white/90">a la realidad</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-7 mx-auto max-w-xl text-brand-ivory/45 text-lg leading-relaxed tracking-wide"
          >
            Especialistas en artesanías, yeso artístico y multiservicios.<br className="hidden sm:block" />
            Cada obra, una firma de excelencia.
          </motion.p>

          {/* Línea decorativa */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mx-auto mt-8 w-16 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          />

          {/* Botones */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Tienda */}
            <Link href="/tienda"
              className="group relative inline-flex items-center gap-3 bg-brand-gold text-brand-night font-bold text-sm px-9 py-4 rounded-full overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_50px_rgba(201,168,76,0.5)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <ShoppingBag className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Ver Tienda</span>
              <ArrowRight className="h-3.5 w-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Urgentes */}
            <Link href="/servicios/urgentes"
              className="group inline-flex items-center gap-3 border border-white/15 text-white font-semibold text-sm px-9 py-4 rounded-full hover:border-brand-gold/50 hover:bg-white/5 hover:text-brand-gold transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
              </span>
              Servicios Urgentes 24h
            </Link>
          </motion.div>

          {/* Login link */}
          {!isLoggedIn && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-6">
              <Link href="/login"
                className="text-brand-ivory/30 hover:text-brand-ivory/60 text-xs font-medium transition-colors tracking-widest uppercase"
              >
                Iniciar sesión →
              </Link>
            </motion.div>
          )}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="relative border-t border-white/5"
        >
          <div className="mx-auto max-w-4xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <s.icon className="h-4 w-4 text-brand-gold/60 mb-1" />
                <span className="font-heading text-2xl font-bold text-brand-ivory">{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-brand-gold/5 border-y border-brand-gold/10 overflow-hidden py-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold/50 flex items-center gap-8">
              {item}
              <span className="text-brand-gold/20">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── DESTACADO ── */}
      <section className="bg-[#050508] py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-brand-gold/15 bg-[#0a0a10] p-10 sm:p-14 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-gold/60 mb-4">Nuestro arte</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ivory leading-tight">
              Cada pieza que fabricamos<br />
              <span className="text-brand-gold/80">lleva nuestra firma</span>
            </h2>
            <p className="mt-5 text-white/35 max-w-xl mx-auto leading-relaxed">
              Yeso artístico, cemento y fibra de vidrio trabajados con precisión artesanal. Desde molduras hasta columnas, bóvedas y figuras únicas.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/servicios/techos-gypsum"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 hover:text-brand-gold hover:border-brand-gold/30 text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-200"
              >
                Ver qué fabricamos <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contacto"
                className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-200"
              >
                Contactar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
