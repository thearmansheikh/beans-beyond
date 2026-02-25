import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Online",
  description:
    "Order fresh food and coffee from Beans & Beyond online. Choose collection or delivery to your door. Halal certified. East London, E14.",
  openGraph: {
    title: "Order Online | Beans & Beyond",
    description:
      "Order Halal food and specialty coffee for collection or delivery from Beans & Beyond, Commercial Road, London E14.",
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
