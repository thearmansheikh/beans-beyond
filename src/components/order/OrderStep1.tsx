"use client";

import { useState } from "react";
import { FiCheck, FiMapPin, FiClock, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import type { OrderType } from "@/types";

const ORDER_TYPES = [
  {
    type:    "dine-in"  as OrderType,
    label:   "Dine In",
    tagline: "Order at your table & enjoy",
    Icon:    FiShoppingBag,
    photo:   "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    badge:   "Most popular",
  },
  {
    type:    "takeaway" as OrderType,
    label:   "Takeaway",
    tagline: "Order ahead, pick up when ready",
    Icon:    FiClock,
    photo:   "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    badge:   "Quick & easy",
  },
  {
    type:    "delivery" as OrderType,
    label:   "Delivery",
    tagline: "Hot food to your door",
    Icon:    FiMapPin,
    photo:   "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    badge:   "E14 & nearby",
  },
];

export default function OrderStep1({ onNext }: { onNext: () => void }) {
  const { orderType, setOrderType } = useCart();
  const [selected, setSelected] = useState<OrderType | null>(orderType ?? null);

  const handleContinue = () => {
    if (!selected) return;
    setOrderType(selected);
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07] mb-2">
          How would you like to order?
        </h2>
        <p className="text-[#333]/55">Choose your preferred method below.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {ORDER_TYPES.map(({ type, label, tagline, Icon, photo, badge }) => {
          const isSelected = selected === type;
          return (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isSelected ? "ring-3 ring-[#D2691E] shadow-xl" : "shadow-md"
              }`}
            >
              <div
                className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${photo})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E07]/90 via-[#1A0E07]/30 to-transparent" />

              <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#D2691E] text-white text-[10px] font-black uppercase tracking-wide rounded-full">
                {badge}
              </span>

              {isSelected && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#D2691E] flex items-center justify-center shadow-lg">
                  <FiCheck className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-[#D2691E]" />
                  <h3 className="font-black text-white text-lg">{label}</h3>
                </div>
                <p className="text-white/65 text-xs">{tagline}</p>
                <div className={`mt-3 flex items-center gap-1 text-xs font-bold transition-all ${isSelected ? "text-white" : "text-[#D2691E] group-hover:gap-2"}`}>
                  {isSelected ? "✓ Selected" : <>Select <FiArrowRight className="w-3 h-3" /></>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue button — only shows after a selection */}
      <div className={`mt-8 flex justify-center transition-all duration-300 ${selected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#D2691E]/30 text-base"
        >
          Continue to Menu
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
