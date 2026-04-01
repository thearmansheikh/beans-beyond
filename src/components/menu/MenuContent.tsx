"use client";

import { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { FiSearch, FiGrid, FiList, FiX, FiLayers } from "react-icons/fi";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuItemModal from "@/components/menu/MenuItemModal";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";
import type { MenuItem } from "@/types";

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

export default function MenuContent({ initialItems }: { initialItems?: MenuItem[] }) {
  const items = initialItems ?? MENU_ITEMS;

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch]                 = useState("");
  const [filter, setFilter]                 = useState<Filter>({ vegetarian: false, vegan: false, glutenFree: false });
  const [view, setView]                     = useState<View>("collection");
  const [selectedItem, setSelectedItem]     = useState<MenuItem | null>(null);

  const toggleFilter = (key: keyof Filter) =>
    setFilter((f) => ({ ...f, [key]: !f[key] }));

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase()) &&
          !item.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter.vegetarian && !item.dietaryInfo.vegetarian) return false;
      if (filter.vegan      && !item.dietaryInfo.vegan)      return false;
      if (filter.glutenFree && !item.dietaryInfo.glutenFree) return false;
      return item.available;
    });
  }, [items, activeCategory, search, filter]);

  const activeFiltersCount = Object.values(filter).filter(Boolean).length;
  const nonAllCategories   = MENU_CATEGORIES.filter((c) => c.slug !== "all");
  const isFiltering        = !!(search || activeFiltersCount > 0 || activeCategory !== "all");

  return (
    <>
      <Toaster position="bottom-right" />

      {/* Sticky filter bar */}
      <div className="sticky z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" style={{ top: "var(--header-h, 108px)" }}>
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
              {MENU_CATEGORIES.map((cat) => {
                const count =
                  cat.slug === "all"
                    ? items.filter((i) => i.available).length
                    : items.filter((i) => i.category === cat.slug && i.available).length;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.slug
                        ? "bg-[#6F4E37] text-white"
                        : "bg-[#F5F5DC] text-[#6F4E37] hover:bg-[#EDE8CC]"
                    }`}
                  >
                    {cat.icon} {cat.name}
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none ${
                        activeCategory === cat.slug
                          ? "bg-white/20 text-white"
                          : "bg-[#6F4E37]/12 text-[#6F4E37]/70"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dietary + view toggle */}
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
                <button onClick={() => setView("collection")} title="Collection view" className={`p-2 ${view === "collection" ? "bg-[#6F4E37] text-white" : "text-[#333]/40 hover:text-[#333]"}`}>
                  <FiLayers className="w-4 h-4" />
                </button>
                <button onClick={() => setView("grid")} title="Grid view" className={`p-2 ${view === "grid" ? "bg-[#6F4E37] text-white" : "text-[#333]/40 hover:text-[#333]"}`}>
                  <FiGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setView("list")} title="List view" className={`p-2 ${view === "list" ? "bg-[#6F4E37] text-white" : "text-[#333]/40 hover:text-[#333]"}`}>
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items section */}
      <section className="section-padding bg-[#F8F4EF]">
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

          {/* Collection view (default, no active filter) */}
          {filtered.length > 0 && view === "collection" && !isFiltering && (
            <div className="space-y-16">
              {nonAllCategories.map((cat) => {
                const catItems = items.filter((i) => i.category === cat.slug && i.available);
                if (catItems.length === 0) return null;
                return (
                  <div key={cat.slug} id={`cat-${cat.slug}`}>
                    {/* Section header */}
                    <div className="flex items-center gap-4 mb-7">
                      {CATEGORY_COVERS[cat.slug] && (
                        <div
                          className="w-14 h-14 rounded-2xl overflow-hidden bg-cover bg-center shrink-0 shadow-lg ring-2 ring-white"
                          style={{ backgroundImage: `url(${CATEGORY_COVERS[cat.slug]})` }}
                          role="img"
                          aria-label={cat.name}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-2xl sm:text-3xl font-black text-[#1A0E07] whitespace-nowrap">
                            {cat.icon} {cat.name}
                          </h2>
                          <span className="px-2.5 py-0.5 bg-[#6F4E37]/10 text-[#6F4E37] text-xs font-bold rounded-full">
                            {catItems.length} item{catItems.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[#D2691E] to-[#E8944A] rounded-full" />
                      </div>
                      <button
                        onClick={() => { setActiveCategory(cat.slug); setView("grid"); }}
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 border border-[#D2691E]/30 text-[#D2691E] text-sm font-bold rounded-xl hover:bg-[#D2691E] hover:text-white transition-all whitespace-nowrap"
                      >
                        View all →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {catItems.slice(0, 4).map((item) => (
                        <MenuItemCard key={item._id} item={item} view="grid" onViewDetails={setSelectedItem} />
                      ))}
                      {catItems.length > 4 && (
                        <button
                          onClick={() => { setActiveCategory(cat.slug); setView("grid"); }}
                          className="flex flex-col items-center justify-center h-full min-h-[280px] border-2 border-dashed border-[#D2691E]/20 rounded-2xl text-[#D2691E] hover:border-[#D2691E]/50 hover:bg-[#D2691E]/5 transition-all group"
                        >
                          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                          <span className="font-bold text-sm">+{catItems.length - 4} more</span>
                          <span className="text-[#333]/40 text-xs mt-0.5">View all {cat.name}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Collection view while filtering → flat grid */}
          {filtered.length > 0 && view === "collection" && isFiltering && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item) => (
                <MenuItemCard key={item._id} item={item} view="grid" onViewDetails={setSelectedItem} />
              ))}
            </div>
          )}

          {/* Grid view */}
          {filtered.length > 0 && view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item) => (
                <MenuItemCard key={item._id} item={item} view="grid" onViewDetails={setSelectedItem} />
              ))}
            </div>
          )}

          {/* List view */}
          {filtered.length > 0 && view === "list" && (
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
              {filtered.map((item) => (
                <MenuItemCard key={item._id} item={item} view="list" onViewDetails={setSelectedItem} />
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

      {/* Item modal */}
      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onViewItem={setSelectedItem}
      />
    </>
  );
}
