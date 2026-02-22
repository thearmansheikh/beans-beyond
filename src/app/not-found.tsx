import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function NotFound() {
  return (
    <CartProvider>
      <Header />
      <main className="section-padding bg-white min-h-[60vh] flex items-center">
        <div className="container-site text-center">
          <p className="text-8xl mb-6">☕</p>
          <h1 className="text-5xl sm:text-6xl font-black text-[#6F4E37] mb-4">404</h1>
          <p className="text-xl font-semibold text-[#333] mb-2">Page not found</p>
          <p className="text-[#333]/60 mb-8 max-w-sm mx-auto">
            Looks like this page wandered off. Let&rsquo;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-[#6F4E37] text-white font-bold rounded-2xl hover:bg-[#4A3425] transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="px-8 py-3 border-2 border-[#6F4E37] text-[#6F4E37] font-bold rounded-2xl hover:bg-[#6F4E37] hover:text-white transition-all"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
