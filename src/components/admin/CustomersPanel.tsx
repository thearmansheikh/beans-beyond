"use client";

import React, { useState } from "react";
import { FiSearch, FiMail, FiPhone, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrder: string;
  status: "regular" | "new" | "vip";
  orders: { id: string; date: string; total: number; items: string[] }[];
};

const CUSTOMERS: Customer[] = [
  {
    id: "c1", name: "Sarah Mitchell",    email: "sarah.m@example.com",   phone: "07700 900011",
    orderCount: 24, totalSpent: 312.75, lastOrder: "Today, 09:12",   status: "vip",
    orders: [
      { id: "BB-001", date: "Today 09:12",    total: 28.50, items: ["Eggs Benedict", "Flat White", "Orange Juice"] },
      { id: "BB-089", date: "Yesterday 13:45", total: 19.99, items: ["Club Sandwich", "Iced Latte"]                  },
      { id: "BB-072", date: "Mon 11:30",       total: 14.48, items: ["Avocado Toast", "Cappuccino"]                  },
    ],
  },
  {
    id: "c2", name: "James Thompson",    email: "james.t@example.com",   phone: "07700 900022",
    orderCount: 8,  totalSpent: 98.40,  lastOrder: "Today, 09:05",   status: "regular",
    orders: [
      { id: "BB-002", date: "Today 09:05",   total: 19.48, items: ["Full English", "Americano"]              },
      { id: "BB-061", date: "Last week Mon", total: 12.50, items: ["Pancake Stack", "Tea"]                   },
    ],
  },
  {
    id: "c3", name: "Priya Kapoor",      email: "priya.k@example.com",   phone: "07700 900033",
    orderCount: 3,  totalSpent: 34.97,  lastOrder: "Today, 08:55",   status: "new",
    orders: [
      { id: "BB-003", date: "Today 08:55",   total: 9.99,  items: ["Matcha Latte"]          },
      { id: "BB-050", date: "Last week Fri", total: 15.49, items: ["Chicken Wrap", "Pepsi"] },
    ],
  },
  {
    id: "c4", name: "David Laurent",     email: "david.l@example.com",   phone: "07700 900044",
    orderCount: 16, totalSpent: 210.88, lastOrder: "Today, 08:30",   status: "vip",
    orders: [
      { id: "BB-004", date: "Today 08:30",   total: 41.96, items: ["Eggs Benedict x2", "Flat White x2"]    },
      { id: "BB-078", date: "Yesterday",     total: 22.99, items: ["Brunch Platter", "Fresh Juice"]         },
    ],
  },
  {
    id: "c5", name: "Emma Rodriguez",    email: "emma.r@example.com",    phone: "07700 900055",
    orderCount: 5,  totalSpent: 62.45,  lastOrder: "Today, 08:10",   status: "regular",
    orders: [
      { id: "BB-005", date: "Today 08:10",   total: 22.49, items: ["Full English", "Smoothie"]              },
    ],
  },
  {
    id: "c6", name: "Mohammed Al-Rashid", email: "m.rashid@example.com",  phone: "07700 900066",
    orderCount: 31, totalSpent: 498.00, lastOrder: "Yesterday, 13:20", status: "vip",
    orders: [
      { id: "BB-091", date: "Yesterday 13:20", total: 35.00, items: ["Catering platter", "Juices x4"]       },
    ],
  },
  {
    id: "c7", name: "Charlotte Evans",   email: "char.e@example.com",    phone: "07700 900077",
    orderCount: 2,  totalSpent: 21.98,  lastOrder: "Mon, 10:45",     status: "new",
    orders: [
      { id: "BB-080", date: "Mon 10:45",    total: 11.49, items: ["Avocado Toast", "Oat Milk Latte"]        },
    ],
  },
];

const STATUS_CONFIG = {
  vip:     { label: "VIP",     cls: "bg-amber-100 text-amber-700 border-amber-200" },
  regular: { label: "Regular", cls: "bg-blue-50 text-blue-600 border-blue-200"     },
  new:     { label: "New",     cls: "bg-green-50 text-green-700 border-green-200"  },
};

export default function CustomersPanel() {
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState<"all" | "vip" | "regular" | "new">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = CUSTOMERS.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const totalRevenue = CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0);
  const vipCount     = CUSTOMERS.filter((c) => c.status === "vip").length;

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Customers",  value: CUSTOMERS.length,                              colour: "bg-[#6F4E37]"  },
          { label: "VIP Customers",    value: vipCount,                                       colour: "bg-amber-500" },
          { label: "New This Week",    value: CUSTOMERS.filter((c) => c.status === "new").length, colour: "bg-green-600" },
          { label: "Total Lifetime Revenue", value: `£${totalRevenue.toFixed(2)}`,           colour: "bg-[#2C5F8D]" },
        ].map(({ label, value, colour }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[#333]/55 text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
            <p className="text-2xl font-black text-[#333]">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input
            type="search"
            placeholder="Search customers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(["all", "vip", "regular", "new"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-[#6F4E37] text-white"
                  : "bg-white border border-gray-200 text-[#333]/60 hover:border-[#6F4E37]/40"
              }`}
            >
              {f === "all" ? "All Customers" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F8F8] border-b border-gray-100">
              <tr>
                {["Customer", "Contact", "Orders", "Total Spent", "Last Order", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-[#333]/50 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c) => (
                <React.Fragment key={c.id}>
                  <tr
                    className="hover:bg-[#F8F4EF]/40 transition-colors cursor-pointer"
                    onClick={() => toggle(c.id)}
                  >
                    {/* Name + avatar */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#6F4E37] text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {c.name[0]}
                        </div>
                        <span className="font-semibold text-[#333]">{c.name}</span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-xs text-[#333]/65 hover:text-[#D2691E] transition-colors" onClick={(e) => e.stopPropagation()}>
                          <FiMail className="w-3 h-3 shrink-0" />{c.email}
                        </a>
                        <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs text-[#333]/65 hover:text-[#D2691E] transition-colors" onClick={(e) => e.stopPropagation()}>
                          <FiPhone className="w-3 h-3 shrink-0" />{c.phone}
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-bold text-[#333] text-center">{c.orderCount}</td>
                    <td className="px-4 py-3 font-black text-[#6F4E37]">£{c.totalSpent.toFixed(2)}</td>
                    <td className="px-4 py-3 text-[#333]/55 text-xs whitespace-nowrap">{c.lastOrder}</td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${STATUS_CONFIG[c.status].cls}`}>
                        {STATUS_CONFIG[c.status].label}
                      </span>
                    </td>

                    {/* Expand toggle */}
                    <td className="px-4 py-3 text-[#333]/40">
                      {expanded === c.id
                        ? <FiChevronUp className="w-4 h-4" />
                        : <FiChevronDown className="w-4 h-4" />
                      }
                    </td>
                  </tr>

                  {/* Expandable order history */}
                  {expanded === c.id && (
                    <tr>
                      <td colSpan={7} className="px-4 pb-4 bg-[#FDFCFB]">
                        <div className="mt-2 space-y-2">
                          <p className="text-[11px] font-bold text-[#333]/40 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <FiShoppingBag className="w-3 h-3" />
                            Order History
                          </p>
                          {c.orders.map((o) => (
                            <div key={o.id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3">
                              <span className="text-xs font-black text-[#6F4E37] w-20 shrink-0">{o.id}</span>
                              <span className="text-xs text-[#333]/55 w-36 shrink-0">{o.date}</span>
                              <span className="text-xs text-[#333]/65 flex-1">{o.items.join(" · ")}</span>
                              <span className="text-sm font-black text-[#333] shrink-0">£{o.total.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[#333]/40 text-sm">
                    No customers match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
