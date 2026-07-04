import type { Metadata } from "next";
import { cookies } from "next/headers";
import SaharaLandingContentIT from "./SaharaLandingContentIT";
import PageLock from "./PageLock";

// Private Italian itinerary — gated behind an access code and hidden
// from search. Code lives in /api/page-unlock (env: PAGE_CODE_SAHARA_IT).
// Checked server-side on every request; a forwarded URL without the
// code shows only the lock screen.

export const metadata: Metadata = {
  title: "Tour del Deserto del Sahara di 3 Giorni da Marrakech",
  robots: { index: false, follow: false },
};

const PAGE_KEY = "sahara-it";
const EXPECTED = process.env.PAGE_CODE_SAHARA_IT || "DUNE450";

export default async function SaharaLandingPageIT() {
  const cookieStore = await cookies();
  const granted = cookieStore.get(`page_access_${PAGE_KEY}`)?.value;

  if (granted !== EXPECTED) {
    return <PageLock pageKey={PAGE_KEY} />;
  }

  return <SaharaLandingContentIT />;
}
