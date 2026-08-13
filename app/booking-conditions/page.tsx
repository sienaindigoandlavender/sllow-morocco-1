import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Conditions",
  description:
    "The terms of your reservation at Riad di Siena — cancellation, payment, liability, complaints, and governing law.",
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

            {/* 1. Cancellation */}
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

            {/* 2. Payment */}
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

            {/* 3. Your Belongings & Liability */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">03</span>
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
            </div>

            {/* 4. Complaints */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">04</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Concerns &amp; Complaints
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                If anything is not right during your stay, please tell us while
                you are here, so we can address it in the moment. Any complaint,
                including one regarding belongings, must be submitted in writing
                to{" "}
                <a
                  href="mailto:happy@riaddisiena.com"
                  className="underline hover:text-[#2a2520] transition-colors"
                >
                  happy@riaddisiena.com
                </a>{" "}
                within 7 days of your departure. This allows us to look into it
                properly and on record. We cannot investigate or act on claims
                raised after this window, once belongings have passed through
                onward travel.
              </p>
            </div>

            {/* 5. Acknowledgement / incorporation by reference */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">05</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  What You Confirm
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                By booking, you confirm that you have read and accept our{" "}
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

            {/* 6. Governing law */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-sm text-[#2a2520]/30">06</span>
                <h2 className="font-serif text-2xl text-[#2a2520]">
                  Governing Law
                </h2>
              </div>
              <p className="text-[#2a2520]/70 leading-relaxed">
                These conditions are governed by Moroccan law. In the event of a
                dispute, both parties will first seek an amicable resolution
                before referring the matter to the competent courts of
                Marrakech.
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
        </div>
      </section>
    </div>
  );
}
