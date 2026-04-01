"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";
import FadeIn from "@/components/ui/FadeIn";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuItemModal from "@/components/menu/MenuItemModal";
import type { MenuItem } from "@/types";

const FEATURED_CATEGORIES = ["all", "breakfast", "coffee", "lunch", "desserts"];

/* Stagger grid container */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 22, scale: 0.97 },
  visible:  {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem,   setSelectedItem]   = useState<MenuItem | null>(null);

  const categories = MENU_CATEGORIES.filter((c) =>
    FEATURED_CATEGORIES.includes(c.slug)
  );

  const popular  = MENU_ITEMS.filter((i) => i.popular && i.available);
  const filtered =
    activeCategory === "all"
      ? popular.slice(0, 8)
      : MENU_ITEMS.filter((i) => i.category === activeCategory && i.available).slice(0, 8);

  return (
    <>
      <section className="section-padding bg-[#F8F4EF] bg-grid-light">
        <div className="container-site">

          {/* ── Header row ── */}
          <FadeIn
            from="bottom"
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">
                What&rsquo;s on offer
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A0E07] leading-tight">
                Our Favourites
              </h2>
              <p className="text-[#333]/45 text-sm mt-2 max-w-sm">
                Hand-picked by our regulars — hearty breakfasts to perfectly pulled espressos.
              </p>
            </div>
            <Link
              href="/menu"
              className="shrink-0 btn-shine inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6F4E37] text-[#6F4E37] font-bold rounded-2xl hover:bg-[#6F4E37] hover:text-white transition-all text-sm group"
            >
              View Full Menu
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </FadeIn>

          {/* ── Category filter tabs ── */}
          <FadeIn from="bottom" delay={60}>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mb-8 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.slug
                      ? "bg-[#1A0E07] text-white shadow-md shadow-black/15"
                      : "bg-white border border-gray-200 text-[#333]/60 hover:border-[#6F4E37]/40 hover:text-[#6F4E37]"
                  }`}
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* ── Menu grid with stagger ── */}
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((item) => (
              <motion.div key={item._id} variants={cardVariants}>
                <MenuItemCard item={item} view="grid" onViewDetails={setSelectedItem} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Mobile CTA ── */}
          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#6F4E37] text-[#6F4E37] font-bold rounded-2xl hover:bg-[#6F4E37] hover:text-white transition-all"
            >
              View Full Menu
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onViewItem={setSelectedItem}
      />
    </>
  );
}
