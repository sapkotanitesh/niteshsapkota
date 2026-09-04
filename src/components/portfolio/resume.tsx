import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Briefcase, GraduationCap, Wrench, MapPin, Loader2 } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { getResumeEntries, type ResumeEntry } from "@/lib/resume.functions";

export function Resume() {
  const load = useServerFn(getResumeEntries);
  const [entries, setEntries] = useState<ResumeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    load({})
      .then((data) => {
        if (!alive) return;
        setEntries(data);
      })
      .catch(() => {
        // If the database call fails, leave the section empty rather than
        // showing stale hardcoded data.
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [load]);

  const work = entries.filter((e) => e.kind === "work");
  const education = entries.filter((e) => e.kind === "education");
  const skills = entries.filter((e) => e.kind === "skill");

  return (
    <section id="resume" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        index="03 — Resume"
        title="Experience & education"
        description="Where I've worked, what I've studied, and the tools I reach for."
      />

      {loading ? (
        <div className="mt-16 flex justify-center">
          <Loader2 className="size-6 animate-spin text-accent" />
        </div>
      ) : (
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Work history timeline */}
          <ScrollReveal stagger={0.12}>
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Briefcase className="size-5 text-accent" /> Work history
            </h3>
            <ol className="mt-8 space-y-0 border-l border-border">
              {work.map((job) => (
                <li key={job.id} className="relative pb-10 pl-8 last:pb-0">
                  <span className="absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-accent bg-background" />
                  <p className="text-xs tracking-widest text-accent uppercase">{job.period}</p>
                  <h4 className="mt-2 font-display text-lg font-semibold">{job.title}</h4>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span>{job.subtitle}</span>
                    {job.location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" /> {job.location}
                      </span>
                    ) : null}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {job.items.map((point, i) => (
                      <li key={`${job.id}-${i}`} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          {/* Education + skills column */}
          <div className="space-y-14">
            <ScrollReveal stagger={0.12}>
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <GraduationCap className="size-5 text-accent" /> Education
              </h3>
              <div className="mt-8 space-y-6">
                {education.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
                  >
                    <p className="text-xs tracking-widest text-accent uppercase">{entry.period}</p>
                    <h4 className="mt-2 font-display font-semibold">{entry.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{entry.subtitle}</p>
                    {entry.detail ? (
                      <p className="mt-2 text-sm text-muted-foreground">{entry.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={0.1}>
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Wrench className="size-5 text-accent" /> Skills
              </h3>
              <div className="mt-8 space-y-5">
                {skills.map((group) => (
                  <div key={group.id}>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                      {group.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item, i) => (
                        <span
                          key={`${group.id}-${i}`}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </section>
  );
}
