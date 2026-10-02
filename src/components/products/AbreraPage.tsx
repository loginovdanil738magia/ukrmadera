"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  ["Modelo", "ABRERA"],
  ["Categoría", "Casa de madera"],
  ["Dormitorios", "4 dormitorios"],
  ["Precio publicado", "43.600 €"],
];

export default function AbreraPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const image = heroImageRef.current;
    if (!page || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(image,
        { scale: 1.07, clipPath: "inset(0 0 100% 0)" },
        { scale: 1.05, clipPath: "inset(0 0 0% 0)", duration: 1.8, ease: "power4.inOut" }
      );

      gsap.timeline({ repeat: -1, yoyo: true, delay: 2.6, defaults: { ease: "sine.inOut" } })
        .to(image, { scale: 1.075, xPercent: -0.25, yPercent: -0.15, duration: 10 })
        .to(image, { scale: 1.055, xPercent: 0.2, yPercent: 0.15, duration: 12 })
        .to(image, { scale: 1.08, xPercent: -0.15, yPercent: 0.2, duration: 11 });

      gsap.from(".ingrid-hero-reveal", {
        y: 30, opacity: 0, duration: 1, stagger: 0.1, delay: 0.35, ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".ingrid-reveal").forEach((element) => {
        gsap.from(element, {
          y: 34, opacity: 0, duration: 1, ease: "power3.out",
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
            <Link href="/catalogo">Catálogo</Link><span>/</span><span>Casas</span><span>/</span><span>ABRERA</span>
          </div>

          <div className="ingrid-hero-content">
            <div>
              <span className="ingrid-eyebrow ingrid-hero-reveal">Casa de madera · 4 dormitorios</span>
              <h1 className="ingrid-hero-reveal">ABRERA</h1>
            </div>
            <div className="ingrid-hero-summary ingrid-hero-reveal">
              <p>Casa de madera ABRERA, modelo de cuatro dormitorios del catálogo de UkrMadera.</p>
              <div className="ingrid-hero-facts">
                <span>4 dormitorios</span><span>43.600 €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ingrid-intro">
        <div className="ingrid-container ingrid-intro-grid">
          <div className="ingrid-reveal">
            <span className="ingrid-label">El modelo</span>
            <h2>Casa de madera<em> ABRERA.</em></h2>
          </div>
          <div className="ingrid-copy ingrid-reveal">
            <p>
              ABRERA forma parte de la colección de casas de madera de UkrMadera y
              aparece en el catálogo original dentro de la categoría de cuatro dormitorios.
            </p>
            <p>
              Su precio publicado en el catálogo original es de 43.600 €. Para cualquier
              detalle adicional del proyecto, la configuración se consulta directamente con UkrMadera.
            </p>
          </div>
        </div>
      </section>

      <section className="ingrid-feature">
        <div className="ingrid-container">
          <div className="ingrid-feature-heading ingrid-reveal">
            <span className="ingrid-label ingrid-label-light">ABRERA</span>
            <h2>Información<em> del catálogo original.</em></h2>
          </div>
          <div className="ingrid-feature-grid">
            <article className="ingrid-reveal"><span>01</span><h3>4 dormitorios</h3><p>Clasificación publicada por UkrMadera para el modelo ABRERA.</p></article>
            <article className="ingrid-reveal"><span>02</span><h3>43.600 €</h3><p>Precio mostrado actualmente para ABRERA en el catálogo original de UkrMadera.</p></article>
            <article className="ingrid-reveal"><span>03</span><h3>Casa de madera</h3><p>ABRERA pertenece a la colección de casas de madera de UkrMadera.</p></article>
          </div>
        </div>
      </section>

      <section className="ingrid-specs">
        <div className="ingrid-container ingrid-specs-grid">
          <div className="ingrid-specs-heading ingrid-reveal">
            <span className="ingrid-label">Datos publicados</span>
            <h2>Información<em> verificada.</em></h2>
            <p>Solo mostramos aquí datos que aparecen publicados en la web original de UkrMadera.</p>
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
            <span className="ingrid-label ingrid-label-light">Casa ABRERA</span>
            <h2>¿Te interesa<em> este modelo?</em></h2>
          </div>
          <div className="ingrid-cta-copy ingrid-reveal">
            <p>Contacta con UkrMadera para consultar la configuración, condiciones y detalles del modelo ABRERA.</p>
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
