"use client";

import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useCart, useCartHydrated } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/utils/constants";

export default function Cart() {
  const hydrated = useCartHydrated();
  const { items, orderType, subtotal, serviceCharge, deliveryFee, total, updateQty, removeItem } = useCart();

  if (!hydrated) return null;

  const sub  = subtotal();
  const svc  = serviceCharge();
  const del  = deliveryFee();
  const tot  = total();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FiShoppingCart className="w-12 h-12 text-[#6F4E37]/30 mb-4" />
        <h3 className="font-bold text-[#333] text-lg mb-2">Your cart is empty</h3>
        <p className="text-[#333]/50 text-sm mb-6">
          Add items from the menu to get started.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#B5571A] transition-all"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Items */}
      <ul className="divide-y divide-gray-50 mb-4">
        {items.map((item) => (
          <li key={item.menuItemId} className="py-3 flex gap-3">
            {/* Emoji thumbnail */}
            <div className="w-12 h-12 rounded-xl bg-[#F5F5DC] flex items-center justify-center text-xl shrink-0">
              ☕
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#333] text-sm truncate">{item.name}</p>
              <p className="text-[#6F4E37] font-bold text-sm">{formatPrice(item.price)}</p>
              {/* Quantity controls */}
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  onClick={() => updateQty(item.menuItemId, item.quantity - 1)}
                  className="w-6 h-6 rounded-lg bg-[#F5F5DC] flex items-center justify-center hover:bg-[#EDE8CC] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-3 h-3 text-[#6F4E37]" />
                </button>
                <span className="text-sm font-bold text-[#333] w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQty(item.menuItemId, item.quantity + 1)}
                  className="w-6 h-6 rounded-lg bg-[#F5F5DC] flex items-center justify-center hover:bg-[#EDE8CC] transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-3 h-3 text-[#6F4E37]" />
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-[#333] text-sm">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                onClick={() => removeItem(item.menuItemId)}
                className="mt-1 text-red-400 hover:text-red-600 transition-colors"
                aria-label={`Remove ${item.name}`}
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delivery progress (delivery only) */}
      {orderType === "delivery" && sub < FREE_DELIVERY_THRESHOLD && (
        <div className="mb-4 p-3 bg-[#F5F5DC] rounded-xl text-sm">
          <p className="text-[#6F4E37] font-medium text-xs mb-1.5">
            Add {formatPrice(FREE_DELIVERY_THRESHOLD - sub)} more for free delivery!
          </p>
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D2691E] rounded-full transition-all"
              style={{ width: `${Math.min((sub / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2 py-4 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-[#333]/70">
          <span>Subtotal</span>
          <span>{formatPrice(sub)}</span>
        </div>
        {svc > 0 && (
          <div className="flex justify-between text-[#333]/70">
            <span>Service charge (10%)</span>
            <span>{formatPrice(svc)}</span>
          </div>
        )}
        {orderType === "delivery" && (
          <div className="flex justify-between text-[#333]/70">
            <span>Delivery fee</span>
            <span>{del === 0 ? <span className="text-green-600 font-semibold">Free</span> : formatPrice(del)}</span>
          </div>
        )}
        <div className="flex justify-between font-black text-[#333] text-base pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-[#6F4E37]">{formatPrice(tot)}</span>
        </div>
      </div>
    </div>
  );
}
