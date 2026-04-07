"use client";

import type { MouseEvent } from "react";
import { motion, type Variants, type Easing } from "framer-motion";
import { Wrench, Zap, Droplets, CloudRain, MessageCircle, Clock, PhoneCall } from "lucide-react";

const WA_NUMBER = "593939603613";

const servicios = [
  {
    icon: Droplets,
    titulo: "Plomería o Gasfitería",
    descripcion: "Fugas de agua, tuberías rotas, instalaciones sanitarias.",
    mensaje: "Hola, tengo un problema urgente de *Plomería o Gasfitería* y necesito ayuda. ¿Pueden atenderme?",
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.25)",
  },
  {
    icon: Wrench,
    titulo: "Desatasco de Tuberías",
    descripcion: "Tuberías tapadas, desagües bloqueados, baños obstruidos.",
    mensaje: "Hola, tengo un problema urgente de *Desatasco de Tuberías* y necesito ayuda. ¿Pueden atenderme?",
    accent: "#f97316",
    glow: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.25)",
  },
  {
    icon: Zap,
    titulo: "Reparaciones Eléctricas",
    descripcion: "Cortes de luz, cortocircuitos, instalaciones eléctricas.",
    mensaje: "Hola, tengo un problema urgente de *Reparaciones Eléctricas* y necesito ayuda. ¿Pueden atenderme?",
    accent: "#eab308",
    glow: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.25)",
  },
  {
    icon: CloudRain,
    titulo: "Impermeabilización de Goteras",
    descripcion: "Goteras en techos y terrazas, filtraciones de agua.",
    mensaje: "Hola, tengo un problema urgente de *Impermeabilización de Goteras en Techos o Terrazas* y necesito ayuda. ¿Pueden atenderme?",
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.25)",
  },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as Easing },
  }),
};

function waLink(mensaje: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export default function ServiciosUrgentesPage() {
  return (
    <div className="min-h-screen" style={{ background: "#020204" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>

        {/* Dot grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(248,113,113,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.6,
          }}
        />

        {/* Red glow animated */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ width: 500, height: 200, background: "radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)" }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as Easing }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(127,29,29,0.18) 0%, #020204 60%)" }} />

        {/* Línea superior animada */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{ background: "linear-gradient(to right, transparent 0%, rgba(239,68,68,0.6) 50%, transparent 100%)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as Easing }}
        />

        <div className="relative mx-auto max-w-3xl px-4 pt-14 pb-12 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            En línea ahora
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-heading font-bold text-white leading-tight text-5xl sm:text-6xl"
          >
            Servicios{" "}
            <span style={{
              background: "linear-gradient(135deg, #ef4444 0%, #fca5a5 50%, #ef4444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Urgentes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 max-w-md mx-auto leading-relaxed text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Selecciona tu problema. Te conectamos al instante con nuestro equipo vía WhatsApp.
          </motion.p>

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 flex items-center justify-center gap-5 text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />Disponible 24 horas
            </span>
            <span style={{ color: "rgba(255,255,255,0.08)" }}>|</span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5" />Respuesta inmediata
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── TARJETAS ── */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {servicios.map((s, i) => (
            <motion.a
              key={s.titulo}
              href={waLink(s.mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariant}
              initial="hidden"
              animate="show"
              custom={i}
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4 cursor-pointer"
              style={{
                background: "rgba(10,10,14,0.95)",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = s.border;
                e.currentTarget.style.boxShadow = `0 0 30px ${s.glow}, inset 0 0 30px ${s.glow}`;
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${s.accent}, transparent)` }}
              />

              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-colors duration-200"
                  style={{ background: `${s.accent}15` }}
                >
                  <s.icon className="h-5 w-5" style={{ color: s.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading text-base font-bold text-white/85 group-hover:text-white transition-colors leading-snug">
                    {s.titulo}
                  </h2>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {s.descripcion}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold transition-opacity duration-200 opacity-50 group-hover:opacity-100"
                  style={{ color: s.accent }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Contactar ahora
                </span>
                <span className="font-bold text-base transition-all duration-200 opacity-20 group-hover:opacity-60 group-hover:translate-x-0.5"
                  style={{ color: s.accent }}
                >
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── OTROS ── */}
        <motion.a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative overflow-hidden w-full rounded-2xl p-5 flex items-center justify-between cursor-pointer"
          style={{
            background: "rgba(10,10,14,0.95)",
            border: "1px solid rgba(255,255,255,0.05)",
            transition: "border-color 0.25s, box-shadow 0.25s",
          }}
          onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(201,168,76,0.08)";
          }}
          onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)" }}
          />

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200"
              style={{ background: "rgba(201,168,76,0.08)" }}
            >
              <MessageCircle className="h-5 w-5" style={{ color: "rgba(201,168,76,0.7)" }} />
            </div>
            <div>
              <h2 className="font-heading text-base font-bold text-white/85 group-hover:text-white transition-colors">
                Otro problema
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                Escríbenos directamente y cuéntanos qué necesitas.
              </p>
            </div>
          </div>
          <span className="font-bold text-xl transition-all duration-200 opacity-25 group-hover:opacity-70 group-hover:translate-x-0.5 pr-1"
            style={{ color: "rgba(201,168,76,0.8)" }}
          >
            →
          </span>
        </motion.a>

        <p className="text-center text-xs mt-8 tracking-wide" style={{ color: "rgba(255,255,255,0.12)" }}>
          Al hacer clic serás redirigido a WhatsApp con un mensaje pre-escrito
        </p>
      </div>
    </div>
  );
}
