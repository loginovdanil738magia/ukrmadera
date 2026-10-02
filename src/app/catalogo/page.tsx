import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import CatalogGrid from "@/components/catalog/CatalogGrid";

export const metadata: Metadata = {
  title: "Catálogo | UkrMadera",
  description:
    "Casas, casetas de jardín, quioscos, garajes y pérgolas de madera de UkrMadera.",
};

export default function CatalogPage() {
  return (
    <main>
      <Header />
      <CatalogGrid />
    </main>
  );
}
