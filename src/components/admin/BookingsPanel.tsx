"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiRefreshCw, FiCalendar, FiUsers, FiClock, FiCheck, FiX, FiDownload } from "react-icons/fi";
import { createBrowserSupabaseClient, type DbBooking, type BookingStatus } from "@/lib/supabase";

const STATUS_COLOURS: Record<BookingStatus, string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100   text-red-700",
};

type FilterStatus = "all" | BookingStatus;

const TABS: { value: FilterStatus; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "pending",   label: "Pending"   },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch { return dateStr; }
}

function exportBookingsCSV(bookings: DbBooking[]) {
  const header = ["ID", "Name", "Email", "Phone", "Date", "Time", "Party Size", "Status", "Notes", "Created"];
  const rows = bookings.map((b) => [
    b.id ?? "",
    b.name,
    b.email,
    b.phone,
    b.date,
    b.time,
    String(b.party_size),
    b.status ?? "pending",
    (b.notes ?? "").replace(/,/g, ";"),
    b.created_at ? new Date(b.created_at).toLocaleString("en-GB") : "",
  ]);
  const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BookingsPanel({ onStatusChange }: { onStatusChange?: () => void }) {
  const [bookings,  setBookings]  = useState<DbBooking[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [updating,  setUpdating]  = useState<string | null>(null);
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState<FilterStatus>("all");
  const [expanded,  setExpanded]  = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const loadBookings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    setBookings((data as DbBooking[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    setUpdating(id);
    await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    setUpdating(null);
    onStatusChange?.();
  };

  const filtered = bookings.filter((b) => {
    if (filter !== "all" && b.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group by date
  const today      = new Date().toISOString().split("T")[0];
  const upcoming   = filtered.filter((b) => b.date >= today && b.status !== "cancelled");
  const past       = filtered.filter((b) => b.date < today || b.status === "cancelled");

  const renderRow = (booking: DbBooking) => {
    const isExpanded = expanded === booking.id;
    const isPending  = booking.status === "pending";

    return (
      <div key={booking.id}
        className={`bg-white rounded-2xl border transition-all ${isPending ? "border-amber-200" : "border-[#EEE6DC]"}`}>
        <button
          onClick={() => setExpanded(isExpanded ? null : booking.id!)}
          className="w-full flex items-center gap-4 px-5 py-4 text-left"
        >
          {/* Date */}
          <div className="shrink-0 w-14 text-center">
            <p className="text-lg font-black text-[#1A0E07]">
              {new Date(booking.date + "T00:00:00").getDate()}
            </p>
            <p className="text-[10px] font-bold text-[#333]/40 uppercase">
              {new Date(booking.date + "T00:00:00").toLocaleDateString("en-GB", { month: "short" })}
            </p>
          </div>

          <div className="w-px h-10 bg-[#EEE6DC] shrink-0" />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-black text-[#1A0E07] truncate">{booking.name}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-xs text-[#333]/50">
                <FiClock className="w-3 h-3" />{booking.time}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#333]/50">
                <FiUsers className="w-3 h-3" />{booking.party_size} guests
              </span>
            </div>
          </div>

          {/* Status */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-black capitalize shrink-0 ${STATUS_COLOURS[booking.status as BookingStatus] ?? "bg-gray-100 text-gray-600"}`}>
            {booking.status ?? "pending"}
          </span>
        </button>

        {/* Expanded details */}
        {isExpanded && (
          <div className="px-5 pb-5 pt-0 border-t border-[#F8F4EF]">
            <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#333]/40 mb-0.5">Email</p>
                <a href={`mailto:${booking.email}`} className="text-[#D2691E] hover:underline text-sm">{booking.email}</a>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#333]/40 mb-0.5">Phone</p>
                <a href={`tel:${booking.phone}`} className="text-[#D2691E] hover:underline text-sm">{booking.phone}</a>
              </div>
              {booking.notes && (
                <div className="sm:col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#333]/40 mb-0.5">Notes</p>
                  <p className="text-sm text-[#333]/70 bg-[#F8F4EF] rounded-xl p-3">{booking.notes}</p>
                </div>
              )}
            </div>

            {updating === booking.id ? (
              <div className="flex items-center gap-2 mt-4 text-sm text-[#333]/40">
                <span className="w-4 h-4 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
                Updating…
              </div>
            ) : (
              <div className="flex gap-2 mt-4">
                {booking.status !== "confirmed" && (
                  <button
                    onClick={() => updateStatus(booking.id!, "confirmed")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl text-sm hover:bg-green-200 transition-all"
                  >
                    <FiCheck className="w-3.5 h-3.5" />Confirm
                  </button>
                )}
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => updateStatus(booking.id!, "cancelled")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl text-sm hover:bg-red-100 transition-all"
                  >
                    <FiX className="w-3.5 h-3.5" />Cancel
                  </button>
                )}
                {booking.status === "cancelled" && (
                  <button
                    onClick={() => updateStatus(booking.id!, "pending")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-700 font-bold rounded-xl text-sm hover:bg-amber-100 transition-all"
                  >
                    Restore
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input type="search" placeholder="Search bookings…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40" />
        </div>
        <button onClick={loadBookings}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm text-[#333]/60 hover:text-[#6F4E37] hover:border-[#6F4E37]/40 transition-all">
          <FiRefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
        <button
          onClick={() => exportBookingsCSV(filtered)}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm text-[#333]/60 hover:text-[#6F4E37] hover:border-[#6F4E37]/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
          <FiDownload className="w-3.5 h-3.5" />Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(({ value, label }) => (
          <button key={value} onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === value ? "bg-[#6F4E37] text-white" : "bg-[#F8F4EF] text-[#6F4E37] hover:bg-[#EEE6DC]"}`}>
            {label}
            {value !== "all" && (
              <span className="ml-1.5 opacity-60">{bookings.filter((b) => b.status === value).length}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#EEE6DC]">
          <FiCalendar className="w-8 h-8 mx-auto mb-3 text-[#333]/20" />
          <p className="text-[#333]/30 text-sm">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#333]/40 mb-3">Upcoming & Today ({upcoming.length})</p>
              <div className="space-y-2">{upcoming.map(renderRow)}</div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#333]/40 mb-3">Past & Cancelled ({past.length})</p>
              <div className="space-y-2 opacity-70">{past.map(renderRow)}</div>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-[#333]/30 text-right">
        {filtered.length} booking{filtered.length !== 1 ? "s" : ""} · Live from Supabase
      </p>
    </div>
  );
}
