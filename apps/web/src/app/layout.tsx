import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
    "Especialistas en techos de gypsum, molduras decorativas y yeso artístico en Loja, Ecuador. Instalación profesional con garantía de obra. Solicita tu cotización gratis.",
  keywords: [
    "yeso artístico Loja",
    "yeso artístico Ecuador",
    "techos gypsum Loja",
    "techos gypsum Ecuador",
    "molduras decorativas Loja",
    "instalación gypsum Ecuador",
    "decoración interior Loja",
    "techo de yeso",
    "cielo falso gypsum",
    "molduras yeso",
    "acabados decorativos Ecuador",
  ],
  authors: [{ name: "La Casa del Yeso Artístico" }],
  creator: "La Casa del Yeso Artístico",
  publisher: "La Casa del Yeso Artístico",
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "La Casa del Yeso Artístico | Techos Gypsum y Decoración en Loja, Ecuador",
    description:
      "Especialistas en techos de gypsum, molduras decorativas y yeso artístico en Loja, Ecuador. Solicita tu cotización gratis.",
    url: BASE_URL,
    siteName: "La Casa del Yeso Artístico",
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Casa del Yeso Artístico - Techos Gypsum Loja Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Casa del Yeso Artístico | Techos Gypsum Loja Ecuador",
    description:
      "Especialistas en techos de gypsum y decoración artística en Loja, Ecuador.",
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
    "Especialistas en techos de gypsum, molduras decorativas y yeso artístico en Loja, Ecuador.",
  url: BASE_URL,
  telephone: "+593985070306",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EC",
    addressLocality: "Loja",
    addressRegion: "Loja",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -3.9931,
    longitude: -79.2042,
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DHZFBE9CXC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DHZFBE9CXC');
          `}
        </Script>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
