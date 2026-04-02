import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";

const ALLERGENS = [
  { key: "gluten",    label: "Gluten",    emoji: "🌾" },
  { key: "eggs",      label: "Eggs",      emoji: "🥚" },
  { key: "dairy",     label: "Dairy",     emoji: "🥛" },
  { key: "nuts",      label: "Nuts",      emoji: "🥜" },
  { key: "soy",       label: "Soy",       emoji: "🫘" },
  { key: "fish",      label: "Fish",      emoji: "🐟" },
  { key: "shellfish", label: "Shellfish", emoji: "🦐" },
  { key: "sesame",    label: "Sesame",    emoji: "🌰" },
  { key: "celery",    label: "Celery",    emoji: "🌿" },
  { key: "mustard",   label: "Mustard",   emoji: "🌭" },
] as const;

type AllergenKey = (typeof ALLERGENS)[number]["key"];

function Cell({ present }: { present: boolean }) {
  if (present) {
    return (
      <td className="px-3 py-3.5 text-center">
        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-black" title="Contains">
          ●
        </span>
      </td>
    );
  }
  return (
    <td className="px-3 py-3.5 text-center text-gray-200 text-sm" aria-label="Does not contain">
      –
    </td>
  );
}

export default function AllergensTable() {
  const nonAllCategories = MENU_CATEGORIES.filter((c) => c.slug !== "all");

  return (
    <section className="section-padding bg-[#F8F4EF]">
      <div className="container-site space-y-14">
        {nonAllCategories.map((cat) => {
          const items = MENU_ITEMS.filter((i) => i.category === cat.slug && i.available);
          if (items.length === 0) return null;
          return (
            <div key={cat.slug}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-2xl font-black text-[#1A0E07]">{cat.name}</h2>
                <div className="flex-1 h-px bg-[#EEE6DC]" />
                <span className="text-sm text-[#333]/40">{items.length} item{items.length !== 1 ? "s" : ""}</span>
              </div>

              {/* Mobile scroll hint */}
              <p className="sm:hidden text-xs text-[#333]/40 mb-2 flex items-center gap-1.5">
                <span>←</span> Swipe to see all allergens <span>→</span>
              </p>
              <div className="overflow-x-auto rounded-2xl border border-[#EEE6DC] shadow-sm bg-white">
                <table className="w-full text-sm min-w-[820px]">
                  <thead>
                    <tr className="border-b border-[#EEE6DC] bg-[#F8F4EF]">
                      <th className="px-4 py-3.5 text-left font-black text-[#333]/50 text-xs uppercase tracking-widest w-52">Dish</th>
                      <th className="px-3 py-3.5 text-center font-black text-[#333]/50 text-[10px] uppercase tracking-widest w-12">V</th>
                      <th className="px-3 py-3.5 text-center font-black text-[#333]/50 text-[10px] uppercase tracking-widest w-12">VG</th>
                      <th className="px-3 py-3.5 text-center font-black text-[#333]/50 text-[10px] uppercase tracking-widest w-12">GF</th>
                      {ALLERGENS.map(({ emoji, label }) => (
                        <th key={label} className="px-2 py-3.5 text-center font-black text-[#333]/50 text-[10px] uppercase tracking-widest w-10" title={label}>
                          <span className="block text-base leading-none">{emoji}</span>
                          <span className="block mt-0.5">{label.slice(0, 4)}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr
                        key={item._id}
                        className={`border-b border-[#F8F4EF] last:border-0 hover:bg-amber-50/60 transition-colors ${idx % 2 !== 0 ? "bg-[#FDFAF7]" : ""}`}
                      >
                        <td className="px-4 py-3.5">
                          <p className="font-bold text-[#1A0E07] text-sm leading-tight">{item.name}</p>
                          {item.chefsPick && (
                            <span className="text-[10px] text-[#D2691E] font-bold">⭐ Chef&apos;s Pick</span>
                          )}
                        </td>
                        {/* V */}
                        <td className="px-3 py-3.5 text-center">
                          {item.dietaryInfo.vegetarian
                            ? <span className="inline-flex w-6 h-6 items-center justify-center rounded bg-green-100 text-green-700 text-[9px] font-black">V</span>
                            : <span className="text-gray-200">–</span>}
                        </td>
                        {/* VG */}
                        <td className="px-3 py-3.5 text-center">
                          {item.dietaryInfo.vegan
                            ? <span className="inline-flex w-6 h-6 items-center justify-center rounded bg-emerald-100 text-emerald-700 text-[9px] font-black">VG</span>
                            : <span className="text-gray-200">–</span>}
                        </td>
                        {/* GF */}
                        <td className="px-3 py-3.5 text-center">
                          {item.dietaryInfo.glutenFree
                            ? <span className="inline-flex w-6 h-6 items-center justify-center rounded bg-amber-100 text-amber-700 text-[9px] font-black">GF</span>
                            : <span className="text-gray-200">–</span>}
                        </td>
                        {/* Allergen cells */}
                        {ALLERGENS.map(({ key }) => (
                          <Cell
                            key={key}
                            present={item.dietaryInfo.allergens.includes(key as AllergenKey)}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
