import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { projects, type Project } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          title="Selected work"
          description="A few projects that show how I think about interface, motion, and the systems underneath."
        />

        <ScrollReveal
          stagger={0.12}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    registerGsap();
  }, []);

  const animate = (vars: gsap.TweenVars) => {
    if (prefersReducedMotion() || !cardRef.current) return;
    gsap.to(cardRef.current, { duration: 0.45, ease: "power3.out", ...vars });
  };

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    animate({ rotateY: px * 8, rotateX: -py * 8, scale: 1.02, duration: 0.3 });
  };

  const handleLeave = () => animate({ rotateY: 0, rotateX: 0, scale: 1 });

  return (
    <a
      ref={cardRef}
      href={project.link}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 0%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold">{project.title}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      </div>
      <div className="relative mt-6 flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{project.year}</span>
      </div>
    </a>
  );
}
