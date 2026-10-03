"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

export default function AboutContent() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".about-hero .about-kicker", { y: 18, opacity: 0, duration: .8 }, .15)
        .from(".about-hero h1", { yPercent: 18, opacity: 0, duration: 1.25 }, .28)
        .from(".about-hero p", { y: 28, opacity: 0, duration: .9 }, .65);

      gsap.to(".about-hero-inner", {
        y: -45,
        opacity: .3,
        ease: "none",
        scrollTrigger: { trigger: ".about-hero", start: "55% top", end: "bottom top", scrub: 1 },
      });

      gsap.from(".about-intro-grid > div:first-child", {
        x: -42, opacity: 0, duration: 1.05, ease: "power3.out",
        scrollTrigger: { trigger: ".about-intro", start: "top 78%", once: true },
      });
      gsap.from(".about-copy p", {
        y: 34, opacity: 0, duration: .9, stagger: .16, ease: "power3.out",
        scrollTrigger: { trigger: ".about-intro", start: "top 72%", once: true },
      });

      gsap.from(".about-principles > .about-container > .about-kicker", {
        y: 20, opacity: 0, duration: .8,
        scrollTrigger: { trigger: ".about-principles", start: "top 76%", once: true },
      });
      gsap.from(".about-principles-grid", {
        scaleX: 0, transformOrigin: "left center", duration: 1.15, ease: "power3.inOut",
        scrollTrigger: { trigger: ".about-principles-grid", start: "top 82%", once: true },
      });
      gsap.from(".about-principles article > *", {
        y: 25, opacity: 0, duration: .75, stagger: .07, ease: "power3.out",
        scrollTrigger: { trigger: ".about-principles-grid", start: "top 70%", once: true },
      });

      const closing = gsap.timeline({
        scrollTrigger: { trigger: ".about-closing", start: "top 78%", once: true },
      });
      closing
        .from(".about-closing .about-kicker", { y: 16, opacity: 0, duration: .65 })
        .from(".about-closing h2", { y: 42, opacity: 0, duration: 1, ease: "power4.out" }, .12)
        .from(".about-closing-grid > div:last-child", { y: 32, opacity: 0, duration: .85, ease: "power3.out" }, .35);
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="about-page">
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
