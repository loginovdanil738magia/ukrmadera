"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         CABECERA
         ===================================================== */

      gsap.from(".manifesto-label", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      gsap.from(".manifesto-top-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.3,
        ease: "power3.inOut",

        scrollTrigger: {
          trigger: section,
          start: "top 76%",
        },
      });

      /* =====================================================
         TITULAR
         ===================================================== */

      gsap.from(".manifesto-line-inner", {
        yPercent: 115,
        rotate: 1.2,
        duration: 1.25,
        stagger: 0.1,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ".manifesto-title",
          start: "top 80%",
        },
      });

      /* =====================================================
         BLOQUE INFERIOR
         ===================================================== */

      gsap.from(".manifesto-symbol", {
        y: 35,
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".manifesto-bottom",
          start: "top 85%",
        },
      });

      gsap.from(".manifesto-description-wrapper", {
        y: 45,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".manifesto-bottom",
          start: "top 85%",
        },
      });

      /* =====================================================
         PALABRAS EN CURSIVA
         Movimiento muy sutil durante el scroll
         ===================================================== */

      gsap.to(".manifesto-word-architecture", {
        x: 18,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".manifesto-word-nature", {
        x: -18,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =====================================================
         MADERA GIGANTE
         ===================================================== */

      gsap.fromTo(
        ".manifesto-background-word",
        {
          yPercent: 45,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "45% 70%",
            end: "bottom bottom",
            scrub: 1.3,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="manifesto"
    >
      <div className="manifesto-container">
        {/* ===================================================
            CABECERA
            =================================================== */}

        <div className="manifesto-top">
          <div className="manifesto-top-left">
            <span className="manifesto-label">
              Nuestra filosofía
            </span>

            <span
              className="manifesto-top-line"
              aria-hidden="true"
            />
          </div>

          <span className="manifesto-top-brand">
            UkrMadera · Sevilla
          </span>
        </div>

        {/* ===================================================
            TITULAR
            =================================================== */}

        <div className="manifesto-content">
          <h2 className="manifesto-title">
            <span className="manifesto-line">
              <span className="manifesto-line-inner">
                Construimos hogares
              </span>
            </span>

            <span className="manifesto-line">
              <span className="manifesto-line-inner">
                que conectan{" "}
                <em className="manifesto-word-architecture">
                  arquitectura,
                </em>
              </span>
            </span>

            <span className="manifesto-line">
              <span className="manifesto-line-inner">
                madera y{" "}
                <em className="manifesto-word-nature">
                  naturaleza.
                </em>
              </span>
            </span>
          </h2>

          {/* =================================================
              PARTE INFERIOR
              ================================================= */}

          <div className="manifesto-bottom">
            <div className="manifesto-symbol">
              <div
                className="manifesto-symbol-circle"
                aria-hidden="true"
              >
                <span>U</span>

                <span className="manifesto-symbol-dot" />
              </div>

              <div className="manifesto-symbol-copy">
                <span>Arquitectura</span>
                <span>en madera</span>
              </div>
            </div>

            <div className="manifesto-description-wrapper">
              <span className="manifesto-description-label">
                UkrMadera
              </span>

              <p className="manifesto-description">
                Entendemos la madera como algo más que un
                material. Diseñamos espacios cálidos,
                funcionales y duraderos donde arquitectura y
                entorno forman parte de una misma idea.
              </p>

              <p className="manifesto-description manifesto-description-secondary">
                Desde el primer boceto hasta la instalación,
                controlamos cada fase del proyecto para crear
                espacios pensados para ser vividos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PALABRA DECORATIVA
          ===================================================== */}

      <div
        className="manifesto-background-word"
        aria-hidden="true"
      >
        MADERA
      </div>
    </section>
  );
}