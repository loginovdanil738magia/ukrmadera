import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "Nosotros | Arquitectura y construcción en madera",
  description: "Conoce el enfoque de UkrMadera: diseño, fabricación y construcción de casas y estructuras de madera pensadas para durar.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <AboutContent />
    </>
  );
}
