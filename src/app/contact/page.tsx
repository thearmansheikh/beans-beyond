import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactQuickLinks from "@/components/contact/ContactQuickLinks";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

export default function ContactPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content">
        <ContactHero />
        <ContactQuickLinks />

        {/* Main content: Sidebar + Form */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">
              <ContactSidebar />
              <ContactForm />
            </div>
          </div>
        </section>

        <ContactMap />
      </main>
      <Footer />
    </CartProvider>
  );
}
