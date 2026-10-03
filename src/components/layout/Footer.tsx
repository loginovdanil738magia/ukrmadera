import Link from "next/link";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import Logo from "@/components/ui/Logo";

const catalogLinks = [
  { label: "Casas", href: "/catalogo?categoria=casas" },
  { label: "Casetas", href: "/catalogo?categoria=casetas" },
  { label: "Quioscos", href: "/catalogo?categoria=quioscos" },
  { label: "Garajes", href: "/catalogo?categoria=garajes" },
  { label: "Pérgolas", href: "/catalogo?categoria=pergolas" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo" aria-label="UkrMadera - Inicio">
              <Logo />
            </Link>
            <p>Arquitectura en madera pensada para durar, habitar y formar parte del entorno.</p>
          </div>

          <div className="site-footer-column">
            <span className="site-footer-label">Explorar</span>
            <Link href="/">Inicio</Link>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/materiales">Materiales</Link>
            <Link href="/#colecciones">Colecciones</Link>
          </div>

          <div className="site-footer-column">
            <span className="site-footer-label">Catálogo</span>
            {catalogLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>

          <div className="site-footer-column site-footer-column-last">
            <span className="site-footer-label">UkrMadera</span>
            <span className="site-footer-disabled" aria-disabled="true">Nosotros</span>
            <span className="site-footer-disabled" aria-disabled="true">Contacto</span>
            <span className="site-footer-location">Sevilla · España</span>
          </div>
        </div>

        <div className="site-footer-statement">
          <span>Diseño · Fabricación · Construcción</span>
          <h2>Madera que transforma<em> la forma de habitar.</em></h2>
        </div>

        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} UkrMadera</span>
          <span>Arquitectura en madera</span>
          <Link href="/" className="site-footer-back">
            <span>Volver al inicio</span>
            <ArrowUpRight className="ui-arrow-icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
