export interface OrderEmailData {
  orderId:      string;
  orderNumber:  string;
  customerName: string;
  orderType:    string;
  items:        { name: string; quantity: number; price: number }[];
  subtotal:     number;
  deliveryFee:  number;
  serviceCharge: number;
  total:        number;
  notes?:       string;
  deliveryAddress?: string;
  tableNumber?:  string;
}

function fmt(n: number) {
  return `£${n.toFixed(2)}`;
}

export function orderConfirmationHtml(d: OrderEmailData): string {
  const typeLabel: Record<string, string> = {
    "dine-in":  "Dine In",
    "takeaway": "Takeaway",
    "delivery": "Delivery",
  };

  const itemRows = d.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#1A0E07;border-bottom:1px solid #EEE6DC;">
          ${i.name} <span style="color:#999">×${i.quantity}</span>
        </td>
        <td style="padding:8px 0;font-size:14px;color:#1A0E07;text-align:right;border-bottom:1px solid #EEE6DC;">
          ${fmt(i.price * i.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const deliveryRow =
    d.deliveryFee > 0
      ? `<tr><td style="padding:6px 0;font-size:13px;color:#666;">Delivery</td><td style="padding:6px 0;font-size:13px;color:#666;text-align:right;">${fmt(d.deliveryFee)}</td></tr>`
      : "";

  const serviceRow =
    d.serviceCharge > 0
      ? `<tr><td style="padding:6px 0;font-size:13px;color:#666;">Service charge</td><td style="padding:6px 0;font-size:13px;color:#666;text-align:right;">${fmt(d.serviceCharge)}</td></tr>`
      : "";

  const locationInfo =
    d.orderType === "delivery"
      ? `<p style="margin:4px 0;font-size:14px;color:#555;"><strong>Deliver to:</strong> ${d.deliveryAddress}</p>`
      : d.orderType === "dine-in"
      ? `<p style="margin:4px 0;font-size:14px;color:#555;"><strong>Table:</strong> ${d.tableNumber}</p>`
      : `<p style="margin:4px 0;font-size:14px;color:#555;">Ready for collection at the counter.</p>`;

  const notesRow = d.notes
    ? `<p style="margin:12px 0 0;font-size:13px;color:#888;font-style:italic;">Notes: ${d.notes}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F4EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#D2691E,#E8944A);padding:32px 32px 24px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 16px;margin-bottom:12px;">
        <span style="color:#fff;font-size:18px;font-weight:900;letter-spacing:1px;">BEANS &amp; BEYOND</span>
      </div>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:900;">Order Confirmed! ✓</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">We&rsquo;re preparing your order right now.</p>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#333;">
        Hi <strong>${d.customerName.split(" ")[0]}</strong>, thanks for your order!
      </p>

      <!-- Order meta -->
      <div style="background:#F8F4EF;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;">Order details</p>
        <p style="margin:4px 0;font-size:14px;color:#555;"><strong>Type:</strong> ${typeLabel[d.orderType] ?? d.orderType}</p>
        ${locationInfo}
        ${notesRow}
      </div>

      <!-- Items -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr>
            <th style="text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;padding-bottom:8px;border-bottom:2px solid #EEE6DC;">Item</th>
            <th style="text-align:right;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;padding-bottom:8px;border-bottom:2px solid #EEE6DC;">Price</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <!-- Totals -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tbody>
          <tr><td style="padding:6px 0;font-size:13px;color:#666;">Subtotal</td><td style="padding:6px 0;font-size:13px;color:#666;text-align:right;">${fmt(d.subtotal)}</td></tr>
          ${deliveryRow}
          ${serviceRow}
          <tr>
            <td style="padding:10px 0 0;font-size:16px;font-weight:900;color:#1A0E07;border-top:2px solid #1A0E07;">Total paid</td>
            <td style="padding:10px 0 0;font-size:16px;font-weight:900;color:#D2691E;text-align:right;border-top:2px solid #1A0E07;">${fmt(d.total)}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin:0;font-size:13px;color:#999;text-align:center;">
        Questions? Reply to this email or call us — we&rsquo;re happy to help.
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

export function orderConfirmationSubject(d: OrderEmailData): string {
  return `Your order is confirmed — Beans & Beyond`;
}
