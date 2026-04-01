"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";
import { isRestaurantOpen, getTodayHours } from "@/utils/helpers";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85";

const DELIVERY_PARTNERS = [
  { name: "Deliveroo", url: process.env.NEXT_PUBLIC_DELIVEROO_URL },
  { name: "Uber Eats", url: process.env.NEXT_PUBLIC_UBEREATS_URL  },
  { name: "Just Eat",  url: process.env.NEXT_PUBLIC_JUSTEAT_URL   },
];

/* ── Animation variants ── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const STATS = [
  {
    icon:    "★",
    iconCls: "text-yellow-400",
    bg:      "bg-yellow-500/10",
    value:   `${RESTAURANT.rating} / 5`,
    label:   `${RESTAURANT.reviewCount} reviews`,
  },
  {
    icon:    "🕐",
    iconCls: "",
    bg:      "bg-[#D2691E]/10",
    value:   "From 7am",
    label:   "7 days a week",
  },
  {
    icon:    "✓",
    iconCls: "text-green-400 font-black",
    bg:      "bg-green-500/10",
    value:   "100% Halal",
    label:   "Certified kitchen",
  },
];

export default function Hero() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(isRestaurantOpen());
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col lg:items-center overflow-hidden bg-[#0D0805]">

      {/* ── Layered background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A0E] via-[#130B05] to-[#0D0805]" />
      <div className="absolute inset-0 bg-dots-dark opacity-70" />

      {/* Animated ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-[#D2691E]/6 blur-[170px] pointer-events-none"
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#6F4E37]/10 blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />

      {/* ── Mobile hero image ── */}
      <div className="relative lg:hidden w-full h-[52vw] min-h-[220px] max-h-[360px] shrink-0">
        <Image
          src={HERO_IMAGE}
          alt="Fresh food at Beans & Beyond"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0D0805]" />
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 container-site w-full lg:min-h-screen flex items-center py-10 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center w-full">

          {/* ── Left: copy ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow + live status */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[#D2691E]/80 font-semibold uppercase tracking-[0.22em] text-xs">
                Halal Café · East London
              </span>
              {mounted && (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                    open
                      ? "bg-green-500/10 border-green-500/25 text-green-400"
                      : "bg-red-500/10 border-red-500/25 text-red-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      open ? "bg-green-400 animate-ring" : "bg-red-400"
                    }`}
                  />
                  {open ? `Open · ${getTodayHours()}` : `Closed · ${getTodayHours()}`}
                </span>
              )}
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-black text-white leading-[1.04] mb-6"
            >
              Your favourite
              <br />
              <span className="text-gradient-warm-animated">corner café</span>
              <br />
              in E14
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={fadeUp} className="text-white/50 text-lg leading-relaxed max-w-md mb-10">
              Fresh breakfasts, proper brunch, great coffee — all Halal, all made from
              scratch. Open seven days from 7am on Commercial Road.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/order"
                className="btn-shine inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black text-base rounded-2xl hover:opacity-92 transition-all shadow-2xl shadow-[#D2691E]/35 hover:shadow-[#D2691E]/55 hover:-translate-y-0.5 active:scale-[0.98]"
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
              <Link
                href="/book"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/12 text-white/55 font-semibold text-base rounded-2xl hover:border-white/28 hover:text-white/75 transition-all active:scale-[0.98]"
              >
                Book a Table
              </Link>
            </motion.div>

            {/* Delivery partners */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="text-white/22 text-[10px] uppercase tracking-[0.18em] font-medium shrink-0">
                Also on
              </span>
              <div className="flex gap-2 flex-wrap">
                {DELIVERY_PARTNERS.map(({ name, url }) =>
                  url ? (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-semibold hover:bg-white/10 hover:text-white/60 transition-all"
                    >
                      {name}
                    </a>
                  ) : (
                    <span
                      key={name}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-semibold"
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 sm:gap-7 pt-7 border-t border-white/10"
            >
              {STATS.map(({ icon, iconCls, bg, value, label }, i) => (
                <div key={value} className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}
                  >
                    <span className={`text-xs sm:text-sm leading-none ${iconCls}`}>{icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs sm:text-sm leading-none">{value}</p>
                    <p className="text-white/35 text-[10px] sm:text-[11px] mt-1">{label}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <span className="w-px h-6 bg-white/10 ml-1 hidden xs:block" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: image card + floating badges ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative h-[640px]"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main photo card */}
            <motion.div
              className="relative w-[430px] h-[560px] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
              initial={{ rotate: 3 }}
              animate={{ rotate: 2 }}
              whileHover={{ rotate: 0, scale: 1.015 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={HERO_IMAGE}
                alt="Delicious fresh food at Beans & Beyond"
                fill
                sizes="430px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-black text-2xl leading-tight">Made fresh daily</p>
                <p className="text-white/60 text-sm mt-1">Breakfast · Brunch · Lunch</p>
              </div>
            </motion.div>

            {/* Floating badge: Halal */}
            <motion.div
              className="absolute top-10 right-2 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30 flex items-center gap-3"
              initial={{ opacity: 0, x: 28, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              transition={{ delay: 0.75, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <span className="text-2xl">🌿</span>
              <div>
                <p className="font-black text-[#1A0E07] text-sm leading-none">100% Halal</p>
                <p className="text-[#333]/45 text-[11px] mt-0.5">Certified kitchen</p>
              </div>
            </motion.div>

            {/* Floating badge: Open from 7am */}
            <motion.div
              className="absolute bottom-32 -left-4 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30 flex items-center gap-3"
              initial={{ opacity: 0, x: -28, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ delay: 0.95, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-black text-[#1A0E07] text-sm leading-none">Open from 7am</p>
                <p className="text-[#333]/45 text-[11px] mt-0.5">Mon – Sun</p>
              </div>
            </motion.div>

            {/* Floating badge: Rating */}
            <motion.div
              className="absolute bottom-52 right-0 bg-[#D2691E] rounded-2xl px-4 py-3 shadow-2xl shadow-[#D2691E]/45 flex items-center gap-3"
              initial={{ opacity: 0, y: 24, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 1 }}
              transition={{ delay: 1.1, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <span className="text-white font-black text-2xl leading-none">
                {RESTAURANT.rating}
              </span>
              <div>
                <div className="text-yellow-300 text-xs">★★★★½</div>
                <p className="text-white/75 text-[10px] mt-0.5">
                  {RESTAURANT.reviewCount} reviews
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-white/25 hover:text-white/55 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <FiChevronDown className="w-5 h-5 animate-bounce" />
      </motion.a>

    </section>
  );
}
