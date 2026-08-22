"use client";

import { useState } from "react";
import Link from "next/link";

const DURATIONS = ["Under a week", "About a week", "10–14 days", "2 weeks or more"];
const PACES = ["Slow, few bases", "Some movement", "Cover a lot"];
const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "Not sure yet"];
const PARTY = ["Just me", "Two of us", "3–4", "5+"];

export default function StartHereContent() {
  const [f, setF] = useState({
    firstName: "", lastName: "", email: "", partySize: "",
    duration: "", season: "", cities: "", pace: "",
    interests: "", budget: "", notes: "",
  });
  const [ack, setAck] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setError("");
    if (!f.email) return setError("Please add your email.");
    if (!ack) return setError("Please acknowledge the planning deposit to continue.");
    setSending(true);
    try {
      const res = await fetch("/api/journey-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, depositAcknowledged: ack }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again, or email hello@slowmorocco.com.");
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
            We have your details. We&apos;ll read them properly and write back to you
            personally, usually within a couple of days, with the next step.
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
          <Link href="/" className="text-sm text-foreground/60 hover:text-foreground">
            ← Slow Morocco
          </Link>
          <span className="text-sm text-foreground/40">Plan a journey</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl mb-4">Have a journey shaped around you.</h1>
        <p className="text-foreground/70 leading-relaxed mb-6 max-w-xl">
          Tell us who you are and the shape of the trip you want. If one of our existing
          journeys already fits, we&apos;ll send it with the price and you can take it as it is.
          If you&apos;d like it built around you, that&apos;s where we begin properly.
        </p>

        {/* Deposit statement — clearly before the form */}
        <div className="border border-foreground/15 bg-foreground/[0.03] p-6 mb-12">
          <p className="text-sm text-foreground/80 leading-relaxed">
            <span className="font-medium">A note on how this works.</span> A tailored journey
            begins with a <span className="font-medium">€300 planning deposit</span>. It is held
            against the cost of your journey and applied in full once you book. It secures the
            time we spend building the trip around you, and is not refundable if you decide not
            to travel. Taking one of our journeys as written costs nothing until you book.
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

          {/* Deposit acknowledgement */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-1" />
            <span className="text-sm text-foreground/70 leading-relaxed">
              I understand that a tailored journey begins with a €300 planning deposit, applied
              to the cost of the trip and non-refundable if I choose not to travel.
            </span>
          </label>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="button"
            onClick={submit}
            disabled={sending}
            className="px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
