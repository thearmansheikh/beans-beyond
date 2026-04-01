"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiX, FiShield } from "react-icons/fi";

const COOKIE_KEY = "bb-cookie-consent-v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      // Small delay so it doesn't flash on initial load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "essential-only");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-2xl mx-auto bg-[#1A0E07] text-white rounded-2xl shadow-2xl shadow-black/40 border border-white/8 overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#D2691E] via-[#E8944A] to-[#D2691E]" />

        <div className="px-5 py-5 sm:px-6">
          <div className="flex gap-4 items-start">
            {/* Icon */}
            <div className="shrink-0 w-10 h-10 rounded-xl bg-[#D2691E]/15 flex items-center justify-center">
              <FiShield className="w-5 h-5 text-[#D2691E]" />
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0">
              <p className="font-black text-white text-sm leading-tight mb-1">
                We use cookies 🍪
              </p>
              <p className="text-white/55 text-xs leading-relaxed">
                We use essential cookies to make this site work, and optional analytics cookies to
                understand how visitors use it. Read our{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-[#D2691E] transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                to learn more.
              </p>
            </div>

            {/* Dismiss (reject) */}
            <button
              onClick={reject}
              aria-label="Use essential cookies only"
              className="shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col xs:flex-row gap-2 mt-4 sm:pl-14">
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#D2691E] text-white text-sm font-bold rounded-xl hover:bg-[#B5571A] transition-all shadow-md shadow-[#D2691E]/25 active:scale-[0.97]"
            >
              Accept All
            </button>
            <button
              onClick={reject}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-white/8 text-white/70 text-sm font-semibold rounded-xl hover:bg-white/14 hover:text-white transition-all active:scale-[0.97]"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
