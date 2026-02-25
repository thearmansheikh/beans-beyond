import { FiCoffee, FiGlobe, FiHome, FiHeart } from "react-icons/fi";
import type { IconType } from "react-icons";

const VALUES: { Icon: IconType; title: string; desc: string }[] = [
  {
    Icon:  FiCoffee,
    title: "Quality First",
    desc:  "We source specialty-grade beans and work with local farms for the freshest produce. No shortcuts, ever.",
  },
  {
    Icon:  FiGlobe,
    title: "Sustainability",
    desc:  "Compostable packaging, reusable cup discounts, carbon-offset delivery, and a zero-waste kitchen policy.",
  },
  {
    Icon:  FiHome,
    title: "Community",
    desc:  "We're proud to serve East London. Local events, local art on our walls, local suppliers in our kitchen.",
  },
  {
    Icon:  FiHeart,
    title: "Inclusivity",
    desc:  "An extensive vegetarian and vegan menu so every guest feels catered for — not as an afterthought, but with care.",
  },
];

export default function AboutValues() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D2691E] mb-3">What we stand for</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-[#F8F4EF] rounded-2xl p-7 border border-[#EEE6DC] hover:border-[#D2691E]/30 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-[#1A0E07] text-lg mb-2">{title}</h3>
              <p className="text-[#333]/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
