import projectOrbit from "@/assets/project-orbit.jpg";
import projectNimbus from "@/assets/project-nimbus.jpg";
import projectFieldnote from "@/assets/project-fieldnote.jpg";
import projectSignal from "@/assets/project-signal.jpg";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
  image: string;
  imageAlt: string;
  role?: string;
};

export const projects: Project[] = [
  {
    title: "Orbit Analytics",
    description:
      "A realtime dashboard for product teams — streaming charts, saved segments, and a query builder that non-engineers actually use.",
    tags: ["React", "TypeScript", "D3"],
    year: "2026",
    link: "https://example.com/orbit-analytics",
    image: projectOrbit,
    imageAlt: "Dark realtime analytics dashboard with glowing teal streaming charts",
    role: "Lead frontend engineer",
  },
  {
    title: "Nimbus Commerce",
    description:
      "Headless storefront with an editorial feel. Sub-second navigation, animated product transitions, and a fully typed checkout flow.",
    tags: ["TanStack Start", "Tailwind", "Stripe"],
    year: "2025",
    link: "https://example.com/nimbus-commerce",
    image: projectNimbus,
    imageAlt: "Editorial headless storefront shown on a laptop in a dark studio",
    role: "Frontend & motion",
  },
  {
    title: "Fieldnote",
    description:
      "Offline-first note taking for researchers. Local sync engine, conflict resolution, and a keyboard-driven capture experience.",
    tags: ["PWA", "IndexedDB", "GSAP"],
    year: "2025",
    link: "https://example.com/fieldnote",
    image: projectFieldnote,
    imageAlt: "Offline-first research note taking app on a tablet in low light",
    role: "Product engineer",
  },
  {
    title: "Signal Studio",
    description:
      "A motion playground where designers compose scroll timelines visually and export production-ready animation code.",
    tags: ["GSAP", "Canvas", "Node"],
    year: "2024",
    link: "https://example.com/signal-studio",
    image: projectSignal,
    imageAlt: "Abstract glowing animation timeline curves on a black background",
    role: "Creative developer",
  },
];

export type Skill = { label: string; items: string[] };

export const skills: Skill[] = [
  { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "GSAP"] },
  { label: "Backend", items: ["Node.js", "Server Functions", "PostgreSQL", "REST"] },
  { label: "Craft", items: ["Design systems", "Motion", "Accessibility", "Performance"] },
];

export const navLinks: { id: string; label: string; to?: "/portfolio" }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];


export const profile = {
  name: "Nitesh Sapkota",
  role: "Frontend Engineer & Interaction Designer",
  location: "Kathmandu, Nepal",
  email: "hello@example.com",
  tagline: "I build fast, considered web experiences with motion at their core.",
  bio: [
    "I'm a frontend engineer who cares about the space between design and engineering — the timing of a transition, the weight of a typeface, the moment a page feels alive.",
    "For the past several years I've shipped product interfaces for startups and studios, working end to end from design systems through to server-side data and deployment.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
};
