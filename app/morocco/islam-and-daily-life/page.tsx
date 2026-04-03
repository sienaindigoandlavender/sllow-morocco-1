import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Islam and Daily Life in Morocco: What Visitors Need to Know",
  description: "Islam in Morocco is lived, not performed. What the call to prayer means, how Ramadan changes the country, what mosques are open to non-Muslims, and how to move through a Muslim country with understanding.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/islam-and-daily-life" },
};

export default function IslamDailyLifePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Cultural context</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Islam and Daily Life in Morocco</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">Morocco is 99% Muslim. Islam structures the calendar, the architecture, the law, and the rhythm of the day. Understanding it is not optional context — it is the frame for everything you will see.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">The call to prayer</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">The adhan sounds five times a day from every mosque in the country — Fajr before sunrise, Dhuhr at noon, Asr in the afternoon, Maghrib at sunset, Isha after dark. In a city like Fes or Marrakech, where mosques are every few streets, the overlapping calls from different minarets create a layered sound that has no equivalent.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The call is not asking you to do anything. It is a declaration — "God is great, prayer is better than sleep" — addressed to the city as a whole. Friday noon prayer (Jumu'ah) is the most significant of the week; the streets empty and fill again around it.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Mosques and non-Muslims</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Most mosques in Morocco are not open to non-Muslims. This is not hostility — it is the same convention that makes certain spaces sacred. The Hassan II Mosque in Casablanca is the major exception: it admits non-Muslim visitors on guided tours at specific times.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">Madrasas (religious schools) adjacent to mosques are frequently accessible and architecturally extraordinary — the Ben Youssef in Marrakech, the Bou Inania in Fes. These are the buildings that show you the interior logic of Islamic architecture: the zellige, the carved stucco, the courtyard geometry.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">The Five Pillars in daily life</p>
          <div className="space-y-3">
            {[
              { pillar: "Shahada (declaration of faith)", visible: "The phrase 'La ilaha illa Allah' on doorways, in calligraphy, in textiles. The first thing spoken at birth, the last at death." },
              { pillar: "Salat (prayer)", visible: "The call to prayer five times daily. Prayer rugs in riads. The direction of Mecca marked in hotel rooms. Men breaking from stalls to pray in the souks." },
              { pillar: "Zakat (charitable giving)", visible: "Less visible but structurally important — the giving of 2.5% of savings annually. Expressed in the zaouias (saint shrines) that redistribute to the poor, in the bread left outside bakeries." },
              { pillar: "Sawm (fasting during Ramadan)", visible: "The month that restructures the entire country — restaurants closed by day, the city alive at night, harira and chebakia at sunset, the communal breaking of the fast." },
              { pillar: "Hajj (pilgrimage to Mecca)", visible: "Green flags and murals on houses whose owner has completed the pilgrimage. The title 'Haj' or 'Hajja' before a name. Houses painted with pilgrimage scenes in some rural areas." },
            ].map((item) => (
              <div key={item.pillar} className="border border-foreground/[0.08] p-5">
                <p className="text-sm font-medium text-foreground mb-1">{item.pillar}</p>
                <p className="text-sm text-foreground/58 leading-relaxed">{item.visible}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Practical respect</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Remove shoes when entering a mosque or private home if you see shoes at the door. Dress modestly when visiting religious sites — shoulders and knees covered. Ask before photographing people at prayer. Do not eat, drink, or smoke in public during Ramadan daylight hours — even as a non-Muslim, it is a matter of courtesy.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">These are not burdens. They are the same instincts you would bring to a cathedral or a synagogue — an acknowledgement that you are in a space that means something to someone else.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/morocco/ramadan" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Ramadan in Morocco →</Link>
          <Link href="/stories/the-call" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The call to prayer →</Link>
          <Link href="/stories/the-pillars" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: The five pillars →</Link>
        </div>
      </div>
    </div>
  );
}
