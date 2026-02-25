import { FiStar, FiMapPin, FiClock, FiShoppingBag, FiAward } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

const TRUST_ITEMS = [
  {
    icon: <FiStar className="w-4 h-4 text-yellow-400" />,
    value: `${RESTAURANT.rating} / 5`,
    label: `${RESTAURANT.reviewCount} Google reviews`,
    highlight: true,
  },
  {
    icon: <span className="text-base leading-none">☪️</span>,
    value: "100% Halal",
    label: "Certified kitchen",
    highlight: false,
  },
  {
    icon: <FiMapPin className="w-4 h-4 text-[#D2691E]" />,
    value: "East London",
    label: "Commercial Road, E14",
    highlight: false,
  },
  {
    icon: <FiClock className="w-4 h-4 text-[#D2691E]" />,
    value: "Open 7 days",
    label: "From 7am daily",
    highlight: false,
  },
  {
    icon: <FiShoppingBag className="w-4 h-4 text-[#D2691E]" />,
    value: "Order online",
    label: "Deliveroo · Uber Eats · Just Eat",
    highlight: false,
  },
  {
    icon: <FiAward className="w-4 h-4 text-[#D2691E]" />,
    value: "Est. 2018",
    label: "Proudly serving E14",
    highlight: false,
  },
];

export default function TrustStrip() {
  return (
    <div className="bg-[#1A0E07] border-y border-white/6">
      <div className="container-site">
        <div className="flex items-stretch gap-0 overflow-x-auto scrollbar-hide divide-x divide-white/8">
          {TRUST_ITEMS.map(({ icon, value, label, highlight }) => (
            <div
              key={value}
              className={`shrink-0 flex items-center gap-3 px-6 py-4 min-w-[160px] sm:flex-1 ${
                highlight ? "bg-[#D2691E]/10" : ""
              }`}
            >
              <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white/5">
                {icon}
              </span>
              <div className="min-w-0">
                <p className={`font-black text-sm leading-tight ${highlight ? "text-[#E8944A]" : "text-white"}`}>
                  {value}
                </p>
                <p className="text-white/38 text-[11px] mt-0.5 whitespace-nowrap">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
