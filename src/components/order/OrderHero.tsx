export default function OrderHero() {
  return (
    <section className="relative overflow-hidden bg-[#1A0E07] py-24 sm:py-28 text-center">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D2691E]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-[#6F4E37]/25 blur-3xl" />

      <div className="container-site relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/15 border border-green-400/25 text-green-400 text-xs font-bold mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Now Accepting Orders
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-4">
          Order{" "}
          <span className="text-gradient-warm">Online</span>
        </h1>
        <p className="text-white/55 max-w-md mx-auto text-lg">
          Fresh food and great coffee — order ahead or get it delivered.
        </p>
      </div>
    </section>
  );
}
