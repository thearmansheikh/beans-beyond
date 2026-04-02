import { FiCheck, FiUsers, FiArrowRight, FiCoffee, FiGrid, FiAward } from "react-icons/fi";
import type { IconType } from "react-icons";

const PACKAGES: {
  name: string; Icon: IconType; guests: string; price: string; unit: string;
  minimum: string; colour: string; badge: string; includes: string[];
}[] = [
  {
    name:  "Essential",
    Icon:  FiCoffee,
    guests: "Up to 20",
    price: "From £8",
    unit:  "per head",
    minimum: "Min. 10 guests",
    colour: "border-gray-200 bg-white",
    badge:  "",
    includes: [
      "Selection of hot drinks",
      "Assorted pastries & baked goods",
      "Seasonal fruit platter",
      "Disposable cups & napkins",
    ],
  },
  {
    name:  "Deluxe",
    Icon:  FiGrid,
    guests: "Up to 50",
    price: "From £15",
    unit:  "per head",
    minimum: "Min. 15 guests",
    colour: "border-[#D2691E] bg-[#D2691E]/3",
    badge:  "Most Popular",
    includes: [
      "Full hot drinks bar (barista-style)",
      "Pastries, wraps & finger sandwiches",
      "Hot breakfast items (eggs, halal meats)",
      "Dessert & sweet bites",
      "Branded setup with signage",
    ],
  },
  {
    name:  "Premium",
    Icon:  FiAward,
    guests: "50 +",
    price: "From £22",
    unit:  "per head",
    minimum: "Min. 30 guests",
    colour: "border-[#6F4E37] bg-[#1A0E07] text-white",
    badge:  "Full Service",
    includes: [
      "Everything in Deluxe",
      "Dedicated staff on-site",
      "Full hot & cold buffet spread",
      "Custom branded menu boards",
      "Post-event clean-up",
    ],
  },
];

export default function CateringPackages() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">Catering packages</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Choose your package</h2>
          <p className="text-[#333]/50 mt-3 max-w-md mx-auto">
            All prices are indicative. Final quotes are tailored to your exact requirements.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PACKAGES.map(({ name, Icon, guests, price, unit, minimum, colour, badge, includes }) => {
            const isDark = name === "Premium";
            return (
              <div
                key={name}
                className={`relative rounded-3xl border-2 p-8 flex flex-col ${colour} ${isDark ? "" : "bg-white"}`}
              >
                {badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black shadow-lg whitespace-nowrap ${
                    isDark ? "bg-white text-[#1A0E07]" : "bg-[#D2691E] text-white"
                  }`}>
                    {badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? "bg-white/10" : "bg-[#F8F4EF]"}`}>
                  <Icon className={`w-6 h-6 ${isDark ? "text-[#E8944A]" : "text-[#D2691E]"}`} />
                </div>
                <h3 className={`text-xl font-black mb-1 ${isDark ? "text-white" : "text-[#1A0E07]"}`}>{name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-black ${isDark ? "text-[#E8944A]" : "text-[#D2691E]"}`}>{price}</span>
                  <span className={`text-sm ${isDark ? "text-white/50" : "text-[#333]/40"}`}>{unit}</span>
                </div>
                <p className={`text-xs flex items-center gap-1.5 ${isDark ? "text-white/50" : "text-[#333]/40"}`}>
                  <FiUsers className="w-3 h-3" />{guests} guests
                </p>
                <p className={`text-xs mb-6 mt-1 font-semibold ${isDark ? "text-white/40" : "text-[#333]/35"}`}>
                  {minimum}
                </p>
                <ul className="space-y-3 flex-1">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <FiCheck className={`w-4 h-4 mt-0.5 shrink-0 ${isDark ? "text-[#E8944A]" : "text-[#D2691E]"}`} />
                      <span className={isDark ? "text-white/75" : "text-[#333]/65"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#enquire"
                  className={`mt-8 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                    isDark
                      ? "bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white hover:opacity-90"
                      : "border-2 border-[#D2691E] text-[#D2691E] hover:bg-[#D2691E] hover:text-white"
                  }`}
                >
                  Request this package
                  <FiArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
