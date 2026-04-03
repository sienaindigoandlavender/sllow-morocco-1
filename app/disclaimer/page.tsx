import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Disclaimer | Slow Morocco",
  description:
    "Legal disclaimer for Slow Morocco — limitations of liability, accuracy of travel information, and third-party service provider responsibilities.",
  alternates: {
    canonical: "https://www.slowmorocco.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return <LegalPageContent pageId="disclaimer" fallbackTitle="Disclaimer" />;
}
