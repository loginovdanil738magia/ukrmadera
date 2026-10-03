"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import MediaLightbox from "@/components/products/MediaLightbox";

gsap.registerPlugin(ScrollTrigger);

type SizeId = "4x3" | "5x3" | "5x4" | "5x5";
type FinishId = "sin-montaje" | "con-montaje";

const models = {
  "4x3": { label: "4 × 3", dimensions: "4 × 3 m", area: 12, prices: { "sin-montaje": { price: 6000, code: "446" }, "con-montaje": { price: 8500, code: "553" } } },
  "5x3": { label: "5 × 3", dimensions: "5 × 3 m", area: 15, prices: { "sin-montaje": { price: 7000, code: "445" }, "con-montaje": { price: 9600, code: "554" } } },
  "5x4": { label: "5 × 4", dimensions: "5 × 4 m", area: 20, prices: { "sin-montaje": { price: 8500, code: "447" }, "con-montaje": { price: 13400, code: "555" } } },
  "5x5": { label: "5 × 5", dimensions: "5 × 5 m", area: 25, prices: { "sin-montaje": { price: 9900, code: "448" }, "con-montaje": { price: 13200, code: "556" } } },
} as const;

const finishes = {
  "sin-montaje": "34+34 mm + revestimiento aislada sin montajes",
  "con-montaje": "34+34 mm + revestimiento aislada con montajes",
} as const;

const generalGallery = Array.from({ length: 6 }, (_, index) => ({
  src: `/images/products/everest/everest${index + 1}.webp`,
  alt: `Caseta de jardín Everest · vista ${index + 1}`,
}));

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price);
}

export default function EverestPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const galleryImageRef = useRef<HTMLImageElement>(null);
  const planImageRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState<SizeId>("4x3");
  const [finish, setFinish] = useState<FinishId>("sin-montaje");
  const [activeImage, setActiveImage] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [planLightboxOpen, setPlanLightboxOpen] = useState(false);

  const model = models[size];
  const offer = model.prices[finish];
  const plans = Array.from({ length: 6 }, (_, index) => ({
    src: `/images/products/everest/everest${size}_${index + 1}.webp`,
    alt: `Everest ${model.label} · plano y alzado ${index + 1}`,
  }));

  useEffect(() => {
    const page = pageRef.current;
    const hero = heroImageRef.current;
    if (!page || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(hero, { scale: 1.07, clipPath: "inset(0 0 100% 0)" }, {
        scale: 1.05, clipPath: "inset(0 0 0% 0)", duration: 1.8, ease: "power4.inOut",
      });
      gsap.timeline({ repeat: -1, yoyo: true, delay: 2.6, defaults: { ease: "sine.inOut" } })
        .to(hero, { scale: 1.075, xPercent: -.25, yPercent: -.15, duration: 10 })
        .to(hero, { scale: 1.055, xPercent: .2, yPercent: .15, duration: 12 })
        .to(hero, { scale: 1.08, xPercent: -.15, yPercent: .2, duration: 11 });

      gsap.from(".everest-hero-reveal", { y: 28, opacity: 0, duration: 1, stagger: .09, delay: .3, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".everest-reveal").forEach((el) => {
        gsap.from(el, { y: 32, opacity: 0, duration: .95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%", once: true } });
      });
    }, page);
    return () => ctx.revert();
  }, []);

  const changeSize = (next: SizeId) => {
    if (next === size) return;
    const target = planImageRef.current;
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSize(next); setActivePlan(0); return;
    }
    gsap.to(target, { opacity: 0, x: 16, duration: .2, onComplete: () => {
      setSize(next); setActivePlan(0);
      requestAnimationFrame(() => planImageRef.current && gsap.fromTo(planImageRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .55, ease: "power3.out" }));
    }});
  };

  const changeGallery = (index: number) => {
    if (index === activeImage) return;
    const target = galleryImageRef.current;
    if (!target) { setActiveImage(index); return; }
    gsap.to(target, { opacity: 0, scale: 1.02, duration: .18, onComplete: () => {
      setActiveImage(index);
      requestAnimationFrame(() => galleryImageRef.current && gsap.fromTo(galleryImageRef.current, { opacity: 0, scale: 1.025 }, { opacity: 1, scale: 1, duration: .6, ease: "power3.out" }));
    }});
  };

  return (
    <article ref={pageRef} className="everest-page">
      <section className="everest-hero">
        <div ref={heroImageRef} className="everest-hero-image" aria-hidden="true" />
        <div className="everest-hero-overlay" aria-hidden="true" />
        <div className="everest-container everest-hero-inner">
          <div className="everest-breadcrumb everest-hero-reveal"><Link href="/catalogo">Catálogo</Link><span>/</span><span>Casetas</span><span>/</span><span>Everest</span></div>
          <div className="everest-hero-content">
            <div><span className="everest-eyebrow everest-hero-reveal">Caseta de jardín · 4 tamaños</span><h1 className="everest-hero-reveal">EVEREST</h1></div>
            <div className="everest-hero-summary everest-hero-reveal"><p>Un refugio contemporáneo y aislado para trabajar, entrenar, crear o simplemente desconectar.</p><div><span>12–25 m²</span><span>4 modelos</span><span>Desde 6.000 €</span></div></div>
          </div>
        </div>
      </section>

      <section className="everest-gallery">
        <div className="everest-container">
          <div className="everest-gallery-heading everest-reveal"><div><span className="everest-label">Galería</span><h2>Arquitectura que<em> abre el espacio.</em></h2></div><span>{String(activeImage + 1).padStart(2,"0")} / 06</span></div>
          <button type="button" className="everest-gallery-stage everest-reveal" onClick={() => setLightboxOpen(true)}><img ref={galleryImageRef} src={generalGallery[activeImage].src} alt={generalGallery[activeImage].alt} /><span>Ampliar</span></button>
          <div className="everest-gallery-thumbs">{generalGallery.map((image,index)=><button key={image.src} type="button" className={activeImage===index?"is-active":""} onClick={()=>changeGallery(index)}><img src={image.src} alt="" loading={index<3?"eager":"lazy"} /></button>)}</div>
        </div>
        <MediaLightbox open={lightboxOpen} items={generalGallery} activeIndex={activeImage} onChange={setActiveImage} onClose={() => setLightboxOpen(false)} />
      </section>


      <section className="everest-configurator">
        <div className="everest-container">
          <div className="everest-config-heading everest-reveal"><div><span className="everest-label">Configura tu Everest</span><h2>Un diseño.<em> Cuatro tamaños.</em></h2></div><p>Elige primero el tamaño que necesitas. Después selecciona si quieres el modelo con o sin montaje.</p></div>

          <div className="everest-size-tabs everest-reveal">
            {(Object.keys(models) as SizeId[]).map((id) => <button key={id} type="button" className={size === id ? "is-active" : ""} onClick={() => changeSize(id)}><strong>{models[id].label}</strong><span>{models[id].area} m²</span></button>)}
          </div>

          <div className="everest-config-grid">
            <div className="everest-plan-panel everest-reveal">
              <button type="button" className="everest-plan-stage plan-expand-stage" onClick={() => setPlanLightboxOpen(true)} aria-label="Ampliar plano"><img ref={planImageRef} src={plans[activePlan].src} alt={plans[activePlan].alt} /><span className="plan-expand-label">Ampliar</span></button>
              <div className="everest-plan-thumbs">{plans.map((plan, index) => <button key={plan.src} type="button" className={activePlan === index ? "is-active" : ""} onClick={() => setActivePlan(index)}><img src={plan.src} alt="" loading="lazy" /></button>)}</div>
            </div>

            <aside className="everest-offer everest-reveal">
              <span className="everest-offer-kicker">Everest {model.label}</span>
              <div className="everest-offer-price"><span>Precio</span><strong>{formatPrice(offer.price)}</strong></div>
              <div className="everest-offer-facts"><div><span>Superficie</span><strong>{model.area} m²</strong></div><div><span>Dimensiones</span><strong>{model.dimensions}</strong></div><div><span>Código</span><strong>{offer.code}</strong></div></div>
              <div className="everest-finish-selector">
                <span>Configuración</span>
                {(Object.keys(finishes) as FinishId[]).map((id) => <button key={id} type="button" className={finish === id ? "is-active" : ""} onClick={() => setFinish(id)}><span>{id === "sin-montaje" ? "Sin montaje" : "Con montaje"}</span><strong>{formatPrice(model.prices[id].price)}</strong><small>{finishes[id]}</small></button>)}
              </div>
              <span className="everest-cta-button is-disabled" aria-disabled="true"><span>Solicitar información</span><ArrowUpRight className="ui-arrow-icon" /></span>
            </aside>
          </div>
        </div>
      </section>

      <MediaLightbox open={planLightboxOpen} items={plans} activeIndex={activePlan} onChange={setActivePlan} onClose={() => setPlanLightboxOpen(false)} label="Plano ampliado" />

      <section className="everest-story">
        <div className="everest-container everest-story-grid">
          <div className="everest-reveal"><span className="everest-label">El modelo</span><h2>Tu propio refugio,<em> a tu manera.</em></h2></div>
          <div className="everest-story-copy everest-reveal"><p>Everest combina paz, funcionalidad y una arquitectura compacta. Puede convertirse en oficina, gimnasio, estudio creativo o un espacio de descanso conectado con el jardín.</p><p>Su diseño moderno incorpora tejado plano, grandes ventanales y puertas de suelo a techo, revestimiento contemporáneo y abundante entrada de luz natural. También puede ampliarse con una terraza opcional.</p></div>
        </div>
      </section>

      <section className="everest-features">
        <div className="everest-container">
          <div className="everest-features-heading everest-reveal"><span className="everest-label everest-label-light">Características</span><h2>Compacta por fuera.<em> Abierta por dentro.</em></h2></div>
          <div className="everest-feature-grid"><article className="everest-reveal"><span>01</span><h3>Aislada térmicamente</h3><p>Una solución preparada para crear un espacio más confortable durante todo el año.</p></article><article className="everest-reveal"><span>02</span><h3>Luz natural</h3><p>Grandes ventanales en la parte frontal y lateral conectan el interior con el jardín.</p></article><article className="everest-reveal"><span>03</span><h3>Multifuncional</h3><p>Oficina, gimnasio, estudio, zona de ocio o refugio personal: tú decides cómo habitarlo.</p></article></div>
        </div>
      </section>

      <section className="everest-closing"><div className="everest-container everest-closing-grid"><div className="everest-reveal"><span className="everest-label everest-label-light">Everest</span><h2>Encuentra el tamaño<em> que encaja contigo.</em></h2></div><div className="everest-reveal"><p>Cuéntanos qué uso quieres darle y te ayudaremos a elegir el modelo y la configuración adecuados.</p><span className="everest-cta-button is-disabled" aria-disabled="true"><span>Hablar con UkrMadera</span><ArrowUpRight className="ui-arrow-icon" /></span></div></div></section>
    </article>
  );
}
