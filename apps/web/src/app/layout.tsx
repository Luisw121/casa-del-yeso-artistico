import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "La Casa del Yeso Artístico",
    template: "%s | La Casa del Yeso Artístico",
  },
  description:
    "Especialistas en techos de gypsum, molduras y decoración artística. Transformamos espacios con acabados de alta calidad.",
  keywords: ["yeso artístico", "techos gypsum", "molduras", "decoración"],
  openGraph: {
    title: "La Casa del Yeso Artístico",
    description: "Especialistas en techos de gypsum y decoración artística.",
    locale: "es_GT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(inter.variable, playfair.variable)}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
