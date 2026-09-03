import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import {
  getIsAdmin,
  getResumeEntries,
  saveResumeEntries,
  type ResumeEntryInput,
} from "@/lib/resume.functions";

export const Route = createFileRoute("/_authenticated/resume-editor")({
  head: () => ({
    meta: [
      { title: "Resume editor — Nitesh Sapkota" },
      { name: "description", content: "Private editor for updating work history, education and skills." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Resume editor" },
      { property: "og:description", content: "Private editor for the portfolio resume section." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResumeEditor,
});

type Draft = ResumeEntryInput & { key: string };

const blank = (kind: ResumeEntryInput["kind"], sort: number): Draft => ({
  key: crypto.randomUUID(),
  kind,
  sort_order: sort,
  title: "",
  subtitle: "",
  location: "",
  period: "",
  detail: "",
  items: [],
});

function ResumeEditor() {
  const navigate = useNavigate();
  const load = useServerFn(getResumeEntries);
  const checkAdmin = useServerFn(getIsAdmin);
  const save = useServerFn(saveResumeEntries);

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [entries, admin] = await Promise.all([load({}), checkAdmin({})]);
        if (!alive) return;
        setIsAdmin(admin.isAdmin);
        setDrafts(entries.map((e) => ({ ...e, key: e.id })));
      } catch {
        toast.error("Could not load resume content.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [load, checkAdmin]);

  const update = (key: string, patch: Partial<Draft>) =>
    setDrafts((prev) => prev.map((d) => (d.key === key ? { ...d, ...patch } : d)));

  const remove = (key: string) => setDrafts((prev) => prev.filter((d) => d.key !== key));

  const add = (kind: ResumeEntryInput["kind"]) =>
    setDrafts((prev) => [
      ...prev,
      blank(kind, prev.filter((d) => d.kind === kind).length + 1),
    ]);

  async function onSave() {
    setSaving(true);
    try {
      await save({
        data: {
          entries: drafts.map(({ key: _key, ...entry }, index) => ({
            ...entry,
            sort_order: index,
            items: entry.items.filter((i) => i.trim().length > 0),
          })),
        },
      });
      toast.success("Resume updated.");
    } catch {
      toast.error("Save failed. Make sure you're signed in as the owner.");
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-accent" />
      </main>
    );
  }

  const sections: { kind: ResumeEntryInput["kind"]; label: string }[] = [
    { kind: "work", label: "Work history" },
    { kind: "education", label: "Education" },
    { kind: "skill", label: "Skill groups" },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Resume editor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your work history, education and skills — changes go live instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            View site
          </Link>
          <button type="button" onClick={signOut} className="text-sm text-muted-foreground hover:text-foreground">
            Sign out
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || !isAdmin}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save changes
          </button>
        </div>
      </div>

      {!isAdmin ? (
        <p className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
          This account doesn't have edit permission. Sign in with the owner account.
        </p>
      ) : null}

      <div className="mt-12 space-y-14">
        {sections.map((section) => (
          <section key={section.kind}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{section.label}</h2>
              <button
                type="button"
                onClick={() => add(section.kind)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
              >
                <Plus className="size-4" /> Add
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {drafts
                .filter((d) => d.kind === section.kind)
                .map((draft) => (
                  <div key={draft.key} className="rounded-xl border border-border bg-surface p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label={section.kind === "skill" ? "Group name" : section.kind === "work" ? "Role" : "Degree"}
                        value={draft.title}
                        onChange={(v) => update(draft.key, { title: v })}
                      />
                      {section.kind !== "skill" ? (
                        <Field
                          label={section.kind === "work" ? "Company" : "School"}
                          value={draft.subtitle}
                          onChange={(v) => update(draft.key, { subtitle: v })}
                        />
                      ) : null}
                      {section.kind === "work" ? (
                        <Field
                          label="Location"
                          value={draft.location}
                          onChange={(v) => update(draft.key, { location: v })}
                        />
                      ) : null}
                      {section.kind !== "skill" ? (
                        <Field
                          label="Period"
                          value={draft.period}
                          onChange={(v) => update(draft.key, { period: v })}
                        />
                      ) : null}
                    </div>

                    {section.kind === "education" ? (
                      <div className="mt-4">
                        <Field
                          label="Detail"
                          value={draft.detail}
                          onChange={(v) => update(draft.key, { detail: v })}
                        />
                      </div>
                    ) : null}

                    {section.kind !== "education" ? (
                      <div className="mt-4">
                        <label className="text-xs tracking-widest text-muted-foreground uppercase">
                          {section.kind === "work" ? "Highlights (one per line)" : "Skills (one per line)"}
                        </label>
                        <textarea
                          rows={4}
                          value={draft.items.join("\n")}
                          onChange={(e) => update(draft.key, { items: e.target.value.split("\n") })}
                          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                        />
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => remove(draft.key)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" /> Remove
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
