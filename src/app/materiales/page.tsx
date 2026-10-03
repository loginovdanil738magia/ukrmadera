import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import MaterialsPage from "@/components/materials/MaterialsPage";

export const metadata: Metadata = {
  title: "Materiales para construcciones de madera",
  description: "Conoce la madera y los materiales empleados por UkrMadera: calidez, versatilidad y soluciones pensadas para construcciones de madera.",
  alternates: { canonical: "/materiales" },
};

export default function MaterialesPage() {
  return <main><Header /><MaterialsPage /></main>;
}
