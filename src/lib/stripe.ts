import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

if (!key) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY — add it to .env.local to enable Stripe payments."
  );
}

export const stripe = new Stripe(key, {
  apiVersion: "2026-03-25.dahlia",
});
