import { FiNavigation } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function ContactMap() {
  return (
    <section className="bg-[#F8F4EF]">
      <div className="container-site py-12">
        <div className="rounded-2xl overflow-hidden border border-[#EEE6DC] shadow-sm">
          <iframe
            title="Beans & Beyond location"
            src={RESTAURANT.googleMapsEmbed}
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#333]/60">
            <strong className="text-[#1A0E07]">Beans &amp; Beyond</strong> · {RESTAURANT.address}
          </p>
          <a
            href={RESTAURANT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D2691E] hover:text-[#B5571A] transition-colors"
          >
            <FiNavigation className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
