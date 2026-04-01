/** Generic admin alert email — used for new orders, bookings, messages, enquiries */

export type AdminAlertType = "order" | "booking" | "contact" | "catering";

const ICONS: Record<AdminAlertType, string> = {
  order:    "🛍️",
  booking:  "📅",
  contact:  "✉️",
  catering: "🍽️",
};

const LABELS: Record<AdminAlertType, string> = {
  order:    "New Order",
  booking:  "New Booking Request",
  contact:  "New Contact Message",
  catering: "New Catering Enquiry",
};

export function adminAlertHtml(
  type: AdminAlertType,
  rows: { label: string; value: string }[],
  adminUrl = "https://bbcafe.co.uk/admin"
): string {
  const rowsHtml = rows
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#666;width:36%;vertical-align:top;">${label}</td>
        <td style="padding:8px 0;font-size:14px;color:#1A0E07;font-weight:600;vertical-align:top;">${value}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F4EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

    <!-- Header -->
    <div style="background:#1A0E07;padding:24px 32px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:28px;">${ICONS[type]}</span>
      <div>
        <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.5);">Beans &amp; Beyond Admin</p>
        <h1 style="margin:4px 0 0;color:#fff;font-size:20px;font-weight:900;">${LABELS[type]}</h1>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
    </div>

    <!-- CTA -->
    <div style="padding:0 32px 28px;">
      <a href="${adminUrl}"
        style="display:block;text-align:center;padding:14px;background:linear-gradient(135deg,#D2691E,#E8944A);color:#fff;font-weight:900;font-size:14px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
        View in Admin Dashboard →
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#F8F4EF;padding:16px 32px;text-align:center;border-top:1px solid #EEE6DC;">
      <p style="margin:0;color:#aaa;font-size:12px;">This is an automated alert from your Beans &amp; Beyond system.</p>
    </div>
  </div>
</body>
</html>`;
}

export function adminAlertSubject(type: AdminAlertType, detail = ""): string {
  return `[B&B] ${LABELS[type]}${detail ? ` — ${detail}` : ""}`;
}
