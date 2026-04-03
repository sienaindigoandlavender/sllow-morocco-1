import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jewish Heritage in Morocco: Mellah, Synagogues and History",
  description: "Morocco had one of the oldest and most significant Jewish communities in the world. The Mellah quarters, ancient synagogues, and the Diaspora Museum in Casablanca. A guide for visitors.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/jewish-heritage" },
};

export default function JewishHeritagePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
        <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">← Morocco</Link>
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Cultural context</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">Jewish Heritage in Morocco</h1>
        <p className="text-base text-foreground/55 leading-relaxed max-w-xl">At its peak in the 1940s, Morocco had 265,000 Jewish residents — the largest Jewish community in the Arab world. Most emigrated to Israel and France in the 1950s–70s. What they left behind is still legible in the fabric of Moroccan cities.</p>
      </div>
      <div className="px-6 md:px-14 py-16 max-w-3xl space-y-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">The Mellah</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">Every major Moroccan city had a Mellah — the Jewish quarter, established in the 15th century. The word is Arabic for 'salt.' The etymology is disputed: some say it refers to the Jewish role in preserving the heads of executed rebels (in salt) for public display; others attribute it to a salt marsh in Fes where the first Mellah was established.</p>
          <p className="text-sm text-foreground/65 leading-relaxed mb-4">The Mellah was not a ghetto in the European sense — Jews were under royal protection and the quarters were established as much for tax administration and community coherence as for separation. The architecture is distinctive: balconied facades, wrought-iron railings, taller buildings than the surrounding medina, and the specific urban plan of a community that was largely Jewish for 500 years.</p>
          <p className="text-sm text-foreground/65 leading-relaxed">Today most Mellah quarters are inhabited by Muslim Moroccan families — the Jewish population having largely emigrated. The architecture remains.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Where to visit</p>
          <div className="space-y-px">
            {[
              { place: "Fes Mellah", desc: "The oldest and most intact Mellah in Morocco, established in 1438 near the royal palace. The Ibn Danan synagogue (17th century) is still standing and accessible. The Jewish cemetery at Bab Guissa is the largest in Morocco — over 5,000 graves, the oldest from the 16th century." },
              { place: "Marrakech Mellah", desc: "Established in 1558 adjacent to the Bahia Palace. The Lazama synagogue is open to visitors. The architecture — tall balconied buildings, ironwork, narrower streets than the surrounding medina — is distinct from the rest of the old city." },
              { place: "Essaouira", desc: "The Slat Lkahal synagogue has been restored. The Mellah is small and walkable. The Jewish community here was particularly significant — many of the Portuguese-descended Jewish merchants who made Essaouira a commercial centre in the 18th century lived here. The American Consulate documentation shows their role in trade." },
              { place: "Museum of Moroccan Judaism, Casablanca", desc: "The only Jewish museum in the Arab world. Established in 1997 in Casablanca's Oasis district. Documents the history of Moroccan Jewry from antiquity to the present day — Torah scrolls, liturgical objects, photographs, household items. Essential context before visiting Mellah quarters." },
              { place: "Bayt Dakira, Essaouira", desc: "A cultural centre and synagogue opened in 2021 — the newest addition to the Jewish heritage circuit. Dedicated to the memory of the Jewish community of Essaouira, with rotating exhibitions on Moroccan Jewish culture and history." },
            ].map((item) => (
              <div key={item.place} className="border border-foreground/[0.08] p-6">
                <h2 className="font-serif text-lg text-foreground mb-3">{item.place}</h2>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">King Mohammed VI and Jewish heritage</p>
          <p className="text-sm text-foreground/65 leading-relaxed">The current king has made the restoration and recognition of Morocco's Jewish heritage an explicit royal priority — funding synagogue restorations, maintaining Jewish cemeteries, and including Jewish heritage in Morocco's official tourism narrative. The Abraham Accords (2020) normalized Morocco's relations with Israel after decades of informal but significant connections. Morocco is one of the very few Muslim-majority countries where Jewish heritage is officially celebrated.</p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/[0.08]">
          <Link href="/stories/jewish-heritage-morocco" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Read: Jewish Morocco →</Link>
          <Link href="/places/bayt-dakira" className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border-b border-foreground/15 pb-0.5 transition-colors">Bayt Dakira, Essaouira →</Link>
        </div>
      </div>
    </div>
  );
}
