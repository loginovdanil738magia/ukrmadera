import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

export const metadata: Metadata = {
  title: "Nosotros | Arquitectura y construcción en madera",
  description: "Conoce el enfoque de UkrMadera: diseño, fabricación y construcción de casas y estructuras de madera pensadas para durar.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <main className="about-page">
      <Header />
      <section className="about-hero">
        <div className="about-container about-hero-inner">
          <span className="about-kicker">UkrMadera · Arquitectura en madera</span>
          <h1>Construimos con madera.<em>Pensamos en cómo se vive.</em></h1>
          <p>Diseñamos y desarrollamos espacios de madera que combinan funcionalidad, precisión y una relación natural con su entorno.</p>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-container about-intro-grid">
          <div><span className="about-section-number">01</span><h2>Una forma más natural de <em>construir.</em></h2></div>
          <div className="about-copy">
            <p>En UkrMadera entendemos cada construcción como un espacio que debe responder a una necesidad real. Desde una casa hasta una caseta, un garaje, un quiosco o una pérgola, buscamos soluciones claras, duraderas y bien resueltas.</p>
            <p>La madera es el punto de partida: un material cálido, versátil y capaz de integrarse en arquitecturas contemporáneas sin perder su carácter.</p>
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="about-container">
          <span className="about-kicker">Nuestro enfoque</span>
          <div className="about-principles-grid">
            <article><span>01</span><h3>Diseño</h3><p>Proporciones, distribución y estética trabajan juntas para crear espacios coherentes y habitables.</p></article>
            <article><span>02</span><h3>Precisión</h3><p>Cada modelo parte de medidas y configuraciones definidas para ofrecer información clara antes de iniciar un proyecto.</p></article>
            <article><span>03</span><h3>Madera</h3><p>Trabajamos alrededor de las cualidades de la madera para conseguir construcciones cálidas, funcionales y con identidad.</p></article>
          </div>
        </div>
      </section>

      <section className="about-closing">
        <div className="about-container about-closing-grid">
          <div><span className="about-kicker">Explora UkrMadera</span><h2>Encuentra el espacio que <em>encaja contigo.</em></h2></div>
          <div><p>Consulta modelos, dimensiones, planos y configuraciones disponibles en nuestro catálogo.</p><Link href="/catalogo" className="about-cta"><span>Ver catálogo</span><ArrowUpRight className="ui-arrow-icon" /></Link></div>
        </div>
      </section>
    </main>
  );
}
