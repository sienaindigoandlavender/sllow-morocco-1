"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Currency options
const currencies = [
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
  { code: "MAD", symbol: "DH" },
];



interface FooterLink {
  label: string;
  href: string | null;
  type?: string;
}

interface FooterColumn {
  number: number;
  title: string;
  links: FooterLink[];
}

interface FooterData {
  brandId: string;
  newsletter: {
    show: boolean;
    backgroundImage: string;
    title: string;
    description: string;
    brandName: string;
  };
  columns: FooterColumn[];
  contentSites: { label: string; url: string }[];
  legal: FooterLink[];
  copyright: {
    year: number;
    name: string;
  };
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  
  // Currency state
  const [currentCurrency, setCurrentCurrency] = useState("EUR");

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFooterData(data.data);
        }
      })
      .catch((err) => console.error("Footer fetch error:", err));
  }, []);

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem("slowmorocco_currency");
    if (savedCurrency) setCurrentCurrency(savedCurrency);
  }, []);

  // Clean up any stale Google Translate cookies
  useEffect(() => {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.slowmorocco.com";
    localStorage.removeItem("slowmorocco_language");
  }, []);



  const handleCurrencyChange = (code: string) => {
    setCurrentCurrency(code);
    localStorage.setItem("slowmorocco_currency", code);
    window.dispatchEvent(new CustomEvent("currencyChange", { detail: code }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Fallback values
  const newsletter = footerData?.newsletter || {
    show: true,
    backgroundImage: "",
    title: "Stay curious",
    description: "Stories, routes, and cultural insights from Morocco.",
    brandName: "Slow Morocco",
  };

  const columns = footerData?.columns || [];
  const contentSites = footerData?.contentSites || [];
  const legal = footerData?.legal || [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Glossary", href: "/glossary" },
  ];
  const copyright = footerData?.copyright || {
    year: new Date().getFullYear(),
    name: "Slow Morocco",
  };

  return (
    <footer>

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 2: Navigation — clean, minimal
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#161616]">
        <div className="px-8 md:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="text-[13px] tracking-[0.25em] uppercase text-white/80">
                  Slow Morocco
                </span>
              </Link>
              <p className="text-sm text-white/30 leading-relaxed max-w-xs">
                The definitive cultural guide to Morocco.
              </p>
            </div>

            {/* Stories */}
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-5">Stories</h4>
              <ul className="space-y-1">
                <li><Link href="/stories" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">All Stories</Link></li>
                <li><Link href="/stories/category/history" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">History</Link></li>
                <li><Link href="/stories/category/architecture" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Architecture</Link></li>
                <li><Link href="/stories/category/food" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Food</Link></li>
                <li><Link href="/stories/category/culture" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Culture</Link></li>
              </ul>
            </div>

            {/* Places & Journeys */}
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-5">Explore</h4>
              <ul className="space-y-1">
                <li><Link href="/places" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Places</Link></li>
                <li><Link href="/destinations" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Destinations</Link></li>
                <li><Link href="/journeys" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Journeys</Link></li>
                <li><Link href="/stories/category/before-you-go" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Before You Go</Link></li>
                <li><Link href="/glossary" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Glossary</Link></li>
                <li><Link href="/darija" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Darija Dictionary</Link></li>
                <li><a href="https://www.derb.so" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Derb — City Guide</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-5">About</h4>
              <ul className="space-y-1">
                <li><Link href="/about" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Who We Are</Link></li>
                <li><Link href="/manifesto" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Manifesto</Link></li>
                <li><Link href="/plan-your-trip" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Plan a Trip</Link></li>
                <li><Link href="/booking-conditions" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Booking Conditions</Link></li>
                <li><Link href="/payments" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Payments</Link></li>
                <li><Link href="/cancellations-and-refunds" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Cancellations & Refunds</Link></li>
                <li><Link href="/faq" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">FAQ</Link></li>
                <li><Link href="/contact" className="text-sm text-white/50 hover:text-white/80 transition-colors inline-block py-1.5">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 5: Legal & Copyright (from Nexus)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-6 bg-[#0e0e0e]">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legal.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href || "#"}
                  className="text-[10px] tracking-[0.1em] uppercase text-white/30 hover:text-white/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Right side: Language, Currency, Copyright */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Currency selector */}
              <select
                value={currentCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="bg-transparent text-[10px] tracking-[0.1em] uppercase text-white/30 hover:text-white/50 focus:outline-none cursor-pointer appearance-none pr-3"
                style={{ backgroundImage: 'none' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} className="bg-[#0e0e0e] text-white/50">
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
              
              {/* Copyright */}
              <p className="text-[10px] tracking-[0.1em] text-white/20">
                © {copyright.year} {copyright.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LEVEL 6: Powered by
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-2.5 bg-[#080808]">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <p className="text-[9px] tracking-[0.15em] uppercase text-white/50 text-center">
            Powered by <a href="https://www.dancingwiththelions.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Dancing with Lions</a>
          </p>
        </div>
      </section>

    </footer>
  );
}
