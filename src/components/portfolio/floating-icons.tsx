import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  Braces,
  Code2,
  Component,
  Database,
  Figma,
  Palette,
  Sparkles,
  Terminal,
  Wand2,
  Zap,
} from "lucide-react";

import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

const ICONS = [
  { Icon: Code2, label: "Code", top: "12%", left: "6%", size: "size-6", delay: 0 },
  { Icon: Sparkles, label: "Motion", top: "22%", left: "88%", size: "size-5", delay: 0.4 },
  { Icon: Component, label: "Components", top: "58%", left: "4%", size: "size-5", delay: 0.8 },
  { Icon: Database, label: "Data", top: "70%", left: "92%", size: "size-6", delay: 1.2 },
  { Icon: Palette, label: "Design", top: "38%", left: "80%", size: "size-5", delay: 0.2 },
  { Icon: Terminal, label: "Tooling", top: "80%", left: "16%", size: "size-5", delay: 1 },
  { Icon: Braces, label: "TypeScript", top: "8%", left: "68%", size: "size-5", delay: 0.6 },
  { Icon: Zap, label: "Performance", top: "48%", left: "13%", size: "size-4", delay: 1.4 },
  { Icon: Figma, label: "Figma", top: "88%", left: "72%", size: "size-4", delay: 0.9 },
  { Icon: Wand2, label: "Craft", top: "30%", left: "34%", size: "size-4", delay: 1.6 },
];

/**
 * Decorative floating tech icons. Purely presentational — hidden from
 * assistive tech and frozen when the visitor prefers reduced motion.
 */
export function FloatingIcons({ className = "" }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-float]"));
      items.forEach((el, i) => {
        const delay = Number(el.dataset.delay ?? 0);
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.3 + delay * 0.3, ease: "back.out(2)" },
        );
        gsap.to(el, {
          y: i % 2 === 0 ? -18 : 16,
          x: i % 3 === 0 ? 10 : -8,
          rotate: i % 2 === 0 ? 6 : -6,
          duration: 3.2 + (i % 4) * 0.6,
          delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {ICONS.map(({ Icon, label, top, left, size, delay }) => (
        <span
          key={label}
          data-float
          data-delay={delay}
          className="absolute flex size-11 items-center justify-center rounded-2xl border border-border bg-surface/60 text-accent backdrop-blur-sm"
          style={{ top, left }}
        >
          <Icon className={size} />
        </span>
      ))}
    </div>
  );
}
