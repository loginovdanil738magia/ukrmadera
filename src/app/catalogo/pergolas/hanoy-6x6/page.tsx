import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import HanoyPage from "@/components/products/HanoyPage";

export const metadata: Metadata = {
  title: "Pérgola para coches Hanoy 6×6",
  description: "Pérgola de madera Hanoy de 6×6 m y 36 m² para dos coches. Consulta imágenes, planos y precios con o sin montaje.",
  alternates: { canonical: "/catalogo/pergolas/hanoy-6x6" },
  openGraph: {
    title: "Pérgola para coches Hanoy 6×6 | UkrMadera",
    description: "Pérgola de madera Hanoy de 6×6 m y 36 m² para dos coches. Consulta imágenes, planos y precios con o sin montaje.",
    url: "/catalogo/pergolas/hanoy-6x6",
    images: ["/images/products/hanoy/hanoy6x6_1.webp"],
  },
};

export default function Page() {
  return <><Header /><main><HanoyPage /></main></>;
}
