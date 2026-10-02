"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/animations/Magnetic";
import Logo from "@/components/ui/Logo";
import ArrowIcon from "@/components/ui/ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClosing() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".home-closing-content",
                    start: "top 78%",
                    once: true,
                },
            });

            tl.from(".home-closing-eyebrow", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    ".home-closing-line",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 1,
                        ease: "power3.inOut",
                    },
                    "-=0.45"
                )
                .from(
                    ".home-closing-title-inner",
                    {
                        yPercent: 115,
                        rotate: 1,
                        duration: 1.2,
                        stagger: 0.12,
                        ease: "power4.out",
                    },
                    "-=0.45"
                )
                .from(
                    ".home-closing-description",
                    {
                        opacity: 0,
                        y: 25,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.55"
                )
                .from(
                    ".home-closing-button-wrap",
                    {
                        opacity: 0,
                        y: 25,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

            gsap.from(".home-closing-footer", {
                opacity: 0,
                y: 25,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".home-closing-footer",
                    start: "top 94%",
                    once: true,
                },
            });

            gsap.fromTo(
                ".home-closing-background-word",
                {
                    xPercent: 4,
                },
                {
                    xPercent: -4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="home-closing">
            <span
                className="home-closing-background-word"
                aria-hidden="true"
            >
                UKRMADERA
            </span>

            <div className="home-closing-container">
                <div className="home-closing-content">
                    <div className="home-closing-eyebrow">
                        <span>Tu próximo espacio</span>
                        <span className="home-closing-line" />
                        <span>Empieza aquí</span>
                    </div>

                    <h2 className="home-closing-title">
                        <span className="home-closing-title-line">
                            <span className="home-closing-title-inner">
                                ¿Tienes un espacio
                            </span>
                        </span>

                        <span className="home-closing-title-line">
                            <span className="home-closing-title-inner home-closing-editorial">
                                en mente?
                            </span>
                        </span>
                    </h2>

                    <div className="home-closing-bottom">
                        <p className="home-closing-description">
                            Explora nuestros modelos, medidas y posibilidades
                            para encontrar el punto de partida de tu proyecto.
                        </p>

                        <div className="home-closing-button-wrap">
                            <Magnetic>
                                <Link
                                    href="/catalogo"
                                    className="home-closing-button"
                                >
                                    <span>Explorar catálogo</span>

                                    <span className="home-closing-button-arrow" aria-hidden="true">
                                        <ArrowIcon direction="up-right" />
                                    </span>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <footer className="home-closing-footer">
                    <div className="home-closing-footer-top">
                        <div className="home-closing-brand">
                            <Logo />
                        </div>

                        <div className="home-closing-footer-info">
                            <div>
                                <span className="home-closing-footer-label">
                                    Ubicación
                                </span>

                                <span>Sevilla · España</span>
                            </div>

                            <div>
                                <span className="home-closing-footer-label">
                                    Especialidad
                                </span>

                                <span>Arquitectura en madera</span>
                            </div>
                        </div>
                    </div>

                    <div className="home-closing-footer-bottom">
                        <span>© UkrMadera</span>

                        <span>
                            Diseño · Fabricación · Instalación
                        </span>

                        <span>Arquitectura · Naturaleza · Precisión</span>
                    </div>
                </footer>
            </div>
        </section>
    );
}