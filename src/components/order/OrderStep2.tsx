"use client";

import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import { useCart, useCartHydrated } from "@/context/CartContext";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";
import { formatPrice } from "@/utils/helpers";

export default function OrderStep2({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { itemCount, total } = useCart();
  const hydrated = useCartHydrated();

  const filtered = MENU_ITEMS.filter(
    (i) => (activeCategory === "all" || i.category === activeCategory) && i.available
  );

  const count = hydrated ? itemCount() : 0;
  const cartTotal = hydrated ? total() : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-[#1A0E07]">Choose your items</h2>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat.slug
                ? "bg-[#1A0E07] text-white shadow-md"
                : "bg-white text-[#333]/60 border border-[#EEE6DC] hover:border-[#D2691E]/40 hover:text-[#D2691E]"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {filtered.map((item) => (
          <MenuItemCard key={item._id} item={item} view="list" />
        ))}
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-4 z-10">
        <div className="flex gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl shadow-black/10 border border-[#EEE6DC]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 border-2 border-[#EEE6DC] text-[#333]/70 font-bold rounded-xl hover:border-[#D2691E]/40 hover:text-[#D2691E] transition-all shrink-0"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!hydrated || count === 0}
            className="flex-1 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#D2691E]/20 flex items-center justify-center gap-2"
          >
            {count > 0 ? (
              <>
                <FiShoppingCart className="w-4 h-4" />
                <span>
                  Checkout · {count} item{count !== 1 ? "s" : ""}
                </span>
                <span className="ml-auto pl-3 border-l border-white/30 font-black text-sm">
                  {formatPrice(cartTotal)}
                </span>
              </>
            ) : (
              "Add items to continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
