import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para solicitar una cotización de techos gypsum, molduras o decoración artística en Guatemala. Respuesta en menos de 24 horas.",
  keywords: [
    "contacto yeso artístico Guatemala",
    "cotización gypsum",
    "presupuesto techos gypsum",
    "contactar decoración Guatemala",
  ],
  alternates: {
    canonical: "https://www.lacasadelyesoartistico.com/contacto",
  },
  openGraph: {
    title: "Contacto | La Casa del Yeso Artístico",
    description:
      "Solicita tu cotización de techos gypsum y decoración artística en Guatemala.",
    url: "https://www.lacasadelyesoartistico.com/contacto",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
