import { USPS } from "@/utils/constants";
import PhotoCollage from "./PhotoCollage";
import USPCard from "./USPCard";

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#F5F5DC]/40">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: photo collage + story text ── */}
          <div>
            <PhotoCollage />

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
            <p className="text-[#333]/70 leading-relaxed mb-5">
              Every dish is made fresh daily, every coffee is pulled with care, and every
              guest is welcomed like a regular — because here, everyone is.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["🍳 Breakfast", "🥗 Brunch", "🍽️ Lunch & Dinner", "☕ Coffee", "✓ Halal Certified"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#6F4E37]/10 text-[#6F4E37] text-sm font-semibold rounded-full"
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
          </div>

          {/* ── Right: USP grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {USPS.map(({ icon, title, desc }) => (
              <USPCard key={title} icon={icon} title={title} desc={desc} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
