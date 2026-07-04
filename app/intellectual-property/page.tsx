import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Intellectual Property",
  description:
    "Intellectual property policy for Slow Morocco — copyright, content licensing, photography usage, and attribution requirements for our cultural research.",
  alternates: {
    canonical: "https://www.slowmorocco.com/intellectual-property",
  },
};

export default function IntellectualPropertyPage() {
  return (
    <LegalPageServer
      pageId="intellectual-property"
      fallbackTitle="Intellectual Property"
    />
  );
}
