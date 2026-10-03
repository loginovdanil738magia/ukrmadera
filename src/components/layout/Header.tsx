"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

import Logo from "@/components/ui/Logo";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
    {
        label: "Inicio",
        href: "/",
        disabled: false,
    },
    {
        label: "Catálogo",
        href: "/catalogo",
        disabled: false,
    },
    {
        label: "Proyectos",
        href: "/#colecciones",
        disabled: false,
    },
    {
        label: "Nosotros",
        href: "/nosotros",
        disabled: false,
    },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const headerRef =
        useRef<HTMLElement>(null);

    useEffect(() => {
        const header = headerRef.current;

        if (!header) return;

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        let lastScroll = window.scrollY;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            /* ---------------------------------------------
               FONDO DEL HEADER
               --------------------------------------------- */

            if (currentScroll > 80) {
                header.classList.add(
                    "is-scrolled"
                );
            } else {
                header.classList.remove(
                    "is-scrolled"
                );
            }

            /* ---------------------------------------------
               SI EL MENÚ ESTÁ ABIERTO
               EL HEADER NO DESAPARECE
               --------------------------------------------- */

            if (menuOpen) {
                header.classList.remove(
                    "is-hidden"
                );

                lastScroll = currentScroll;

                return;
            }

            /* ---------------------------------------------
               REDUCED MOTION
               --------------------------------------------- */

            if (reduceMotion) {
                lastScroll = currentScroll;

                return;
            }

            /* ---------------------------------------------
               DIRECCIÓN DEL SCROLL
               --------------------------------------------- */

            const difference =
                currentScroll - lastScroll;

            /*
             * Ignoramos movimientos mínimos.
             * Esto evita vibraciones con Lenis.
             */

            if (Math.abs(difference) < 4) {
                return;
            }

            if (
                difference > 0 &&
                currentScroll > 180
            ) {
                header.classList.add(
                    "is-hidden"
                );
            } else {
                header.classList.remove(
                    "is-hidden"
                );
            }

            lastScroll = currentScroll;
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, [menuOpen]);

    /*
     * Cuando abrimos el menú móvil,
     * bloqueamos el scroll.
     */

    useEffect(() => {
        if (!menuOpen) {
            document.body.style.overflow = "";

            return;
        }

        document.body.style.overflow =
            "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className="site-header"
            >
                <div className="header-container">
                    {/* LOGO */}

                    <Link
                        href="/"
                        className="header-logo"
                        aria-label="UkrMadera - Inicio"
                    >
                        <Logo priority />
                    </Link>

                    {/* DESKTOP NAVIGATION */}

                    <nav
                        className="desktop-navigation"
                        aria-label="Navegación principal"
                    >
                        {navigation.map((item) =>
                            item.disabled ? (
                                <span key={item.href} className="nav-link is-disabled" aria-disabled="true">{item.label}</span>
                            ) : (
                                <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
                            )
                        )}
                    </nav>

                    {/* ACTIONS */}

                    <div className="header-actions">
                        <span className="contact-link is-disabled" aria-disabled="true">
                            Contacto
                            <ArrowUpRight className="ui-arrow-up-right" />
                        </span>

                        <button
                            type="button"
                            className={`menu-button ${menuOpen ? "is-open" : ""
                                }`}
                            onClick={() =>
                                setMenuOpen(
                                    (current) => !current
                                )
                            }
                            aria-label={
                                menuOpen
                                    ? "Cerrar menú"
                                    : "Abrir menú"
                            }
                            aria-expanded={menuOpen}
                        >
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU */}

            <div
                className={`mobile-menu ${menuOpen ? "is-open" : ""
                    }`}
            >
                <div className="mobile-menu-inner">
                    <span className="mobile-menu-label">
                        Navegación
                    </span>

                    <nav className="mobile-navigation">
                        {navigation.map(
                            (item, index) => (
                                item.disabled ? (
                                <span key={item.href} className="mobile-nav-link is-disabled" aria-disabled="true">
                                    <span className="mobile-nav-number">{String(index + 1).padStart(2, "0")}</span>
                                    <span>{item.label}</span>
                                </span>
                            ) : (
                                <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                                    <span className="mobile-nav-number">{String(index + 1).padStart(2, "0")}</span>
                                    <span>{item.label}</span>
                                </Link>
                            )
                            )
                        )}

                        <span className="mobile-nav-link is-disabled" aria-disabled="true">
                            <span className="mobile-nav-number">05</span>
                            <span>Contacto</span>
                        </span>
                    </nav>

                    <div className="mobile-menu-footer">
                        <span>
                            Sevilla · España
                        </span>

                        <span>
                            Arquitectura en madera
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}