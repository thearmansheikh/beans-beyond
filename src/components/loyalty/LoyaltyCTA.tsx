"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function LoyaltyCTA() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#1A0E07] via-[#2C1810] to-[#1A0E07] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#D2691E]/10 blur-[120px] pointer-events-none" />
      <div className="relative z-10 container-site text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2691E]/20 border border-[#D2691E]/30 text-[#E8944A] text-sm font-bold mb-6">
          🚀 Launching soon
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Be the first to earn points
        </h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Join the waitlist now and get <strong className="text-[#E8944A]">50 bonus points</strong> when
          we launch — enough for a free filter coffee on us.
        </p>

        {joined ? (
          <div className="inline-flex items-center gap-3 bg-green-900/30 border border-green-500/30 rounded-2xl px-8 py-4 text-white">
            <FiCheck className="w-5 h-5 text-green-400" />
            <span className="font-bold">You&rsquo;re on the list — we&rsquo;ll see you soon!</span>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-sm w-full mx-auto justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E]/60 transition-all"
            />
            <button
              type="submit"
              className="shrink-0 px-8 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#D2691E]/30 whitespace-nowrap"
            >
              Join waitlist
            </button>
          </form>
        )}

        <div className="mt-10">
          <Link
            href="/"
            className="text-white/30 hover:text-white/60 text-sm transition-colors flex items-center gap-1.5 justify-center"
          >
            ← Back to {RESTAURANT.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
