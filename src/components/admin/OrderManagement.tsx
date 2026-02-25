"use client";

import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

type OrderStatus = "all" | "received" | "preparing" | "ready" | "delivered" | "cancelled";

const STATUS_COLOURS: Record<string, string> = {
  received:  "bg-blue-100  text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  ready:     "bg-green-100 text-green-700",
  delivered: "bg-gray-100  text-gray-600",
  cancelled: "bg-red-100   text-red-700",
};

// Placeholder data — replace with ordersApi.getAll() when backend is ready
const PLACEHOLDER_ORDERS = [
  { id: "BB-001", orderNumber: "BB-001", customer: "Sarah M.",  email: "sarah@example.com",  type: "dine-in",  items: 3, total: 28.50, status: "preparing", createdAt: "2024-12-18T09:12:00Z" },
  { id: "BB-002", orderNumber: "BB-002", customer: "James T.",  email: "james@example.com",  type: "takeaway", items: 2, total: 19.48, status: "received",  createdAt: "2024-12-18T09:05:00Z" },
  { id: "BB-003", orderNumber: "BB-003", customer: "Priya K.",  email: "priya@example.com",  type: "delivery", items: 1, total: 9.99,  status: "ready",     createdAt: "2024-12-18T08:55:00Z" },
  { id: "BB-004", orderNumber: "BB-004", customer: "David L.",  email: "david@example.com",  type: "takeaway", items: 4, total: 41.96, status: "delivered", createdAt: "2024-12-18T08:30:00Z" },
  { id: "BB-005", orderNumber: "BB-005", customer: "Emma R.",   email: "emma@example.com",   type: "dine-in",  items: 2, total: 22.49, status: "cancelled", createdAt: "2024-12-18T08:10:00Z" },
];

const STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "all",       label: "All"        },
  { value: "received",  label: "Received"   },
  { value: "preparing", label: "Preparing"  },
  { value: "ready",     label: "Ready"      },
  { value: "delivered", label: "Delivered"  },
  { value: "cancelled", label: "Cancelled"  },
];

export default function OrderManagement() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState<OrderStatus>("all");

  const filtered = PLACEHOLDER_ORDERS.filter((o) => {
    if (status !== "all" && o.status !== status) return false;
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) &&
        !o.orderNumber.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const updateStatus = (id: string, newStatus: string) => {
    // TODO: call ordersApi.updateStatus(id, newStatus, token)
    alert(`[Demo] Would update order ${id} to "${newStatus}". Connect backend to enable.`);
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input
            type="search" placeholder="Search orders…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStatus(value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                status === value
                  ? "bg-[#6F4E37] text-white"
                  : "bg-[#F5F5DC] text-[#6F4E37] hover:bg-[#EDE8CC]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F8F8]">
              <tr>
                {["Order #", "Customer", "Type", "Items", "Total", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[#333]/50 font-semibold text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-[#333]/40">
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8F8F8] transition-colors">
                    <td className="px-5 py-3 font-mono font-semibold text-[#6F4E37] text-xs">
                      {order.orderNumber}
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-[#333]">{order.customer}</p>
                      <p className="text-[#333]/40 text-xs">{order.email}</p>
                    </td>
                    <td className="px-5 py-3 capitalize text-[#333]/70">{order.type}</td>
                    <td className="px-5 py-3 text-[#333]/70">{order.items}</td>
                    <td className="px-5 py-3 font-bold text-[#333]">£{order.total.toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLOURS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <select
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        defaultValue=""
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-[#333] focus:outline-none focus:ring-1 focus:ring-[#6F4E37]"
                      >
                        <option value="" disabled>Update…</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
