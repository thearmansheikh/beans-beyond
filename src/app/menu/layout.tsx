import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the full Beans & Beyond menu — freshly made breakfasts, brunches, specialty coffees, cold drinks, and desserts. All Halal. Available for dine-in, collection, and delivery in East London.",
  openGraph: {
    title: "Menu | Beans & Beyond",
    description:
      "Browse our full menu — breakfast, coffee, lunch, desserts and more. All Halal certified, freshly made daily.",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
