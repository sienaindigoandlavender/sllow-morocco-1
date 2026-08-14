import { Metadata } from "next";
import LegalPageServer from "@/components/LegalPageServer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal disclaimer for Slow Morocco — limitations of liability, accuracy of travel information, and third-party service provider responsibilities.",
  alternates: {
    canonical: "https://www.slowmorocco.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return <LegalPageServer pageId="disclaimer" fallbackTitle="Disclaimer" />;
}
