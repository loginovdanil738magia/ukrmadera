"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
    {
        number: "01",
        title: "De principio a fin",
        text: "Acompañamos cada proyecto desde la elección del modelo y su configuración hasta la fabricación y el montaje final.",
    },
    {
        number: "02",
        title: "Madera como materia",
        text: "Trabajamos la madera como elemento constructivo y arquitectónico, buscando espacios cálidos, funcionales y duraderos.",
    },
    {
        number: "03",
        title: "Adaptado a tu espacio",
        text: "Cada proyecto parte de unas necesidades distintas. Dimensiones, distribución y acabados pueden adaptarse al uso y al entorno.",
    },
    {
        number: "04",
        title: "Un único equipo",
        text: "Diseño, fabricación y construcción forman parte de un mismo proceso para mantener la coherencia durante todo el proyecto.",
    },
];

export default function WhyUkrMadera() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const eyebrow =
                section.querySelector<HTMLElement>(".why-eyebrow");

            const eyebrowLine =
                section.querySelector<HTMLElement>(".why-eyebrow-line");

            const intro =
                section.querySelector<HTMLElement>(".why-intro");

            const title =
                section.querySelector<HTMLElement>(".why-title");

            const titleLines =
                section.querySelectorAll<HTMLElement>(".why-title-line-inner");

            const introCopy =
                section.querySelector<HTMLElement>(".why-intro-copy");

            const backgroundWord =
                section.querySelector<HTMLElement>(".why-background-word");

            /* =====================================================
               EYEBROW
               ===================================================== */

            if (eyebrow && intro) {
                gsap.from(eyebrow, {
                    y: 20,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: intro,
                        start: "top 80%",
                        once: true,
                    },
                });
            }

            /* =====================================================
               EYEBROW LINE
               ===================================================== */

            if (eyebrowLine && intro) {
                gsap.from(eyebrowLine, {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: intro,
                        start: "top 80%",
                        once: true,
                    },
                });
            }

            /* =====================================================
               TITLE
               ===================================================== */

            if (title && titleLines.length > 0) {
                gsap.from(titleLines, {
                    yPercent: 120,
                    rotate: 1.5,
                    duration: 1.25,
                    stagger: 0.12,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 82%",
                        once: true,
                    },
                });
            }

            /* =====================================================
               INTRO COPY
               ===================================================== */

            if (introCopy) {
                gsap.from(introCopy, {
                    y: 35,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: introCopy,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            /* =====================================================
               PRINCIPLES
               ===================================================== */

            const rows =
                section.querySelectorAll<HTMLElement>(".why-principle");

            rows.forEach((row) => {
                const line =
                    row.querySelector<HTMLElement>(".why-principle-line");

                const number =
                    row.querySelector<HTMLElement>(".why-principle-number");

                const rowTitle =
                    row.querySelector<HTMLElement>(".why-principle-title");

                const text =
                    row.querySelector<HTMLElement>(".why-principle-text");

                const arrow =
                    row.querySelector<HTMLElement>(".why-principle-arrow");

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 84%",
                        once: true,
                    },
                });

                if (line) {
                    timeline.from(line, {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 1.1,
                        ease: "power3.inOut",
                    });
                }

                if (number) {
                    timeline.from(
                        number,
                        {
                            y: 15,
                            opacity: 0,
                            duration: 0.7,
                            ease: "power3.out",
                        },
                        "-=0.55"
                    );
                }

                if (rowTitle) {
                    timeline.from(
                        rowTitle,
                        {
                            y: 35,
                            opacity: 0,
                            duration: 0.9,
                            ease: "power4.out",
                        },
                        "-=0.6"
                    );
                }

                if (text) {
                    timeline.from(
                        text,
                        {
                            y: 25,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power3.out",
                        },
                        "-=0.55"
                    );
                }

                if (arrow) {
                    timeline.from(
                        arrow,
                        {
                            scale: 0.5,
                            rotate: -30,
                            opacity: 0,
                            duration: 0.8,
                            ease: "back.out(1.4)",
                        },
                        "-=0.7"
                    );
                }
            });

            /* =====================================================
               BACKGROUND WORD
               ===================================================== */

            if (backgroundWord) {
                gsap.fromTo(
                    backgroundWord,
                    {
                        xPercent: 5,
                    },
                    {
                        xPercent: -5,
                        ease: "none",

                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 2,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }
        }, section);

        /*
         * Process y HomeClosing añaden nuevos ScrollTriggers debajo
         * de esta sección. Refrescamos las posiciones cuando todo
         * el layout del frame ya está montado.
         */
        const refreshId = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            window.cancelAnimationFrame(refreshId);
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="why-ukrmadera"
        >
            <div
                className="why-background-word"
                aria-hidden="true"
            >
                MADERA
            </div>

            <div className="why-container">

                <div className="why-intro">
                    <div className="why-intro-main">

                        <div className="why-eyebrow">
                            <span>Por qué UkrMadera</span>
                            <span className="why-eyebrow-line" />
                        </div>

                        <h2 className="why-title">

                            <span className="why-title-line">
                                <span className="why-title-line-inner">
                                    No construimos
                                </span>
                            </span>

                            <span className="why-title-line">
                                <span className="why-title-line-inner">
                                    solamente
                                </span>
                            </span>

                            <span className="why-title-line">
                                <span className="why-title-line-inner why-title-editorial">
                                    estructuras.
                                </span>
                            </span>

                        </h2>
                    </div>

                    <div className="why-intro-copy">
                        <span className="why-intro-index">
                            04 / 09
                        </span>

                        <p>
                            Entendemos cada construcción como un espacio
                            que debe responder a una forma de vivir,
                            trabajar o disfrutar del entorno.
                        </p>
                    </div>
                </div>

                <div className="why-principles">

                    {principles.map((principle) => (
                        <article
                            key={principle.number}
                            className="why-principle"
                        >
                            <span className="why-principle-line" />

                            <div className="why-principle-content">

                                <span className="why-principle-number">
                                    {principle.number}
                                </span>

                                <h3 className="why-principle-title">
                                    {principle.title}
                                </h3>

                                <p className="why-principle-text">
                                    {principle.text}
                                </p>

                                <span
                                    className="why-principle-arrow"
                                    aria-hidden="true"
                                >
                                    ↘
                                </span>

                            </div>
                        </article>
                    ))}

                </div>

                <div className="why-bottom">
                    <span>
                        Arquitectura
                    </span>

                    <span className="why-bottom-line" />

                    <span>
                        Naturaleza
                    </span>

                    <span className="why-bottom-dot">
                        ·
                    </span>

                    <span>
                        Precisión
                    </span>
                </div>

            </div>
        </section>
    );
}