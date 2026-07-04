import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Travel Insurance",
  description:
    "Why travel insurance is required for Slow Morocco journeys — recommended coverage, medical evacuation, trip cancellation, and what to look for in a policy.",
  alternates: {
    canonical: "https://www.slowmorocco.com/travel-insurance",
  },
};

export default function TravelInsurancePage() {
  return (
    <LegalPageServer
      pageId="travel-insurance"
      fallbackTitle="Travel Insurance"
    />
  );
}
