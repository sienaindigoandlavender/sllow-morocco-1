"use client";

import { useState } from "react";

export default function JourneyLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 md:py-28 border-t border-foreground/10">
      <div className="max-w-lg">

        {status === "success" ? (
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              You're in
            </p>
            <p className="font-serif text-2xl md:text-3xl mb-4">
              The letter will find you.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Written from the medina. Sent when it matters.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              There is more
            </p>

            <p className="font-serif text-2xl md:text-3xl mb-6">
              This is just the shape of the route.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
              The full story — where the road changes, what the maps don't name,
              which detours are worth the dust — lives in the Slow Morocco letter.
              Written from the medina. Sent when it matters.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent border-b border-foreground/30 focus:border-foreground outline-none py-2 text-sm placeholder:text-muted-foreground transition-colors"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="text-sm tracking-[0.15em] uppercase py-2 px-6 border border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background transition-all disabled:opacity-40 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "Join the letter"}
              </button>
            </form>

            {status === "error" && (
              <p className="text-red-600 text-xs mt-3">{message}</p>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              No frequency promises. Unsubscribe anytime.
            </p>
          </>
        )}

      </div>
    </section>
  );
}
