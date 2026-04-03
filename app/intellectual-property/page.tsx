import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Intellectual Property | Slow Morocco",
  description:
    "Intellectual property policy for Slow Morocco — copyright, content licensing, photography usage, and attribution requirements for our cultural research.",
  alternates: {
    canonical: "https://www.slowmorocco.com/intellectual-property",
  },
};

export default function IntellectualPropertyPage() {
  return (
    <LegalPageContent
      pageId="intellectual-property"
      fallbackTitle="Intellectual Property"
    />
  );
}
