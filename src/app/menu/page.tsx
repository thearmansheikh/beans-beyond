import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingCart from "@/components/common/FloatingCart";
import MenuHero from "@/components/menu/MenuHero";
import MenuContent from "@/components/menu/MenuContent";

export default function MenuPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content">
        <MenuHero />
        <MenuContent />
      </main>
      <Footer />
      <FloatingCart />
    </CartProvider>
  );
}
