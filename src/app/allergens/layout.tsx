import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allergen Information",
  description:
    "Full allergen information for all Beans & Beyond menu items. Covers gluten, dairy, eggs, nuts, soy, fish, and more. Please inform staff of any severe allergies.",
  robots: { index: true, follow: true },
};

export default function AllergensLayout({ children }: { children: React.ReactNode }) {
  return children;
}
