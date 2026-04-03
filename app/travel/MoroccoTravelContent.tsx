"use client";

import { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// SECTION HEADER — matches /life style
// ─────────────────────────────────────────────

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <div className="h-px bg-[#E3120B] mb-4 w-full" />
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-[#E3120B] shrink-0">{number}</span>
        <h2 className="font-serif text-2xl md:text-4xl text-[#0a0a0a] tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm text-[#666] leading-relaxed max-w-2xl ml-8 md:ml-12">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const visaFreeCountries = [
  "United States", "Canada", "United Kingdom", "Australia", "New Zealand",
  "All EU member states", "Switzerland", "Norway", "Iceland", "Japan",
  "South Korea", "Brazil", "Argentina", "Mexico", "UAE",
  "Saudi Arabia", "Kuwait", "Qatar", "Tunisia", "Senegal",
];

const airports = [
  { code: "RAK", city: "Marrakech Menara", note: "Most direct entry for southern routes. Served by all major European low-cost carriers. 6km from the medina." },
  { code: "CMN", city: "Casablanca Mohammed V", note: "Main international hub. Best for connections from North America, West Africa, and the Middle East." },
  { code: "FEZ", city: "Fes–Saïs", note: "Best for northern itineraries. Direct from London, Paris, Amsterdam, Brussels." },
  { code: "AGA", city: "Agadir Al Massira", note: "Atlantic coast, Anti-Atlas, Souss Valley. Mainly European charter and low-cost." },
  { code: "TNG", city: "Tangier Ibn Battuta", note: "The north. Well-connected to Spain and France. Ferry alternative from Tarifa." },
];

const transportModes = [
  {
    mode: "Train (ONCF)",
    best: "Imperial cities corridor",
    detail: "Casablanca → Marrakech (3h), Casablanca → Fes (4h 30m), Casablanca → Tangier (2h 10m via Al Boraq high-speed). Air-conditioned, reliable, affordable. Book at oncf.ma.",
  },
  {
    mode: "CTM Bus",
    best: "Routes the train doesn't reach",
    detail: "Premium intercity buses. Marrakech → Fes overnight (9h), Marrakech → Essaouira (3h), Marrakech → Agadir (4h). Air-conditioned, assigned seats, luggage in hold.",
  },
  {
    mode: "Grand Taxi",
    best: "Short intercity routes",
    detail: "Shared Mercedes sedans on fixed routes. Pay per seat. Depart when full (6 passengers). Faster than buses for routes under 2 hours. Buy all seats to leave immediately.",
  },
  {
    mode: "Petit Taxi",
    best: "Within cities",
    detail: "Metered city taxis. Always insist on the meter. Red in Marrakech, blue in Fes, beige in Casablanca. Cheap. Can pick up additional passengers en route.",
  },
  {
    mode: "Rental Car",
    best: "The south and mountains",
    detail: "Essential for the Draa Valley, Sahara loop, Anti-Atlas, Route of a Thousand Kasbahs. Useless in medinas — parking is near-impossible and the old city is pedestrian-only.",
  },
  {
    mode: "Private Driver",
    best: "All overland journeys",
    detail: "The most practical option for multi-day routes. Driver handles navigation, parking, and local knowledge. All Slow Morocco journeys include a dedicated driver.",
  },
];

const tipGuide = [
  { context: "Restaurant (no service charge)", amount: "10%" },
  { context: "Café, tea", amount: "2–5 DH" },
  { context: "Petit taxi", amount: "Round up" },
  { context: "Porter (airport, hotel)", amount: "10–20 DH / bag" },
  { context: "Hammam attendant", amount: "20–50 DH" },
  { context: "Day guide", amount: "100–200 DH" },
  { context: "Driver, multi-day", amount: "100–200 DH / day" },
  { context: "Parking guardian", amount: "5–10 DH" },
  { context: "Toilet attendant", amount: "2–5 DH" },
];

const packingBySeason = [
  {
    season: "March – May",
    conditions: "Warm days, cool evenings, occasional rain in the north",
    items: ["Light layers (15–25°C days)", "Light jacket or fleece for evenings", "Rain layer for Fes and the north", "Sunscreen — UV is strong already", "Comfortable walking shoes"],
  },
  {
    season: "June – August",
    conditions: "Hot inland, perfect on the coast, extreme in the desert",
    items: ["Lightweight, loose clothing", "High SPF sunscreen (50+)", "Hat with real brim", "Electrolytes or hydration tablets", "Warm layer for Sahara evenings (drops sharply)", "Sandals for medinas, closed shoes for hiking"],
  },
  {
    season: "September – November",
    conditions: "Best overall season. Warm, clear, manageable",
    items: ["Mix of light and medium layers", "Light jacket for evenings", "Sunscreen still essential", "One slightly warmer layer for Atlas visits"],
  },
  {
    season: "December – February",
    conditions: "Cold inland, mild on coast, snow in Atlas",
    items: ["Warm coat for Fes and Marrakech nights (can reach 3°C)", "Waterproof layer", "Scarf and layers", "Ski gear if going to Ifrane or Oukaimeden", "Boots for rain and cold"],
  },
];

const healthPoints = [
  { heading: "Vaccinations", body: "None required for entry. Hepatitis A and tetanus recommended by most travel clinics. No malaria in Morocco. No antimalarials needed." },
  { heading: "Water", body: "Drink bottled. Tap water is treated in cities but the mineral content causes stomach upsets in visitors. Bottled water is cheap and everywhere." },
  { heading: "Food", body: "Street food is generally safe at high-turnover stalls. Fresh salads washed in tap water carry a small risk in the first week. Cooked food is lower risk." },
  { heading: "Sun", body: "Dehydration and sun exposure are the most common health problems tourists experience. High SPF, a hat, and consistent water intake matter most." },
  { heading: "Pharmacies", body: "Well-stocked and staffed to a high standard. Many prescription medications available over the counter. A pharmacist is a sensible first stop for minor ailments." },
  { heading: "Medical care", body: "Private clinics in Marrakech, Casablanca, Fes, and Rabat offer good care. Polyclinique du Sud is commonly recommended in Marrakech for visitors." },
];

const essentialsAlways = [
  "Passport valid 6+ months beyond travel dates",
  "Cash in dirhams — carry enough for a full day before entering any medina",
  "Travel insurance with medical repatriation",
  "Modest clothing — covered shoulders and knees outside beach areas",
  "Comfortable shoes — medina cobblestones are uneven",
  "Sunscreen SPF 50+",
  "Headscarf or light layer (for women, useful in conservative areas)",
  "Power adapter (Morocco uses EU Type C/E sockets, 220V)",
  "Offline maps downloaded (Google Maps or Maps.me) — medinas are a labyrinth",
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function MoroccoTravelContent() {
  const [activePackingSeason, setActivePackingSeason] = useState(0);
  const [activeVisa, setActiveVisa] = useState(false);

  return (
    <div className="bg-white text-[#0a0a0a] min-h-screen">

      {/* ── MASTHEAD ── */}
      <div className="border-b-4 border-[#E3120B]">
        <div className="px-8 md:px-[8%] py-3 flex items-center justify-between">
          <Link href="/" className="text-[9px] tracking-[0.3em] uppercase font-mono text-[#666] hover:text-[#0a0a0a] transition-colors">
            Slow Morocco
          </Link>
          <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#E3120B]">Travel Planning</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="px-8 md:px-[8%] pt-16 pb-16 border-b border-[#e5e5e5]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <h1 className="font-serif text-5xl md:text-7xl text-[#0a0a0a] leading-[0.9] tracking-tight mb-6">
              Travelling<br />to Morocco.
            </h1>
            <p className="text-base text-[#444] leading-relaxed max-w-xl">
              Visa requirements, flights, transport, money, tipping, health,
              safety, and what to pack. Everything on one page. Written from
              living here, not from a week of research.
            </p>
          </div>
          <div className="md:col-span-4">
            <div className="border border-[#e5e5e5] p-6 space-y-3">
              {[
                { label: "Sections", value: "8" },
                { label: "Visa-free nationalities", value: "100+" },
                { label: "Moroccan dirham to 1 EUR", value: "≈ 11.1" },
                { label: "Best months", value: "Mar–May, Sep–Nov" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-baseline border-b border-[#f0f0f0] pb-2 last:border-0 last:pb-0">
                  <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-[#aaa]">{s.label}</p>
                  <p className="font-mono text-sm font-bold text-[#E3120B]">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOC ── */}
      <nav className="px-8 md:px-[8%] py-6 border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { n: "01", l: "Visa & Entry", h: "#visa" },
            { n: "02", l: "Getting There", h: "#getting-there" },
            { n: "03", l: "Getting Around", h: "#getting-around" },
            { n: "04", l: "Money", h: "#money" },
            { n: "05", l: "Health & Safety", h: "#health" },
            { n: "06", l: "What to Pack", h: "#packing" },
            { n: "07", l: "When to Go", h: "#when" },
            { n: "08", l: "Essentials Checklist", h: "#checklist" },
          ].map((item) => (
            <a
              key={item.n}
              href={item.h}
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-mono text-[#888] hover:text-[#E3120B] transition-colors"
            >
              <span className="text-[#E3120B]">{item.n}</span>
              {item.l}
            </a>
          ))}
        </div>
      </nav>

      <div className="px-8 md:px-[8%] py-16 space-y-20">

        {/* ── 01 VISA ── */}
        <section id="visa">
          <SectionHeader
            number="01"
            title="Visa & Entry"
            subtitle="Most Western visitors do not need a visa. At the border: a short entry form, a passport stamp, and you are in."
          />

          <div className="border border-[#e5e5e5] mb-6">
            <div className="px-6 py-5 border-b border-[#e5e5e5] bg-[#fff5f5]">
              <p className="text-sm font-bold text-[#0a0a0a]">Visa-free entry — 90 days</p>
              <p className="text-xs text-[#666] mt-1">The following nationalities enter Morocco without a visa for stays up to 90 days.</p>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-2">
              {visaFreeCountries.map((c) => (
                <p key={c} className="text-xs text-[#555] border border-[#f0f0f0] px-3 py-2">{c}</p>
              ))}
            </div>
            <div className="px-6 pb-4">
              <p className="text-[10px] font-mono text-[#aaa]">Not exhaustive. Always verify with the Moroccan consulate before travel.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-6">
            {[
              { heading: "Passport requirements", body: "Valid for at least 6 months beyond your departure date from Morocco. At least one blank page for entry stamps. Keep your entry card — hotels will ask for it at check-in." },
              { heading: "At the border", body: "Entry through Marrakech (RAK), Casablanca (CMN), or Fes (FEZ) is straightforward for Western passports. Fill in an arrival card, hand over your passport, receive a stamp. Land borders from Ceuta or Melilla have longer queues." },
              { heading: "Countries requiring visas", body: "Nationals of many African, Asian, and Middle Eastern countries require a visa in advance. Apply through the Moroccan embassy or consulate in your country. Allow 4–6 weeks. We can provide an invitation letter — contact us if needed." },
              { heading: "Extending your stay", body: "Apply at the Préfecture in your city of residence before 90 days expire. In Marrakech: Boulevard Mohammed VI. You need passport, proof of address, financial documentation, two photographs. Extensions are typically 90 additional days." },
            ].map((item) => (
              <div key={item.heading} className="bg-white px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-2">{item.heading}</p>
                <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-mono text-[#aaa]">
            Visa requirements change. Verify with the Moroccan embassy in your country before booking. Information current as of March 2026.
          </p>
        </section>

        {/* ── 02 GETTING THERE ── */}
        <section id="getting-there">
          <SectionHeader
            number="02"
            title="Getting There"
            subtitle="Morocco has five international airports that matter. Fly into the one that matches where your journey starts — not which city has the cheapest fare."
          />

          <div className="border border-[#e5e5e5] mb-8">
            {airports.map((ap) => (
              <div key={ap.code} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors">
                <span className="font-mono text-xs border border-[#e5e5e5] px-2 py-1 text-[#E3120B] self-start w-fit">{ap.code}</span>
                <p className="text-sm font-medium text-[#0a0a0a]">{ap.city}</p>
                <p className="text-sm text-[#666] col-span-2 leading-relaxed">{ap.note}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
            {[
              { from: "From Europe", body: "Under 3 hours from Spain, France, and the UK. Ryanair, easyJet, Transavia, and Vueling serve most Moroccan airports directly. Royal Air Maroc covers all hubs." },
              { from: "From North America", body: "Royal Air Maroc flies direct from New York (JFK) and Washington (IAD) to Casablanca year-round, and to Marrakech seasonally. Most travellers connect through a European hub." },
              { from: "Overland from Spain", body: "The Tarifa–Tangier ferry takes 35 minutes across the Strait of Gibraltar. Algeciras–Tangier Med (1.5h) is better for vehicles. Book in advance in summer." },
            ].map((item) => (
              <div key={item.from} className="bg-white px-6 py-6">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-2">{item.from}</p>
                <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 GETTING AROUND ── */}
        <section id="getting-around">
          <SectionHeader
            number="03"
            title="Getting Around Morocco"
            subtitle="The train handles the imperial cities. Buses cover the rest. For the south and desert, hire a driver or rent a car."
          />
          <div className="border border-[#e5e5e5]">
            {transportModes.map((t) => (
              <div key={t.mode} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-5 border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors">
                <div>
                  <p className="text-sm font-bold text-[#0a0a0a]">{t.mode}</p>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-mono text-[#E3120B] mt-1">{t.best}</p>
                </div>
                <p className="text-sm text-[#555] leading-relaxed md:col-span-3">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 MONEY ── */}
        <section id="money">
          <SectionHeader
            number="04"
            title="Money"
            subtitle="Morocco runs primarily on cash. Cards work in hotels and upscale restaurants. The medina, taxis, street food, and most of daily life require dirhams."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-8">
            {[
              { heading: "The dirham (MAD)", body: "Partially convertible — cannot be exchanged outside Morocco. 1 EUR ≈ 11.1 DH · 1 USD ≈ 10.2 DH · 1 GBP ≈ 13.2 DH (January 2026). Calculate carefully; do not dramatically over-obtain." },
              { heading: "Exchanging money", body: "Best rates at bank exchange bureaux in city centres. Avoid airport counters — rates are consistently poor. Euros are the easiest foreign currency to exchange. Street money changers in tourist areas always offer worse rates. Avoid." },
              { heading: "ATMs", body: "Widely available in cities. In rural areas — Sahara, Anti-Atlas, small Atlas villages — may be absent or unreliable. Carry sufficient cash before heading south. Notify your bank before travelling to avoid cards being blocked." },
              { heading: "Cards", body: "Accepted at international hotels, modern restaurants, and supermarkets (Marjane, Carrefour). Some add a 2–3% surcharge. In the medina — souks, street food, taxis, hammams, small cafés — cash only." },
            ].map((item) => (
              <div key={item.heading} className="bg-white px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-2">{item.heading}</p>
                <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Tipping */}
          <div className="border border-[#e5e5e5]">
            <div className="px-6 py-4 border-b border-[#e5e5e5] bg-[#fafafa]">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a]">Tipping guide</p>
              <p className="text-xs text-[#888] mt-1">Tipping is expected. Morocco's service industry wages are low; tips form a meaningful part of income.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {tipGuide.map((item, i) => (
                <div
                  key={item.context}
                  className="flex justify-between items-center px-6 py-3 border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors"
                >
                  <p className="text-sm text-[#555]">{item.context}</p>
                  <p className="font-mono text-sm font-bold text-[#0a0a0a] shrink-0 ml-4">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 HEALTH & SAFETY ── */}
        <section id="health">
          <SectionHeader
            number="05"
            title="Health & Safety"
            subtitle="Morocco is a safe and healthy destination for most travellers. The risks are real but manageable. No vaccinations required. No malaria."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-8">
            {healthPoints.map((item) => (
              <div key={item.heading} className="bg-white px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-2">{item.heading}</p>
                <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-[#E3120B] pl-6 mb-8">
            <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-[#E3120B] mb-3">Safety reality</p>
            <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
              Morocco is one of the safest countries in Africa. Both the UK FCDO
              and US State Department rate it Level 1 — exercise normal precautions.
              Violent crime against tourists is rare. The actual risks are petty
              theft in crowded tourist medinas and persistent touts in Marrakech
              and Fes. Keep wallets out of back pockets in the souks. If someone
              offers to guide you "for free," there is a carpet shop at the end.
              Outside tourist cores, you will likely experience no hassle at all.
            </p>
          </div>

          <div className="border border-[#e5e5e5] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-4">Emergency numbers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Police", n: "19" },
                { label: "Ambulance / Fire", n: "15" },
                { label: "Gendarmerie", n: "177" },
                { label: "Tourist Police (Marrakech)", n: "+212 524 384601" },
              ].map((e) => (
                <div key={e.label}>
                  <p className="text-[10px] uppercase tracking-[0.1em] font-mono text-[#aaa] mb-1">{e.label}</p>
                  <p className="font-mono text-base font-bold text-[#E3120B]">{e.n}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 PACKING ── */}
        <section id="packing">
          <SectionHeader
            number="06"
            title="What to Pack"
            subtitle="Morocco spans five climate zones. What you need depends entirely on when and where you go."
          />

          <div className="flex flex-wrap gap-2 mb-6">
            {packingBySeason.map((s, i) => (
              <button
                key={s.season}
                onClick={() => setActivePackingSeason(i)}
                className={`text-[9px] tracking-[0.2em] uppercase font-mono px-4 py-2 border transition-colors ${
                  activePackingSeason === i
                    ? "bg-[#E3120B] text-white border-[#E3120B]"
                    : "border-[#e5e5e5] text-[#888] hover:border-[#E3120B] hover:text-[#E3120B]"
                }`}
              >
                {s.season}
              </button>
            ))}
          </div>

          {packingBySeason[activePackingSeason] && (
            <div className="border border-[#E3120B] p-6 mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#E3120B] mb-1">
                {packingBySeason[activePackingSeason].season}
              </p>
              <p className="text-sm text-[#666] mb-4">{packingBySeason[activePackingSeason].conditions}</p>
              <ul className="space-y-2">
                {packingBySeason[activePackingSeason].items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[#444]">
                    <span className="text-[#E3120B] shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border border-[#e5e5e5] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-4">Always, regardless of season</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Modest clothing — covered shoulders and knees outside beach areas",
                "Cash in dirhams — enough for a full day before entering any medina",
                "Comfortable walking shoes — medina cobblestones are uneven",
                "High SPF sunscreen (50+)",
                "Power adapter — Morocco uses EU Type C/E sockets, 220V",
                "Offline maps downloaded — medinas are a labyrinth without signal",
                "Travel insurance with medical repatriation",
                "Headscarf or light layer (useful in conservative areas)",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm text-[#444]">
                  <span className="text-[#E3120B] shrink-0">—</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 WHEN TO GO ── */}
        <section id="when">
          <SectionHeader
            number="07"
            title="When to Go"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
            {[
              { heading: "Best months", body: "March–May and September–November. Comfortable temperatures across the country, good light, manageable crowds. Spring brings wildflowers in the Atlas and the rose harvest in the Dadès Valley in May." },
              { heading: "Avoid inland in summer", body: "July and August in Marrakech, Fes, and the Sahara region regularly reach 42°C. The Atlantic coast is pleasant year-round. The Atlas has a ski season December–March." },
              { heading: "Ramadan", body: "Dates shift annually (lunar calendar). Not a reason to avoid Morocco — the evenings are spectacular and the atmosphere is unlike any other time of year. Some restaurants are closed by day. A different rhythm to city life." },
              { heading: "Key festivals", body: "Rose Festival, Kelaat M'Gouna: May. Gnaoua Festival, Essaouira: June. Fes Festival of World Sacred Music: June. Cherry Festival, Sefrou: June. Imilchil Moussem: September." },
            ].map((item) => (
              <div key={item.heading} className="bg-white px-6 py-6">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] mb-2">{item.heading}</p>
                <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 08 CHECKLIST ── */}
        <section id="checklist">
          <SectionHeader
            number="08"
            title="Essentials Checklist"
            subtitle="Print this. The things that matter before you board."
          />
          <div className="border border-[#e5e5e5]">
            {essentialsAlways.map((item, i) => (
              <div key={item} className="flex items-start gap-4 px-6 py-4 border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                <span className="font-mono text-xs text-[#E3120B] shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-[#333]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER LINKS ── */}
        <section>
          <div className="h-px bg-[#e5e5e5] mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5] border border-[#e5e5e5] mb-8">
            {[
              { href: "/life", label: "Morocco — The Country", desc: "Safety data, infrastructure, demographics, and 2030 context." },
              { href: "/stories", label: "Cultural Stories", desc: "222 pieces on the history, food, people, and architecture of Morocco." },
              { href: "/journeys", label: "Private Journeys", desc: "Slow Morocco's cultural journeys, shaped around what matters to you." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white px-8 py-6 hover:bg-[#fafafa] transition-colors"
              >
                <p className="text-sm font-bold text-[#0a0a0a] group-hover:text-[#E3120B] transition-colors mb-1">
                  {link.label} →
                </p>
                <p className="text-xs text-[#888]">{link.desc}</p>
              </Link>
            ))}
          </div>
          <p className="text-[10px] font-mono text-[#aaa]">
            Slow Morocco · slowmorocco.com · Information current as of March 2026 · © Dancing with Lions 2026
          </p>
        </section>

      </div>
    </div>
  );
}
