"use client";

import { useState, useEffect } from "react";
import {
  FiGrid, FiShoppingBag, FiMenu as FiMenuIcon,
  FiUsers, FiSettings, FiLogOut, FiChevronRight,
  FiLock, FiMail, FiEye, FiEyeOff, FiAlertCircle,
} from "react-icons/fi";
import Dashboard      from "@/components/admin/Dashboard";
import OrderManagement from "@/components/admin/OrderManagement";
import MenuManagement  from "@/components/admin/MenuManagement";
import CustomersPanel  from "@/components/admin/CustomersPanel";
import SettingsPanel   from "@/components/admin/SettingsPanel";
import { RESTAURANT }  from "@/utils/constants";
import { authApi }     from "@/services/api";
import { authService } from "@/services/auth";

type AdminTab = "dashboard" | "orders" | "menu" | "customers" | "settings";

const NAV: { id: AdminTab; label: string; Icon: typeof FiGrid; badge?: string }[] = [
  { id: "dashboard",  label: "Dashboard",  Icon: FiGrid,        },
  { id: "orders",     label: "Orders",     Icon: FiShoppingBag, badge: "3" },
  { id: "menu",       label: "Menu Items", Icon: FiMenuIcon,    },
  { id: "customers",  label: "Customers",  Icon: FiUsers,       },
  { id: "settings",   label: "Settings",   Icon: FiSettings,    },
];

// ── Login screen ──────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login(form) as { success: boolean; token: string; user: { role: string } };
      if (!res.success || res.user.role !== "admin") {
        setError("Access denied. Admin accounts only.");
        return;
      }
      authService.saveToken(res.token);
      authService.saveUser(res.user);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#6F4E37] flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
            B&amp;B
          </div>
          <h1 className="text-2xl font-black text-[#2C1A0E]">Admin Login</h1>
          <p className="text-[#333]/50 text-sm mt-1">{RESTAURANT.name}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#333] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40" />
                <input
                  id="email" type="email" required autoComplete="email"
                  placeholder="admin@bbcafe.co.uk"
                  value={form.email} onChange={(e) => set("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#333] mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40" />
                <input
                  id="password" type={showPw ? "text" : "password"} required autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password} onChange={(e) => set("password", e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#333]/40 hover:text-[#333] transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-[#6F4E37] text-white font-bold rounded-xl hover:bg-[#4A3425] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in…</>
              ) : (
                <><FiLock className="w-4 h-4" />Sign In</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#333]/30 mt-6">
          Restricted area — authorised personnel only
        </p>
      </div>
    </div>
  );
}

// ── Admin panel ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed]         = useState(false);
  const [checking, setChecking]     = useState(true);
  const [activeTab, setActiveTab]   = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Restore session on mount
  useEffect(() => {
    if (authService.isLoggedIn() && authService.isAdmin()) {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleSignOut = () => {
    authService.logout();
    setAuthed(false);
  };

  // Avoid flash of login screen during hydration check
  if (checking) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-[#6F4E37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  const tabTitle: Record<AdminTab, string> = {
    dashboard:  "Dashboard",
    orders:     "Order Management",
    menu:       "Menu Management",
    customers:  "Customers",
    settings:   "Settings",
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#2C1A0E] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#6F4E37] flex items-center justify-center text-white font-black">
            B&amp;B
          </div>
          <div>
            <p className="font-black text-white text-sm leading-none">Admin Panel</p>
            <p className="text-white/40 text-[10px]">{RESTAURANT.name}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ id, label, Icon, badge }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                activeTab === id
                  ? "bg-[#6F4E37] text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className="px-2 py-0.5 bg-[#D2691E] text-white text-[10px] font-bold rounded-full">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white text-sm font-semibold transition-all"
          >
            <FiChevronRight className="w-4 h-4 rotate-180" />
            Back to Site
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 text-sm font-semibold transition-all"
          >
            <FiLogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F5F5DC] text-[#6F4E37] transition-colors"
            >
              <FiMenuIcon className="w-5 h-5" />
            </button>
            <h1 className="font-black text-[#6F4E37] text-xl">{tabTitle[activeTab]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 text-xs font-semibold">Accepting Orders</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8">
          {activeTab === "dashboard"  && <Dashboard />}
          {activeTab === "orders"     && <OrderManagement />}
          {activeTab === "menu"       && <MenuManagement />}
          {activeTab === "customers"  && <CustomersPanel />}
          {activeTab === "settings"   && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}
