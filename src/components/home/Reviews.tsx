"use client";

import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { REVIEWS, RESTAURANT } from "@/utils/constants";
import FadeIn from "@/components/ui/FadeIn";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";

/* Compute rating breakdown from the REVIEWS array */
function getRatingCounts() {
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  REVIEWS.forEach((r) => { counts[r.rating] = (counts[r.rating] ?? 0) + 1; });
  return counts;
}

const AUTO_INTERVAL = 3500;

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const timerRef              = useRef<ReturnType<typeof setInterval> | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  // Auto-advance every 3.5 s, pause on hover
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, current]);

  const visible = [-1, 0, 1].map(
    (offset) => REVIEWS[(current + offset + REVIEWS.length) % REVIEWS.length]
  );

  const ratingCounts = getRatingCounts();

  return (
    <section className="section-padding bg-[#F5F5DC]/40">
      <div className="container-site">

        {/* ══ Header row ══ */}
        <FadeIn from="bottom" className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">

          {/* Left: title */}
          <div>
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">
              What our guests say
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A0E07] leading-tight mb-4">
              Our Guests Love Us
            </h2>
            {/* Google rating badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="text-left">
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

          {/* Right: rating breakdown bars */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 w-full lg:w-72 shrink-0">
            <p className="text-xs font-bold text-[#333]/40 uppercase tracking-widest mb-4">Rating breakdown</p>
            <div className="space-y-2.5">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const count = ratingCounts[star] ?? 0;
                const pct   = REVIEWS.length > 0 ? Math.round((count / REVIEWS.length) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="text-yellow-400 w-3 shrink-0 font-bold text-xs">{star}</span>
                    <span className="text-yellow-400 text-xs shrink-0">★</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-[#D2691E] rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[#333]/40 text-xs w-6 text-right shrink-0">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ══ Carousel ══ */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {visible.map((review, idx) => (
              <ReviewCard key={review.id} review={review} featured={idx === 1} />
            ))}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <ReviewCard review={REVIEWS[current]} featured />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev / next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border-2 border-[#6F4E37] text-[#6F4E37] flex items-center justify-center hover:bg-[#6F4E37] hover:text-white transition-all"
                aria-label="Previous review"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border-2 border-[#6F4E37] text-[#6F4E37] flex items-center justify-center hover:bg-[#6F4E37] hover:text-white transition-all"
                aria-label="Next review"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar indicator */}
            <div className="flex-1 mx-6 bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-[#D2691E] rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / REVIEWS.length) * 100}%` }}
              />
            </div>

            {/* Leave a review CTA */}
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-[#333]/70 text-xs font-bold rounded-xl hover:border-[#D2691E] hover:text-[#D2691E] transition-all shrink-0 shadow-sm"
            >
              Share your experience
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile leave-review button */}
          <div className="mt-5 sm:hidden text-center">
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 text-[#333]/70 text-sm font-bold rounded-xl hover:border-[#D2691E] hover:text-[#D2691E] transition-all shadow-sm"
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
