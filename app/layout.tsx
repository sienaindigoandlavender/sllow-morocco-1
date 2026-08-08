import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import StructuredData from "@/components/StructuredData";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.slowmorocco.com"),
  title: {
    default: "Slow Morocco — Morocco's Culture, History and Food, Decoded",
    template: "%s | Slow Morocco",
  },
  description: "A publication about Morocco's culture, history, food, craft and language — the layers most visitors pass straight through. Written by people who live here.",
  keywords: ["moroccan culture", "moroccan history", "moroccan food", "moroccan architecture", "moroccan craft", "amazigh culture", "morocco travel guide", "marrakech guide"],
  authors: [{ name: "Slow Morocco" }],
  creator: "Slow Morocco",
  publisher: "Slow Morocco",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.slowmorocco.com",
    siteName: "Slow Morocco",
    title: "Slow Morocco — Morocco's Culture, History and Food, Decoded",
    description: "A publication about Morocco — its culture, history, food and craft. The layers most visitors pass straight through.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Slow Morocco — a publication about Moroccan culture, history and food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slow Morocco — Morocco's Culture, History and Food, Decoded",
    description: "A publication about Morocco — its culture, history, food and craft. The layers most visitors pass straight through.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CSBQECNF60"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CSBQECNF60');
          `}
        </Script>
        <link rel="alternate" type="text/plain" title="AI-readable content index" href="/llms.txt" />
      </head>
      <body>
        <StructuredData />
        <OrganizationSchema />
        <WebSiteSchema />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
