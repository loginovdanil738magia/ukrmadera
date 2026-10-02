import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import IngridPage from "@/components/products/IngridPage";

export const metadata: Metadata = {
  title: "Casa de madera Ingrid | UkrMadera",
  description: "Descubre la casa de madera Ingrid y solicita información para adaptar el proyecto a tus necesidades.",
};

export default function IngridProductPage() {
  return (
    <main>
      <Header />
      <IngridPage />
    </main>
  );
}
