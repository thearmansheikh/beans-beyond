"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FiCheck, FiMapPin, FiClock, FiShoppingBag } from "react-icons/fi";
import { CartProvider, useCart, useCartHydrated } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Cart from "@/components/order/Cart";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/utils/constants";
import { formatPrice, generateOrderNumber } from "@/utils/helpers";
import toast from "react-hot-toast";
import type { OrderType, CheckoutFormData } from "@/types";

// ─────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
  const steps = ["Order Type", "Your Menu", "Checkout"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  done    ? "bg-green-500 text-white" :
                  active  ? "bg-[#6F4E37] text-white ring-4 ring-[#6F4E37]/20" :
                            "bg-gray-200 text-[#333]/40"
                }`}
              >
                {done ? <FiCheck className="w-4 h-4" /> : idx}
              </div>
              <span
                className={`mt-1 text-xs font-semibold whitespace-nowrap ${
                  active ? "text-[#6F4E37]" : done ? "text-green-600" : "text-[#333]/40"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-all ${
                  step > idx + 1 ? "bg-green-500" : step > idx ? "bg-[#6F4E37]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 1: Order type selection
// ─────────────────────────────────────────────
function Step1({ onNext }: { onNext: () => void }) {
  const { orderType, setOrderType } = useCart();

  const types: { type: OrderType; label: string; desc: string; Icon: typeof FiMapPin }[] = [
    { type: "dine-in",   label: "Dine In",   desc: "Order at your table",          Icon: FiShoppingBag },
    { type: "takeaway",  label: "Takeaway",  desc: "Pick up when ready",           Icon: FiClock       },
    { type: "delivery",  label: "Delivery",  desc: "Delivered to your door",       Icon: FiMapPin      },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[#6F4E37] mb-2">How would you like to order?</h2>
        <p className="text-[#333]/60 text-sm">Choose your preferred order method below.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {types.map(({ type, label, desc, Icon }) => (
          <button
            key={type}
            onClick={() => { setOrderType(type); onNext(); }}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all hover:border-[#6F4E37] hover:shadow-md ${
              orderType === type
                ? "border-[#6F4E37] bg-[#F5F5DC]/40"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-[#6F4E37]/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <div>
              <p className="font-bold text-[#333] text-lg">{label}</p>
              <p className="text-[#333]/50 text-sm">{desc}</p>
            </div>
            {orderType === type && (
              <div className="ml-auto w-6 h-6 rounded-full bg-[#6F4E37] flex items-center justify-center">
                <FiCheck className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 2: Menu browsing
// ─────────────────────────────────────────────
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { itemCount } = useCart();
  const hydrated = useCartHydrated();

  const filtered = MENU_ITEMS.filter(
    (i) => (activeCategory === "all" || i.category === activeCategory) && i.available
  );

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat.slug
                ? "bg-[#6F4E37] text-white"
                : "bg-[#F5F5DC] text-[#6F4E37] hover:bg-[#EDE8CC]"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {filtered.map((item) => (
          <MenuItemCard key={item._id} item={item} view="list" />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-200 text-[#333] font-bold rounded-xl hover:border-[#6F4E37] hover:text-[#6F4E37] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!hydrated || itemCount() === 0}
          className="flex-1 py-3 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#B5571A] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {hydrated && itemCount() > 0
            ? `Proceed to Checkout (${itemCount()} item${itemCount() > 1 ? "s" : ""})`
            : "Add items to continue"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 3: Checkout form
// ─────────────────────────────────────────────
function Step3({ onBack, onComplete }: { onBack: () => void; onComplete: (n: string) => void }) {
  const { orderType, subtotal, total, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Partial<CheckoutFormData>>({
    name: "", phone: "", email: "",
    orderType, paymentMethod: "card",
    tableNumber: "", specialInstructions: "",
    deliveryAddress: { street: "", city: "London", postcode: "", isDefault: false },
  });

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const orderNum = generateOrderNumber();
    clearCart();
    onComplete(orderNum);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
      {/* Left: form fields */}
      <div className="lg:col-span-2 space-y-6">
        {/* Contact */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#6F4E37] text-lg mb-4">Contact Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { id: "name",  label: "Full Name",  type: "text",  placeholder: "Jane Smith"         },
              { id: "phone", label: "Phone",       type: "tel",   placeholder: "+44 7700 000000"    },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-semibold text-[#333] mb-1.5">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  id={id} type={type} required placeholder={placeholder}
                  value={(form as Record<string, string>)[id] ?? ""}
                  onChange={(e) => set(id, e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-[#333] mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email" type="email" required placeholder="jane@example.com"
                value={form.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
              />
            </div>
          </div>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#6F4E37] text-lg mb-4">Order Details</h3>
          {orderType === "dine-in" && (
            <div>
              <label htmlFor="tableNumber" className="block text-sm font-semibold text-[#333] mb-1.5">
                Table Number <span className="text-red-500">*</span>
              </label>
              <input
                id="tableNumber" type="text" required placeholder="e.g. 5"
                value={form.tableNumber ?? ""}
                onChange={(e) => set("tableNumber", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] max-w-xs"
              />
            </div>
          )}
          {orderType === "takeaway" && (
            <div>
              <label htmlFor="pickupTime" className="block text-sm font-semibold text-[#333] mb-1.5">
                Preferred Pickup Time
              </label>
              <input
                id="pickupTime" type="time"
                value={form.pickupTime ?? ""}
                onChange={(e) => set("pickupTime", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] max-w-xs"
              />
            </div>
          )}
          {orderType === "delivery" && (
            <div className="space-y-3">
              {[
                { id: "street",   label: "Street Address", placeholder: "123 Example Street" },
                { id: "city",     label: "City",           placeholder: "London"              },
                { id: "postcode", label: "Postcode",       placeholder: "E14 7HG"             },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label htmlFor={`addr-${id}`} className="block text-sm font-semibold text-[#333] mb-1.5">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`addr-${id}`} type="text" required placeholder={placeholder}
                    value={(form.deliveryAddress?.[id as "street" | "city" | "postcode"] as string) ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        deliveryAddress: { ...f.deliveryAddress!, [id]: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <label htmlFor="instructions" className="block text-sm font-semibold text-[#333] mb-1.5">
              Special Instructions
            </label>
            <textarea
              id="instructions" rows={3}
              placeholder="Any allergies, special requests, or notes…"
              value={form.specialInstructions ?? ""}
              onChange={(e) => set("specialInstructions", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] resize-none"
            />
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#6F4E37] text-lg mb-4">Payment Method</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "card",       label: "Card",        icon: "💳" },
              { id: "paypal",     label: "PayPal",      icon: "🅿️" },
              { id: "apple-pay",  label: "Apple Pay",   icon: "🍎" },
              { id: "google-pay", label: "Google Pay",  icon: "🔵" },
            ].map(({ id, label, icon }) => (
              <button
                type="button" key={id}
                onClick={() => set("paymentMethod", id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  form.paymentMethod === id
                    ? "border-[#6F4E37] bg-[#F5F5DC]/40 text-[#6F4E37]"
                    : "border-gray-200 text-[#333]/60 hover:border-[#6F4E37]/40"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                {label}
              </button>
            ))}
          </div>
          <p className="text-[#333]/40 text-xs mt-3">
            Payment is processed securely. We never store card details.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button" onClick={onBack}
            className="px-6 py-3 border-2 border-gray-200 text-[#333] font-bold rounded-xl hover:border-[#6F4E37] hover:text-[#6F4E37] transition-all"
          >
            Back
          </button>
          <button
            type="submit" disabled={submitting}
            className="flex-1 py-3 bg-[#D2691E] text-white font-bold rounded-xl hover:bg-[#B5571A] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {submitting
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing…</>
              : `Place Order · ${formatPrice(total())}`}
          </button>
        </div>
      </div>

      {/* Right: cart summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#6F4E37] text-lg mb-4">Order Summary</h3>
          <Cart />
        </div>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// Order confirmation
// ─────────────────────────────────────────────
function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="text-center py-16 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <FiCheck className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-black text-[#6F4E37] mb-2">Order Confirmed!</h2>
      <p className="text-[#333]/60 mb-4">
        Your order <strong className="text-[#333]">{orderNumber}</strong> has been received.
      </p>
      <div className="bg-[#F5F5DC]/60 rounded-2xl p-5 mb-6 text-left">
        <p className="text-sm font-semibold text-[#6F4E37] mb-1">What happens next?</p>
        <ol className="text-[#333]/70 text-sm space-y-1 list-decimal list-inside">
          <li>We&rsquo;ll confirm your order via email</li>
          <li>Our team starts preparing your food</li>
          <li>You&rsquo;ll get a notification when it&rsquo;s ready</li>
        </ol>
      </div>
      <p className="text-2xl mb-4">☕</p>
      <p className="text-[#333]/60 text-sm italic mb-6">
        &ldquo;Sit back &amp; relax, your feast is on its way!&rdquo;
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-[#6F4E37] text-white font-bold rounded-xl hover:bg-[#4A3425] transition-all"
      >
        Back to Home
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Order page
// ─────────────────────────────────────────────
function OrderContent() {
  const [step, setStep]               = useState(1);
  const [orderNumber, setOrderNumber] = useState("");

  const handleComplete = (num: string) => {
    setOrderNumber(num);
    setStep(4);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C1A0E] to-[#6F4E37] py-16 text-center">
        <div className="container-site">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            Accepting Orders
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Order Online</h1>
          <p className="text-white/60 max-w-md mx-auto text-sm">
            Fresh food and great coffee — order ahead or get it delivered.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-[#F8F8F8]">
        <div className="container-site">
          {step < 4 && <StepIndicator step={step} />}

          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <Step3 onBack={() => setStep(2)} onComplete={handleComplete} />}
          {step === 4 && <OrderConfirmation orderNumber={orderNumber} />}
        </div>
      </section>
    </main>
  );
}

export default function OrderPage() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" />
      <Header />
      <OrderContent />
      <Footer />
    </CartProvider>
  );
}
