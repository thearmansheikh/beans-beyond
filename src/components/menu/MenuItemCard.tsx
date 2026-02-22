"use client";

import Image from "next/image";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import type { MenuItem } from "@/types";
import toast from "react-hot-toast";

interface Props {
  item: MenuItem;
  view?: "grid" | "list";
}

const CATEGORY_EMOJI: Record<string, string> = {
  coffee:        "☕",
  breakfast:     "🍳",
  lunch:         "🥗",
  desserts:      "🍰",
  snacks:        "🥐",
  "cold-drinks": "🥤",
};

const CATEGORY_BG: Record<string, string> = {
  coffee:        "from-amber-900 to-amber-700",
  breakfast:     "from-orange-900 to-yellow-700",
  lunch:         "from-green-900 to-emerald-700",
  desserts:      "from-rose-900 to-pink-700",
  snacks:        "from-yellow-900 to-amber-600",
  "cold-drinks": "from-sky-900 to-cyan-700",
};

export default function MenuItemCard({ item, view = "grid" }: Props) {
  const { addItem } = useCart();
  const isExternal  = item.imageUrl.startsWith("http");

  const handleAdd = () => {
    addItem({
      menuItemId:     item._id,
      name:           item.name,
      price:          item.price,
      quantity:       1,
      imageUrl:       item.imageUrl,
      customizations: {},
    });
    toast.success(`${item.name} added to cart`, {
      style:     { background: "#6F4E37", color: "#fff" },
      iconTheme: { primary: "#D2691E", secondary: "#fff" },
    });
  };

  /* ── List view ── */
  if (view === "list") {
    return (
      <div className="flex gap-4 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all group">
        <div className={`relative w-24 shrink-0 bg-gradient-to-br ${CATEGORY_BG[item.category] ?? "from-gray-800 to-gray-600"}`}>
          {isExternal ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              {CATEGORY_EMOJI[item.category] ?? "🍽️"}
            </div>
          )}
        </div>

        <div className="flex flex-1 items-center gap-4 min-w-0 py-3 pr-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-bold text-[#333] group-hover:text-[#6F4E37] transition-colors">
                {item.name}
              </h3>
              {item.popular && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-[#D2691E]/10 text-[#D2691E] text-[10px] font-bold rounded-full">
                  <FiStar className="w-2.5 h-2.5" />
                  Popular
                </span>
              )}
            </div>
            <p className="text-[#333]/50 text-xs leading-relaxed line-clamp-2">
              {item.description}
            </p>
            <div className="flex gap-1 mt-1.5">
              {item.dietaryInfo.vegetarian && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">V</span>
              )}
              {item.dietaryInfo.vegan && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">VG</span>
              )}
              {item.dietaryInfo.glutenFree && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">GF</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-black text-[#6F4E37] text-lg">
              {formatPrice(item.price)}
            </span>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D2691E] text-white text-sm font-bold rounded-xl hover:bg-[#B5571A] transition-all active:scale-[0.96]"
              aria-label={`Add ${item.name} to cart`}
            >
              <FiShoppingCart className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Grid view ── */
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${CATEGORY_BG[item.category] ?? "from-gray-800 to-gray-600"}`}>
        {isExternal ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40">
            {CATEGORY_EMOJI[item.category] ?? "🍽️"}
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Chef's Pick badge — highest priority */}
        {item.chefsPick && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white text-[#1A0E07] text-[10px] font-black rounded-full shadow-lg">
            ⭐ Chef&rsquo;s Pick
          </span>
        )}

        {/* Popular badge — only when not Chef's Pick */}
        {item.popular && !item.chefsPick && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-[#D2691E] text-white text-[10px] font-bold rounded-full shadow-md">
            <FiStar className="w-3 h-3" />
            Popular
          </span>
        )}

        {/* Dietary */}
        <div className="absolute top-3 right-3 flex gap-1">
          {item.dietaryInfo.vegetarian && (
            <span className="w-5 h-5 rounded-full bg-green-500 text-white text-[9px] font-bold flex items-center justify-center shadow" title="Vegetarian">V</span>
          )}
          {item.dietaryInfo.vegan && (
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shadow" title="Vegan">VG</span>
          )}
          {item.dietaryInfo.glutenFree && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shadow" title="Gluten Free">GF</span>
          )}
        </div>

        {/* Hover quick-add overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end justify-center pb-4">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#6F4E37] text-sm font-black rounded-xl shadow-xl hover:bg-[#D2691E] hover:text-white transition-all translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300"
            aria-label={`Quick add ${item.name}`}
          >
            <FiShoppingCart className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#333] mb-1 group-hover:text-[#6F4E37] transition-colors line-clamp-1 text-base">
          {item.name}
        </h3>
        <p className="text-[#333]/50 text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="text-[#6F4E37] font-black text-xl">
            {formatPrice(item.price)}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#D2691E] text-white text-xs font-bold rounded-xl hover:bg-[#B5571A] transition-all active:scale-[0.96]"
            aria-label={`Add ${item.name} to cart`}
          >
            <FiShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
