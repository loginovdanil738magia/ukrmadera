import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import EverestPage from "@/components/products/EverestPage";

export const metadata: Metadata = {
  title: "Caseta de jardín Everest | UkrMadera",
  description: "Everest: caseta de jardín aislada disponible en 4×3, 5×3, 5×4 y 5×5 m. Compara tamaños, planos y configuraciones.",
};

export default function EverestProductPage() {
  return <main><Header /><EverestPage /></main>;
}
