"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingCart, FiZap } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import FadeIn from "@/components/ui/FadeIn";
import toast from "react-hot-toast";
import type { MenuItem } from "@/types";
import { MENU_ITEMS } from "@/utils/constants";

/* ── Derive today's specials from day of week ── */
const DAY_SEEDS: number[][] = [
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 9], [1, 5, 7], [2, 3, 8], [0, 5, 9],
];

function getTodaySpecials(): MenuItem[] {
  const day     = new Date().getDay();
  const indices = DAY_SEEDS[day] ?? [0, 1, 2];
  const pool    = MENU_ITEMS.filter((i) => i.available);
  return indices.map((i) => pool[i % pool.length]).filter(Boolean);
}

const TODAY_SPECIALS = getTodaySpecials();
const DAY_NAMES      = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const TODAY_NAME     = DAY_NAMES[new Date().getDay()];
const DISCOUNTS      = [20, 15, 10];

/* ── Countdown logic ── */
interface Countdown { h: number; m: number; s: number }

function getCountdown(): Countdown {
  const now  = new Date();
  const end  = new Date(now);
  end.setHours(21, 0, 0, 0);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  };
}

function useCountdown() {
  const [cd, setCd] = useState<Countdown>(getCountdown);
  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown()), 1_000);
    return () => clearInterval(id);
  }, []);
  return cd;
}

/* ── Digit box ── */
function DigitBox({ value, unit }: { value: number; unit: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5">
        {str.split("").map((d, i) => (
          <motion.div
            key={`${unit}-${i}-${d}`}
            className="w-8 h-10 sm:w-10 sm:h-12 bg-white/12 border border-white/18 rounded-lg flex items-center justify-center"
            initial={{ rotateX: -50, opacity: 0 }}
            animate={{ rotateX: 0,   opacity: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ perspective: 200 }}
          >
            <span className="font-black text-white text-lg sm:text-xl tabular-nums leading-none">
              {d}
            </span>
          </motion.div>
        ))}
      </div>
      <span className="text-white/35 text-[10px] uppercase tracking-widest mt-1.5 font-semibold">
        {unit}
      </span>
    </div>
  );
}

/* ── Special card ── */
function SpecialCard({ item, discount, index }: { item: MenuItem; discount: number; index: number }) {
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
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-900 to-amber-700">
        {isExternal && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Discount badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#D2691E] text-white text-[11px] font-black px-2.5 py-1.5 rounded-full shadow-lg">
          <FiZap className="w-3 h-3" />
          {discount}% OFF today
        </div>

        {/* Was price */}
        <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-sm text-white/65 text-xs font-semibold px-2 py-1 rounded-lg line-through">
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
          <div className="flex flex-col">
            <span className="text-[#D2691E] font-black text-xl leading-none">
              {formatPrice(salePrice)}
            </span>
            <span className="text-[#333]/35 text-[11px] mt-0.5">Today only</span>
          </div>
          <button
            onClick={handleAdd}
            className="btn-shine flex items-center gap-1.5 px-3.5 py-2 bg-[#D2691E] text-white text-xs font-bold rounded-xl hover:bg-[#B5571A] transition-all active:scale-[0.96]"
            aria-label={`Add ${item.name} to cart`}
          >
            <FiShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DailySpecials() {
  const { h, m, s } = useCountdown();

  if (TODAY_SPECIALS.length === 0) return null;

  return (
    <section className="section-padding bg-[#1A0E07] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#D2691E]/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#6F4E37]/14 blur-[90px]" />
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-50" />

      <div className="container-site relative">

        {/* ── Header ── */}
        <FadeIn
          from="bottom"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D2691E]/15 border border-[#D2691E]/25 text-[#E8944A] text-xs font-black uppercase tracking-widest mb-4">
              <FiZap className="w-3 h-3" />
              Limited Time
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {TODAY_NAME}&rsquo;s Specials
            </h2>
            <p className="text-white/40 text-sm mt-2 max-w-sm">
              Fresh discounts, every day. Available today only while stocks last.
            </p>
          </div>

          {/* Countdown */}
          <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
            <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] font-semibold">
              Offer expires in
            </p>
            <div className="flex items-center gap-2">
              <DigitBox value={h} unit="hrs" />
              <span className="text-white/30 font-black text-xl mb-5">:</span>
              <DigitBox value={m} unit="min" />
              <span className="text-white/30 font-black text-xl mb-5">:</span>
              <DigitBox value={s} unit="sec" />
            </div>
          </div>
        </FadeIn>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TODAY_SPECIALS.map((item, i) => (
            <SpecialCard key={item._id} item={item} discount={DISCOUNTS[i] ?? 10} index={i} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/15 text-white/65 font-bold rounded-2xl hover:border-white/40 hover:text-white transition-all text-sm group"
          >
            Browse Full Menu
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
