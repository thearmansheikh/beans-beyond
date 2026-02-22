import { RESTAURANT } from "@/utils/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactInfo from "./ContactInfo";
import OpeningHours from "./OpeningHours";

export default function Location() {
  return (
    <section className="pt-20 md:pt-24 pb-12 bg-[#FDFAF7]">
      <div className="container-site">

        <SectionHeader eyebrow="Find Us" title="Visit Us Today" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Google Maps embed ── */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-80 lg:h-[480px]">
            <iframe
              src={RESTAURANT.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Beans & Beyond location map"
            />
          </div>

          {/* ── Info panel ── */}
          <div className="space-y-6">
            <ContactInfo />

            <div className="bg-[#F8F8F8] rounded-2xl p-6">
              <h3 className="font-black text-[#6F4E37] text-xl mb-4">
                Opening Hours
              </h3>
              <OpeningHours variant="light" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
