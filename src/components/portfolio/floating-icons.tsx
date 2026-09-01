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
  { Icon: Component, label: "Components", top: "34%", left: "3%", size: "size-5", delay: 0.8 },
  { Icon: Database, label: "Data", top: "70%", left: "92%", size: "size-6", delay: 1.2 },
  { Icon: Palette, label: "Design", top: "38%", left: "80%", size: "size-5", delay: 0.2 },
  { Icon: Terminal, label: "Tooling", top: "80%", left: "16%", size: "size-5", delay: 1 },
  { Icon: Braces, label: "TypeScript", top: "8%", left: "68%", size: "size-5", delay: 0.6 },
  { Icon: Zap, label: "Performance", top: "52%", left: "94%", size: "size-4", delay: 1.4 },
  { Icon: Figma, label: "Figma", top: "88%", left: "72%", size: "size-4", delay: 0.9 },
  { Icon: Wand2, label: "Craft", top: "14%", left: "44%", size: "size-4", delay: 1.6 },
];

type Body = {
  el: HTMLElement;
  /** offset from the icon's CSS home position */
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  /** idle drift */
  phase: number;
  amp: number;
  speed: number;
};

const HOVER_RADIUS = 140; // px around the cursor that pushes icons
const FRICTION = 0.955;
const SPRING = 0.008; // pull back home (lower = looser, floatier return)
const MAX_SPEED = 80;

/**
 * Decorative floating tech icons. Hovering near one flicks it away with the
 * cursor's momentum; it then drifts and springs back to its home position.
 * Purely presentational — hidden from assistive tech and frozen when the
 * visitor prefers reduced motion.
 */
export function FloatingIcons({ className = "" }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = scope.current;
      if (!root) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-float]"));

      // Entrance pop.
      items.forEach((el) => {
        const delay = Number(el.dataset["delay"] ?? 0);
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.3 + delay * 0.3, ease: "back.out(2)" },
        );
      });

      if (prefersReducedMotion()) return;

      const bodies: Body[] = items.map((el, i) => ({
        el,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rot: 0,
        vr: 0,
        phase: i * 1.7,
        amp: 8 + (i % 4) * 3,
        speed: 0.35 + (i % 5) * 0.08,
      }));

      let pointer = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };

      const onMove = (e: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const nx = e.clientX - rect.left;
        const ny = e.clientY - rect.top;
        if (!pointer.active) {
          pointer.px = nx;
          pointer.py = ny;
        }
        pointer.x = nx;
        pointer.y = ny;
        pointer.active = true;
      };
      const onLeave = () => {
        pointer.active = false;
        pointer.x = pointer.y = -9999;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);

      const tick = (time: number, delta: number) => {
        const d = Math.min(delta, 40) / 16.666;
        // cursor velocity since last frame
        const mvx = pointer.x - pointer.px;
        const mvy = pointer.y - pointer.py;
        pointer.px = pointer.x;
        pointer.py = pointer.y;

        const t = time / 1000;

        for (const b of bodies) {
          const r = b.el.getBoundingClientRect();
          const rootRect = root.getBoundingClientRect();
          const cx = r.left - rootRect.left + r.width / 2;
          const cy = r.top - rootRect.top + r.height / 2;

          let near = 0;
          if (pointer.active) {
            const dx = cx - pointer.x;
            const dy = cy - pointer.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            if (dist < HOVER_RADIUS) {
              near = 1 - dist / HOVER_RADIUS;
              // sharper falloff = snappier flick when the cursor gets close
              const force = near * near * 14;
              b.vx += (dx / dist) * force + mvx * (0.35 + near * 0.55);
              b.vy += (dy / dist) * force + mvy * (0.35 + near * 0.55);
              b.vr += (mvx * 0.3 + force * 0.9) * (dy > 0 ? 1 : -1);
            }
          }

          // spring home + friction
          b.vx += -b.x * SPRING * d;
          b.vy += -b.y * SPRING * d;
          b.vx *= FRICTION;
          b.vy *= FRICTION;
          b.vr *= 0.94;

          const sp = Math.hypot(b.vx, b.vy);
          if (sp > MAX_SPEED) {
            b.vx = (b.vx / sp) * MAX_SPEED;
            b.vy = (b.vy / sp) * MAX_SPEED;
          }

          b.x += b.vx * d;
          b.y += b.vy * d;
          b.rot += b.vr * d;
          b.rot *= 0.96;

          const driftY = Math.sin(t * b.speed + b.phase) * b.amp;
          const driftX = Math.cos(t * b.speed * 0.8 + b.phase) * b.amp * 0.6;

          // squash & stretch along the direction of travel + glow when near
          const stretch = Math.min(sp / 90, 0.35);
          const angle = Math.atan2(b.vy, b.vx) * (180 / Math.PI);

          gsap.set(b.el, {
            x: b.x + driftX,
            y: b.y + driftY,
            rotate: b.rot,
            scale: 1 + near * 0.15 + Math.min(sp, 20) / 150,
          });
          gsap.set(b.el.firstElementChild, {
            rotate: angle - b.rot,
            scaleX: 1 + stretch,
            scaleY: 1 - stretch * 0.6,
          });
          const glow = Math.min(0.25 + near + sp / 60, 1);
          b.el.style.borderColor = `color-mix(in oklab, var(--color-accent) ${Math.round(glow * 70)}%, var(--color-border))`;
          b.el.style.boxShadow =
            glow > 0.4
              ? `0 0 ${Math.round(glow * 24)}px color-mix(in oklab, var(--color-accent) ${Math.round(glow * 45)}%, transparent)`
              : "none";
        }
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      };
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
          className="absolute flex size-11 items-center justify-center rounded-2xl border border-border bg-surface/60 text-accent backdrop-blur-sm will-change-transform"
          style={{ top, left }}
        >
          <Icon className={size} />
        </span>
      ))}
    </div>
  );
}
