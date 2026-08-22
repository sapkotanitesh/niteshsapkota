import { createServerFn } from "@tanstack/react-start";

import { contactSchema } from "./contact-schema";

/**
 * Server-side handler for the contact form. Runs on the server only, so this
 * is where an email provider, database write, or webhook would be wired in.
 */
export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("[contact] new message", { name: data.name, email: data.email });
    return { ok: true as const, receivedAt: new Date().toISOString() };
  });
