"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const CATEGORIES = ["All", "Food", "Coffee", "Interior", "Events"];

// Placeholder gallery data — replace imageUrl with real photos
const GALLERY = [
  { id: 1, category: "Food",     emoji: "🍳", label: "Full English Breakfast",    span: "col-span-2 row-span-2" },
  { id: 2, category: "Coffee",   emoji: "☕", label: "Flat White",                span: "" },
  { id: 3, category: "Interior", emoji: "🏡", label: "Cosy Corner",               span: "" },
  { id: 4, category: "Food",     emoji: "🥑", label: "Avocado Toast",             span: "" },
  { id: 5, category: "Coffee",   emoji: "🍵", label: "Matcha Latte Art",          span: "col-span-2" },
  { id: 6, category: "Interior", emoji: "☀️", label: "Morning Light",             span: "" },
  { id: 7, category: "Food",     emoji: "🥐", label: "Fresh Pastries",            span: "" },
  { id: 8, category: "Events",   emoji: "🎉", label: "Community Brunch",          span: "col-span-2 row-span-2" },
  { id: 9, category: "Coffee",   emoji: "🫘", label: "Specialty Beans",           span: "" },
  { id: 10,category: "Food",     emoji: "🍰", label: "Chocolate Brownie",         span: "" },
  { id: 11,category: "Interior", emoji: "🖼️", label: "Local Art Wall",            span: "" },
  { id: 12,category: "Events",   emoji: "🎶", label: "Live Music Evening",        span: "" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<null | typeof GALLERY[0]>(null);

  const filtered = GALLERY.filter(
    (g) => activeCategory === "All" || g.category === activeCategory
  );

  return (
    <CartProvider>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#2C1A0E] to-[#6F4E37] py-20 text-center">
          <div className="container-site">
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-sm mb-3">
              Beans &amp; Beyond
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Gallery</h1>
            <p className="text-white/60 max-w-md mx-auto">
              A peek into our world — food, coffee, space, and community.
            </p>
          </div>
        </section>

        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-site">
            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-[#6F4E37] text-white shadow-md"
                      : "bg-white text-[#6F4E37] border border-[#6F4E37]/20 hover:border-[#6F4E37]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className={`${item.span || ""} relative bg-[#F5F5DC] rounded-2xl overflow-hidden cursor-pointer group`}
                >
                  {/* Placeholder background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-20">{item.emoji}</span>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#2C1A0E]/0 group-hover:bg-[#2C1A0E]/50 transition-all duration-300 flex items-end p-4">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <span className="px-2.5 py-0.5 bg-[#D2691E] text-white text-[10px] font-bold rounded-full mb-1 inline-block">
                        {item.category}
                      </span>
                      <p className="text-white font-bold text-sm">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[#333]/40 text-sm mt-8">
              Placeholder images — replace with real photography before launch.
            </p>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-[#F5F5DC] rounded-2xl w-full max-w-lg aspect-[4/3] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[100px] opacity-20">{lightbox.emoji}</span>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="px-3 py-1 bg-[#D2691E] text-white text-xs font-bold rounded-full">{lightbox.category}</span>
              <p className="text-[#6F4E37] font-bold mt-1">{lightbox.label}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Close lightbox"
            >
              <FiX className="w-4 h-4 text-[#333]" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </CartProvider>
  );
}
