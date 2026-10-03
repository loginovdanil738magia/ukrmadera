import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import GarageDoblePage from "@/components/products/GarageDoblePage";

export const metadata: Metadata = {
  title: "Garaje de madera Doble 1 6×6 | UkrMadera",
  description: "Garaje de madera Doble 1 de 6 × 6 m para dos coches, disponible con o sin montaje.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main><GarageDoblePage /></main>
    </>
  );
}
