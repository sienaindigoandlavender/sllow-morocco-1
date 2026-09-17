import type { Metadata } from "next";
import MoroccoTimeline from "./MoroccoTimeline";

export const metadata: Metadata = {
  title: "Morocco, on one line — 315,000 years",
  description:
    "The oldest Homo sapiens ever found is Moroccan. From Jbel Irhoud to the 2030 World Cup — three hundred thousand years on a single scrolling line.",
};

export default function TimelinePage() {
  return <MoroccoTimeline />;
}
