"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import OvernightBookingModal from "@/components/OvernightBookingModal";
import ShareTools from "@/components/ShareTools";
import { IconClock, IconCamel, IconDesert, IconMountains } from "@/components/icons";

const ItineraryMap = dynamic(() => import("@/components/ItineraryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[400px] bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  ),
});

// ── Testimonianze ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Un'introduzione brillante al Marocco. Ben organizzato e curato — non avrei potuto desiderare un'introduzione migliore. Tutti gli alloggi erano interessanti.",
    author: "Angela A.",
    journey: "Circuito Sahara di 3 Giorni",
  },
  {
    quote: "Ho amato ogni minuto. Il deserto è stato indimenticabile. Tantissimi dettagli curati oltre ogni aspettativa. Ci si sente al sicuro, felici e ben seguiti.",
    author: "Rhonda",
    journey: "Viaggio privato in Marocco",
  },
  {
    quote: "Mi sono avventurato nel deserto e non trovo le parole per descrivere quanto sia stato ricco di cultura e avventura questo viaggio. Ad ogni passo mi sono sentito curato e completamente al sicuro.",
    author: "Anthony K.",
    journey: "Viaggio privato in Marocco",
  },
  {
    quote: "Siamo stati accolti al Dihya Desert Camp dove i Berberi suonavano e ballavano intorno al fuoco. Le stelle nel deserto erano incredibili. Abbiamo cavalcato le dune e ammirato il tramonto durante il giro in cammello serale.",
    author: "Mary Ann",
    journey: "Viaggio privato in Marocco",
  },
];

// ── Domande frequenti ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Quanto dista Merzouga da Marrakech?",
    a: "Merzouga si trova a circa 550 chilometri da Marrakech — circa 9 ore di strada. Il percorso attraversa l'Alto Atlante passando per il colle di Tizi n'Tichka, Ouarzazate e la Valle del Draa. Non è una gita di un giorno. Chi propone 'il Sahara' come escursione giornaliera da Marrakech sta in realtà vendendo l'altopiano di Agafay, un deserto roccioso fuori città — molto diverso dalle dune di Erg Chebbi.",
  },
  {
    q: "Qual è la differenza tra il deserto di Agafay e il Sahara?",
    a: "Agafay è un altopiano roccioso a circa 40 minuti da Marrakech. Offre un paesaggio spettacolare e campi per il pernottamento, ma non ha dune di sabbia e tecnicamente non fa parte del Sahara. Le dune di Erg Chebbi a Merzouga — alte 150 metri — sono il vero Sahara. Entrambe sono esperienze valide. Non sono la stessa cosa.",
  },
  {
    q: "Qual è il periodo migliore per un tour nel deserto del Sahara?",
    a: "Da ottobre ad aprile. Il deserto in estate (giugno-agosto) raggiunge i 45°C a mezzogiorno — fisicamente pericoloso e poco piacevole. Primavera e autunno offrono giornate calde, notti fresche e la luce migliore sulle dune. Ottobre coincide con la raccolta dei datteri nella Valle del Draa. Dicembre e gennaio sono freddi di notte ma con giornate limpide.",
  },
  {
    q: "È un tour privato o di gruppo?",
    a: "Privato. Il vostro veicolo, il vostro autista, i vostri orari. Nessun minibus condiviso, nessuna fermata fissa nei negozi turistici, nessun accordo di commissione con i venditori di souvenir. Il percorso e il ritmo sono vostri.",
  },
  {
    q: "Cosa è incluso nel prezzo?",
    a: "Autista privato per tre giorni, due notti di alloggio (Ouarzazate e un campo nel deserto a Merzouga) e tutti i trasferimenti. I pasti non sono inclusi — si mangia nei ristoranti locali lungo il percorso, che consigliamo specificamente. Gli ingressi a siti come Aït Benhaddou non sono inclusi (circa €2-3 a persona).",
  },
  {
    q: "Il tour può essere esteso?",
    a: "Sì. Il viaggio di 4 giorni Sahara e Valli aggiunge la Valle del Dades e la Gola del Todra al ritorno. Il trekking di 7 giorni dalle gole al deserto continua fino a Fès. Entrambi sono disponibili come viaggi privati.",
  },
];

// ── FAQ Item component ────────────────────────────────────────────────────────
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
      <p className={`text-sm text-foreground/55 leading-relaxed pb-6 pr-8 print:!block ${open ? "" : "hidden"}`}>
        {answer}
      </p>
    </div>
  );
}

const PRICE_PER_PERSON = 450;

const ITINERARY = [
  {
    day: 1,
    title: "Marrakech → Ouarzazate",
    fromCity: "Marrakech",
    toCity: "Ouarzazate",
    travelTime: "3.5",
    activity: "mountain",
    description: "La strada verso sud attraversa l'Alto Atlante passando per il colle di Tizi n'Tichka — 2.260 metri, la strada asfaltata più alta del Marocco. Il paesaggio passa dalla foresta di cedri alla roccia nuda, fino alle prime palmerie del sud. Ouarzazate non è il deserto. È la soglia. La città esiste perché i francesi avevano bisogno di una guarnigione nel sud; le kasbah esistevano perché tutti, prima di loro, avevano bisogno di una fortezza. Qui trascorrerete la prima notte.",
    stops: ["Colle di Tizi n'Tichka (2.260m)", "Kasbah di Aït Benhaddou", "Pernottamento a Ouarzazate"],
  },
  {
    day: 2,
    title: "Ouarzazate → Merzouga",
    fromCity: "Ouarzazate",
    toCity: "Merzouga",
    travelTime: "4",
    activity: "desert",
    description: "Il Draa è il fiume più lungo del Marocco e per gran parte dell'anno è a malapena un fiume. Ciò che lascia dietro di sé è una valle di palme da dattero, ksour in mattoni crudi e villaggi che esistono da quando le carovane attraversavano questa zona provenienti dall'Africa subsahariana. La strada della valle segue il fiume verso sud passando per Agdz e Tamnougalt — un villaggio fortificato sulle cui mura si può camminare — prima che il paesaggio si apra sulla hammada pre-sahariana. Merzouga si trova alla fine della strada.",
    stops: ["Palmeria di Agdz", "Villaggio fortificato di Tamnougalt", "Strada della Valle del Draa", "Arrivo a Merzouga e passeggiata tra le dune"],
  },
  {
    day: 3,
    title: "Erg Chebbi → Marrakech",
    fromCity: "Merzouga",
    toCity: "Marrakech",
    travelTime: "9",
    activity: "camel",
    description: "Erg Chebbi non è il Sahara da cartolina turistica — è uno dei due principali erg del Marocco, un mare di dune che raggiunge i 150 metri al suo culmine. Le dune sono vere. Il silenzio è vero. Si parte prima dell'alba per cogliere la luce sulla sabbia, poi inizia il ritorno. La strada verso nord ripassa per Ouarzazate e attraversa di nuovo l'Atlante. Si arriva a Marrakech in serata.",
    stops: ["Alba a Erg Chebbi", "Giro in cammello opzionale all'alba", "Ritorno via Ouarzazate e Atlante"],
  },
];

const INCLUDED = [
  "Autista privato per tutto il viaggio — nessun minibus condiviso",
  "2 notti di alloggio (Ouarzazate + campo nel deserto a Merzouga)",
  "Tutti i trasferimenti e il carburante",
  "Autista anglofono esperto del percorso",
];

const NOT_INCLUDED = [
  "Pasti (consumati nei ristoranti locali lungo il percorso — vi consigliamo posti specifici)",
  "Ingressi a Aït Benhaddou e Tamnougalt",
  "Giro in cammello a Merzouga (opzionale, organizzato all'arrivo)",
  "Voli internazionali",
];

// Map data for ItineraryMap
const mapItinerary = [
  { dayNumber: 1, cityName: "Marrakech", fromCity: "Marrakech", toCity: "Ouarzazate", description: "Attraversa l'Alto Atlante via Tizi n'Tichka" },
  { dayNumber: 2, cityName: "Ouarzazate", fromCity: "Ouarzazate", toCity: "Merzouga", description: "Attraverso la Valle del Draa fino a Erg Chebbi" },
  { dayNumber: 3, cityName: "Merzouga", fromCity: "Merzouga", toCity: "Marrakech", description: "Alba sulle dune, ritorno attraverso l'Atlante" },
];

const getActivityIcon = (activity: string) => {
  if (activity === "camel") return <IconCamel size={20} />;
  if (activity === "desert") return <IconDesert size={20} />;
  if (activity === "mountain") return <IconMountains size={20} />;
  return <IconDesert size={20} />;
};

const getActivityLabel = (activity: string) => {
  if (activity === "camel") return "giro in cammello, deserto";
  if (activity === "desert") return "valle del draa, dune";
  if (activity === "mountain") return "alto atlante, kasbah";
  return activity;
};

export default function SaharaLandingContentIT() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [participants, setParticipants] = useState(2);

  const totalEUR = participants * PRICE_PER_PERSON;
  const handlingFee = Math.round(totalEUR * 2.5) / 100;
  const grandTotal = totalEUR + handlingFee;

  const pricingEUR = {
    transfers: { label: `Viaggio privato (€${PRICE_PER_PERSON} × ${participants} persone)`, amount: totalEUR },
    room: { label: "2 notti di alloggio incluse", amount: 0 },
    camel: { label: "Autista e carburante inclusi", amount: 0 },
    coordination: { label: "Servizio concierge", amount: handlingFee },
  };

  return (
    <div className="bg-background min-h-screen">
      <style jsx global>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; color: black !important; font-size: 12px; }
          section { page-break-inside: avoid; padding-top: 24px !important; padding-bottom: 24px !important; }
          .space-y-20 > div { page-break-inside: avoid; margin-bottom: 32px !important; }
          p, li { orphans: 3; widows: 3; }
          a[href]:after { content: none !important; }
          h1, h2 { page-break-after: avoid; }
        }
      `}</style>

      {/* ── Hero — full viewport, matching journeys ────────────────────── */}
      <section className="relative h-[100svh] min-h-[600px] bg-[#c4a882] print:hidden">
        <img
          src="https://res.cloudinary.com/do2ojyohc/image/upload/v1774039524/Camel_caravan_crossing_Saharan_dunes_wngjzj.png"
          alt="Carovana di cammelli che attraversa le dune del Sahara"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 lg:px-16 pb-14 md:pb-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-4">
            Viaggio Privato · 3 Giorni
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-5xl">
            Tour del Deserto del Sahara da Marrakech
          </h1>
        </div>
      </section>

      {/* ── Blurb — below hero, matching journeys ─────────────────────── */}
      <section className="border-b border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-10 md:py-14">
          <p className="font-serif text-foreground/60 text-lg md:text-xl leading-relaxed">
            Il Sahara non è a quaranta minuti da Marrakech. Sono nove ore. Chi vi dice il contrario vi sta vendendo l'altopiano di Agafay, un deserto roccioso fuori città — va bene per una notte, ma non è il Sahara. Questo è un tour privato — il vostro veicolo, il vostro autista, il vostro ritmo. Tre giorni attraverso l'Atlante, le kasbah, la Valle del Draa, fino alle dune di Erg Chebbi.
          </p>
        </div>
      </section>

      {/* ── Meta bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-foreground/10 print:hidden">
        <div className="max-w-3xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.12em] uppercase text-foreground/35">
            <Link href="/journeys" className="hover:text-foreground/60 transition-colors">Viaggi</Link>
            <span>3 Giorni</span>
            <span>Da Marrakech</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5">
                <rect x="2" y="5" width="12" height="8" rx="1"/>
                <polyline points="4,5 4,1 12,1 12,5"/>
                <line x1="4" y1="10" x2="12" y2="10"/>
              </svg>
              Scarica PDF
            </button>
            <ShareTools
              title="Tour del Deserto del Sahara da Marrakech"
              description="Viaggio privato di 3 giorni nel deserto da Marrakech attraverso Ouarzazate, la Valle del Draa, fino alle dune di Erg Chebbi a Merzouga."
              imageUrl="https://res.cloudinary.com/do2ojyohc/image/upload/v1774039524/Camel_caravan_crossing_Saharan_dunes_wngjzj.png"
            />
          </div>
        </div>
      </div>

      {/* ── Itinerary — map + day-by-day, matching journeys ───────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">

          {/* Route map */}
          <div className="mb-16 print:hidden">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Il Vostro Percorso
            </p>
            <ItineraryMap itinerary={mapItinerary} />
          </div>

          {/* Day-by-day */}
          <div className="space-y-20">
            {ITINERARY.map((day) => (
              <div key={day.day}>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Giorno {day.day}
                </p>

                <h2 className="font-serif text-2xl md:text-3xl mb-4">
                  {day.title}
                </h2>

                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-sm text-muted-foreground">
                  {day.travelTime && (
                    <div className="flex items-center gap-2">
                      <IconClock size={20} />
                      <span>{day.travelTime}h di viaggio</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {getActivityIcon(day.activity)}
                    <span>{getActivityLabel(day.activity)}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {day.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {day.stops.map((stop, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-[0.08em] uppercase px-3 py-1 bg-foreground/[0.04] text-foreground/40"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ───────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Incluso
              </p>
              <ul className="space-y-3">
                {INCLUDED.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                    <span className="text-foreground/25 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Non incluso
              </p>
              <ul className="space-y-3">
                {NOT_INCLUDED.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/50 leading-relaxed">
                    <span className="text-foreground/20 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing & booking ─────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Prezzo
            </p>

            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-5xl text-foreground">€{PRICE_PER_PERSON}</span>
                <span className="text-sm text-foreground/40">a persona</span>
              </div>
              <p className="text-sm text-foreground/40">
                Minimo 2 partecipanti
              </p>
            </div>

            <div className="border border-foreground/[0.08] p-6 mb-8">
              <div className="flex justify-between text-sm text-foreground/50 mb-3">
                <span>€{PRICE_PER_PERSON} × {participants} persone</span>
                <span>€{totalEUR}</span>
              </div>
              <div className="flex justify-between text-sm text-foreground/40 mb-4 pb-4 border-b border-foreground/[0.06]">
                <span>Servizio concierge</span>
                <span>€{handlingFee}</span>
              </div>
              <div className="flex justify-between text-foreground font-medium">
                <span>Totale</span>
                <span>€{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-4 bg-foreground text-background text-sm tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors mb-4 print:hidden"
            >
              Prenota questo viaggio
            </button>
            <p className="text-xs text-foreground/30 text-center leading-relaxed">
              Pagamento completo tramite PayPal. Cancellazione gratuita fino a 30 giorni prima della partenza.
            </p>
          </div>
        </div>
      </section>

      {/* ── Context — what you'll understand ──────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Cosa capirete davvero
          </p>
          <p className="font-serif text-xl text-foreground leading-relaxed mb-6">
            La maggior parte dei tour nel deserto tratta il percorso come pura logistica — la kasbah è una tappa fotografica, la valle è uno sfondo, le dune sono il prodotto.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Aït Benhaddou non è un set cinematografico. È un ksar funzionante — un villaggio fortificato — la cui logica costruttiva è la stessa di ogni insediamento difensivo costruito nel sud da mille anni a questa parte. Le mura di terra sono spesse perché isolano. Le torri sono alte perché bisogna vedere chi arriva attraverso la hammada. La struttura è rivolta verso l'interno perché la sicurezza è collettiva.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Le palmerie della Valle del Draa esistono grazie alle khettara — canali di irrigazione sotterranei costruiti a mano secoli fa, che portano l'acqua dall'Atlante fino ai margini del deserto. I villaggi che attraverserete non sono rovine. Sono abitati. La raccolta dei datteri avviene a ottobre.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Merzouga all'alba, quando la luce è piatta e la linea d'ombra si muove sulle dune, è una delle poche esperienze davvero disorientanti che un viaggiatore possa vivere. La scala è sbagliata nello stesso modo in cui lo è l'oceano — l'occhio non ha punti di riferimento.
          </p>
          <div className="flex gap-6">
            <Link
              href="/stories/not-all-desert-is-sand"
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5"
            >
              Leggi: Non tutto il deserto è sabbia
            </Link>
            <Link
              href="/stories/the-ksour"
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5"
            >
              Leggi: I Ksour
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12">
            Da chi lo ha già vissuto
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-foreground/[0.06]">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-background p-8">
                <p className="text-sm text-foreground/70 leading-relaxed mb-6 font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs font-medium text-foreground">{t.author}</p>
                  {t.journey && (
                    <p className="text-[10px] tracking-wide text-foreground/30 mt-0.5">{t.journey}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-12">
            Domande frequenti
          </p>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Start Here CTA ────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10 print:hidden">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Non siete sicuri che sia il viaggio giusto?
          </p>
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Iniziate con il vostro orientamento.
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Cinque domande. Un quadro su misura per il vostro viaggio — quali città, in che ordine, cosa capirete davvero una volta arrivati.
          </p>
          <Link
            href="https://tally.so/r/aQG8W9"
            className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Ricevi il mio orientamento
          </Link>
        </div>
      </section>

      {/* ── Other journeys ────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10 print:hidden">
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-sm text-foreground/40">
              Volete più tempo nel sud? La versione di 4 giorni include la Valle del Dades e la Gola del Todra.
            </p>
            <Link
              href="/journeys/4-Day-Sahara-&-Valleys-Journey"
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors whitespace-nowrap"
            >
              Vedi il viaggio di 4 giorni
            </Link>
          </div>
        </div>
      </section>

      {/* ── Booking modal ─────────────────────────────────────────────── */}
      <OvernightBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        experienceTitle={`Tour del Deserto del Sahara di 3 Giorni (${participants} persone)`}
        pricingEUR={pricingEUR}
        totalEUR={totalEUR}
      />

    </div>
  );
}
