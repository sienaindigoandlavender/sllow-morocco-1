import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Cancellations & Refunds | Slow Morocco",
  description:
    "Cancellation policy and refund schedule for Slow Morocco journeys — clear terms, no surprises.",
  alternates: {
    canonical: "https://www.slowmorocco.com/cancellations-and-refunds",
  },
};

export default function CancellationsPage() {
  return <LegalPageContent pageId="cancellations-and-refunds" fallbackTitle="Cancellations & Refunds" />;
}
