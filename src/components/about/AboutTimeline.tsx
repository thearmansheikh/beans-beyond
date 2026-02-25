const MILESTONES = [
  { year: "2018", title: "First doors open", desc: "Three tables, a second-hand espresso machine, and a lot of ambition on Commercial Road." },
  { year: "2019", title: "The menu grows", desc: "Launched our full brunch menu and introduced fresh daily specials for the first time." },
  { year: "2020", title: "Adapting & thriving", desc: "Pivoted to click & collect, supported key workers with free coffees throughout the pandemic." },
  { year: "2022", title: "New kitchen fit-out", desc: "Expanded the kitchen, added catering capacity, and started serving the local office crowd." },
  { year: "2024", title: "700+ Google reviews", desc: "Crossed 700 five-star reviews. Humbled, grateful, and still making every cup with care." },
  { year: "Now",  title: "Still going strong", desc: "Hundreds of guests every week — and we&rsquo;re just getting started." },
];

export default function AboutTimeline() {
  return (
    <section className="section-padding bg-[#F8F4EF]">
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
                className={`relative flex gap-6 sm:gap-10 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} items-start group`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:text-left sm:pl-10"} pl-10 sm:pl-0 bg-white rounded-2xl p-5 border border-[#EEE6DC] group-hover:border-[#D2691E]/25 group-hover:shadow-md group-hover:-translate-y-0.5 transition-all`}>
                  <span className="text-xs font-black uppercase tracking-widest text-[#D2691E]">{year}</span>
                  <h3 className="text-lg font-black text-[#1A0E07] mt-1 mb-1">{title}</h3>
                  <p
                    className="text-sm text-[#333]/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                </div>

                {/* Dot */}
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1 w-9 h-9 rounded-full bg-[#D2691E] border-4 border-[#F8F4EF] flex items-center justify-center shadow-md shrink-0">
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
  );
}
