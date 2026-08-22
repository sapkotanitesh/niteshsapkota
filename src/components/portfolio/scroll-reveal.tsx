import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Distance the element travels upward, in px. */
  y?: number;
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: number;
  as?: ElementType;
};

/**
 * Reusable ScrollTrigger reveal. Renders plain markup on the server and only
 * attaches GSAP after hydration, so there is no SSR mismatch.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
  stagger,
  as: Tag = "div",
}: ScrollRevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = scope.current;
      if (!root) return;

      const targets = stagger ? Array.from(root.children) : [root];
      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.8,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope, dependencies: [delay, y, stagger] },
  );

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
