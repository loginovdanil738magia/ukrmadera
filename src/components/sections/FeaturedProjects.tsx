"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01", title: "Everest", model: "5 × 3 m", category: "Espacio multifuncional",
    images: ["/images/projects/everest-01.jpg", "/images/projects/everest-02.jpg", "/images/projects/everest-03.jpg"],
    description: "Arquitectura contemporánea y luminosa, diseñada para crear un espacio independiente de trabajo, ocio o descanso.",
    details: ["15 m²", "Aislamiento térmico", "Ventanales suelo-techo", "Terraza opcional"],
    href: "/catalogo/casetas/everest-5x3",
  },
  {
    number: "02", title: "Oma", model: "6 × 6 m", category: "Casa de jardín",
    images: ["/images/projects/oma-01.jpg", "/images/projects/oma-02.jpg", "/images/projects/oma-03.jpg"],
    description: "Un espacio cálido y funcional que combina arquitectura tradicional, zonas interiores independientes y un amplio porche exterior.",
    details: ["36 m²", "Porche de 8 m²", "Aislamiento térmico", "Dormitorio + baño"],
    href: "/catalogo/casetas/oma-6x6",
  },
  {
    number: "03", title: "Pryory", model: "6 × 3 m", category: "Estudio de madera",
    images: ["/images/projects/pryory-01.jpg", "/images/projects/pryory-02.jpg", "/images/projects/pryory-03.jpg"],
    description: "Un volumen compacto de líneas contemporáneas con grandes superficies acristaladas y una conexión directa entre interior y jardín.",
    details: ["18 m²", "Grandes ventanales", "Aislamiento opcional", "Terraza opcional"],
    href: "/catalogo/casetas/pryory-6x3",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);
  const visibleLayerRef = useRef<HTMLElement | null>(null);
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const firstRenderRef = useRef(true);
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const currentProject = projects[activeProject];

  const previousImage = () => setActiveImage((i) => i === 0 ? currentProject.images.length - 1 : i - 1);
  const nextImage = () => setActiveImage((i) => i === currentProject.images.length - 1 ? 0 : i + 1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.from(".projects-heading-line-inner", {
        yPercent: 115, duration: 1.25, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: ".projects-header", start: "top 82%", once: true },
      });
      gsap.from(".projects-header-meta", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-header", start: "top 82%", once: true },
      });

      mm.add("(min-width: 901px)", () => {
        const visual = section.querySelector<HTMLElement>(".projects-visual");
        const frame = section.querySelector<HTMLElement>(".projects-image-frame");
        if (visual && frame) {
          gsap.timeline({ scrollTrigger: { trigger: ".projects-experience", start: "top 82%", once: true } })
            .fromTo(visual, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.inOut" })
            .fromTo(frame, { scale: 1.06 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0.15)
            .from(".project-visual-top", { y: 15, opacity: 0, duration: 0.8 }, 0.85)
            .from(".project-gallery-controls", { y: 15, opacity: 0, duration: 0.8 }, 0.95);
        }

        gsap.utils.toArray<HTMLElement>(".project-scroll-item").forEach((item, index) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 82%", once: true } });
          tl.from(item.querySelectorAll(".project-scroll-number, .project-scroll-category"), { y: 16, opacity: 0, duration: 0.65, stagger: 0.08 })
            .from(item.querySelector("h3"), { y: 55, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.35")
            .from(item.querySelector(".project-model"), { y: 15, opacity: 0, duration: 0.65 }, "-=0.55")
            .from(item.querySelector(".project-description"), { y: 25, opacity: 0, duration: 0.8 }, "-=0.35")
            .from(item.querySelectorAll(".project-detail"), { y: 18, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.45")
            .from(item.querySelector(".project-discover"), { scaleX: 0, transformOrigin: "left", duration: 0.9 }, "-=0.35");

          ScrollTrigger.create({
            trigger: item, start: "top 55%", end: "bottom 45%",
            onEnter: () => { setActiveProject(index); setActiveImage(0); },
            onEnterBack: () => { setActiveProject(index); setActiveImage(0); },
          });
        });
      });

      mm.add("(max-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>(".mobile-project-card").forEach((card) => {
          const media = card.querySelector<HTMLElement>(".mobile-project-media");
          const image = card.querySelector<HTMLElement>(".mobile-project-image");
          const meta = card.querySelectorAll(".mobile-project-number, .mobile-project-category");
          const content = card.querySelectorAll(".mobile-project-title, .mobile-project-model, .mobile-project-description, .mobile-project-detail, .mobile-project-link");

          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } });
          tl.fromTo(media, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.05, ease: "power4.inOut" })
            .fromTo(image, { scale: 1.12 }, { scale: 1, duration: 1.35, ease: "power3.out" }, 0)
            .from(meta, { y: 12, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.55)
            .from(content, { y: 24, opacity: 0, duration: 0.7, stagger: 0.055, ease: "power3.out" }, 0.68);
        });
      });

      return () => mm.revert();
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const stage = imageStageRef.current;
    if (!stage) return;
    const layers = Array.from(stage.querySelectorAll<HTMLElement>(".project-image-layer"));
    const next = stage.querySelector<HTMLElement>(`.project-image-layer[data-project="${activeProject}"][data-image="${activeImage}"]`);
    if (!next) return;

    if (firstRenderRef.current) {
      layers.forEach((layer) => gsap.set(layer, { opacity: layer === next ? 1 : 0, visibility: layer === next ? "visible" : "hidden", zIndex: layer === next ? 2 : 0, clipPath: "inset(0)" }));
      visibleLayerRef.current = next;
      firstRenderRef.current = false;
      return;
    }

    const previous = visibleLayerRef.current;
    if (previous === next) return;
    transitionRef.current?.kill();
    gsap.killTweensOf(layers);
    layers.forEach((layer) => {
      if (layer !== previous && layer !== next) gsap.set(layer, { opacity: 0, visibility: "hidden", zIndex: 0 });
    });
    if (previous) gsap.set(previous, { opacity: 1, visibility: "visible", zIndex: 1, clipPath: "inset(0)" });
    gsap.set(next, { opacity: 1, visibility: "visible", zIndex: 2, clipPath: "inset(0 100% 0 0)" });
    const img = next.querySelector<HTMLElement>(".project-image");
    if (img) gsap.set(img, { scale: 1.075, xPercent: 2.5 });
    visibleLayerRef.current = next;

    const tl = gsap.timeline({ onComplete: () => {
      layers.forEach((layer) => { if (layer !== next) gsap.set(layer, { opacity: 0, visibility: "hidden", zIndex: 0 }); });
      gsap.set(next, { opacity: 1, visibility: "visible", zIndex: 2, clipPath: "inset(0)" });
      transitionRef.current = null;
    }});
    transitionRef.current = tl;
    tl.to(next, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power4.inOut" }, 0);
    if (img) tl.to(img, { scale: 1, xPercent: 0, duration: 1.35, ease: "power3.out" }, 0);
    return () => {
      tl.kill();
    };
  }, [activeProject, activeImage]);

  return (
    <section ref={sectionRef} className="featured-projects">
      <div className="projects-container">
        <header className="projects-header">
          <div>
            <div className="projects-eyebrow"><span>Proyectos realizados</span><span className="projects-eyebrow-line" /></div>
            <h2 className="projects-heading">
              <span className="projects-heading-line"><span className="projects-heading-line-inner">Espacios que</span></span>
              <span className="projects-heading-line"><span className="projects-heading-line-inner projects-heading-editorial">cobran vida.</span></span>
            </h2>
          </div>
          <div className="projects-header-meta"><span>Obra realizada</span><p>Una selección de espacios construidos por UkrMadera, donde diseño, madera y ejecución forman parte de un mismo proyecto.</p></div>
        </header>

        <div className="projects-desktop">
          <div className="projects-experience">
            <div className="projects-visual">
              <div ref={imageStageRef} className="projects-image-frame">
                {projects.map((project, pi) => project.images.map((image, ii) => (
                  <div key={`${project.number}-${ii}`} className={`project-image-layer ${pi === activeProject && ii === activeImage ? "is-active" : ""}`} data-project={pi} data-image={ii}>
                    <div className="project-image" style={{ backgroundImage: `url(${image})` }} />
                    <div className="project-image-overlay" />
                  </div>
                )))}
                <div className="project-visual-top"><span>UkrMadera</span><span>{String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
                <div className="project-gallery-controls">
                  <div className="project-gallery-counter"><span>{String(activeImage + 1).padStart(2, "0")}</span><span className="project-gallery-separator" /><span>{String(currentProject.images.length).padStart(2, "0")}</span></div>
                  <div className="project-gallery-buttons"><button type="button" className="project-gallery-button" onClick={previousImage} aria-label="Imagen anterior">←</button><button type="button" className="project-gallery-button" onClick={nextImage} aria-label="Imagen siguiente">→</button></div>
                </div>
              </div>
            </div>

            <div className="projects-list">
              {projects.map((project, index) => (
                <article key={project.number} className={`project-scroll-item ${activeProject === index ? "is-active" : ""}`}>
                  <div className="project-scroll-top"><span className="project-scroll-number">{project.number}</span><span className="project-scroll-category">{project.category}</span></div>
                  <div className="project-scroll-main">
                    <h3>{project.title}</h3><span className="project-model">{project.model}</span><p className="project-description">{project.description}</p>
                    <div className="project-details">{project.details.map((detail) => <div key={detail} className="project-detail"><span className="project-detail-dot" /><span>{detail}</span></div>)}</div>
                    <Link href={project.href} className="project-discover"><span>Descubrir modelo</span><span className="project-discover-arrow" aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="projects-mobile">
          {projects.map((project) => (
            <article key={project.number} className="mobile-project-card">
              <div className="mobile-project-media">
                <div className="mobile-project-image" style={{ backgroundImage: `url(${project.images[0]})` }} />
                <div className="mobile-project-overlay" />
                <div className="mobile-project-media-meta"><span>UkrMadera</span><span>{project.number} / {String(projects.length).padStart(2, "0")}</span></div>
              </div>
              <div className="mobile-project-top"><span className="mobile-project-number">{project.number}</span><span className="mobile-project-category">{project.category}</span></div>
              <h3 className="mobile-project-title">{project.title}</h3>
              <span className="mobile-project-model">{project.model}</span>
              <p className="mobile-project-description">{project.description}</p>
              <div className="mobile-project-details">{project.details.map((detail) => <div key={detail} className="mobile-project-detail"><span /><strong>{detail}</strong></div>)}</div>
              <Link href={project.href} className="mobile-project-link"><span>Descubrir modelo</span><span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>

        <footer className="projects-footer"><span>Diseño · Fabricación · Construcción</span><Link href="/proyectos" className="projects-all-link"><span>Ver todos los proyectos</span><span aria-hidden="true">↗</span></Link></footer>
      </div>
    </section>
  );
}
