import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AllergensHero from "@/components/allergens/AllergensHero";
import AllergensLegend from "@/components/allergens/AllergensLegend";
import AllergensTable from "@/components/allergens/AllergensTable";
import AllergensDisclaimer from "@/components/allergens/AllergensDisclaimer";

export default function AllergensPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content">
        <AllergensHero />
        <AllergensLegend />
        <AllergensTable />
        <AllergensDisclaimer />
      </main>
      <Footer />
    </CartProvider>
  );
}
