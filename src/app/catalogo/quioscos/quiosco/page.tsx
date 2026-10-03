import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import QuioscoPage from "@/components/products/QuioscoPage";

export const metadata: Metadata = {
  title: "Quiosco de madera 5×3 de 15 m²",
  description: "Quiosco de madera de 5×3 m y 15 m² con dos aperturas ajustables. Consulta imágenes, planos y precios con o sin montaje.",
  alternates: { canonical: "/catalogo/quioscos/quiosco" },
  openGraph: {
    title: "Quiosco de madera 5×3 de 15 m² | UkrMadera",
    description: "Quiosco de madera de 5×3 m y 15 m² con dos aperturas ajustables. Consulta imágenes, planos y precios con o sin montaje.",
    url: "/catalogo/quioscos/quiosco",
    images: ["/images/products/quiosco/quiosco5x3_1.webp"],
  },
};

export default function QuioscoProductPage() {
  return <main><Header /><QuioscoPage /></main>;
}
