import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import SmoothScroll from "@/components/animations/SmoothScroll";
import ProjectCursor from "@/components/animations/ProjectCursor";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ukrmadera.com"),
  title: {
    default: "UkrMadera | Casas y construcciones de madera",
    template: "%s | UkrMadera",
  },
  description:
    "Casas, casetas, garajes, pérgolas y construcciones de madera. Descubre modelos, medidas, planos y precios de UkrMadera.",
  applicationName: "UkrMadera",
  authors: [{ name: "UkrMadera" }],
  creator: "UkrMadera",
  publisher: "UkrMadera",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "UkrMadera",
    title: "UkrMadera | Casas y construcciones de madera",
    description:
      "Casas, casetas, garajes, pérgolas y construcciones de madera. Modelos, medidas, planos y precios.",
    images: [{ url: "/images/hero/hero-main.jpg", width: 1200, height: 630, alt: "UkrMadera - arquitectura y construcciones de madera" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UkrMadera | Casas y construcciones de madera",
    description: "Casas, casetas, garajes, pérgolas y construcciones de madera.",
    images: ["/images/hero/hero-main.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UkrMadera",
    url: "https://ukrmadera.com",
    description: "Diseño, fabricación y construcción de casas y estructuras de madera.",
  };

  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SmoothScroll />
        <ProjectCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
