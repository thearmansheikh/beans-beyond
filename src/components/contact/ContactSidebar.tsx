import { FiMapPin, FiClock, FiNavigation } from "react-icons/fi";
import { FaSubway, FaBus, FaParking } from "react-icons/fa";
import { RESTAURANT, HOURS } from "@/utils/constants";

const TRANSPORT = [
  {
    Icon: FaSubway,
    mode: "Tube / DLR",
    detail: "Limehouse (DLR) — 5 min walk · Shadwell (Overground/DLR) — 8 min walk",
  },
  {
    Icon: FaBus,
    mode: "Bus",
    detail: "Routes D3, 15, 115 stop on Commercial Road right outside",
  },
  {
    Icon: FaParking,
    mode: "Parking",
    detail: "Free on-street parking on side roads after 6:30 pm weekdays & all day Sunday",
  },
];

export default function ContactSidebar() {
  return (
    <aside className="lg:col-span-2 space-y-6">

      {/* Address card */}
      <div className="rounded-2xl border border-[#EEE6DC] p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center">
            <FiMapPin className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-black text-[#1A0E07]">Find Us</h3>
        </div>
        <p className="text-[#333]/70 text-sm leading-relaxed mb-4">{RESTAURANT.address}</p>
        <a
          href={RESTAURANT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D2691E] hover:text-[#B5571A] transition-colors"
        >
          <FiNavigation className="w-3.5 h-3.5" />
          Open in Google Maps →
        </a>
      </div>

      {/* Hours card */}
      <div className="rounded-2xl border border-[#EEE6DC] p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6F4E37] to-[#9B6E50] flex items-center justify-center">
            <FiClock className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-black text-[#1A0E07]">Opening Hours</h3>
        </div>
        <ul className="space-y-2">
          {HOURS.map(({ day, open, close, closed }) => (
            <li key={day} className="flex justify-between text-sm">
              <span className="text-[#333]/55 w-24 shrink-0">{day}</span>
              {closed ? (
                <span className="text-red-500 font-semibold text-xs bg-red-50 px-2 py-0.5 rounded-full">Closed</span>
              ) : (
                <span className="text-[#1A0E07] font-medium tabular-nums whitespace-nowrap">{open} – {close}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* How to Find Us */}
      <div className="rounded-2xl border border-[#EEE6DC] p-6 bg-white">
        <h3 className="font-black text-[#1A0E07] mb-4">How to Get Here</h3>
        <ul className="space-y-4">
          {TRANSPORT.map(({ Icon, mode, detail }) => (
            <li key={mode} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#6F4E37]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#6F4E37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1A0E07] uppercase tracking-wide mb-0.5">{mode}</p>
                <p className="text-xs text-[#333]/60 leading-relaxed">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
