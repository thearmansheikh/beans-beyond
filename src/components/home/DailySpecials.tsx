"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiArrowRight, FiClock, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import FadeIn from "@/components/ui/FadeIn";
import toast from "react-hot-toast";
import type { MenuItem } from "@/types";
import { MENU_ITEMS } from "@/utils/constants";

/* ── Derive today's specials deterministically from the day of week ── */
const DAY_SEEDS: number[][] = [
  [0, 3, 6],  // Sunday
  [1, 4, 7],  // Monday
  [2, 5, 8],  // Tuesday
  [0, 4, 9],  // Wednesday
  [1, 5, 7],  // Thursday
  [2, 3, 8],  // Friday
  [0, 5, 9],  // Saturday
];

function getTodaySpecials(): MenuItem[] {
  const day     = new Date().getDay();
  const indices = DAY_SEEDS[day] ?? [0, 1, 2];
  const pool    = MENU_ITEMS.filter((i) => i.available);
  return indices.map((i) => pool[i % pool.length]).filter(Boolean);
}

const TODAY_SPECIALS = getTodaySpecials();
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TODAY_NAME = DAY_NAMES[new Date().getDay()];

/* ── Countdown to end of day (ticks every minute) ── */
function getCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(21, 0, 0, 0);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

function useMidnightCountdown() {
  const [countdown, setCountdown] = useState(getCountdown);
  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 60_000);
    return () => clearInterval(id);
  }, []);
  return countdown;
}

/* ── Special card ── */
function SpecialCard({ item, discount }: { item: MenuItem; discount: number }) {
  const { addItem } = useCart();
  const isExternal  = item.imageUrl.startsWith("http");
  const salePrice   = item.price * (1 - discount / 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      menuItemId:     item._id,
      name:           item.name,
      price:          salePrice,
      quantity:       1,
      imageUrl:       item.imageUrl,
      customizations: {},
    });
    toast.success(`${item.name} added to cart`, {
      style:     { background: "#6F4E37", color: "#fff" },
      iconTheme: { primary: "#D2691E", secondary: "#fff" },
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-900 to-amber-700">
        {isExternal && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-[#D2691E] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
          {discount}% OFF today
        </div>

        {/* Was price */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white/70 text-xs font-semibold px-2 py-1 rounded-lg line-through">
          was {formatPrice(item.price)}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#333] mb-1 group-hover:text-[#6F4E37] transition-colors line-clamp-1">
          {item.name}
        </h3>
        <p className="text-[#333]/50 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
          <div>
            <span className="text-[#D2691E] font-black text-xl">{formatPrice(salePrice)}</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#D2691E] text-white text-xs font-bold rounded-xl hover:bg-[#B5571A] transition-all active:scale-[0.96]"
            aria-label={`Add ${item.name} to cart`}
          >
            <FiShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

const DISCOUNTS = [20, 15, 10];

export default function DailySpecials() {
  const countdown = useMidnightCountdown();

  if (TODAY_SPECIALS.length === 0) return null;

  return (
    <section className="section-padding bg-[#1A0E07] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#D2691E]/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#6F4E37]/15 blur-[80px]" />

      <div className="container-site relative">

        {/* Header */}
        <FadeIn from="bottom" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">
              Limited time
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {TODAY_NAME}&rsquo;s Specials
            </h2>
            <p className="text-white/45 text-sm mt-2 max-w-sm">
              Fresh discounts, every day. Available today only while stocks last.
            </p>
          </div>

          {/* Countdown pill */}
          <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white/8 border border-white/12 rounded-2xl text-white">
            <FiClock className="w-4 h-4 text-[#D2691E] shrink-0" />
            <div>
              <p className="text-[10px] text-white/45 uppercase tracking-widest leading-none mb-0.5">Expires in</p>
              <p className="font-black text-sm leading-none">{countdown}</p>
            </div>
          </div>
        </FadeIn>

        {/* Cards */}
        <FadeIn from="bottom" delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TODAY_SPECIALS.map((item, i) => (
              <SpecialCard key={item._id} item={item} discount={DISCOUNTS[i] ?? 10} />
            ))}
          </div>
        </FadeIn>

        {/* Footer CTA */}
        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white/75 font-bold rounded-2xl hover:border-white/50 hover:text-white transition-all text-sm group"
          >
            Browse Full Menu
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
