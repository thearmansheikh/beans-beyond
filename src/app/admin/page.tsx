"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FiGrid, FiShoppingBag, FiMenu as FiMenuIcon,
  FiUsers, FiSettings, FiLogOut, FiChevronRight,
  FiLock, FiMail, FiEye, FiEyeOff, FiAlertCircle,
  FiCalendar, FiMessageSquare,
} from "react-icons/fi";
import Dashboard       from "@/components/admin/Dashboard";
import OrderManagement from "@/components/admin/OrderManagement";
import MenuManagement  from "@/components/admin/MenuManagement";
import BookingsPanel   from "@/components/admin/BookingsPanel";
import MessagesPanel   from "@/components/admin/MessagesPanel";
import CustomersPanel  from "@/components/admin/CustomersPanel";
import SettingsPanel   from "@/components/admin/SettingsPanel";
import { RESTAURANT }  from "@/utils/constants";
import { createBrowserSupabaseClient } from "@/lib/supabase";

type AdminTab = "dashboard" | "orders" | "menu" | "bookings" | "messages" | "customers" | "settings";

// ── Login screen ──────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createBrowserSupabaseClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email:    form.email,
      password: form.password,
    });
    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6F4E37] to-[#4A3425] flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg shadow-[#6F4E37]/30">
            B&amp;B
          </div>
          <h1 className="text-2xl font-black text-[#1A0E07]">Admin Portal</h1>
          <p className="text-[#333]/50 text-sm mt-1">{RESTAURANT.name}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EEE6DC] shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#333] mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40" />
                <input type="email" required autoComplete="email" placeholder="admin@bbcafe.co.uk"
                  value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40 focus:border-[#6F4E37]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#333] mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40" />
                <input type={showPw ? "text" : "password"} required autoComplete="current-password" placeholder="••••••••"
                  value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full pl-10 pr-10 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40 focus:border-[#6F4E37]" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#333]/40 hover:text-[#333] transition-colors">
                  {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#6F4E37] to-[#4A3425] text-white font-black rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-[#6F4E37]/25">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in…</>
                : <><FiLock className="w-4 h-4" />Sign In</>}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-[#333]/30 mt-6">Restricted area — authorised personnel only</p>
      </div>
    </div>
  );
}

// ── Admin panel ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed,        setAuthed]        = useState(false);
  const [checking,      setChecking]      = useState(true);
  const [activeTab,     setActiveTab]     = useState<AdminTab>("dashboard");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [pendingCounts, setPendingCounts] = useState({ orders: 0, bookings: 0, messages: 0 });

  const supabase = createBrowserSupabaseClient();

  const loadCounts = useCallback(async () => {
    const [ordersRes, bookingsRes, messagesRes, cateringRes] = await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["pending", "confirmed", "preparing"]),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
      supabase.from("catering_enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]);
    setPendingCounts({
      orders:   ordersRes.count   ?? 0,
      bookings: bookingsRes.count ?? 0,
      messages: (messagesRes.count ?? 0) + (cateringRes.count ?? 0),
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setAuthed(true); loadCounts(); }
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
      if (session) loadCounts();
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-[#6F4E37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) return <AdminLogin onSuccess={() => { setAuthed(true); loadCounts(); }} />;

  const NAV: { id: AdminTab; label: string; Icon: React.ElementType; count?: number }[] = [
    { id: "dashboard", label: "Dashboard",  Icon: FiGrid },
    { id: "orders",    label: "Orders",     Icon: FiShoppingBag,   count: pendingCounts.orders   },
    { id: "bookings",  label: "Bookings",   Icon: FiCalendar,      count: pendingCounts.bookings  },
    { id: "menu",      label: "Menu Items", Icon: FiMenuIcon },
    { id: "messages",  label: "Messages",   Icon: FiMessageSquare, count: pendingCounts.messages  },
    { id: "customers", label: "Customers",  Icon: FiUsers },
    { id: "settings",  label: "Settings",   Icon: FiSettings },
  ];

  const tabTitle: Record<AdminTab, string> = {
    dashboard: "Dashboard", orders: "Order Management", bookings: "Bookings",
    menu: "Menu Management", messages: "Messages & Enquiries",
    customers: "Customers", settings: "Settings",
  };

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A0E07] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center gap-3 p-5 border-b border-white/8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6F4E37] to-[#4A3425] flex items-center justify-center text-white font-black shadow-md">
            B&amp;B
          </div>
          <div>
            <p className="font-black text-white text-sm leading-none">Admin Panel</p>
            <p className="text-white/35 text-[10px] mt-0.5">{RESTAURANT.name}</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ id, label, Icon, count }) => (
            <button key={id} onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === id ? "bg-[#D2691E] text-white shadow-md shadow-[#D2691E]/20" : "text-white/55 hover:bg-white/8 hover:text-white"
              }`}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {!!count && count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === id ? "bg-white/25 text-white" : "bg-[#D2691E] text-white"}`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/8 space-y-0.5">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/55 hover:bg-white/8 hover:text-white text-sm font-semibold transition-all">
            <FiChevronRight className="w-4 h-4 rotate-180" />View Site
          </a>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 text-sm font-semibold transition-all">
            <FiLogOut className="w-4 h-4" />Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#EEE6DC] px-5 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#F8F4EF] text-[#6F4E37] transition-colors">
              <FiMenuIcon className="w-5 h-5" />
            </button>
            <h1 className="font-black text-[#1A0E07] text-xl">{tabTitle[activeTab]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadCounts} className="text-xs text-[#333]/40 hover:text-[#6F4E37] transition-colors font-semibold">Refresh</button>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D2691E]/10 border border-[#D2691E]/25 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#D2691E] animate-pulse" />
              <span className="text-[#D2691E] text-xs font-black">Live</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "orders"    && <OrderManagement onStatusChange={loadCounts} />}
          {activeTab === "bookings"  && <BookingsPanel   onStatusChange={loadCounts} />}
          {activeTab === "menu"      && <MenuManagement />}
          {activeTab === "messages"  && <MessagesPanel   onRead={loadCounts} />}
          {activeTab === "customers" && <CustomersPanel />}
          {activeTab === "settings"  && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}
