import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/emails/resend";
import { orderConfirmationHtml, orderConfirmationSubject } from "@/lib/emails/orderConfirmation";
import { adminAlertHtml, adminAlertSubject } from "@/lib/emails/adminAlert";
import type Stripe from "stripe";

// Required: disable body parsing so Stripe can verify the raw signature
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const sig    = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing stripe signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("[webhook/stripe] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {

    case "payment_intent.succeeded": {
      const intent  = event.data.object as Stripe.PaymentIntent;
      const orderId = intent.metadata?.order_id;
      if (!orderId) break;

      // 1. Update order status
      await supabase.from("orders").update({ status: "confirmed" }).eq("id", orderId);

      // 2. Fetch full order + items for confirmation email
      const { data: order } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", orderId)
        .single();

      if (order && order.customer_email) {
        type OrderItem = { name: string; quantity: number; price: number };
        const items = (order.order_items as OrderItem[] ?? []).map((i) => ({
          name:     i.name,
          quantity: i.quantity,
          price:    i.price,
        }));

        const emailData = {
          orderId,
          orderNumber:   orderId.slice(0, 8).toUpperCase(),
          customerName:  order.customer_name,
          orderType:     order.order_type,
          items,
          subtotal:      order.subtotal,
          deliveryFee:   order.delivery_fee ?? 0,
          serviceCharge: order.service_charge ?? 0,
          total:         order.total,
          notes:         order.notes ?? undefined,
          deliveryAddress: order.delivery_address ?? undefined,
          tableNumber:   order.table_number ?? undefined,
        };

        // Customer confirmation
        await sendEmail({
          to:      order.customer_email,
          subject: orderConfirmationSubject(emailData),
          html:    orderConfirmationHtml(emailData),
        });

        // Admin alert
        const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin`;
        await sendEmail({
          to:      process.env.ADMIN_EMAIL ?? "admin@bbcafe.co.uk",
          subject: adminAlertSubject("order", `${order.order_type} · £${order.total}`),
          html:    adminAlertHtml("order", [
            { label: "Customer",   value: order.customer_name },
            { label: "Email",      value: order.customer_email },
            { label: "Phone",      value: order.customer_phone ?? "—" },
            { label: "Type",       value: order.order_type },
            { label: "Total",      value: `£${order.total}` },
            { label: "Items",      value: items.map((i) => `${i.name} ×${i.quantity}`).join(", ") },
            ...(order.notes ? [{ label: "Notes", value: order.notes }] : []),
          ], adminUrl),
        });
      }

      console.log("[webhook/stripe] order confirmed:", orderId);
      break;
    }

    case "payment_intent.payment_failed": {
      const intent  = event.data.object as Stripe.PaymentIntent;
      const orderId = intent.metadata?.order_id;
      if (!orderId) break;

      await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
      console.log("[webhook/stripe] order cancelled — payment failed:", orderId);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
