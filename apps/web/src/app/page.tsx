"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants, type Easing } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ShieldCheck, Clock, ShoppingBag, Hammer, Wrench } from "lucide-react";

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
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-night overflow-hidden">
        {/* Logo con efecto LED — glow pulsante de fondo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Halo de luz detrás del logo */}
          <div
            className="absolute w-[600px] h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <Image
            src="/logo.png"
            alt=""
            width={1000}
            height={720}
            className="object-contain select-none"
            style={{
              filter: "grayscale(100%) brightness(3) drop-shadow(0 0 30px rgba(255,255,255,0.25)) drop-shadow(0 0 80px rgba(255,255,255,0.1))",
              opacity: 0.09,
            }}
          />
        </motion.div>

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
            {/* Botón Tienda — carrito animado */}
            <Link
              href="/tienda"
              className="group inline-flex items-center gap-3 bg-white text-black font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/5"
            >
              <span className="relative flex items-center justify-center w-6 h-6">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute"
                >
                  <ShoppingBag className="h-4 w-4" />
                </motion.span>
                <motion.span
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-black rounded-full"
                />
              </span>
              Tienda
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Botón Servicios — herramientas animadas */}
            <Link
              href="/servicios/techos-gypsum"
              className="group inline-flex items-center gap-3 border border-white/20 text-white font-semibold text-sm px-8 py-4 rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-200"
            >
              <span className="relative flex items-center justify-center w-6 h-6">
                <motion.span
                  animate={{ rotate: [0, -20, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0"
                >
                  <Hammer className="h-3.5 w-3.5" />
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute right-0"
                >
                  <Wrench className="h-3.5 w-3.5" />
                </motion.span>
              </span>
              Servicios
            </Link>
          </motion.div>

          {!isLoggedIn && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-5"
            >
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border border-brand-ivory/20 text-brand-ivory/70 hover:text-white hover:border-white/50 text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:bg-white/5"
              >
                Iniciar sesión
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#0D0D1A] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-ivory">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-3 text-brand-ivory/50 max-w-xl mx-auto">
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
                className="bg-[#111122] rounded-2xl p-8 border border-brand-ivory/5 hover:border-brand-gold/20 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 mb-5">
                  <feature.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-ivory mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-ivory/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-night border-t border-brand-gold/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="font-heading text-3xl sm:text-4xl font-bold text-brand-ivory"
          >
            ¿Listo para transformar tu espacio?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="mt-3 text-brand-ivory/50 max-w-xl mx-auto"
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
              className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90 px-10"
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
