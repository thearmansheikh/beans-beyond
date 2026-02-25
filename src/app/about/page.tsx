import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutPhotoStrip from "@/components/about/AboutPhotoStrip";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutValues from "@/components/about/AboutValues";
import AboutUSPs from "@/components/about/AboutUSPs";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Beans & Beyond — a Halal café and restaurant on Commercial Road, East London. Fresh food, great coffee, and a warm welcome since 2018.",
  openGraph: {
    title: "About Us | Beans & Beyond",
    description:
      "From a small café on Commercial Road to a beloved community spot — discover the story of Beans & Beyond.",
  },
};

export default function AboutPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content">
        <AboutHero />
        <AboutStory />
        <AboutPhotoStrip />
        <AboutTimeline />
        <AboutValues />
        <AboutUSPs />
        <AboutCTA />
      </main>
      <Footer />
    </CartProvider>
  );
}
