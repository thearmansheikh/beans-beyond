"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiSearch } from "react-icons/fi";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";
import { formatPrice } from "@/utils/helpers";

export default function MenuManagement() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("all");
  const [items, setItems]       = useState(MENU_ITEMS);

  const filtered = items.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleAvailable = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, available: !item.available } : item
      )
    );
    // TODO: call menuApi.update(id, { available: !current }, token)
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setItems((prev) => prev.filter((item) => item._id !== id));
    // TODO: call menuApi.delete(id, token)
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-wrap flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
            <input
              type="search" placeholder="Search items…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] w-52"
            />
          </div>
          <select
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
          >
            {MENU_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => alert("[Demo] Add item form coming in Phase 2")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#B5571A] transition-all text-sm shrink-0"
        >
          <FiPlus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Count */}
      <p className="text-sm text-[#333]/50">
        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item._id}
            className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${
              item.available ? "border-gray-100" : "border-red-100 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#333] truncate">{item.name}</p>
                <p className="text-xs text-[#333]/40 capitalize">{item.category}</p>
              </div>
              <p className="font-black text-[#6F4E37] shrink-0">{formatPrice(item.price)}</p>
            </div>
            <p className="text-xs text-[#333]/50 leading-relaxed mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex gap-1 mb-3">
              {item.dietaryInfo.vegetarian && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">V</span>
              )}
              {item.dietaryInfo.vegan && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">VG</span>
              )}
              {item.dietaryInfo.glutenFree && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">GF</span>
              )}
              {item.popular && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D2691E]/10 text-[#D2691E]">★ Popular</span>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <button
                onClick={() => toggleAvailable(item._id)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  item.available ? "text-green-600 hover:text-green-800" : "text-red-500 hover:text-red-700"
                }`}
              >
                {item.available
                  ? <><FiToggleRight className="w-4 h-4" />Available</>
                  : <><FiToggleLeft  className="w-4 h-4" />Hidden</>}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`[Demo] Edit "${item.name}" — coming in Phase 2`)}
                  className="p-1.5 rounded-lg hover:bg-[#F5F5DC] text-[#6F4E37] transition-colors"
                  title="Edit"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
