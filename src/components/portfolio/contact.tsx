import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Mail } from "lucide-react";

import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { sendContactMessage } from "@/lib/contact.functions";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/lib/portfolio-data";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

export function Contact() {
  const submit = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setStatus({ kind: "error", message: parsed.error.issues[0]?.message ?? "Please check the form" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await submit({ data: parsed.data });
      form.reset();
      setStatus({ kind: "sent", message: "Thanks — your message is on its way." });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <section id="contact" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          title="Let's work together"
          description="Have a project in mind, or just want to say hello? Send a note and I'll reply within a couple of days."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal stagger={0.1} className="space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 font-display text-2xl font-semibold transition-colors hover:text-accent sm:text-3xl"
            >
              <Mail className="size-5 text-accent" />
              {profile.email}
            </a>
            <p className="text-muted-foreground">Based in {profile.location} — working remotely worldwide.</p>
            <ul className="flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-border bg-surface p-6"
            >
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project…"
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
              >
                {status.kind === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
                {status.kind === "sending" ? "Sending…" : "Send message"}
              </button>

              {status.message ? (
                <p
                  role="status"
                  className={`text-sm ${status.kind === "error" ? "text-destructive" : "text-accent"}`}
                >
                  {status.message}
                </p>
              ) : null}
            </form>
          </ScrollReveal>
        </div>
      </div>

      <footer className="mx-auto mt-24 max-w-6xl border-t border-border px-6 pt-8">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with React, TypeScript, Tailwind CSS and GSAP.</p>
        </div>
      </footer>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
      />
    </div>
  );
}
