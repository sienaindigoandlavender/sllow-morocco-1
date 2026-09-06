/* ═══════════════════════════════════════════════════════════════
   GEO — distance helpers for the places atlas

   Used by:
   - /places/[slug]        → nearby fallback when nearby_slugs is thin
   - /places/near/[slug]   → walking-distance list pages
   ═══════════════════════════════════════════════════════════════ */

export interface GeoPoint {
  slug: string;
  latitude: number | null;
  longitude: number | null;
}

/** Great-circle distance in kilometres. */
export function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const p = Math.PI / 180;
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function hasCoords<T extends GeoPoint>(
  p: T,
): p is T & { latitude: number; longitude: number } {
  return (
    p.latitude != null &&
    p.longitude != null &&
    Number.isFinite(Number(p.latitude)) &&
    Number.isFinite(Number(p.longitude))
  );
}

/**
 * Everything within `radiusKm` of `origin`, nearest first.
 * The origin itself is always excluded.
 */
export function within<T extends GeoPoint>(
  origin: GeoPoint,
  all: T[],
  radiusKm: number,
): Array<T & { distanceKm: number }> {
  if (!hasCoords(origin)) return [];
  const oLat = Number(origin.latitude);
  const oLon = Number(origin.longitude);

  return all
    .filter((p) => p.slug !== origin.slug && hasCoords(p))
    .map((p) => ({
      ...p,
      distanceKm: distanceKm(oLat, oLon, Number(p.latitude), Number(p.longitude)),
    }))
    .filter((p) => p.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/** The `limit` closest places, ignoring radius. Nearest first. */
export function nearest<T extends GeoPoint>(
  origin: GeoPoint,
  all: T[],
  limit: number,
): Array<T & { distanceKm: number }> {
  if (!hasCoords(origin)) return [];
  const oLat = Number(origin.latitude);
  const oLon = Number(origin.longitude);

  return all
    .filter((p) => p.slug !== origin.slug && hasCoords(p))
    .map((p) => ({
      ...p,
      distanceKm: distanceKm(oLat, oLon, Number(p.latitude), Number(p.longitude)),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

/** "700 m" under a kilometre, "2.4 km" above it. */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 100) * 10} m`;
  return `${km.toFixed(1)} km`;
}

/* ── Walking-distance page thresholds ─────────────────────────────
   A page is only generated when a place has at least MIN_NEIGHBOURS
   others inside WALKING_RADIUS_KM. Below that the page would be thin,
   so it is marked noindex and kept out of the sitemap.
   ──────────────────────────────────────────────────────────────── */
export const WALKING_RADIUS_KM = 2;
export const MIN_NEIGHBOURS = 5;
