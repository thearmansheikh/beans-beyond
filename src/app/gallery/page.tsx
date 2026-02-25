import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content">
        <GalleryHero />
        <GalleryGrid />
      </main>
      <Footer />
    </CartProvider>
  );
}
