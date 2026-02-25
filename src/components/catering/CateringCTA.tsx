import { FiArrowRight, FiMail } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function CateringCTA() {
  return (
    <section className="py-20 bg-[#1A0E07] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#D2691E]/10 blur-[100px] pointer-events-none" />
      <div className="relative z-10 container-site text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Ready to plan your event?
        </h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Get in touch today and let&rsquo;s create something memorable together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#enquire"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#D2691E]/30"
          >
            Get a Free Quote
            <FiArrowRight className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${RESTAURANT.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
          >
            <FiMail className="w-4 h-4" />
            {RESTAURANT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
