"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import {
  catalogCategories,
  formatPrice,
  getStartingPrice,
  products,
  type ProductCategory,
} from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

type Filter = "todos" | ProductCategory;

export default function CatalogGrid() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("categoria");
  const initialFilter: Filter =
    requestedCategory &&
    catalogCategories.some((category) => category.id === requestedCategory)
      ? (requestedCategory as Filter)
      : "todos";

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const visibleProducts = useMemo(
    () =>
      filter === "todos"
        ? products
        : products.filter((product) => product.category === filter),
    [filter]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const heroBackground = heroBackgroundRef.current;

    const ctx = gsap.context(() => {
      if (heroBackground) {
        const intro = gsap.timeline();
        intro.fromTo(
          heroBackground,
          {
            scale: 1.07,
            opacity: 1,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            scale: 1.05,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "power4.inOut",
          },
          0
        );

        gsap.timeline({
          repeat: -1,
          yoyo: true,
          delay: 2.6,
          defaults: { ease: "sine.inOut" },
        })
          .to(heroBackground, {
            scale: 1.075,
            xPercent: -0.25,
            yPercent: -0.15,
            duration: 10,
          })
          .to(heroBackground, {
            scale: 1.055,
            xPercent: 0.2,
            yPercent: 0.15,
            duration: 12,
          })
          .to(heroBackground, {
            scale: 1.08,
            xPercent: -0.15,
            yPercent: 0.2,
            duration: 11,
          });
      }
      gsap.from(".catalog-intro-reveal", {
        y: 42,
        opacity: 0,
        duration: 1.05,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".catalog-filter-shell", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.28,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".catalog-card")
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(cards, { clearProps: "all" });
      return;
    }

    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.075,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [filter]);

  return (
    <section ref={sectionRef} className="catalog-page">
      <div className="catalog-hero">
        <div ref={heroBackgroundRef} className="catalog-hero-image" aria-hidden="true" />
        <div className="catalog-hero-noise" aria-hidden="true" />
        <div className="catalog-container catalog-hero-inner">
          <div className="catalog-kicker catalog-intro-reveal">
            <span>Catálogo · UkrMadera</span>
            <span className="catalog-kicker-line" />
            <span>05 modelos seleccionados</span>
          </div>

          <h1 className="catalog-title">
            <span className="catalog-title-line catalog-intro-reveal">
              Espacios construidos
            </span>
            <span className="catalog-title-line catalog-title-editorial catalog-intro-reveal">
              para durar.
            </span>
          </h1>

          <div className="catalog-hero-bottom catalog-intro-reveal">
            <p>
              Construcciones en madera para vivir, trabajar, proteger y
              transformar tu espacio.
            </p>
            <span>Arquitectura · Naturaleza · Precisión</span>
          </div>
        </div>
      </div>

      <div className="catalog-body">
        <div className="catalog-container">
          <div className="catalog-filter-shell">
            <div className="catalog-filter-heading">
              <span>Filtrar por tipología</span>
              <span>
                {String(visibleProducts.length).padStart(2, "0")}{" "}
                {visibleProducts.length === 1 ? "modelo" : "modelos"}
              </span>
            </div>

            <div className="catalog-filter" role="group" aria-label="Filtrar catálogo">
              {catalogCategories.map((category) => {
                const active = filter === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`catalog-filter-button ${active ? "is-active" : ""}`}
                    onClick={() => setFilter(category.id)}
                    aria-pressed={active}
                  >
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={gridRef} className="catalog-grid">
            {visibleProducts.map((product, index) => {
              const price = getStartingPrice(product);
              const areas = Array.from(
                new Set(
                  product.variants
                    .map((variant) => variant.area)
                    .filter((area): area is number => typeof area === "number")
                )
              );
              const modelSummary =
                areas.length > 1
                  ? `${areas.length} tamaños · ${Math.min(...areas)}–${Math.max(...areas)} m²`
                  : areas.length === 1
                    ? `${areas[0]} m²`
                    : "Proyecto configurable";

              return (
                <article
                  key={product.id}
                  className={`catalog-card catalog-card-${(index % 3) + 1}`}
                >
                  <Link
                    href={`/catalogo/${product.category}/${product.slug}`}
                    className="catalog-card-media category-card-media"
                    aria-label={`Ver ${product.name}`}
                  >
                    <img src={product.image} alt={product.name} />
                    <span className="catalog-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="catalog-card-hover">
                      Ver modelo <ArrowUpRight className="ui-arrow-icon" />
                    </span>
                  </Link>

                  <div className="catalog-card-info">
                    <div className="catalog-card-meta">
                      <span>{product.categoryLabel}</span>
                      <span>{modelSummary}</span>
                    </div>

                    <Link
                      href={`/catalogo/${product.category}/${product.slug}`}
                      className="catalog-card-title-row"
                    >
                      <h2>{product.name}</h2>
                      <ArrowUpRight className="catalog-card-arrow" />
                    </Link>

                    <div className="catalog-card-bottom">
                      <p>{product.description}</p>
                      <div className="catalog-card-price">
                        <span>{price !== null ? "Desde" : "Precio"}</span>
                        <strong>
                          {price !== null ? formatPrice(price) : "Consultar"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="catalog-end">
            <span className="catalog-end-label">Proyecto a medida</span>
            <h2>
              ¿Buscas algo
              <em> diferente?</em>
            </h2>
            <p>
              Cada modelo puede adaptarse a distintas dimensiones,
              configuraciones y acabados. Cuéntanos qué espacio necesitas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
