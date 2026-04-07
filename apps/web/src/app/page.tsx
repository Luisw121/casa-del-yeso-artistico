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

const orbs = [
  { x: "15%",  y: "20%", w: 340, delay: 0,   dur: 8  },
  { x: "75%",  y: "60%", w: 260, delay: 2,   dur: 11 },
  { x: "50%",  y: "80%", w: 200, delay: 1.5, dur: 9  },
  { x: "85%",  y: "10%", w: 180, delay: 3,   dur: 13 },
];

export default function HomePage() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#020204] overflow-hidden min-h-[94vh] flex flex-col justify-center">

        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image src="/hero-bg.jpg" alt="" fill className="object-cover object-center" style={{ opacity: 0.22 }} priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/70 via-[#020204]/20 to-[#020204]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020204]/80 via-transparent to-[#020204]/80" />
        </div>

        {/* Grid de puntos de fondo */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Orbs flotantes animados */}
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ left: orb.x, top: orb.y, width: orb.w, height: orb.w, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" as Easing, delay: orb.delay }}
          />
        ))}

        {/* Contenido */}
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 text-center">

          {/* Badges */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {["Gypsum & Techos", "Artesanías a medida", "Multiservicios 24h"].map((t) => (
              <span key={t}
                className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/30 border border-white/8 px-4 py-1.5 rounded-full"
                style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.03)" }}
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-heading font-bold text-white leading-[1.03] text-5xl sm:text-6xl lg:text-[6rem]"
          >
            Traemos tu{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #a07830 0%, #c9a84c 30%, #f5d78e 55%, #c9a84c 75%, #a07830 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              figura favorita
            </span>
            <br />
            <span className="text-white/85">a la realidad</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-7 mx-auto max-w-lg text-white/35 text-lg leading-relaxed"
          >
            Especialistas en artesanías, yeso artístico y multiservicios.<br className="hidden sm:block" />
            Cada obra, una firma de excelencia.
          </motion.p>

          {/* Línea decorativa */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mx-auto mt-8 w-20 h-px"
            style={{ background: "linear-gradient(to right, transparent, #c9a84c80, transparent)" }}
          />

          {/* Botones */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/tienda"
              className="group relative inline-flex items-center gap-3 text-brand-night font-bold text-sm px-10 py-4 rounded-full overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #c9a84c, #f5d78e, #c9a84c)",
                boxShadow: "0 0 32px rgba(201,168,76,0.35), 0 0 64px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <ShoppingBag className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Ver Tienda</span>
              <ArrowRight className="h-3.5 w-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link href="/servicios/urgentes"
              className="group inline-flex items-center gap-3 text-white font-semibold text-sm px-10 py-4 rounded-full transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
              </span>
              Servicios Urgentes 24h
            </Link>
          </motion.div>

          {!isLoggedIn && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-7">
              <Link href="/login" className="text-white/20 hover:text-white/50 text-xs font-medium transition-colors tracking-[0.25em] uppercase">
                Iniciar sesión →
              </Link>
            </motion.div>
          )}
        </div>

        {/* Stats strip — glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="relative"
          style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
        >
          <div className="mx-auto max-w-4xl px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.5, ease: "easeOut" as Easing }}
                className="relative flex flex-col items-center gap-1 py-3 rounded-xl overflow-hidden"
                style={{
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <s.icon className="h-3.5 w-3.5 text-brand-gold/50 mb-0.5" />
                <span className="font-heading text-xl sm:text-2xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #c9a84c, #f5d78e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/25 text-center px-2">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3.5 relative" style={{ background: "rgba(201,168,76,0.04)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" as Easing }}
          className="flex whitespace-nowrap gap-10"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-10"
              style={{ color: "rgba(201,168,76,0.45)" }}
            >
              {item}
              <span style={{ color: "rgba(201,168,76,0.15)" }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── DESTACADO ── */}
      <section className="bg-[#020204] py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as Easing }}
            className="relative rounded-[2rem] overflow-hidden text-center"
            style={{
              background: "linear-gradient(135deg, #0e0c08 0%, #0a0a10 50%, #0e0c08 100%)",
              border: "1px solid rgba(201,168,76,0.12)",
              padding: "4rem 3rem",
              boxShadow: "0 0 60px rgba(201,168,76,0.05), inset 0 1px 0 rgba(201,168,76,0.1)",
            }}
          >
            {/* Línea top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)" }}
            />
            {/* Glow top center */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
            />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-brand-gold/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-brand-gold/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-brand-gold/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-brand-gold/20 rounded-br-lg" />

            <p className="relative text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
              style={{ color: "rgba(201,168,76,0.5)" }}
            >
              Nuestro arte
            </p>
            <h2 className="relative font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Cada pieza que fabricamos<br />
              <span style={{
                background: "linear-gradient(135deg, #c9a84c, #f5d78e, #c9a84c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                lleva nuestra firma
              </span>
            </h2>
            <p className="relative mt-5 max-w-xl mx-auto leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Yeso artístico, cemento y fibra de vidrio trabajados con precisión artesanal. Desde molduras hasta columnas, bóvedas y figuras únicas.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/servicios/techos-gypsum"
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3 rounded-full transition-all duration-300"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.8)" }}
              >
                Ver qué fabricamos <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contacto"
                className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3 rounded-full transition-all duration-300"
                style={{ color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.06)" }}
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
