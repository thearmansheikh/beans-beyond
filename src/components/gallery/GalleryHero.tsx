export default function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-[#1A0E07] py-24 sm:py-32 text-center">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D2691E]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-[#6F4E37]/25 blur-3xl" />
      <div className="container-site relative">
        <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-[#D2691E] border border-[#D2691E]/30 rounded-full bg-[#D2691E]/10">
          Beans &amp; Beyond
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-5">
          Our <span className="text-gradient-warm">Gallery</span>
        </h1>
        <p className="text-white/55 max-w-md mx-auto text-lg">
          A peek into our world — food, coffee, space &amp; community.
        </p>
      </div>
    </section>
  );
}
