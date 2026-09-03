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

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export type WorkEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

export const workHistory: WorkEntry[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Orbit Labs",
    location: "Remote",
    period: "2024 — Present",
    highlights: [
      "Lead frontend on a realtime analytics product used by 200+ product teams.",
      "Rebuilt the charting pipeline, cutting dashboard load times by 60%.",
      "Own the design system and motion guidelines across three apps.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Nimbus Studio",
    location: "Kathmandu, Nepal",
    period: "2022 — 2024",
    highlights: [
      "Shipped headless commerce storefronts with sub-second navigation.",
      "Built an internal animation toolkit on GSAP adopted across client work.",
      "Mentored two junior engineers into full-time roles.",
    ],
  },
  {
    role: "UI Developer",
    company: "Freelance",
    location: "Kathmandu, Nepal",
    period: "2020 — 2022",
    highlights: [
      "Delivered marketing sites and product interfaces for early-stage startups.",
      "Focused on performance budgets, accessibility, and motion craft.",
    ],
  },
];

export type EducationEntry = {
  degree: string;
  school: string;
  period: string;
  detail: string;
};

export const education: EducationEntry[] = [
  {
    degree: "BSc. Computer Science",
    school: "Tribhuvan University",
    period: "2016 — 2020",
    detail: "Focused on human-computer interaction, graphics, and web technologies.",
  },
  {
    degree: "Interaction Design Specialization",
    school: "UC San Diego (Coursera)",
    period: "2021",
    detail: "Design principles, prototyping, and evaluation of interactive systems.",
  },
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
