"use client";

import { useState } from "react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

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

  return (
    <section className="bg-[#1C1917] text-white py-14 md:py-20">
      <div className="max-w-md mx-auto px-8 md:px-10 text-center">
        <h2 className="text-xl md:text-2xl font-light tracking-[-0.01em] mb-3 uppercase">
          The Letter
        </h2>
        <p className="text-white/35 text-sm leading-relaxed mb-8">
          Written from the medina. Sent when it matters.
        </p>
        {subscribed ? (
          <p className="text-white/50 text-sm">You&apos;re in.</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-3 max-w-xs mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border-b border-white/15 text-white text-sm py-2.5 px-0 placeholder:text-white/15 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="text-[11px] tracking-[0.08em] uppercase text-white/40 hover:text-white transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {isSubscribing ? "..." : "Join →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
