import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Beans & Beyond's website and ordering service.",
};

export default function TermsPage() {
  return (
    <CartProvider>
      <Header />
      <main className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-black text-[#6F4E37] mb-3">Terms & Conditions</h1>
          <p className="text-[#333]/50 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

          {[
            {
              title: "1. Acceptance",
              content: "By using our website or placing an order, you agree to these terms. If you do not agree, please do not use our services.",
            },
            {
              title: "2. Online Ordering",
              content: "Orders placed online are subject to availability. We reserve the right to refuse or cancel any order. Once confirmed, cancellations must be made within 5 minutes of ordering.",
            },
            {
              title: "3. Pricing",
              content: "All prices are in GBP and include VAT where applicable. We reserve the right to change prices at any time. Delivery fees and service charges will be shown at checkout.",
            },
            {
              title: "4. Allergens",
              content: "While we take every care to identify allergens, our kitchen handles nuts, dairy, gluten, and other common allergens. We cannot guarantee a completely allergen-free environment. Please notify staff of allergies before ordering.",
            },
            {
              title: "5. Intellectual Property",
              content: "All content on this website (text, images, logos) is owned by Beans & Beyond and may not be reproduced without written permission.",
            },
            {
              title: "6. Limitation of Liability",
              content: "We are not liable for any indirect or consequential loss arising from use of our website or services, to the fullest extent permitted by law.",
            },
            {
              title: "7. Governing Law",
              content: "These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts.",
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
