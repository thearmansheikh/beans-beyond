import Link from "next/link";
import { FiCalendar, FiShoppingBag, FiArrowRight, FiPhone } from "react-icons/fi";
import FadeIn from "@/components/ui/FadeIn";
import { RESTAURANT } from "@/utils/constants";

const ACTIONS = [
  {
    emoji:   "🗓️",
    title:   "Book a Table",
    desc:    "Reserve your spot in advance. Walk-ins always welcome too.",
    cta:     "Reserve Now",
    href:    "/book",
    style:   "bg-gradient-to-br from-[#D2691E] to-[#C05A16] text-white",
    ctaStyle:"bg-white text-[#D2691E] hover:bg-white/90 shadow-lg",
    accent:  "bg-white/12 border border-white/20",
    stats:   "Fast seating · No wait",
  },
  {
    emoji:   "🛒",
    title:   "Order Online",
    desc:    "Collection or delivery straight to your door. Ready in 15 mins.",
    cta:     "Order Now",
    href:    "/order",
    style:   "bg-[#16100A] border border-white/8 text-white",
    ctaStyle:"bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white hover:opacity-92 shadow-lg shadow-[#D2691E]/25",
    accent:  "bg-white/8 border border-white/12",
    stats:   "From £2.80 · Pay online",
  },
  {
    emoji:   "🎉",
    title:   "Event Catering",
    desc:    "Halal catering for corporate, private, and community events.",
    cta:     "Get a Quote",
    href:    "/catering",
    style:   "bg-[#F8F4EF] border-2 border-[#EEE6DC] text-[#1A0E07]",
    ctaStyle:"bg-[#1A0E07] text-white hover:bg-[#2C1A0E] shadow-lg",
    accent:  "bg-[#6F4E37]/8 border border-[#6F4E37]/15",
    stats:   "10 – 500 guests",
  },
];

export default function BookingCTA() {
  return (
    <section className="py-20 bg-[#1A0E07] relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#D2691E]/7 blur-[140px]" />

      <div className="relative z-10 container-site">

        {/* Heading */}
        <FadeIn from="bottom" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D2691E]/15 border border-[#D2691E]/25 text-[#E8944A] text-xs font-black uppercase tracking-widest mb-5">
            Come join us
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            However you want to visit
          </h2>
          <p className="text-white/38 mt-3 max-w-sm mx-auto text-sm">
            Dine in, take away, or let us come to you — we&rsquo;ve got you covered.
          </p>
        </FadeIn>

        {/* Cards */}
        <FadeIn from="bottom" delay={100}>
          <div className="grid sm:grid-cols-3 gap-5">
            {ACTIONS.map(({ emoji, title, desc, cta, href, style, ctaStyle, accent, stats }) => (
              <div
                key={title}
                className={`rounded-3xl p-7 flex flex-col group hover:scale-[1.015] transition-transform duration-300 ${style}`}
              >
                {/* Icon badge */}
                <div className={`w-12 h-12 rounded-2xl ${accent} flex items-center justify-center text-2xl mb-5`}>
                  {emoji}
                </div>

                <h3 className="text-xl font-black mb-2">{title}</h3>
                <p className="text-sm opacity-55 leading-relaxed flex-1 mb-2">{desc}</p>

                {/* Stats pill */}
                <p className="text-xs font-semibold opacity-40 mb-7">{stats}</p>

                <Link
                  href={href}
                  className={`btn-shine flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all ${ctaStyle}`}
                >
                  {cta}
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Contact strip */}
        <FadeIn from="bottom" delay={200}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-white/25 text-sm">Or give us a call —</p>
            <a
              href={`tel:${RESTAURANT.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/12 text-white/55 text-sm font-semibold hover:border-white/30 hover:text-white/80 transition-all"
            >
              <FiPhone className="w-4 h-4" />
              {RESTAURANT.phone}
            </a>
            <p className="text-white/18 text-sm hidden sm:block">·&nbsp; Open 7am – 9pm, 7 days</p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
