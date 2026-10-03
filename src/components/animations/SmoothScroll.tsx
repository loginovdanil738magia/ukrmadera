"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // On cross-route anchor navigation the Home needs a moment to mount
      // and calculate its layout before we can target the section correctly.
      const scrollToHash = () => {
        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return false;

        target.scrollIntoView({
          behavior: "auto",
          block: "start",
        });

        ScrollTrigger.refresh();
        return true;
      };

      let attempts = 0;
      const timer = window.setInterval(() => {
        attempts += 1;

        if (scrollToHash() || attempts >= 20) {
          window.clearInterval(timer);
        }
      }, 50);

      return () => window.clearInterval(timer);
    }

    // Normal route changes start from the top.
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
