"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  ["Superficie", "135 m²"],
  ["Superficie habitable", "134,95 m²"],
  ["Medidas exteriores", "13,70 × 6,15 m"],
  ["Estancias", "14"],
  ["Material", "Pino nórdico / abeto escandinavo"],
  ["Pared base", "44 mm + revestimiento"],
];

export default function IngridPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const image = heroImageRef.current;
    if (!page || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.07, clipPath: "inset(0 0 100% 0)" },
        {
          scale: 1.05,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.8,
          ease: "power4.inOut",
        }
      );

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: 2.6,
        defaults: { ease: "sine.inOut" },
      })
        .to(image, { scale: 1.075, xPercent: -0.25, yPercent: -0.15, duration: 10 })
        .to(image, { scale: 1.055, xPercent: 0.2, yPercent: 0.15, duration: 12 })
        .to(image, { scale: 1.08, xPercent: -0.15, yPercent: 0.2, duration: 11 });

      gsap.from(".ingrid-hero-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".ingrid-reveal").forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={pageRef} className="ingrid-page">
      <section className="ingrid-hero">
        <div ref={heroImageRef} className="ingrid-hero-image" aria-hidden="true" />
        <div className="ingrid-hero-overlay" aria-hidden="true" />

        <div className="ingrid-container ingrid-hero-inner">
          <div className="ingrid-breadcrumb ingrid-hero-reveal">
            <Link href="/catalogo">Catálogo</Link><span>/</span><span>Casas</span><span>/</span><span>Ingrid</span>
          </div>

          <div className="ingrid-hero-content">
            <div>
              <span className="ingrid-eyebrow ingrid-hero-reveal">Casa de madera · 135 m²</span>
              <h1 className="ingrid-hero-reveal">Ingrid</h1>
            </div>
            <div className="ingrid-hero-summary ingrid-hero-reveal">
              <p>
                Una vivienda de inspiración escandinava que combina amplitud,
                madera natural y una arquitectura pensada para la vida familiar.
              </p>
              <div className="ingrid-hero-facts">
                <span>135 m²</span><span>14 estancias</span><span>13,70 × 6,15 m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ingrid-intro">
        <div className="ingrid-container ingrid-intro-grid">
          <div className="ingrid-reveal">
            <span className="ingrid-label">El modelo</span>
            <h2>Amplitud natural,<em> diseño contemporáneo.</em></h2>
          </div>
          <div className="ingrid-copy ingrid-reveal">
            <p>
              Ingrid plantea una vivienda de gran formato con una imagen cálida
              y reconocible. Sus proporciones, la presencia de la madera y sus
              numerosos huecos permiten una relación directa entre interior y exterior.
            </p>
            <p>
              La configuración definitiva, el aislamiento, los acabados y el
              montaje se concretan según las necesidades de cada proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="ingrid-feature">
        <div className="ingrid-container">
          <div className="ingrid-feature-heading ingrid-reveal">
            <span className="ingrid-label ingrid-label-light">Ingrid</span>
            <h2>Una casa pensada<em> para ser vivida.</em></h2>
          </div>
          <div className="ingrid-feature-grid">
            <article className="ingrid-reveal"><span>01</span><h3>135 m²</h3><p>Una superficie amplia para organizar las distintas zonas de una vivienda familiar.</p></article>
            <article className="ingrid-reveal"><span>02</span><h3>14 estancias</h3><p>Un programa interior de gran capacidad con espacios diferenciados.</p></article>
            <article className="ingrid-reveal"><span>03</span><h3>Configurable</h3><p>Aislamiento y acabados pueden adaptarse a la configuración definitiva del proyecto.</p></article>
          </div>
        </div>
      </section>

      <section className="ingrid-specs">
        <div className="ingrid-container ingrid-specs-grid">
          <div className="ingrid-specs-heading ingrid-reveal">
            <span className="ingrid-label">Ficha técnica</span>
            <h2>Medidas y<em> especificaciones.</em></h2>
            <p>Los datos definitivos se confirman con UkrMadera según la configuración solicitada.</p>
          </div>
          <div className="ingrid-spec-list ingrid-reveal">
            {specs.map(([label, value]) => (
              <div className="ingrid-spec-row" key={label}>
                <span>{label}</span><strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ingrid-cta">
        <div className="ingrid-container ingrid-cta-inner">
          <div className="ingrid-reveal">
            <span className="ingrid-label ingrid-label-light">Proyecto Ingrid</span>
            <h2>¿Quieres adaptar Ingrid<em> a tu proyecto?</em></h2>
          </div>
          <div className="ingrid-cta-copy ingrid-reveal">
            <p>Cuéntanos dónde se instalará y qué configuración necesitas. Prepararemos contigo la solución adecuada.</p>
            <Link href="/contacto" className="ingrid-button">
              <span>Solicitar información</span>
              <ArrowUpRight className="ui-arrow-icon" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
