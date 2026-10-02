import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import MaterialsPage from "@/components/materials/MaterialsPage";

export const metadata: Metadata = {
  title: "Materiales | UkrMadera",
  description:
    "Descubre por qué la madera es la base de nuestros espacios: calidez, versatilidad y una construcción más respetuosa con el entorno.",
};

export default function MaterialesPage() {
  return (
    <main>
      <Header />
      <MaterialsPage />
    </main>
  );
}
