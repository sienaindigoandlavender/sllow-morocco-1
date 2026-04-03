import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Payments | Slow Morocco",
  description:
    "Payment details for Slow Morocco journeys — deposit, balance, accepted methods, and currency.",
  alternates: {
    canonical: "https://www.slowmorocco.com/payments",
  },
};

export default function PaymentsPage() {
  return <LegalPageContent pageId="payments" fallbackTitle="Payments" />;
}
