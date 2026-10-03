import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Categories from "@/components/sections/Categories";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import HomeMaterials from "@/components/sections/HomeMaterials";
import WhyUkrMadera from "@/components/sections/WhyUkrMadera";
import Process from "@/components/sections/Process";
import HomeClosing from "@/components/sections/HomeClosing";

export const metadata: Metadata = {
  title: "Casas y construcciones de madera",
  description: "Diseño, fabricación y construcción de casas, casetas, garajes, pérgolas y otras estructuras de madera. Explora el catálogo de UkrMadera.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Manifesto />
      <Categories />
      <HomeMaterials />
      <FeaturedProjects />
      <WhyUkrMadera />
      <Process />
      <HomeClosing />
    </main>
  );
}
