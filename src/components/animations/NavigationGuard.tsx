"use client";

import { useEffect } from "react";

/**
 * Mientras se construyen las páginas interiores, solo permite navegar
 * a enlaces que pertenezcan al catálogo (/catalogo y sus subrutas).
 *
 * El resto de enlaces conserva su diseño, hover y animaciones, pero
 * al pulsarlo no cambia de página.
 */
export default function NavigationGuard() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) {
        event.preventDefault();
        return;
      }

      // Solo funcionan Catálogo y todas sus páginas/modelos interiores.
      const url = new URL(href, window.location.origin);
      const isCatalogLink =
        url.origin === window.location.origin &&
        (url.pathname === "/catalogo" || url.pathname.startsWith("/catalogo/"));

      if (isCatalogLink) return;

      event.preventDefault();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
