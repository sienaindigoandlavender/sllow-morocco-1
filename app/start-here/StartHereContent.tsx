"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const DEPOSIT_AMOUNT = "300.00";
const PAYPAL_CLIENT_ID =
  "AWVf28iPmlVmaEyibiwkOtdXAl5UPqL9i8ee9yStaG6qb7hCwNRB2G95SYwbcikLnBox6CGyO-boyAvu";

const DURATIONS = ["Under a week", "About a week", "10–14 days", "2 weeks or more"];
const PACES = ["Slow, few bases", "Some movement", "Cover a lot"];
const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "Not sure yet"];
const PARTY = ["Just me", "Two of us", "3–4", "5+"];

function PayPalDeposit({
  onSuccess,
  onError,
}: {
  onSuccess: (orderId: string) => void;
  onError: (err: any) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsInstance = useRef<any>(null);
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    const renderButton = async () => {
      if (!(window as any).paypal) {
        const existing = document.querySelector('script[src*="paypal.com/sdk"]');
        if (!existing) {
          const script = document.createElement("script");
          script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR`;
          script.async = true;
          document.body.appendChild(script);
          await new Promise((resolve) => { script.onload = resolve; });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
      if (!containerRef.current || !(window as any).paypal || !isMounted.current) return;
      try {
        containerRef.current.innerHTML = "";
        const paypal = (window as any).paypal;
        buttonsInstance.current = paypal.Buttons({
          style: { layout: "vertical", color: "black", shape: "rect", label: "pay", height: 50 },
          createOrder: (_: any, actions: any) =>
            actions.order.create({
              purchase_units: [
                {
                  description: "Slow Morocco — Planning Deposit",
                  amount: { value: DEPOSIT_AMOUNT, currency_code: "EUR" },
                },
              ],
            }),
          onApprove: async (_: any, actions: any) => {
            const order = await actions.order.capture();
            if (isMounted.current) onSuccess(order.id);
          },
          onError: (err: any) => { if (isMounted.current) onError(err); },
        });
        if (containerRef.current && isMounted.current) {
          await buttonsInstance.current.render(containerRef.current);
          setLoading(false);
        }
      } catch (err) {
        console.error("PayPal render error:", err);
        setLoading(false);
      }
    };
    renderButton();
    return () => {
      isMounted.current = false;
      if (buttonsInstance.current?.close) {
        try { buttonsInstance.current.close(); } catch (e) {}
      }
      buttonsInstance.current = null;
    };
  }, [onSuccess, onError]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center py-6">
          <div className="w-5 h-5 border border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}

export default function StartHereContent() {
  const [f, setF] = useState({
    firstName: "", lastName: "", email: "", country: "", partySize: "",
    duration: "", season: "", cities: "", pace: "", interests: "", budget: "", notes: "",
  });
  const [phase, setPhase] = useState<"form" | "deposit">("form");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  // Step 1: validate, then advance to deposit. Nothing is sent yet.
  const toDeposit = () => {
    setError("");
    if (!f.firstName || !f.email) {
      setError("Please add at least your name and email.");
      return;
    }
    setPhase("deposit");
  };

  // Step 2: only after PayPal captures €300 do we create the quote.
  const onPaid = async (orderId: string) => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: f.firstName,
          lastName: f.lastName,
          email: f.email,
          country: f.country,
          travelers: f.partySize,
          days: f.duration,
          startDate: f.season,
          startCity: f.cities,
          budget: f.budget,
          dreamExperience: f.interests,
          requests: f.pace ? `Pace: ${f.pace}` : "",
          notes: `${f.notes}${f.notes ? " — " : ""}Deposit paid (PayPal ${orderId})`,
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError(
        "Your payment went through, but we hit a snag saving your details. Please email hello@slowmorocco.com and we'll sort it immediately."
      );
    } finally {
      setSending(false);
    }
  };

  const label = "block text-xs tracking-[0.12em] uppercase text-foreground/50 mb-3";
  const input =
    "w-full px-0 py-2 border-0 border-b border-foreground/20 bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/25";
  const chip = (active: boolean) =>
    `px-4 py-2 text-sm border transition-colors ${
      active
        ? "border-foreground text-foreground"
        : "border-foreground/20 text-foreground/50 hover:text-foreground hover:border-foreground/40"
    }`;

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="font-serif text-3xl mb-4">Thank you.</h1>
          <p className="text-foreground/70 leading-relaxed mb-8">
            Your deposit is in and your details are with us. We&apos;ll read them properly and
            write back personally, usually within a couple of days, to begin building your journey.
          </p>
          <Link href="/journeys" className="text-sm border-b border-foreground/30 hover:border-foreground pb-0.5">
            Meanwhile, browse the journeys →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-foreground/10 py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm text-foreground/60 hover:text-foreground">← Slow Morocco</Link>
          <span className="text-sm text-foreground/40">Plan a journey</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {phase === "form" && (
          <>
            <h1 className="font-serif text-4xl mb-4">Have a journey shaped around you.</h1>
            <p className="text-foreground/70 leading-relaxed mb-6 max-w-xl">
              Tell us who you are and the shape of the trip you want. If you&apos;d like it built
              around you, that&apos;s where we begin properly.
            </p>

            <div className="border border-foreground/15 bg-foreground/[0.03] p-6 mb-12">
              <p className="text-sm text-foreground/80 leading-relaxed">
                <span className="font-medium">A note on how this works.</span> A tailored journey
                begins with a <span className="font-medium">€300 planning deposit</span>, taken
                when you send this. It is held against the cost of your journey and applied in full
                once you book. It secures the time we spend building the trip around you, and is
                not refundable if you decide not to travel. Prefer to take one of{" "}
                <Link href="/journeys" className="underline hover:text-foreground">our journeys</Link>{" "}
                as written? That costs nothing until you book.
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className={label}>First name</label>
                  <input className={input} value={f.firstName} onChange={(e) => set("firstName", e.target.value)} />
                </div>
                <div>
                  <label className={label}>Last name</label>
                  <input className={input} value={f.lastName} onChange={(e) => set("lastName", e.target.value)} />
                </div>
              </div>

              <div>
                <label className={label}>Email</label>
                <input type="email" className={input} value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </div>

              <div>
                <label className={label}>Country of origin</label>
                <input className={input} value={f.country} onChange={(e) => set("country", e.target.value)} placeholder="Where you're travelling from" />
              </div>

              <div>
                <label className={label}>Who&apos;s travelling</label>
                <div className="flex flex-wrap gap-2">
                  {PARTY.map((p) => (
                    <button key={p} type="button" className={chip(f.partySize === p)} onClick={() => set("partySize", p)}>{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={label}>How long</label>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((d) => (
                    <button key={d} type="button" className={chip(f.duration === d)} onClick={() => set("duration", d)}>{d}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={label}>When</label>
                <div className="flex flex-wrap gap-2">
                  {SEASONS.map((s) => (
                    <button key={s} type="button" className={chip(f.season === s)} onClick={() => set("season", s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={label}>How you want to move</label>
                <div className="flex flex-wrap gap-2">
                  {PACES.map((p) => (
                    <button key={p} type="button" className={chip(f.pace === p)} onClick={() => set("pace", p)}>{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className={label}>Places you already have in mind</label>
                <input className={input} value={f.cities} onChange={(e) => set("cities", e.target.value)} placeholder="Fes, the desert, the coast…" />
              </div>

              <div>
                <label className={label}>What pulls you toward Morocco</label>
                <input className={input} value={f.interests} onChange={(e) => set("interests", e.target.value)} placeholder="Food, craft, history, landscape…" />
              </div>

              <div>
                <label className={label}>Rough budget for the trip</label>
                <input className={input} value={f.budget} onChange={(e) => set("budget", e.target.value)} placeholder="e.g. €2,500–€4,000 per person" />
              </div>

              <div>
                <label className={label}>Anything else</label>
                <textarea className={`${input} resize-none`} rows={3} value={f.notes} onChange={(e) => set("notes", e.target.value)} />
              </div>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button
                type="button"
                onClick={toDeposit}
                className="px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Continue to deposit →
              </button>
            </div>
          </>
        )}

        {phase === "deposit" && (
          <div className="max-w-lg">
            <button onClick={() => setPhase("form")} className="text-sm text-foreground/50 hover:text-foreground mb-8">← Back</button>
            <h1 className="font-serif text-3xl mb-4">A €300 planning deposit</h1>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Credited in full to your journey, and held against the time we spend building it
              around you. Once your payment goes through, your details reach us and we begin.
            </p>
            {sending ? (
              <p className="text-sm text-foreground/60">Saving your details…</p>
            ) : (
              <PayPalDeposit onSuccess={onPaid} onError={() => setError("Payment could not be completed. Please try again.")} />
            )}
            {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
