const STATS = [
  { value: "2018", label: "Year founded" },
  { value: "700+", label: "Five-star reviews" },
  { value: "4.6★", label: "Google rating" },
  { value: "100%", label: "Fresh daily" },
];

export default function AboutStory() {
  return (
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
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-[#D2691E]/8 border border-[#D2691E]/20 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#D2691E] shrink-0" />
              <span className="text-sm font-bold text-[#D2691E]">Halal Certified</span>
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
  );
}
