"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Error al crear cuenta");
    } else {
      router.push("/login?registered=true");
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
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="font-heading text-xl font-bold text-brand-night">
              La Casa del{" "}
              <span className="text-brand-gold">Yeso Artístico</span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-brand-night font-heading">
              Crear cuenta
            </h1>
            <p className="mt-1 text-sm text-brand-night/60">
              Regístrate para hacer seguimiento de tus pedidos
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-night mb-1.5">
                Nombre completo
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-night mb-1.5">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@correo.com"
                className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-night mb-1.5">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                className="w-full rounded-lg border border-brand-night/20 px-3.5 py-2.5 text-sm text-brand-night placeholder:text-brand-night/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-brand-night hover:bg-brand-gold/90 font-semibold h-10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Crear cuenta"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-night/60">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-brand-gold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
