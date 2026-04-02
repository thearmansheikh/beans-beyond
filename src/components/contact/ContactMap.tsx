import { FiNavigation, FiMapPin } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function ContactMap() {
  return (
    <section className="bg-[#1A0E07]">
      {/* Branded header strip */}
      <div className="container-site py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[#D2691E] text-xs font-bold uppercase tracking-widest mb-2">Location</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">Find us on the map</h2>
            <p className="text-white/40 text-sm mt-1 flex items-center gap-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-[#D2691E]" />
              {RESTAURANT.address}
            </p>
          </div>
          <a
            href={RESTAURANT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white text-sm font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/30 whitespace-nowrap self-start sm:self-auto"
          >
            <FiNavigation className="w-4 h-4" />
            Get Directions
          </a>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          <iframe
            title="Beans & Beyond location"
            src={RESTAURANT.googleMapsEmbed}
            width="100%"
            height="440"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
