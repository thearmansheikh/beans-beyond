import { MENU_CATEGORIES } from "@/utils/constants";

const CATEGORY_ICONS: Record<string, string> = {
  all:          "🍽️",
  breakfast:    "🍳",
  coffee:       "☕",
  lunch:        "🥗",
  snacks:       "🥐",
  "cold-drinks":"🥤",
  desserts:     "🍰",
};

export default function MenuHero() {
  const cats = MENU_CATEGORIES.filter((c) => c.slug !== "all");

  return (
    <section className="relative bg-gradient-to-br from-[#2C1A0E] via-[#1A0E07] to-[#0D0805] py-20 text-center overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#D2691E]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-10 right-1/4 w-[300px] h-[200px] rounded-full bg-[#6F4E37]/20 blur-[80px]" />

      <div className="relative z-10 container-site">
        <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-sm mb-3">
          Beans &amp; Beyond
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
          Our Menu
        </h1>
        <p className="text-white/50 max-w-md mx-auto text-lg mb-10">
          Fresh, seasonal food and specialty coffee — made with care, every day.
        </p>

        {/* Category pill decorations — visual hint of what's available */}
        <div className="flex flex-wrap justify-center gap-3">
          {cats.map((cat) => (
            <span
              key={cat.slug}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-sm font-semibold backdrop-blur-sm"
            >
              <span>{CATEGORY_ICONS[cat.slug] ?? cat.icon}</span>
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
