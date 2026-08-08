import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms of use for Slow Morocco — content licensing, intellectual property, liability, and your rights as a reader.",
  alternates: {
    canonical: "https://www.slowmorocco.com/terms",
  },
};

export default function TermsPage() {
  return <LegalPageServer pageId="terms" fallbackTitle="Terms of Service" />;
}
