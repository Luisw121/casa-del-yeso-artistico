"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Package, ShoppingBag, LogOut, ExternalLink, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/productos", label: "Productos", icon: Package, exact: false },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag, exact: false },
];

function Sidebar({
  email,
  open,
  onClose,
  signOutAction,
}: {
  email?: string | null;
  open: boolean;
  onClose: () => void;
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 w-64 bg-brand-night flex flex-col shrink-0 transition-transform duration-300",
          "lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="px-6 py-6 border-b border-white/10 flex items-start justify-between">
          <div>
            <p className="font-heading text-brand-gold font-bold text-lg leading-tight">
              La Casa del Yeso
            </p>
            <p className="text-white/40 text-xs mt-0.5">Panel de administración</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white/50 hover:text-white mt-0.5"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors text-sm"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              Ver sitio web
            </Link>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/60 text-xs truncate mb-2 px-1">{email}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

export default function AdminShell({
  email,
  signOutAction,
  children,
}: {
  email?: string | null;
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        email={email}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        signOutAction={signOutAction}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-brand-night border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/70 hover:text-white"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading text-brand-gold font-bold text-sm">
            La Casa del Yeso
          </span>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
