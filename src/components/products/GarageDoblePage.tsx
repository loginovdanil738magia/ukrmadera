"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import MediaLightbox from "@/components/products/MediaLightbox";

gsap.registerPlugin(ScrollTrigger);

type FinishId = "sin-montaje" | "con-montaje";

const gallery = Array.from({ length: 5 }, (_, index) => ({
  src: `/images/products/garaje-doble1/doble1_${index + 1}.webp`,
  alt: `Garaje Doble 1 6 × 6 · vista ${index + 1}`,
}));

const plans = Array.from({ length: 5 }, (_, index) => ({
  src: `/images/products/garaje-doble1/doble1_${index + 6}.webp`,
  alt: `Garaje Doble 1 6 × 6 · plano y vista técnica ${index + 1}`,
}));

const finishes = {
  "sin-montaje": { label: "34 mm + revestimiento sin montaje", price: 6900 },
  "con-montaje": { label: "34 mm + revestimiento con montaje", price: 10540 },
} as const;

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price);
}

export default function GarageDoblePage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const galleryImageRef = useRef<HTMLImageElement>(null);
  const [finish, setFinish] = useState<FinishId>("sin-montaje");
  const [activeImage, setActiveImage] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [planLightboxOpen, setPlanLightboxOpen] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    const hero = heroImageRef.current;
    if (!page || !hero) return;

    // The hero must always be visible. Motion preference only disables animation.
    gsap.set(hero, {
      opacity: 1,
      visibility: "visible",
      clipPath: "inset(0 0 0% 0)",
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(hero, { scale: 1.07, clipPath: "inset(0 0 100% 0)", opacity: 1 }, {
        scale: 1.05, clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 1.8, ease: "power4.inOut",
      });
      gsap.timeline({ repeat: -1, yoyo: true, delay: 2.6, defaults: { ease: "sine.inOut" } })
        .to(hero, { scale: 1.075, xPercent: -.25, yPercent: -.15, duration: 10 })
        .to(hero, { scale: 1.055, xPercent: .2, yPercent: .15, duration: 12 })
        .to(hero, { scale: 1.08, xPercent: -.15, yPercent: .2, duration: 11 });

      gsap.from(".quiosco-hero-reveal", { y: 28, opacity: 0, duration: 1, stagger: .09, delay: .3, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".quiosco-reveal").forEach((el) => {
        gsap.from(el, { y: 32, opacity: 0, duration: .95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%", once: true } });
      });
    }, page);
    return () => ctx.revert();
  }, []);

  const changeGallery = (index: number) => {
    if (index === activeImage) return;
    const target = galleryImageRef.current;
    if (!target) { setActiveImage(index); return; }
    gsap.to(target, { opacity: 0, scale: 1.02, duration: .18, onComplete: () => {
      setActiveImage(index);
      requestAnimationFrame(() => galleryImageRef.current && gsap.fromTo(galleryImageRef.current, { opacity: 0, scale: 1.025 }, { opacity: 1, scale: 1, duration: .6, ease: "power3.out" }));
    }});
  };

  const offer = finishes[finish];

  return (
    <article ref={pageRef} className="quiosco-page garage-double-page">
      <section className="quiosco-hero">
        <div ref={heroImageRef} className="quiosco-hero-image garage-double-hero-image" aria-hidden="true" />
        <div className="quiosco-hero-overlay" aria-hidden="true" />
        <div className="quiosco-container quiosco-hero-inner">
          <div className="quiosco-breadcrumb quiosco-hero-reveal"><Link href="/catalogo">Catálogo</Link><span>/</span><span>Garajes</span><span>/</span><span>Doble 1 · 6 × 6</span></div>
          <div className="quiosco-hero-content">
            <div><span className="quiosco-eyebrow quiosco-hero-reveal">Garaje de madera · 6 × 6 m</span><h1 className="quiosco-hero-reveal">DOBLE 1</h1></div>
            <div className="quiosco-hero-summary quiosco-hero-reveal"><p>Un garaje de madera para dos vehículos que combina protección, amplitud y una presencia contemporánea.</p><div><span>36 m²</span><span>2 coches</span><span>Desde 6.900 €</span></div></div>
          </div>
        </div>
      </section>

      <section className="quiosco-gallery">
        <div className="quiosco-container">
          <div className="quiosco-gallery-heading quiosco-reveal"><div><span className="quiosco-label">Galería</span><h2>Dos vehículos.<em> Un solo espacio.</em></h2></div><span>{String(activeImage + 1).padStart(2,"0")} / 05</span></div>
          <button type="button" className="quiosco-gallery-stage quiosco-reveal" onClick={() => setLightboxOpen(true)}><img ref={galleryImageRef} src={gallery[activeImage].src} alt={gallery[activeImage].alt} /><span>Ampliar</span></button>
          <div className="quiosco-gallery-thumbs">{gallery.map((image,index)=><button key={image.src} type="button" className={activeImage===index?"is-active":""} onClick={()=>changeGallery(index)}><img src={image.src} alt="" loading={index<3?"eager":"lazy"} /></button>)}</div>
        </div>
        <MediaLightbox open={lightboxOpen} items={gallery} activeIndex={activeImage} onChange={setActiveImage} onClose={() => setLightboxOpen(false)} />
      </section>

      <section className="quiosco-configurator">
        <div className="quiosco-container">
          <div className="quiosco-config-heading quiosco-reveal"><div><span className="quiosco-label">Configura tu garaje</span><h2>Planos y<em> configuración.</em></h2></div><p>Consulta las vistas técnicas del modelo Doble 1 de 6 × 6 m y elige la opción con o sin montaje.</p></div>
          <div className="quiosco-config-grid">
            <div className="quiosco-plan-panel quiosco-reveal"><button type="button" className="quiosco-plan-stage plan-expand-stage" onClick={() => setPlanLightboxOpen(true)} aria-label="Ampliar plano"><img src={plans[activePlan].src} alt={plans[activePlan].alt} /><span className="plan-expand-label">Ampliar</span></button><div className="quiosco-plan-thumbs">{plans.map((plan,index)=><button key={plan.src} type="button" className={activePlan===index?"is-active":""} onClick={()=>setActivePlan(index)}><img src={plan.src} alt="" loading="lazy"/></button>)}</div></div>
            <aside className="quiosco-offer quiosco-reveal">
              <span className="quiosco-offer-kicker">Garaje Doble 1 · 2 coches</span>
              <div className="quiosco-offer-price"><span>Precio</span><strong>{formatPrice(offer.price)}</strong></div>
              <div className="quiosco-offer-facts"><div><span>Capacidad</span><strong>2 coches</strong></div><div><span>Dimensiones</span><strong>6 × 6 m</strong></div><div><span>Código</span><strong>321</strong></div></div>
              <div className="quiosco-finish-selector"><span>Configuración</span>{(Object.keys(finishes) as FinishId[]).map(id=><button key={id} type="button" className={finish===id?"is-active":""} onClick={()=>setFinish(id)}><span>{id==="sin-montaje"?"Sin montaje":"Con montaje"}</span><strong>{formatPrice(finishes[id].price)}</strong><small>{finishes[id].label}</small></button>)}</div>
              <span className="quiosco-cta-button is-disabled" aria-disabled="true"><span>Solicitar información</span><ArrowUpRight className="ui-arrow-icon"/></span>
            </aside>
          </div>
        </div>
      </section>

      <MediaLightbox open={planLightboxOpen} items={plans} activeIndex={activePlan} onChange={setActivePlan} onClose={() => setPlanLightboxOpen(false)} label="Plano ampliado" />

      <section className="quiosco-story"><div className="quiosco-container quiosco-story-grid"><div className="quiosco-reveal"><span className="quiosco-label">El modelo</span><h2>Protección para dos.<em> Diseño para durar.</em></h2></div><div className="quiosco-story-copy quiosco-reveal"><p>Doble 1 Alternative es un garaje de madera para dos vehículos que destaca por su tejado a dos aguas, su revestimiento vertical pulido y su diseño compacto.</p><p>La distribución ofrece espacio suficiente para maniobrar cómodamente dos vehículos. Las puertas seccionales aportan seguridad y comodidad, con opción de control manual como accesorio opcional.</p></div></div></section>

      <section className="quiosco-features"><div className="quiosco-container"><div className="quiosco-features-heading quiosco-reveal"><span className="quiosco-label quiosco-label-light">Características</span><h2>Espacio para dos.<em> Presencia contemporánea.</em></h2></div><div className="quiosco-feature-grid"><article className="quiosco-reveal"><span>01</span><h3>2 coches</h3><p>Una distribución amplia de 6 × 6 m con espacio suficiente para maniobrar cómodamente dos vehículos.</p></article><article className="quiosco-reveal"><span>02</span><h3>Revestimiento vertical</h3><p>Acabado exterior en madera de aspecto moderno que refuerza la presencia contemporánea del garaje.</p></article><article className="quiosco-reveal"><span>03</span><h3>Tejado a dos aguas</h3><p>Una solución elegante y compacta diseñada para favorecer un drenaje eficiente del agua.</p></article></div></div></section>

      <section className="quiosco-closing"><div className="quiosco-container quiosco-closing-grid"><div className="quiosco-reveal"><span className="quiosco-label quiosco-label-light">Garaje Doble 1</span><h2>Dos coches.<em> Un espacio protegido.</em></h2></div><div className="quiosco-reveal"><p>Cuéntanos cómo quieres configurar tu garaje y te ayudaremos a elegir la opción adecuada, con o sin montaje.</p><span className="quiosco-cta-button is-disabled" aria-disabled="true"><span>Hablar con UkrMadera</span><ArrowUpRight className="ui-arrow-icon"/></span></div></div></section>
    </article>
  );}
