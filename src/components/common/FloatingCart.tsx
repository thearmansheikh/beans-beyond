"use client";

import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart, useCartHydrated } from "@/context/CartContext";
import CartDrawer from "@/components/order/CartDrawer";

export default function FloatingCart() {
  const [open, setOpen] = useState(false);
  const hydrated = useCartHydrated();
  const { itemCount } = useCart();

  const count = hydrated ? itemCount() : 0;

  // Don't render the button until hydrated (avoids SSR mismatch)
  if (!hydrated) return null;

  return (
    <>
      {/* Floating button — bottom right, only shown when cart has items */}
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open cart (${count} items)`}
        className={`fixed bottom-6 right-6 z-30 flex items-center gap-2.5 pl-4 pr-5 py-3.5 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl shadow-xl shadow-[#D2691E]/35 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 ${
          count > 0 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative">
          <FiShoppingCart className="w-5 h-5" />
          {count > 0 && (
            <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-white text-[#D2691E] text-[10px] font-black flex items-center justify-center shadow-sm">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </div>
        <span className="text-sm">View Cart</span>
      </button>

      {/* Slide-out drawer */}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
