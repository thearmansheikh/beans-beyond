import Link from "next/link";
import {
  FiMapPin, FiPhone, FiMail, FiArrowRight,
} from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { RESTAURANT, HOURS } from "@/utils/constants";
import NewsletterForm from "./NewsletterForm";

const NAV_LINKS = [
  { href: "/",        label: "Home"         },
  { href: "/menu",    label: "Menu"         },
  { href: "/order",   label: "Order Online" },
  { href: "/about",   label: "About Us"     },
  { href: "/contact", label: "Contact"      },
];

const SOCIAL = [
  { href: RESTAURANT.social.instagram, Icon: FaInstagram, label: "Instagram" },
  { href: RESTAURANT.social.facebook,  Icon: FaFacebook,  label: "Facebook"  },
  { href: RESTAURANT.social.tiktok,    Icon: FaTiktok,    label: "TikTok"    },
];

export default function Footer() {
  return (
    <footer className="bg-[#110805] text-white">

      {/* ══ Newsletter banner ══ */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#3D2A1C] via-[#6F4E37] to-[#3D2A1C]">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -top-16 left-1/4 w-64 h-64 rounded-full bg-[#D2691E]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-1/4 w-48 h-48 rounded-full bg-[#D2691E]/20 blur-3xl" />
        {/* Diagonal grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_0,transparent_50%)] [background-size:14px_14px]" />

        <div className="relative container-site py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Copy */}
            <div className="text-center lg:text-left max-w-md">
              <p className="inline-block text-[#D2691E] text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#D2691E]/40 bg-[#D2691E]/10">
                Exclusive offer
              </p>
              <h2 className="font-black text-2xl sm:text-3xl text-white leading-tight mb-2">
                Get 10% off your first order
              </h2>
              <p className="text-white/60 text-sm">
                Join our community for weekly specials, early access deals &amp; café news.
              </p>
            </div>
            {/* Form */}
            <div className="w-full lg:w-auto shrink-0 lg:min-w-[420px]">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* ══ Main body ══ */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Brand column ── */}
          <div className="lg:col-span-4 sm:col-span-2">
            {/* Logo row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#D2691E] to-[#6F4E37] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-black/40 shrink-0">
                B&amp;B
              </div>
              <div>
                <p className="font-black text-white text-lg leading-tight">
                  Beans &amp; Beyond
                </p>
                <p className="text-[11px] text-white/40 uppercase tracking-[0.18em]">
                  Halal Café &amp; Restaurant
                </p>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
              A cosy café on Commercial Road, East London. Serving fresh food,
              exceptional coffee, and a warm welcome — seven days a week.
            </p>

            {/* Halal badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/40 border border-green-700/40 text-green-400 text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              100% Halal Certified
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#D2691E] hover:border-[#D2691E] hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-black text-white/35 uppercase tracking-[0.2em] mb-5">
              Explore
            </h3>
            <ul className="space-y-3.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/55 hover:text-[#D2691E] transition-colors"
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Opening Hours ── */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black text-white/35 uppercase tracking-[0.2em] mb-5">
              Opening Hours
            </h3>
            <ul className="space-y-2.5">
              {HOURS.map(({ day, open, close, closed }) => (
                <li key={day} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-white/50 w-[100px] shrink-0">{day}</span>
                  {closed ? (
                    <span className="text-red-400 text-xs font-semibold px-2 py-0.5 bg-red-900/30 rounded-full">Closed</span>
                  ) : (
                    <span className="text-white/70 tabular-nums text-xs whitespace-nowrap font-medium">
                      {open} – {close}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black text-white/35 uppercase tracking-[0.2em] mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={RESTAURANT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 group"
                >
                  <FiMapPin className="w-4 h-4 text-[#D2691E] mt-0.5 shrink-0" />
                  <span className="text-white/55 group-hover:text-white/80 transition-colors text-sm leading-snug">
                    {RESTAURANT.address}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${RESTAURANT.phone}`} className="flex gap-3 items-center group">
                  <FiPhone className="w-4 h-4 text-[#D2691E] shrink-0" />
                  <span className="text-white/55 group-hover:text-white/80 transition-colors text-sm">
                    {RESTAURANT.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${RESTAURANT.email}`} className="flex gap-3 items-center group">
                  <FiMail className="w-4 h-4 text-[#D2691E] shrink-0" />
                  <span className="text-white/55 group-hover:text-white/80 transition-colors text-sm">
                    {RESTAURANT.email}
                  </span>
                </a>
              </li>
            </ul>

            <Link
              href="/order"
              className="inline-flex items-center gap-2 mt-7 px-5 py-3 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white text-sm font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/20"
            >
              Order Now
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* ══ Divider ══ */}
      <div className="border-t border-white/[0.07]" />

      {/* ══ Bottom bar ══ */}
      <div className="container-site py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Beans &amp; Beyond &middot; All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy"   className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms"     className="hover:text-white/60 transition-colors">Terms &amp; Conditions</Link>
            <Link href="/allergens" className="hover:text-white/60 transition-colors">Allergen Info</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
