import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import Reviews from "@/components/home/Reviews";
import Location from "@/components/home/Location";

export default function HomePage() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedMenu />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </CartProvider>
  );
}
