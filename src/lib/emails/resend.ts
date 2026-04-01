import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;

// Resend client — null when key is missing (emails silently skipped in dev)
export const resend = key ? new Resend(key) : null;

export const FROM_EMAIL  = process.env.EMAIL_FROM    ?? "Beans & Beyond <noreply@bbcafe.co.uk>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL   ?? "admin@bbcafe.co.uk";

/** Fire-and-forget email sender — logs errors but never throws */
export async function sendEmail(opts: {
  to:      string | string[];
  subject: string;
  html:    string;
}) {
  if (!resend) {
    console.log("[email] Resend not configured — skipping:", opts.subject);
    return;
  }
  try {
    await resend.emails.send({ from: FROM_EMAIL, ...opts });
  } catch (err) {
    console.error("[email] send failed:", err);
  }
}
