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

// ── Origin note (drawn from Slow Morocco's own published essay) ──────────────
const ORIGIN = [
  "The Gnawa are descendants of enslaved people brought north across the Sahara from West Africa — from what is now Mali, Senegal, Ghana, and beyond. They carried their spirits with them. What they built in Morocco, over centuries, was a way of holding those spirits: a brotherhood, a music, and a rite.",
  "The Lila is that rite. Documented since at least the sixteenth century and inscribed by UNESCO as intangible cultural heritage, it is not a concert and never was. It is therapeutic ritual — refined over generations to do one specific job: to heal what cannot be healed any other way. The seven colors of cloth stand for the seven families of spirits, the Mlouk, each with its own songs, its own rhythms, its own demands.",
  "It has survived because it works on its own terms — a community that acknowledges the invisible, and a tradition that takes seriously what modern medicine sets aside. That is the room you are being received into.",
];


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
    q: "Are there any health considerations?",
    a: "A Lila is a long night with physical exertion, and incense burns throughout in an enclosed room. Tell us of any allergies or any heart or respiratory condition before you confirm, so we can keep you safe — and if you have such a condition, check with your own doctor first. We also recommend travel insurance covering cancellation and medical care.",
  },
  {
    q: "Is the deposit refundable?",
    a: "No. Once you confirm a date, the Maâlem, his troupe, and the Moqaddema commit to it and turn away other work, so the night cannot be refunded or cancelled. If you have specific expectations, tell us before you confirm — we'll meet them or tell you honestly in advance if we can't.",
  },
  {
    q: "Is the outcome guaranteed?",
    a: "No, and we won't pretend otherwise. We arrange your presence at a genuine Lila, conducted with integrity. With anything that touches the unseen, the outcome is not ours to give — it rests between you and your higher self.",
  },
];

const WEEK = [
  {
    label: "Tue 23 Sep",
    title: "Arrival",
    description:
      "You are met at the airport and brought quietly through the city to your riad in the medina, a calm restored house chosen for you. Nothing is scheduled. The week begins slowly, on purpose.",
    tags: ["Private transfer"],
  },
  {
    label: "Wed 24 Sep",
    title: "The medina, read properly",
    description:
      "A private day through the old city with a licensed guide, not the souvenir route but the medina as a living thing: the great palaces and the small hidden doors, the souks and the craftsmen, the logic beneath the maze. You leave able to read the city rather than be lost in it.",
    tags: ["Licensed guide", "Private, full day"],
  },
  {
    label: "Thu 25 Sep",
    title: "Gardens and the light",
    description:
      "A gentler day. The cobalt garden and its museum, the Berber collection within: the jewellery, the textiles, the craft that carry the meaning the ceremony draws on. A private car through the day, the quieter gardens, the modern city as contrast. The pace is unhurried. You are beginning to slow.",
    tags: ["Gardens & museums", "Private car"],
  },
  {
    label: "Fri 26 Sep",
    title: "Into the stillness",
    description:
      "A slow morning, nothing to rush for. Then a lunch by the water, and on into the Agafay, a stone desert of pale rock and wide sky, the Atlas on the horizon and the noise of the world gone. A private camel into the dunes as the sun goes down, just the two of you and your handler. A quiet dinner under the open sky, and the stars the way they only come where there is no city. You return empty, still, ready.",
    tags: ["A secluded desert camp", "Private camel at sunset", "Dinner under the sky"],
  },
  {
    label: "Sat 27 Sep",
    title: "Cleansing, and the Lila",
    description:
      "The day begins with the hammam, not a spa hour but the old ritual cleansing, warm water and black soap, the body prepared. Then rest, a light table, the day narrowing toward the evening. At night, the Lila, everything set out above, the still point the whole week has moved toward.",
    tags: ["Ritual hammam", "The Lila at night"],
  },
  {
    label: "Sun 28 Sep",
    title: "Rest",
    description:
      "Nothing is scheduled. The night is long, and the day after is for sleeping it off, sitting quietly, letting whatever moved settle. The city will still be there, gentler now.",
    tags: ["Open, recovery"],
  },
  {
    label: "Mon 29 Sep",
    title: "Departure",
    description:
      "When it is time, you are taken back to the airport, rested, not depleted. The week was built so the ceremony would be the peak and the leaving would be calm.",
    tags: ["Private transfer"],
  },
];

const WEEK_HOLDS = [
  "Private airport transfers, arrival and departure",
  "Six nights in a restored riad in the medina, chosen for you",
  "A full private day through the medina with a licensed official guide",
  "The gardens, the museums, and a private car through the day",
  "The evening in the Agafay: a private desert camp, the sunset, a private camel, dinner under the open sky",
  "The ritual hammam on the day of the ceremony",
  "Your restaurant tables, chosen and reserved for you across the medina, with Zahra herself seeing to each house before you arrive, so you are expected and looked after wherever you go",
  "The whole week coordinated end to end, so nothing is left to you but the experience",
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
  const [tab, setTab] = useState<"lila" | "week">("lila");
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


      {/* ── Tabs ───────────────────────────────────────────────────────── */}
      <div className="border-t border-foreground/10 print:hidden">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex gap-8">
            <button
              onClick={() => setTab("lila")}
              className={`py-5 text-xs tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${
                tab === "lila"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/40 hover:text-foreground/70"
              }`}
            >
              The Lila
            </button>
            <button
              onClick={() => setTab("week")}
              className={`py-5 text-xs tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${
                tab === "week"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/40 hover:text-foreground/70"
              }`}
            >
              The Week
            </button>
          </div>
        </div>
      </div>

      {/* ── LILA TAB ───────────────────────────────────────────────────── */}
      <div className={tab === "lila" ? "block" : "hidden"}>
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

      {/* ── Where it comes from ────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Where it comes from
          </p>
          {ORIGIN.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-serif text-xl text-foreground leading-relaxed mb-6"
                  : "text-muted-foreground leading-relaxed mb-4"
              }
            >
              {para}
            </p>
          ))}
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

      {/* ── A few things to know ────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
            A few things to know
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">
                The ceremony is not filmed
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This is the tradition's own rule, not ours to waive — a Lila that
                becomes footage stops being a Lila. You are welcome to hold the
                night in memory; not on a screen.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">
                Your guests
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The night is arranged privately for you and your guests. Please
                confirm your numbers when you book so the room, the meal, and the
                transport are set for everyone; larger groups can be accommodated by
                prior arrangement.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">
                The spirit of the night
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A Lila is a sacred night, held with a master, his brotherhood, and
                an elder. We ask that it be met with respect — a clear head, no
                intoxication, and the space and its protocols honored. This is how
                we keep faith with the people who open it to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The commitment (refund protection) ─────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            The commitment
          </p>
          <p className="font-serif text-xl text-foreground leading-relaxed mb-6">
            When you confirm a date, real people commit to it — the Maâlem, his
            troupe, the Moqaddema. They set the night aside and turn away other
            work. For that reason, once a date is locked it cannot be refunded. The
            tradition does not treat a Lila as something booked and cancelled, and
            the troupe will not accept it as such. The curated week works the same
            way: once confirmed, your accommodation, the desert camp, and your
            guiding are booked and prepaid on your behalf, and turned away by no
            one lightly. Both deposits, for the night and for the week, are
            non-refundable.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our commitment runs both ways. If, for reasons beyond our control, the
            arranged master cannot preside on your night, we will bring an
            equivalent master of the tradition or set an alternative date with you.
            We will not hold your payment without giving you the night.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            What you secure is clear and complete: a genuine Lila, arranged with
            integrity and conducted the way the Gnawa themselves conduct it — the
            night in full, exactly as it is described here. That is what your
            commitment buys, and we deliver it.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you arrive with specific expectations you need met, tell us before
            you confirm — plainly, and in as much detail as you wish. We would far
            rather say honestly whether something can be done than meet a hope on
            the night that was never spoken. Anything you put on the table, we will
            meet or tell you in advance that we cannot. What is left unspoken, we
            cannot be held to afterward.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            As with any travel commitment, we strongly recommend you hold travel
            insurance covering cancellation and medical care. The night itself
            cannot be refunded — insurance is how you protect yourself against the
            unexpected.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A word on health, for your safety. A Lila is a long night: it involves
            physical exertion, and incense burns throughout in an enclosed room.
            Before you confirm, please tell us of any allergies and any heart,
            respiratory, or other condition we should know about, so we can look
            after you properly — and if you have any such condition, consult your
            own doctor before taking part. By confirming, you tell us you are fit to
            take part and take responsibility for your own health through the night.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The one thing no one can put on the table is the outcome. The night
            offers witness, not certainty; what it does in you rests between you and
            your higher self.
          </p>
        </div>
      </section>

      </div>
      {/* end LILA TAB */}

      {/* ── WEEK TAB ───────────────────────────────────────────────────── */}
      <div className={tab === "week" ? "block" : "hidden"}>
            {/* ── The week around the night ───────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            The days around the night
          </p>
          <p className="font-serif text-foreground/60 text-lg md:text-xl leading-relaxed mb-4 max-w-xl">
            Everything is arranged and held for you. You move through the week
            without booking, negotiating, or wondering, met at each turn and carried
            gently toward the ceremony at its center.
          </p>
          <p className="text-sm text-foreground/50 leading-relaxed mb-12 max-w-xl">
            Three days lead you toward the Lila, each quieter than the last; the day
            you arrive and the day after are left open, so you begin rested and end
            rested, so the ceremony finds you ready.
          </p>
          <div className="space-y-16">
            {WEEK.map((day) => (
              <div key={day.title}>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  {day.label}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl mb-4">{day.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {day.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {day.tags.map((tag, i) => (
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

      {/* ── Everything your week holds ──────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Everything your week holds
          </p>
          <ul className="space-y-3 max-w-xl">
            {WEEK_HOLDS.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                <span className="text-foreground/25 mt-0.5 flex-shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
      {/* end WEEK TAB */}

{/* ── Pricing &amp; confirmation ─────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
              The full picture
            </p>

            <div className="mb-8 space-y-6">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-serif text-4xl text-foreground">€5,000</span>
                  <span className="text-sm text-foreground/40">the Lila</span>
                </div>
                <p className="text-sm text-foreground/40">
                  The Maâlem and troupe, the Moqaddema, the venue, the meal and
                  offerings, your host, interpreter, and private transport both ways.
                </p>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-serif text-4xl text-foreground">€2,500</span>
                  <span className="text-sm text-foreground/40">the curated week</span>
                </div>
                <p className="text-sm text-foreground/40">
                  Everything above: accommodation, private guiding and transfers, the
                  gardens, the Agafay evening, the ritual hammam, your tables arranged
                  and Zahra's care throughout.
                </p>
              </div>
              <div className="pt-4 border-t border-foreground/[0.08]">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl text-foreground">€7,500</span>
                  <span className="text-sm text-foreground/40">together</span>
                </div>
              </div>
            </div>

            <div className="border border-foreground/[0.08] p-6 mb-8">
              <div className="flex justify-between text-sm text-foreground/60 mb-3 pb-3 border-b border-foreground/[0.06]">
                <span>The Lila — deposit to confirm your date</span>
                <span>€2,500</span>
              </div>
              <div className="flex justify-between text-sm text-foreground/60 mb-3 pb-3 border-b border-foreground/[0.06]">
                <span>The Lila — balance</span>
                <span>€2,500</span>
              </div>
              <div className="flex justify-between text-sm text-foreground/60 mb-3">
                <span>The curated week — arranged on the same confirmation</span>
                <span>€2,500</span>
              </div>
              <p className="text-xs text-foreground/35 mt-4">
                Both deposits — for the Lila and for the curated week — are
                non-refundable, because each one commits real people and real money
                on your behalf the moment it is sent. This is a private commissioned
                ceremony, not a standard journey: it is governed by the terms of this
                dossier and your signed confirmation, which apply in full, and where
                they differ from our general policies the terms here prevail. Sending
                your deposit confirms you have read and accept these terms, together
                with our{" "}
                <Link
                  href="https://www.slowmorocco.com/booking-conditions"
                  className="underline underline-offset-2 hover:text-foreground/60"
                >
                  Booking Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="https://www.slowmorocco.com/cancellations-and-refunds"
                  className="underline underline-offset-2 hover:text-foreground/60"
                >
                  Cancellations &amp; Refunds
                </Link>{" "}
                policy.
              </p>
            </div>

            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              To confirm
            </p>
            <ol className="space-y-3 text-sm text-foreground/70 leading-relaxed mb-2">
              <li>
                <span className="text-foreground/30 mr-2">01</span>
                Reply to confirm, with anything you need us to know or arrange in advance.
              </li>
              <li>
                <span className="text-foreground/30 mr-2">02</span>
                We send you a short confirmation to sign, and the payment details, in person.
              </li>
              <li>
                <span className="text-foreground/30 mr-2">03</span>
                Once your deposit reaches us, we hold the night, begin arranging your week, and send your pre-arrival guide.
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
    </div>
  );
}
