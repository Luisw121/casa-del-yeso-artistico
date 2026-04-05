import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { LayoutDashboard, Package, ShoppingBag, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/productos", label: "Productos", icon: Package, exact: false },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag, exact: false },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-night flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-heading text-brand-gold font-bold text-lg leading-tight">
            La Casa del Yeso
          </p>
          <p className="text-white/40 text-xs mt-0.5">Panel de administración</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium group"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors text-sm"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              Ver sitio web
            </Link>
          </div>
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/60 text-xs truncate mb-2 px-1">
            {session.user?.email}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
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

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
