"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, User, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { label: "Servicios", href: "/servicios/techos-gypsum" },
  { label: "Tienda", href: "/tienda" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 bg-brand-night text-brand-ivory shadow-md">
      {/* Borde superior sublimado */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="La Casa del Yeso Artístico"
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-ivory/80 transition-colors hover:text-brand-gold"
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
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs font-semibold bg-brand-gold text-brand-night px-3 py-1.5 rounded-lg hover:bg-brand-gold/90 transition-colors"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-medium text-brand-ivory/80 hover:text-brand-gold transition-colors"
                >
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
              <>
                <Button
                  render={<Link href="/login" />}
                  variant="ghost"
                  size="sm"
                  className="text-brand-ivory hover:text-brand-gold hover:bg-white/10"
                >
                  Iniciar sesión
                </Button>
                <Button
                  render={<Link href="/contacto" />}
                  size="sm"
                  className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90"
                >
                  Cotizar
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <CartDrawer />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-brand-ivory hover:bg-white/10"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-brand-night text-brand-ivory border-brand-gold/20 w-64"
              >
                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-brand-ivory/80 hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="border-brand-gold/20 my-2" />
                  {isLoggedIn ? (
                    <>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-base font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Panel Admin
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 text-base font-medium text-brand-ivory/80 hover:text-brand-gold transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Mi cuenta
                      </Link>
                      <button
                        onClick={() => {
                          setOpen(false);
                          signOut({ callbackUrl: window.location.origin });
                        }}
                        className="flex items-center gap-2 text-base font-medium text-brand-ivory/50 hover:text-red-400 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="text-base font-medium text-brand-ivory/80 hover:text-brand-gold transition-colors"
                      >
                        Iniciar sesión
                      </Link>
                      <Button
                        render={<Link href="/contacto" onClick={() => setOpen(false)} />}
                        className="bg-brand-gold text-brand-night font-semibold hover:bg-brand-gold/90 w-full"
                      >
                        Cotizar
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
