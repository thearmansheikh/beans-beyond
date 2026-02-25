export default function AboutHero() {
  return (
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
  );
}
