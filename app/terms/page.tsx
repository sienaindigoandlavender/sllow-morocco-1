import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Terms of Service | Slow Morocco",
  description:
    "Terms and conditions for booking private journeys with Slow Morocco — cancellations, liability, usage rights, and our obligations to you.",
  alternates: {
    canonical: "https://www.slowmorocco.com/terms",
  },
};

export default function TermsPage() {
  return <LegalPageContent pageId="terms" fallbackTitle="Terms of Service" />;
}
