import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Allergen Information",
  description: "Full allergen information for all Beans & Beyond menu items.",
};

const ALLERGEN_ICONS: Record<string, string> = {
  gluten:    "🌾",
  dairy:     "🥛",
  eggs:      "🥚",
  nuts:      "🥜",
  fish:      "🐟",
  shellfish: "🦐",
  soy:       "🫘",
  sesame:    "🌿",
};

export default function AllergensPage() {
  const categories = MENU_CATEGORIES.filter((c) => c.slug !== "all");

  return (
    <CartProvider>
      <Header />
      <main className="section-padding bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-[#6F4E37] mb-4">
              Allergen Information
            </h1>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Important:</strong> Our kitchen handles all 14 major allergens. While we take every
                precaution, we cannot guarantee that any item is completely free from allergens due to the risk
                of cross-contamination. If you have a severe allergy, please speak to a member of staff before ordering.
              </p>
            </div>
          </div>

          {categories.map((cat) => {
            const items = MENU_ITEMS.filter((i) => i.category === cat.slug);
            if (items.length === 0) return null;
            return (
              <section key={cat.slug} className="mb-10">
                <h2 className="text-xl font-black text-[#6F4E37] mb-4 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-100 rounded-2xl overflow-hidden">
                    <thead className="bg-[#F5F5DC]">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold text-[#6F4E37] text-xs uppercase tracking-wider w-48">
                          Item
                        </th>
                        <th className="text-left px-4 py-3 font-bold text-[#6F4E37] text-xs uppercase tracking-wider">
                          Allergens
                        </th>
                        <th className="text-center px-4 py-3 font-bold text-[#6F4E37] text-xs uppercase tracking-wider">V</th>
                        <th className="text-center px-4 py-3 font-bold text-[#6F4E37] text-xs uppercase tracking-wider">VG</th>
                        <th className="text-center px-4 py-3 font-bold text-[#6F4E37] text-xs uppercase tracking-wider">GF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 bg-white">
                      {items.map((item) => (
                        <tr key={item._id} className="hover:bg-[#F8F8F8] transition-colors">
                          <td className="px-4 py-3 font-semibold text-[#333]">{item.name}</td>
                          <td className="px-4 py-3">
                            {item.dietaryInfo.allergens.length === 0 ? (
                              <span className="text-green-600 text-xs font-medium">None listed</span>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {item.dietaryInfo.allergens.map((a) => (
                                  <span key={a} className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs">
                                    {ALLERGEN_ICONS[a] ?? "⚠️"} {a}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.dietaryInfo.vegetarian ? "✅" : "—"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.dietaryInfo.vegan ? "✅" : "—"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.dietaryInfo.glutenFree ? "✅" : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
