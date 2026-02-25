import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BookHero from "@/components/book/BookHero";
import BookSidebar from "@/components/book/BookSidebar";
import BookingForm from "@/components/book/BookingForm";

export default function BookPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content" className="bg-[#F8F4EF]">
        <BookHero />

        {/* Main: form + sidebar */}
        <section className="section-padding">
          <div className="container-site">
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <BookSidebar />
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </CartProvider>
  );
}
