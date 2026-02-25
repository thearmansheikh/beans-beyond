import Image from "next/image";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

const STATS = [
  { value: "100%", label: "Halal Certified" },
  { value: "10+",  label: "Guest minimum" },
  { value: "300+", label: "Max capacity" },
  { value: "24h",  label: "Response time" },
];

export default function CateringHero() {
  return (
    <section className="relative bg-[#1A0E07] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=75"
          alt="Catering spread"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority
        />
      </div>
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D2691E]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#6F4E37]/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-site pt-20 pb-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D2691E]/20 border border-[#D2691E]/30 text-[#E8944A] text-sm font-bold mb-6">
            🍽️ Catering &amp; Events
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6">
            We bring the café<br />
            <span className="text-gradient-warm">to your event.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
            From intimate office breakfasts to large-scale Eid celebrations —
            fresh food, specialty coffee, and 100% Halal catering delivered
            anywhere in London.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl shadow-xl shadow-[#D2691E]/30 hover:opacity-90 transition-all"
            >
              Get a Quote
              <FiArrowRight className="w-5 h-5" />
            </a>
            <a
              href={`tel:${RESTAURANT.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
            >
              <FiPhone className="w-4 h-4" />
              Call Us
            </a>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-white/45 text-xs uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
