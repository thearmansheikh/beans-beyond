"use client";

// ─────────────────────────────────────────────
// useCart — convenience re-export of Zustand store
// Import this in components instead of the context directly.
// ─────────────────────────────────────────────

export { useCart, useCartHydrated, useCartStore } from "@/context/CartContext";
