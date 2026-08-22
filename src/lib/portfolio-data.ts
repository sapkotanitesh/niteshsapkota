export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
};

export const projects: Project[] = [
  {
    title: "Orbit Analytics",
    description:
      "A realtime dashboard for product teams — streaming charts, saved segments, and a query builder that non-engineers actually use.",
    tags: ["React", "TypeScript", "D3"],
    year: "2026",
    link: "#",
  },
  {
    title: "Nimbus Commerce",
    description:
      "Headless storefront with an editorial feel. Sub-second navigation, animated product transitions, and a fully typed checkout flow.",
    tags: ["TanStack Start", "Tailwind", "Stripe"],
    year: "2025",
    link: "#",
  },
  {
    title: "Fieldnote",
    description:
      "Offline-first note taking for researchers. Local sync engine, conflict resolution, and a keyboard-driven capture experience.",
    tags: ["PWA", "IndexedDB", "GSAP"],
    year: "2025",
    link: "#",
  },
  {
    title: "Signal Studio",
    description:
      "A motion playground where designers compose scroll timelines visually and export production-ready animation code.",
    tags: ["GSAP", "Canvas", "Node"],
    year: "2024",
    link: "#",
  },
];

export type Skill = { label: string; items: string[] };

export const skills: Skill[] = [
  { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "GSAP"] },
  { label: "Backend", items: ["Node.js", "Server Functions", "PostgreSQL", "REST"] },
  { label: "Craft", items: ["Design systems", "Motion", "Accessibility", "Performance"] },
];

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
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
