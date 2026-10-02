"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "Cuéntanos tu idea",
        text: "Partimos del espacio, el uso y las necesidades que tienes para encontrar la solución adecuada.",
    },
    {
        number: "02",
        title: "Elegimos el modelo",
        text: "Exploramos las diferentes opciones del catálogo para encontrar el punto de partida que mejor encaje contigo.",
    },
    {
        number: "03",
        title: "Configuramos el proyecto",
        text: "Definimos dimensiones, distribución, acabados y los elementos necesarios para adaptar el espacio a su uso.",
    },
    {
        number: "04",
        title: "Preparación",
        text: "Organizamos cada detalle previo para que la fabricación y el montaje puedan avanzar de forma coordinada.",
    },
    {
        number: "05",
        title: "Fabricación",
        text: "La madera toma forma y cada elemento del proyecto comienza a convertirse en una construcción real.",
    },
    {
        number: "06",
        title: "Transporte",
        text: "Preparamos los diferentes elementos para trasladarlos hasta el lugar donde se realizará la instalación.",
    },
    {
        number: "07",
        title: "Montaje",
        text: "El proyecto llega a su ubicación definitiva y comienza el proceso de construcción sobre el terreno.",
    },
    {
        number: "08",
        title: "Acabados",
        text: "Completamos los últimos detalles para conseguir un espacio coherente, funcional y preparado para su uso.",
    },
    {
        number: "09",
        title: "Tu espacio",
        text: "El proceso termina cuando la idea inicial se convierte en un espacio de madera pensado para formar parte de tu entorno.",
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            /* =====================================================
               CABECERA
               ===================================================== */

            gsap.from(".process-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-header",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".process-eyebrow-line", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.2,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: ".process-header",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".process-title-inner", {
                yPercent: 115,
                rotate: 1.5,
                duration: 1.2,
                stagger: 0.11,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".process-title",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".process-intro-copy", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-intro-copy",
                    start: "top 87%",
                    once: true,
                },
            });

            /* =====================================================
               DESKTOP
               ===================================================== */

            mm.add("(min-width: 901px)", () => {
                const timeline =
                    section.querySelector<HTMLElement>(".process-timeline");

                const progress =
                    section.querySelector<HTMLElement>(".process-line-progress");

                if (timeline && progress) {
                    gsap.fromTo(
                        progress,
                        {
                            scaleY: 0,
                        },
                        {
                            scaleY: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: timeline,
                                start: "top 65%",
                                end: "bottom 65%",
                                scrub: 1,
                            },
                        }
                    );
                }

                const items =
                    gsap.utils.toArray<HTMLElement>(".process-step");

                items.forEach((item, index) => {
                    const number = item.querySelector(".process-step-number");
                    const content = item.querySelector(".process-step-content");
                    const point = item.querySelector(".process-step-point");
                    const line = item.querySelector(".process-step-rule");

                    const direction = index % 2 === 0 ? -55 : 55;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top 76%",
                            once: true,
                        },
                    });

                    tl.from(point, {
                        scale: 0,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                    })
                        .from(
                            line,
                            {
                                scaleX: 0,
                                transformOrigin:
                                    index % 2 === 0 ? "right center" : "left center",
                                duration: 0.9,
                                ease: "power3.inOut",
                            },
                            "-=0.35"
                        )
                        .from(
                            number,
                            {
                                opacity: 0,
                                y: 35,
                                duration: 0.8,
                                ease: "power3.out",
                            },
                            "-=0.55"
                        )
                        .from(
                            content,
                            {
                                opacity: 0,
                                x: direction,
                                y: 20,
                                duration: 1,
                                ease: "power4.out",
                            },
                            "-=0.65"
                        );
                });

                /* Palabras gigantes de fondo */

                gsap.utils
                    .toArray<HTMLElement>(".process-background-word")
                    .forEach((word) => {
                        gsap.fromTo(
                            word,
                            {
                                yPercent: 15,
                            },
                            {
                                yPercent: -15,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: word,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 2,
                                },
                            }
                        );
                    });
            });

            /* =====================================================
               MOBILE
               ===================================================== */

            mm.add("(max-width: 900px)", () => {
                const timeline =
                    section.querySelector<HTMLElement>(".process-timeline");

                const progress =
                    section.querySelector<HTMLElement>(".process-line-progress");

                if (timeline && progress) {
                    gsap.fromTo(
                        progress,
                        {
                            scaleY: 0,
                        },
                        {
                            scaleY: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: timeline,
                                start: "top 72%",
                                end: "bottom 72%",
                                scrub: 0.7,
                            },
                        }
                    );
                }

                const items =
                    gsap.utils.toArray<HTMLElement>(".process-step");

                items.forEach((item) => {
                    const point = item.querySelector(".process-step-point");
                    const number = item.querySelector(".process-step-number");
                    const rule = item.querySelector(".process-step-rule");
                    const title = item.querySelector(".process-step-title");
                    const text = item.querySelector(".process-step-text");

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top 82%",
                            once: true,
                        },
                    });

                    tl.from(point, {
                        scale: 0,
                        duration: 0.45,
                        ease: "back.out(1.8)",
                    })
                        .from(
                            number,
                            {
                                opacity: 0,
                                y: 15,
                                duration: 0.55,
                                ease: "power3.out",
                            },
                            "-=0.25"
                        )
                        .from(
                            rule,
                            {
                                scaleX: 0,
                                transformOrigin: "left center",
                                duration: 0.65,
                                ease: "power3.inOut",
                            },
                            "-=0.3"
                        )
                        .from(
                            title,
                            {
                                opacity: 0,
                                y: 24,
                                duration: 0.7,
                                ease: "power4.out",
                            },
                            "-=0.35"
                        )
                        .from(
                            text,
                            {
                                opacity: 0,
                                y: 18,
                                duration: 0.65,
                                ease: "power3.out",
                            },
                            "-=0.4"
                        );
                });
            });

            /* =====================================================
               CIERRE
               ===================================================== */

            const closing = section.querySelector<HTMLElement>(".process-closing");

            if (closing) {
                gsap.from(".process-closing-title-inner", {
                    yPercent: 115,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: closing,
                        start: "top 72%",
                        once: true,
                    },
                });

                gsap.from(".process-closing-meta", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: closing,
                        start: "top 65%",
                        once: true,
                    },
                });
            }
        }, section);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="process-section">
            {/* =====================================================
          INTRO
          ===================================================== */}

            <div className="process-container">
                <header className="process-header">
                    <div className="process-header-main">
                        <div className="process-eyebrow">
                            <span>05 / 09</span>

                            <span className="process-eyebrow-line" />

                            <span>Nuestro proceso</span>
                        </div>

                        <h2 className="process-title">
                            <span className="process-title-line">
                                <span className="process-title-inner">
                                    Un proceso.
                                </span>
                            </span>

                            <span className="process-title-line">
                                <span className="process-title-inner process-title-editorial">
                                    De principio a fin.
                                </span>
                            </span>
                        </h2>
                    </div>

                    <div className="process-intro-copy">
                        <span>De la idea a la construcción</span>

                        <p>
                            Cada proyecto avanza a través de un proceso definido,
                            desde las primeras decisiones hasta el montaje final.
                        </p>
                    </div>
                </header>

                {/* =====================================================
            TIMELINE
            ===================================================== */}

                <div className="process-timeline">
                    <div className="process-center-line" aria-hidden="true">
                        <span className="process-line-progress" />
                    </div>

                    <span
                        className="process-background-word process-word-idea"
                        aria-hidden="true"
                    >
                        IDEA
                    </span>

                    <span
                        className="process-background-word process-word-madera"
                        aria-hidden="true"
                    >
                        MADERA
                    </span>

                    <span
                        className="process-background-word process-word-espacio"
                        aria-hidden="true"
                    >
                        ESPACIO
                    </span>

                    {steps.map((step, index) => (
                        <article
                            key={step.number}
                            className={`process-step ${index % 2 === 0
                                    ? "process-step-left"
                                    : "process-step-right"
                                }`}
                        >
                            <span
                                className="process-step-point"
                                aria-hidden="true"
                            />

                            <div className="process-step-inner">
                                <span className="process-step-number">
                                    {step.number}
                                </span>

                                <span
                                    className="process-step-rule"
                                    aria-hidden="true"
                                />

                                <div className="process-step-content">
                                    <h3 className="process-step-title">
                                        {step.title}
                                    </h3>

                                    <p className="process-step-text">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* =====================================================
          CIERRE
          ===================================================== */}

            <div className="process-closing">
                <div className="process-closing-inner">
                    <div className="process-closing-meta">
                        <span>UkrMadera</span>
                        <span className="process-closing-line" />
                        <span>Arquitectura en madera</span>
                    </div>

                    <h3 className="process-closing-title">
                        <span className="process-closing-title-line">
                            <span className="process-closing-title-inner">
                                De una idea,
                            </span>
                        </span>

                        <span className="process-closing-title-line">
                            <span className="process-closing-title-inner process-closing-editorial">
                                a un espacio propio.
                            </span>
                        </span>
                    </h3>

                    <span className="process-closing-number">
                        09
                    </span>
                </div>
            </div>
        </section>
    );
}