import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function AllergensDisclaimer() {
  return (
    <section className="bg-white border-t border-[#EEE6DC] py-10">
      <div className="container-site max-w-3xl">
        <div className="flex gap-4 p-6 bg-[#F8F4EF] border border-[#EEE6DC] rounded-2xl">
          <FiAlertTriangle className="w-5 h-5 text-[#D2691E] shrink-0 mt-0.5" />
          <div className="text-sm text-[#1A0E07]/75 leading-relaxed space-y-2">
            <p>
              <strong>Important:</strong> Allergen information is provided in good faith based on standard
              recipes. Dishes may be subject to seasonal changes, supplier variations, or preparation method
              differences which can affect allergen content.
            </p>
            <p>
              Our kitchen is <strong>not allergen-free</strong>. Cross-contamination may occur during
              preparation. If you have a severe or life-threatening allergy, please speak directly to
              a member of staff before ordering.
            </p>
            <p>
              For the most accurate information contact us on{" "}
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="font-bold underline underline-offset-2 hover:text-[#D2691E] transition-colors"
              >
                {RESTAURANT.phone}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${RESTAURANT.email}`}
                className="font-bold underline underline-offset-2 hover:text-[#D2691E] transition-colors"
              >
                {RESTAURANT.email}
              </a>.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
          <p className="text-xs text-[#333]/40">
            Last updated: February 2026 · Beans &amp; Beyond, 819 Commercial Rd, London E14 7HG
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-md shadow-[#D2691E]/20"
          >
            Back to Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
