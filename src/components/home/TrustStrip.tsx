import { RESTAURANT } from "@/utils/constants";

const TRUST_ITEMS = [
  { icon: "★",  value: `${RESTAURANT.rating} / 5`, label: `${RESTAURANT.reviewCount} Google reviews`, accent: true  },
  { icon: "☪️", value: "100% Halal",               label: "Certified kitchen",                        accent: false },
  { icon: "📍", value: "East London",               label: "Commercial Road E14",                      accent: false },
  { icon: "🕐", value: "Open 7 Days",               label: "From 7am daily",                           accent: false },
  { icon: "🚴", value: "Order Online",              label: "Deliveroo · Uber Eats · Just Eat",         accent: false },
  { icon: "🏆", value: "Est. 2018",                 label: "Proudly serving E14",                      accent: false },
  { icon: "🍳", value: "Fresh Daily",               label: "Made every morning",                       accent: false },
  { icon: "♻️", value: "Eco-Conscious",             label: "Zero food-waste kitchen",                  accent: false },
];

/* Duplicate for seamless infinite loop */
const DOUBLED = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustStrip() {
  return (
    <div
      className="marquee-wrap bg-[#150C06] border-y border-white/6 overflow-hidden"
      aria-label="Trust highlights"
    >
      <div
        className="flex animate-marquee"
        style={{ "--marquee-duration": "34s" } as React.CSSProperties}
        aria-hidden
      >
        {DOUBLED.map(({ icon, value, label, accent }, i) => (
          <div
            key={i}
            className={`shrink-0 flex items-center gap-3 px-7 py-[14px] border-r border-white/8 min-w-max transition-colors ${
              accent ? "bg-[#D2691E]/8" : ""
            }`}
          >
            {/* Icon bubble */}
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/6 text-base leading-none shrink-0">
              {icon}
            </span>

            {/* Text */}
            <div>
              <p
                className={`font-black text-sm leading-tight ${
                  accent ? "text-[#E8944A]" : "text-white"
                }`}
              >
                {value}
              </p>
              <p className="text-white/35 text-[11px] mt-0.5 whitespace-nowrap">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
