import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LoyaltyHero from "@/components/loyalty/LoyaltyHero";
import LoyaltyHowItWorks from "@/components/loyalty/LoyaltyHowItWorks";
import LoyaltyTiers from "@/components/loyalty/LoyaltyTiers";
import LoyaltyRewards from "@/components/loyalty/LoyaltyRewards";
import LoyaltyCTA from "@/components/loyalty/LoyaltyCTA";

export default function LoyaltyPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content" className="bg-[#F8F4EF]">
        <LoyaltyHero />
        <LoyaltyHowItWorks />
        <LoyaltyTiers />
        <LoyaltyRewards />
        <LoyaltyCTA />
      </main>
      <Footer />
    </CartProvider>
  );
}
