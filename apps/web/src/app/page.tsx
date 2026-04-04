"use client";

import Link from "next/link";
import { motion, type Variants, type Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as Easing },
  }),
};

const features = [
  {
    icon: Star,
    title: "Acabados Premium",
    description:
      "Materiales de primera calidad con técnicas artesanales que garantizan resultados extraordinarios.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Obra",
    description:
      "Cada proyecto incluye garantía escrita y seguimiento post-instalación para tu tranquilidad.",
  },
  {
    icon: Clock,
    title: "Entrega a Tiempo",
    description:
      "Cumplimos los plazos acordados. Tu proyecto listo cuando lo necesitas, sin sorpresas.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-night overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, #C9A96E 0%, transparent 50%), radial-gradient(circle at 75% 20%, #C9A96E 0%, transparent 40%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <Badge className="bg-brand-gold/20 text-brand-gold border-brand-gold/30 mb-6 text-xs tracking-widest uppercase">
              Especialistas en Gypsum
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-brand-ivory leading-tight"
          >
            Transformamos{" "}
            <span className="text-brand-gold">espacios</span>
            <br />
            con arte y precisión
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 mx-auto max-w-2xl text-brand-ivory/70 text-lg leading-relaxed"
          >
            Techos de gypsum, molduras decorativas y acabados artísticos de
            alta calidad. Más de una década transformando hogares y espacios
            comerciales.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90 px-8"
            >
              Solicitar cotización
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/servicios/techos-gypsum" />}
              size="lg"
              variant="outline"
              className="border-brand-ivory/30 text-brand-ivory hover:bg-white/10 hover:border-brand-gold px-8"
            >
              Ver servicios
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-brand-ivory py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-night">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-3 text-brand-night/60 max-w-xl mx-auto">
              Cada detalle importa. Nuestro compromiso es con la excelencia en
              cada obra.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i + 1}
                className="bg-white rounded-2xl p-8 shadow-sm border border-brand-night/5 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 mb-5">
                  <feature.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-night mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-night/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-gold">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="font-heading text-3xl sm:text-4xl font-bold text-brand-night"
          >
            ¿Listo para transformar tu espacio?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="mt-3 text-brand-night/70 max-w-xl mx-auto"
          >
            Contáctanos hoy y recibe una cotización gratuita sin compromiso.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="mt-8"
          >
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              className="bg-brand-night text-brand-ivory hover:bg-brand-night/90 font-semibold px-10"
            >
              Contactar ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
