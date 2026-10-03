import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import AbreraPage from "@/components/products/AbreraPage";

export const metadata: Metadata = {
  title: "Casa de madera ABRERA de 170 m²",
  description: "Casa de madera ABRERA de 170 m² con 4 dormitorios y 4 baños. Consulta imágenes, planos, configuraciones y precios con o sin montaje.",
  alternates: { canonical: "/catalogo/casas/abrera" },
  openGraph: {
    title: "Casa de madera ABRERA de 170 m² | UkrMadera",
    description: "Casa de madera ABRERA de 170 m² con 4 dormitorios y 4 baños. Consulta imágenes, planos, configuraciones y precios con o sin montaje.",
    url: "/catalogo/casas/abrera",
    images: ["/images/products/abrera/abrera-01.webp"],
  },
};

export default function AbreraProductPage() {
  return (
    <main>
      <Header />
      <AbreraPage />
    </main>
  );
}
