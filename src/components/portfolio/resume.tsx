import { Briefcase, GraduationCap, Wrench, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { education, skills, workHistory } from "@/lib/portfolio-data";

export function Resume() {
  return (
    <section id="resume" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        index="03 — Resume"
        title="Experience & education"
        description="Where I've worked, what I've studied, and the tools I reach for."
      />

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        {/* Work history timeline */}
        <ScrollReveal stagger={0.12}>
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
            <Briefcase className="size-5 text-accent" /> Work history
          </h3>
          <ol className="mt-8 space-y-0 border-l border-border">
            {workHistory.map((job) => (
              <li key={`${job.company}-${job.period}`} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-accent bg-background" />
                <p className="text-xs tracking-widest text-accent uppercase">{job.period}</p>
                <h4 className="mt-2 font-display text-lg font-semibold">{job.role}</h4>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span>{job.company}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3" /> {job.location}
                  </span>
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex gap-2">
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
                  key={entry.school}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
                >
                  <p className="text-xs tracking-widest text-accent uppercase">{entry.period}</p>
                  <h4 className="mt-2 font-display font-semibold">{entry.degree}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.school}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{entry.detail}</p>
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
                <div key={group.label}>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    {group.label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
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
    </section>
  );
}
