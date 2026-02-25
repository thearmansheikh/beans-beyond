import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingCart from "@/components/common/FloatingCart";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import Reviews from "@/components/home/Reviews";
import BookingCTA from "@/components/home/BookingCTA";
import DailySpecials from "@/components/home/DailySpecials";
import TrustStrip from "@/components/home/TrustStrip";
import Location from "@/components/home/Location";

export const metadata: Metadata = {
  title: "Beans & Beyond | Halal Café & Restaurant | London E14",
  description:
    "Beans & Beyond — your favourite Halal café on Commercial Road, East London. Fresh breakfasts, proper brunch, specialty coffee, and great food from 7am, 7 days a week.",
  openGraph: {
    title: "Beans & Beyond | Halal Café & Restaurant | London E14",
    description:
      "Fresh Halal food and specialty coffee on Commercial Road, London E14. Open 7am – 9pm, 7 days a week.",
  },
};

export default function HomePage() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" />
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <About />
        <DailySpecials />
        <FeaturedMenu />
        <Reviews />
        <BookingCTA />
        <Location />
      </main>
      <Footer />
      <FloatingCart />
    </CartProvider>
  );
}
