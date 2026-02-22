"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, OrderType } from "@/types";
import {
  SERVICE_CHARGE_PERCENT,
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
} from "@/utils/constants";

// ─────────────────────────────────────────────
// Zustand store (persisted to localStorage)
// ─────────────────────────────────────────────
interface CartStore {
  items: CartItem[];
  orderType: OrderType;
  promoCode: string;
  discount: number;

  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQty: (menuItemId: string, qty: number) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  applyPromo: (code: string, discount: number) => void;

  // Derived
  subtotal: () => number;
  serviceCharge: () => number;
  deliveryFee: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: "takeaway",
      promoCode: "",
      discount: 0,

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.menuItemId === newItem.menuItemId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === newItem.menuItemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),

      removeItem: (menuItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.menuItemId !== menuItemId),
        })),

      updateQty: (menuItemId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.menuItemId !== menuItemId)
              : state.items.map((i) =>
                  i.menuItemId === menuItemId ? { ...i, quantity: qty } : i
                ),
        })),

      clearCart: () => set({ items: [], promoCode: "", discount: 0 }),

      setOrderType: (type) => set({ orderType: type }),

      applyPromo: (code, discount) => set({ promoCode: code, discount }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      serviceCharge: () => {
        const { orderType, subtotal } = get();
        return orderType === "dine-in"
          ? parseFloat((subtotal() * SERVICE_CHARGE_PERCENT).toFixed(2))
          : 0;
      },

      deliveryFee: () => {
        const { orderType, subtotal } = get();
        if (orderType !== "delivery") return 0;
        return subtotal() >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      },

      total: () => {
        const { subtotal, serviceCharge, deliveryFee, discount } = get();
        return Math.max(
          0,
          subtotal() + serviceCharge() + deliveryFee() - discount
        );
      },

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "bb-cart",
      partialize: (state) => ({
        items: state.items,
        orderType: state.orderType,
        promoCode: state.promoCode,
        discount: state.discount,
      }),
    }
  )
);

// ─────────────────────────────────────────────
// React Context (for SSR hydration safety)
// ─────────────────────────────────────────────
const CartContext = createContext<{ hydrated: boolean }>({ hydrated: false });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <CartContext.Provider value={{ hydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useCartStore();
export const useCartHydrated = () => useContext(CartContext).hydrated;
