import { FiClock, FiStar, FiCalendar } from "react-icons/fi";

const STATS = [
  { Icon: FiClock,    value: "< 2 hrs",  label: "Avg. reply time"  },
  { Icon: FiStar,     value: "4.5 ★",    label: "Google rating"    },
  { Icon: FiCalendar, value: "Est. 2018", label: "Serving East London" },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#1A0E07] pt-24 pb-0">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D2691E]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-12 left-1/3 h-64 w-64 rounded-full bg-[#6F4E37]/15 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-8 -left-16 h-72 w-72 rounded-full bg-[#6F4E37]/20 blur-3xl" />

      <div className="container-site relative text-center pb-16">
        <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-[#D2691E] border border-[#D2691E]/30 rounded-full bg-[#D2691E]/10">
          We&rsquo;d love to hear from you
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-5">
          Get in{" "}
          <span className="text-gradient-warm">Touch</span>
        </h1>
        <p className="text-white/55 max-w-lg mx-auto text-lg leading-relaxed">
          Questions, feedback, catering enquiries — or just want to say hello. We&rsquo;re always happy to chat.
        </p>
      </div>

      {/* Stats strip — still on dark bg, no gap */}
      <div className="relative border-t border-white/8">
        <div className="container-site">
          <div className="grid grid-cols-3 divide-x divide-white/8">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-3 py-6 sm:py-7">
                <div className="w-9 h-9 rounded-xl bg-[#D2691E]/20 border border-[#D2691E]/25 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#E8944A]" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-white font-black text-base leading-tight">{value}</p>
                  <p className="text-white/35 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
