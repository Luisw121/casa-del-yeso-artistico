import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la historia de La Casa del Yeso Artístico, líderes en decoración con gypsum y yeso artístico en Loja Ecuador. Más de años de experiencia transformando espacios.",
  keywords: [
    "empresa yeso artístico Loja Ecuador",
    "quiénes somos",
    "historia decoración gypsum",
    "expertos gypsum Loja Ecuador",
  ],
  alternates: {
    canonical: "https://www.lacasadelyesoartistico.com/nosotros",
  },
  openGraph: {
    title: "Sobre Nosotros | La Casa del Yeso Artístico",
    description:
      "Líderes en decoración con gypsum y yeso artístico en Loja Ecuador.",
    url: "https://www.lacasadelyesoartistico.com/nosotros",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
