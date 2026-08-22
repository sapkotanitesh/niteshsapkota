import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <ScrollReveal stagger={0.1} className="max-w-2xl">
      <p className="text-xs tracking-[0.3em] text-accent uppercase">{index}</p>
      <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-muted-foreground">{description}</p> : null}
    </ScrollReveal>
  );
}
