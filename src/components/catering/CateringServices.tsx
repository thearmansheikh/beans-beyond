import { FiBriefcase, FiStar, FiHeart, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import Link from "next/link";

const SERVICES: { Icon: IconType; title: string; desc: string; tags: string[] }[] = [
  {
    Icon:  FiBriefcase,
    title: "Corporate & Office",
    desc:  "Team breakfasts, board lunches, product launches, and office buffets. Professionally presented and always punctual.",
    tags:  ["Box lunches", "Buffet platters", "Coffee service"],
  },
  {
    Icon:  FiStar,
    title: "Private Parties",
    desc:  "Birthdays, anniversaries, baby showers, and family gatherings. We bring the café experience to your venue.",
    tags:  ["Brunch spreads", "Afternoon tea", "Dessert tables"],
  },
  {
    Icon:  FiHeart,
    title: "Community & Religious",
    desc:  "Eid celebrations, Ramadan iftars, community fundraisers, and cultural events — all 100% Halal certified.",
    tags:  ["Iftar platters", "Eid feasts", "Halal certified"],
  },
];

export default function CateringServices() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">What we cater for</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Perfect for any occasion</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {SERVICES.map(({ Icon, title, desc, tags }) => (
            <div key={title} className="bg-white rounded-3xl p-8 border border-[#EEE6DC] hover:shadow-xl hover:border-[#D2691E]/30 transition-all group flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-[#D2691E]/20">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#1A0E07] mb-3">{title}</h3>
              <p className="text-[#333]/60 leading-relaxed text-sm mb-5 flex-1">{desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#F8F4EF] text-[#6F4E37] text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="#enquire"
                className="inline-flex items-center gap-1.5 text-[#D2691E] text-sm font-bold hover:gap-2.5 transition-all"
              >
                Get a quote <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
