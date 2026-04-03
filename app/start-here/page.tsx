import type { Metadata } from "next";
import StartHereContent from "./StartHereContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Start Here — Your Morocco Orientation | Slow Morocco",
  description: "Five questions to shape your Morocco trip. Tell us what matters — how long, what pace, what draws you — and we'll build a framework around it.",
  alternates: { canonical: `${BASE_URL}/start-here` },
  openGraph: {
    title: "Start Here — Your Morocco Orientation",
    description: "Five questions. A framework specific to your trip.",
    url: `${BASE_URL}/start-here`,
    siteName: "Slow Morocco",
  },
};

export default function StartHerePage() {
  return <StartHereContent />;
}
