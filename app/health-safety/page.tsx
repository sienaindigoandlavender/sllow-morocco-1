import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Health & Safety",
  description:
    "Health and safety guidance for travelling in Morocco — vaccinations, water, sun protection, medical facilities, and how Slow Morocco keeps you safe.",
  alternates: {
    canonical: "https://www.slowmorocco.com/health-safety",
  },
};

export default function HealthSafetyPage() {
  return (
    <LegalPageServer
      pageId="health-safety"
      fallbackTitle="Health & Safety"
    />
  );
}
