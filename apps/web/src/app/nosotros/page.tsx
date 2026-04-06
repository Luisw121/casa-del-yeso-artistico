"use client";

import Link from "next/link";
import { motion, type Variants, type Easing } from "framer-motion";
import {
  MapPin, Calendar, Award, Globe,
  Star, ShieldCheck, Clock, ArrowRight, MessageCircle,
} from "lucide-react";

const WA_NUMBER = "593939603613";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.11, duration: 0.6, ease: "easeOut" as Easing },
  }),
};

const stats = [
  { value: "12+",  label: "Años de experiencia",    suffix: "años" },
  { value: "500+", label: "Proyectos completados",  suffix: "obras" },
  { value: "100%", label: "Garantía en cada obra",  suffix: "garantía" },
  { value: "24/7", label: "Servicios disponibles",  suffix: "siempre" },
];

const milestones = [
  { year: "2012", title: "El inicio", text: "Fundación de La Casa del Yeso Artístico en Loja, Ecuador, con la visión de traer calidad europea." },
  { year: "2015", title: "Crecimiento", text: "Expansión a servicios eléctricos residenciales y comerciales, consolidando nuestra propuesta multiservicios." },
  { year: "2018", title: "El arte", text: "Lanzamiento de la línea de artesanías decorativas en yeso, dando vida a figuras únicas para cada cliente." },
  { year: "2024", title: "Legado", text: "Más de 500 proyectos completados. Un nombre que resuena en Loja y sus alrededores." },
];

const valores = [
  {
    icon: Star,
    title: "Acabados Premium",
    text: "Materiales de primera calidad con técnicas artesanales que garantizan resultados extraordinarios.",
    glow: "bg-amber-400/8",
    border: "hover:border-amber-400/25",
    iconBg: "bg-amber-400/10 group-hover:bg-amber-400/20",
    iconColor: "text-amber-400",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Obra",
    text: "Cada proyecto incluye garantía escrita y seguimiento post-instalación para tu tranquilidad.",
    glow: "bg-emerald-400/8",
    border: "hover:border-emerald-400/25",
    iconBg: "bg-emerald-400/10 group-hover:bg-emerald-400/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Clock,
    title: "Entrega a Tiempo",
    text: "Cumplimos los plazos acordados. Tu proyecto listo cuando lo necesitas, sin sorpresas.",
    glow: "bg-sky-400/8",
    border: "hover:border-sky-400/25",
    iconBg: "bg-sky-400/10 group-hover:bg-sky-400/20",
    iconColor: "text-sky-400",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#030305]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 px-4">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-gold/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <div>
              <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="inline-block text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-gold border border-brand-gold/25 px-4 py-1.5 rounded-full mb-6"
              >
                Quiénes somos
              </motion.span>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="font-heading font-bold text-white leading-[1.08] text-4xl sm:text-5xl lg:text-6xl"
              >
                Arte, oficio{" "}
                <br className="hidden sm:block" />
                y{" "}
                <span style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #f5d78e 45%, #c9a84c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  pasión
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="mt-5 text-white/40 text-base leading-relaxed max-w-md"
              >
                Empresa ecuatoriana con más de 12 años transformando espacios en Loja.
                Nacimos de la pasión por el yeso artístico y crecimos hasta convertirnos
                en un equipo multiservicios de confianza.
              </motion.p>

              {/* Tags */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="mt-7 flex flex-wrap gap-2"
              >
                {[
                  { icon: MapPin, text: "Loja, Ecuador" },
                  { icon: Calendar, text: "Desde 2012" },
                  { icon: Globe, text: "Inspirados en España" },
                  { icon: Award, text: "+12 años" },
                ].map((t) => (
                  <span key={t.text} className="inline-flex items-center gap-1.5 text-xs text-white/35 bg-white/4 border border-white/8 px-3 py-1.5 rounded-full">
                    <t.icon className="h-3 w-3 text-brand-gold/60" />
                    {t.text}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Bloque visual decorativo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as Easing }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl border border-white/6 bg-[#0a0a10] p-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-gold/8 rounded-full blur-3xl" />
                <p className="text-[10px] uppercase tracking-widest text-brand-gold/50 mb-4">Nuestra esencia</p>
                <blockquote className="font-heading text-xl text-white/70 leading-relaxed italic">
                  "Cada pieza que sale de nuestras manos lleva el sello de quien la encargó."
                </blockquote>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <Star className="h-4 w-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold">Fundador</p>
                    <p className="text-white/30 text-xs">La Casa del Yeso Artístico</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="relative overflow-hidden rounded-2xl bg-[#0a0a10] border border-white/5 p-5 text-center group hover:border-brand-gold/20 transition-colors"
              >
                <div className="absolute inset-0 bg-brand-gold/3 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-heading text-3xl sm:text-4xl font-bold relative"
                  style={{
                    background: "linear-gradient(135deg, #c9a84c, #f5d78e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-white/30 text-xs mt-1.5 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="mb-14"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/50 mb-3">Nuestra historia</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white/90">
              Del arte europeo<br />
              <span className="text-white/40">al corazón de Ecuador</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Texto */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="space-y-5 text-white/40 leading-relaxed text-sm"
            >
              <p>
                Todo comenzó en <span className="text-white/70 font-medium">España</span>, donde nuestro fundador pasó años estudiando multiservicios y adentrándose en los fundamentos de la arquitectura. Allí descubrió el arte del yeso decorativo.
              </p>
              <p>
                De vuelta en Loja, en 2012 fundó{" "}
                <span className="text-brand-gold font-semibold">La Casa del Yeso Artístico</span>{" "}
                con una visión clara: ofrecer acabados de calidad europea con el calor y la cercanía del servicio latinoamericano.
              </p>
              <p>
                Con el tiempo nos convertimos en una empresa multiservicios completa — gypsum, electricidad, artesanías y remodelaciones — siempre manteniendo los más altos estándares de calidad.
              </p>

              <div className="pt-4">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero conocer más sobre sus servicios.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-gold/70 hover:text-brand-gold text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar con nosotros
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Línea vertical con glow */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-gold/40 via-brand-gold/20 to-transparent" />

              <div className="space-y-8 pl-12">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={i}
                    className="relative group"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[2.05rem] top-1 w-3 h-3 rounded-full border-2 border-brand-gold/50 bg-[#030305] group-hover:border-brand-gold group-hover:bg-brand-gold/20 transition-all duration-300" />
                    {/* Dot glow */}
                    <div className="absolute -left-[2.2rem] top-0.5 w-4 h-4 rounded-full bg-brand-gold/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="bg-[#0a0a10] border border-white/5 group-hover:border-brand-gold/15 rounded-2xl p-4 transition-colors">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-brand-gold font-bold text-xs tracking-widest">{m.year}</span>
                        <span className="text-white/20 text-xs">·</span>
                        <span className="text-white/50 text-xs font-semibold">{m.title}</span>
                      </div>
                      <p className="text-white/30 text-sm leading-relaxed">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="text-center mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/50 mb-3">Por qué elegirnos</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white/90">
              Lo que nos hace{" "}
              <span style={{
                background: "linear-gradient(135deg, #c9a84c, #f5d78e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                diferentes
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {valores.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i + 1}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden bg-[#0a0a10] border border-white/5 ${v.border} rounded-2xl p-6 transition-all duration-300`}
              >
                <div className={`absolute inset-0 ${v.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`relative inline-flex items-center justify-center w-11 h-11 rounded-xl ${v.iconBg} transition-colors mb-4`}>
                  <v.icon className={`h-5 w-5 ${v.iconColor}`} />
                </div>
                <h3 className="relative font-heading text-base font-bold text-white/85 group-hover:text-white transition-colors mb-2">
                  {v.title}
                </h3>
                <p className="relative text-white/30 text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-brand-gold/15 bg-[#0a0a10] p-10 sm:p-14 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

            <p className="relative text-[10px] uppercase tracking-[0.3em] text-brand-gold/50 mb-4">¿Listo para empezar?</p>
            <h2 className="relative font-heading text-3xl sm:text-4xl font-bold text-white/90 mb-3">
              Trabajemos juntos
            </h2>
            <p className="relative text-white/30 max-w-sm mx-auto text-sm leading-relaxed mb-8">
              Cuéntanos tu proyecto y te daremos la mejor solución con calidad garantizada.
            </p>

            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contacto"
                className="group inline-flex items-center gap-2 bg-brand-gold text-brand-night font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(201,168,76,0.25)] hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] transition-all duration-300 overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Contactar ahora</span>
                <ArrowRight className="h-3.5 w-3.5 relative group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero cotizar un proyecto.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
