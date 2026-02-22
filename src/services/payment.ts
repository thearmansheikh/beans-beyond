// ─────────────────────────────────────────────
// Beans & Beyond — Payment Service
// Stripe integration layer
// ─────────────────────────────────────────────
// TODO: Install @stripe/stripe-js when ready
// npm install @stripe/stripe-js @stripe/react-stripe-js
// ─────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const paymentService = {
  /**
   * Create a Stripe PaymentIntent on the backend.
   * Returns the clientSecret to confirm payment on the frontend.
   */
  async createPaymentIntent(
    amount: number,
    currency = "gbp"
  ): Promise<{ clientSecret: string }> {
    const res = await fetch(`${BASE_URL}/payments/intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(amount * 100), currency }),
    });
    if (!res.ok) throw new Error("Failed to create payment intent");
    return res.json();
  },

  /**
   * Confirm payment on the backend after Stripe processes it.
   */
  async confirmPayment(
    paymentIntentId: string,
    orderId: string
  ): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/payments/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId, orderId }),
    });
    if (!res.ok) throw new Error("Payment confirmation failed");
    return res.json();
  },

  /**
   * Format a price in pence to a display string.
   */
  formatAmount(pence: number): string {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(pence);
  },
};
