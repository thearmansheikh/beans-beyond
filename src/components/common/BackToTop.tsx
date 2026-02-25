"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-30 w-11 h-11 rounded-full bg-[#1A0E07]/80 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-[#D2691E] hover:border-[#D2691E] transition-all duration-300 shadow-lg ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FiArrowUp className="w-4 h-4" />
    </button>
  );
}
