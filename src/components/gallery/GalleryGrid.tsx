"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight, FiInstagram } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

const CATEGORIES = ["All", "Food", "Coffee", "Interior", "Events"] as const;
type Category = typeof CATEGORIES[number];

const GALLERY = [
  { id: 1,  category: "Food"     as Category, src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=900&q=80", label: "Full English Breakfast", span: "sm:col-span-2 sm:row-span-2" },
  { id: 2,  category: "Coffee"   as Category, src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", label: "Flat White" },
  { id: 3,  category: "Interior" as Category, src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80", label: "Cosy Corner" },
  { id: 4,  category: "Food"     as Category, src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", label: "Avocado Toast" },
  { id: 5,  category: "Coffee"   as Category, src: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=900&q=80", label: "Matcha Latte Art", span: "sm:col-span-2" },
  { id: 6,  category: "Interior" as Category, src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80", label: "Morning Light" },
  { id: 7,  category: "Food"     as Category, src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80", label: "Fresh Pastries" },
  { id: 8,  category: "Food"     as Category, src: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=900&q=80", label: "Eggs Benedict", span: "sm:col-span-2 sm:row-span-2" },
  { id: 9,  category: "Coffee"   as Category, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", label: "Specialty Beans" },
  { id: 10, category: "Food"     as Category, src: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80", label: "Chocolate Brownie" },
  { id: 11, category: "Interior" as Category, src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80", label: "Local Art Wall" },
  { id: 12, category: "Events"   as Category, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", label: "Community Brunch", span: "sm:col-span-2" },
  { id: 13, category: "Coffee"   as Category, src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80", label: "Cappuccino" },
  { id: 14, category: "Food"     as Category, src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", label: "Pancake Stack" },
  { id: 15, category: "Events"   as Category, src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", label: "Live Music Evening" },
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);

  const filtered = GALLERY.filter(
    (g) => activeCategory === "All" || g.category === activeCategory
  );

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prev, next]);

  const activeLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <section className="section-padding bg-[#F8F4EF]">
        <div className="container-site">

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#1A0E07] text-white shadow-md"
                    : "bg-white text-[#333]/60 border border-[#EEE6DC] hover:border-[#D2691E]/40 hover:text-[#D2691E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] gap-3 sm:gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className={`${item.span ?? ""} relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E07]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block px-2.5 py-0.5 bg-[#D2691E] text-white text-[10px] font-black uppercase tracking-wide rounded-full mb-1">
                    {item.category}
                  </span>
                  <p className="text-white font-bold text-sm leading-tight">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="mt-14 bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C] rounded-2xl p-8 sm:p-10 text-center text-white">
            <FiInstagram className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl sm:text-3xl font-black mb-2">Follow our journey</h3>
            <p className="text-white/75 max-w-md mx-auto mb-6 text-sm">
              Daily specials, behind-the-scenes moments, and plenty of latte art — all on our Instagram.
            </p>
            <a
              href={RESTAURANT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#C13584] font-black rounded-xl hover:scale-105 transition-all shadow-lg text-sm"
            >
              <FiInstagram className="w-4 h-4" />
              @bbcafe on Instagram
            </a>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-[#1A0E07]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={activeLightboxItem.src}
                alt={activeLightboxItem.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E07]/80 via-transparent to-transparent" />
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#D2691E]">{activeLightboxItem.category}</span>
                <p className="text-white font-bold text-lg">{activeLightboxItem.label}</p>
              </div>
              <p className="text-white/40 text-sm tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </p>
            </div>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
              aria-label="Close"
            >
              <FiX className="w-4 h-4" />
            </button>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D2691E] transition-all"
              aria-label="Previous"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D2691E] transition-all"
              aria-label="Next"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
