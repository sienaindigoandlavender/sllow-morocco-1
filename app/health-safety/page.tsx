import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Health & Safety | Slow Morocco",
  description:
    "Health and safety guidance for travelling in Morocco — vaccinations, water, sun protection, medical facilities, and how Slow Morocco keeps you safe.",
  alternates: {
    canonical: "https://www.slowmorocco.com/health-safety",
  },
};

export default function HealthSafetyPage() {
  return (
    <LegalPageContent
      pageId="health-safety"
      fallbackTitle="Health & Safety"
    />
  );
}
