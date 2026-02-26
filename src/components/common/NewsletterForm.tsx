"use client";

import { useState } from "react";
import { FiMail, FiArrowRight, FiCheck } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

export default function NewsletterForm() {
  const [email, setEmail]     = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from("newsletter_subscribers").upsert({ email }, { onConflict: "email" });
    setLoading(false);
    setSuccess(true);
    setEmail("");
  };

  if (success) {
    return (
      <div className="flex items-center gap-3 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl">
        <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <FiCheck className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">You&rsquo;re in!</p>
          <p className="text-white/60 text-xs">Check your inbox for your 10% off code.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full pl-11 pr-4 py-4 rounded-xl text-[#1A0E07] text-sm font-medium placeholder-[#333]/40 focus:outline-none focus:ring-2 focus:ring-[#D2691E] bg-white shadow-inner"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-7 py-4 bg-[#D2691E] text-white font-black rounded-xl hover:bg-[#B5571A] transition-all text-sm shrink-0 shadow-lg shadow-[#D2691E]/30 hover:scale-105 disabled:opacity-70"
      >
        {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Subscribe</span><FiArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}
