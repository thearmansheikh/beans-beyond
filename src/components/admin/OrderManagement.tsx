"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiClock, FiRefreshCw } from "react-icons/fi";
import { createBrowserSupabaseClient, type OrderStatus } from "@/lib/supabase";

type FilterStatus = "all" | OrderStatus;

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  order_type: string;
  status: OrderStatus;
  total: number;
  notes?: string;
}

const STATUS_COLOURS: Record<string, string> = {
  pending:   "bg-blue-100  text-blue-700",
  confirmed: "bg-purple-100 text-purple-700",
  preparing: "bg-amber-100 text-amber-700",
  ready:     "bg-green-100 text-green-700",
  delivered: "bg-gray-100  text-gray-600",
  cancelled: "bg-red-100   text-red-700",
};

const NEXT_STATUSES: Record<string, { value: string; label: string }[]> = {
  pending:   [{ value: "confirmed", label: "Confirm" }, { value: "cancelled", label: "Cancel" }],
  confirmed: [{ value: "preparing", label: "Start Prep" }, { value: "cancelled", label: "Cancel" }],
  preparing: [{ value: "ready",     label: "Mark Ready" }],
  ready:     [{ value: "delivered", label: "Delivered" }],
  delivered: [],
  cancelled: [],
};

const FILTER_TABS: { value: FilterStatus; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "pending",   label: "Pending"   },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "ready",     label: "Ready"     },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function OrderManagement({ onStatusChange }: { onStatusChange?: () => void }) {
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState<FilterStatus>("all");

  const supabase = createBrowserSupabaseClient();

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("id, created_at, customer_name, customer_email, customer_phone, order_type, status, total, notes")
      .order("created_at", { ascending: false })
      .limit(100);
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus as OrderStatus } : o))
    );
    setUpdating(null);
    onStatusChange?.();
  };

  const filtered = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.customer_name.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        (o.customer_email ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input
            type="search" placeholder="Search orders…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40"
          />
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm text-[#333]/60 hover:text-[#6F4E37] hover:border-[#6F4E37]/40 transition-all"
        >
          <FiRefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTER_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === value
                ? "bg-[#6F4E37] text-white"
                : "bg-[#F8F4EF] text-[#6F4E37] hover:bg-[#EEE6DC]"
            }`}
          >
            {label}
            {value !== "all" && (
              <span className="ml-1.5 opacity-60">
                {orders.filter((o) => o.status === value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#EEE6DC] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F4EF]">
                <tr>
                  {["Customer", "Type", "Total", "Notes", "Status", "Time", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[#333]/50 font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F4EF]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center text-[#333]/30 text-sm">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F8F4EF]/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-[#1A0E07]">{order.customer_name}</p>
                        {order.customer_email && (
                          <p className="text-[#333]/40 text-xs">{order.customer_email}</p>
                        )}
                        {order.customer_phone && (
                          <p className="text-[#333]/40 text-xs">{order.customer_phone}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 capitalize text-[#333]/60 text-xs whitespace-nowrap">{order.order_type}</td>
                      <td className="px-5 py-3.5 font-black text-[#6F4E37] whitespace-nowrap">£{(order.total ?? 0).toFixed(2)}</td>
                      <td className="px-5 py-3.5 text-xs text-[#333]/50 max-w-[140px] truncate" title={order.notes ?? ""}>
                        {order.notes || <span className="text-[#333]/20">—</span>}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLOURS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#333]/40 text-xs whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />{timeAgo(order.created_at)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {updating === order.id ? (
                          <span className="w-4 h-4 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          <div className="flex gap-1.5 flex-wrap">
                            {(NEXT_STATUSES[order.status] ?? []).map(({ value, label }) => (
                              <button
                                key={value}
                                onClick={() => updateStatus(order.id, value)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                  value === "cancelled"
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-[#D2691E]/10 text-[#D2691E] hover:bg-[#D2691E]/20"
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                            {(NEXT_STATUSES[order.status] ?? []).length === 0 && (
                              <span className="text-[#333]/25 text-xs">—</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-[#333]/30 text-right">
        Showing {filtered.length} of {orders.length} orders · Live from Supabase
      </p>
    </div>
  );
}
