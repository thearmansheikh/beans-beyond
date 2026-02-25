"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronDown, FiClock, FiArrowRight } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";
import { isRestaurantOpen, getTodayHours } from "@/utils/helpers";

const DELIVERY_PARTNERS = ["Deliveroo", "Uber Eats", "JustEat"];

const HERO_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=85";

export default function Hero() {
  const [open,    setOpen]    = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(isRestaurantOpen());
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col lg:items-center overflow-hidden bg-[#0D0805]">

      {/* ── Ambient gradients ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A0E] via-[#130B05] to-[#0D0805]" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D2691E]/7 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6F4E37]/12 blur-[110px] pointer-events-none" />

      {/* ── Mobile hero image (above text) ── */}
      <div className="relative lg:hidden w-full h-[52vw] min-h-[220px] max-h-[360px] shrink-0">
        <Image
          src={HERO_IMAGE}
          alt="Fresh food at Beans & Beyond"
          fill
          sizes="(max-width: 1023px) 100vw, 0px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0D0805]" />
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 container-site w-full lg:min-h-screen flex items-center py-10 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center w-full">

          {/* Left: copy */}
          <div className="animate-fade-in-up">

            {/* Eyebrow — live status merged with branding */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-[#D2691E]/75 font-semibold uppercase tracking-[0.2em] text-xs">
                Halal Café · East London
              </p>
              {mounted && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-white/50 text-[11px] font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${open ? "bg-green-400 animate-pulse-dot" : "bg-red-400"}`} />
                  {open ? `Open · ${getTodayHours()}` : `Closed · ${getTodayHours()}`}
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-black text-white leading-[1.04] mb-6">
              Your favourite
              <br />
              <span className="text-gradient-warm">corner café</span>
              <br />
              in E14
            </h1>

            {/* Sub-headline */}
            <p className="text-white/50 text-lg leading-relaxed max-w-md mb-10">
              Fresh breakfasts, proper brunch, great coffee — all Halal, all made from
              scratch. Open seven days from 7am on Commercial Road.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#D2691E] text-white font-black text-base rounded-2xl hover:bg-[#B5571A] transition-all shadow-2xl shadow-[#D2691E]/35 hover:shadow-[#D2691E]/55 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Order Now
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-dark text-white/75 font-semibold text-base rounded-2xl hover:bg-white/12 transition-all active:scale-[0.98]"
              >
                Browse Menu
              </Link>
            </div>

            {/* Delivery partners */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/20 text-[10px] uppercase tracking-[0.16em] font-medium shrink-0">
                Also on
              </span>
              <div className="flex gap-2">
                {DELIVERY_PARTNERS.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-semibold"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-8 pt-7 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/12 flex items-center justify-center shrink-0">
                  <span className="text-yellow-400 text-base leading-none">★</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">{RESTAURANT.rating} / 5</p>
                  <p className="text-white/35 text-[11px] mt-1">{RESTAURANT.reviewCount} reviews</p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D2691E]/12 flex items-center justify-center shrink-0">
                  <FiClock className="w-4 h-4 text-[#D2691E]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">From 7am</p>
                  <p className="text-white/35 text-[11px] mt-1">7 days a week</p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/12 flex items-center justify-center shrink-0">
                  <span className="text-green-400 text-sm leading-none font-black">✓</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">100% Halal</p>
                  <p className="text-white/35 text-[11px] mt-1">Certified kitchen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: desktop photo + floating badges */}
          <div className="hidden lg:flex items-center justify-center relative h-[640px]">

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[430px] h-[560px] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.65)] rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                <Image
                  src={HERO_IMAGE}
                  alt="Delicious fresh food at Beans & Beyond"
                  fill
                  sizes="430px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-2xl leading-tight">Made fresh daily</p>
                  <p className="text-white/60 text-sm mt-1">Breakfast · Brunch · Lunch</p>
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-2 animate-float delay-100 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30 flex items-center gap-3 -rotate-2 hover:rotate-0 transition-transform duration-300">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="font-black text-[#1A0E07] text-sm leading-none">100% Halal</p>
                <p className="text-[#333]/45 text-[11px] mt-0.5">Certified kitchen</p>
              </div>
            </div>

            <div className="absolute bottom-28 -left-4 animate-float delay-300 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30 flex items-center gap-3 rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-black text-[#1A0E07] text-sm leading-none">Open from 7am</p>
                <p className="text-[#333]/45 text-[11px] mt-0.5">Mon – Sun</p>
              </div>
            </div>

            <div className="absolute bottom-48 right-0 animate-float delay-200 bg-[#D2691E] rounded-2xl px-4 py-3 shadow-2xl shadow-[#D2691E]/40 flex items-center gap-3 rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="text-white font-black text-2xl leading-none">{RESTAURANT.rating}</span>
              <div>
                <div className="text-yellow-300 text-xs">
                  {"★".repeat(Math.floor(RESTAURANT.rating))}
                  {RESTAURANT.rating % 1 >= 0.5 ? "½" : ""}
                  {"☆".repeat(5 - Math.ceil(RESTAURANT.rating))}
                </div>
                <p className="text-white/75 text-[10px] mt-0.5">{RESTAURANT.reviewCount} reviews</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-white/25 hover:text-white/55 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <FiChevronDown className="w-5 h-5 animate-bounce" />
      </a>

    </section>
  );
}
