"use client";

import { useState } from "react";
import {
  FiMapPin, FiPhone, FiMail, FiClock, FiSend,
  FiCheck, FiAlertCircle, FiInstagram, FiFacebook,
  FiNavigation,
} from "react-icons/fi";
import { FaSubway, FaBus, FaParking } from "react-icons/fa";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { RESTAURANT, HOURS } from "@/utils/constants";
import { contactApi } from "@/services/api";

const SUBJECTS = [
  "General Enquiry",
  "Table Booking",
  "Feedback",
  "Catering / Events",
  "Press & Media",
  "Other",
];

const QUICK_LINKS = [
  {
    Icon: FiPhone,
    label: "Call us",
    value: RESTAURANT.phone,
    href: `tel:${RESTAURANT.phone}`,
    colour: "from-orange-500 to-amber-500",
  },
  {
    Icon: FiMail,
    label: "Email us",
    value: RESTAURANT.email,
    href: `mailto:${RESTAURANT.email}`,
    colour: "from-[#6F4E37] to-[#D2691E]",
  },
  {
    Icon: FiInstagram,
    label: "Instagram",
    value: "@bbcafe",
    href: RESTAURANT.social.instagram,
    colour: "from-pink-500 to-rose-500",
  },
  {
    Icon: FiFacebook,
    label: "Facebook",
    value: "/bbcafe",
    href: RESTAURANT.social.facebook,
    colour: "from-blue-600 to-blue-500",
  },
];

const TRANSPORT = [
  {
    Icon: FaSubway,
    mode: "Tube / DLR",
    detail: "Limehouse (DLR) — 5 min walk · Shadwell (Overground/DLR) — 8 min walk",
  },
  {
    Icon: FaBus,
    mode: "Bus",
    detail: "Routes D3, 15, 115 stop on Commercial Road right outside",
  },
  {
    Icon: FaParking,
    mode: "Parking",
    detail: "Free on-street parking on side roads after 6:30 pm weekdays & all day Sunday",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await contactApi.send(form);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <CartProvider>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#1A0E07] py-24 sm:py-32">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D2691E]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#6F4E37]/25 blur-3xl" />

          <div className="container-site relative text-center">
            <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-[#D2691E] border border-[#D2691E]/30 rounded-full bg-[#D2691E]/10">
              We&rsquo;d love to hear from you
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-5">
              Get in{" "}
              <span className="text-gradient-warm">Touch</span>
            </h1>
            <p className="text-white/55 max-w-lg mx-auto text-lg leading-relaxed">
              Questions, feedback, catering enquiries — or just want to say hello. We&rsquo;re always happy to chat.
            </p>
          </div>
        </section>

        {/* ── Quick contact strip ──────────────────────── */}
        <section className="bg-[#F8F4EF] border-b border-[#E8DDD4]">
          <div className="container-site">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E8DDD4] divide-y lg:divide-y-0">
              {QUICK_LINKS.map(({ Icon, label, value, href, colour }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 px-6 py-5 hover:bg-white transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colour} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#333]/50 font-semibold uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-bold text-[#1A0E07] truncate">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content: Sidebar + Form ────────────── */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">

              {/* Sidebar */}
              <aside className="lg:col-span-2 space-y-6">

                {/* Address card */}
                <div className="rounded-2xl border border-[#EEE6DC] p-6 bg-[#FDFAF7]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center">
                      <FiMapPin className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-black text-[#1A0E07]">Find Us</h3>
                  </div>
                  <p className="text-[#333]/70 text-sm leading-relaxed mb-4">{RESTAURANT.address}</p>
                  <a
                    href={RESTAURANT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D2691E] hover:text-[#B5571A] transition-colors"
                  >
                    <FiNavigation className="w-3.5 h-3.5" />
                    Open in Google Maps →
                  </a>
                </div>

                {/* Hours card */}
                <div className="rounded-2xl border border-[#EEE6DC] p-6 bg-[#FDFAF7]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6F4E37] to-[#9B6E50] flex items-center justify-center">
                      <FiClock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-black text-[#1A0E07]">Opening Hours</h3>
                  </div>
                  <ul className="space-y-2">
                    {HOURS.map(({ day, open, close, closed }) => (
                      <li key={day} className="flex justify-between text-sm">
                        <span className="text-[#333]/55 w-24 shrink-0">{day}</span>
                        {closed ? (
                          <span className="text-red-500 font-semibold text-xs bg-red-50 px-2 py-0.5 rounded-full">Closed</span>
                        ) : (
                          <span className="text-[#1A0E07] font-medium tabular-nums whitespace-nowrap">{open} – {close}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Find Us */}
                <div className="rounded-2xl border border-[#EEE6DC] p-6 bg-[#FDFAF7]">
                  <h3 className="font-black text-[#1A0E07] mb-4">How to Get Here</h3>
                  <ul className="space-y-4">
                    {TRANSPORT.map(({ Icon, mode, detail }) => (
                      <li key={mode} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#6F4E37]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-[#6F4E37]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1A0E07] uppercase tracking-wide mb-0.5">{mode}</p>
                          <p className="text-xs text-[#333]/60 leading-relaxed">{detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-[#EEE6DC] p-8 lg:p-10 bg-white shadow-sm">
                  {sent ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                        <FiCheck className="w-9 h-9 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-black text-[#1A0E07] mb-3">Message Sent!</h2>
                      <p className="text-[#333]/60 max-w-xs mx-auto leading-relaxed">
                        Thanks for reaching out. We&rsquo;ll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                        className="mt-8 text-sm font-semibold text-[#D2691E] hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1A0E07] mb-1">Send a Message</h2>
                        <p className="text-[#333]/50 text-sm">We typically reply within a few hours.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="name" type="text" required placeholder="Jane Smith"
                            value={form.name} onChange={(e) => set("name", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A0E07] placeholder-[#333]/30 focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                            Phone Number
                          </label>
                          <input
                            id="phone" type="tel" placeholder="+44 7700 000000"
                            value={form.phone} onChange={(e) => set("phone", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A0E07] placeholder-[#333]/30 focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email" type="email" required placeholder="jane@example.com"
                          value={form.email} onChange={(e) => set("email", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A0E07] placeholder-[#333]/30 focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject" required
                          value={form.subject} onChange={(e) => set("subject", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A0E07] focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] bg-white transition-all"
                        >
                          <option value="">Select a subject…</option>
                          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message" rows={5} required
                          placeholder="Tell us how we can help…"
                          value={form.message} onChange={(e) => set("message", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A0E07] placeholder-[#333]/30 focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] resize-none transition-all"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                          <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-[#D2691E]/25 disabled:opacity-70"
                      >
                        {sending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <FiSend className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-[#333]/40">
                        We&rsquo;ll never share your details with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Google Map ──────────────────────────────── */}
        <section className="bg-[#F8F4EF]">
          <div className="container-site py-12">
            <div className="rounded-2xl overflow-hidden border border-[#EEE6DC] shadow-sm">
              <iframe
                title="Beans & Beyond location"
                src={RESTAURANT.googleMapsEmbed}
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-[#333]/60">
                <strong className="text-[#1A0E07]">Beans &amp; Beyond</strong> · {RESTAURANT.address}
              </p>
              <a
                href={RESTAURANT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#D2691E] hover:text-[#B5571A] transition-colors"
              >
                <FiNavigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </CartProvider>
  );
}
