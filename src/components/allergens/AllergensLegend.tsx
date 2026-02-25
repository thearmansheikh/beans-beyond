const ALLERGENS = [
  { key: "gluten",    label: "Gluten",    emoji: "🌾", desc: "Wheat, rye, barley, oats" },
  { key: "eggs",      label: "Eggs",      emoji: "🥚", desc: "All egg products" },
  { key: "dairy",     label: "Dairy",     emoji: "🥛", desc: "Milk, cheese, butter, cream" },
  { key: "nuts",      label: "Nuts",      emoji: "🥜", desc: "Tree nuts & peanuts" },
  { key: "soy",       label: "Soy",       emoji: "🫘", desc: "Soya products" },
  { key: "fish",      label: "Fish",      emoji: "🐟", desc: "All fish species" },
  { key: "shellfish", label: "Shellfish", emoji: "🦐", desc: "Prawns, crab, lobster" },
  { key: "sesame",    label: "Sesame",    emoji: "🌰", desc: "Sesame seeds & oil" },
  { key: "celery",    label: "Celery",    emoji: "🌿", desc: "Celery & celeriac" },
  { key: "mustard",   label: "Mustard",   emoji: "🌭", desc: "Mustard seeds & oil" },
];

export default function AllergensLegend() {
  return (
    <>
      {/* Dietary key */}
      <section className="bg-[#F8F4EF] border-b border-[#EEE6DC] py-5">
        <div className="container-site">
          <div className="flex flex-wrap gap-x-8 gap-y-3 items-center text-sm">
            <div className="flex items-center gap-2 font-bold text-[#333]/70">
              <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#D2691E]/15 text-[#D2691E] text-xs font-black">●</span>
              Contains allergen
            </div>
            <div className="flex items-center gap-2 font-bold text-[#333]/40">
              <span className="text-gray-300 text-lg leading-none">–</span>
              Not present
            </div>
            <div className="flex items-center gap-2 font-bold text-green-700">
              <span className="px-2 py-0.5 rounded bg-green-100 text-xs font-black">V</span>
              Vegetarian
            </div>
            <div className="flex items-center gap-2 font-bold text-emerald-700">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-xs font-black">VG</span>
              Vegan
            </div>
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-xs font-black">GF</span>
              Gluten Free
            </div>
          </div>
        </div>
      </section>

      {/* Allergen legend */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container-site">
          <div className="flex flex-wrap gap-3">
            {ALLERGENS.map(({ key, label, emoji, desc }) => (
              <div key={key} className="flex items-center gap-2 px-3 py-2 bg-[#F8F4EF] border border-[#EEE6DC] rounded-xl text-xs">
                <span className="text-base leading-none">{emoji}</span>
                <div>
                  <p className="font-bold text-[#1A0E07]">{label}</p>
                  <p className="text-[#333]/45">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
