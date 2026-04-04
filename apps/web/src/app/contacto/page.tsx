"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: "+593 939 603 613",
    href: "https://wa.me/593939603613",
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    value: "casadelyesoartistico@hotmail.com",
    href: "mailto:casadelyesoartistico@hotmail.com",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Loja, Ecuador",
    href: null,
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lun – Sáb: 8:00 – 18:00",
    href: null,
  },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Por ahora abre el cliente de email — integraremos Resend/email server-side después
    const subject = encodeURIComponent(`Consulta de ${form.name}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\n\nMensaje:\n${form.message}`
    );
    window.location.href = `mailto:casadelyesoartistico@hotmail.com?subject=${subject}&body=${body}`;
    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-night py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Contáctanos
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-heading text-4xl sm:text-5xl font-bold text-brand-ivory"
          >
            Hablemos de tu <span className="text-brand-gold">proyecto</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-4 text-brand-ivory/70 max-w-xl mx-auto"
          >
            Escríbenos o llámanos. Te respondemos rápido y sin costo.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-brand-ivory py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Info */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            >
              <h2 className="font-heading text-2xl font-bold text-brand-night mb-8">
                Información de contacto
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-night/40 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-brand-night font-medium hover:text-brand-gold transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-brand-night font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/593939603613"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-brand-night/5 p-8">
                <h2 className="font-heading text-2xl font-bold text-brand-night mb-6">
                  Envíanos un mensaje
                </h2>

                {status === "success" ? (
                  <div className="text-center py-10">
                    <p className="text-2xl mb-2">✓</p>
                    <p className="font-semibold text-brand-night">¡Mensaje enviado!</p>
                    <p className="text-sm text-brand-night/60 mt-1">
                      Se abrió tu cliente de email. También puedes escribirnos por WhatsApp.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 text-sm text-brand-gold hover:underline"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-night mb-1.5">
                          Nombre *
                        </label>
                        <input
                          name="name" type="text" value={form.name} onChange={handleChange} required
                          placeholder="Tu nombre"
                          className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-night mb-1.5">
                          Teléfono
                        </label>
                        <input
                          name="phone" type="tel" value={form.phone} onChange={handleChange}
                          placeholder="0939603613"
                          className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-night mb-1.5">
                        Correo electrónico *
                      </label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="tu@correo.com"
                        className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-night mb-1.5">
                        Mensaje *
                      </label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange} required
                        rows={4} placeholder="Cuéntanos sobre tu proyecto..."
                        className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors resize-none"
                      />
                    </div>
                    <Button
                      type="submit" disabled={status === "loading"}
                      className="w-full bg-brand-night text-brand-ivory hover:bg-brand-night/90 font-semibold h-10"
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Enviar mensaje
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
