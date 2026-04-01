"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiMail, FiPhone, FiChevronDown, FiChevronUp, FiShoppingBag, FiRefreshCw } from "react-icons/fi";
import { createBrowserSupabaseClient } from "@/lib/supabase";

interface CustomerOrder {
  id:         string;
  created_at: string;
  total:      number;
  status:     string;
  order_type: string;
}

interface Customer {
  email:       string;
  name:        string;
  phone:       string;
  orderCount:  number;
  totalSpent:  number;
  lastOrderAt: string;
  orders:      CustomerOrder[];
  status:      "vip" | "regular" | "new";
}

const STATUS_CONFIG = {
  vip:     { label: "VIP",     cls: "bg-amber-100 text-amber-700 border-amber-200" },
  regular: { label: "Regular", cls: "bg-blue-50 text-blue-600 border-blue-200"     },
  new:     { label: "New",     cls: "bg-green-50 text-green-700 border-green-200"  },
};

function classifyCustomer(orderCount: number): Customer["status"] {
  if (orderCount >= 10) return "vip";
  if (orderCount >= 3)  return "regular";
  return "new";
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7)  return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function CustomersPanel() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState<"all" | Customer["status"]>("all");
  const [expanded,  setExpanded]  = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const loadCustomers = useCallback(async () => {
    setLoading(true);

    // Fetch all orders with customer info
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, created_at, customer_name, customer_email, customer_phone, total, status, order_type")
      .not("customer_email", "is", null)
      .neq("status", "cancelled")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error || !orders) {
      setLoading(false);
      return;
    }

    // Aggregate by email
    const map = new Map<string, Customer>();

    for (const o of orders) {
      const email = (o.customer_email as string).toLowerCase();
      if (!map.has(email)) {
        map.set(email, {
          email,
          name:        o.customer_name,
          phone:       o.customer_phone ?? "",
          orderCount:  0,
          totalSpent:  0,
          lastOrderAt: o.created_at,
          orders:      [],
          status:      "new",
        });
      }
      const c = map.get(email)!;
      c.orderCount  += 1;
      c.totalSpent  += Number(o.total);
      c.orders.push({
        id:         o.id,
        created_at: o.created_at,
        total:      Number(o.total),
        status:     o.status,
        order_type: o.order_type,
      });
      // Keep most recent name/phone in case they updated
      if (o.created_at > c.lastOrderAt) {
        c.name        = o.customer_name;
        c.phone       = o.customer_phone ?? c.phone;
        c.lastOrderAt = o.created_at;
      }
    }

    const list = Array.from(map.values()).map((c) => ({
      ...c,
      status: classifyCustomer(c.orderCount),
    }));

    // Sort by total spent desc
    list.sort((a, b) => b.totalSpent - a.totalSpent);

    setCustomers(list);
    setLoading(false);
  }, []);

  useEffect(() => { loadCustomers(); }, [loadCustomers]);

  const filtered = customers.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.includes(q) || c.phone.includes(q);
  });

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const vipCount     = customers.filter((c) => c.status === "vip").length;
  const newCount     = customers.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Customers",     value: customers.length,         colour: "from-[#6F4E37] to-[#4A3425]" },
          { label: "VIP Customers",       value: vipCount,                  colour: "from-amber-500 to-amber-600"  },
          { label: "New Customers",       value: newCount,                  colour: "from-green-500 to-green-600"  },
          { label: "Total Revenue",       value: `£${totalRevenue.toFixed(2)}`, colour: "from-[#2C5F8D] to-[#1A3F5E]" },
        ].map(({ label, value, colour }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-[#EEE6DC] shadow-sm">
            <div className={`inline-flex w-8 h-8 rounded-xl bg-gradient-to-br ${colour} items-center justify-center mb-3`} />
            <p className="text-[#333]/50 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-black text-[#1A0E07]">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input type="search" placeholder="Search customers…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "vip", "regular", "new"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === f ? "bg-[#6F4E37] text-white" : "bg-[#F8F4EF] text-[#6F4E37] hover:bg-[#EEE6DC]"
              }`}>
              {f === "all" ? "All" : STATUS_CONFIG[f].label}
            </button>
          ))}
        </div>
        <button onClick={loadCustomers}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm text-[#333]/60 hover:text-[#6F4E37] hover:border-[#6F4E37]/40 transition-all">
          <FiRefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#EEE6DC] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-[#333]/30 text-sm">
            {customers.length === 0 ? "No customers yet — orders will appear here once placed." : "No customers match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F4EF]">
                <tr>
                  {["Customer", "Contact", "Orders", "Total Spent", "Last Order", "Status", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-[#333]/50 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F4EF]">
                {filtered.map((c) => (
                  <>
                    <tr key={c.email}
                      className="hover:bg-[#F8F4EF]/40 transition-colors cursor-pointer"
                      onClick={() => setExpanded((p) => (p === c.email ? null : c.email))}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6F4E37] to-[#4A3425] text-white font-black text-sm flex items-center justify-center shrink-0">
                            {c.name[0].toUpperCase()}
                          </div>
                          <span className="font-semibold text-[#1A0E07]">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <a href={`mailto:${c.email}`} onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs text-[#333]/60 hover:text-[#D2691E] transition-colors">
                            <FiMail className="w-3 h-3 shrink-0" />{c.email}
                          </a>
                          {c.phone && (
                            <a href={`tel:${c.phone}`} onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-xs text-[#333]/60 hover:text-[#D2691E] transition-colors">
                              <FiPhone className="w-3 h-3 shrink-0" />{c.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-black text-[#333] text-center">{c.orderCount}</td>
                      <td className="px-4 py-3 font-black text-[#6F4E37] whitespace-nowrap">£{c.totalSpent.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[#333]/50 text-xs whitespace-nowrap">{timeAgo(c.lastOrderAt)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${STATUS_CONFIG[c.status].cls}`}>
                          {STATUS_CONFIG[c.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#333]/40">
                        {expanded === c.email ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
                      </td>
                    </tr>

                    {/* Expandable order history */}
                    {expanded === c.email && (
                      <tr key={`${c.email}-expand`}>
                        <td colSpan={7} className="px-4 pb-4 bg-[#FDFCFB]">
                          <p className="text-[11px] font-black uppercase tracking-widest text-[#333]/40 mb-3 mt-3 flex items-center gap-1.5">
                            <FiShoppingBag className="w-3 h-3" />Order History
                          </p>
                          <div className="space-y-2">
                            {c.orders.map((o) => (
                              <div key={o.id} className="flex items-center gap-4 bg-white border border-[#EEE6DC] rounded-xl px-4 py-3">
                                <span className="text-xs font-black text-[#6F4E37] w-24 shrink-0 truncate" title={o.id}>
                                  {o.id.slice(0, 8).toUpperCase()}
                                </span>
                                <span className="text-xs text-[#333]/50 w-28 shrink-0">{timeAgo(o.created_at)}</span>
                                <span className="text-xs text-[#333]/50 flex-1 capitalize">{o.order_type}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize shrink-0 ${
                                  o.status === "delivered" ? "bg-gray-100 text-gray-500"
                                  : o.status === "confirmed" || o.status === "ready" ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                                }`}>{o.status}</span>
                                <span className="text-sm font-black text-[#333] shrink-0">£{o.total.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-[#333]/30 text-right">
        {filtered.length} customer{filtered.length !== 1 ? "s" : ""} · aggregated from order history
      </p>
    </div>
  );
}
