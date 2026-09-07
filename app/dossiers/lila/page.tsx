import type { Metadata } from "next";
import LilaDossierContent from "./LilaDossierContent";

/* Private client dossier. Gated in middleware.ts behind the admin
   session cookie: anyone without it is redirected to /admin/login.

   It was open at this URL, and at /dossiers, until September 2026.
   Both copies named the client and carried the price and the terms.

   To send it: open it yourself while logged in, print to PDF, send
   the PDF. The URL is not for clients. */

export const metadata: Metadata = {
  title: "Dossier",
  robots: { index: false, follow: false },
};

export default function LilaDossierPage() {
  return <LilaDossierContent />;
}
