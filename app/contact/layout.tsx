import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Begin a private journey, or ask us anything about Morocco. We reply within a day.",
  openGraph: {
    title: "Contact | Slow Morocco",
    description: "Begin a private journey, or ask us anything about Morocco.",
    url: "https://www.slowmorocco.com/contact",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
