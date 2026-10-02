"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        number: "01",
        title: "Casas",
        subtitle: "Espacios para vivir",
        image: "/images/categories/casas.jpg",
        href: "/catalogo/casas",
        className: "category-card-large",
    },
    {
        number: "02",
        title: "Casetas",
        subtitle: "Espacios para disfrutar",
        image: "/images/categories/casetas.jpg",
        href: "/catalogo/casetas",
        className: "category-card-small",
    },
    {
        number: "03",
        title: "Quioscos",
        subtitle: "Espacios para tu negocio",
        image: "/images/categories/quioscos.jpg",
        href: "/catalogo/quioscos",
        className: "category-card-small",
    },
    {
        number: "04",
        title: "Garajes",
        subtitle: "Protección con diseño",
        image: "/images/categories/garajes.jpg",
        href: "/catalogo/garajes",
        className: "category-card-large",
    },
    {
        number: "05",
        title: "Pérgolas",
        subtitle: "Arquitectura al aire libre",
        image: "/images/categories/pergolas.jpg",
        href: "/catalogo/pergolas",
        className: "category-card-large",
    },
];

export default function Categories() {
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

            gsap.from(".categories-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".categories-header",
                    start: "top 85%",
                },
            });

            gsap.from(".categories-title-line-inner", {
                yPercent: 110,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",

                scrollTrigger: {
                    trigger: ".categories-title",
                    start: "top 82%",
                },
            });

            gsap.from(".categories-intro", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".categories-header",
                    start: "top 75%",
                },
            });

            /* =====================================================
               TARJETAS
               ===================================================== */

            const cards =
                gsap.utils.toArray<HTMLElement>(".category-card");

            cards.forEach((card) => {
                const image =
                    card.querySelector<HTMLElement>(
                        ".category-card-image"
                    );

                const content =
                    card.querySelector<HTMLElement>(
                        ".category-card-content"
                    );

                const line =
                    card.querySelector<HTMLElement>(
                        ".category-card-line"
                    );

                const media =
                    card.querySelector<HTMLElement>(
                        ".category-card-media"
                    );

                if (media && image) {
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                        },
                    });

                    timeline.fromTo(
                        media,
                        {
                            clipPath:
                                "inset(100% 0% 0% 0%)",
                        },
                        {
                            clipPath:
                                "inset(0% 0% 0% 0%)",
                            duration: 1.35,
                            ease: "power4.inOut",
                        }
                    );

                    timeline.fromTo(
                        image,
                        {
                            scale: 1.16,
                        },
                        {
                            scale: 1,
                            duration: 1.8,
                            ease: "power3.out",
                        },
                        0.15
                    );
                }

                if (content) {
                    gsap.from(content, {
                        y: 35,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",

                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                        },
                    });
                }

                if (line) {
                    gsap.from(line, {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 1.1,
                        ease: "power3.inOut",

                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                        },
                    });
                }
            });
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="categories"
        >
            <div className="categories-container">
                {/* HEADER */}

                <div className="categories-header">
                    <div className="categories-heading">
                        <div className="categories-eyebrow">
                            <span>Catálogo</span>
                            <span className="categories-eyebrow-line" />
                        </div>

                        <h2 className="categories-title">
                            <span className="categories-title-line">
                                <span className="categories-title-line-inner">
                                    Explora nuestras
                                </span>
                            </span>

                            <span className="categories-title-line">
                                <span className="categories-title-line-inner categories-title-editorial">
                                    colecciones.
                                </span>
                            </span>
                        </h2>
                    </div>

                    <div className="categories-intro">
                        <span className="categories-intro-number">
                            05 colecciones
                        </span>

                        <p>
                            Diferentes formas de construir con madera.
                            Descubre nuestros modelos, acabados y
                            posibilidades.
                        </p>

                        <Link
                            href="/catalogo"
                            className="categories-view-all"
                        >
                            <span>Ver catálogo completo</span>
                            <ArrowUpRight className="ui-arrow-up-right" />
                        </Link>
                    </div>
                </div>

                {/* GRID */}

                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link
                            href={category.href}
                            key={category.title}
                            className={`category-card ${category.className}`}
                        >
                            <div className="category-card-media">
                                <div
                                    className="category-card-image"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                    }}
                                />

                                <div className="category-card-overlay" />

                                <div className="category-card-number">
                                    {category.number}
                                </div>

                                <ArrowUpRight className="ui-arrow-up-right" />
                            </div>

                            <div className="category-card-content">
                                <div className="category-card-line" />

                                <div className="category-card-info">
                                    <h3>{category.title}</h3>

                                    <span>{category.subtitle}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* FOOT */}

                <div className="categories-footer">
                    <span>
                        Diseño
                    </span>

                    <span className="categories-footer-dot" />

                    <span>
                        Fabricación
                    </span>

                    <span className="categories-footer-dot" />

                    <span>
                        Instalación
                    </span>
                </div>
            </div>
        </section>
    );
}