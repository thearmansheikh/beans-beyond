"use client";

import { useState } from "react";
import Image from "next/image";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiTag, FiX, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { useCart, useCartHydrated } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/utils/constants";

/* ── Valid promo codes ── */
type PromoResult = { amount: number; label: string };
const PROMOS: Record<string, (sub: number) => PromoResult> = {
  FREEBEAN:  ()    => ({ amount: DELIVERY_FEE, label: "Free delivery" }),
  WELCOME10: (sub) => ({ amount: parseFloat((sub * 0.10).toFixed(2)), label: "10% off subtotal" }),
  BB20:      (sub) => ({ amount: parseFloat((sub * 0.20).toFixed(2)), label: "20% off subtotal" }),
};

export default function Cart() {
  const hydrated = useCartHydrated();
  const {
    items, orderType, subtotal, serviceCharge, deliveryFee, total,
    updateQty, removeItem, applyPromo, promoCode, discount,
  } = useCart();

  const [promoInput, setPromoInput] = useState(promoCode ?? "");
  const [promoState, setPromoState] = useState<"idle" | "ok" | "err">(promoCode ? "ok" : "idle");
  const [promoLabel, setPromoLabel] = useState(() => {
    if (!promoCode) return "";
    const fn = PROMOS[promoCode];
    return fn ? fn(subtotal()).label : "";
  });

  if (!hydrated) return null;

  const sub = subtotal();
  const svc = serviceCharge();
  const del = deliveryFee();
  const tot = total();

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const fn   = PROMOS[code];
    if (!fn) {
      setPromoState("err");
      applyPromo("", 0);
      return;
    }
    const result = fn(sub);
    applyPromo(code, result.amount);
    setPromoState("ok");
    setPromoLabel(result.label);
  };

  const handleRemovePromo = () => {
    applyPromo("", 0);
    setPromoInput("");
    setPromoState("idle");
    setPromoLabel("");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FiShoppingCart className="w-12 h-12 text-[#6F4E37]/30 mb-4" />
        <h3 className="font-bold text-[#333] text-lg mb-2">Your cart is empty</h3>
        <p className="text-[#333]/50 text-sm mb-6">
          Add items from the menu to get started.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#B5571A] transition-all"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Items */}
      <ul className="divide-y divide-gray-50 mb-4">
        {items.map((item) => (
          <li key={item.menuItemId} className="py-3 flex gap-3">
            {/* Item thumbnail */}
            <div className="w-12 h-12 rounded-xl bg-[#F8F4EF] overflow-hidden shrink-0">
              {item.imageUrl?.startsWith("http") ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">☕</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#333] text-sm truncate">{item.name}</p>
              <p className="text-[#6F4E37] font-bold text-sm">{formatPrice(item.price)}</p>
              {/* Quantity controls */}
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  onClick={() => updateQty(item.menuItemId, item.quantity - 1)}
                  className="w-6 h-6 rounded-lg bg-[#F5F5DC] flex items-center justify-center hover:bg-[#EDE8CC] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-3 h-3 text-[#6F4E37]" />
                </button>
                <span className="text-sm font-bold text-[#333] w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQty(item.menuItemId, item.quantity + 1)}
                  className="w-6 h-6 rounded-lg bg-[#F5F5DC] flex items-center justify-center hover:bg-[#EDE8CC] transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-3 h-3 text-[#6F4E37]" />
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-[#333] text-sm">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                onClick={() => removeItem(item.menuItemId)}
                className="mt-1 text-red-400 hover:text-red-600 transition-colors"
                aria-label={`Remove ${item.name}`}
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delivery progress (delivery only) */}
      {orderType === "delivery" && sub < FREE_DELIVERY_THRESHOLD && (
        <div className="mb-4 p-3 bg-[#F8F4EF] rounded-xl text-sm border border-[#EEE6DC]">
          <p className="text-[#6F4E37] font-medium text-xs mb-1.5">
            Add {formatPrice(FREE_DELIVERY_THRESHOLD - sub)} more for free delivery!
          </p>
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D2691E] rounded-full transition-all"
              style={{ width: `${Math.min((sub / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Promo code */}
      <div className="py-3 border-t border-gray-100">
        {promoState === "ok" ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2">
              <FiCheck className="w-4 h-4 text-green-600 shrink-0" />
              <div>
                <p className="text-sm font-black text-green-700">{promoCode}</p>
                <p className="text-xs text-green-600">{promoLabel} — saving {formatPrice(discount)}</p>
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-green-500 hover:text-green-700 transition-colors"
              aria-label="Remove promo code"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#333]/30" />
              <input
                type="text"
                placeholder="Promo code"
                value={promoInput}
                onChange={(e) => { setPromoInput(e.target.value); setPromoState("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all"
              />
            </div>
            <button
              onClick={handleApplyPromo}
              className="px-4 py-2.5 bg-[#1A0E07] text-white text-sm font-bold rounded-xl hover:bg-[#2C1A0E] transition-colors shrink-0"
            >
              Apply
            </button>
          </div>
        )}
        {promoState === "err" && (
          <p className="mt-1.5 text-xs text-red-600 px-1">
            Invalid code. Try <span className="font-bold">FREEBEAN</span>, <span className="font-bold">WELCOME10</span> or <span className="font-bold">BB20</span>.
          </p>
        )}
      </div>

      {/* Totals */}
      <div className="space-y-2 py-4 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-[#333]/70">
          <span>Subtotal</span>
          <span>{formatPrice(sub)}</span>
        </div>
        {svc > 0 && (
          <div className="flex justify-between text-[#333]/70">
            <span>Service charge (10%)</span>
            <span>{formatPrice(svc)}</span>
          </div>
        )}
        {orderType === "delivery" && (
          <div className="flex justify-between text-[#333]/70">
            <span>Delivery fee</span>
            <span>{del === 0 ? <span className="text-green-600 font-semibold">Free</span> : formatPrice(del)}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Discount ({promoCode})</span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-black text-[#333] text-base pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-[#6F4E37]">{formatPrice(tot)}</span>
        </div>
      </div>
    </div>
  );
}
