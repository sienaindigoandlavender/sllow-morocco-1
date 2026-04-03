// ═══════════════════════════════════════════════════════════════════════
// SLOW MOROCCO — Guide Pages Batch
// All files below deploy to app/morocco/[slug]/page.tsx
// ═══════════════════════════════════════════════════════════════════════

// ─── FILE 1: app/morocco/hammam/page.tsx ────────────────────────────────

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hammam in Morocco: What to Expect and How to Go",
  description: "The Moroccan hammam is not a spa. It is a centuries-old social institution — hot rooms, cold rooms, a kessa scrub, and black soap. What to expect and how to find a real one.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/hammam" },
};

export default function HammamGuidePage() {
  return (
    <>
      <div className="bg-background min-h-screen">
        <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
          <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Experiences</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">The Hammam</h1>
          <p className="text-base text-foreground/55 leading-relaxed max-w-xl">The public hammam has been a fixture of Moroccan city life for a thousand years. What follows is not the spa version.</p>
        </div>
        <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What it actually is</p>
            <p className="text-sm text-foreground/65 leading-relaxed mb-4">The hammam predates indoor plumbing as a weekly ritual of hygiene, sociality, and prayer preparation. Before a mosque visit, before a wedding, after childbirth — the hammam marks transitions. The neighbourhood hammam is gender-segregated, cheap, and intense. You will be scrubbed with a kessa mitt until a visible layer of dead skin lifts off. You will leave extraordinarily clean.</p>
            <p className="text-sm text-foreground/65 leading-relaxed">The tourist spa hammam exists and is fine. It is quiet, expensive, and attended by staff who speak your language. It is not the same experience. Both are available — know which one you are choosing.</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">How it works</p>
            <div className="space-y-4">
              {[
                { step: "Entry", desc: "Pay at the door — usually 15–30 MAD for a local hammam, 5–10x that for a tourist one. You receive a key to a locker or a hook for your clothes. Bring a towel, flip flops, and a change of underwear. Everything else is provided." },
                { step: "The rooms", desc: "Three rooms: cold, warm, hot. You move between them at your own pace. Most people start warm, move to hot to sweat, then return to warm for the scrub. The steam is not dry like a sauna — it is wet heat from hot water on the floor." },
                { step: "The kessa scrub", desc: "A kessa is a rough exfoliating mitt. You or an attendant scrubs your skin in long strokes. The grey rolls of dead skin that appear are not dirt — it is the outer layer of skin cells that accumulate between visits. It is deeply satisfying and slightly alarming the first time." },
                { step: "Black soap (savon beldi)", desc: "Applied before the scrub — a soft, olive-based soap that opens the pores. It smells faintly of eucalyptus. Buy some to take home. Every pharmacy and market sells it." },
                { step: "After", desc: "Rest on a mat or bench outside the hot rooms wrapped in a towel. This is the social part — where conversations happen in local hammams. Tea is sometimes served. Leave a tip for the attendant: 20–50 MAD." },
              ].map((item) => (
                <div key={item.step} className="border border-foreground/[0.08] p-5">
                  <p className="text-sm font-medium text-foreground mb-2">{item.step}</p>
                  <p className="text-sm text-foreground/58 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Finding a real one</p>
            <p className="text-sm text-foreground/65 leading-relaxed mb-4">Ask your riad to recommend the nearest neighbourhood hammam. Most riad staff know the local one and can tell you the hours — men and women typically use different sessions, alternating by time of day.</p>
            <p className="text-sm text-foreground/65 leading-relaxed">In Marrakech, several hammams near Bab Doukkala and in the Mellah are open to tourists alongside locals. Hammam Bab Doukkala is one of the oldest. In Fes, the hammams in the Andalusian quarter are less tourist-frequented.</p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
            <Link href="/stories/the-hammam" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Inside the hammam →</Link>
            <Link href="/morocco/things-to-do-in-marrakech" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Things to do in Marrakech →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
