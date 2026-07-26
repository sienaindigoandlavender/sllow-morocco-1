// Forces the Moroccan ("MA") worldview on Mapbox classic styles (streets,
// outdoors, light, dark, satellite-streets) so that the Western Sahara renders
// as an integral part of the Kingdom of Morocco: no disputed dashed border and
// no separate "Western Sahara" country label. Call once the map style has
// loaded (inside map.on("load", ...)). Safe to call on any Mapbox map — layers
// that do not exist are skipped.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMoroccoWorldview(map: any) {
  if (!map) return;
  const WORLDVIEW = "MA";
  const wv = ["match", ["get", "worldview"], ["all", WORLDVIEW], true, false];
  const layers = [
    "admin-0-boundary",
    "admin-0-boundary-bg",
    "admin-0-boundary-disputed",
    "admin-1-boundary",
    "admin-1-boundary-bg",
    "country-label",
  ];
  for (const id of layers) {
    try {
      if (map.getLayer(id)) map.setFilter(id, wv);
    } catch {
      /* layer present but filter not applicable — ignore */
    }
  }
}
