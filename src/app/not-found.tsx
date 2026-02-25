import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const QUICK_LINKS = [
  { href: "/",         emoji: "🏠", label: "Home"         },
  { href: "/menu",     emoji: "🍽️", label: "Menu"         },
  { href: "/order",    emoji: "🛒", label: "Order Online" },
  { href: "/catering", emoji: "🎉", label: "Catering"     },
  { href: "/contact",  emoji: "✉️",  label: "Contact"      },
];

export default function NotFound() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content" className="min-h-[70vh] bg-[#F8F4EF] flex items-center justify-center py-20">
        <div className="container-site text-center max-w-xl">

          {/* Big 404 */}
          <div className="relative inline-block mb-8">
            <p className="text-[10rem] sm:text-[14rem] font-black text-[#1A0E07]/5 leading-none select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center shadow-2xl shadow-[#D2691E]/40 rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-4xl">☕</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#1A0E07] mb-4">
            Oops — page not found
          </h1>
          <p className="text-[#333]/55 leading-relaxed mb-8 max-w-sm mx-auto">
            Looks like this page wandered off. Maybe it went for a coffee break.
            Let&rsquo;s get you back somewhere useful.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {QUICK_LINKS.map(({ href, emoji, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EEE6DC] text-[#333]/70 text-sm font-semibold rounded-xl hover:border-[#D2691E]/40 hover:text-[#D2691E] hover:shadow-md transition-all"
              >
                <span>{emoji}</span>
                {label}
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#D2691E]/25 text-base"
          >
            Take me home →
          </Link>

        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
