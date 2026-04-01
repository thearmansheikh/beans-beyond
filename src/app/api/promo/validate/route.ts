import { NextRequest, NextResponse } from "next/server";
import { DELIVERY_FEE } from "@/utils/constants";

type PromoResult = { amount: number; label: string };
const PROMOS: Record<string, (sub: number) => PromoResult> = {
  FREEBEAN:  ()    => ({ amount: DELIVERY_FEE, label: "Free delivery" }),
  WELCOME10: (sub) => ({ amount: parseFloat((sub * 0.10).toFixed(2)), label: "10% off subtotal" }),
  BB20:      (sub) => ({ amount: parseFloat((sub * 0.20).toFixed(2)), label: "20% off subtotal" }),
};

export async function POST(req: NextRequest) {
  const { code, subtotal } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const fn = PROMOS[code.trim().toUpperCase()];
  if (!fn) {
    return NextResponse.json({ valid: false });
  }

  const sub = typeof subtotal === "number" && subtotal > 0 ? subtotal : 0;
  const { amount, label } = fn(sub);

  return NextResponse.json({ valid: true, code: code.trim().toUpperCase(), amount, label });
}
