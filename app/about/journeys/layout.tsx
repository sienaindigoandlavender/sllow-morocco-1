import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Journeys",
  description:
    "The people who arrange Slow Morocco's private journeys.",
  alternates: {
    canonical: "https://www.slowmorocco.com/about/journeys",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AboutJourneysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
