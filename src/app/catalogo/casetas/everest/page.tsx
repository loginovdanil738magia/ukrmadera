import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import EverestPage from "@/components/products/EverestPage";

export const metadata: Metadata = {
  title: "Caseta de jardín Everest aislada",
  description: "Caseta de jardín Everest aislada, disponible en 12, 15, 20 y 25 m². Consulta imágenes, planos, tamaños, configuraciones y precios.",
  alternates: { canonical: "/catalogo/casetas/everest" },
  openGraph: {
    title: "Caseta de jardín Everest aislada | UkrMadera",
    description: "Caseta de jardín Everest aislada, disponible en 12, 15, 20 y 25 m². Consulta imágenes, planos, tamaños, configuraciones y precios.",
    url: "/catalogo/casetas/everest",
    images: ["/images/products/everest/everest1.webp"],
  },
};

export default function EverestProductPage() {
  return <main><Header /><EverestPage /></main>;
}
