import { NextRequest, NextResponse } from "next/server";
import { DELIVERY_FEE } from "@/utils/constants";

type PromoResult = { amount: number; label: string };
const PROMOS: Record<string, (sub: number) => PromoResult> = {
  FREEBEAN:  ()    => ({ amount: DELIVERY_FEE, label: "Free delivery" }),
  WELCOME10: (sub) => ({ amount: parseFloat((sub * 0.10).toFixed(2)), label: "10% off subtotal" }),
  BB20:      (sub) => ({ amount: parseFloat((sub * 0.20).toFixed(2)), label: "20% off subtotal" }),
};

export async function POST(req: NextRequest) {
  const { code, subtotal, orderType } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const upper = code.trim().toUpperCase();
  const fn = PROMOS[upper];
  if (!fn) {
    return NextResponse.json({ valid: false });
  }

  // FREEBEAN only applies to delivery orders
  if (upper === "FREEBEAN" && orderType !== "delivery") {
    return NextResponse.json({ valid: false, error: "FREEBEAN is only valid for delivery orders." });
  }

  const sub = typeof subtotal === "number" && subtotal > 0 ? subtotal : 0;
  const { amount, label } = fn(sub);

  return NextResponse.json({ valid: true, code: upper, amount, label });
}
