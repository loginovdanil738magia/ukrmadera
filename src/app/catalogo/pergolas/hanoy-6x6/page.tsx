import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import HanoyPage from "@/components/products/HanoyPage";

export const metadata: Metadata = {
  title: "Pérgola para coches Hanoy 6×6 | UkrMadera",
  description: "Pérgola de madera Hanoy de 6 × 6 m para dos coches, disponible con o sin montaje.",
};

export default function Page() {
  return <><Header /><main><HanoyPage /></main></>;
}
