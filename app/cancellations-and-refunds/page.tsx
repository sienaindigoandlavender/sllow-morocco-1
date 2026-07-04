import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Cancellations & Refunds",
  description:
    "Cancellation policy and refund schedule for Slow Morocco journeys — clear terms, no surprises.",
  alternates: {
    canonical: "https://www.slowmorocco.com/cancellations-and-refunds",
  },
};

export default function CancellationsPage() {
  return <LegalPageServer pageId="cancellations-and-refunds" fallbackTitle="Cancellations & Refunds" />;
}
