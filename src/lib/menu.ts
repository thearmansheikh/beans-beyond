/**
 * Fetch menu items from Supabase.
 * Falls back to hardcoded constants if the table is empty or unreachable.
 */
import { createServerAnonClient } from "@/lib/supabase-server";
import { MENU_ITEMS } from "@/utils/constants";
import type { MenuItem } from "@/types";
import type { DbMenuItem } from "@/lib/supabase";

function mapDbToMenuItem(db: DbMenuItem): MenuItem {
  return {
    _id:         db.id!,
    name:        db.name,
    description: db.description ?? "",
    price:       db.price,
    imageUrl:    db.image_url ?? "",
    category:    db.category,
    available:   db.available,
    popular:     db.popular    ?? false,
    chefsPick:   db.chefs_pick ?? false,
    dietaryInfo: {
      vegetarian: db.vegetarian  ?? false,
      vegan:      db.vegan       ?? false,
      glutenFree: db.gluten_free ?? false,
      allergens:  db.allergens   ?? [],
    },
    customizationOptions: [],
  };
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("available", true)
      .order("display_order")
      .order("name");

    if (error) throw error;

    // If Supabase table is empty, fall back to constants
    if (!data || data.length === 0) return MENU_ITEMS as unknown as MenuItem[];

    return (data as DbMenuItem[]).map(mapDbToMenuItem);
  } catch {
    // Any error → fall back to constants so the site never shows an empty menu
    return MENU_ITEMS as unknown as MenuItem[];
  }
}
