"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiRefreshCw, FiHome, FiMail } from "react-icons/fi";

interface Props {
  error:  Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    // Log to error monitoring service in production
    console.error("[Beans & Beyond] Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] opacity-15 rotate-6" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center shadow-xl shadow-[#D2691E]/30">
            <span className="text-4xl leading-none">☕</span>
          </div>
        </div>

        {/* Headline */}
        <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">
          Something went wrong
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A0E07] leading-tight mb-4">
          We spilled the coffee
        </h1>
        <p className="text-[#333]/55 leading-relaxed mb-8 max-w-sm mx-auto">
          An unexpected error occurred. Our team has been notified. In the meantime,
          try refreshing the page or head back home.
        </p>

        {/* Error digest (for debugging) */}
        {error.digest && (
          <p className="text-xs text-[#333]/30 font-mono mb-6">
            Reference: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#B5571A] transition-all shadow-md shadow-[#D2691E]/20 text-sm active:scale-[0.97]"
          >
            <FiRefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#6F4E37]/20 text-[#6F4E37] font-bold rounded-xl hover:border-[#6F4E37] hover:bg-[#6F4E37]/5 transition-all text-sm"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
          <a
            href="mailto:hello@bbcafe.co.uk"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-[#333]/60 font-bold rounded-xl hover:border-gray-300 hover:text-[#333] transition-all text-sm"
          >
            <FiMail className="w-4 h-4" />
            Contact Us
          </a>
        </div>

      </div>
    </div>
  );
}
