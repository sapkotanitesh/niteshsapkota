# Portfolio Website Skeleton Plan

## Overview
Build a single-page scrolling portfolio on the existing **TanStack Start v1 + React + TypeScript + Vite + Tailwind CSS v4** stack. The design direction is **dark modern** with GSAP-driven animations.

## Design Direction
- **Theme**: Dark modern (near-black surfaces, white text, blue accent).
- **Structure**: Single-page scroll with anchored nav links (Hero, About, Projects, Contact).
- **Typography**: Clean sans-serif heading + body pair loaded via Google Fonts `<link>` in `src/routes/__root.tsx`.
- **Color tokens**: Registered in `src/styles.css` under the existing `@theme inline` block using oklch values.

## Sections
1. **Hero** — name, tagline, primary CTA, animated intro text.
2. **About** — short bio paragraph + placeholder avatar.
3. **Projects** — 3–4 project cards in a responsive grid.
4. **Contact** — contact links/form and footer.

## GSAP Effects to Implement
- **Hero text animation**: staggered word/line fade-in on load.
- **Scroll-triggered reveals**: sections and cards fade/slide in via ScrollTrigger.
- **Parallax sections**: subtle background layer movement on scroll.
- **Hover micro-interactions**: project cards scale/tilt on hover.

## File Changes

### Dependencies
- Install `gsap` and `@gsap/react` via bun.

### Styles
- Update `src/styles.css`:
  - Add dark-modern color tokens (`--color-surface`, `--color-surface-elevated`, `--color-accent`, etc.).
  - Keep existing shadcn tokens intact.
  - Register any new tokens in `@theme inline`.
  - Add a custom `.text-gradient` utility using `@utility`.

### Layout
- Update `src/routes/__root.tsx`:
  - Replace generic "Lovable App" metadata with portfolio-specific defaults.
  - Add Google Fonts `<link>` for the chosen font family.
  - Keep `<Outlet />` and providers.

### Home Route
- Rewrite `src/routes/index.tsx`:
  - Compose the page from new section components.
  - Add route-specific `head()` with title, description, og:title, og:description, og:type, twitter:card.

### New Components
Create under `src/components/portfolio/`:
- `Hero.tsx` — hero section with GSAP load animation.
- `About.tsx` — bio + avatar placeholder.
- `Projects.tsx` — project grid with hover effects.
- `Contact.tsx` — contact section + footer.
- `Navigation.tsx` — sticky top nav with smooth-scroll anchors.
- `ScrollReveal.tsx` — reusable GSAP ScrollTrigger wrapper.
- `useGSAP.ts` hook usage via `@gsap/react` for scoped animations.

### Animation Strategy
- Use `@gsap/react`'s `useGSAP` hook inside each section component.
- Register GSAP plugins (`ScrollTrigger`) once in a client-only initializer.
- Wrap browser-only GSAP code with `useEffect` / hydrated guard to avoid SSR mismatches.
- Keep animations optional/respectful: no infinite motion, reduced-motion friendly via `prefers-reduced-motion`.

## SEO / Metadata
- Route `head()` on `/` sets:
  - `title`: "Your Name — Portfolio"
  - `description`: portfolio summary
  - `og:title`, `og:description`, `og:type: website`, `twitter:card`
- No `og:image` unless a hero image is generated later.

## Responsive Behavior
- Mobile-first layout with Tailwind breakpoints.
- Navigation collapses to a hamburger menu on small screens.
- Project grid goes 1 column on mobile, 2 on tablet, 3 on desktop.

## Verification
- Run `bun run build` to confirm no SSR/import errors.
- Check preview for all four sections, scroll animations, and hover interactions.
