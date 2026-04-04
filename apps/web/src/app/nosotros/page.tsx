"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Award, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

const milestones = [
  { year: "2012", text: "Fundación de La Casa del Yeso Artístico en Loja, Ecuador." },
  { year: "2015", text: "Expansión a servicios eléctricos residenciales y comerciales." },
  { year: "2018", text: "Lanzamiento de la línea de artesanías decorativas en yeso." },
  { year: "2024", text: "Más de 500 proyectos completados en Loja y sus alrededores." },
];

const stats = [
  { value: "12+", label: "Años de experiencia" },
  { value: "500+", label: "Proyectos completados" },
  { value: "4", label: "Servicios especializados" },
  { value: "100%", label: "Clientes satisfechos" },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-night py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Quiénes somos
            </motion.p>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-ivory leading-tight"
            >
              Arte, oficio y
              <br />
              <span className="text-brand-gold">pasión por construir</span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="mt-6 text-brand-ivory/70 text-lg leading-relaxed"
            >
              Somos una empresa ecuatoriana con más de doce años transformando espacios
              en Loja. Nacimos de la pasión de nuestro fundador, quien estudió
              multiservicios y principios de arquitectura en España, y trajo ese conocimiento
              a Ecuador para servir a su comunidad.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-gold py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              >
                <p className="font-heading text-4xl font-bold text-brand-night">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-brand-night/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="bg-brand-ivory py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Texto */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            >
              <h2 className="font-heading text-3xl font-bold text-brand-night mb-6">
                Nuestra historia
              </h2>
              <div className="space-y-4 text-brand-night/70 leading-relaxed">
                <p>
                  Todo comenzó en España, donde nuestro fundador pasó años estudiando
                  servicios multiservicios y adentrándose en los fundamentos de la
                  arquitectura. Allí descubrió el arte del yeso decorativo y la belleza
                  que puede aportar a los espacios.
                </p>
                <p>
                  De vuelta en Loja, Ecuador, en 2012 fundó <strong className="text-brand-night">La Casa del Yeso Artístico</strong>
                  {" "}con una visión clara: ofrecer acabados de calidad europea con el
                  calor y la cercanía del servicio latinoamericano.
                </p>
                <p>
                  Con el tiempo, expandimos nuestros servicios para convertirnos en una
                  empresa multiservicios completa: gypsum, electricidad, artesanías y
                  remodelaciones integrales, siempre manteniendo los más altos estándares
                  de calidad.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-brand-night/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-gold" />
                  Loja, Ecuador
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brand-gold" />
                  Fundada en 2012
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-brand-gold" />
                  Inspirada en España
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-brand-gold" />
                  +12 años de experiencia
                </span>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            >
              <h3 className="font-heading text-xl font-bold text-brand-night mb-8">
                Nuestra trayectoria
              </h3>
              <div className="relative pl-6 border-l-2 border-brand-gold/30 space-y-8">
                {milestones.map((m, i) => (
                  <div key={m.year} className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-brand-gold border-4 border-brand-ivory" />
                    <p className="text-brand-gold font-bold text-sm mb-1">{m.year}</p>
                    <p className="text-brand-night/70 text-sm leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-night py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-ivory mb-4">
            Trabajemos juntos
          </h2>
          <p className="text-brand-ivory/60 mb-8 max-w-lg mx-auto">
            Cuéntanos tu proyecto y te daremos la mejor solución.
          </p>
          <Button
            render={<Link href="/contacto" />}
            size="lg"
            className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90 px-8"
          >
            Contáctanos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
