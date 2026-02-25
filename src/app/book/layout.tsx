import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at Beans & Beyond on Commercial Road, London E14. Book online for breakfast, brunch, or lunch — for groups of up to 12. Walk-ins always welcome.",
  openGraph: {
    title: "Book a Table | Beans & Beyond",
    description:
      "Reserve your table at Beans & Beyond — breakfast, brunch & lunch on Commercial Road, London E14.",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
