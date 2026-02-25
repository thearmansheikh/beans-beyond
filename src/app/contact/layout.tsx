import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Beans & Beyond. Visit us at 819 Commercial Road, London E14 7HG, call us, or send a message. Open 7 days a week from 7am.",
  openGraph: {
    title: "Contact | Beans & Beyond",
    description:
      "Visit us at 819 Commercial Road, London E14. Open 7am–9pm, 7 days a week.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
