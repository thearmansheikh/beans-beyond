"use client";

import { useState, useEffect } from "react";
import { FiShoppingBag, FiDollarSign, FiCalendar, FiMessageSquare, FiClock, FiTrendingUp } from "react-icons/fi";
import { createBrowserSupabaseClient } from "@/lib/supabase";

const STATUS_COLOURS: Record<string, string> = {
  pending:   "bg-blue-100  text-blue-700",
  confirmed: "bg-purple-100 text-purple-700",
  preparing: "bg-amber-100 text-amber-700",
  ready:     "bg-green-100 text-green-700",
  delivered: "bg-gray-100  text-gray-600",
  cancelled: "bg-red-100   text-red-700",
};

interface RecentOrder {
  id: string;
  customer_name: string;
  total: number;
  status: string;
  order_type: string;
  created_at: string;
}

interface Stats {
  ordersToday:    number;
  revenueToday:   number;
  pendingBookings: number;
  unreadMessages: number;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Dashboard() {
  const [stats,        setStats]        = useState<Stats>({ ordersToday: 0, revenueToday: 0, pendingBookings: 0, unreadMessages: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    async function load() {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayIso = todayStart.toISOString();

      const [ordersRes, bookingsRes, messagesRes, cateringRes, recentRes] = await Promise.all([
        supabase
          .from("orders")
          .select("total, status")
          .gte("created_at", todayIso),
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("read", false),
        supabase
          .from("catering_enquiries")
          .select("id", { count: "exact", head: true })
          .eq("status", "new"),
        supabase
          .from("orders")
          .select("id, customer_name, total, status, order_type, created_at")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

      const todayOrders = ordersRes.data ?? [];
      const revenueToday = todayOrders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + (o.total ?? 0), 0);

      setStats({
        ordersToday:    todayOrders.length,
        revenueToday,
        pendingBookings: bookingsRes.count  ?? 0,
        unreadMessages:  (messagesRes.count ?? 0) + (cateringRes.count ?? 0),
      });
      setRecentOrders(recentRes.data ?? []);
      setLoading(false);
    }

    load();
  }, []);

  const STAT_CARDS = [
    {
      label: "Orders Today",
      value: loading ? "…" : String(stats.ordersToday),
      sub:   "from midnight",
      Icon:  FiShoppingBag,
      color: "bg-[#6F4E37]",
    },
    {
      label: "Revenue Today",
      value: loading ? "…" : `£${stats.revenueToday.toFixed(2)}`,
      sub:   "excl. cancelled",
      Icon:  FiDollarSign,
      color: "bg-[#2C5F8D]",
    },
    {
      label: "Pending Bookings",
      value: loading ? "…" : String(stats.pendingBookings),
      sub:   "awaiting confirmation",
      Icon:  FiCalendar,
      color: "bg-[#D2691E]",
    },
    {
      label: "Unread Messages",
      value: loading ? "…" : String(stats.unreadMessages),
      sub:   "contact + catering",
      Icon:  FiMessageSquare,
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, sub, Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-[#EEE6DC] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#333]/50 text-xs font-bold uppercase tracking-widest leading-tight">{label}</p>
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-3xl font-black text-[#1A0E07] tabular-nums">{value}</p>
            <p className="text-xs text-[#333]/40 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-[#EEE6DC] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEE6DC]">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4 text-[#D2691E]" />
            <h2 className="font-black text-[#1A0E07] text-base">Recent Orders</h2>
          </div>
          <span className="text-[#333]/30 text-xs">Live from Supabase</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-16 text-[#333]/30">
            <FiShoppingBag className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F4EF]">
                <tr>
                  {["Customer", "Type", "Total", "Status", "Time"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[#333]/50 font-bold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F4EF]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8F4EF]/50 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-[#1A0E07]">{order.customer_name}</td>
                    <td className="px-6 py-3.5 capitalize text-[#333]/60 text-xs">{order.order_type}</td>
                    <td className="px-6 py-3.5 font-black text-[#6F4E37]">£{(order.total ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLOURS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-[#333]/40 text-xs">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />{timeAgo(order.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick tips */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-[#D2691E]/8 border border-[#D2691E]/20 rounded-2xl p-5">
          <p className="text-xs font-black text-[#D2691E] uppercase tracking-widest mb-1">Admin tip</p>
          <p className="text-sm text-[#1A0E07]/70">
            Use <strong>Orders</strong> tab to update order statuses in real time. Changes are saved instantly to Supabase.
          </p>
        </div>
        <div className="bg-[#6F4E37]/8 border border-[#6F4E37]/20 rounded-2xl p-5">
          <p className="text-xs font-black text-[#6F4E37] uppercase tracking-widest mb-1">Menu tip</p>
          <p className="text-sm text-[#1A0E07]/70">
            Use <strong>Menu Items</strong> tab to add, edit, or hide items. Toggling availability hides items from customers instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
