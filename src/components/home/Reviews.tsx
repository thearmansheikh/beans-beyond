"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { REVIEWS, RESTAURANT } from "@/utils/constants";
import FadeIn from "@/components/ui/FadeIn";
import StarRating from "./StarRating";
import type { Review } from "@/types";

/* Rating breakdown from REVIEWS array */
function getRatingCounts() {
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  REVIEWS.forEach((r) => { counts[r.rating] = (counts[r.rating] ?? 0) + 1; });
  return counts;
}

const AUTO_INTERVAL = 4000;

/* ── Single review card ── */
function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border flex flex-col h-full transition-all duration-300 ${
        featured
          ? "shadow-xl border-[#D2691E]/15 ring-1 ring-[#D2691E]/10"
          : "shadow-sm border-gray-100 opacity-65 scale-[0.97]"
      }`}
    >
      {/* Big quote mark */}
      <span className="text-4xl text-[#D2691E]/18 font-black leading-none mb-2 select-none">
        &ldquo;
      </span>

      <StarRating rating={review.rating} />

      <p className="text-[#333]/70 text-sm leading-relaxed mt-3 mb-5 flex-1 line-clamp-5">
        {review.text}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D2691E] to-[#6F4E37] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {review.author[0]}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#333] text-sm leading-tight truncate">{review.author}</p>
            <p className="text-[#333]/38 text-xs mt-0.5">{review.date}</p>
          </div>
        </div>

        {/* Google badge */}
        <div className="flex items-center gap-1.5 shrink-0 opacity-60">
          <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-[10px] text-[#333]/35 font-semibold">Google</span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [dir,     setDir]     = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = () => { setDir(1);  setCurrent((c) => (c + 1) % REVIEWS.length); };
  const goPrev = () => { setDir(-1); setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length); };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => { setDir(1); setCurrent((c) => (c + 1) % REVIEWS.length); }, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, current]);

  const visible = [-1, 0, 1].map(
    (offset) => REVIEWS[(current + offset + REVIEWS.length) % REVIEWS.length]
  );
  const ratingCounts = getRatingCounts();

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -50 : 50, transition: { duration: 0.25 } }),
  };

  return (
    <section className="section-padding bg-[#F5F5DC]/40">
      <div className="container-site">

        {/* ── Header row ── */}
        <FadeIn
          from="bottom"
          className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12"
        >
          {/* Left: title + Google badge */}
          <div>
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">
              What our guests say
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A0E07] leading-tight mb-5">
              Our Guests Love Us
            </h2>
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(RESTAURANT.rating)} />
                  <span className="font-black text-[#333] text-sm">{RESTAURANT.rating}</span>
                </div>
                <p className="text-xs text-[#333]/50 mt-0.5">
                  {RESTAURANT.reviewCount} Google reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right: rating breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 w-full lg:w-72 shrink-0">
            <p className="text-xs font-bold text-[#333]/40 uppercase tracking-widest mb-4">
              Rating breakdown
            </p>
            <div className="space-y-2.5">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const count = ratingCounts[star] ?? 0;
                const pct   = REVIEWS.length > 0 ? Math.round((count / REVIEWS.length) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="text-yellow-400 w-3 shrink-0 font-bold text-xs">{star}</span>
                    <span className="text-yellow-400 text-xs shrink-0">★</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#D2691E] to-[#E8944A] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: (5 - star) * 0.08, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[#333]/40 text-xs w-6 text-right shrink-0">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ── Carousel ── */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: 3 cards side-by-side */}
          <div className="hidden md:grid grid-cols-3 gap-5 items-stretch min-h-[280px]">
            {visible.map((review, idx) => (
              <ReviewCard key={review.id} review={review} featured={idx === 1} />
            ))}
          </div>

          {/* Mobile: single card with AnimatePresence slide */}
          <div className="md:hidden overflow-hidden" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={current}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <ReviewCard review={REVIEWS[current]} featured />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-full border-2 border-[#6F4E37] text-[#6F4E37] flex items-center justify-center hover:bg-[#6F4E37] hover:text-white transition-all"
                aria-label="Previous review"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-full border-2 border-[#6F4E37] text-[#6F4E37] flex items-center justify-center hover:bg-[#6F4E37] hover:text-white transition-all"
                aria-label="Next review"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress dots — large tap targets on mobile */}
            <div className="flex items-center gap-1">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                  aria-label={`Go to review ${i + 1}`}
                  className="tap-target"
                >
                  <span className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-[#D2691E]"
                      : "w-2 h-2 bg-gray-300 hover:bg-[#D2691E]/50"
                  }`} />
                </button>
              ))}
            </div>

            {/* Leave a review CTA */}
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-[#333]/65 text-xs font-bold rounded-xl hover:border-[#D2691E] hover:text-[#D2691E] transition-all shrink-0 shadow-sm"
            >
              Share your experience
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile leave-review */}
          <div className="mt-5 sm:hidden text-center">
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 text-[#333]/65 text-sm font-bold rounded-xl hover:border-[#D2691E] hover:text-[#D2691E] transition-all shadow-sm"
            >
              Share your experience on Google
              <FiArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
