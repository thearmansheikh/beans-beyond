"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight,
  FiSearch, FiX, FiCheck, FiAlertCircle,
} from "react-icons/fi";
import { createBrowserSupabaseClient, type DbMenuItem } from "@/lib/supabase";

const CATEGORIES = [
  { slug: "all",         name: "All"         },
  { slug: "breakfast",   name: "Breakfast"   },
  { slug: "coffee",      name: "Coffee"      },
  { slug: "lunch",       name: "Lunch"       },
  { slug: "snacks",      name: "Snacks"      },
  { slug: "cold-drinks", name: "Cold Drinks" },
  { slug: "desserts",    name: "Desserts"    },
];

const EMPTY_FORM: Omit<DbMenuItem, "id" | "created_at"> = {
  name:          "",
  category:      "breakfast",
  description:   "",
  price:         0,
  image_url:     "",
  available:     true,
  popular:       false,
  chefs_pick:    false,
  vegetarian:    false,
  vegan:         false,
  gluten_free:   false,
  allergens:     [],
  display_order: 0,
};

interface ItemModalProps {
  item: Omit<DbMenuItem, "id" | "created_at"> | null;
  editId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

function ItemModal({ item, editId, onClose, onSaved }: ItemModalProps) {
  const [form,    setForm]    = useState(item ?? EMPTY_FORM);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [allergenInput, setAllergenInput] = useState((item?.allergens ?? []).join(", "));

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const supabase = createBrowserSupabaseClient();
    const payload = {
      ...form,
      allergens: allergenInput ? allergenInput.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    if (editId) {
      const { error: err } = await supabase.from("menu_items").update(payload).eq("id", editId);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("menu_items").insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }
    setSaving(false);
    onSaved();
  };

  const INPUT = "w-full px-3.5 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EEE6DC]">
          <h2 className="font-black text-[#1A0E07] text-lg">{editId ? "Edit Item" : "Add Menu Item"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#F8F4EF] text-[#333]/50 hover:text-[#333] transition-all">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1A0E07]/60 mb-1.5">Item Name *</label>
            <input required value={form.name} onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Full English Breakfast" className={INPUT} />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#1A0E07]/60 mb-1.5">Category *</label>
              <select required value={form.category} onChange={(e) => set("category", e.target.value)} className={`${INPUT} bg-white appearance-none`}>
                {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#1A0E07]/60 mb-1.5">Price (£) *</label>
              <input required type="number" min="0" step="0.01"
                value={form.price === 0 ? "" : form.price}
                onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
                placeholder="0.00" className={INPUT} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1A0E07]/60 mb-1.5">Description</label>
            <textarea rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)}
              placeholder="Short description shown to customers…"
              className={`${INPUT} resize-none`} />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1A0E07]/60 mb-1.5">Image URL</label>
            <input type="url" value={form.image_url ?? ""} onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://images.unsplash.com/…" className={INPUT} />
          </div>

          {/* Allergens */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1A0E07]/60 mb-1.5">Allergens (comma-separated)</label>
            <input value={allergenInput} onChange={(e) => setAllergenInput(e.target.value)}
              placeholder="gluten, dairy, eggs, nuts…" className={INPUT} />
          </div>

          {/* Toggle flags */}
          <div className="grid grid-cols-2 gap-3">
            {([
              ["available",  "Available"],
              ["popular",    "Popular"],
              ["chefs_pick", "Chef's Pick"],
              ["vegetarian", "Vegetarian"],
              ["vegan",      "Vegan"],
              ["gluten_free","Gluten-Free"],
            ] as [keyof typeof form, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[#EEE6DC] hover:border-[#D2691E]/30 transition-all">
                <div
                  onClick={() => set(key, !form[key] as any)}
                  className={`w-10 h-6 rounded-full transition-all relative cursor-pointer ${form[key] ? "bg-[#D2691E]" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form[key] ? "left-5" : "left-1"}`} />
                </div>
                <span className="text-sm font-semibold text-[#333]">{label}</span>
              </label>
            ))}
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" /><span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border-2 border-[#EEE6DC] text-[#333]/60 font-bold rounded-xl hover:border-[#333]/30 transition-all text-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-70 flex items-center justify-center gap-2">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                : <><FiCheck className="w-4 h-4" />{editId ? "Save Changes" : "Add Item"}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MenuManagement() {
  const [items,    setItems]    = useState<DbMenuItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [modal,    setModal]    = useState<{ item: Omit<DbMenuItem,"id"|"created_at"> | null; editId: string | null } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const loadItems = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("menu_items").select("*").order("display_order").order("name");
    setItems((data as DbMenuItem[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadItems(); }, [loadItems]);

  const toggleAvailable = async (item: DbMenuItem) => {
    const newVal = !item.available;
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, available: newVal } : i)));
    await supabase.from("menu_items").update({ available: newVal }).eq("id", item.id!);
  };

  const handleDelete = async (item: DbMenuItem) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setDeleting(item.id!);
    await supabase.from("menu_items").delete().eq("id", item.id!);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setDeleting(null);
  };

  const openAdd  = () => setModal({ item: EMPTY_FORM, editId: null });
  const openEdit = (item: DbMenuItem) => {
    const { id, created_at, ...rest } = item;
    setModal({ item: rest, editId: id! });
  };
  const closeModal = () => setModal(null);
  const onSaved    = () => { closeModal(); loadItems(); };

  const filtered = items.filter((i) => {
    if (category !== "all" && i.category !== category) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {modal && (
        <ItemModal item={modal.item} editId={modal.editId} onClose={closeModal} onSaved={onSaved} />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-wrap flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
            <input type="search" placeholder="Search items…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40 w-52" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40 bg-white">
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all text-sm shrink-0 shadow-md shadow-[#D2691E]/25">
          <FiPlus className="w-4 h-4" />Add Item
        </button>
      </div>

      <p className="text-xs text-[#333]/40">
        {filtered.length} item{filtered.length !== 1 ? "s" : ""} · stored in Supabase
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#EEE6DC]">
          <p className="text-[#333]/30 text-sm mb-4">No menu items found</p>
          <button onClick={openAdd}
            className="px-5 py-2.5 bg-[#D2691E] text-white font-bold rounded-xl text-sm hover:opacity-90">
            Add your first item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id}
              className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${item.available ? "border-[#EEE6DC]" : "border-red-100 opacity-60"}`}>
              {/* Image */}
              {item.image_url && (
                <div className="h-32 rounded-xl overflow-hidden mb-3 bg-[#F8F4EF]">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-black text-[#1A0E07] leading-tight">{item.name}</p>
                <p className="font-black text-[#D2691E] shrink-0">£{item.price.toFixed(2)}</p>
              </div>
              <p className="text-[10px] text-[#333]/40 capitalize mb-2">{item.category}</p>
              {item.description && (
                <p className="text-xs text-[#333]/50 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
              )}

              <div className="flex flex-wrap gap-1 mb-3">
                {item.vegetarian  && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">V</span>}
                {item.vegan       && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">VG</span>}
                {item.gluten_free && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">GF</span>}
                {item.popular     && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D2691E]/10 text-[#D2691E]">★ Popular</span>}
                {item.chefs_pick  && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Chef's Pick</span>}
              </div>

              <div className="flex items-center justify-between border-t border-[#F8F4EF] pt-3">
                <button onClick={() => toggleAvailable(item)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${item.available ? "text-green-600 hover:text-green-800" : "text-red-500 hover:text-red-700"}`}>
                  {item.available
                    ? <><FiToggleRight className="w-4 h-4" />Available</>
                    : <><FiToggleLeft  className="w-4 h-4" />Hidden</>}
                </button>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg hover:bg-[#F8F4EF] text-[#6F4E37] transition-colors" title="Edit">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item)} disabled={deleting === item.id}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors disabled:opacity-50" title="Delete">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
