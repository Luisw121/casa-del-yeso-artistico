"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Hammer, Palette, Home } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

const services = [
  {
    icon: Home,
    title: "Techos de Gypsum",
    description:
      "Remodelamos y diseñamos techos de gypsum para hogares y espacios comerciales. Trabajamos con molduras decorativas, cielos rasos, divisiones y acabados personalizados que transforman cualquier ambiente.",
    features: ["Cielos rasos lisos y texturizados", "Molduras decorativas", "Divisiones interiores", "Reparaciones y mantenimiento"],
  },
  {
    icon: Zap,
    title: "Servicios Eléctricos",
    description:
      "Instalaciones eléctricas residenciales y comerciales. Desde puntos de luz y tomacorrientes hasta tableros de distribución. Trabajamos con seguridad y materiales certificados.",
    features: ["Instalaciones eléctricas nuevas", "Reparaciones y mantenimiento", "Tableros de distribución", "Iluminación LED"],
  },
  {
    icon: Palette,
    title: "Artesanías Decorativas",
    description:
      "Figuras y piezas artesanales elaboradas en yeso artístico. Elementos decorativos únicos para interiores: ángeles, molduras, columnas, bajorrelieves y piezas a medida.",
    features: ["Figuras decorativas en yeso", "Molduras a medida", "Piezas personalizadas", "Arte en relieve"],
  },
  {
    icon: Hammer,
    title: "Multiservicios de Construcción",
    description:
      "Somos una empresa multiservicios. Además del gypsum y la electricidad, brindamos soluciones integrales de construcción y remodelación para que tu espacio quede exactamente como lo imaginas.",
    features: ["Remodelaciones integrales", "Pintura y acabados", "Instalaciones sanitarias", "Asesoría de diseño"],
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-night py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Nuestros Servicios
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-ivory leading-tight"
          >
            Soluciones completas para
            <br />
            <span className="text-brand-gold">tu espacio</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 mx-auto max-w-2xl text-brand-ivory/70 text-lg"
          >
            Más de 12 años transformando hogares y espacios comerciales en Loja, Ecuador.
            Gypsum, electricidad, artesanías y mucho más.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8">
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90 px-8"
            >
              Solicitar cotización
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-brand-ivory py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-brand-night/5"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 mb-5">
                  <service.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-brand-night mb-3">
                  {service.title}
                </h2>
                <p className="text-brand-night/60 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-brand-night/80">
                      <CheckCircle className="h-4 w-4 text-brand-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-night py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-ivory mb-4">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-brand-ivory/60 mb-8 max-w-lg mx-auto">
            Contáctanos y te damos una cotización gratuita sin compromiso. Trabajamos en Loja y sus alrededores.
          </p>
          <Button
            render={<Link href="/contacto" />}
            size="lg"
            className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90 px-8"
          >
            Hablar con nosotros
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
