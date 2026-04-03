import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visiting Morocco During Ramadan: What to Expect",
  description: "Ramadan changes Morocco entirely. Restaurants close by day, cities come alive at night, and the communal breaking of the fast is one of the most atmospheric experiences the country offers. What to know.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/ramadan" },
};

export default function RamadanGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Cultural context</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Visiting Morocco During Ramadan</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">Ramadan is the most misunderstood month to visit Morocco. Most tourists avoid it. This is a mistake.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="font-serif text-xl text-foreground leading-relaxed mb-6">The medinas come alive at night in a way that has no equivalent at any other time of year. The streets after sunset fill with families, the food stalls are at full capacity, the music plays later. The collective exhale of a city that has been fasting since dawn is a palpable thing.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What changes</p>
          <div className="space-y-3">
            {[
              { change: "Restaurants", detail: "Most non-tourist restaurants close during daylight hours. Hotels and riads catering to tourists continue to serve breakfast and lunch. The further you are from the tourist medina, the harder it is to find food before sunset." },
              { change: "The rhythm", detail: "The day is slow, particularly in the afternoon when energy is low. Shops may open later and close earlier. Government offices operate reduced hours. Do not plan activities that require peak Moroccan engagement in the mid-afternoon." },
              { change: "Iftar (breaking the fast)", detail: "Sunset is the moment of transformation. The streets empty completely for 20 minutes as families gather. Then they fill again. The harira stalls open. The mint tea returns. Jemaa el-Fna at iftar is extraordinary." },
              { change: "Cafés", detail: "No tea, no coffee, no smoking in public during daylight hours — from most vendors. Tourist cafés remain open but may be quieter. The café culture that defines Moroccan male social life pauses and resumes at sunset." },
              { change: "Alcohol", detail: "Alcohol is available in licensed tourist restaurants and hotels throughout Ramadan. It is not available at establishments that have suspended service for the month. Do not expect it in neighbourhood restaurants." },
            ].map((item) => (
              <div key={item.change} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-2">{item.change}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">What to do</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Organise your day around the Ramadan rhythm rather than fighting it. Mornings are calm and relatively easy — monuments, hammam, souks. Afternoons are slow — riads, reading, rest. Plan activities for after iftar — the city is at full volume from 8pm to well past midnight.</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">If you are invited to break the fast with a Moroccan family — through your riad, through a local contact — accept. The iftar table is one of the most generous expressions of Moroccan hospitality.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The last ten nights of Ramadan intensify. Laylat al-Qadr (the Night of Power, one of the last odd nights) is the holiest night of the year — the mosques and zawiyyas are full, the streets alive until dawn.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Ramadan dates (approximate)</p>
          <div className="space-y-2">
            {[
              { year: "2025", dates: "March 1 – March 30" },
              { year: "2026", dates: "February 18 – March 19" },
              { year: "2027", dates: "February 7 – March 8" },
            ].map((item) => (
              <div key={item.year} className="flex justify-between py-3 border-b border-foreground/[0.06] text-sm">
                <span className="text-foreground/65">{item.year}</span>
                <span className="text-foreground/40">{item.dates}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground/30 mt-3">Dates are approximate — the official start depends on moon sighting.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/ramadan-moon" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Ramadan in Morocco →</Link>
          <Link href="/morocco/islam-and-daily-life" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Islam and daily life →</Link>
        </div>
      </div>
    </div>
  );
}
