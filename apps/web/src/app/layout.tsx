import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const BASE_URL = "https://www.lacasadelyesoartistico.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "La Casa del Yeso Artístico | Techos Gypsum y Decoración en Guatemala",
    template: "%s | La Casa del Yeso Artístico",
  },
  description:
    "Especialistas en techos de gypsum, molduras decorativas y yeso artístico en Guatemala. Instalación profesional con garantía de obra. Solicita tu cotización gratis.",
  keywords: [
    "yeso artístico Guatemala",
    "techos gypsum Guatemala",
    "molduras decorativas",
    "instalación gypsum",
    "decoración interior Guatemala",
    "techo de yeso",
    "cielo falso gypsum",
    "molduras yeso",
    "acabados decorativos",
    "yeso artístico",
  ],
  authors: [{ name: "La Casa del Yeso Artístico" }],
  creator: "La Casa del Yeso Artístico",
  publisher: "La Casa del Yeso Artístico",
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "La Casa del Yeso Artístico | Techos Gypsum y Decoración en Guatemala",
    description:
      "Especialistas en techos de gypsum, molduras decorativas y yeso artístico en Guatemala. Solicita tu cotización gratis.",
    url: BASE_URL,
    siteName: "La Casa del Yeso Artístico",
    locale: "es_GT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Casa del Yeso Artístico - Techos Gypsum Guatemala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Casa del Yeso Artístico | Techos Gypsum Guatemala",
    description:
      "Especialistas en techos de gypsum y decoración artística en Guatemala.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "La Casa del Yeso Artístico",
  description:
    "Especialistas en techos de gypsum, molduras decorativas y yeso artístico en Guatemala.",
  url: BASE_URL,
  telephone: "+502",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GT",
    addressLocality: "Guatemala",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.6349,
    longitude: -90.5069,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  sameAs: [],
  priceRange: "$$",
  image: `${BASE_URL}/og-image.jpg`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Yeso Artístico",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Techos de Gypsum",
          description: "Instalación profesional de techos de gypsum con diseños personalizados.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Molduras Decorativas",
          description: "Molduras de yeso artístico para interiores y exteriores.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(inter.variable, playfair.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
