"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FiCalendar, FiClock, FiUsers, FiCheck, FiArrowRight } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

type FormData = {
  name:     string;
  email:    string;
  phone:    string;
  date:     string;
  time:     string;
  guests:   string;
  occasion: string;
  notes:    string;
};

const DEFAULT_FORM: FormData = {
  name: "", email: "", phone: "",
  date: "", time: "", guests: "2", occasion: "", notes: "",
};

const TIME_SLOTS = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00",
];

const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const OCCASIONS = [
  "Just a meal",
  "Birthday celebration",
  "Anniversary",
  "Business lunch / meeting",
  "Family gathering",
  "Other",
];

const INPUT_CLASS =
  "w-full px-4 py-3.5 bg-[#F8F4EF] border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all";

export default function BookingForm() {
  const [form, setForm]           = useState<FormData>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [ref]                     = useState(() =>
    "BB-" + Math.random().toString(36).slice(2, 7).toUpperCase()
  );

  const set = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase.from("bookings").insert({
      name:       form.name,
      email:      form.email,
      phone:      form.phone,
      date:       form.date,
      time:       form.time,
      party_size: parseInt(form.guests),
      notes:      form.notes || undefined,
    });
    setLoading(false);
    if (dbError) {
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }
    setSubmitted(true);
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="lg:col-span-3">
      {submitted ? (
        <div className="bg-white rounded-3xl border border-[#EEE6DC] p-10 text-center shadow-sm">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <FiCheck className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 animate-ping opacity-75" />
          </div>
          <h2 className="text-2xl font-black text-[#1A0E07] mb-2">Booking Requested!</h2>
          <p className="text-[#333]/55 mb-6 max-w-sm mx-auto leading-relaxed">
            Thanks <strong className="text-[#1A0E07]">{form.name.split(" ")[0]}</strong>!
            We&rsquo;ll confirm your reservation at <strong className="text-[#1A0E07]">{form.email}</strong> within the hour.
          </p>

          {/* Booking summary */}
          <div className="bg-[#F8F4EF] rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-[#333]/40 mb-4">Your booking</p>
            <div className="flex justify-between text-sm">
              <span className="text-[#333]/50">Reference</span>
              <span className="font-black text-[#D2691E]">{ref}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#333]/50">Date</span>
              <span className="font-bold text-[#1A0E07]">{form.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#333]/50">Time</span>
              <span className="font-bold text-[#1A0E07]">{form.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#333]/50">Party size</span>
              <span className="font-bold text-[#1A0E07]">
                {form.guests} {parseInt(form.guests) === 1 ? "guest" : "guests"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setForm(DEFAULT_FORM); setSubmitted(false); }}
              className="px-6 py-3 border-2 border-[#6F4E37] text-[#6F4E37] font-bold rounded-xl hover:bg-[#6F4E37] hover:text-white transition-all text-sm"
            >
              Make another booking
            </button>
            <Link
              href="/menu"
              className="px-6 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-md shadow-[#D2691E]/20"
            >
              Browse our menu
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-[#EEE6DC] p-8 sm:p-10 shadow-sm space-y-6"
        >
          <div>
            <h2 className="text-2xl font-black text-[#1A0E07] mb-1">Your details</h2>
            <p className="text-[#333]/45 text-sm">We&rsquo;ll send confirmation to your email.</p>
          </div>

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">Full Name *</label>
              <input type="text" required value={form.name} onChange={set("name")} placeholder="Your name" className={INPUT_CLASS} />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">Email Address *</label>
              <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" className={INPUT_CLASS} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">Phone Number *</label>
            <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+44 7700 000000" className={INPUT_CLASS} />
          </div>

          <div className="border-t border-[#EEE6DC] pt-6">
            <h3 className="text-lg font-black text-[#1A0E07] mb-5">Reservation details</h3>
          </div>

          {/* Date + Time */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">
                <FiCalendar className="inline w-3 h-3 mr-1" />Date *
              </label>
              <input type="date" required value={form.date} onChange={set("date")} min={minDate} className={INPUT_CLASS} />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">
                <FiClock className="inline w-3 h-3 mr-1" />Preferred Time *
              </label>
              <select required value={form.time} onChange={set("time")} className={`${INPUT_CLASS} appearance-none`}>
                <option value="" disabled>Select time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Party size + Occasion */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">
                <FiUsers className="inline w-3 h-3 mr-1" />Party Size *
              </label>
              <select required value={form.guests} onChange={set("guests")} className={`${INPUT_CLASS} appearance-none`}>
                {PARTY_SIZES.map((n) => (
                  <option key={n} value={n}>
                    {n} {parseInt(n) === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">Occasion</label>
              <select value={form.occasion} onChange={set("occasion")} className={`${INPUT_CLASS} appearance-none`}>
                <option value="">No special occasion</option>
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special requests */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#333]/45 mb-2">Special Requests</label>
            <textarea
              rows={4}
              value={form.notes} onChange={set("notes")}
              placeholder="Dietary requirements, accessibility needs, high chair, celebration arrangements..."
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>

          {/* Submit */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/25 text-base flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
            ) : (
              <>Request Table<FiArrowRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-center text-xs text-[#333]/40">
            We&rsquo;ll confirm within the hour by email. No payment required to book.
          </p>
        </form>
      )}
    </div>
  );
}
