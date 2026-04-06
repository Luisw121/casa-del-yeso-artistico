"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import { Wrench, Zap, Droplets, CloudRain, MessageCircle, Clock, PhoneCall } from "lucide-react";

const WA_NUMBER = "593939603613";

const servicios = [
  {
    icon: Droplets,
    titulo: "Plomería o Gasfitería",
    descripcion: "Fugas de agua, tuberías rotas, instalaciones sanitarias.",
    mensaje: "Hola, tengo un problema urgente de *Plomería o Gasfitería* y necesito ayuda. ¿Pueden atenderme?",
    color: "from-blue-500/10 to-transparent",
    border: "hover:border-blue-400/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10 group-hover:bg-blue-400/20",
  },
  {
    icon: Wrench,
    titulo: "Desatasco de Tuberías",
    descripcion: "Tuberías tapadas, desagües bloqueados, baños obstruidos.",
    mensaje: "Hola, tengo un problema urgente de *Desatasco de Tuberías* y necesito ayuda. ¿Pueden atenderme?",
    color: "from-orange-500/10 to-transparent",
    border: "hover:border-orange-400/30",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10 group-hover:bg-orange-400/20",
  },
  {
    icon: Zap,
    titulo: "Reparaciones Eléctricas",
    descripcion: "Cortes de luz, cortocircuitos, instalaciones eléctricas.",
    mensaje: "Hola, tengo un problema urgente de *Reparaciones Eléctricas* y necesito ayuda. ¿Pueden atenderme?",
    color: "from-yellow-500/10 to-transparent",
    border: "hover:border-yellow-400/30",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-400/10 group-hover:bg-yellow-400/20",
  },
  {
    icon: CloudRain,
    titulo: "Impermeabilización de Goteras",
    descripcion: "Goteras en techos y terrazas, filtraciones de agua.",
    mensaje: "Hola, tengo un problema urgente de *Impermeabilización de Goteras en Techos o Terrazas* y necesito ayuda. ¿Pueden atenderme?",
    color: "from-cyan-500/10 to-transparent",
    border: "hover:border-cyan-400/30",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10 group-hover:bg-cyan-400/20",
  },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.09, duration: 0.5, ease: "easeOut" as Easing },
  }),
};

function waLink(mensaje: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export default function ServiciosUrgentesPage() {
  return (
    <div className="min-h-screen bg-[#030305]">

      {/* ── HERO URGENTE ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* Fondo rojo tenue */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-[#030305] to-[#030305]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-600/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-12 text-center">
          {/* Badge pulsante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 text-red-400 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            En línea ahora
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight"
          >
            Servicios{" "}
            <span style={{
              background: "linear-gradient(135deg, #f87171 0%, #fca5a5 50%, #f87171 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Urgentes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-white/35 max-w-md mx-auto leading-relaxed"
          >
            Selecciona tu problema. Te conectamos al instante con nuestro equipo vía WhatsApp.
          </motion.p>

          {/* Disponibilidad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-white/25"
          >
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Disponible 24 horas</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5"><PhoneCall className="h-3.5 w-3.5" />Respuesta inmediata</span>
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden bg-[#0c0c12] border border-white/5 ${s.border} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 cursor-pointer`}
            >
              {/* Glow de color */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10 flex items-start gap-4">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${s.iconBg} transition-colors shrink-0`}>
                  <s.icon className={`h-5 w-5 ${s.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading text-base font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
                    {s.titulo}
                  </h2>
                  <p className="text-white/30 text-sm mt-1 leading-relaxed">
                    {s.descripcion}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className={`flex items-center gap-1.5 text-xs font-semibold ${s.iconColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  <MessageCircle className="h-3.5 w-3.5" />
                  Contactar ahora
                </span>
                <span className="text-white/10 group-hover:text-white/30 text-lg transition-colors">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── OTROS ── */}
        <motion.a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative overflow-hidden w-full bg-[#0c0c12] border border-white/5 hover:border-brand-gold/30 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
              <MessageCircle className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <h2 className="font-heading text-base font-bold text-white/90 group-hover:text-brand-gold transition-colors">
                Otro problema
              </h2>
              <p className="text-white/30 text-sm">Escríbenos directamente y cuéntanos qué necesitas.</p>
            </div>
          </div>
          <span className="relative z-10 text-brand-gold/40 group-hover:text-brand-gold font-bold text-xl transition-colors pr-1">→</span>
        </motion.a>

        {/* Footer note */}
        <p className="text-center text-white/15 text-xs mt-8 tracking-wide">
          Al hacer clic serás redirigido a WhatsApp con un mensaje pre-escrito
        </p>
      </div>
    </div>
  );
}
