"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

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

  async function handleSocial(provider: string) {
    setSocialLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
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

          {/* Social buttons */}
          <div className="space-y-2 mb-6">
            <button
              onClick={() => handleSocial("google")}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-2.5 border border-brand-night/15 rounded-lg px-4 py-2.5 text-sm font-medium text-brand-night hover:bg-brand-night/5 transition-colors disabled:opacity-50"
            >
              {socialLoading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
              Continuar con Google
            </button>
            <button
              onClick={() => handleSocial("apple")}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-2.5 border border-brand-night/15 rounded-lg px-4 py-2.5 text-sm font-medium text-brand-night hover:bg-brand-night/5 transition-colors disabled:opacity-50"
            >
              {socialLoading === "apple" ? <Loader2 className="h-4 w-4 animate-spin" /> : <AppleIcon />}
              Continuar con Apple
            </button>
            <button
              onClick={() => handleSocial("facebook")}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-2.5 border border-brand-night/15 rounded-lg px-4 py-2.5 text-sm font-medium text-brand-night hover:bg-brand-night/5 transition-colors disabled:opacity-50"
            >
              {socialLoading === "facebook" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FacebookIcon />}
              Continuar con Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-brand-night/10" />
            <span className="text-xs text-brand-night/40 font-medium">o con correo</span>
            <div className="flex-1 h-px bg-brand-night/10" />
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-brand-night">
                  Contraseña
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-brand-gold hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
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
