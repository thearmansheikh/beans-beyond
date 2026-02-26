"use client";

import { useState, type FormEvent } from "react";
import { FiCheck, FiArrowLeft, FiCreditCard, FiLock } from "react-icons/fi";
import { SiPaypal, SiApplepay, SiGooglepay } from "react-icons/si";
import { useCart } from "@/context/CartContext";
import Cart from "@/components/order/Cart";
import { formatPrice, generateOrderNumber } from "@/utils/helpers";
import { supabase } from "@/lib/supabase";
import type { CheckoutFormData } from "@/types";

const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A0E07] placeholder-[#333]/30 focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all";
const labelCls = "block text-xs font-bold text-[#333] uppercase tracking-wide mb-2";

export default function OrderStep3({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: (orderNumber: string) => void;
}) {
  const { orderType, items, subtotal, deliveryFee, serviceCharge, total, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Partial<CheckoutFormData>>({
    name: "", phone: "", email: "",
    orderType, paymentMethod: "card",
    tableNumber: "", specialInstructions: "",
    deliveryAddress: { street: "", city: "London", postcode: "", isDefault: false },
  });

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const [orderError, setOrderError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setOrderError(null);

    const deliveryAddress = orderType === "delivery"
      ? `${form.deliveryAddress?.street}, ${form.deliveryAddress?.city} ${form.deliveryAddress?.postcode}`
      : undefined;

    // 1. Insert order
    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_type:       orderType,
        customer_name:    form.name ?? "",
        customer_email:   form.email ?? undefined,
        customer_phone:   form.phone ?? undefined,
        delivery_address: deliveryAddress,
        table_number:     form.tableNumber ?? undefined,
        subtotal:         subtotal(),
        delivery_fee:     deliveryFee(),
        service_charge:   serviceCharge(),
        total:            total(),
        notes:            form.specialInstructions ?? undefined,
      })
      .select("id")
      .single();

    if (orderErr || !orderData) {
      setOrderError("Failed to place order. Please try again.");
      setSubmitting(false);
      return;
    }

    // 2. Insert order items
    const orderItems = items.map((item) => ({
      order_id:      orderData.id,
      menu_item_id:  item.menuItemId,
      name:          item.name,
      price:         item.price,
      quantity:      item.quantity,
      customizations: item.customizations ?? {},
      subtotal:      item.price * item.quantity,
    }));

    await supabase.from("order_items").insert(orderItems);

    const orderNum = generateOrderNumber();
    clearCart();
    onComplete(orderNum);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

      {/* ── Left: form ── */}
      <div className="lg:col-span-2 space-y-5">

        {/* Contact details */}
        <div className="bg-white rounded-2xl p-6 border border-[#EEE6DC] shadow-sm">
          <h3 className="font-black text-[#1A0E07] text-lg mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#D2691E] flex items-center justify-center text-white text-xs font-black">1</span>
            Contact Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelCls}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name" type="text" required placeholder="Jane Smith"
                value={form.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone" type="tel" required placeholder="+44 7700 000000"
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className={labelCls}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email" type="email" required placeholder="jane@example.com"
                value={form.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-2xl p-6 border border-[#EEE6DC] shadow-sm">
          <h3 className="font-black text-[#1A0E07] text-lg mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#D2691E] flex items-center justify-center text-white text-xs font-black">2</span>
            Order Details
          </h3>

          {orderType === "dine-in" && (
            <div>
              <label htmlFor="tableNumber" className={labelCls}>
                Table Number <span className="text-red-500">*</span>
              </label>
              <input
                id="tableNumber" type="text" required placeholder="e.g. 5"
                value={form.tableNumber ?? ""}
                onChange={(e) => set("tableNumber", e.target.value)}
                className={`${inputCls} max-w-xs`}
              />
            </div>
          )}

          {orderType === "takeaway" && (
            <div>
              <label htmlFor="pickupTime" className={labelCls}>Preferred Pickup Time</label>
              <input
                id="pickupTime" type="time"
                value={form.pickupTime ?? ""}
                onChange={(e) => set("pickupTime", e.target.value)}
                className={`${inputCls} max-w-xs`}
              />
            </div>
          )}

          {orderType === "delivery" && (
            <div className="space-y-4">
              {[
                { id: "street",   label: "Street Address", placeholder: "123 Example Street" },
                { id: "city",     label: "City",           placeholder: "London"              },
                { id: "postcode", label: "Postcode",       placeholder: "E14 7HG"             },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label htmlFor={`addr-${id}`} className={labelCls}>
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
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="instructions" className={labelCls}>Special Instructions</label>
            <textarea
              id="instructions" rows={3}
              placeholder="Allergies, special requests, notes for the kitchen…"
              value={form.specialInstructions ?? ""}
              onChange={(e) => set("specialInstructions", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl p-6 border border-[#EEE6DC] shadow-sm">
          <h3 className="font-black text-[#1A0E07] text-lg mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#D2691E] flex items-center justify-center text-white text-xs font-black">3</span>
            Payment Method
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "card",       label: "Card",       Icon: FiCreditCard },
              { id: "paypal",     label: "PayPal",     Icon: SiPaypal     },
              { id: "apple-pay",  label: "Apple Pay",  Icon: SiApplepay   },
              { id: "google-pay", label: "Google Pay", Icon: SiGooglepay  },
            ].map(({ id, label, Icon }) => (
              <button
                type="button" key={id}
                onClick={() => set("paymentMethod", id)}
                className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                  form.paymentMethod === id
                    ? "border-[#D2691E] bg-[#D2691E]/5 text-[#D2691E] shadow-md"
                    : "border-[#EEE6DC] text-[#333]/50 hover:border-[#D2691E]/40 hover:text-[#D2691E]"
                }`}
              >
                <Icon className="w-6 h-6" />
                {label}
              </button>
            ))}
          </div>
          <p className="text-[#333]/40 text-xs mt-4 flex items-center gap-1.5">
            <FiLock className="w-3.5 h-3.5 shrink-0" />
            Payment is processed securely. We never store card details.
          </p>
        </div>

        {orderError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{orderError}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button" onClick={onBack}
            className="flex items-center gap-2 px-6 py-3.5 border-2 border-[#EEE6DC] text-[#333]/70 font-bold rounded-xl hover:border-[#D2691E]/40 hover:text-[#D2691E] transition-all"
          >
            <FiArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit" disabled={submitting}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-base shadow-lg shadow-[#D2691E]/25"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <FiCheck className="w-4 h-4" />
                Place Order · {formatPrice(total())}
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Right: order summary ── */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 bg-white rounded-2xl p-6 border border-[#EEE6DC] shadow-sm">
          <h3 className="font-black text-[#1A0E07] text-lg mb-4">Order Summary</h3>
          <Cart />
        </div>
      </div>
    </form>
  );
}
