import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Slow Morocco collects, uses, and protects your personal information when booking private journeys and using our cultural platform.",
  alternates: {
    canonical: "https://www.slowmorocco.com/privacy",
  },
};

export default function PrivacyPage() {
  return <LegalPageServer pageId="privacy" fallbackTitle="Privacy Policy" />;
}
