"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/animations/Magnetic";
import ArrowIcon from "@/components/ui/ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        const background = backgroundRef.current;

        if (!hero || !background) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            /* =====================================================
               INTRO
               ===================================================== */

            const intro = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            /* Fondo */

            intro.fromTo(
                background,
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

            /* Header */

            intro.from(
                ".site-header",
                {
                    y: -30,
                    opacity: 0,
                    duration: 1.2,
                },
                0.2
            );

            /* Texto superior */

            intro.from(
                ".hero-eyebrow",
                {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                },
                0.45
            );

            intro.from(
                ".hero-eyebrow-line",
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 1.2,
                    ease: "power3.inOut",
                },
                0.7
            );

            /* Título */

            intro.from(
                ".hero-title-line",
                {
                    yPercent: 120,
                    opacity: 0,
                    rotate: 1.5,
                    duration: 1.3,
                    stagger: 0.13,
                    ease: "power4.out",
                },
                0.55
            );

            /* Descripción */

            intro.from(
                ".hero-description",
                {
                    y: 25,
                    opacity: 0,
                    duration: 1,
                },
                1.1
            );

            /* Botones */

            intro.from(
                ".hero-actions .button",
                {
                    y: 25,
                    opacity: 0,
                    duration: 0.9,
                    stagger: 0.12,
                },
                1.25
            );

            /* Mensaje de marca */

            intro.from(
                ".hero-project-line",
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 1.15,
                    ease: "power3.inOut",
                },
                0.95
            );

            intro.from(
                ".hero-project-label",
                {
                    y: 12,
                    opacity: 0,
                    duration: 0.75,
                    ease: "power3.out",
                },
                1.12
            );

            intro.from(
                ".hero-project-title-line",
                {
                    yPercent: 115,
                    opacity: 0,
                    duration: 1.05,
                    stagger: 0.14,
                    ease: "power4.out",
                },
                1.24
            );

            intro.from(
                ".hero-project-meta span",
                {
                    y: 10,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power3.out",
                },
                1.62
            );

            /* Parte inferior */

            intro.from(
                ".hero-bottom",
                {
                    y: 25,
                    opacity: 0,
                    duration: 1.2,
                },
                1.45
            );

            /* =====================================================
               RESPIRACIÓN DEL FONDO
               ===================================================== */

            const breathing = gsap.timeline({
                repeat: -1,
                yoyo: true,
                delay: 2.6,
                defaults: {
                    ease: "sine.inOut",
                },
            });

            breathing
                .to(background, {
                    scale: 1.075,
                    xPercent: -0.25,
                    yPercent: -0.15,
                    duration: 10,
                })
                .to(background, {
                    scale: 1.055,
                    xPercent: 0.2,
                    yPercent: 0.15,
                    duration: 12,
                })
                .to(background, {
                    scale: 1.08,
                    xPercent: -0.15,
                    yPercent: 0.2,
                    duration: 11,
                });

            /* =====================================================
               SCROLL — FONDO
               ===================================================== */



            /* =====================================================
               SCROLL — TEXTO PRINCIPAL
               ===================================================== */

            gsap.to(".hero-copy", {
                y: -65,
                opacity: 0,
                ease: "none",

                scrollTrigger: {
                    trigger: hero,
                    start: "30% top",
                    end: "80% top",
                    scrub: 1,
                },
            });

            /* =====================================================
               SCROLL — PROYECTO DESTACADO
               ===================================================== */

            gsap.to(".hero-project", {
                y: -40,
                opacity: 0,
                ease: "none",

                scrollTrigger: {
                    trigger: hero,
                    start: "35% top",
                    end: "80% top",
                    scrub: 1,
                },
            });

            /* =====================================================
               SCROLL — INFORMACIÓN INFERIOR
               ===================================================== */

            gsap.to(".hero-bottom", {
                opacity: 0,
                y: -15,
                ease: "none",

                scrollTrigger: {
                    trigger: hero,
                    start: "55% top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, hero);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={heroRef} className="hero">
            {/* =====================================================
          BACKGROUND
          ===================================================== */}

            <div
                ref={backgroundRef}
                className="hero-background"
                aria-hidden="true"
            />

            <div
                className="hero-overlay"
                aria-hidden="true"
            />

            <div
                className="hero-vignette"
                aria-hidden="true"
            />

            {/* =====================================================
          CONTENT
          ===================================================== */}

            <div className="hero-content">
                <div className="hero-main">
                    {/* =================================================
              LEFT CONTENT
              ================================================= */}

                    <div className="hero-copy">
                        <div className="hero-eyebrow">
                            <span>Arquitectura natural</span>

                            <span className="hero-eyebrow-line" />
                        </div>

                        {/* TITLE */}

                        <h1 className="hero-title">
                            <span className="hero-title-mask">
                                <span className="hero-title-line">
                                    Construimos
                                </span>
                            </span>

                            <span className="hero-title-mask">
                                <span className="hero-title-line">
                                    espacios para
                                </span>
                            </span>

                            <span className="hero-title-mask">
                                <span className="hero-title-line hero-title-editorial">
                                    vivir diferente.
                                </span>
                            </span>
                        </h1>

                        {/* DESCRIPTION */}

                        <p className="hero-description">
                            Casas y estructuras de madera diseñadas y
                            construidas de principio a fin.
                        </p>

                        {/* ACTIONS */}

                        <div className="hero-actions">
                            <Magnetic>
                                <Link
                                    href="/proyectos"
                                    className="button button-primary"
                                >
                                    <span>Explorar proyectos</span>

                                    <span className="button-arrow" aria-hidden="true">
                                        <ArrowIcon direction="up-right" />
                                    </span>
                                </Link>
                            </Magnetic>

                            <Magnetic>
                                <Link
                                    href="/catalogo"
                                    className="button button-secondary"
                                >
                                    <span>Ver catálogo</span>

                                    <span className="button-arrow" aria-hidden="true">
                                        <ArrowIcon direction="up-right" />
                                    </span>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                    {/* =================================================
              FEATURED PROJECT
              ================================================= */}

                    <div className="hero-project">
                        <div className="hero-project-line" />

                        <span className="hero-project-label">
                            Espacios en madera
                        </span>

                        <h2>
                            <span className="hero-project-title-mask">
                                <span className="hero-project-title-line">
                                    Diseñados para
                                </span>
                            </span>
                            <span className="hero-project-title-mask">
                                <span className="hero-project-title-line">
                                    ser vividos.
                                </span>
                            </span>
                        </h2>

                        <div className="hero-project-meta">
                            <span>Diseño</span>
                            <span>Fabricación</span>
                            <span>Montaje</span>
                        </div>
                    </div>
                </div>

                {/* ===================================================
            HERO BOTTOM
            =================================================== */}

                <div className="hero-bottom">
                    {/* COUNTER */}

                    <div className="hero-counter">
                        <span className="hero-counter-current">
                            01
                        </span>

                        <div className="hero-counter-line">
                            <span />
                        </div>

                        <span>06</span>
                    </div>

                    {/* SCROLL INDICATOR */}

                    <div className="hero-scroll">
                        <span className="hero-scroll-arrow" aria-hidden="true">
                            <ArrowIcon direction="down" />
                        </span>

                        <span>Descubrir</span>
                    </div>

                    {/* INFORMATION */}

                    <div className="hero-info">
                        <span>Sevilla · España</span>

                        <span className="hero-info-line" />

                        <span>Diseño</span>

                        <span>·</span>

                        <span>Fabricación</span>

                        <span>·</span>

                        <span>Instalación</span>
                    </div>
                </div>
            </div>
        </section>
    );
}