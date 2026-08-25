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
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border bg-surface">
              <div
                aria-hidden
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 80% at 20% 10%, color-mix(in oklab, var(--color-accent) 28%, transparent), transparent 60%)",
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
