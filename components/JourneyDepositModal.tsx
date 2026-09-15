"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

// ── PayPal button (matches the OvernightBookingModal pattern) ──────────────
function PayPalButton({
  amount,
  description,
  onSuccess,
  onError,
}: {
  amount: string;
  description: string;
  onSuccess: (transactionId: string) => void;
  onError: (msg: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsInstance = useRef<any>(null);
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    const loadSdk = () => {
      if (!window.paypal) {
        const existing = document.querySelector('script[src*="paypal.com/sdk"]');
        if (!existing) {
          const script = document.createElement("script");
          script.src =
            "https://www.paypal.com/sdk/js?client-id=AWVf28iPmlVmaEyibiwkOtdXAl5UPqL9i8ee9yStaG6qb7hCwNRB2G95SYwbcikLnBox6CGyO-boyAvu&currency=EUR";
          script.async = true;
          script.onload = () => renderButtons();
          document.body.appendChild(script);
        } else {
          existing.addEventListener("load", () => renderButtons());
        }
      } else {
        renderButtons();
      }
    };

    const renderButtons = () => {
      if (!isMounted.current || !containerRef.current || !window.paypal) return;
      try {
        const paypalInstance = window.paypal as any;
        if (!paypalInstance?.Buttons) return;
        buttonsInstance.current = paypalInstance.Buttons({
          style: { layout: "vertical", color: "black", shape: "rect", label: "pay" },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: description.substring(0, 127),
                  amount: { value: amount, currency_code: "EUR" },
                },
              ],
            });
          },
          onApprove: async (_data: any, actions: any) => {
            try {
              const order = await actions.order.capture();
              const txId =
                order.purchase_units?.[0]?.payments?.captures?.[0]?.id || order.id;
              onSuccess(txId);
            } catch (e) {
              onError("Payment could not be completed. Please try again.");
            }
          },
          onError: () => onError("Something went wrong with PayPal. Please try again."),
        });
        buttonsInstance.current.render(containerRef.current).then(() => {
          if (isMounted.current) setLoading(false);
        });
      } catch (err) {
        console.error("PayPal render error:", err);
      }
    };

    loadSdk();
    return () => {
      isMounted.current = false;
      try {
        buttonsInstance.current?.close?.();
      } catch {}
    };
  }, [amount, description, onSuccess, onError]);

  return (
    <div>
      {loading && (
        <p className="text-center text-sm text-foreground/60 py-4">Loading secure payment…</p>
      )}
      <div ref={containerRef} />
    </div>
  );
}

// ── The Journey Deposit Modal ──────────────────────────────────────────────
export default function JourneyDepositModal({
  open,
  onClose,
  journeySlug,
  journeyTitle,
}: {
  open: boolean;
  onClose: () => void;
  journeySlug: string;
  journeyTitle: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = form, 2 = pay, 3 = done
  const [error, setError] = useState("");
  const [txId, setTxId] = useState("");

  const AMOUNT = "300.00";

  // lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const canProceed =
    firstName.trim() && lastName.trim() && /\S+@\S+\.\S+/.test(email) && country.trim();

  const handleContinue = () => {
    setError("");
    if (!canProceed) {
      setError("Please complete all fields with a valid email.");
      return;
    }
    setStep(2);
  };

  const handleSuccess = useCallback(
    async (transactionId: string) => {
      setTxId(transactionId);
      // record the deposit (best-effort; do not block the success screen)
      try {
        await fetch("/api/journey-deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            country,
            journeySlug,
            journeyTitle,
            amount: AMOUNT,
            transactionId,
          }),
        });
      } catch {}
      setStep(3);
    },
    [firstName, lastName, email, country, journeySlug, journeyTitle]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* panel */}
      <div className="relative z-10 w-full max-w-md bg-background border border-foreground/10 shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/50 hover:text-foreground text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8 md:p-10">
          {/* Step 1 — the form */}
          {step === 1 && (
            <>
              <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/60 mb-3">
                {journeyTitle}
              </p>
              <h2 className="font-serif text-2xl mb-2">Begin this journey</h2>
              <p className="text-foreground/70 text-[15px] leading-relaxed mb-6">
                A €300 deposit opens the full itinerary and begins the work. It is
                credited in full to your journey.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-foreground/20 px-3 py-2.5 text-[15px] bg-transparent focus:border-foreground/50 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-foreground/20 px-3 py-2.5 text-[15px] bg-transparent focus:border-foreground/50 outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-foreground/20 px-3 py-2.5 text-[15px] bg-transparent focus:border-foreground/50 outline-none"
                />
                <input
                  type="text"
                  placeholder="Country of origin"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-foreground/20 px-3 py-2.5 text-[15px] bg-transparent focus:border-foreground/50 outline-none"
                />
              </div>

              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

              <button
                onClick={handleContinue}
                className="w-full mt-6 px-6 py-3 bg-foreground text-background text-[13px] tracking-[0.12em] uppercase hover:opacity-90 transition-opacity"
              >
                Continue to deposit — €300
              </button>
            </>
          )}

          {/* Step 2 — payment */}
          {step === 2 && (
            <>
              <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/60 mb-3">
                {journeyTitle}
              </p>
              <h2 className="font-serif text-2xl mb-2">Your deposit</h2>
              <p className="text-foreground/70 text-[15px] leading-relaxed mb-6">
                €300, credited in full to your journey. Once received, we send the
                complete day-by-day and begin.
              </p>

              {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

              <PayPalButton
                amount={AMOUNT}
                description={`Journey deposit — ${journeyTitle}`}
                onSuccess={handleSuccess}
                onError={(m) => setError(m)}
              />

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 text-[12px] tracking-[0.1em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors"
              >
                ← Back
              </button>
            </>
          )}

          {/* Step 3 — done */}
          {step === 3 && (
            <div className="text-center py-4">
              <h2 className="font-serif text-2xl mb-3">Thank you, {firstName}.</h2>
              <p className="text-foreground/70 text-[15px] leading-relaxed mb-6">
                Your deposit is received. We will be in touch shortly with the full
                itinerary and the next steps to shape your journey.
              </p>
              {txId && (
                <p className="text-[11px] tracking-[0.1em] uppercase text-foreground/45 mb-6">
                  Reference · {txId}
                </p>
              )}
              <button
                onClick={onClose}
                className="px-8 py-3 border border-foreground/25 text-[13px] tracking-[0.12em] uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
