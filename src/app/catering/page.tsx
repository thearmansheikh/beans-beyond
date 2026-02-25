import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CateringHero from "@/components/catering/CateringHero";
import CateringServices from "@/components/catering/CateringServices";
import CateringPackages from "@/components/catering/CateringPackages";
import CateringProcess from "@/components/catering/CateringProcess";
import CateringEnquiryForm from "@/components/catering/CateringEnquiryForm";
import CateringFAQ from "@/components/catering/CateringFAQ";
import CateringCTA from "@/components/catering/CateringCTA";

export default function CateringPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content" className="bg-[#F8F4EF]">
        <CateringHero />
        <CateringServices />
        <CateringPackages />
        <CateringProcess />
        <CateringEnquiryForm />
        <CateringFAQ />
        <CateringCTA />
      </main>
      <Footer />
    </CartProvider>
  );
}
