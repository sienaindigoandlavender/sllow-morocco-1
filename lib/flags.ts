// lib/flags.ts
//
// Site-wide feature flags.
//
// TRIP_FUNNEL_PUBLIC controls whether the passive entry points to the
// plan-your-trip flow appear on the public site — the footer link, the
// end-of-story "Tell us about your trip" bridge, and the related-journeys
// panel on story pages.
//
// When false: none of those appear. The /plan-your-trip page still exists
// and works, reachable only by a direct link that you hand out yourself,
// with the €200 deposit gate as the sole front door. Slow Morocco reads
// as a publication; trips become a back room you open when you choose.
//
// When true: the entry points return exactly as before. Nothing was
// deleted — flip this back to re-open the room.

export const TRIP_FUNNEL_PUBLIC = false;
