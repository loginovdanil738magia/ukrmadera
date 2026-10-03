"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

type FinishId = "sin-montaje" | "con-montaje";

const gallery = Array.from({ length: 5 }, (_, index) => ({
  src: `/images/products/quiosco/quiosco5x3_${index + 1}.webp`,
  alt: `Quiosco de madera 5 × 3 · vista ${index + 1}`,
}));

const plans = Array.from({ length: 6 }, (_, index) => ({
  src: `/images/products/quiosco/quiosco5x3_${index + 6}.webp`,
  alt: `Quiosco de madera 5 × 3 · plano y vista técnica ${index + 1}`,
}));

const finishes = {
  "sin-montaje": { label: "28 mm sin montaje", price: 2600 },
  "con-montaje": { label: "28 mm con montaje", price: 4100 },
} as const;

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price);
}

export default function QuioscoPage() {
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
    <article ref={pageRef} className="quiosco-page">
      <section className="quiosco-hero">
        <div ref={heroImageRef} className="quiosco-hero-image" aria-hidden="true" />
        <div className="quiosco-hero-overlay" aria-hidden="true" />
        <div className="quiosco-container quiosco-hero-inner">
          <div className="quiosco-breadcrumb quiosco-hero-reveal"><Link href="/catalogo">Catálogo</Link><span>/</span><span>Quioscos</span><span>/</span><span>5 × 3</span></div>
          <div className="quiosco-hero-content">
            <div><span className="quiosco-eyebrow quiosco-hero-reveal">Quiosco de madera · 5 × 3 m</span><h1 className="quiosco-hero-reveal">QUIOSCO</h1></div>
            <div className="quiosco-hero-summary quiosco-hero-reveal"><p>Un espacio compacto y adaptable para atender, exponer y transformar la forma en la que conectas con tus clientes o invitados.</p><div><span>15 m²</span><span>2 aperturas</span><span>Desde 2.600 €</span></div></div>
          </div>
        </div>
      </section>

      <section className="quiosco-gallery">
        <div className="quiosco-container">
          <div className="quiosco-gallery-heading quiosco-reveal"><div><span className="quiosco-label">Galería</span><h2>Abierto cuando quieres.<em> Funcional siempre.</em></h2></div><span>{String(activeImage + 1).padStart(2,"0")} / 05</span></div>
          <button type="button" className="quiosco-gallery-stage quiosco-reveal" onClick={() => setLightboxOpen(true)}><img ref={galleryImageRef} src={gallery[activeImage].src} alt={gallery[activeImage].alt} /><span>Ampliar</span></button>
          <div className="quiosco-gallery-thumbs">{gallery.map((image,index)=><button key={image.src} type="button" className={activeImage===index?"is-active":""} onClick={()=>changeGallery(index)}><img src={image.src} alt="" loading={index<3?"eager":"lazy"} /></button>)}</div>
        </div>
        {lightboxOpen && <div className="quiosco-lightbox" role="dialog" aria-modal="true"><button className="quiosco-lightbox-close" onClick={()=>setLightboxOpen(false)}>Cerrar</button><button className="quiosco-lightbox-prev" onClick={()=>setActiveImage((activeImage-1+gallery.length)%gallery.length)} aria-label="Imagen anterior">‹</button><img src={gallery[activeImage].src} alt={gallery[activeImage].alt}/><button className="quiosco-lightbox-next" onClick={()=>setActiveImage((activeImage+1)%gallery.length)} aria-label="Imagen siguiente">›</button><span>{String(activeImage+1).padStart(2,"0")} / 05</span></div>}
      </section>

      <section className="quiosco-configurator">
        <div className="quiosco-container">
          <div className="quiosco-config-heading quiosco-reveal"><div><span className="quiosco-label">Configura tu quiosco</span><h2>Planos y<em> configuración.</em></h2></div><p>Consulta las vistas técnicas del modelo 5 × 3 y elige si quieres recibirlo con o sin montaje.</p></div>
          <div className="quiosco-config-grid">
            <div className="quiosco-plan-panel quiosco-reveal">
              <button type="button" className="quiosco-plan-stage plan-expand-stage" onClick={() => setPlanLightboxOpen(true)} aria-label="Ampliar plano"><img src={plans[activePlan].src} alt={plans[activePlan].alt} /><span className="plan-expand-label">Ampliar</span></button>
              <div className="quiosco-plan-thumbs">{plans.map((plan,index)=><button key={plan.src} type="button" className={activePlan===index?"is-active":""} onClick={()=>setActivePlan(index)}><img src={plan.src} alt="" loading="lazy"/></button>)}</div>
            </div>
            <aside className="quiosco-offer quiosco-reveal">
              <span className="quiosco-offer-kicker">Quiosco 5 × 3</span>
              <div className="quiosco-offer-price"><span>Precio</span><strong>{formatPrice(offer.price)}</strong></div>
              <div className="quiosco-offer-facts"><div><span>Superficie</span><strong>15 m²</strong></div><div><span>Dimensiones</span><strong>5 × 3 m</strong></div><div><span>Código</span><strong>299</strong></div></div>
              <div className="quiosco-finish-selector"><span>Configuración</span>{(Object.keys(finishes) as FinishId[]).map(id=><button key={id} type="button" className={finish===id?"is-active":""} onClick={()=>setFinish(id)}><span>{id==="sin-montaje"?"Sin montaje":"Con montaje"}</span><strong>{formatPrice(finishes[id].price)}</strong><small>{finishes[id].label}</small></button>)}</div>
              <span className="quiosco-cta-button is-disabled" aria-disabled="true"><span>Solicitar información</span><ArrowUpRight className="ui-arrow-icon"/></span>
            </aside>
          </div>
        </div>
      </section>

      {planLightboxOpen && <div className="plan-lightbox" role="dialog" aria-modal="true" aria-label="Plano ampliado"><button type="button" className="plan-lightbox-close" onClick={() => setPlanLightboxOpen(false)}>Cerrar</button><button type="button" className="plan-lightbox-prev" onClick={() => setActivePlan((activePlan - 1 + plans.length) % plans.length)} aria-label="Plano anterior">←</button><img src={plans[activePlan].src} alt={plans[activePlan].alt}/><button type="button" className="plan-lightbox-next" onClick={() => setActivePlan((activePlan + 1) % plans.length)} aria-label="Plano siguiente">→</button><span className="plan-lightbox-count">{String(activePlan + 1).padStart(2,"0")} / {String(plans.length).padStart(2,"0")}</span></div>}

      <section className="quiosco-story"><div className="quiosco-container quiosco-story-grid"><div className="quiosco-reveal"><span className="quiosco-label">El modelo</span><h2>Un punto de encuentro<em> hecho en madera.</em></h2></div><div className="quiosco-story-copy quiosco-reveal"><p>Este quiosco de madera está pensado para impulsar un negocio o crear un espacio práctico para recibir invitados. Su diseño permite adaptarlo al uso que necesites y convertirlo en un punto de atención con una presencia cálida y reconocible.</p><p>Las dos aperturas ajustables permiten abrir el quiosco para exponer productos y atender al público, o cerrar sus laterales cuando sea necesario. Sus 15 m² ofrecen un interior compacto y funcional para usos comerciales y privados.</p></div></div></section>

      <section className="quiosco-features"><div className="quiosco-container"><div className="quiosco-features-heading quiosco-reveal"><span className="quiosco-label quiosco-label-light">Características</span><h2>Compacto por fuera.<em> Adaptable por diseño.</em></h2></div><div className="quiosco-feature-grid"><article className="quiosco-reveal"><span>01</span><h3>2 aperturas ajustables</h3><p>Configura los laterales para abrir el espacio al público o cerrarlo según las necesidades de cada momento.</p></article><article className="quiosco-reveal"><span>02</span><h3>15 m² funcionales</h3><p>Una superficie de 5 × 3 m pensada para moverse con comodidad y aprovechar el espacio de trabajo.</p></article><article className="quiosco-reveal"><span>03</span><h3>Madera de coníferas</h3><p>Una estructura sencilla y atractiva construida en madera para integrarse con naturalidad en distintos entornos.</p></article></div></div></section>

      <section className="quiosco-closing"><div className="quiosco-container quiosco-closing-grid"><div className="quiosco-reveal"><span className="quiosco-label quiosco-label-light">Quiosco 5 × 3</span><h2>Haz que tu espacio<em> trabaje contigo.</em></h2></div><div className="quiosco-reveal"><p>Cuéntanos cómo quieres utilizar tu quiosco y te ayudaremos con la configuración y el montaje.</p><span className="quiosco-cta-button is-disabled" aria-disabled="true"><span>Hablar con UkrMadera</span><ArrowUpRight className="ui-arrow-icon"/></span></div></div></section>
    </article>
  );
}
