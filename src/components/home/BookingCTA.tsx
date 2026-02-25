import Link from "next/link";
import { FiCalendar, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import FadeIn from "@/components/ui/FadeIn";
import { RESTAURANT } from "@/utils/constants";

const ACTIONS = [
  {
    icon: <FiCalendar className="w-7 h-7" />,
    emoji: "🗓️",
    title: "Book a Table",
    desc: "Reserve your spot in advance. Walk-ins always welcome too.",
    cta: "Reserve now",
    href: "/book",
    style: "bg-gradient-to-br from-[#D2691E] to-[#E8944A] text-white",
    ctaStyle: "bg-white text-[#D2691E] hover:bg-white/90",
  },
  {
    icon: <FiShoppingBag className="w-7 h-7" />,
    emoji: "🛒",
    title: "Order Online",
    desc: "Collection or delivery straight to your door from £8.",
    cta: "Order now",
    href: "/order",
    style: "bg-[#2C1A0E] text-white",
    ctaStyle: "bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white hover:opacity-90",
  },
  {
    icon: <FiArrowRight className="w-7 h-7" />,
    emoji: "🎉",
    title: "Event Catering",
    desc: "Halal catering for corporate, private, and community events.",
    cta: "Get a quote",
    href: "/catering",
    style: "bg-[#F8F4EF] border-2 border-[#EEE6DC] text-[#1A0E07]",
    ctaStyle: "bg-[#1A0E07] text-white hover:bg-[#2C1A0E]",
  },
];

export default function BookingCTA() {
  return (
    <section className="py-20 bg-[#1A0E07] relative overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#D2691E]/8 blur-[130px] pointer-events-none" />

      <div className="relative z-10 container-site">
        <FadeIn from="bottom">
          <div className="text-center mb-12">
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">
              Come join us
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              However you want to visit
            </h2>
            <p className="text-white/40 mt-3 max-w-sm mx-auto text-sm">
              Dine in, take away, or let us come to you — we&rsquo;ve got you covered.
            </p>
          </div>
        </FadeIn>

        <FadeIn from="bottom" delay={100}>
          <div className="grid sm:grid-cols-3 gap-5">
            {ACTIONS.map(({ icon, emoji, title, desc, cta, href, style, ctaStyle }) => (
              <div
                key={title}
                className={`rounded-3xl p-8 flex flex-col ${style}`}
              >
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="text-xl font-black mb-2">{title}</h3>
                <p className="text-sm opacity-60 leading-relaxed flex-1 mb-8">{desc}</p>
                <Link
                  href={href}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all shadow-md ${ctaStyle}`}
                >
                  {cta}
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Contact strip */}
        <FadeIn from="bottom" delay={200}>
          <div className="mt-10 text-center">
            <p className="text-white/25 text-sm">
              Or give us a call —{" "}
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="text-white/50 font-semibold hover:text-[#D2691E] transition-colors"
              >
                {RESTAURANT.phone}
              </a>
              {" "}· Open 7am – 9pm, 7 days a week
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
