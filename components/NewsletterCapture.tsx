"use client";

import { useState } from "react";

export default function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source_page: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="px-8 md:px-10 lg:px-14 py-8 md:py-10">
        <p className="font-serif text-lg text-white/85">
          Check your inbox to confirm.
        </p>
      </section>
    );
  }

  return (
    <section className="px-8 md:px-10 lg:px-14 py-8 md:py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-baseline justify-between gap-6"
      >
        <p className="font-serif text-lg md:text-xl text-white shrink-0">
          The intelligence layer. History, culture, craft.
        </p>
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Email Address"
            disabled={status === "loading"}
            className="flex-1 bg-transparent border-b border-white/40 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/70 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-[11px] tracking-[0.12em] uppercase border border-white/60 text-white/85 px-4 py-2 hover:bg-white hover:text-[#C4724A] transition-colors shrink-0 disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Submit"}
          </button>
        </div>
      </form>
      {status === "error" && (
        <p className="text-sm text-white/80 mt-3">
          Something went wrong. Try again.
        </p>
      )}
    </section>
  );
}
