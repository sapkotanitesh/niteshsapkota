import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Navigation } from "@/components/portfolio/navigation";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { projects, profile } from "@/lib/portfolio-data";

const title = "Portfolio — Projects by Nitesh Sapkota";
const description =
  "Full case-study gallery of projects by Nitesh Sapkota: realtime analytics, headless commerce, offline-first apps and motion tooling, each with visuals and links.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          about: { "@type": "Person", name: profile.name },
          hasPart: projects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            dateCreated: project.year,
            url: project.link,
          })),
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back home
          </Link>

          <div className="mt-8">
            <SectionHeading
              index="Portfolio"
              title="Projects in full"
              description="Every project with a full-size look at the interface, what I built, and where to see it live."
            />
          </div>

          <div className="mt-16 space-y-24">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} stagger={0.1}>
                <article className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`group overflow-hidden rounded-2xl border border-border bg-surface ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width={1600}
                      height={1000}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </a>

                  <div>
                    <p className="text-xs tracking-widest text-accent uppercase">
                      {project.year}
                      {project.role ? ` — ${project.role}` : ""}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      Visit project <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
