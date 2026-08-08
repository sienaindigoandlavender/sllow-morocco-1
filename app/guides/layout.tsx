import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Guides",
  description: "Meet the guides behind Slow Morocco journeys. Local experts who tell you the stories, not only the sights.",
  openGraph: {
    title: "Our Guides | Slow Morocco",
    description: "Local experts who share Morocco's stories, not just its sights.",
  },

  alternates: {
    canonical: "https://www.slowmorocco.com/guides",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
