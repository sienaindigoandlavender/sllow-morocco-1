import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Slow Morocco",
  description:
    "How Slow Morocco collects, uses, and protects your personal information when booking private journeys and using our cultural platform.",
  alternates: {
    canonical: "https://www.slowmorocco.com/privacy",
  },
};

export default function PrivacyPage() {
  return <LegalPageContent pageId="privacy" fallbackTitle="Privacy Policy" />;
}
