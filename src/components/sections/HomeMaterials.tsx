"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

export default function HomeMaterials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const image = section.querySelector<HTMLElement>(".home-materials-image");
    const titleLines = section.querySelectorAll<HTMLElement>(
      ".home-materials-title-inner"
    );
    const meta = section.querySelector<HTMLElement>(".home-materials-meta");
    const copy = section.querySelector<HTMLElement>(".home-materials-copy");
    const link = section.querySelector<HTMLElement>(".home-materials-link");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      if (image) {
        tl.fromTo(
          image,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.35,
            ease: "power4.inOut",
          }
        );
      }

      if (meta) {
        tl.from(
          meta,
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.3
        );
      }

      if (titleLines.length) {
        tl.from(
          titleLines,
          {
            yPercent: 115,
            duration: 1.05,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.45
        );
      }

      if (copy) {
        tl.from(
          copy,
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.8
        );
      }

      if (link) {
        tl.from(
          link,
          {
            y: 16,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.95
        );
      }

      if (image) {
        gsap.to(image, {
          yPercent: -6,
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-materials">
      <div className="home-materials-media" aria-hidden="true">
        <div className="home-materials-image" />
        <div className="home-materials-overlay" />
      </div>

      <div className="home-materials-container">
        <div className="home-materials-meta">
          <span>Materiales</span>
          <span className="home-materials-meta-line" />
          <span>La materia del proyecto</span>
        </div>

        <div className="home-materials-content">
          <h2 className="home-materials-title">
            <span className="home-materials-title-mask">
              <span className="home-materials-title-inner">La madera</span>
            </span>
            <span className="home-materials-title-mask">
              <span className="home-materials-title-inner home-materials-title-editorial">
                también se elige.
              </span>
            </span>
          </h2>

          <div className="home-materials-side">
            <p className="home-materials-copy">
              Calidad, calidez y versatilidad para construir espacios pensados
              para durar y sentirse bien desde el primer día.
            </p>

            <Link href="/materiales" className="home-materials-link">
              <span>Descubrir materiales</span>
              <ArrowUpRight className="ui-arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
