"use client";

import { FiPhone, FiInfo, FiCoffee, FiGrid, FiCheck, FiSmile, FiClock, FiUsers, FiHeart } from "react-icons/fi";
import type { IconType } from "react-icons";
import { RESTAURANT, HOURS } from "@/utils/constants";

const PERKS: { Icon: IconType; title: string; desc: string }[] = [
  { Icon: FiCoffee, title: "Specialty coffee",    desc: "Freshly pulled espresso drinks and filter coffee." },
  { Icon: FiGrid,   title: "Full breakfast menu", desc: "Cooked to order from our award-winning breakfast range." },
  { Icon: FiCheck,  title: "100% Halal",          desc: "Every dish and drink is certified Halal." },
  { Icon: FiSmile,  title: "Warm welcome",         desc: "Friendly staff who'll make your visit special." },
];

const POLICIES: { Icon: IconType; text: string }[] = [
  { Icon: FiClock, text: "Tables held for 15 minutes past booking time." },
  { Icon: FiUsers, text: "For parties over 12, please call us directly." },
  { Icon: FiInfo,  text: "Step-free access available — mention it in your notes." },
  { Icon: FiHeart, text: "Well-behaved dogs welcome in our outdoor area." },
];

export default function BookSidebar() {
  const todayName = new Date().toLocaleDateString("en-GB", { weekday: "long" });

  return (
    <div className="lg:col-span-2 space-y-6">

      {/* What to expect */}
      <div className="bg-white rounded-3xl border border-[#EEE6DC] p-7">
        <h2 className="font-black text-[#1A0E07] mb-5">What to expect</h2>
        <div className="space-y-5">
          {PERKS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center shrink-0 shadow-sm shadow-[#D2691E]/20">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#1A0E07] text-sm">{title}</p>
                <p className="text-[#333]/50 text-xs leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opening hours */}
      <div className="bg-white rounded-3xl border border-[#EEE6DC] p-7">
        <h2 className="font-black text-[#1A0E07] mb-5">Opening Hours</h2>
        <ul className="space-y-2.5">
          {HOURS.map(({ day, open, close, closed }) => {
            const isToday = day === todayName;
            return (
              <li
                key={day}
                className={`flex items-center justify-between text-sm ${isToday ? "font-bold" : ""}`}
              >
                <span className={isToday ? "text-[#D2691E]" : "text-[#333]/55"}>
                  {day}{isToday && " (today)"}
                </span>
                {closed ? (
                  <span className="text-red-400 text-xs font-semibold">Closed</span>
                ) : (
                  <span className={`tabular-nums text-xs ${isToday ? "text-[#D2691E]" : "text-[#333]/55"}`}>
                    {open} – {close}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Policies */}
      <div className="bg-[#FFF8F2] border border-[#EEE6DC] rounded-3xl p-7">
        <div className="flex items-center gap-2 mb-5">
          <FiInfo className="w-4 h-4 text-[#D2691E]" />
          <h2 className="font-black text-[#1A0E07]">Good to know</h2>
        </div>
        <ul className="space-y-3.5">
          {POLICIES.map(({ Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm text-[#333]/65">
              <Icon className="w-4 h-4 shrink-0 mt-0.5 text-[#6F4E37]/60" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Call CTA */}
      <div className="bg-[#1A0E07] rounded-3xl p-7 text-center">
        <p className="text-white/60 text-sm mb-3">Prefer to book by phone?</p>
        <a
          href={`tel:${RESTAURANT.phone}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/30 text-sm"
        >
          <FiPhone className="w-4 h-4" />
          {RESTAURANT.phone}
        </a>
      </div>

    </div>
  );
}
