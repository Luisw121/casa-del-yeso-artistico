"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, User, LogOut, LayoutDashboard, ShieldCheck,
  Wrench, Zap, ShoppingBag, Users, Phone, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { label: "Servicios", href: "/servicios/techos-gypsum", icon: Wrench },
  { label: "Servicios Urgentes", href: "/servicios/urgentes", icon: Zap, urgent: true },
  { label: "Tienda", href: "/tienda", icon: ShoppingBag },
  { label: "Nosotros", href: "/nosotros", icon: Users },
  { label: "Contacto", href: "/contacto", icon: Phone },
];

const menuItem = {
  hidden: { opacity: 0, x: 24 },
  show: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, x: 24, transition: { duration: 0.15 } },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 bg-brand-night text-brand-ivory shadow-md">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-sm sm:text-base font-bold tracking-wide text-white shrink-0">
            La Casa del{" "}
            <span className="text-white/60">Yeso Artístico y Multiservicios</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  (link as { urgent?: boolean }).urgent
                    ? "text-sm font-semibold text-brand-gold border border-brand-gold/40 px-3 py-1 rounded-full hover:bg-brand-gold/10 transition-colors"
                    : "text-sm font-medium text-brand-ivory/80 transition-colors hover:text-brand-gold"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <CartDrawer />
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link href="/admin" className="flex items-center gap-1.5 text-xs font-semibold bg-brand-gold text-brand-night px-3 py-1.5 rounded-lg hover:bg-brand-gold/90 transition-colors">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-brand-ivory/80 hover:text-brand-gold transition-colors">
                  <User className="h-4 w-4" />
                  {session.user?.name?.split(" ")[0] ?? "Mi cuenta"}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: window.location.origin })}
                  className="flex items-center gap-1 text-sm text-brand-ivory/50 hover:text-red-400 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button render={<Link href="/login" />} variant="ghost" size="sm" className="text-brand-ivory hover:text-brand-gold hover:bg-white/10">
                Iniciar sesión
              </Button>
            )}
          </div>

          {/* Mobile: carrito + hamburguesa */}
          <div className="md:hidden flex items-center gap-2">
            <CartDrawer />
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-lg text-brand-ivory hover:bg-white/10 transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — overlay animado */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[calc(2px+4rem)] bg-black/60 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed top-[calc(2px+4rem)] right-0 h-[calc(100vh-4rem-2px)] w-72 bg-[#080810] border-l border-brand-gold/15 z-50 md:hidden flex flex-col"
            >
              {/* Línea dorada top */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

              <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    variants={menuItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    custom={i}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={
                        (link as { urgent?: boolean }).urgent
                          ? "flex items-center justify-between px-4 py-3 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-semibold group hover:bg-brand-gold/20 transition-all"
                          : "flex items-center justify-between px-4 py-3 rounded-xl text-brand-ivory/75 font-medium group hover:bg-white/5 hover:text-brand-ivory transition-all"
                      }
                    >
                      <span className="flex items-center gap-3">
                        <link.icon className={`h-4 w-4 ${(link as { urgent?: boolean }).urgent ? "text-brand-gold" : "text-brand-ivory/40 group-hover:text-brand-gold"} transition-colors`} />
                        {link.label}
                        {(link as { urgent?: boolean }).urgent && (
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-brand-gold opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
                          </span>
                        )}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}

                <div className="my-3 h-px bg-brand-gold/10" />

                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-gold font-semibold hover:bg-brand-gold/10 transition-all">
                        <ShieldCheck className="h-4 w-4" />
                        Panel Admin
                      </Link>
                    )}
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-ivory/75 hover:bg-white/5 hover:text-brand-ivory transition-all">
                      <LayoutDashboard className="h-4 w-4 text-brand-ivory/40" />
                      Mi cuenta
                    </Link>
                    <button
                      onClick={() => { setOpen(false); signOut({ callbackUrl: window.location.origin }); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-ivory/40 hover:text-red-400 hover:bg-red-400/5 transition-all w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-ivory/75 hover:bg-white/5 hover:text-brand-ivory transition-all">
                    <User className="h-4 w-4 text-brand-ivory/40" />
                    Iniciar sesión
                  </Link>
                )}
              </nav>

              {/* Footer del menú */}
              <div className="px-4 py-4 border-t border-brand-gold/10">
                <p className="text-brand-ivory/25 text-xs text-center">La Casa del Yeso Artístico</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
