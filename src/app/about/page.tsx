import type { Metadata } from "next";
import Image from "next/image";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { USPS, RESTAURANT } from "@/utils/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Beans & Beyond — our values, our team, and our commitment to great coffee and fresh food on Commercial Road, London E14.",
};

const VALUES = [
  {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    emoji: "☕",
    title: "Quality First",
    desc: "We source specialty-grade beans and work with local farms for the freshest produce. No shortcuts, ever.",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    emoji: "🌍",
    title: "Sustainability",
    desc: "Compostable packaging, reusable cup discounts, carbon-offset delivery, and a zero-waste kitchen policy.",
  },
  {
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    emoji: "🏘️",
    title: "Community",
    desc: "We're proud to serve East London. Local events, local art on our walls, local suppliers in our kitchen.",
  },
  {
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
    emoji: "♥",
    title: "Inclusivity",
    desc: "An extensive vegetarian and vegan menu so every guest feels catered for — not as an afterthought, but with care.",
  },
];

const MILESTONES = [
  { year: "2018", title: "First doors open", desc: "Three tables, a second-hand espresso machine, and a lot of ambition on Commercial Road." },
  { year: "2019", title: "The menu grows", desc: "Launched our full brunch menu and introduced fresh daily specials for the first time." },
  { year: "2020", title: "Adapting & thriving", desc: "Pivoted to click & collect, supported key workers with free coffees throughout the pandemic." },
  { year: "2022", title: "New kitchen fit-out", desc: "Expanded the kitchen, added catering capacity, and started serving the local office crowd." },
  { year: "2024", title: "700+ Google reviews", desc: "Crossed 700 five-star reviews. Humbled, grateful, and still making every cup with care." },
  { year: "Now",  title: "Still going strong", desc: "Hundreds of guests every week — and we&rsquo;re just getting started." },
];

const STATS = [
  { value: "2018",  label: "Year founded"       },
  { value: "700+",  label: "Five-star reviews"  },
  { value: "4.6★",  label: "Google rating"      },
  { value: "100%",  label: "Fresh daily"        },
];

export default function AboutPage() {
  return (
    <CartProvider>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#1A0E07] py-28 sm:py-36">
          <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#D2691E]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#6F4E37]/20 blur-3xl" />

          <div className="container-site relative text-center">
            <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-[#D2691E] border border-[#D2691E]/30 rounded-full bg-[#D2691E]/10">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-6">
              More than{" "}
              <span className="text-gradient-warm">just coffee</span>
            </h1>
            <p className="text-white/55 max-w-xl mx-auto text-lg leading-relaxed">
              A little café with a big heart, rooted in the community of East London since 2018.
            </p>
          </div>
        </section>

        {/* ── Story ────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

              {/* Text */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D2691E] mb-4">How it all began</p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07] mb-6 leading-tight">
                  A dream scribbled on a napkin in 2018
                </h2>
                <div className="space-y-4 text-[#333]/65 leading-relaxed">
                  <p>
                    Beans &amp; Beyond started with a simple idea: a neighbourhood café where the coffee was as good as the conversation. We opened our doors on Commercial Road with three tables, a second-hand espresso machine, and a lot of ambition.
                  </p>
                  <p>
                    Today, we serve hundreds of guests every week — from early-morning commuters grabbing a flat white, to afternoon regulars who&rsquo;ve made us their office, to weekend families for whom our full English has become a Saturday ritual.
                  </p>
                  <p>
                    Everything is made fresh every morning. We work with local suppliers, cut food waste daily, and make sure there&rsquo;s something delicious for everyone — whether you eat meat, are fully vegan, or anywhere in between.
                  </p>
                </div>

                {/* Halal badge */}
                <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                  <span className="text-lg">🟢</span>
                  <span className="text-sm font-bold text-green-800">Halal Certified</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="group bg-[#FDFAF7] border border-[#EEE6DC] rounded-2xl p-6 sm:p-8 text-center hover:border-[#D2691E]/40 hover:bg-[#FFF8F2] transition-all"
                  >
                    <p className="text-4xl sm:text-5xl font-black text-[#D2691E] mb-2">{value}</p>
                    <p className="text-[#333]/55 text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Photo strip ──────────────────────────────── */}
        <section className="overflow-hidden bg-[#1A0E07]">
          <div className="flex h-56 sm:h-72 lg:h-80">
            {[
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
              "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
              "https://images.unsplash.com/photo-1484723091739-30990106e8cd?w=800&q=80",
              "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
            ].map((src, i) => (
              <div key={i} className="relative flex-1 overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────── */}
        <section className="section-padding bg-[#FDFAF7]">
          <div className="container-site">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D2691E] mb-3">Our Journey</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">From napkin to neighbourhood favourite</h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-[#EEE6DC] -translate-x-px sm:-translate-x-px" />

              <div className="space-y-10">
                {MILESTONES.map(({ year, title, desc }, i) => (
                  <div
                    key={year}
                    className={`relative flex gap-6 sm:gap-10 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} items-start`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:text-left sm:pl-10"} pl-10 sm:pl-0`}>
                      <span className="text-xs font-black uppercase tracking-widest text-[#D2691E]">{year}</span>
                      <h3 className="text-lg font-black text-[#1A0E07] mt-1 mb-1">{title}</h3>
                      <p
                        className="text-sm text-[#333]/60 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: desc }}
                      />
                    </div>

                    {/* Dot */}
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1 w-9 h-9 rounded-full bg-[#D2691E] border-4 border-[#FDFAF7] flex items-center justify-center shadow-md shrink-0">
                      <span className="text-white text-[10px] font-black">{year.slice(-2)}</span>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D2691E] mb-3">What we stand for</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ gradient, bg, emoji, title, desc }) => (
                <div
                  key={title}
                  className={`group ${bg} rounded-2xl p-7 border border-transparent hover:shadow-md transition-all hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-xl">{emoji}</span>
                  </div>
                  <h3 className="font-black text-[#1A0E07] text-lg mb-2">{title}</h3>
                  <p className="text-[#333]/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us (USPs) ─────────────────────── */}
        <section className="section-padding bg-[#1A0E07]">
          <div className="container-site">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D2691E] mb-3">Why choose us</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">What makes us different</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {USPS.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <span className="text-3xl block mb-4">{icon}</span>
                  <h3 className="font-black text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="section-padding bg-gradient-to-br from-[#D2691E] to-[#E8944A] text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_0,transparent_50%)] [background-size:12px_12px]" />
          <div className="container-site relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Come and say hello
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-10 text-lg">
              We&rsquo;re at {RESTAURANT.address}. Pop in for a coffee — we&rsquo;d love to meet you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/order"
                className="px-8 py-4 bg-[#1A0E07] text-white font-black rounded-2xl hover:bg-[#2C1A0E] transition-all shadow-lg text-base"
              >
                Order Online
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/20 border-2 border-white/40 text-white font-black rounded-2xl hover:bg-white/30 transition-all text-base"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </CartProvider>
  );
}
