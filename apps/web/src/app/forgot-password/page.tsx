"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError("Ocurrió un error. Intenta de nuevo.");
    }
  }

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-brand-night/5 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-heading text-xl font-bold text-brand-night">
              La Casa del <span className="text-brand-gold">Yeso Artístico</span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-brand-night font-heading">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="mt-1 text-sm text-brand-night/60">
              Ingresa tu correo y te enviaremos un enlace para restablecerla
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <p className="text-sm text-brand-night/70">
                Si el correo <span className="font-semibold text-brand-night">{email}</span> está
                registrado, recibirás un enlace en los próximos minutos.
              </p>
              <p className="text-xs text-brand-night/40">Revisa también tu carpeta de spam.</p>
              <Link
                href="/login"
                className="block text-sm font-medium text-brand-gold hover:underline mt-2"
              >
                Volver a iniciar sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-night mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@correo.com"
                  className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-night text-brand-ivory hover:bg-brand-night/90 font-semibold h-10"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar enlace"}
              </Button>

              <p className="text-center text-sm text-brand-night/60">
                <Link href="/login" className="font-medium text-brand-gold hover:underline">
                  Volver al inicio de sesión
                </Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
