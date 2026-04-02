import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingCart from "@/components/common/FloatingCart";
import MenuHero from "@/components/menu/MenuHero";
import MenuContent from "@/components/menu/MenuContent";
import { getMenuItems } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <CartProvider>
      <Header />
      <main id="main-content">
        <MenuHero />
        <MenuContent initialItems={menuItems} />
      </main>
      <Footer />
      <FloatingCart />
    </CartProvider>
  );
}
