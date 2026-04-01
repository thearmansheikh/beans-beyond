"use client";

import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiRefreshCw, FiMessageSquare, FiMail, FiPhone, FiCalendar, FiUsers, FiCheck, FiExternalLink } from "react-icons/fi";
import { createBrowserSupabaseClient, type DbContactMessage, type DbCateringEnquiry } from "@/lib/supabase";

type Tab = "contact" | "catering";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// ── Contact Messages ──────────────────────────────────────────────────────────

function ContactMessages({ onRead }: { onRead?: () => void }) {
  const [messages,  setMessages]  = useState<DbContactMessage[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [showUnread, setShowUnread] = useState(false);
  const [expanded,  setExpanded]  = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages((data as DbContactMessage[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    onRead?.();
  };

  const filtered = messages.filter((m) => {
    if (showUnread && m.read) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input type="search" placeholder="Search messages…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div onClick={() => setShowUnread((v) => !v)}
            className={`w-9 h-5 rounded-full transition-all relative cursor-pointer ${showUnread ? "bg-[#D2691E]" : "bg-gray-200"}`}>
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${showUnread ? "left-4" : "left-0.5"}`} />
          </div>
          <span className="text-sm font-semibold text-[#333]/70">Unread only</span>
        </label>
        <button onClick={load}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm text-[#333]/60 hover:text-[#6F4E37] transition-all">
          <FiRefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EEE6DC]">
          <FiMessageSquare className="w-8 h-8 mx-auto mb-3 text-[#333]/20" />
          <p className="text-[#333]/30 text-sm">No messages found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((msg) => {
            const isExpanded = expanded === msg.id;
            return (
              <div key={msg.id}
                className={`bg-white rounded-2xl border transition-all ${!msg.read ? "border-[#D2691E]/30 shadow-sm" : "border-[#EEE6DC]"}`}>
                <button
                  onClick={() => {
                    setExpanded(isExpanded ? null : msg.id!);
                    if (!msg.read) markRead(msg.id!);
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${!msg.read ? "bg-[#D2691E]" : "bg-transparent"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-black text-[#1A0E07] truncate">{msg.name}</p>
                      {msg.subject && (
                        <span className="text-xs px-2 py-0.5 bg-[#F8F4EF] text-[#333]/50 rounded-full shrink-0 hidden sm:block">
                          {msg.subject}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#333]/50 truncate">{msg.message}</p>
                  </div>
                  <span className="text-xs text-[#333]/30 shrink-0">{timeAgo(msg.created_at!)}</span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-[#F8F4EF]">
                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-4">
                        <a href={`mailto:${msg.email}`}
                          className="flex items-center gap-1.5 text-sm text-[#D2691E] hover:underline">
                          <FiMail className="w-3.5 h-3.5" />{msg.email}
                        </a>
                        {msg.phone && (
                          <a href={`tel:${msg.phone}`}
                            className="flex items-center gap-1.5 text-sm text-[#D2691E] hover:underline">
                            <FiPhone className="w-3.5 h-3.5" />{msg.phone}
                          </a>
                        )}
                      </div>
                      <div className="bg-[#F8F4EF] rounded-xl p-4">
                        <p className="text-sm text-[#1A0E07]/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      <div className="flex gap-3">
                        <a href={`mailto:${msg.email}?subject=Re: ${msg.subject ?? "Your message"}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#D2691E]/10 text-[#D2691E] font-bold rounded-xl text-sm hover:bg-[#D2691E]/20 transition-all">
                          <FiExternalLink className="w-3.5 h-3.5" />Reply by email
                        </a>
                        {!msg.read && (
                          <button onClick={() => markRead(msg.id!)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 font-bold rounded-xl text-sm hover:bg-green-100 transition-all">
                            <FiCheck className="w-3.5 h-3.5" />Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <p className="text-xs text-[#333]/30 text-right">{filtered.length} message{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}

// ── Catering Enquiries ────────────────────────────────────────────────────────

function CateringEnquiries({ onRead }: { onRead?: () => void }) {
  const [enquiries, setEnquiries] = useState<DbCateringEnquiry[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [expanded,  setExpanded]  = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("catering_enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setEnquiries((data as DbCateringEnquiry[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const markReviewed = async (id: string) => {
    await supabase.from("catering_enquiries").update({ status: "reviewed" }).eq("id", id);
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: "reviewed" } : e)));
    onRead?.();
  };

  const filtered = enquiries.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      (e.event_type ?? "").toLowerCase().includes(q)
    );
  });

  const STATUS_COLOUR: Record<string, string> = {
    new:      "bg-amber-100 text-amber-700",
    reviewed: "bg-green-100 text-green-700",
    closed:   "bg-gray-100  text-gray-600",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
          <input type="search" placeholder="Search enquiries…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/40" />
        </div>
        <button onClick={load}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#EEE6DC] rounded-xl text-sm text-[#333]/60 hover:text-[#6F4E37] transition-all">
          <FiRefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="w-6 h-6 border-2 border-[#D2691E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EEE6DC]">
          <FiCalendar className="w-8 h-8 mx-auto mb-3 text-[#333]/20" />
          <p className="text-[#333]/30 text-sm">No catering enquiries yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((enq) => {
            const isExpanded = expanded === enq.id;
            const isNew      = !enq.status || enq.status === "new";
            return (
              <div key={enq.id}
                className={`bg-white rounded-2xl border transition-all ${isNew ? "border-[#D2691E]/30 shadow-sm" : "border-[#EEE6DC]"}`}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : enq.id!)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isNew ? "bg-[#D2691E]" : "bg-transparent"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-black text-[#1A0E07] truncate">{enq.name}</p>
                      {enq.event_type && (
                        <span className="text-xs px-2 py-0.5 bg-[#F8F4EF] text-[#333]/50 rounded-full shrink-0 hidden sm:block">
                          {enq.event_type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {enq.guest_count && (
                        <span className="flex items-center gap-1 text-xs text-[#333]/50">
                          <FiUsers className="w-3 h-3" />{enq.guest_count} guests
                        </span>
                      )}
                      {enq.event_date && (
                        <span className="flex items-center gap-1 text-xs text-[#333]/50">
                          <FiCalendar className="w-3 h-3" />{enq.event_date}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black capitalize ${STATUS_COLOUR[enq.status ?? "new"] ?? "bg-gray-100 text-gray-600"}`}>
                      {enq.status ?? "new"}
                    </span>
                    <span className="text-xs text-[#333]/30">{timeAgo(enq.created_at!)}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-[#F8F4EF]">
                    <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#333]/40 mb-0.5">Contact</p>
                        <a href={`mailto:${enq.email}`} className="text-[#D2691E] hover:underline block">{enq.email}</a>
                        {enq.phone && <a href={`tel:${enq.phone}`} className="text-[#D2691E] hover:underline block">{enq.phone}</a>}
                      </div>
                      {enq.budget && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-[#333]/40 mb-0.5">Budget</p>
                          <p className="text-[#1A0E07]">{enq.budget}</p>
                        </div>
                      )}
                      {enq.message && (
                        <div className="sm:col-span-2">
                          <p className="text-[10px] font-black uppercase tracking-wider text-[#333]/40 mb-0.5">Details</p>
                          <p className="bg-[#F8F4EF] rounded-xl p-3 text-sm text-[#1A0E07]/80 leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 mt-4">
                      <a href={`mailto:${enq.email}?subject=Your catering enquiry - Beans %26 Beyond`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#D2691E]/10 text-[#D2691E] font-bold rounded-xl text-sm hover:bg-[#D2691E]/20 transition-all">
                        <FiExternalLink className="w-3.5 h-3.5" />Reply by email
                      </a>
                      {isNew && (
                        <button onClick={() => markReviewed(enq.id!)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 font-bold rounded-xl text-sm hover:bg-green-100 transition-all">
                          <FiCheck className="w-3.5 h-3.5" />Mark reviewed
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <p className="text-xs text-[#333]/30 text-right">{filtered.length} enquir{filtered.length !== 1 ? "ies" : "y"}</p>
    </div>
  );
}

// ── Wrapper ───────────────────────────────────────────────────────────────────

export default function MessagesPanel({ onRead }: { onRead?: () => void }) {
  const [tab, setTab] = useState<Tab>("contact");

  return (
    <div className="space-y-5">
      {/* Tab switcher */}
      <div className="flex gap-2">
        <button onClick={() => setTab("contact")}
          className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all ${tab === "contact" ? "bg-[#1A0E07] text-white" : "bg-[#F8F4EF] text-[#6F4E37] hover:bg-[#EEE6DC]"}`}>
          Contact Messages
        </button>
        <button onClick={() => setTab("catering")}
          className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all ${tab === "catering" ? "bg-[#1A0E07] text-white" : "bg-[#F8F4EF] text-[#6F4E37] hover:bg-[#EEE6DC]"}`}>
          Catering Enquiries
        </button>
      </div>

      {tab === "contact"  && <ContactMessages  onRead={onRead} />}
      {tab === "catering" && <CateringEnquiries onRead={onRead} />}
    </div>
  );
}
