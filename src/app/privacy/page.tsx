import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Beans & Beyond collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <CartProvider>
      <Header />
      <main id="main-content" className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-black text-[#6F4E37] mb-3">Privacy Policy</h1>
          <p className="text-[#333]/50 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

          {[
            {
              title: "1. Who We Are",
              content: `Beans & Beyond is a coffee shop and café located at 819 Commercial Rd, London E14 7HG. We are committed to protecting your personal data in compliance with the UK GDPR and the Data Protection Act 2018.`,
            },
            {
              title: "2. Data We Collect",
              content: `When you place an order or contact us, we collect: your name, email address, phone number, delivery address, and order details. We also collect anonymised analytics data about how you use our website.`,
            },
            {
              title: "3. How We Use Your Data",
              content: `We use your data to: process and fulfil your orders, send order confirmations and updates, respond to your enquiries, and (with your consent) send marketing emails. We do not sell your data to third parties.`,
            },
            {
              title: "4. Cookies",
              content: `We use essential cookies to keep your cart session and a small number of analytics cookies (Google Analytics) to understand how visitors use our site. You can opt out at any time.`,
            },
            {
              title: "5. Your Rights",
              content: `You have the right to access, correct, or delete your personal data. To exercise these rights, email us at hello@bbcafe.co.uk. You also have the right to lodge a complaint with the ICO (ico.org.uk).`,
            },
            {
              title: "6. Contact",
              content: `Data Controller: Beans & Beyond, 819 Commercial Rd, London E14 7HG. Email: hello@bbcafe.co.uk`,
            },
          ].map(({ title, content }) => (
            <section key={title} className="mb-8">
              <h2 className="text-xl font-bold text-[#6F4E37] mb-3">{title}</h2>
              <p className="text-[#333]/70 leading-relaxed">{content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
