import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is Morocco Safe? Travel Safety Guide 2026",
  description: "Morocco is generally safe for tourists. Petty theft in medinas, unofficial guides, and tourist pricing are the main irritants. Violent crime against tourists is rare. Here is what to actually watch for.",
  alternates: { canonical: "https://www.slowmorocco.com/morocco/is-morocco-safe" },
  openGraph: {
    title: "Is Morocco Safe to Visit?",
    description: "Morocco is generally safe. The main issues are petty theft, unofficial guides, and persistent salesmanship in the medinas. Violent crime against tourists is rare. What to know before you go.",
    url: "https://www.slowmorocco.com/morocco/is-morocco-safe",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Morocco safe for tourists?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Morocco is generally safe for tourists. It receives over 14 million visitors per year and has well-established tourism infrastructure. Petty theft and persistent unofficial guides in medinas are the main issues. Violent crime against tourists is uncommon."
      }
    },
    {
      "@type": "Question",
      "name": "Is Morocco safe for solo female travellers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Solo female travel in Morocco is possible and increasingly common. Street harassment — catcalls, persistent attention — does occur, particularly in larger cities. Dressing modestly reduces but does not eliminate it. Essaouira, Chefchaouen, and smaller towns are generally more comfortable than Marrakech and Fes."
      }
    },
    {
      "@type": "Question",
      "name": "Is Marrakech safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marrakech is safe for tourists. The medina has heavy tourist police presence. The main issues are unofficial guides, persistent vendors, and mint tea invitations that lead to carpet shops. Pickpocketing occurs around Jemaa el-Fna and in the souks."
      }
    },
    {
      "@type": "Question",
      "name": "What are the main scams in Morocco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common: unofficial guides who offer to show you around then demand money or lead you to shops; henna artists who apply henna without asking then demand large sums; 'friendly locals' who offer to show you a shortcut and expect payment. All are avoidable with basic awareness."
      }
    }
  ]
};

export default function IsMoroccoSafePage() {
  return (
    <>
      <Script id="safety-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background min-h-screen">

        {/* Header */}
        <div className="px-6 md:px-14 pt-20 pb-12 border-b border-foreground/[0.08]">
          <Link href="/morocco" className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-8 block">
            ← Morocco
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Planning</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-6 max-w-2xl">
            Is Morocco Safe?
          </h1>
          <p className="text-base text-foreground/55 leading-relaxed max-w-xl">
            Morocco receives over 14 million visitors per year. The question is not whether it is safe — it is what to actually watch for.
          </p>
        </div>

        {/* The honest answer */}
        <div className="px-6 md:px-14 py-16 max-w-3xl">
          <p className="font-serif text-2xl text-foreground leading-relaxed mb-8">
            Morocco is safe. The main issues are not dangerous — they are irritating.
          </p>
          <p className="text-base text-foreground/60 leading-relaxed mb-6">
            Petty theft in crowded medinas. Unofficial guides who attach themselves to tourists and demand payment. Persistent salesmanship. Tourist pricing that bears no relation to local pricing. These are real and they affect the experience — particularly in Marrakech and Fes, less so in Essaouira, Chefchaouen, or the south.
          </p>
          <p className="text-base text-foreground/60 leading-relaxed">
            Violent crime against tourists is uncommon. Morocco has a significant police presence in tourist areas. The country's economy depends substantially on tourism and the government takes security seriously. Most visitors' worst experience is an hour in a carpet shop they didn't intend to enter.
          </p>
        </div>

        {/* Main issues broken down */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-12">What to actually watch for</p>
          <div className="max-w-3xl space-y-px">

            {[
              {
                issue: "Unofficial guides",
                detail: "Someone approaches, speaks your language, and offers to show you around — a shortcut to the tanneries, a back way to the souks. The tour ends at a cousin's shop. The solution: say clearly that you are not looking for a guide and keep walking. Do not engage or negotiate. If you want a guide, arrange one through your riad."
              },
              {
                issue: "Petty theft",
                detail: "Pickpocketing occurs in Jemaa el-Fna and the main souks of Marrakech and Fes. Keep phones in front pockets or bags worn across the body. Don't leave valuables on café tables. The risk is comparable to any major European tourist city — present but manageable."
              },
              {
                issue: "The mint tea invitation",
                detail: "You are invited for tea, apparently for free. After an hour of hospitality and showing you carpets, the bill is large. The tea itself may be free — the carpet pitch is the product. There is no obligation to buy anything. You can leave. But knowing this before you sit down makes the experience less uncomfortable."
              },
              {
                issue: "Henna artists",
                detail: "Women in Jemaa el-Fna offer henna. If you extend your hand, the application begins and the price is established after. Prices quoted after application are often very high. Decide before extending your hand."
              },
              {
                issue: "Taxi pricing",
                detail: "Grand taxis (shared) have fixed routes and prices. Petit taxis have meters — insist the meter is on. From the airport into Marrakech city, the fare is metered. Negotiating a flat rate without the meter usually costs more than the meter would. If a driver refuses the meter, leave."
              },
              {
                issue: "Food safety",
                detail: "Tap water is not safe to drink in most of Morocco. Bottled or filtered water only. Street food is generally safe — the stalls with the most local customers are the benchmark. Ice in tourist restaurants is usually made from purified water. Ice from street stalls is less predictable."
              }
            ].map((item, i) => (
              <div key={i} className="border border-foreground/[0.08] p-6">
                <h2 className="font-serif text-lg text-foreground mb-3">{item.issue}</h2>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solo female travel */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">Solo female travel</p>
            <p className="text-sm text-foreground/65 leading-relaxed mb-4">
              Solo female travel in Morocco is possible and increasingly common. Street harassment — catcalls, persistent attention from men — does occur in larger cities, particularly in Marrakech and Fes. It is improving but it is present.
            </p>
            <p className="text-sm text-foreground/65 leading-relaxed mb-4">
              Dressing modestly (shoulders and knees covered) reduces but does not eliminate attention. It is also a straightforward act of respect for the culture you are visiting. Essaouira, Chefchaouen, and smaller towns are generally more comfortable than the major medinas.
            </p>
            <p className="text-sm text-foreground/65 leading-relaxed">
              The most practical advice: stay in riads where the staff know the city and can advise on specific areas and times. Move confidently. Direct eye contact with strangers invites conversation; looking ahead does not.
            </p>
          </div>
        </div>

        {/* LGBTQ note */}
        <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">LGBTQ+ travel</p>
            <p className="text-sm text-foreground/65 leading-relaxed">
              Same-sex relations are illegal in Morocco under Article 489 of the penal code. Enforcement is inconsistent and arrests of tourists are rare, but the legal situation is real. Public displays of affection — for any couple — attract attention in conservative areas. Discretion is both practical and appropriate.
            </p>
          </div>
        </div>

        {/* Related */}
        <div className="px-6 md:px-14 py-12 border-t border-foreground/[0.08]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">Continue planning</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/morocco/travel-guide" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Morocco travel guide →</Link>
            <Link href="/morocco/best-time-to-visit" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Best time to visit →</Link>
            <Link href="/morocco/things-to-do-in-marrakech" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Things to do in Marrakech →</Link>
            <Link href="/start-here" className="text-sm text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5">Get your orientation →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
