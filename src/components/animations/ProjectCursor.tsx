"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

export default function ProjectCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!canHover) return;

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.28,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.28,
      ease: "power3.out",
    });

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const showCursor = () => {
      cursor.classList.add("is-visible");
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible");
    };

    cursor.classList.remove("is-visible");

    const cards =
      document.querySelectorAll(
        ".categories .category-card-media"
      );

    cards.forEach((card) => {
      card.addEventListener(
        "mouseenter",
        showCursor
      );

      card.addEventListener(
        "mouseleave",
        hideCursor
      );
    });

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cards.forEach((card) => {
        card.removeEventListener(
          "mouseenter",
          showCursor
        );

        card.removeEventListener(
          "mouseleave",
          hideCursor
        );
      });
    };
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="project-cursor"
      aria-hidden="true"
    >
      <span>Ver</span>

      <ArrowUpRight className="ui-arrow-up-right" />
    </div>
  );
}