import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Booking Conditions",
  description:
    "How booking works with Slow Morocco — proposals, inclusions, travel insurance, journey changes, and your responsibilities.",
  alternates: {
    canonical: "https://www.slowmorocco.com/booking-conditions",
  },
};

export default function BookingConditionsPage() {
  return <LegalPageServer pageId="booking-conditions" fallbackTitle="Booking Conditions" />;
}
