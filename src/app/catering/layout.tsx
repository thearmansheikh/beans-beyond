import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering & Events",
  description:
    "Halal catering for corporate events, private parties, Eid celebrations, and more. Beans & Beyond delivers fresh food and specialty coffee across London. Request a free quote today.",
  keywords: [
    "halal catering London",
    "corporate catering East London",
    "Eid catering",
    "event catering E14",
    "halal food catering",
  ],
  openGraph: {
    title: "Catering & Events | Beans & Beyond",
    description:
      "100% Halal catering for any event — corporate, private, or community. Fresh food and specialty coffee delivered across London.",
  },
};

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
