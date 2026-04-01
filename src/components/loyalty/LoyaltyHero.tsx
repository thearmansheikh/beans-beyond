"use client";

import { useState, type FormEvent } from "react";
import { FiStar, FiCheck, FiArrowRight, FiGift, FiZap, FiAward, FiCoffee, FiDroplet } from "react-icons/fi";

const QUICK_STATS = [
  { icon: <FiGift  className="w-5 h-5" />, value: "Free rewards",   sub: "from day one" },
  { icon: <FiZap   className="w-5 h-5" />, value: "Earn every £1",  sub: "you spend" },
  { icon: <FiAward className="w-5 h-5" />, value: "3 tiers",        sub: "of membership" },
  { icon: <FiCoffee className="w-5 h-5" />, value: "Free coffee",   sub: "at 100 points" },
];

const FLOAT_POSITIONS = ["top-12 left-[8%]", "top-24 right-[12%]", "bottom-10 left-[20%]", "bottom-20 right-[8%]"];

export default function LoyaltyHero() {
  const [email,   setEmail]   = useState("");
  const [joined,  setJoined]  = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
    } finally {
      setLoading(false);
      setJoined(true);
    }
  };

  return (
    <section className="relative bg-[#1A0E07] overflow-hidden pt-16 pb-28">
      {/* Ambient blobs */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#D2691E]/12 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#6F4E37]/20 blur-[100px] pointer-events-none" />

      {/* Scattered floating accents */}
      {FLOAT_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-8 h-8 rounded-full bg-[#D2691E]/20 border border-[#D2691E]/15 backdrop-blur-sm flex items-center justify-center`}
        >
          {i % 2 === 0
            ? <FiCoffee  className="w-3.5 h-3.5 text-[#D2691E]/60" />
            : <FiDroplet className="w-3.5 h-3.5 text-[#D2691E]/60" />
          }
        </div>
      ))}

      <div className="relative z-10 container-site text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2691E]/20 border border-[#D2691E]/30 text-[#E8944A] text-sm font-bold mb-8">
          <FiStar className="w-4 h-4" />
          Coming Soon · Loyalty Programme
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.03] mb-6">
          Every sip.<br />
          <span className="text-gradient-warm">Rewarded.</span>
        </h1>
        <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto mb-12">
          The Beans &amp; Beyond loyalty programme is on its way.
          Earn points on every visit, unlock exclusive rewards, and level up to Reserve status.
        </p>

        {/* Email capture */}
        {joined ? (
          <div className="inline-flex flex-col items-center gap-4 bg-[#D2691E]/15 border border-[#D2691E]/30 rounded-3xl px-10 py-8 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center shadow-lg shadow-[#D2691E]/30">
              <FiCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-lg">You&rsquo;re on the list!</p>
              <p className="text-white/50 text-sm mt-1">
                We&rsquo;ll notify <strong className="text-white/80">{email}</strong> when we launch.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E]/60 focus:border-[#D2691E] transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 px-8 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#D2691E]/30 whitespace-nowrap flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? "…" : "Notify me"}
              {!loading && <FiArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}

        <p className="text-white/25 text-xs mt-4">No spam. Just a heads-up when we go live.</p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-16 pt-10 border-t border-white/8">
          {QUICK_STATS.map(({ icon, value, sub }) => (
            <div key={value} className="flex flex-col items-center gap-2 text-center">
              <div className="w-11 h-11 rounded-xl bg-[#D2691E]/20 border border-[#D2691E]/25 flex items-center justify-center text-[#E8944A]">
                {icon}
              </div>
              <p className="font-black text-white text-base leading-tight">{value}</p>
              <p className="text-white/35 text-xs">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
