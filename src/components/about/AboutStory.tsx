const STATS = [
  { value: "2018", label: "Year founded" },
  { value: "700+", label: "Five-star reviews" },
  { value: "4.5★", label: "Google rating" },
  { value: "100%", label: "Halal certified" },
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
                Beans &amp; Beyond was born from a simple belief: East London deserved a café that felt like home. We opened on Commercial Road in 2018 with three tables, a second-hand espresso machine, and a menu scribbled on the back of a napkin.
              </p>
              <p>
                Six years later, we serve hundreds of guests every week. Early-morning commuters who&rsquo;ve made us their daily ritual. Remote workers who treat our corner tables as their office. Weekend families for whom our full Halal English breakfast has become a Saturday tradition.
              </p>
              <p>
                Everything on the menu is made fresh that morning using ingredients from local suppliers. We&rsquo;re 100% Halal certified, fully vegetarian-friendly, and committed to zero food waste — because great food and doing right by the community should never be in conflict.
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
