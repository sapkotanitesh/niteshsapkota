import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/lib/portfolio-data";
import { FloatingIcons } from "@/components/portfolio/floating-icons";

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      if (prefersReducedMotion()) {
        gsap.set("[data-hero-reveal] > span, [data-hero-fade]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero-reveal] > span", {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
      }).from(
        "[data-hero-fade]",
        { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 },
        "-=0.5",
      );

      // Parallax: the glow drifts slower than the page as you scroll.
      gsap.to(glowRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Gentle bob on the scroll cue and the availability dot.
      gsap.to("[data-scroll-cue]", {
        y: 6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to("[data-pulse-dot]", {
        scale: 1.6,
        opacity: 0.4,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope },
  );

  const headline = ["Designing", "and building", "the modern web."];

  return (
    <section
      id="hero"
      ref={scope}
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <FloatingIcons className="hidden md:block" />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute top-[-20%] left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 65%)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <p
          data-hero-fade
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          Available for new work — {profile.location}
        </p>

        <h1 className="font-display text-5xl leading-[0.95] font-bold sm:text-7xl lg:text-8xl">
          {headline.map((line, i) => (
            <span key={line} data-hero-reveal className="block overflow-hidden pb-1">
              <span className={i === headline.length - 1 ? "block text-gradient" : "block"}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-fade className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          {profile.tagline} Currently working as a {profile.role.toLowerCase()}.
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            View selected work
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            Get in touch
          </a>
        </div>

        <div
          data-hero-fade
          className="mt-20 flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase"
        >
          <ArrowDown className="size-3" />
          Scroll
        </div>
      </div>
    </section>
  );
}
