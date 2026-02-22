"use client";

import { useState, useEffect, useCallback } from "react";
import { MENU_ITEMS } from "@/utils/constants";
import type { MenuItem } from "@/types";

interface MenuFilters {
  category?: string;
  search?: string;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
}

// ─────────────────────────────────────────────
// useMenu — filtered menu state hook
// Uses local data (constants) for now;
// swap menuApi.getAll() when backend is live.
// ─────────────────────────────────────────────
export function useMenu(initialFilters: MenuFilters = {}) {
  const [filters, setFilters] = useState<MenuFilters>(initialFilters);
  const [items, setItems]     = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const applyFilters = useCallback(() => {
    setLoading(true);
    const result = MENU_ITEMS.filter((item) => {
      if (!item.available) return false;
      if (filters.category && filters.category !== "all" &&
          item.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!item.name.toLowerCase().includes(q) &&
            !item.description.toLowerCase().includes(q)) return false;
      }
      if (filters.vegetarian && !item.dietaryInfo.vegetarian) return false;
      if (filters.vegan      && !item.dietaryInfo.vegan)      return false;
      if (filters.glutenFree && !item.dietaryInfo.glutenFree) return false;
      return true;
    });
    setItems(result);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateFilter = useCallback(
    <K extends keyof MenuFilters>(key: K, value: MenuFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ category: "all" });
  }, []);

  return { items, filters, loading, updateFilter, resetFilters };
}

// ─────────────────────────────────────────────
// useMenuItem — single item lookup
// ─────────────────────────────────────────────
export function useMenuItem(id: string) {
  const item = MENU_ITEMS.find((i) => i._id === id) ?? null;
  return { item, loading: false };
}
