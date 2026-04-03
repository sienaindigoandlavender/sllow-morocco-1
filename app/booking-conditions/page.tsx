import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Booking Conditions | Slow Morocco",
  description:
    "How booking works with Slow Morocco — proposals, inclusions, travel insurance, journey changes, and your responsibilities.",
  alternates: {
    canonical: "https://www.slowmorocco.com/booking-conditions",
  },
};

export default function BookingConditionsPage() {
  return <LegalPageContent pageId="booking-conditions" fallbackTitle="Booking Conditions" />;
}
