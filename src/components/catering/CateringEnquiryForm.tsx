"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiUsers, FiCalendar } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { RESTAURANT } from "@/utils/constants";

type FormData = {
  name:       string;
  email:      string;
  phone:      string;
  eventType:  string;
  guests:     string;
  date:       string;
  budget:     string;
  message:    string;
};

const DEFAULT_FORM: FormData = {
  name: "", email: "", phone: "",
  eventType: "", guests: "", date: "", budget: "", message: "",
};

const INPUT_CLASS =
  "w-full px-4 py-3.5 bg-white border border-[#EEE6DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E]/40 focus:border-[#D2691E] transition-all";

export default function CateringEnquiryForm() {
  const [form, setForm]           = useState<FormData>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase.from("catering_enquiries").insert({
      name:        form.name,
      email:       form.email,
      phone:       form.phone || undefined,
      event_type:  form.eventType || undefined,
      guest_count: form.guests ? parseInt(form.guests.split(" ")[0]) : undefined,
      event_date:  form.date || undefined,
      budget:      form.budget || undefined,
      message:     form.message || undefined,
    });
    setLoading(false);
    if (dbError) {
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="enquire" className="section-padding bg-white">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">Get in touch</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">Request a catering quote</h2>
            <p className="text-[#333]/50 mt-3">
              We&rsquo;ll get back to you within 24 hours with a personalised proposal.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#D2691E]/8 border border-[#D2691E]/25 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#D2691E]/25">
                <FiCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#1A0E07] mb-3">Enquiry received!</h3>
              <p className="text-[#333]/60 mb-8 max-w-sm mx-auto">
                Thanks {form.name.split(" ")[0]}! We&rsquo;ll review your event details and get back to you within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => { setForm(DEFAULT_FORM); setSubmitted(false); }}
                  className="px-6 py-3 border-2 border-[#6F4E37] text-[#6F4E37] font-bold rounded-xl hover:bg-[#6F4E37] hover:text-white transition-all text-sm"
                >
                  Submit another enquiry
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm"
                >
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#F8F4EF] rounded-3xl p-8 sm:p-10 border border-[#EEE6DC] space-y-6"
            >
              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                    Full Name *
                  </label>
                  <input type="text" required value={form.name} onChange={set("name")} placeholder="Your name" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                    Email Address *
                  </label>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" className={INPUT_CLASS} />
                </div>
              </div>

              {/* Row 2: Phone + Event type */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                    Phone Number
                  </label>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+44..." className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                    Event Type *
                  </label>
                  <select required value={form.eventType} onChange={set("eventType")} className={`${INPUT_CLASS} appearance-none`}>
                    <option value="" disabled>Select event type</option>
                    <option>Corporate / Office</option>
                    <option>Birthday Party</option>
                    <option>Wedding / Nikah</option>
                    <option>Eid / Ramadan Event</option>
                    <option>Community Event</option>
                    <option>Baby Shower / Gender Reveal</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Guests + Date */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                    <FiUsers className="inline w-3 h-3 mr-1" />
                    Number of Guests *
                  </label>
                  <select required value={form.guests} onChange={set("guests")} className={`${INPUT_CLASS} appearance-none`}>
                    <option value="" disabled>Select guest count</option>
                    <option>10 – 20 guests</option>
                    <option>20 – 50 guests</option>
                    <option>50 – 100 guests</option>
                    <option>100 – 200 guests</option>
                    <option>200+ guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                    <FiCalendar className="inline w-3 h-3 mr-1" />
                    Event Date *
                  </label>
                  <input
                    type="date" required value={form.date} onChange={set("date")}
                    min={new Date().toISOString().split("T")[0]}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                  Approximate Budget
                </label>
                <select value={form.budget} onChange={set("budget")} className={`${INPUT_CLASS} appearance-none`}>
                  <option value="">Prefer not to say</option>
                  <option>Under £200</option>
                  <option>£200 – £500</option>
                  <option>£500 – £1,000</option>
                  <option>£1,000 – £2,500</option>
                  <option>£2,500+</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#1A0E07]/70 mb-2">
                  Tell us more
                </label>
                <textarea
                  rows={5} value={form.message} onChange={set("message")}
                  placeholder="Venue, dietary requirements, specific dishes you'd like, delivery address, timing..."
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/25 text-base flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
                ) : (
                  <>Send Enquiry<FiArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <p className="text-center text-xs text-[#333]/40">
                Or call us directly on{" "}
                <a href={`tel:${RESTAURANT.phone}`} className="text-[#D2691E] font-semibold hover:underline">
                  {RESTAURANT.phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
