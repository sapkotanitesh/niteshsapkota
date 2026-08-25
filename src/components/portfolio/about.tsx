import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Layers, Server, Sparkles, MapPin, type LucideIcon } from "lucide-react";

import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { profile, skills } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/portfolio/section-heading";

const SKILL_ICONS: Record<string, LucideIcon> = {
  Frontend: Layers,
  Backend: Server,
  Craft: Sparkles,
};

export function About() {
  const scope = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !portraitRef.current) return;

      // Parallax: the portrait panel drifts against the scroll direction.
      gsap.fromTo(
        portraitRef.current,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope },
  );

  return (
    <section id="about" ref={scope} className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="01" title="About" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <ScrollReveal stagger={0.12} className="space-y-6">
            {profile.bio.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <dl className="grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {skills.map((group) => {
                const Icon = SKILL_ICONS[group.label] ?? Sparkles;
                return (
                <div key={group.label}>
                  <dt className="flex items-center gap-2 text-xs tracking-widest text-accent uppercase">
                    <Icon className="size-3.5" aria-hidden />
                    {group.label}
                  </dt>
                  <dd className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {group.items.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </dd>
                </div>
                );
              })}
            </dl>
          </ScrollReveal>

          <div ref={portraitRef} className="lg:pt-4">
            <button
              type="button"
              onClick={cycle}
              aria-label={`Show next image (${index + 1} of ${SLIDES.length})`}
              className="group relative block w-full cursor-pointer aspect-4/5 overflow-hidden rounded-2xl border border-border bg-surface text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {SLIDES.map((src, i) => (
                <img
                  key={src}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  src={src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  width={832}
                  height={1040}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
              <div
                aria-hidden
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, var(--color-background) 85%, transparent), transparent 55%), radial-gradient(120% 80% at 20% 10%, color-mix(in oklab, var(--color-accent) 24%, transparent), transparent 60%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-end p-6">
                <span className="font-display text-6xl font-bold opacity-15">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <p className="mt-4 text-sm font-medium">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5 text-accent" aria-hidden />
                  {profile.location}
                </p>
              </div>

              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                <ImageIcon className="size-3.5 text-accent" aria-hidden />
                {index + 1}/{SLIDES.length}
              </span>
              <span className="absolute bottom-4 right-4 flex gap-1.5" aria-hidden>
                {SLIDES.map((src, i) => (
                  <span
                    key={src}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-accent" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
