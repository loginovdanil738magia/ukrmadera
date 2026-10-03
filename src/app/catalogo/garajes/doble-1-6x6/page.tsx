import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import GarageDoblePage from "@/components/products/GarageDoblePage";

export const metadata: Metadata = {
  title: "Garaje de madera Doble 1 6×6 para dos coches",
  description: "Garaje de madera Doble 1 de 6×6 m y 36 m² para dos coches. Consulta imágenes, planos y precios con o sin montaje.",
  alternates: { canonical: "/catalogo/garajes/doble-1-6x6" },
  openGraph: {
    title: "Garaje de madera Doble 1 6×6 para dos coches | UkrMadera",
    description: "Garaje de madera Doble 1 de 6×6 m y 36 m² para dos coches. Consulta imágenes, planos y precios con o sin montaje.",
    url: "/catalogo/garajes/doble-1-6x6",
    images: ["/images/products/garaje-doble1/doble1_1.webp"],
  },
};

export default function Page() {
  return (
    <>
      <Header />
      <main><GarageDoblePage /></main>
    </>
  );
}
