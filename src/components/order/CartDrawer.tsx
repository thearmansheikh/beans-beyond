"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiX, FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiArrowRight,
  FiTag, FiCheck, FiAlertCircle,
} from "react-icons/fi";
import { useCart, useCartHydrated } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, MENU_ITEMS } from "@/utils/constants";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

/* ── Valid promo codes ── */
type PromoResult = { amount: number; label: string };
const PROMOS: Record<string, (sub: number) => PromoResult> = {
  FREEBEAN:  ()    => ({ amount: DELIVERY_FEE, label: "Free delivery" }),
  WELCOME10: (sub) => ({ amount: parseFloat((sub * 0.10).toFixed(2)), label: "10% off subtotal" }),
  BB20:      (sub) => ({ amount: parseFloat((sub * 0.20).toFixed(2)), label: "20% off subtotal" }),
};

export default function CartDrawer({ open, onClose }: Props) {
  const hydrated = useCartHydrated();
  const {
    items, orderType, subtotal, serviceCharge, deliveryFee, total,
    updateQty, removeItem, addItem, applyPromo, promoCode, discount,
  } = useCart();

  const [promoInput, setPromoInput]   = useState("");
  const [promoState, setPromoState]   = useState<"idle" | "ok" | "err">("idle");
  const [promoLabel, setPromoLabel]   = useState("");

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Sync promo input with persisted state on open
  useEffect(() => {
    if (open && promoCode) {
      setPromoInput(promoCode);
      setPromoState("ok");
      const fn = PROMOS[promoCode];
      if (fn) setPromoLabel(fn(subtotal()).label);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const fn   = PROMOS[code];
    if (!fn) {
      setPromoState("err");
      applyPromo("", 0);
      return;
    }
    const result = fn(subtotal());
    applyPromo(code, result.amount);
    setPromoLabel(result.label);
    setPromoState("ok");
  };

  const handleRemovePromo = () => {
    applyPromo("", 0);
    setPromoInput("");
    setPromoState("idle");
    setPromoLabel("");
  };

  if (!hydrated) return null;

  const sub = subtotal();
  const svc = serviceCharge();
  const del = deliveryFee();
  const tot = total();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EEE6DC] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center shadow-md">
              <FiShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-black text-[#1A0E07] text-lg leading-tight">Your Cart</h2>
              <p className="text-xs text-[#333]/45">
                {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F8F4EF] flex items-center justify-center text-[#333]/60 hover:bg-[#EEE6DC] hover:text-[#1A0E07] transition-all"
            aria-label="Close cart"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-[#F8F4EF] flex items-center justify-center mb-5">
                <FiShoppingCart className="w-9 h-9 text-[#D2691E]/40" />
              </div>
              <h3 className="font-black text-[#1A0E07] text-xl mb-2">Your cart is empty</h3>
              <p className="text-[#333]/50 text-sm mb-6">
                Add something delicious to get started!
              </p>
              <Link
                href="/menu"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/25 text-sm"
              >
                Browse Menu <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Free delivery progress bar */}
              {orderType === "delivery" && sub < FREE_DELIVERY_THRESHOLD && (
                <div className="mb-4 p-4 bg-[#FFF8F2] border border-[#EEE6DC] rounded-xl">
                  <p className="text-xs font-bold text-[#D2691E] mb-2">
                    Add {formatPrice(FREE_DELIVERY_THRESHOLD - sub)} more for free delivery!
                  </p>
                  <div className="h-2 bg-[#EEE6DC] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D2691E] to-[#E8944A] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((sub / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart items */}
              <ul className="space-y-1">
                {items.map((item) => {
                  const isExternal = item.imageUrl?.startsWith("http");
                  return (
                    <li
                      key={item.menuItemId}
                      className="flex gap-3 py-4 border-b border-[#F8F4EF] last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-[#F8F4EF] to-[#EEE6DC] flex items-center justify-center shrink-0">
                        {isExternal ? (
                          <Image
                            src={item.imageUrl!}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-2xl">☕</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1A0E07] text-sm truncate">{item.name}</p>
                        <p className="text-[#D2691E] font-bold text-sm">{formatPrice(item.price)}</p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.menuItemId, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-[#F8F4EF] flex items-center justify-center hover:bg-[#EEE6DC] transition-colors"
                            aria-label="Decrease"
                          >
                            <FiMinus className="w-3 h-3 text-[#6F4E37]" />
                          </button>
                          <span className="text-sm font-black text-[#1A0E07] w-5 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.menuItemId, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-[#F8F4EF] flex items-center justify-center hover:bg-[#EEE6DC] transition-colors"
                            aria-label="Increase"
                          >
                            <FiPlus className="w-3 h-3 text-[#6F4E37]" />
                          </button>
                        </div>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <p className="font-black text-[#1A0E07] text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.menuItemId)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#333]/30 hover:bg-red-50 hover:text-red-500 transition-all"
                          aria-label={`Remove ${item.name}`}
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* ── Upsell: You might also like ── */}
              {(() => {
                const inCartIds = new Set(items.map((i) => i.menuItemId));
                const suggestions = MENU_ITEMS
                  .filter((m) => m.available && m.popular && !inCartIds.has(m._id))
                  .slice(0, 3);
                if (suggestions.length === 0) return null;
                return (
                  <div className="mt-5 pt-4 border-t border-[#F8F4EF]">
                    <p className="text-xs font-bold text-[#333]/50 uppercase tracking-widest mb-3">
                      You might also like
                    </p>
                    <ul className="space-y-2">
                      {suggestions.map((s) => (
                        <li key={s._id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8F4EF] hover:bg-[#F2EDE5] transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-800 to-amber-600 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                            {s.imageUrl.startsWith("http") ? (
                              <Image src={s.imageUrl} alt={s.name} width={40} height={40} className="object-cover w-full h-full" />
                            ) : "☕"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#1A0E07] truncate">{s.name}</p>
                            <p className="text-xs text-[#D2691E] font-bold">{formatPrice(s.price)}</p>
                          </div>
                          <button
                            onClick={() => {
                              addItem({ menuItemId: s._id, name: s.name, price: s.price, quantity: 1, imageUrl: s.imageUrl, customizations: {} });
                              toast.success(`${s.name} added!`, { style: { background: "#6F4E37", color: "#fff" }, iconTheme: { primary: "#D2691E", secondary: "#fff" } });
                            }}
                            className="w-7 h-7 rounded-lg bg-[#D2691E] text-white flex items-center justify-center hover:bg-[#B5571A] transition-colors shrink-0 text-lg font-bold leading-none"
                            aria-label={`Add ${s.name} to cart`}
                          >
                            +
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {/* ── Promo code ── */}
              <div className="mt-5 pt-4 border-t border-[#F8F4EF]">
                <p className="text-xs font-bold text-[#333]/50 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <FiTag className="w-3 h-3" />
                  Promo Code
                </p>

                {promoState === "ok" ? (
                  /* Applied state */
                  <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-green-600 shrink-0" />
                      <div>
                        <p className="text-sm font-black text-green-700">{promoCode}</p>
                        <p className="text-xs text-green-600">{promoLabel} — saving {formatPrice(discount)}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-green-600/60 hover:text-green-800 transition-colors"
                      aria-label="Remove promo code"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Input state */
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code (e.g. FREEBEAN)"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoState("idle"); }}
                        onKeyDown={(e) => { if (e.key === "Enter") handleApplyPromo(); }}
                        className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] uppercase placeholder:normal-case placeholder:text-[#333]/35 tracking-wide font-semibold"
                        maxLength={20}
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 bg-[#1A0E07] text-white text-sm font-bold rounded-xl hover:bg-[#2C1A0E] transition-all active:scale-[0.97] shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                    {promoState === "err" && (
                      <p className="flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                        <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
                        Invalid promo code. Try FREEBEAN, WELCOME10 or BB20.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Footer (totals + CTA) ── */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-[#EEE6DC] px-6 pt-4 pb-6 bg-white">
            {/* Totals */}
            <div className="space-y-2 mb-5 text-sm">
              <div className="flex justify-between text-[#333]/60">
                <span>Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              {svc > 0 && (
                <div className="flex justify-between text-[#333]/60">
                  <span>Service charge (10%)</span>
                  <span>{formatPrice(svc)}</span>
                </div>
              )}
              {orderType === "delivery" && (
                <div className="flex justify-between text-[#333]/60">
                  <span>Delivery</span>
                  <span>{del === 0 ? <span className="text-green-600 font-bold">Free</span> : formatPrice(del)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount ({promoCode})</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-[#1A0E07] text-base pt-2 border-t border-[#EEE6DC]">
                <span>Total</span>
                <span className="text-[#D2691E]">{formatPrice(tot)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/order"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/25 text-base"
            >
              Go to Checkout
              <FiArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 text-[#333]/50 text-sm font-semibold hover:text-[#333] transition-colors"
            >
              Continue browsing
            </button>
          </div>
        )}
      </div>
    </>
  );
}
