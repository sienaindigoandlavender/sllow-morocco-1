import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about traveling with Slow Morocco — booking timeline, what's included, private vs group tours, family travel, dietary needs, and more.",
  openGraph: {
    title: "FAQ | Slow Morocco",
    description: "Common questions about traveling with Slow Morocco — booking, inclusions, family travel, and more.",
    url: "https://www.slowmorocco.com/faq",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/faq",
  },
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking 3-6 months in advance, especially for travel during peak seasons (March-May, September-November). However, we can sometimes accommodate last-minute requests depending on availability.",
    },
    {
      question: "Are your journeys private or group tours?",
      answer:
        "All our journeys are completely private. We don't do group tours. Your journey is designed specifically for you and travels with you alone (or your chosen companions).",
    },
    {
      question: "What's included in the price?",
      answer:
        "Every journey is different. Your proposal specifies exactly what's included — typically private transport, accommodation, guides, and activities. Flights, travel insurance, and personal expenses are not included. Full details on our Booking Conditions page.",
    },
    {
      question: "Can I customize a journey?",
      answer:
        "Absolutely. Most of our journeys are fully customized. Our featured journeys serve as inspiration, but we'll design something unique based on your interests, pace, and preferences.",
    },
    {
      question: "Do I need a visa to visit Morocco?",
      answer:
        "Citizens of the US, Canada, UK, EU, and many other countries can visit Morocco visa-free for up to 90 days. Check our Visa Information page for details specific to your nationality.",
    },
    {
      question: "Is Morocco safe for travelers?",
      answer:
        "Yes, Morocco is generally very safe for travelers. We work with experienced guides who know the country well and prioritize your safety and comfort throughout your journey. For practical questions about navigating the medina, taxis, and local customs, see our companion site Derb — a city guide for Morocco's urban realities.",
    },
    {
      question: "What's your cancellation policy?",
      answer:
        "We offer flexible cancellation terms — full refund minus €100 if you cancel more than 60 days out, with a sliding scale closer to departure. Full details on our Cancellations & Refunds page.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes. A 30% deposit secures your booking, with the balance due 30 days before departure. Full details on our Payments page.",
    },
  ];

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Immersive Hero Banner */}
      <PageBanner
        slug="faq"
        fallback={{
          title: "Frequently Asked Questions",
          subtitle: "Quick answers to common questions about traveling with us.",
          label: "Support",
        }}
      />

      {/* Trust Links */}
      <section className="py-12 md:py-16 border-b border-foreground/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/booking-conditions"
              className="group block border border-foreground/10 p-6 hover:border-foreground/30 transition-colors"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-foreground/40 mb-2">01</p>
              <h3 className="font-serif text-lg text-white/90 group-hover:text-white transition-colors">Booking Conditions</h3>
              <p className="text-foreground/40 text-sm mt-2">How it works, what's included, your responsibilities.</p>
            </a>
            <a
              href="/payments"
              className="group block border border-foreground/10 p-6 hover:border-foreground/30 transition-colors"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-foreground/40 mb-2">02</p>
              <h3 className="font-serif text-lg text-white/90 group-hover:text-white transition-colors">Payments</h3>
              <p className="text-foreground/40 text-sm mt-2">Deposit, balance, methods, and currency.</p>
            </a>
            <a
              href="/cancellations-and-refunds"
              className="group block border border-foreground/10 p-6 hover:border-foreground/30 transition-colors"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-foreground/40 mb-2">03</p>
              <h3 className="font-serif text-lg text-white/90 group-hover:text-white transition-colors">Cancellations & Refunds</h3>
              <p className="text-foreground/40 text-sm mt-2">Clear terms, no surprises.</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-foreground/10 pb-8">
                <h3 className="font-serif text-xl text-white/90 mb-3">{faq.question}</h3>
                <p className="text-foreground/50 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center border border-foreground/10 p-8 md:p-12">
            <h2 className="font-serif text-2xl text-white/90 mb-4">
              Don't See Your Question?
            </h2>
            <p className="text-foreground/50 mb-8">
              We're happy to answer any questions you have. For everyday questions about Morocco — taxis, tipping, what to wear, Ramadan, safety — visit <a href="https://derb.so" className="underline hover:text-white/80 transition-colors">Derb</a>, our city guide.
            </p>
            <a 
              href="/contact" 
              className="inline-block border border-foreground/20 px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
