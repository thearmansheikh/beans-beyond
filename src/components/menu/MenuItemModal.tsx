"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FiX, FiMinus, FiPlus, FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import { MENU_ITEMS } from "@/utils/constants";
import type { MenuItem } from "@/types";
import toast from "react-hot-toast";

interface Props {
  item: MenuItem | null;
  onClose: () => void;
  onViewItem?: (item: MenuItem) => void;
}

const ALLERGEN_ICONS: Record<string, string> = {
  gluten:    "🌾",
  eggs:      "🥚",
  dairy:     "🥛",
  nuts:      "🥜",
  soy:       "🫘",
  fish:      "🐟",
  shellfish: "🦐",
  celery:    "🌿",
  mustard:   "🌭",
  sesame:    "🌰",
};

export default function MenuItemModal({ item, onClose, onViewItem }: Props) {
  const { addItem } = useCart();
  const [qty, setQty]             = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Reset state when item changes
  useEffect(() => {
    if (!item) return;
    setQty(1);
    const defaults: Record<string, string> = {};
    item.customizationOptions.forEach((opt) => {
      defaults[opt.name] = opt.options[0] ?? "";
    });
    setSelections(defaults);
  }, [item?._id]);

  // Close on Escape
  const handleClose = useCallback(() => onClose(), [onClose]);
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [item, handleClose]);

  if (!item) return null;

  const extraCost = item.customizationOptions.reduce((sum, opt) => {
    const chosen = selections[opt.name];
    if (!chosen || chosen === opt.options[0]) return sum;
    return sum + opt.additionalPrice;
  }, 0);

  const unitPrice  = item.price + extraCost;
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    addItem({
      menuItemId:     item._id,
      name:           item.name,
      price:          unitPrice,
      quantity:       qty,
      imageUrl:       item.imageUrl,
      customizations: selections,
    });
    toast.success(`${qty}× ${item.name} added to cart`, {
      style:     { background: "#6F4E37", color: "#fff" },
      iconTheme: { primary: "#D2691E", secondary: "#fff" },
    });
    handleClose();
  };

  // Related items (same category, exclude self, max 3)
  const related = MENU_ITEMS.filter(
    (i) => i.category === item.category && i._id !== item._id && i.available
  ).slice(0, 3);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] bg-white sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Hero image ── */}
          <div className="relative h-56 sm:h-72 shrink-0 overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 672px"
              priority
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {item.chefsPick && (
                <span className="flex items-center gap-1 px-3 py-1 bg-white text-[#1A0E07] text-xs font-black rounded-full shadow-lg">
                  ⭐ Chef&rsquo;s Pick
                </span>
              )}
              {item.popular && !item.chefsPick && (
                <span className="flex items-center gap-1 px-3 py-1 bg-[#D2691E] text-white text-xs font-bold rounded-full shadow-md">
                  <FiStar className="w-3 h-3" /> Popular
                </span>
              )}
            </div>

            {/* Dietary badges */}
            <div className="absolute top-4 right-12 flex gap-1.5">
              {item.dietaryInfo.vegetarian && (
                <span className="w-6 h-6 rounded-full bg-green-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md" title="Vegetarian">V</span>
              )}
              {item.dietaryInfo.vegan && (
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shadow-md" title="Vegan">VG</span>
              )}
              {item.dietaryInfo.glutenFree && (
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md" title="Gluten Free">GF</span>
              )}
            </div>

            {/* Price on image */}
            <div className="absolute bottom-4 left-4">
              <p id="modal-title" className="text-2xl font-black text-white drop-shadow-lg">{item.name}</p>
              <p className="text-[#D2691E] font-black text-xl drop-shadow-md">{formatPrice(item.price)}</p>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
              aria-label="Close"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 sm:p-6 space-y-6">

              {/* Description */}
              <p className="text-[#333]/70 leading-relaxed">{item.description}</p>

              {/* Allergens */}
              {item.dietaryInfo.allergens.length > 0 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#333]/40 mb-3">Contains</p>
                  <div className="flex flex-wrap gap-2">
                    {item.dietaryInfo.allergens.map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-full"
                      >
                        <span>{ALLERGEN_ICONS[a] ?? "⚠️"}</span>
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#333]/40 mt-2">
                    May also contain traces of other allergens. Please inform staff of any severe allergies.
                  </p>
                </div>
              )}

              {/* Customisation options */}
              {item.customizationOptions.map((opt) => (
                <div key={opt.name}>
                  <p className="text-xs font-black uppercase tracking-widest text-[#333]/40 mb-3">
                    {opt.name}
                    {opt.additionalPrice > 0 && (
                      <span className="ml-2 text-[#D2691E] normal-case tracking-normal font-semibold">
                        +{formatPrice(opt.additionalPrice)} for alternatives
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opt.options.map((choice, i) => (
                      <button
                        key={choice}
                        onClick={() => setSelections((s) => ({ ...s, [opt.name]: choice }))}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          selections[opt.name] === choice
                            ? "border-[#D2691E] bg-[#D2691E]/5 text-[#D2691E]"
                            : "border-[#EEE6DC] text-[#333]/60 hover:border-[#D2691E]/40"
                        }`}
                      >
                        {choice}
                        {i > 0 && opt.additionalPrice > 0 && (
                          <span className="ml-1 text-xs opacity-60">+{formatPrice(opt.additionalPrice)}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Related items */}
              {related.length > 0 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#333]/40 mb-3">You may also like</p>
                  <div className="grid grid-cols-3 gap-3">
                    {related.map((rel) => (
                      <button
                        key={rel._id}
                        onClick={() => onViewItem?.(rel)}
                        className="group text-left rounded-xl overflow-hidden border border-[#EEE6DC] hover:border-[#D2691E]/40 hover:shadow-md transition-all"
                      >
                        <div className="relative h-20 overflow-hidden bg-[#F8F4EF]">
                          <Image
                            src={rel.imageUrl}
                            alt={rel.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="150px"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-bold text-[#1A0E07] line-clamp-1 group-hover:text-[#D2691E] transition-colors">{rel.name}</p>
                          <p className="text-xs font-black text-[#D2691E]">{formatPrice(rel.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ── Footer: qty + add to cart ── */}
          <div className="shrink-0 border-t border-[#EEE6DC] px-5 sm:px-6 py-4 bg-white">
            <div className="flex items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center gap-2 bg-[#F8F4EF] rounded-xl p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6F4E37] hover:bg-white transition-all"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-black text-[#1A0E07] text-lg tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6F4E37] hover:bg-white transition-all"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/25 text-base"
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart · {formatPrice(totalPrice)}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
