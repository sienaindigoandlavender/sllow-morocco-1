import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Morocco",
  description: "A personalised Morocco orientation — the geographic logic, the cities that matter, the one thing to build your journey around.",
  alternates: {
    canonical: "https://www.slowmorocco.com/your-morocco",
  },
};

export default function YourMoroccoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
