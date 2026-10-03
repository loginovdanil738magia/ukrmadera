"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type LogoProps = {
    priority?: boolean;
};

export default function Logo({ priority = false }: LogoProps) {
    const spinnerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const spinner = spinnerRef.current;
        if (!spinner) return;

        const tween = gsap.to(spinner, {
            rotation: 360,
            duration: 6,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
            force3D: true,
        });

        return () => tween.kill();
    }, []);

    return (
        <div className="brand-logo">
            <Image
                src="/images/brand/ukrmadera-logov2.png"
                alt="UkrMadera · Arquitectura en madera"
                width={1745}
                height={399}
                priority={priority}
                className="brand-logo-image"
            />
            <span className="brand-logo-u-spinner" aria-hidden="true">
                <span ref={spinnerRef}>U</span>
            </span>
        </div>
    );
}
