import { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Visa Information | Slow Morocco",
  description:
    "Morocco visa and entry requirements — visa-free access for US, UK, EU, and Canadian citizens, passport validity rules, and border procedures.",
  alternates: {
    canonical: "https://www.slowmorocco.com/visa-info",
  },
};

export default function VisaInfoPage() {
  return (
    <LegalPageContent
      pageId="visa-info"
      fallbackTitle="Visa Information"
    />
  );
}
