import { USPS, RESTAURANT } from "@/utils/constants";
import FadeIn from "@/components/ui/FadeIn";
import PhotoCollage from "./PhotoCollage";
import USPCard from "./USPCard";

const STATS = [
  { value: "2018",   label: "Est. in E14"      },
  { value: "5k+",    label: "Cups served daily" },
  { value: `${RESTAURANT.rating}/5`, label: "Google rating" },
  { value: "7am",    label: "Open daily from"   },
];

const TAGS = [
  "🍳 Breakfast",
  "🥗 Brunch",
  "🍽️ Lunch & Dinner",
  "☕ Coffee",
  "✓ Halal Certified",
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#F5F5DC]/40">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: photo collage + story ── */}
          <FadeIn from="left">
            <PhotoCollage />

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl px-3 py-4 text-center shadow-sm border border-[#EEE6DC] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="font-black text-[#D2691E] text-xl sm:text-2xl leading-none mb-1">
                    {value}
                  </p>
                  <p className="text-[#333]/50 text-[11px] sm:text-xs leading-tight">{label}</p>
                </div>
              ))}
            </div>

            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-sm mb-3">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#6F4E37] mb-6 leading-tight">
              Breakfast, brunch
              <br />&amp; beyond
            </h2>
            <p className="text-[#333]/70 text-lg leading-relaxed mb-4">
              Beans &amp; Beyond is a Halal café and restaurant on Commercial Road, East
              London — your go-to spot for a hearty breakfast, a proper brunch, or a
              relaxed lunch. Open seven days a week, we serve the E14 community with
              fresh food and great coffee from 7am.
            </p>
            <p className="text-[#333]/65 leading-relaxed mb-6">
              Every dish is made fresh daily, every coffee is pulled with care, and every
              guest is welcomed like a regular — because here, everyone is.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#6F4E37]/10 text-[#6F4E37] text-sm font-semibold rounded-full hover:bg-[#6F4E37]/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 text-[#6F4E37] font-bold hover:text-[#D2691E] transition-colors group"
            >
              Learn our full story
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </FadeIn>

          {/* ── Right: USP grid ── */}
          <FadeIn from="right" delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {USPS.map(({ icon, title, desc }) => (
                <USPCard key={title} icon={icon} title={title} desc={desc} />
              ))}
            </div>

            {/* Quote pull-out */}
            <div className="mt-8 p-6 rounded-2xl bg-[#1A0E07] relative overflow-hidden">
              <div className="absolute top-4 left-5 text-[#D2691E]/20 text-7xl font-black leading-none select-none">&ldquo;</div>
              <p className="relative z-10 text-white/70 text-sm leading-relaxed italic pl-6">
                {RESTAURANT.tagline}
              </p>
              <p className="relative z-10 text-[#D2691E] text-xs font-bold mt-3 pl-6">
                — {RESTAURANT.taglineAuthor}
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
