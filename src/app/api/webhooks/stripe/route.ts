import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-server";
import type Stripe from "stripe";

// Required: disable body parsing so Stripe can verify the raw signature
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const sig     = req.headers.get("stripe-signature");
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;

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

  // ── Handle events ─────────────────────────────────────────────────────
  switch (event.type) {

    case "payment_intent.succeeded": {
      const intent   = event.data.object as Stripe.PaymentIntent;
      const orderId  = intent.metadata?.order_id;

      if (orderId) {
        const { error } = await supabase
          .from("orders")
          .update({ status: "confirmed" })
          .eq("id", orderId);

        if (error) {
          console.error("[webhook/stripe] failed to confirm order:", orderId, error);
        } else {
          console.log("[webhook/stripe] order confirmed:", orderId);
        }
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const intent  = event.data.object as Stripe.PaymentIntent;
      const orderId = intent.metadata?.order_id;

      if (orderId) {
        await supabase
          .from("orders")
          .update({ status: "cancelled" })
          .eq("id", orderId);

        console.log("[webhook/stripe] order cancelled due to failed payment:", orderId);
      }
      break;
    }

    default:
      // Ignore unhandled event types
      break;
  }

  return NextResponse.json({ received: true });
}
