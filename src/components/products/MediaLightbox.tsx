"use client";

import { useEffect } from "react";

type MediaItem = { src: string; alt: string };

type MediaLightboxProps = {
  open: boolean;
  items: MediaItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
  label?: string;
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="media-lightbox-chevron" viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

export default function MediaLightbox({
  open, items, activeIndex, onChange, onClose, label = "Galería ampliada",
}: MediaLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % items.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, activeIndex, items.length, onChange, onClose]);

  if (!open || !items.length) return null;
  const item = items[activeIndex];

  return (
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <button type="button" className="media-lightbox-close" onClick={onClose}>Cerrar</button>
      <div className="media-lightbox-layout">
        <button type="button" className="media-lightbox-nav media-lightbox-prev" onClick={() => onChange((activeIndex - 1 + items.length) % items.length)} aria-label="Anterior">
          <Chevron direction="left" />
        </button>
        <div className="media-lightbox-media">
          <img src={item.src} alt={item.alt} />
        </div>
        <button type="button" className="media-lightbox-nav media-lightbox-next" onClick={() => onChange((activeIndex + 1) % items.length)} aria-label="Siguiente">
          <Chevron direction="right" />
        </button>
      </div>
      <span className="media-lightbox-count">{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
    </div>
  );
}
