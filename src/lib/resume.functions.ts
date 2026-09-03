import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export const resumeEntrySchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.enum(["work", "education", "skill"]),
  sort_order: z.number().int().min(0).max(999),
  title: z.string().trim().max(120).default(""),
  subtitle: z.string().trim().max(120).default(""),
  location: z.string().trim().max(120).default(""),
  period: z.string().trim().max(60).default(""),
  detail: z.string().trim().max(600).default(""),
  items: z.array(z.string().trim().max(300)).max(20).default([]),
});

export type ResumeEntryInput = z.infer<typeof resumeEntrySchema>;
export type ResumeEntry = ResumeEntryInput & { id: string };

const saveSchema = z.object({ entries: z.array(resumeEntrySchema).max(60) });

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

/** Public read — used by the resume section on the landing page. */
export const getResumeEntries = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("resume_entries")
    .select("id, kind, sort_order, title, subtitle, location, period, detail, items")
    .order("kind")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as ResumeEntry[];
});

/** Tells the signed-in user whether they may edit the resume. */
export const getIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: Boolean(data) };
  });

/** Replaces the whole resume with the submitted entries. Admin-only via RLS. */
export const saveResumeEntries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => saveSchema.parse(data))
  .handler(async ({ data, context }) => {
    const keepIds = data.entries.map((e) => e.id).filter(Boolean) as string[];

    const del = context.supabase.from("resume_entries").delete();
    const { error: delError } = keepIds.length
      ? await del.not("id", "in", `(${keepIds.join(",")})`)
      : await del.neq("id", "00000000-0000-0000-0000-000000000000");
    if (delError) throw new Error(delError.message);

    const rows = data.entries.map((entry) => ({
      ...(entry.id ? { id: entry.id } : {}),
      kind: entry.kind,
      sort_order: entry.sort_order,
      title: entry.title,
      subtitle: entry.subtitle,
      location: entry.location,
      period: entry.period,
      detail: entry.detail,
      items: entry.items,
    }));

    if (rows.length) {
      const { error } = await context.supabase.from("resume_entries").upsert(rows);
      if (error) throw new Error(error.message);
    }

    return { ok: true as const };
  });
