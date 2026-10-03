import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import QuioscoPage from "@/components/products/QuioscoPage";

export const metadata: Metadata = {
  title: "Quiosco de madera 5×3 | UkrMadera",
  description: "Quiosco de madera de 15 m² con dos aperturas ajustables. Consulta planos, configuraciones y precios con o sin montaje.",
};

export default function QuioscoProductPage() {
  return <main><Header /><QuioscoPage /></main>;
}
