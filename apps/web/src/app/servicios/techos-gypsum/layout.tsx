import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Techos de Gypsum y Servicios",
  description:
    "Servicios profesionales de techos de gypsum, cielos falsos, molduras y acabados decorativos en Guatemala. Diseños personalizados con garantía de obra.",
  keywords: [
    "techos gypsum Guatemala",
    "cielo falso gypsum",
    "instalación gypsum",
    "molduras decorativas Guatemala",
    "techo falso",
    "acabados gypsum",
  ],
  alternates: {
    canonical: "https://www.lacasadelyesoartistico.com/servicios/techos-gypsum",
  },
  openGraph: {
    title: "Techos de Gypsum y Servicios | La Casa del Yeso Artístico",
    description:
      "Servicios profesionales de techos de gypsum y molduras en Guatemala. Solicita tu cotización gratis.",
    url: "https://www.lacasadelyesoartistico.com/servicios/techos-gypsum",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
