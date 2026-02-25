import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loyalty Programme",
  description:
    "Join the Beans & Beyond loyalty programme — earn points on every visit, unlock free drinks, food rewards, and level up to Gold and Reserve membership. Coming soon.",
  openGraph: {
    title: "Loyalty Programme | Beans & Beyond",
    description:
      "Earn points, unlock rewards, and get VIP perks at Beans & Beyond. Join the waitlist for our loyalty programme launching soon.",
  },
};

export default function LoyaltyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
