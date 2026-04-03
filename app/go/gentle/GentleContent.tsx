"use client";

import { useState } from "react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
import { Mail } from "lucide-react";

interface Journey {
  id: string;
  title: string;
  slug: string;
  heroImage: string;
  tagline: string;
  description: string;
  duration: number;
  price: number;
  cities: string;
  highlights: string[];
  accessibilityNotes: string[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  image: string;
}

interface Settings {
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  founderNoteTitle: string;
  founderNoteBody: string;
  contactEmail: string;
  requirements: { title: string; description: string }[];
  promises: { title: string; description: string }[];
}

interface GentleContentProps {
  initialExperiences: Journey[];
  initialTeam: TeamMember[];
  initialSettings: Settings;
}

// ─── Accessibility badge ────────────────────────────────────────────────────
function AccessBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-[#5C6B5A] bg-[#EFF3EE] px-2.5 py-1 border border-[#C8D5C6]">
      {label}
    </span>
  );
}

// ─── Inline accessibility icons ─────────────────────────────────────────────
const ACCESS_ICONS: Record<string, string> = {
  wheelchair: "○",
  step: "—",
  vehicle: "□",
  rest: "◇",
  default: "·",
};

function accessIcon(note: string): string {
  const lower = note.toLowerCase();
  if (lower.includes("wheelchair") || lower.includes("step-free")) return ACCESS_ICONS.wheelchair;
  if (lower.includes("step") || lower.includes("stair")) return ACCESS_ICONS.step;
  if (lower.includes("vehicle") || lower.includes("transport") || lower.includes("car")) return ACCESS_ICONS.vehicle;
  if (lower.includes("rest") || lower.includes("break") || lower.includes("pace")) return ACCESS_ICONS.rest;
  return ACCESS_ICONS.default;
}

export default function GentleContent({
  initialExperiences,
  initialTeam,
  initialSettings,
}: GentleContentProps) {
  const [experiences] = useState<Journey[]>(initialExperiences);
  const [team] = useState<TeamMember[]>(initialTeam);
  const [settings] = useState<Settings>(initialSettings);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // FAQs — inline for usability (accordion), not schema-only
  const faqs = [
    {
      q: "Are your Morocco tours wheelchair accessible?",
      a: "Yes. Every Gentle Journey is designed from scratch for wheelchair users and travellers with mobility challenges — not adapted from a standard itinerary. We select ground-floor riads, paved routes, and vehicles appropriate to your needs.",
    },
    {
      q: "Can I visit the Marrakech medina with limited mobility?",
      a: "Yes, with the right guidance. The medina has uneven surfaces, but we know the accessible routes, can arrange appropriate transport to key sites, and book riads with step-free ground-floor rooms. Our guides have navigated the medina with mobility-challenged guests many times.",
    },
    {
      q: "Do you provide wheelchair-accessible vehicles?",
      a: "We arrange vehicles appropriate to your needs — cars with extra legroom, spacious vans, and with advance notice, specialist transport with ramps or lifts. Tell us your requirements when we talk.",
    },
    {
      q: "Can I experience the Sahara with limited mobility?",
      a: "Our Desert Light journey brings you to rose-gold kasbahs and palm oases at the edge of the Sahara from accessible viewpoints — the atmosphere and drama without the challenging terrain. For those who can manage some uneven ground with support, brief dune experiences can be arranged.",
    },
    {
      q: "How long are the drives?",
      a: "Shorter than standard tours — typically 2–3 hours maximum between stops. Frequent comfort breaks, scenic stops, and flexible timing are standard on every Gentle Journey.",
    },
    {
      q: "Do your guides have experience with disabled travellers?",
      a: "Yes. Gentle Journey guides are selected specifically for patience, experience with mobility-challenged guests, and knowledge of accessible routes. They anticipate needs and adapt on the go.",
    },
    {
      q: "Can you accommodate seniors?",
      a: "Many of our Gentle Journey guests are active seniors who prefer a slower pace. We design around rest time, avoid early starts, choose restaurants with comfortable seating and manageable distances.",
    },
    {
      q: "What if I need to change the pace during the trip?",
      a: "Flexibility is built into every Gentle Journey. Skip an activity, rest an extra half-day, or change the order of sites — we adapt immediately. Your comfort and safety are the only schedule.",
    },
  ];

  return (
    <main
      className="bg-white text-[#1a1a1a] min-h-screen"
      role="main"
      aria-label="Accessible Morocco Tours — Gentle Journeys"
    >
      {/* ─── Minimal Header ──────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1a1a1a]/8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-sm tracking-[0.12em] text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              S L O W &nbsp; M O R O C C O
            </Link>
            <nav className="flex items-center gap-6" aria-label="Page navigation">
              <button
                onClick={() => scrollToSection("journeys")}
                className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors hidden sm:block"
              >
                Journeys
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-xs tracking-[0.15em] uppercase border border-[#1a1a1a] px-4 py-2 hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Talk to Us
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28" aria-labelledby="hero-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5C6B5A] mb-6">
              {settings.heroTagline}
            </p>
            {/* Visible H1 — important for SEO and GEO */}
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight mb-8 text-[#1a1a1a]"
            >
              {settings.heroTitle}
            </h1>
            <p className="text-lg text-[#1a1a1a]/60 leading-relaxed max-w-2xl mb-10">
              {settings.heroSubtitle}
            </p>

            {/* Access badges — visible credential for humans and AI */}
            <div className="flex flex-wrap gap-2" role="list" aria-label="Accessibility features">
              {[
                "Wheelchair-friendly routes",
                "Ground-floor accommodation",
                "Accessible vehicles",
                "No early starts",
                "Flexible pace",
              ].map((badge) => (
                <AccessBadge key={badge} label={badge} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Journeys ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-t border-[#1a1a1a]/8" id="journeys" aria-labelledby="journeys-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-14">
              <p className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-3">The Collection</p>
              <h2 id="journeys-heading" className="font-serif text-3xl md:text-4xl">
                Four journeys. Four different Moroccos.
              </h2>
              <p className="text-[#1a1a1a]/50 mt-4 max-w-xl leading-relaxed">
                Each designed around accessible routes, manageable distances, and accommodations chosen for comfort — not just for what looks good in photos.
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {experiences.map((exp) => (
                <article
                  key={exp.id}
                  className="group"
                  aria-label={`${exp.title} — ${exp.duration}-day accessible Morocco journey`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#f0f0f0]">
                    {exp.heroImage ? (
                      <img
                        src={cloudinaryUrl(exp.heroImage)}
                        alt={`${exp.title} — accessible Morocco journey through ${exp.cities}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#1a1a1a]/10 text-6xl font-serif">{exp.title[0]}</span>
                      </div>
                    )}
                    {/* Duration badge */}
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/60">
                        {exp.duration} days
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-[#1a1a1a]">{exp.title}</h3>
                    <p className="text-sm text-[#1a1a1a]/40 italic">{exp.tagline}</p>
                    <p className="text-[#1a1a1a]/65 text-sm leading-relaxed">{exp.description}</p>

                    {/* Route */}
                    <p className="text-xs text-[#1a1a1a]/35 tracking-wide">{exp.cities}</p>

                    {/* Accessibility notes — elevated, not an afterthought */}
                    {exp.accessibilityNotes && exp.accessibilityNotes.length > 0 && (
                      <div
                        className="pt-4 border-t border-[#EFF3EE]"
                        aria-label="Accessibility details"
                      >
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#5C6B5A] mb-2">
                          Accessibility
                        </p>
                        <ul className="space-y-1.5">
                          {exp.accessibilityNotes.map((note, i) => (
                            <li
                              key={i}
                              className="text-xs text-[#1a1a1a]/55 flex items-start gap-2 leading-relaxed"
                            >
                              <span className="text-[#5C6B5A] mt-0.5 shrink-0 font-mono text-[10px]">
                                {accessIcon(note)}
                              </span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-3 border-t border-[#1a1a1a]/5">
                        <ul className="space-y-1">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-[#1a1a1a]/45 flex items-start gap-2">
                              <span className="text-[#1a1a1a]/20 mt-0.5">—</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-[#1a1a1a]/50">
                        From <strong className="text-[#1a1a1a]">€{exp.price?.toLocaleString()}</strong> per person
                      </span>
                      <a
                        href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent(`Journey Inquiry — ${exp.title}`)}`}
                        className="text-xs tracking-[0.12em] uppercase text-[#5C6B5A] border border-[#C8D5C6] px-4 py-2 hover:bg-[#EFF3EE] transition-colors"
                        aria-label={`Ask about ${exp.title} by email`}
                      >
                        Ask about this journey
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Founder's Note ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F2F4F1]" aria-labelledby="founder-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-6">
              From the founder
            </p>
            <h2 id="founder-heading" className="font-serif text-3xl mb-8 italic">
              {settings.founderNoteTitle}
            </h2>
            <div className="text-[#1a1a1a]/65 leading-relaxed space-y-5 text-base">
              {settings.founderNoteBody.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── What we provide / What we ask ───────────────────────────────── */}
      <section className="py-20 border-t border-[#1a1a1a]/8" aria-labelledby="requirements-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 id="requirements-heading" className="sr-only">What we ask and what we promise</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="font-serif text-xl mb-6 text-[#1a1a1a]">What we ask of you</h3>
                <ul className="space-y-5">
                  {settings.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-[#C8D5C6] mt-1 text-lg leading-none">—</span>
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a] mb-1">{req.title}</p>
                        <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">{req.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-6 text-[#1a1a1a]">What we promise you</h3>
                <ul className="space-y-5">
                  {settings.promises.map((promise, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-[#5C6B5A] mt-1 text-lg leading-none">—</span>
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a] mb-1">{promise.title}</p>
                        <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">{promise.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1a1a1a] text-white" aria-labelledby="process-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">Getting started</p>
              <h2 id="process-heading" className="font-serif text-3xl text-white">Simple. No pressure.</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { n: "1", title: "We talk", body: "Email us at hello@slowmorocco.com. Tell us about you, who you're travelling with, and what matters most." },
                { n: "2", title: "We design", body: "A journey shaped around your pace, your needs, your interests. Not a template — a bespoke plan." },
                { n: "3", title: "You decide", body: "No deposit until you're ready. Take your time. Ask every question. Change your mind if you need to." },
                { n: "4", title: "We're there", body: "From airport to airport, you're never alone. We handle everything, every day." },
              ].map(({ n, title, body }) => (
                <div key={n}>
                  <div className="text-5xl font-serif text-white/8 mb-4 leading-none">{n}</div>
                  <h3 className="text-base font-medium mb-2 text-white">{title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ────────────────────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-20 border-t border-[#1a1a1a]/8" aria-labelledby="team-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-14">
                <p className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-3">Your team</p>
                <h2 id="team-heading" className="font-serif text-3xl">
                  The people who will take care of you
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {team.map((member) => (
                  <div key={member.id}>
                    <div className="w-20 h-20 mb-5 bg-[#f0f0f0] overflow-hidden">
                      {member.image ? (
                        <img
                          src={cloudinaryUrl(member.image)}
                          alt={`${member.name}, ${member.role} at Slow Morocco`}
                          width={80}
                          height={80}
                          className="absolute inset-0 w-full h-full object-cover w-full h-full"
            />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl text-[#1a1a1a]/20 font-serif">{member.name[0]}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-lg mb-0.5">{member.name}</h3>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#1a1a1a]/35 mb-4">{member.role}</p>
                    <p className="text-sm text-[#1a1a1a]/50 italic leading-relaxed">&ldquo;{member.quote}&rdquo;</p>
                    {member.bio && (
                      <p className="text-xs text-[#1a1a1a]/40 mt-2 leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ — accordion, visible to humans and crawlers ────────────── */}
      <section className="py-20 bg-[#F2F4F1]" aria-labelledby="faq-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-3">Common questions</p>
              <h2 id="faq-heading" className="font-serif text-3xl">
                Accessible Morocco travel — what to expect
              </h2>
            </div>

            <dl className="divide-y divide-[#1a1a1a]/8">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <dt>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-start justify-between gap-4 text-left"
                      aria-expanded={expandedFaq === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span className="font-medium text-[#1a1a1a] text-sm leading-relaxed">{faq.q}</span>
                      <span
                        className="text-[#1a1a1a]/30 shrink-0 mt-0.5 text-lg leading-none transition-transform duration-200"
                        style={{ transform: expandedFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-answer-${i}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFaq === i ? "max-h-96 mt-4" : "max-h-0"
                    }`}
                    aria-hidden={expandedFaq !== i}
                  >
                    <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{faq.a}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── Contact / CTA ───────────────────────────────────────────────── */}
      <section className="py-28 bg-[#1a1a1a]" id="contact" aria-labelledby="contact-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Ready when you are</p>
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white mb-6"
            >
              Let&apos;s talk about your trip.
            </h2>
            <p className="text-white/45 mb-12 leading-relaxed max-w-md mx-auto">
              No forms. No automated responses. A real conversation with someone who knows Morocco and can design a journey around you.
            </p>

            <a
              href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent("Journey Inquiry")}`}
              className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-4 text-xs tracking-[0.15em] uppercase border border-white/20 hover:bg-white hover:text-[#1a1a1a] transition-colors"
              aria-label="Email us about accessible Morocco tours"
            >
              <Mail className="w-4 h-4" />
              Begin the conversation
            </a>

            <p className="mt-8 text-sm text-white/25">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="underline hover:text-white/50 transition-colors"
              >
                {settings.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-8 bg-[#111] border-t border-white/8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="font-serif text-sm tracking-[0.12em] text-white/50 hover:text-white/80 transition-colors"
              >
                S L O W &nbsp; M O R O C C O
              </Link>
              <span className="text-white/15">|</span>
              <Link
                href="/journeys"
                className="text-xs tracking-[0.1em] uppercase text-white/30 hover:text-white/60 transition-colors"
              >
                All Journeys
              </Link>
              <Link
                href="/plan-your-trip"
                className="text-xs tracking-[0.1em] uppercase text-white/30 hover:text-white/60 transition-colors"
              >
                Plan your trip
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {settings.contactEmail}
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Slow Morocco. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/25">
              <Link href="/privacy" className="hover:text-white/45 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white/45 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
