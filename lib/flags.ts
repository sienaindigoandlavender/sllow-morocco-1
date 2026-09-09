// lib/flags.ts
//
// Site-wide feature flags. Two, deliberately separate.
//
// ── TRIP_FUNNEL_PUBLIC ──────────────────────────────────────────
// The front door. Homepage journey sections, the footer links, the
// nav entry, the plan-your-trip CTAs on hub pages.
//
// When false: Slow Morocco reads as a publication. Nothing on the
// homepage, in the nav or in the footer points at trips.
// /plan-your-trip still exists and works, reachable by a direct link
// handed out directly, with the deposit gate as the sole entrance.
//
// Currently TRUE. Reader subscriptions are unproven in this category,
// so the journeys remain the revenue line and are promoted openly.
// Flipping this to false closes the front door in one move and leaves
// the crosslinks below untouched.
//
// ── JOURNEY_CROSSLINKS ──────────────────────────────────────────
// The onward path from editorial. The related-journeys block at the
// foot of a story or place page, and the journeyBridge line inside
// the body.
//
// This is a different job from the front door. A reader who has just
// finished a story about Aït Benhaddou and wants to know how to get
// there is not the same as a visitor landing on the homepage. The
// Odyssey page alone carries tens of thousands of impressions; with
// this off it offers them nowhere to go.
//
// Keep this true while the front door is closed. That is the whole
// point of splitting them.

export const TRIP_FUNNEL_PUBLIC = true;
export const JOURNEY_CROSSLINKS = true;
