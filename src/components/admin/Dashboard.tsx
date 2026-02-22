"use client";

import { FiShoppingBag, FiDollarSign, FiUsers, FiStar } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

// Placeholder stats — replace with real API data when backend is connected
const STATS = [
  { label: "Orders Today",    value: "24",     delta: "+12%",  Icon: FiShoppingBag, color: "bg-[#6F4E37]"  },
  { label: "Revenue Today",   value: "£487",   delta: "+8%",   Icon: FiDollarSign,  color: "bg-[#2C5F8D]"  },
  { label: "New Customers",   value: "7",      delta: "+3",    Icon: FiUsers,       color: "bg-[#D2691E]"   },
  { label: "Avg Rating",      value: "4.6★",  delta: "Stable",Icon: FiStar,        color: "bg-emerald-600" },
];

const RECENT_ORDERS = [
  { id: "BB-001", customer: "Sarah M.", items: 3, total: "£28.50", status: "preparing", time: "5m ago"  },
  { id: "BB-002", customer: "James T.", items: 2, total: "£19.48", status: "received",  time: "12m ago" },
  { id: "BB-003", customer: "Priya K.", items: 1, total: "£9.99",  status: "ready",     time: "18m ago" },
  { id: "BB-004", customer: "David L.", items: 4, total: "£41.96", status: "delivered", time: "32m ago" },
];

const STATUS_COLOURS: Record<string, string> = {
  received:  "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  ready:     "bg-green-100 text-green-700",
  delivered: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, delta, Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#333]/60 text-xs font-semibold uppercase tracking-widest">
                {label}
              </p>
              <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-black text-[#333]">{value}</p>
            <p className="text-xs text-green-600 font-semibold mt-1">{delta}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-50">
          <h2 className="font-bold text-[#6F4E37] text-lg">Recent Orders</h2>
          <a href="/admin/orders" className="text-[#D2691E] text-sm font-semibold hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F8F8]">
              <tr>
                {["Order #", "Customer", "Items", "Total", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[#333]/50 font-semibold text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-[#F8F8F8] transition-colors">
                  <td className="px-5 py-3 font-mono font-semibold text-[#6F4E37]">{order.id}</td>
                  <td className="px-5 py-3 text-[#333]">{order.customer}</td>
                  <td className="px-5 py-3 text-[#333]/70">{order.items}</td>
                  <td className="px-5 py-3 font-bold text-[#333]">{order.total}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLOURS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#333]/40">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick info */}
      <div className="bg-[#6F4E37]/5 border border-[#6F4E37]/10 rounded-2xl p-5">
        <p className="text-xs text-[#6F4E37]/70 font-medium">
          📡 Backend not connected yet. Stats above are placeholder data.
          Connect <code className="bg-white px-1.5 py-0.5 rounded text-xs">backend/.env</code> with a
          MongoDB URI to see live orders.
        </p>
      </div>
    </div>
  );
}
