import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Conditions",
  description:
    "The terms of your reservation at Riad di Siena — cancellation, payment, city tax, belongings, damage, and the events beyond our control.",
  alternates: {
    canonical: "https://www.riaddisiena.com/booking-conditions",
  },
};

export default function BookingConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#2a2520]">
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#2a2520]/40 mb-6">
            Policies
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2a2520] mb-8">
            Booking Conditions
          </h1>
          <p className="text-lg md:text-xl text-[#2a2520]/70 leading-relaxed">
            These conditions form the agreement between you and Riad di Siena.
            By confirming a reservation, you accept the terms below. They exist
            to keep your stay calm and clear, with nothing left to surprise.
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="border-t border-[#2a2520]/10 pt-12 space-y-14">

            {/* 01 Cancellation */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">01</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Cancellation
                </h2>
              </div>
              <ul className="space-y-4 text-[#2a2520]/70 leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-[#2a2520]/30 min-w-[9rem] shrink-0">
                    14+ days before
                  </span>
                  <span>Full refund.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#2a2520]/30 min-w-[9rem] shrink-0">
                    7–13 days before
                  </span>
                  <span>50% refund.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#2a2520]/30 min-w-[9rem] shrink-0">
                    Less than 7 days
                  </span>
                  <span>No refund.</span>
                </li>
              </ul>
            </div>

            {/* 02 Payment */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">02</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">Payment</h2>
              </div>
              <ul className="space-y-4 text-[#2a2520]/70 leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-[#2a2520]/30 min-w-[9rem] shrink-0">
                    Deposit
                  </span>
                  <span>
                    A 100% deposit is required to confirm your booking.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#2a2520]/30 min-w-[9rem] shrink-0">
                    Methods
                  </span>
                  <span>Bank transfer or PayPal.</span>
                </li>
              </ul>
            </div>

            {/* 03 City Tax */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">03</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">City Tax</h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                A city tax of €2.50 per person, per night is collected on
                arrival, as required by local regulation. It may be paid in
                dirhams, euros, or US dollars. This tax is set by the city and
                is separate from your room rate.
              </p>
            </div>

            {/* 04 Your Belongings */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">04</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Your Belongings
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                Riad di Siena is not responsible for personal belongings that
                are lost, forgotten, or stolen, whether in your room or in
                luggage storage. We ask that you keep cash, passports, and
                valuables on your person at all times, and that you lock your
                luggage whenever you leave it. Luggage storage is offered as a
                complimentary courtesy, not a custody service. Once you have
                retrieved your luggage and left the premises, our responsibility
                ends.
              </p>
              <p className="text-[#2a2520]/70 leading-relaxed mt-5">
                Riad di Siena is an open house of shared salons, courtyards, and
                dining areas. When you are enjoying these common spaces — over
                tea, or while waiting to settle in — please keep your bags and
                valuables with you. Items left unattended in shared areas remain
                your responsibility.
              </p>
            </div>

            {/* 05 Damage */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">05</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">Damage</h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                Our linens and towels are washed and cared for by hand. Please
                do not use them for henna, makeup, or shoe care — henna,
                cosmetics, and polish cause permanent stains that no washing can
                remove. Guests are responsible for the cost of replacing linens
                or fittings damaged beyond normal use. A little awareness keeps
                everything lovely, for you and for those who come after you.
              </p>
            </div>

            {/* 06 When Events Are Beyond Our Control */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">06</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  When Events Are Beyond Our Control
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                Certain events lie outside anyone&rsquo;s control — including but
                not limited to forces of nature such as floods, earthquakes, or
                extreme weather, as well as strikes, closures, civil or
                political disruptions, and interruptions to travel or utilities.
                Should such an event affect your stay, we will do all we
                reasonably can to keep you comfortable and safe, and to respond
                with care. As these circumstances are beyond our control, they
                cannot be treated as grounds for a refund, nor can our
                reasonable handling of them be considered a failure of service.
                We meet these moments with fairness on both sides.
              </p>
            </div>

            {/* 07 Concerns & Feedback */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">07</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Concerns &amp; Feedback
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                If anything regarding your room, your stay, or our service is not
                to your satisfaction, please tell us while you are here, so we
                can make it right in the moment. General feedback or
                administrative inquiries may be submitted in writing to{" "}
                <a
                  href="mailto:happy@riaddisiena.com"
                  className="underline hover:text-[#2a2520] transition-colors"
                >
                  happy@riaddisiena.com
                </a>{" "}
                within 7 days of departure.
              </p>
            </div>

            {/* 08 Belongings — Reporting */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">08</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Reporting a Missing Item
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                Anything regarding missing or damaged personal belongings must be
                reported to us on-site, before you leave the riad, so that we can
                look into it while it can still be verified and, if appropriate,
                involve the Marrakech Tourist Police (Brigade Touristique)
                together. Because the chain of custody is broken the moment
                luggage leaves the premises, we cannot investigate, accept
                liability for, or act on claims of missing items raised after you
                have checked out and departed.
              </p>
            </div>

            {/* 09 What You Confirm */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">09</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  What You Confirm
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                Before arrival, every guest receives our pre-arrival message and
                full house information. We ask that you read it — it prevents
                misunderstandings and ensures nothing is a surprise. By booking,
                you confirm you have read and accept our{" "}
                <Link
                  href="/house-rules"
                  className="underline hover:text-[#2a2520] transition-colors"
                >
                  House Rules
                </Link>{" "}
                and{" "}
                <Link
                  href="/disclaimer"
                  className="underline hover:text-[#2a2520] transition-colors"
                >
                  Disclaimer
                </Link>
                , which form part of these conditions.
              </p>
            </div>

            {/* 10 Governing Law */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">10</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Governing Law
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                These conditions are governed by the laws of the Kingdom of
                Morocco. In the event of a dispute, both parties will first seek
                an amicable resolution before referring the matter to the
                competent courts of Marrakech.
              </p>
            </div>

          </div>

          {/* Close */}
          <div className="border-t border-[#2a2520]/10 mt-16 pt-12">
            <p className="font-serif text-xl md:text-2xl text-[#2a2520]/80 italic leading-relaxed">
              We believe in clarity from the beginning. Read once, and arrive
              with nothing left to wonder.
            </p>
          </div>

          {/* Related pages */}
          <div className="border-t border-[#2a2520]/10 mt-16 pt-12">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <Link
                href="/disclaimer"
                className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors"
              >
                Before You Book
              </Link>
              <Link
                href="/house-rules"
                className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors"
              >
                House Rules
              </Link>
              <Link
                href="/faq"
                className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
