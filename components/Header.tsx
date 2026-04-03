"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          menuOpen
            ? "bg-transparent"
            : scrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-gradient-to-b from-black/30 to-transparent"
        }`}
      >
        <div className="px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="relative z-[60]"
            >
              <span
                className={`text-[13px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                  menuOpen
                    ? "text-[#1C1917]"
                    : scrolled
                    ? "text-foreground"
                    : "text-white"
                }`}
              >
                Slow Morocco
              </span>
            </Link>

            {/* Burger — all screen sizes */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[60] w-8 h-8 flex flex-col items-end justify-center gap-[5px] group"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-[1.5px] transition-all duration-500 origin-right ${
                  menuOpen
                    ? "w-6 bg-[#1C1917] rotate-[-40deg] translate-y-[0.5px]"
                    : `w-7 ${scrolled ? "bg-foreground" : "bg-white"} group-hover:w-6`
                }`}
              />
              <span
                className={`block h-[1.5px] transition-all duration-500 origin-right ${
                  menuOpen
                    ? "w-6 bg-[#1C1917] rotate-[40deg] translate-y-[-0.5px]"
                    : `w-5 ${scrolled ? "bg-foreground" : "bg-white"} group-hover:w-6`
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen menu overlay ─────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Sage background */}
        <div
          className={`absolute inset-0 bg-[#c8c4b8] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            menuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {/* Menu content */}
        <div
          className={`relative z-10 h-full flex flex-col justify-between px-6 md:px-10 lg:px-14 pt-20 md:pt-24 pb-6 transition-opacity duration-500 delay-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Scrollable content area */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
            <div className="flex flex-col md:flex-row md:gap-24 lg:gap-40">

            {/* Left column — Navigation */}
            <nav className="flex flex-col gap-0.5 md:gap-1 mb-8 md:mb-0">
              {[
                { href: "/morocco", label: "Morocco" },
                { href: "/stories", label: "Stories" },
                { href: "/places", label: "Places" },
                { href: "/destinations", label: "Destinations" },
                { href: "/journeys", label: "Journeys" },
                { href: "/epic", label: "Epic" },
                { href: "/stories/category/before-you-go", label: "Before You Go" },
                { href: "/darija", label: "Darija" },
                { href: "/plan-your-trip", label: "Plan a Trip" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#1C1917] hover:text-[#1C1917]/60 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-0.5">
                {/* Secondary links — hidden on mobile */}
                <div className="hidden md:flex flex-col gap-1 mt-6">
                  {[
                    { href: "/booking-conditions", label: "Booking Conditions" },
                    { href: "/payments", label: "Payments" },
                    { href: "/cancellations-and-refunds", label: "Cancellations & Refunds" },
                    { href: "/faq", label: "FAQ" },
                    { href: "/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm text-[#1C1917]/60 hover:text-[#1C1917]/90 transition-colors py-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              </nav>

              {/* Right column — Categories in large serif */}
              <div className="flex flex-col gap-0">
                {[
                  { href: "/stories/category/history", label: "History" },
                  { href: "/stories/category/architecture", label: "Architecture" },
                  { href: "/stories/category/culture", label: "Culture" },
                  { href: "/stories/category/food", label: "Food" },
                  { href: "/stories/category/craft", label: "Craft" },
                  { href: "/stories/category/music", label: "Music" },
                  { href: "/stories/category/people", label: "People" },
                  { href: "/stories/category/nature", label: "Nature" },
                  { href: "/stories/category/sacred", label: "Sacred" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-xl md:text-3xl lg:text-[2.5rem] text-[#1C1917] hover:text-[#1C1917]/50 transition-colors leading-[1.35]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom — Kinfolk-style compact search, bottom right */}
          <div className="pt-4 flex justify-end">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => setSearchOpen(true), 400);
              }}
              className="flex items-baseline gap-4"
            >
              <input
                name="q"
                type="text"
                placeholder="Type here to search"
                className="w-48 md:w-64 bg-transparent text-sm text-[#1C1917] placeholder:text-[#1C1917]/40 focus:outline-none border-b border-[#1C1917]/20 focus:border-[#1C1917]/50 pb-1 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setMenuOpen(false);
                    setTimeout(() => setSearchOpen(true), 400);
                  }
                }}
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.15em] uppercase text-[#1C1917]/50 hover:text-[#1C1917]/80 transition-colors shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
