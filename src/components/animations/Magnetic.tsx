"use client";

import {
  cloneElement,
  isValidElement,
  ReactElement,
  useRef,
} from "react";
import gsap from "gsap";

type MagneticProps = {
  children: ReactElement<{
    ref?: React.Ref<HTMLElement>;
  }>;
  strength?: number;
};

export default function Magnetic({
  children,
  strength = 0.22,
}: MagneticProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const element = elementRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const element = elementRef.current;

    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
  };

  if (!isValidElement(children)) {
    return children;
  }

  return (
    <div
      className="magnetic-area"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {cloneElement(children, {
        ref: (node: HTMLElement | null) => {
          elementRef.current = node;
        },
      })}
    </div>
  );
}