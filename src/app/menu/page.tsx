"use client";

import { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { FiSearch, FiGrid, FiList, FiX, FiLayers } from "react-icons/fi";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";

type Filter = { vegetarian: boolean; vegan: boolean; glutenFree: boolean };
type View   = "grid" | "list" | "collection";

const CATEGORY_COVERS: Record<string, string> = {
  breakfast:     "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=70",
  coffee:        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=70",
  lunch:         "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=70",
  snacks:        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=70",
  "cold-drinks": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=70",
  desserts:      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=70",
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch]                 = useState("");
  const [filter, setFilter]                 = useState<Filter>({ vegetarian: false, vegan: false, glutenFree: false });
  const [view, setView]                     = useState<View>("collection");

  const toggleFilter = (key: keyof Filter) =>
    setFilter((f) => ({ ...f, [key]: !f[key] }));

  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase()) &&
          !item.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter.vegetarian && !item.dietaryInfo.vegetarian) return false;
      if (filter.vegan      && !item.dietaryInfo.vegan)      return false;
      if (filter.glutenFree && !item.dietaryInfo.glutenFree) return false;
      return item.available;
    });
  }, [activeCategory, search, filter]);

  const activeFiltersCount = Object.values(filter).filter(Boolean).length;
  const nonAllCategories   = MENU_CATEGORIES.filter((c) => c.slug !== "all");
  const isFiltering        = !!(search || activeFiltersCount > 0 || activeCategory !== "all");

  return (
    <CartProvider>
      <Toaster position="bottom-right" />
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#2C1A0E] via-[#1A0E07] to-[#0D0805] py-20 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#D2691E]/8 blur-[100px] pointer-events-none" />
          <div className="relative z-10 container-site">
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-sm mb-3">
              Beans &amp; Beyond
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              Our Menu
            </h1>
            <p className="text-white/50 max-w-md mx-auto text-lg mb-8">
              Fresh, seasonal food and specialty coffee — made with care, every day.
            </p>

            {/* Category quick-jump buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {nonAllCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setActiveCategory(cat.slug); setView("grid"); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/75 text-sm font-medium hover:bg-white/20 hover:text-white transition-all"
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sticky filter bar ── */}
        <div className="sticky top-[88px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="container-site py-3">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

              {/* Search */}
              <div className="relative flex-shrink-0 w-full sm:w-56">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search menu…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333]/40 hover:text-[#333]"
                    aria-label="Clear search"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 flex-1 scrollbar-hide">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.slug
                        ? "bg-[#6F4E37] text-white"
                        : "bg-[#F5F5DC] text-[#6F4E37] hover:bg-[#EDE8CC]"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Dietary + view */}
              <div className="flex gap-2 items-center shrink-0">
                {(
                  [
                    { key: "vegetarian" as const, label: "V",  title: "Vegetarian"  },
                    { key: "vegan"      as const, label: "VG", title: "Vegan"       },
                    { key: "glutenFree" as const, label: "GF", title: "Gluten Free" },
                  ] as const
                ).map(({ key, label, title }) => (
                  <button
                    key={key}
                    onClick={() => toggleFilter(key)}
                    title={title}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                      filter[key]
                        ? "bg-[#6F4E37] border-[#6F4E37] text-white"
                        : "border-gray-200 text-[#333]/50 hover:border-[#6F4E37] hover:text-[#6F4E37]"
                    }`}
                  >
                    {label}
                  </button>
                ))}

                {/* View toggle */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setView("collection")}
                    title="Collection view"
                    className={`p-2 ${view === "collection" ? "bg-[#6F4E37] text-white" : "text-[#333]/40 hover:text-[#333]"}`}
                  >
                    <FiLayers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    title="Grid view"
                    className={`p-2 ${view === "grid" ? "bg-[#6F4E37] text-white" : "text-[#333]/40 hover:text-[#333]"}`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    title="List view"
                    className={`p-2 ${view === "list" ? "bg-[#6F4E37] text-white" : "text-[#333]/40 hover:text-[#333]"}`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Items ── */}
        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-site">

            {/* Result meta */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#333]/55 text-sm">
                {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                {search && ` for "${search}"`}
                {activeFiltersCount > 0 && ` · ${activeFiltersCount} filter${activeFiltersCount > 1 ? "s" : ""} active`}
              </p>
              {isFiltering && (
                <button
                  onClick={() => { setSearch(""); setFilter({ vegetarian: false, vegan: false, glutenFree: false }); setActiveCategory("all"); }}
                  className="text-[#D2691E] text-sm font-semibold hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">🔍</span>
                <h2 className="font-bold text-[#333] text-xl mb-2">No items found</h2>
                <p className="text-[#333]/50 text-sm">Try a different search or remove some filters.</p>
              </div>
            )}

            {/* ── Collection view ── */}
            {filtered.length > 0 && view === "collection" && !isFiltering && (
              <div className="space-y-16">
                {nonAllCategories.map((cat) => {
                  const items = MENU_ITEMS.filter(
                    (i) => i.category === cat.slug && i.available
                  );
                  if (items.length === 0) return null;
                  return (
                    <div key={cat.slug}>
                      {/* Category section header */}
                      <div className="flex items-center gap-4 mb-7">
                        {CATEGORY_COVERS[cat.slug] && (
                          <div
                            className="w-12 h-12 rounded-xl overflow-hidden bg-cover bg-center shrink-0 shadow-md"
                            style={{ backgroundImage: `url(${CATEGORY_COVERS[cat.slug]})` }}
                            role="img"
                            aria-label={cat.name}
                          />
                        )}
                        <h2 className="text-2xl font-black text-[#6F4E37] whitespace-nowrap">
                          {cat.icon} {cat.name}
                        </h2>
                        <span className="text-sm text-[#333]/35">
                          {items.length} item{items.length !== 1 ? "s" : ""}
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                        <button
                          onClick={() => { setActiveCategory(cat.slug); setView("grid"); }}
                          className="shrink-0 text-[#D2691E] text-sm font-semibold hover:underline whitespace-nowrap"
                        >
                          View all →
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {items.slice(0, 4).map((item) => (
                          <MenuItemCard key={item._id} item={item} view="grid" />
                        ))}
                        {items.length > 4 && (
                          <button
                            onClick={() => { setActiveCategory(cat.slug); setView("grid"); }}
                            className="flex flex-col items-center justify-center h-full min-h-[280px] border-2 border-dashed border-[#6F4E37]/25 rounded-2xl text-[#6F4E37] hover:border-[#6F4E37]/50 hover:bg-[#6F4E37]/5 transition-all group"
                          >
                            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                              {cat.icon}
                            </span>
                            <span className="font-bold text-sm">
                              +{items.length - 4} more
                            </span>
                            <span className="text-[#333]/40 text-xs mt-0.5">View all {cat.name}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Collection view while filtering → fall back to flat grid */}
            {filtered.length > 0 && view === "collection" && isFiltering && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((item) => (
                  <MenuItemCard key={item._id} item={item} view="grid" />
                ))}
              </div>
            )}

            {/* Grid view */}
            {filtered.length > 0 && view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((item) => (
                  <MenuItemCard key={item._id} item={item} view="grid" />
                ))}
              </div>
            )}

            {/* List view */}
            {filtered.length > 0 && view === "list" && (
              <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                {filtered.map((item) => (
                  <MenuItemCard key={item._id} item={item} view="list" />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Allergen strip */}
        <div className="bg-[#F5F5DC]/60 border-t border-[#F5F5DC]">
          <div className="container-site py-4 text-center text-xs text-[#333]/50">
            <strong>Allergen information:</strong> Please inform a member of staff of any allergies before ordering.
            {" "}V = Vegetarian · VG = Vegan · GF = Gluten Free.
            Our kitchen handles nuts, dairy, gluten and other allergens.{" "}
            <a href="/allergens" className="text-[#D2691E] hover:underline font-semibold">
              Full allergen table →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
