"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import { Wrench, Zap, Droplets, CloudRain, MessageCircle } from "lucide-react";

const WA_NUMBER = "593939603613";

const servicios = [
  {
    icon: Droplets,
    titulo: "Plomería o Gasfitería",
    descripcion: "Fugas de agua, tuberías rotas, instalaciones sanitarias.",
    mensaje:
      "Hola, tengo un problema urgente de *Plomería o Gasfitería* y necesito ayuda. ¿Pueden atenderme?",
  },
  {
    icon: Wrench,
    titulo: "Desatasco de Tuberías",
    descripcion: "Tuberías tapadas, desagües bloqueados, baños obstruidos.",
    mensaje:
      "Hola, tengo un problema urgente de *Desatasco de Tuberías* y necesito ayuda. ¿Pueden atenderme?",
  },
  {
    icon: Zap,
    titulo: "Reparaciones Eléctricas",
    descripcion: "Cortes de luz, cortocircuitos, instalaciones eléctricas.",
    mensaje:
      "Hola, tengo un problema urgente de *Reparaciones Eléctricas* y necesito ayuda. ¿Pueden atenderme?",
  },
  {
    icon: CloudRain,
    titulo: "Impermeabilización de Goteras",
    descripcion: "Goteras en techos y terrazas, filtraciones de agua.",
    mensaje:
      "Hola, tengo un problema urgente de *Impermeabilización de Goteras en Techos o Terrazas* y necesito ayuda. ¿Pueden atenderme?",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as Easing },
  }),
};

function waLink(mensaje: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export default function ServiciosUrgentesPage() {
  return (
    <div className="min-h-screen bg-brand-night py-16 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Encabezado */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-12"
        >
          <span className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-gold border border-brand-gold/30 px-4 py-1.5 rounded-full mb-4">
            Disponibles 24 horas
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-ivory mt-4">
            Servicios Urgentes
          </h1>
          <p className="mt-4 text-brand-ivory/50 max-w-lg mx-auto">
            Selecciona tu problema y te conectamos directo con nuestro equipo vía WhatsApp.
          </p>
        </motion.div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {servicios.map((s, i) => (
            <motion.a
              key={s.titulo}
              href={waLink(s.mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i + 1}
              className="group bg-[#111122] border border-brand-ivory/5 hover:border-brand-gold/40 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:bg-[#16162a] cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                <s.icon className="h-5 w-5 text-brand-gold" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-brand-ivory group-hover:text-brand-gold transition-colors">
                  {s.titulo}
                </h2>
                <p className="text-brand-ivory/45 text-sm mt-1 leading-relaxed">
                  {s.descripcion}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-2 text-brand-gold/70 text-xs font-medium group-hover:text-brand-gold transition-colors">
                <MessageCircle className="h-3.5 w-3.5" />
                Contactar por WhatsApp
              </div>
            </motion.a>
          ))}
        </div>

        {/* Opción OTROS */}
        <motion.a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="group w-full bg-[#111122] border border-brand-ivory/5 hover:border-brand-gold/40 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:bg-[#16162a]"
        >
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
              <MessageCircle className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-ivory group-hover:text-brand-gold transition-colors">
                Otro problema
              </h2>
              <p className="text-brand-ivory/45 text-sm">
                Escríbenos directamente y cuéntanos qué necesitas.
              </p>
            </div>
          </div>
          <span className="text-brand-gold/60 group-hover:text-brand-gold text-sm font-medium transition-colors hidden sm:block">
            Escribir →
          </span>
        </motion.a>
      </div>
    </div>
  );
}
