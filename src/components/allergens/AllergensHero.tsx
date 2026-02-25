import { FiAlertTriangle } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

export default function AllergensHero() {
  return (
    <section className="bg-[#D2691E] py-12 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }}
      />
      <div className="relative container-site">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/15 flex items-center justify-center shrink-0 mt-1">
            <FiAlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Allergen Information</h1>
            <p className="text-white/85 leading-relaxed max-w-2xl">
              The information below is correct at time of publishing and updated when recipes change.
              Our kitchen handles <strong>gluten, dairy, eggs, nuts, and other allergens</strong> —
              cross-contamination is possible. If you have a severe allergy, please speak to a member
              of staff before ordering.
            </p>
            <p className="text-white/60 text-sm mt-3">
              For up-to-date information call us on{" "}
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="text-white font-semibold underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                {RESTAURANT.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
