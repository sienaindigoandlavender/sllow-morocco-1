"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import NewsletterBanner from "./NewsletterBanner";

// Routes that should NOT have the main header/footer
const LANDING_PAGE_ROUTES = ["/go"];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLandingPage = LANDING_PAGE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <NewsletterBanner />
      <Footer />
    </>
  );
}
