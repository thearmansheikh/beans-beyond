"use client";

import { useState } from "react";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { contactApi } from "@/services/api";
import { RESTAURANT } from "@/utils/constants";

const SUBJECTS = [
  "General Enquiry",
  "Table Booking",
  "Feedback",
  "Catering / Events",
  "Press & Media",
  "Other",
];

export default function ContactForm() {
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [form, setForm]       = useState({
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

  const INPUT_CLASS =
    "w-full px-4 py-3 border border-[#EEE6DC] rounded-xl text-sm text-[#1A0E07] placeholder-[#333]/30 focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all";

  return (
    <div className="lg:col-span-3">
      <div className="rounded-2xl border border-[#EEE6DC] p-8 lg:p-10 bg-white shadow-sm">
        {sent ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#D2691E]/25">
              <FiCheck className="w-9 h-9 text-white" />
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
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                  Phone Number
                </label>
                <input
                  id="phone" type="tel" placeholder="+44 7700 000000"
                  value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  className={INPUT_CLASS}
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
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-[#333] uppercase tracking-wide mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject" required
                value={form.subject} onChange={(e) => set("subject", e.target.value)}
                className={`${INPUT_CLASS} bg-white`}
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
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {error}{" "}
                  <a
                    href={`mailto:${RESTAURANT.email}`}
                    className="underline font-semibold hover:text-red-900"
                  >
                    Email us directly
                  </a>{" "}
                  instead.
                </span>
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
  );
}
