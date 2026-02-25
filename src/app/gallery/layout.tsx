import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Take a look inside Beans & Beyond — our café atmosphere, freshly made dishes, and specialty coffee. Located on Commercial Road, East London.",
  openGraph: {
    title: "Gallery | Beans & Beyond",
    description:
      "Photos of our food, coffee, and café atmosphere at Beans & Beyond, Commercial Road, London E14.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
