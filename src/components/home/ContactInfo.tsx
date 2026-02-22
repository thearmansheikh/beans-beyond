import { FiMapPin, FiPhone, FiMail, FiNavigation } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function ContactInfo() {
  return (
    <div className="bg-[#F8F8F8] rounded-2xl p-6 space-y-4">
      <h3 className="font-black text-[#6F4E37] text-xl mb-4">
        Contact &amp; Directions
      </h3>

      {/* Address */}
      <div className="flex gap-3 items-start">
        <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 flex items-center justify-center shrink-0">
          <FiMapPin className="w-4 h-4 text-[#6F4E37]" />
        </div>
        <div>
          <p className="font-semibold text-[#333] text-sm">Address</p>
          <p className="text-[#333]/60 text-sm">{RESTAURANT.address}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6F4E37] text-white text-xs font-bold rounded-lg hover:bg-[#4A3425] transition-all"
            >
              <FiNavigation className="w-3 h-3" />
              Get Directions
            </a>
            {RESTAURANT.halal && (
              <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-lg">
                ✓ Halal
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 flex items-center justify-center shrink-0">
          <FiPhone className="w-4 h-4 text-[#6F4E37]" />
        </div>
        <div>
          <p className="font-semibold text-[#333] text-sm">Phone</p>
          <a
            href={`tel:${RESTAURANT.phone}`}
            className="text-[#D2691E] text-sm hover:underline"
          >
            {RESTAURANT.phone}
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 flex items-center justify-center shrink-0">
          <FiMail className="w-4 h-4 text-[#6F4E37]" />
        </div>
        <div>
          <p className="font-semibold text-[#333] text-sm">Email</p>
          <a
            href={`mailto:${RESTAURANT.email}`}
            className="text-[#D2691E] text-sm hover:underline"
          >
            {RESTAURANT.email}
          </a>
        </div>
      </div>
    </div>
  );
}
