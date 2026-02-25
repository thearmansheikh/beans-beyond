"use client";

import { FiCalendar, FiClock } from "react-icons/fi";
import { HOURS } from "@/utils/constants";

export default function BookHero() {
  const todayName = new Date().toLocaleDateString("en-GB", { weekday: "long" });
  const todayHours = HOURS.find((h) => h.day === todayName);

  return (
    <section className="relative bg-[#1A0E07] overflow-hidden py-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D2691E]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#6F4E37]/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-site">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2691E]/20 border border-[#D2691E]/30 text-[#E8944A] text-sm font-bold mb-6">
            <FiCalendar className="w-4 h-4" />
            Table Reservations
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
            Reserve your table<br />
            <span className="text-gradient-warm">at Beans &amp; Beyond</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-8">
            Book a table online for breakfast, brunch, or lunch. Walk-ins always
            welcome, but we&rsquo;d love to have your spot ready when you arrive.
          </p>

          {/* Today's hours pill */}
          {todayHours && (
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/15 rounded-2xl text-white/75 text-sm">
              <FiClock className="w-4 h-4 text-[#D2691E]" />
              <span>
                <strong className="text-white">{todayName}</strong>{" "}
                {todayHours.closed ? "Closed" : `${todayHours.open} – ${todayHours.close}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
