import { FiCheck, FiCoffee, FiStar, FiAward } from "react-icons/fi";
import type { IconType } from "react-icons";

const TIERS: {
  name: string; Icon: IconType; colour: string;
  bg: string; text: string; checkColor: string; points: string; perks: string[];
}[] = [
  {
    name:       "Brew",
    Icon:       FiCoffee,
    colour:     "from-[#6F4E37] to-[#D2691E]",
    bg:         "bg-[#F8F4EF] border-[#EEE6DC]",
    text:       "text-[#6F4E37]",
    checkColor: "text-[#D2691E]",
    points:     "0 – 499 pts",
    perks: [
      "1 point per £1 spent",
      "Birthday free drink",
      "Early access to specials",
    ],
  },
  {
    name:       "Gold",
    Icon:       FiStar,
    colour:     "from-[#D2691E] to-[#E8944A]",
    bg:         "bg-[#FFF8F2] border-[#E8DDD4]",
    text:       "text-[#D2691E]",
    checkColor: "text-[#D2691E]",
    points:     "500 – 1,499 pts",
    perks: [
      "1.5 points per £1 spent",
      "Monthly free pastry",
      "Skip-the-queue priority",
      "Exclusive Gold menu items",
    ],
  },
  {
    name:       "Reserve",
    Icon:       FiAward,
    colour:     "from-[#D2691E] to-[#E8944A]",
    bg:         "bg-[#1A0E07] border-[#D2691E]/40",
    text:       "text-[#E8944A]",
    checkColor: "text-[#E8944A]",
    points:     "1,500 + pts",
    perks: [
      "2 points per £1 spent",
      "Free item every 200 pts",
      "VIP table reservations",
      "Catering discounts (10% off)",
      "Invite to exclusive tastings",
    ],
  },
];

export default function LoyaltyTiers() {
  return (
    <section className="section-padding bg-[#F8F4EF]">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">Membership levels</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Level up your rewards</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TIERS.map(({ name, Icon, colour, bg, text, checkColor, points, perks }) => {
            const isDark = name === "Reserve";
            return (
              <div
                key={name}
                className={`rounded-3xl border-2 p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all ${isDark ? "bg-[#1A0E07] border-[#D2691E]/40" : bg}`}
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black mb-5 self-start bg-gradient-to-r ${colour} text-white shadow-md`}>
                  <Icon className="w-3.5 h-3.5" />
                  {name}
                </div>
                <p className={`text-xs font-bold mb-5 ${isDark ? "text-white/40" : "text-[#333]/40"}`}>
                  {points}
                </p>
                <ul className="space-y-3 flex-1">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <FiCheck className={`w-4 h-4 mt-0.5 shrink-0 ${checkColor}`} />
                      <span className={isDark ? "text-white/70" : "text-[#333]/65"}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
