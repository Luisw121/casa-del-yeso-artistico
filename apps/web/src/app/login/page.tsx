"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Correo o contraseña incorrectos");
    } else {
      router.push("/dashboard");
      router.refresh();
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
              Iniciar sesión
            </h1>
            <p className="mt-1 text-sm text-brand-night/60">
              Accede a tu cuenta para ver tus pedidos
            </p>
          </div>

          {/* Form */}
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

            <div>
              <label className="block text-sm font-medium text-brand-night mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
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
              className="w-full bg-brand-night text-brand-ivory hover:bg-brand-night/90 font-semibold h-10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-night/60">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-brand-gold hover:underline"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
