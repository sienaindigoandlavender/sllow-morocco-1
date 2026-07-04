import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Payments",
  description:
    "Payment details for Slow Morocco journeys — deposit, balance, accepted methods, and currency.",
  alternates: {
    canonical: "https://www.slowmorocco.com/payments",
  },
};

export default function PaymentsPage() {
  return <LegalPageServer pageId="payments" fallbackTitle="Payments" />;
}
