"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

const qualities = [
  {
    number: "01",
    title: "Diseño natural y agradable",
    text:
      "La madera aporta calidez y una conexión directa con la naturaleza, creando espacios acogedores y relajantes.",
  },
  {
    number: "02",
    title: "Versatilidad",
    text:
      "Desde un pequeño refugio hasta una vivienda, una caseta, un garaje o un espacio para tus aficiones: la madera se adapta a distintos usos y escalas.",
  },
  {
    number: "03",
    title: "Sostenibilidad",
    text:
      "Trabajamos con materiales ecológicos para crear construcciones que miran hacia un entorno más respetuoso y consciente.",
  },
];

const uses = [
  "Casas de madera",
  "Cabañas",
  "Casetas de jardín",
  "Garajes",
  "Espacios para aficiones",
  "Soluciones a medida",
];

export default function MaterialsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const heroImage = section.querySelector<HTMLElement>(".materials-hero-image");
    const heroKickerLine = section.querySelector<HTMLElement>(".materials-hero-kicker-line");
    const qualities = section.querySelectorAll<HTMLElement>(".materials-quality");
    const useRows = section.querySelectorAll<HTMLElement>(".materials-use-row");
    const backgroundWord = section.querySelector<HTMLElement>(".materials-background-word");

    const ctx = gsap.context(() => {
      gsap.from(".materials-hero-line", {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
      });

      gsap.from(".materials-hero-kicker, .materials-hero-copy", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });

      if (heroKickerLine) {
        gsap.from(heroKickerLine, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          delay: 0.45,
        });
      }

      if (heroImage) {
        gsap.to(heroImage, {
          scale: 1.08,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".materials-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      const blocks = gsap.utils.toArray<HTMLElement>(".materials-reveal");
      blocks.forEach((block) => {
        gsap.from(block, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 86%",
            once: true,
          },
        });
      });

      qualities.forEach((card, index) => {
        const line = card.querySelector<HTMLElement>(".materials-quality-line");

        if (line) {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            delay: index * 0.06,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              once: true,
            },
          });
        }
      });

      useRows.forEach((row, index) => {
        gsap.from(row, {
          x: 32,
          opacity: 0,
          duration: 0.75,
          delay: index * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            once: true,
          },
        });
      });

      if (backgroundWord) {
        gsap.fromTo(
          backgroundWord,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".materials-uses",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
          }
        );
      }

      const media = gsap.utils.toArray<HTMLElement>(".materials-media");
      media.forEach((item) => {
        const image = item.querySelector<HTMLElement>(".materials-media-image");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        });

        tl.fromTo(
          item,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power4.inOut",
          }
        );

        if (image) {
          tl.fromTo(
            image,
            { scale: 1.08 },
            { scale: 1, duration: 1.5, ease: "power3.out" },
            0
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="materials-page">
      <section className="materials-hero">
        <div className="materials-hero-image" aria-hidden="true" />
        <div className="materials-hero-overlay" aria-hidden="true" />

        <div className="materials-container materials-hero-inner">
          <div className="materials-hero-kicker">
            <span>Materiales · UkrMadera</span>
            <span className="materials-hero-kicker-line" />
            <span>La materia del proyecto</span>
          </div>

          <h1 className="materials-hero-title">
            <span className="materials-hero-mask">
              <span className="materials-hero-line">La madera como</span>
            </span>
            <span className="materials-hero-mask">
              <span className="materials-hero-line materials-hero-editorial">
                punto de partida.
              </span>
            </span>
          </h1>

          <div className="materials-hero-copy">
            <p>
              Belleza, funcionalidad y confort en un material que transforma
              cada espacio y lo conecta con su entorno.
            </p>
          </div>
        </div>
      </section>

      <section className="materials-intro">
        <div className="materials-container">
          <div className="materials-intro-grid">
            <div className="materials-reveal">
              <span className="materials-label">Materiales</span>
              <h2>
                Construir con madera
                <em> cambia la forma de habitar.</em>
              </h2>
            </div>

            <div className="materials-reveal materials-intro-copy">
              <p>
                En nuestra colección encontrarás estructuras de madera pensadas
                para combinar belleza, funcionalidad y confort. Desde viviendas
                y cabañas hasta casetas de jardín y garajes, cada solución parte
                de las necesidades reales de cada espacio.
              </p>
              <p>
                La madera aporta una presencia cálida y natural, y permite crear
                proyectos de diferentes tamaños y funciones sin perder coherencia
                arquitectónica.
              </p>
            </div>
          </div>

          <div className="materials-media materials-feature-media">
            <div
              className="materials-media-image"
              style={{
                backgroundImage: "url('/images/materials/materials-interior.webp')",
              }}
            />
          </div>
        </div>
      </section>

      <section className="materials-detail-gallery">
        <div className="materials-container">
          <div className="materials-detail-grid">
            <article className="materials-detail-card materials-detail-card-tall materials-reveal">
              <div className="materials-media materials-detail-media">
                <div
                  className="materials-media-image"
                  style={{
                    backgroundImage:
                      "url('/images/materials/materials-facade.webp')",
                  }}
                />
              </div>

              <div className="materials-detail-caption">
                <span>01</span>
                <div>
                  <strong>Envolvente de madera</strong>
                  <p>
                    Textura, protección y una presencia natural que define la
                    arquitectura desde el exterior.
                  </p>
                </div>
              </div>
            </article>

            <article className="materials-detail-card materials-reveal">
              <div className="materials-media materials-detail-media materials-detail-media-wide">
                <div
                  className="materials-media-image"
                  style={{
                    backgroundImage:
                      "url('/images/materials/materials-craft.webp')",
                  }}
                />
              </div>

              <div className="materials-detail-caption">
                <span>02</span>
                <div>
                  <strong>Acabado y cuidado</strong>
                  <p>
                    El resultado final depende también de los detalles, el
                    tratamiento y la calidad del acabado.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="materials-qualities">
        <div className="materials-container">
          <div className="materials-section-heading materials-reveal">
            <span className="materials-label">Por qué madera</span>
            <h2>Tres razones que definen nuestros espacios.</h2>
          </div>

          <div className="materials-quality-list">
            {qualities.map((quality) => (
              <article key={quality.number} className="materials-quality materials-reveal">
                <span className="materials-quality-number">{quality.number}</span>
                <div className="materials-quality-line" />
                <h3>{quality.title}</h3>
                <p>{quality.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="materials-uses">
        <span className="materials-background-word" aria-hidden="true">
          MADERA
        </span>
        <div className="materials-container materials-uses-grid">
          <div className="materials-uses-copy materials-reveal">
            <span className="materials-label">Versatilidad</span>
            <h2>
              Un material.
              <em> Muchas posibilidades.</em>
            </h2>
            <p>
              La madera permite responder a distintas formas de vivir, trabajar,
              guardar, proteger o disfrutar del espacio.
            </p>

            <Link href="/catalogo" className="materials-link">
              <span>Explorar catálogo</span>
              <ArrowUpRight className="ui-arrow-icon" />
            </Link>
          </div>

          <div className="materials-use-list materials-reveal">
            {uses.map((use, index) => (
              <div key={use} className="materials-use-row">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{use}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="materials-closing">
        <div className="materials-container materials-closing-inner">
          <div className="materials-reveal">
            <span className="materials-label materials-label-light">
              UkrMadera
            </span>
            <h2>
              Belleza y confort
              <em> que nacen de la madera.</em>
            </h2>
          </div>

          <p className="materials-reveal">
            Encuentra el hogar o el espacio donde cada rincón refleje la belleza,
            la calidez y el confort que solo la madera puede ofrecer.
          </p>
        </div>
      </section>
    </section>
  );
}
