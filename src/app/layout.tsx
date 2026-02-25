import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/common/CookieConsent";
import BackToTop from "@/components/common/BackToTop";

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
    "Halal café London",
    "Halal restaurant East London",
    "Halal food E14",
    "coffee shop London",
    "café E14",
    "breakfast Commercial Road",
    "Halal breakfast London",
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Beans & Beyond — Halal Café & Restaurant, Commercial Road, East London",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bbcafe",
    title: "Beans & Beyond | Halal Café & Restaurant | London E14",
    description:
      "Fresh Halal breakfasts, brunch, and specialty coffee on Commercial Road, E14. Open 7am–9pm, 7 days.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.bbcafe.co.uk"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Beans & Beyond",
  description: "Halal café and restaurant on Commercial Road, East London. Serving fresh breakfasts, brunch, lunch, and specialty coffee seven days a week.",
  url: "https://www.bbcafe.co.uk",
  telephone: "020 3080 0000",
  email: "hello@bbcafe.co.uk",
  servesCuisine: ["British", "American", "Halal"],
  priceRange: "££",
  hasMenu: "https://www.bbcafe.co.uk/menu",
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: "819 Commercial Road",
    addressLocality: "London",
    postalCode: "E14 7HG",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5149,
    longitude: -0.0224,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "07:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "08:00", closes: "20:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "3.5",
    reviewCount: "17",
    bestRating: "5",
  },
  sameAs: [
    "https://www.instagram.com/bbcafe",
    "https://www.facebook.com/bbcafe",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} ${openSans.variable} antialiased`}>
        {/* Skip-navigation — visually hidden until focused (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#D2691E] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
