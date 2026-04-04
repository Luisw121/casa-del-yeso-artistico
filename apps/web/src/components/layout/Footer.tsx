import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  servicios: [
    { label: "Techos de Gypsum", href: "/servicios/techos-gypsum" },
    { label: "Tienda", href: "/tienda" },
    { label: "Cotización", href: "/contacto" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  cuenta: [
    { label: "Iniciar sesión", href: "/login" },
    { label: "Registrarse", href: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-night text-brand-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-heading text-lg font-bold">
              La Casa del{" "}
              <span className="text-brand-gold">Yeso Artístico</span>
            </span>
            <p className="mt-3 text-sm text-brand-ivory/60 leading-relaxed">
              Especialistas en techos de gypsum, molduras y decoración
              artística de alta calidad.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Servicios
            </h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-ivory/60 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Empresa
            </h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-ivory/60 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuenta */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Mi Cuenta
            </h4>
            <ul className="space-y-2">
              {footerLinks.cuenta.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-ivory/60 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-brand-gold/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-brand-ivory/40">
          <p>
            © {new Date().getFullYear()} La Casa del Yeso Artístico. Todos los
            derechos reservados.
          </p>
          <p>
            Desarrollado por{" "}
            <span className="text-brand-gold/70">Narvek System</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
