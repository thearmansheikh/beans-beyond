export interface BookingEmailData {
  bookingId:  string;
  name:       string;
  email:      string;
  date:       string;
  time:       string;
  partySize:  number;
  notes?:     string;
}

export function bookingConfirmationHtml(d: BookingEmailData): string {
  const notesRow = d.notes
    ? `<tr><td style="padding:6px 0;font-size:14px;color:#666;">Requests</td><td style="padding:6px 0;font-size:14px;color:#1A0E07;font-weight:600;">${d.notes}</td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F4EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6F4E37,#4A3425);padding:32px 32px 24px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 16px;margin-bottom:12px;">
        <span style="color:#fff;font-size:18px;font-weight:900;letter-spacing:1px;">BEANS &amp; BEYOND</span>
      </div>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:900;">Booking Requested! 🗓</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">We&rsquo;ll confirm within the hour.</p>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#333;">
        Hi <strong>${d.name.split(" ")[0]}</strong>, we&rsquo;ve received your booking request. Here&rsquo;s a summary:
      </p>

      <div style="background:#F8F4EF;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;">Your reservation</p>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            <tr><td style="padding:6px 0;font-size:14px;color:#666;width:40%;">Date</td><td style="padding:6px 0;font-size:14px;color:#1A0E07;font-weight:700;">${d.date}</td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#666;">Time</td><td style="padding:6px 0;font-size:14px;color:#1A0E07;font-weight:700;">${d.time}</td></tr>
            <tr><td style="padding:6px 0;font-size:14px;color:#666;">Party size</td><td style="padding:6px 0;font-size:14px;color:#1A0E07;font-weight:700;">${d.partySize} ${d.partySize === 1 ? "guest" : "guests"}</td></tr>
            ${notesRow}
          </tbody>
        </table>
      </div>

      <div style="background:#FFF8F0;border:1px solid #F5DFC0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#8B5E3C;">
          <strong>📋 What happens next?</strong><br>
          We&rsquo;ll review your request and send a confirmation email shortly. If you need to make changes, just reply to this email.
        </p>
      </div>

      <p style="margin:0;font-size:13px;color:#999;text-align:center;">
        Need to cancel? Reply to this email at least 2 hours before your reservation.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#1A0E07;padding:20px 32px;text-align:center;">
      <p style="margin:0;color:rgba(255,255,255,0.4);font-size:12px;">
        © ${new Date().getFullYear()} Beans &amp; Beyond · All rights reserved
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function bookingConfirmationSubject(): string {
  return `Booking received — we'll confirm shortly · Beans & Beyond`;
}
