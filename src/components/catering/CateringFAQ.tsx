"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQS = [
  { q: "How far in advance do I need to book?",          a: "We recommend at least 5 business days for smaller events, and 2–3 weeks for larger gatherings. Last-minute bookings may be possible — just call us." },
  { q: "Is all your catering food Halal certified?",     a: "Yes, 100%. Every ingredient and dish is fully Halal certified. We have a strict Halal-only policy across all catering services." },
  { q: "Do you cater outside East London?",              a: "Our primary service area is East and Central London. We can accommodate events further afield — a travel fee may apply." },
  { q: "Can you accommodate dietary requirements?",      a: "Absolutely. We offer vegetarian, vegan, and gluten-free options across all packages. Just let us know when enquiring." },
  { q: "What's your minimum order for delivery?",        a: "Our minimum catering order is for 10 people. There's no upper limit — we've catered events of 300+." },
];

function FAQRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#EEE6DC] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-bold text-[#1A0E07] group-hover:text-[#D2691E] transition-colors">
          {q}
        </span>
        <FiChevronDown
          className={`w-5 h-5 text-[#D2691E] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-5" : "max-h-0"}`}>
        <p className="text-[#333]/65 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function CateringFAQ() {
  return (
    <section className="section-padding bg-[#F8F4EF]">
      <div className="container-site">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Common questions</h2>
          </div>
          <div className="bg-white rounded-3xl border border-[#EEE6DC] px-8">
            {FAQS.map(({ q, a }) => (
              <FAQRow key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
