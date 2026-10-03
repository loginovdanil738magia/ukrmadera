"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

const gallery = Array.from({ length: 7 }, (_, index) => ({
  src: `/images/products/abrera/abrera-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Casa de madera ABRERA · vista ${String(index + 1).padStart(2, "0")}`,
}));

const plans = Array.from({ length: 7 }, (_, index) => ({
  src: `/images/products/abrera/abrera-${String(index + 8).padStart(2, "0")}.webp`,
  alt: `Casa de madera ABRERA · plano y vista técnica ${index + 1}`,
}));

const configurations = [
  { id: "sin-montaje", label: "44mm + revestimiento sin montaje", price: 43600 },
  { id: "con-montaje", label: "44mm + revestimiento con montaje", price: 63600 },
  { id: "aislada-sin-montaje", label: "44mm aislada + revestimiento sin montaje", price: 65200 },
  { id: "aislada-con-montaje", label: "44mm aislada + revestimiento con montaje", price: 88000 },
];

const specs = [
  ["Modelo", "ABRERA"],
  ["Código de producto", "123"],
  ["Superficie", "170 m²"],
  ["Dormitorios", "4"],
  ["Salón", "37 m²"],
  ["Baños", "4"],
  ["Precio desde", "43.600 €"],
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function AbreraPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const galleryImageRef = useRef<HTMLImageElement>(null);
  const [configuration, setConfiguration] = useState(configurations[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);

  const selectImage = (index: number) => {
    if (index === activeImage) return;
    const target = galleryImageRef.current;
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveImage(index);
      return;
    }

    gsap.to(target, {
      opacity: 0,
      scale: 1.025,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveImage(index);
        requestAnimationFrame(() => {
          if (!galleryImageRef.current) return;
          gsap.fromTo(
            galleryImageRef.current,
            { opacity: 0, scale: 1.035 },
            { opacity: 1, scale: 1, duration: 0.72, ease: "power3.out" }
          );
        });
      },
    });
  };

  useEffect(() => {
    const page = pageRef.current;
    const image = heroImageRef.current;
    if (!page || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(image,
        { scale: 1.07, clipPath: "inset(0 0 100% 0)" },
        { scale: 1.05, clipPath: "inset(0 0 0% 0)", duration: 1.8, ease: "power4.inOut" }
      );

      gsap.timeline({ repeat: -1, yoyo: true, delay: 2.6, defaults: { ease: "sine.inOut" } })
        .to(image, { scale: 1.075, xPercent: -0.25, yPercent: -0.15, duration: 10 })
        .to(image, { scale: 1.055, xPercent: 0.2, yPercent: 0.15, duration: 12 })
        .to(image, { scale: 1.08, xPercent: -0.15, yPercent: 0.2, duration: 11 });

      gsap.from(".ingrid-hero-reveal", {
        y: 30, opacity: 0, duration: 1, stagger: 0.1, delay: 0.35, ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".ingrid-reveal").forEach((element) => {
        gsap.from(element, {
          y: 34, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={pageRef} className="ingrid-page">
      <section className="ingrid-hero">
        <div ref={heroImageRef} className="ingrid-hero-image" aria-hidden="true" />
        <div className="ingrid-hero-overlay" aria-hidden="true" />

        <div className="ingrid-container ingrid-hero-inner">
          <div className="ingrid-breadcrumb ingrid-hero-reveal">
            <Link href="/catalogo">Catálogo</Link><span>/</span><span>Casas</span><span>/</span><span>ABRERA</span>
          </div>

          <div className="ingrid-hero-content">
            <div>
              <span className="ingrid-eyebrow ingrid-hero-reveal">Casa de madera · 4 dormitorios</span>
              <h1 className="ingrid-hero-reveal">ABRERA</h1>
            </div>
            <div className="ingrid-hero-summary ingrid-hero-reveal">
              <p>Casa de madera ABRERA, modelo de cuatro dormitorios del catálogo de UkrMadera.</p>
              <div className="ingrid-hero-facts">
                <span>170 m²</span><span>4 dormitorios</span><span>Desde 43.600 €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="abrera-gallery" aria-label="Galería de ABRERA">
        <div className="ingrid-container">
          <div className="abrera-gallery-heading ingrid-reveal">
            <div>
              <span className="ingrid-label">Galería</span>
              <h2>Descubre ABRERA<em> desde cada ángulo.</em></h2>
            </div>
            <span className="abrera-gallery-count">{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
          </div>

          <button
            type="button"
            className="abrera-gallery-stage ingrid-reveal"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ampliar imagen"
          >
            <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
            <span className="abrera-gallery-expand">Ampliar</span>
          </button>

          <div className="abrera-gallery-thumbs" role="list" aria-label="Seleccionar imagen">
            {gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`abrera-gallery-thumb ${activeImage === index ? "is-active" : ""}`}
                onClick={() => selectImage(index)}
                aria-label={`Ver imagen ${index + 1}`}
                aria-pressed={activeImage === index}
              >
                <img src={image.src} alt="" loading={index < 4 ? "eager" : "lazy"} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>

        {lightboxOpen && (
          <div className="abrera-lightbox" role="dialog" aria-modal="true" aria-label="Galería ampliada">
            <button type="button" className="abrera-lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Cerrar galería">Cerrar</button>
            <button type="button" className="abrera-lightbox-nav abrera-lightbox-prev" onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)} aria-label="Imagen anterior">←</button>
            <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
            <button type="button" className="abrera-lightbox-nav abrera-lightbox-next" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Imagen siguiente">→</button>
            <span className="abrera-lightbox-count">{String(activeImage + 1).padStart(2, "0")} / {gallery.length}</span>
          </div>
        )}
      </section>

      <section className="ingrid-intro">
        <div className="ingrid-container ingrid-intro-grid">
          <div className="ingrid-reveal">
            <span className="ingrid-label">El modelo</span>
            <h2>Casa de madera<em> ABRERA.</em></h2>
          </div>
          <div className="ingrid-copy ingrid-reveal">
            <p>
              ABRERA es una obra de arte donde la madera, esculpida por la innovación,
              da vida a espacios únicos y exclusivos.
            </p>
            <p>
              Sus 170 m² incluyen cuatro dormitorios, cuatro baños independientes y un
              salón de 37 m² pensado para integrar una cocina amplia y un comedor. Numerosas
              ventanas y puertas favorecen la entrada de luz natural, y existe la opción
              de ampliar la vivienda con una terraza de madera.
            </p>
          </div>
        </div>
      </section>

      <section className="abrera-config abrera-config-technical">
        <div className="ingrid-container">
          <div className="abrera-technical-heading ingrid-reveal">
            <div>
              <span className="ingrid-label">Configura tu ABRERA</span>
              <h2>Planos y<em> configuración.</em></h2>
            </div>
            <p>Consulta las vistas técnicas del modelo y elige el nivel de acabado que mejor encaja con tu proyecto.</p>
          </div>

          <div className="abrera-technical-grid">
            <div className="abrera-plan-panel ingrid-reveal">
              <div className="abrera-plan-stage">
                <img src={plans[activePlan].src} alt={plans[activePlan].alt} />
              </div>
              <div className="abrera-plan-thumbs">
                {plans.map((plan, index) => (
                  <button
                    key={plan.src}
                    type="button"
                    className={activePlan === index ? "is-active" : ""}
                    onClick={() => setActivePlan(index)}
                    aria-label={`Ver plano ${index + 1}`}
                  >
                    <img src={plan.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            <aside className="abrera-config-panel ingrid-reveal">
              <span className="abrera-offer-kicker">Casa ABRERA · 170 m²</span>
              <div className="abrera-config-price">
                <span>Precio</span>
                <strong>{formatPrice(configuration.price)}</strong>
              </div>
              <div className="abrera-config-facts">
                <div><span>Superficie</span><strong>170 m²</strong></div>
                <div><span>Dormitorios</span><strong>4</strong></div>
                <div><span>Baños</span><strong>4</strong></div>
              </div>
              <div className="abrera-option-list">
                <span>Configuración</span>
                {configurations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={configuration.id === item.id ? "is-active" : ""}
                    onClick={() => setConfiguration(item)}
                  >
                    <span>{item.label}</span>
                    <strong>{formatPrice(item.price)}</strong>
                  </button>
                ))}
              </div>
              <Link href="/contacto" className="ingrid-button">
                <span>Solicitar información</span>
                <ArrowUpRight className="ui-arrow-icon" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="ingrid-feature">
        <div className="ingrid-container">
          <div className="ingrid-feature-heading ingrid-reveal">
            <span className="ingrid-label ingrid-label-light">ABRERA</span>
            <h2>Espacios pensados<em> para vivir mejor.</em></h2>
          </div>
          <div className="ingrid-feature-grid">
            <article className="ingrid-reveal"><span>01</span><h3>170 m²</h3><p>Una vivienda de gran superficie con cuatro dormitorios y áreas privadas para toda la familia.</p></article>
            <article className="ingrid-reveal"><span>02</span><h3>Salón de 37 m²</h3><p>Un gran espacio previsto para instalar una cocina amplia y una zona de comedor.</p></article>
            <article className="ingrid-reveal"><span>03</span><h3>4 baños</h3><p>Cuatro baños independientes y abundantes huecos para favorecer la entrada de luz natural.</p></article>
          </div>
        </div>
      </section>

      <section className="ingrid-specs">
        <div className="ingrid-container ingrid-specs-grid">
          <div className="ingrid-specs-heading ingrid-reveal">
            <span className="ingrid-label">Características</span>
            <h2>Información<em> del modelo.</em></h2>
            <p>Consulta las principales características y dimensiones de la casa de madera ABRERA.</p>
          </div>
          <div className="ingrid-spec-list ingrid-reveal">
            {specs.map(([label, value]) => (
              <div className="ingrid-spec-row" key={label}>
                <span>{label}</span><strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ingrid-cta">
        <div className="ingrid-container ingrid-cta-inner">
          <div className="ingrid-reveal">
            <span className="ingrid-label ingrid-label-light">Casa ABRERA</span>
            <h2>¿Te interesa<em> este modelo?</em></h2>
          </div>
          <div className="ingrid-cta-copy ingrid-reveal">
            <p>Contacta con UkrMadera para consultar la configuración, condiciones y detalles del modelo ABRERA.</p>
            <Link href="/contacto" className="ingrid-button">
              <span>Solicitar información</span>
              <ArrowUpRight className="ui-arrow-icon" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
