import { createFileRoute } from "@tanstack/react-router";

import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Projects } from "@/components/portfolio/projects";
import { Contact } from "@/components/portfolio/contact";
import { profile, projects, skills } from "@/lib/portfolio-data";

const title = "Nitesh Sapkota — Frontend Engineer & Interaction Designer";
const description =
  "Portfolio of Nitesh Sapkota, a frontend engineer in Kathmandu building fast, motion-driven web experiences with React, TypeScript, Tailwind CSS and GSAP.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0a0a0b" },
      {
        name: "keywords",
        content:
          "frontend engineer, interaction designer, React developer, TypeScript, GSAP animation, Tailwind CSS, portfolio, Kathmandu",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              description: profile.bio[0],
              email: `mailto:${profile.email}`,
              address: { "@type": "PostalAddress", addressLocality: profile.location },
              knowsAbout: skills.flatMap((group) => group.items),
              sameAs: profile.socials.map((social) => social.href),
            },
            {
              "@type": "WebSite",
              name: `${profile.name} — Portfolio`,
              description,
              inLanguage: "en",
            },
            {
              "@type": "ItemList",
              name: "Selected work",
              itemListElement: projects.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: project.title,
                description: project.description,
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
