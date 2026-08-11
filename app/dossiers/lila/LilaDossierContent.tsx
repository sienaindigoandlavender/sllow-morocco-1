"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// SLOW MOROCCO — PRIVATE LILA DOSSIER
// Prepared for Dmitrii Bukata & guest(s)
// Built to match /sahara-tour-from-marrakech: centered max-w-3xl column,
// foreground/muted-foreground tokens, border-t sections, meta bar with
// Download PDF, day-by-day sequence, included/not-included, FAQ accordion.
// No map. No booking modal — the CTA is "reply to confirm your date."
// ─────────────────────────────────────────────────────────────────────────────

// Hero image — the same Gnawa Lila photo from /stories/the-lila (Cloudinary).
const HERO_IMAGE =
  "https://res.cloudinary.com/do2ojyohc/image/upload/w_1920,q_auto,f_auto/v1774011846/Gnawa_lila_ceremony_at_night_wddifx.png";

// ── The night — sequence (in place of the Sahara day-by-day) ─────────────────
const SEQUENCE = [
  {
    label: "Sunset",
    title: "You arrive",
    description:
      "The experience begins at dusk, as the light goes. You are welcomed at the venue and settled — nothing to arrange, nothing to manage.",
    tags: ["Arrival", "Private welcome"],
  },
  {
    label: "The meal",
    title: "A shared table",
    description:
      "You eat with the Maâlem, the Moqaddema, and the team. With your interpreter beside you, you have a quiet audience with the Maâlem to share what you carry and what you hope for. We won't ask you any of this in advance — what brings you to a Lila belongs to you and the Maâlem, spoken on the night, in the room where it matters. Holding that boundary is how we keep faith with the tradition and with you.",
    tags: ["Ceremonial meal", "Private audience"],
  },
  {
    label: "The music",
    title: "The sequence opens",
    description:
      "Softly, after the meal, and builds through the traditional phases across the night — incense, candles, orange-blossom water, milk, dates, and the fabrics of the seven color lineages, the Mlouk.",
    tags: ["Guembri & qraqeb", "The seven Mlouk"],
  },
  {
    label: "Your part",
    title: "You are not an audience",
    description:
      "This night is held for you. As it moves through the colors, you are brought into it — not seated apart to watch, but worked with directly by the Moqaddema and the troupe, the incense and the fabrics carried to you. Where it takes you is yours and the night's; we don't script it and we don't promise it. But you come as a participant, not a spectator.",
    tags: ["Active participation"],
  },
  {
    label: "On sacrifice",
    title: "The right rite for the right purpose",
    description:
      "We don't include or recommend animal sacrifice for a night like yours. It has its place in Gnawa practice — but a particular one: it belongs to exorcism rites and to the ceremonies of seers and diviners, not to a Lila received the way this one is. Leaving it out isn't about comfort or taste. It's about using the right rite for the right purpose.",
    tags: ["No sacrifice"],
  },
  {
    label: "Toward dawn",
    title: "It ends when it ends",
    description:
      "A Lila runs toward dawn, but it is not held to a clock. If the night completes its work in you sooner — in the body, or in the spirit — it closes then. You are not made to sit through hours you no longer need.",
    tags: ["Until dawn, or sooner"],
  },
];

// ── Included / Not included ───────────────────────────────────────────────────
const INCLUDED = [
  "The Maâlem and his troupe — up to fifteen musicians, sometimes more — through the night",
  "The Moqaddema, who prepares the incense, offerings, and order of the night",
  "Private venue, set and cleared for you alone",
  "Ceremonial meal, tea service, and all offerings",
  "Mouad, your Slow Morocco host, present from arrival to close",
  "A dedicated English/Russian interpreter through the night",
  "Private round-trip transport from your Marrakech hotel or riad",
  "A private room where you can wash, rest, or step away at any point",
];

const NOT_INCLUDED = [
  "Your accommodation in Marrakech",
  "International flights and travel to Marrakech",
  "Personal expenses",
  "Any guaranteed outcome — the night offers witness, not certainty",
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What actually happens during the night?",
    a: "A shared meal at dusk, a quiet audience with the Maâlem, then acoustic music that builds through the traditional phases until dawn — incense, candles, offerings, and the fabrics of the seven Mlouk. You are brought into it as a participant, not seated apart to watch.",
  },
  {
    q: "Do I need to believe in anything, or be Muslim?",
    a: "No. You come as you are. The tradition has its own logic and we honor it; you are not asked to perform belief or to be anything other than present and open.",
  },
  {
    q: "Will there be an animal sacrifice?",
    a: "No. Sacrifice belongs to exorcism rites and to the ceremonies of seers and diviners — not to a Lila received the way yours is. Your night is acoustic: sound, scent, and light.",
  },
  {
    q: "Can I bring a guest?",
    a: "Yes. The night is arranged privately for you and any guests you bring, and no one else. Tell us your numbers when you confirm your date.",
  },
  {
    q: "What if I need to rest or step away?",
    a: "There is a private room with a full bathroom. You can wash, rest, or take a quiet pause at any point in the night. Mouad and your interpreter are with you throughout.",
  },
  {
    q: "Is the outcome guaranteed?",
    a: "No, and we won't pretend otherwise. We arrange your presence at a genuine Lila, conducted with integrity. With anything that touches the unseen, the outcome is not ours to give — it rests between you and your higher self.",
  },
];

// ── FAQ Item (matches Sahara: prints expanded via print:!block) ──────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-foreground/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground leading-snug">
          {question}
        </span>
        <span className="text-foreground/30 flex-shrink-0 mt-0.5 text-lg leading-none print:hidden">
          {open ? "−" : "+"}
        </span>
      </button>
      <p
        className={`text-sm text-foreground/55 leading-relaxed pb-6 pr-8 print:!block ${
          open ? "" : "hidden"
        }`}
      >
        {answer}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function LilaDossierContent() {
  return (
    <div className="bg-background min-h-screen">
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            font-size: 12px;
          }
          section {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
          }
          .space-y-16 > div,
          .space-y-20 > div {
            page-break-inside: avoid;
            margin-bottom: 24px !important;
          }
          .grid.md\\:grid-cols-2 > div {
            page-break-inside: avoid;
          }
          .border-t.border-foreground\\/\\[0\\.08\\] {
            page-break-inside: avoid;
          }
          p,
          li {
            orphans: 3;
            widows: 3;
          }
          h1,
          h2,
          .text-xs.tracking-\\[0\\.2em\\] {
            page-break-after: avoid;
          }
        }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative h-[70svh] min-h-[480px] bg-[#211f3a] print:hidden">
        {HERO_IMAGE && (
          <img
            src={HERO_IMAGE}
            alt="Gnawa lila ceremony at night — candles and incense, the maâlem playing guembri."
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/25" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 lg:px-16 pb-14 md:pb-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-4">
            Slow Morocco · Private Curation
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] max-w-4xl">
            A Private Lila
          </h1>
          <p className="font-serif italic text-white/70 text-lg md:text-xl mt-5 max-w-xl leading-snug">
            A night of sacred Gnawa music, arranged for you and your guests — from
            the meal at dusk to the return of the light.
          </p>
        </div>
      </section>

      {/* ── Print-only title (hero is hidden in print) ─────────────────── */}
      <div className="hidden print:block pt-2 pb-4">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 mb-2">
          Slow Morocco · Private Curation
        </p>
        <h1 className="font-serif text-3xl text-foreground leading-tight">
          A Private Lila
        </h1>
      </div>

      {/* ── Blurb ──────────────────────────────────────────────────────── */}
      <section className="border-b border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-10 md:py-14">
          <p className="font-serif text-foreground/60 text-lg md:text-xl leading-relaxed">
            A Lila is an all-night ceremony of sacred Gnawa music — a master
            musician, the Maâlem, his troupe, and the woman who tends the ritual,
            the Moqaddema — playing without amplification from dusk until the light
            returns. It is not a performance, and not a package. It is a night
            arranged around real people, on their terms, and we are inviting you
            into it as their guest — privately, for you and any guests you bring,
            and no one else.
          </p>
        </div>
      </section>

      {/* ── Meta bar ───────────────────────────────────────────────────── */}
      <div className="border-b border-foreground/10 print:hidden">
        <div className="max-w-3xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.12em] uppercase text-foreground/35">
            <span>Prepared for Dmitrii Bukata &amp; guest(s)</span>
            <span className="hidden md:inline">Marrakech</span>
            <span className="hidden md:inline">September 2026</span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="w-3.5 h-3.5"
            >
              <rect x="2" y="5" width="12" height="8" rx="1" />
              <polyline points="4,5 4,1 12,1 12,5" />
              <line x1="4" y1="10" x2="12" y2="10" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* ── The night — sequence ───────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12">
            The night
          </p>
          <div className="space-y-16">
            {SEQUENCE.map((step) => (
              <div key={step.title}>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  {step.label}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl mb-4">
                  {step.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-[0.08em] uppercase px-3 py-1 bg-foreground/[0.04] text-foreground/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Included / Not included ────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Included
              </p>
              <ul className="space-y-3">
                {INCLUDED.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-foreground/70 leading-relaxed"
                  >
                    <span className="text-foreground/25 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Not included
              </p>
              <ul className="space-y-3">
                {NOT_INCLUDED.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-foreground/50 leading-relaxed"
                  >
                    <span className="text-foreground/20 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we don't promise ──────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            What we don't promise
          </p>
          <p className="font-serif text-xl text-foreground leading-relaxed mb-6">
            We arrange your presence at a genuine Lila, conducted with integrity,
            and we honor the tradition and the people who carry it. But we ask you
            to understand this clearly: with anything that touches the unseen, the
            outcome is not ours to give. It rests between you and your higher self.
          </p>
          <p className="font-serif italic text-lg text-foreground/70 leading-relaxed mb-6">
            “The Gnawa make no promises — they offer witness, not certainty.”
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are cultural facilitators, not clinicians. We do not offer medical
            treatment, diagnosis, or a guaranteed outcome, and you remain
            responsible for your own well-being through the night.
          </p>
        </div>
      </section>

      {/* ── Pricing & confirmation ─────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
              The curation
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-5xl text-foreground">€5,000</span>
                <span className="text-sm text-foreground/40">all-inclusive</span>
              </div>
              <p className="text-sm text-foreground/40">
                The Maâlem and troupe, the Moqaddema, the venue, the meal and
                offerings, your host, interpreter, and private transport both ways.
              </p>
            </div>

            <div className="border border-foreground/[0.08] p-6 mb-8">
              <div className="flex justify-between text-sm text-foreground/60 mb-3 pb-3 border-b border-foreground/[0.06]">
                <span>Deposit — to confirm your date</span>
                <span>€2,500</span>
              </div>
              <div className="flex justify-between text-sm text-foreground/60 mb-3">
                <span>Balance — fourteen days before the night</span>
                <span>€2,500</span>
              </div>
              <p className="text-xs text-foreground/35 mt-4">
                Paid by international wire transfer.
              </p>
            </div>

            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              To confirm
            </p>
            <ol className="space-y-3 text-sm text-foreground/70 leading-relaxed mb-2">
              <li>
                <span className="text-foreground/30 mr-2">01</span>
                Reply with your date —{" "}
                <span className="text-foreground font-medium">September 11–14</span>{" "}
                or{" "}
                <span className="text-foreground font-medium">September 25–28</span>.
              </li>
              <li>
                <span className="text-foreground/30 mr-2">02</span>
                We send the deposit invoice for €2,500.
              </li>
              <li>
                <span className="text-foreground/30 mr-2">03</span>
                Once it clears, we hold the night and send your pre-arrival guide.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12">
            Common questions
          </p>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature ──────────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <p className="font-serif italic text-2xl text-foreground">
              Warmly,
              <br />
              Mohammed
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/40">
              Slow Morocco · hello@slowmorocco.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
