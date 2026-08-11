import type { Metadata } from "next";
import LilaDossierContent from "./LilaDossierContent";

// Private client curation dossier — not a public story.
// Kept out of the index deliberately. If you later gate it behind
// /proposal/[id], you can revisit the robots directive.

export const metadata: Metadata = {
  title: "A Private Lila — Slow Morocco",
  description:
    "A private, curated Gnawa Lila ceremony in the Marrakech region. Prepared for Dmitrii Bukata & guest(s).",
  robots: { index: false, follow: false },
};

export default function LilaDossierPage() {
  return <LilaDossierContent />;
}
