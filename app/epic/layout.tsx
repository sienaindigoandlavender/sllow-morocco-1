import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EPIC Journeys | Sacred & Rare",
  description: "Sacred ceremonies, rare access, and journeys assembled nowhere else. Closer to initiation than tour.",
  openGraph: {
    title: "EPIC Journeys | Slow Morocco",
    description: "Sacred ceremonies, rare access, and journeys most travellers never learn exist.",
    url: "https://www.slowmorocco.com/epic",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/epic",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EpicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
