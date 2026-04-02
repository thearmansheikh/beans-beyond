"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FiShoppingCart, FiMenu, FiX, FiPhone, FiMapPin,
  FiInstagram, FiFacebook, FiChevronDown, FiTag, FiCalendar, FiArrowRight,
  FiHome, FiGrid, FiPackage, FiInfo, FiMail,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { useCart, useCartHydrated } from "@/context/CartContext";
import { RESTAURANT, MENU_CATEGORIES, MENU_ITEMS } from "@/utils/constants";
import { isRestaurantOpen, getTodayHours } from "@/utils/helpers";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/menu",     label: "Menu",    dropdown: true },
  { href: "/order",    label: "Order"    },
  { href: "/catering", label: "Catering" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

const MENU_CATS   = MENU_CATEGORIES.filter((c) => c.slug !== "all");
const CHEFS_PICK  = MENU_ITEMS.find((i) => i.chefsPick && i.available) ?? null;

const PROMO_KEY = "bb-promo-v1";

export default function Header() {
  const pathname  = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [dropOpen,   setDropOpen]   = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const dropRef   = useRef<HTMLDivElement>(null);
  const hydrated  = useCartHydrated();
  const { itemCount } = useCart();
  const open = isRestaurantOpen();

  const isHome      = pathname === "/";
  const transparent = isHome && !scrolled;

  /* ── Promo banner: show unless previously dismissed ── */
  useEffect(() => {
    if (!localStorage.getItem(PROMO_KEY)) setShowBanner(true);
  }, []);

  /* ── Keep CSS variable in sync so sticky children (e.g. filter bar) can offset correctly ── */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-h",
      showBanner ? "156px" : "108px"
    );
  }, [showBanner]);

  const dismissBanner = () => {
    localStorage.setItem(PROMO_KEY, "1");
    setShowBanner(false);
  };

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => setMenuOpen(false), [pathname]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Helpers ── */
  const navText    = transparent ? "text-white/80 hover:text-white" : "text-[#2C1A0E]/80 hover:text-[#6F4E37]";
  const navActive  = transparent ? "text-white"                     : "text-[#D2691E]";
  const navHoverBg = transparent ? "hover:bg-white/10"              : "hover:bg-[#F5F5DC]/80";
  const activeBar  = transparent ? "bg-white"                       : "bg-[#D2691E]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? "bg-transparent"
            : "bg-white/97 backdrop-blur-lg border-b border-gray-100/80 shadow-[0_1px_24px_rgba(0,0,0,0.07)]"
        }`}
      >
        {/* ══ Promo banner ══ */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            showBanner ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative bg-gradient-to-r from-[#D2691E] via-[#C85E18] to-[#E8944A] text-white overflow-hidden">
            {/* subtle diagonal stripe overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }}
            />
            <div className="relative container-site flex items-center justify-center gap-2 py-2.5 px-8">
              <FiTag className="w-3 h-3 shrink-0 opacity-80 hidden xs:block" />
              <p className="text-[11px] sm:text-xs font-semibold text-center leading-snug">
                <span className="hidden xs:inline">🎉 </span>Free delivery over £20 — use code{" "}
                <strong className="font-black tracking-wide bg-white/20 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                  FREEBEAN
                </strong>
              </p>
            </div>
            <button
              onClick={dismissBanner}
              aria-label="Dismiss promotion"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ══ Top info bar — slides away on homepage ══ */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            transparent ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="bg-[#1A0E07] text-white/70 text-xs">
            <div className="container-site flex items-center justify-between py-2">
              {/* Left: phone + live status */}
              <div className="flex items-center gap-5">
                <a
                  href={`tel:${RESTAURANT.phone}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <FiPhone className="w-3 h-3" />
                  {RESTAURANT.phone}
                </a>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      open ? "bg-green-400 animate-pulse-dot" : "bg-red-400"
                    }`}
                  />
                  <span className={open ? "text-green-300 font-medium" : "text-red-300 font-medium"}>
                    {open ? "Open Now" : "Closed"}
                  </span>
                  <span className="text-white/20 mx-1">·</span>
                  <span>Today {getTodayHours()}</span>
                </span>
              </div>

              {/* Centre: address (desktop) */}
              <a
                href={RESTAURANT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <FiMapPin className="w-3 h-3" />
                {RESTAURANT.address}
              </a>

              {/* Right: socials */}
              <div className="flex items-center gap-3.5">
                <a href={RESTAURANT.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <FiInstagram className="w-3.5 h-3.5" />
                </a>
                <a href={RESTAURANT.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <FiFacebook className="w-3.5 h-3.5" />
                </a>
                <a href={RESTAURANT.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <FaTiktok className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Main nav ══ */}
        <div className="container-site">
          <div className="relative flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              {/* Icon mark */}
              <div className={`relative w-11 h-11 rounded-[14px] flex items-center justify-center font-black leading-none select-none transition-all duration-300 ${
                transparent
                  ? "bg-white/12 border border-white/20 group-hover:bg-white/20"
                  : "bg-[#6F4E37] group-hover:bg-[#4A3425]"
              }`}>
                <span className={`text-[13px] font-black tracking-tight ${transparent ? "text-white" : "text-white"}`}>
                  B&amp;B
                </span>
                {/* Orange accent dot */}
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#D2691E] border-2 border-white shadow-sm" />
              </div>

              {/* Wordmark */}
              <div className="hidden sm:block">
                <p className={`font-black text-[17px] leading-tight transition-colors duration-300 ${
                  transparent ? "text-white" : "text-[#1A0E07]"
                }`}>
                  Beans &amp; Beyond
                </p>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  transparent ? "text-white/45" : "text-[#6F4E37]/55"
                }`}>
                  Halal Café &amp; Restaurant
                </p>
              </div>
            </Link>

            {/* ── Desktop nav — truly centred via absolute positioning ── */}
            <nav
              className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label, dropdown }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

                /* Menu link with dropdown */
                if (dropdown) {
                  return (
                    <div
                      key={href}
                      ref={dropRef}
                      className="relative"
                      onMouseEnter={() => setDropOpen(true)}
                      onMouseLeave={() => setDropOpen(false)}
                    >
                      <Link
                        href={href}
                        className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-[13.5px] font-semibold rounded-xl transition-all duration-200 ${
                          active ? navActive : `${navText} ${navHoverBg}`
                        }`}
                      >
                        {label}
                        <FiChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                        />
                        {active && (
                          <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full ${activeBar}`} />
                        )}
                      </Link>

                      {/* ── Mega menu dropdown ── */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ${
                          dropOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        <div className="bg-white rounded-2xl shadow-2xl shadow-black/12 border border-gray-100 overflow-hidden w-[430px]">

                          {/* Header strip */}
                          <div className="flex items-center justify-between px-4 py-3 bg-[#F8F4EF] border-b border-[#EEE6DC]">
                            <p className="text-[10px] font-black text-[#6F4E37]/55 uppercase tracking-[0.2em]">
                              Browse menu
                            </p>
                            <Link
                              href="/menu"
                              onClick={() => setDropOpen(false)}
                              className="flex items-center gap-1 text-[#D2691E] text-xs font-bold hover:underline"
                            >
                              View all
                              <FiArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          {/* Body */}
                          <div className="flex">

                            {/* Left: category list */}
                            <div className="flex-1 p-2">
                              {MENU_CATS.map((cat) => {
                                const count = MENU_ITEMS.filter(
                                  (i) => i.category === cat.slug && i.available
                                ).length;
                                return (
                                  <Link
                                    key={cat.slug}
                                    href={`/menu#cat-${cat.slug}`}
                                    onClick={() => setDropOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F4EF] text-[#2C1A0E]/65 hover:text-[#6F4E37] transition-colors group"
                                  >
                                    <span className="w-8 h-8 rounded-lg bg-[#F8F4EF] group-hover:bg-[#EEE6DC] flex items-center justify-center text-base shrink-0 transition-colors">
                                      {cat.icon}
                                    </span>
                                    <span className="text-sm font-semibold flex-1">{cat.name}</span>
                                    <span className="text-[10px] font-black text-[#333]/30 tabular-nums">
                                      {count}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Divider */}
                            <div className="w-px bg-gray-100 my-3" />

                            {/* Right: featured */}
                            <div className="w-[172px] shrink-0 p-3 flex flex-col gap-3">

                              {/* Chef's Pick card */}
                              {CHEFS_PICK && (
                                <Link
                                  href="/menu"
                                  onClick={() => setDropOpen(false)}
                                  className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-[#D2691E]/30 transition-colors"
                                >
                                  <div className="relative h-[100px] bg-gradient-to-br from-amber-900 to-amber-700">
                                    <Image
                                      src={CHEFS_PICK.imageUrl}
                                      alt={CHEFS_PICK.name}
                                      fill
                                      sizes="172px"
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                                    <span className="absolute top-2 left-2 text-[9px] font-black bg-white text-[#1A0E07] px-2 py-0.5 rounded-full shadow-sm">
                                      ⭐ Chef&rsquo;s Pick
                                    </span>
                                    <div className="absolute bottom-2 left-2 right-2">
                                      <p className="text-white font-bold text-xs leading-tight line-clamp-1">{CHEFS_PICK.name}</p>
                                      <p className="text-white/60 text-[10px] mt-0.5">£{CHEFS_PICK.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                </Link>
                              )}

                              {/* Rating blurb */}
                              <div className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl bg-[#F8F4EF] text-center">
                                <p className="text-yellow-500 text-sm leading-none">{"★★★★☆"}</p>
                                <p className="text-[#6F4E37] font-black text-base mt-1">{RESTAURANT.rating} / 5</p>
                                <p className="text-[#333]/40 text-[10px] mt-0.5">{RESTAURANT.reviewCount} Google reviews</p>
                              </div>

                              {/* Order CTA */}
                              <Link
                                href="/order"
                                onClick={() => setDropOpen(false)}
                                className="flex items-center justify-center gap-1.5 py-2.5 bg-[#D2691E] text-white text-xs font-black rounded-xl hover:bg-[#B5571A] transition-colors shadow-md shadow-[#D2691E]/25"
                              >
                                Order Now
                                <FiArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* Regular link */
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-3 py-2 text-[13.5px] font-semibold rounded-xl transition-all duration-200 ${
                      active ? navActive : `${navText} ${navHoverBg}`
                    }`}
                  >
                    {label}
                    {active && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full ${activeBar}`} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">

              {/* Halal badge — large desktop only */}
              <span className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black border transition-all duration-300 ${
                transparent
                  ? "bg-white/12 border-white/25 text-white/90"
                  : "bg-[#D2691E]/10 border-[#D2691E]/25 text-[#D2691E]"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                100% Halal
              </span>

              {/* Cart */}
              <Link
                href="/order"
                className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                  transparent
                    ? "text-white/90 hover:bg-white/12"
                    : "text-[#6F4E37] hover:bg-[#F8F4EF]"
                }`}
                aria-label="View cart"
              >
                <FiShoppingCart className="w-5 h-5" />
                {hydrated && itemCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#D2691E] text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-md ring-2 ring-white">
                    {itemCount()}
                  </span>
                )}
              </Link>

              {/* Book CTA — desktop only */}
              <Link
                href="/book"
                className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-black rounded-xl transition-all active:scale-[0.97] border-2 ${
                  transparent
                    ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                    : "border-[#6F4E37]/35 text-[#6F4E37] hover:border-[#6F4E37] hover:bg-[#6F4E37]/8"
                }`}
              >
                <FiCalendar className="w-4 h-4" />
                Book a Table
              </Link>

              {/* Order CTA */}
              <Link
                href="/order"
                className={`hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-black rounded-xl transition-all active:scale-[0.97] shadow-md hover:shadow-lg ${
                  transparent
                    ? "bg-[#D2691E] text-white hover:bg-[#B5571A] shadow-[#D2691E]/40"
                    : "bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white hover:opacity-90 shadow-[#D2691E]/25"
                }`}
              >
                Order Now
                <FiArrowRight className="w-4 h-4" />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                  transparent
                    ? "text-white hover:bg-white/12"
                    : "text-[#6F4E37] hover:bg-[#F5F5DC]"
                }`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══ Mobile drawer ══ */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#1A0E07]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#6F4E37] flex items-center justify-center text-white font-black text-sm shadow-md">
                B&amp;B
              </div>
              <div>
                <p className="font-black text-white text-sm leading-tight">Beans &amp; Beyond</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                  Halal Café &amp; Restaurant
                </p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Open status pill */}
          <div className={`mx-4 mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl border ${
            open
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${open ? "bg-green-500 animate-pulse-dot" : "bg-red-400"}`} />
            <div>
              <p className={`text-xs font-bold leading-none ${open ? "text-green-700" : "text-red-600"}`}>
                {open ? "Open Now" : "Currently Closed"}
              </p>
              <p className="text-[11px] text-[#333]/50 mt-0.5">
                Today {getTodayHours()}
              </p>
            </div>
          </div>

          {/* Scrollable nav area */}
          <nav className="flex flex-col px-3 mt-3 gap-0.5 flex-1 overflow-y-auto" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              const NavIcon = {
                "/":         FiHome,
                "/menu":     FiGrid,
                "/order":    FiShoppingCart,
                "/catering": FiPackage,
                "/about":    FiInfo,
                "/contact":  FiMail,
              }[href] ?? FiHome;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-semibold transition-all ${
                    active
                      ? "bg-[#6F4E37]/10 text-[#D2691E]"
                      : "text-[#2C1A0E]/75 hover:bg-[#F8F4EF] hover:text-[#6F4E37]"
                  }`}
                >
                  <NavIcon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-[#D2691E]" : "text-[#6F4E37]/55"}`} />
                  <span>{label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D2691E]" />}
                </Link>
              );
            })}

            {/* Browse by category */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="px-4 py-1.5 text-[10px] font-bold text-[#333]/35 uppercase tracking-[0.18em]">
                Browse Menu
              </p>
              <div className="grid grid-cols-2 gap-1.5 px-1 pb-2">
                {MENU_CATS.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/menu#cat-${cat.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#2C1A0E]/65 hover:bg-[#F5F5DC] hover:text-[#6F4E37] transition-colors"
                  >
                    <span className="text-lg leading-none">{cat.icon}</span>
                    <span className="text-xs font-semibold">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Drawer footer */}
          <div className="px-4 pb-5 pt-3 border-t border-gray-100 space-y-3">
            {/* Address */}
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-xs text-[#333]/55 hover:text-[#6F4E37] transition-colors"
            >
              <FiMapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#6F4E37]" />
              {RESTAURANT.address}
            </a>

            {/* CTAs */}
            <div className="flex gap-2">
              <Link
                href="/book"
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 border-2 border-[#D2691E]/30 text-[#D2691E] font-bold rounded-2xl hover:bg-[#D2691E] hover:text-white hover:border-[#D2691E] transition-all text-sm"
              >
                <FiCalendar className="w-4 h-4" />
                Book
              </Link>
              <Link
                href="/order"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#D2691E] text-white font-bold rounded-2xl hover:bg-[#B5571A] transition-all text-sm shadow-md shadow-[#D2691E]/25"
              >
                <FiShoppingCart className="w-4 h-4" />
                Order
              </Link>
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="flex items-center justify-center p-3.5 border-2 border-[#6F4E37]/30 text-[#6F4E37] font-bold rounded-2xl hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] transition-all"
              >
                <FiPhone className="w-5 h-5" />
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center gap-5 pt-1">
              <a href={RESTAURANT.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-[#333]/30 hover:text-[#6F4E37] transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href={RESTAURANT.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-[#333]/30 hover:text-[#6F4E37] transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href={RESTAURANT.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-[#333]/30 hover:text-[#6F4E37] transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Spacer for fixed header ══ */}
      {/* On homepage the hero fills the full viewport behind the transparent header — no spacer needed */}
      {!isHome && <div className={showBanner ? "h-[156px]" : "h-[108px]"} />}
    </>
  );
}
