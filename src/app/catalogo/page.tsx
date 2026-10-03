import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import CatalogGrid from "@/components/catalog/CatalogGrid";

export const metadata: Metadata = {
  title: "Catálogo de casas y estructuras de madera",
  description: "Catálogo UkrMadera: casas, casetas de jardín, quioscos, garajes y pérgolas de madera. Consulta modelos, medidas y precios.",
  alternates: { canonical: "/catalogo" },
  openGraph: { title: "Catálogo de construcciones de madera | UkrMadera", description: "Descubre casas, casetas, quioscos, garajes y pérgolas de madera.", url: "/catalogo", images: ["/images/catalog/catalog-hero.webp"] },
};

export default function CatalogPage() {
  return <main><Header /><CatalogGrid /></main>;
}
