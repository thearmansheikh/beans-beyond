import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beans & Beyond | Coffee Shop & Café | London E14",
    template: "%s | Beans & Beyond",
  },
  description:
    "Beans & Beyond is a cosy coffee shop & café at 819 Commercial Rd, London E14 7HG. Order online, explore our menu, and enjoy fresh food & exceptional coffee.",
  keywords: [
    "Beans and Beyond",
    "coffee shop London",
    "café E14",
    "breakfast Commercial Road",
    "vegetarian café London",
    "order food online E14",
  ],
  openGraph: {
    title: "Beans & Beyond | Coffee Shop & Café | London E14",
    description:
      "Fresh food, exceptional coffee, and a welcoming atmosphere on Commercial Road, London E14.",
    url: "https://www.bbcafe.co.uk",
    siteName: "Beans & Beyond",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.bbcafe.co.uk"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
