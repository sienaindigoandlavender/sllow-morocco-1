import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Travel Insurance | Slow Morocco",
  description:
    "Why travel insurance is required for Slow Morocco journeys — recommended coverage, medical evacuation, trip cancellation, and what to look for in a policy.",
  alternates: {
    canonical: "https://www.slowmorocco.com/travel-insurance",
  },
};

export default function TravelInsurancePage() {
  return (
    <LegalPageContent
      pageId="travel-insurance"
      fallbackTitle="Travel Insurance"
    />
  );
}
