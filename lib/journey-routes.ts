/**
 * Journey → Route Sequence Mapping
 * Maps journey slugs to canonical route block IDs (one per line, top to bottom)
 * Used to auto-populate the route sequence field when a quote comes in
 */

export const JOURNEY_ROUTES: Record<string, string[]> = {

  // ── Ariel's route — the benchmark ─────────────────────────────────────────
  "gnawa-road": [
    "STAY_ESSAOUIRA_ARR",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
  ],

  // ── Core popular journeys ──────────────────────────────────────────────────
  "7-day-morocco-highlights": [
    "STAY_ESSAOUIRA_ARR",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "AGAFAY-MAR",
    "STAY_MARRAKECH",
  ],

  "5-day-first-time-morocco": [
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "DAY-ESS-001",
    "DAY-KAS-001",
    "STAY_MARRAKECH",
  ],

  "3-day-marrakech": [
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
  ],

  "3-day-fes": [
    "STAY_FES",
    "STAY_FES",
    "STAY_FES",
  ],

  "4-day-essaouira-coastal-villages": [
    "STAY_ESSAOUIRA_ARR",
    "STAY_ESSAOUIRA",
    "ESS-SID-NEW15",
    "ESS-MAR-NEW",
  ],

  "4-day-sahara-valleys-journey": [
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
  ],

  "3-Day-Sahara-Circle": [
    "MAR-TAM-004",
    "DAD-MER-116",
    "MER-ERR-001",
  ],

  "fes-to-marrakech-4-days": [
    "STAY_FES",
    "FES-AZR-105",
    "AZR-FES-106",
    "FES-MAR-020",
  ],

  "marrakech-to-fes-4-days": [
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "AGAFAY-MAR",
    "FES-MAR-020",
  ],

  "8-Day-Imperial-Cities": [
    "CAS-RAB-025",
    "CAS-MEK-026",
    "STAY_FES",
    "STAY_FES",
    "FES-CHE-118",
    "STAY_CHEFCHAOUEN",
    "CHE-FES-NEW05",
    "FES-MAR-020",
  ],

  "tangier-to-marrakech-7-days": [
    "CAS-TAN-030",
    "CHE-TAN-033",
    "STAY_CHEFCHAOUEN",
    "CHE-FES-NEW05",
    "STAY_FES",
    "FES-MAR-020",
    "STAY_MARRAKECH",
  ],

  "6-Day-Northern-Morocco-Tangier-to-Tetouan": [
    "CAS-TAN-030",
    "CHE-TAN-033",
    "STAY_CHEFCHAOUEN",
    "CHE-AKC-NEW13",
    "AKC-TAN-NEW14",
    "CHE-TET-NEW23",
  ],

  "5-day-chefchaouen-the-rif": [
    "CHE-TAN-033",
    "STAY_CHEFCHAOUEN",
    "STAY_CHEFCHAOUEN",
    "CHE-AKC-NEW13",
    "AKC-TAN-NEW14",
  ],

  "6-Day-High-Atlas-Trails": [
    "STAY_MARRAKECH",
    "DAY-IML-001",
    "IML-AIT-NEW18",
    "STAY_MARRAKECH",
    "AIT-MAR-090",
    "STAY_MARRAKECH",
  ],

  "ait-bouguemez-valley-trek-5-days": [
    "MAR-AIT-089",
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "AIT-DEM-NEW19",
    "DEM-MAR-NEW20",
  ],

  "6-day-kasbahs-valleys": [
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "DAD-TAM-NEW06",
    "STAY_MERZOUGA",
    "MER-ERR-001",
    "STAY_MARRAKECH",
  ],

  "dades-todra-gorges-5-days": [
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "DAD-MER-116",
    "DAD-OUA-117",
    "STAY_MARRAKECH",
  ],

  "5-Day-Erg-Chigaga-Desert-Expedition": [
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
  ],

  "casablanca-to-sahara-5-days": [
    "CAS-MAR-NEW04",
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
  ],

  "atlantic-coast-8-days": [
    "CAS-RAB-025",
    "CAS-TAN-030",
    "CHE-RAB-115",
    "ESS-CAS-NEW10",
    "STAY_ESSAOUIRA",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
  ],

  "10-Day-Atlantic-Coast-Journey": [
    "CAS-TAN-030",
    "ASI-CHE-NEW22",
    "STAY_CHEFCHAOUEN",
    "CHE-RAB-115",
    "CAS-RAB-025",
    "ESS-CAS-NEW10",
    "STAY_ESSAOUIRA",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
  ],

  "sahara-to-sea-10-days": [
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
    "DAD-MAR-NEW02",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "AGAFAY-MAR",
    "ESS-MAR-NEW",
  ],

  "10-day-complete-morocco": [
    "CAS-TAN-030",
    "CHE-TAN-033",
    "STAY_CHEFCHAOUEN",
    "CHE-FES-NEW05",
    "STAY_FES",
    "STAY_FES",
    "FES-MAR-020",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "AGAFAY-MAR",
  ],

  "12-Day-Grand-Tour-Eastern-Arc": [
    "CAS-RAB-025",
    "CAS-TAN-030",
    "CHE-TAN-033",
    "STAY_CHEFCHAOUEN",
    "CHE-FES-NEW05",
    "STAY_FES",
    "STAY_FES",
    "FES-MER-009",
    "STAY_MERZOUGA",
    "DAD-MER-116",
    "MAR-TAM-004",
    "STAY_MARRAKECH",
  ],

  "12-day-grand-tour-western-arc": [
    "CAS-TAN-030",
    "CHE-TAN-033",
    "STAY_CHEFCHAOUEN",
    "CHE-RAB-115",
    "ESS-CAS-NEW10",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
  ],

  "morocco-luxury-7-days": [
    "STAY_ESSAOUIRA_ARR",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "AGAFAY-MAR",
  ],

  "morocco-honeymoon-10-days": [
    "STAY_ESSAOUIRA_ARR",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "MAR-AGAFAY",
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
    "STAY_MARRAKECH",
  ],

  "morocco-family-8-days": [
    "STAY_ESSAOUIRA_ARR",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "DAY-KAS-001",
    "MAR-AGAFAY",
    "AGAFAY-MAR",
  ],

  "5-day-draa-valley": [
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "STAY_MERZOUGA",
    "DAD-TAM-NEW06",
    "DAD-MAR-NEW02",
  ],

  "literary-tangier-4-days": [
    "CAS-TAN-030",
    "STAY_CHEFCHAOUEN",
    "CHE-TAN-033",
    "CAS-TAN-030",
  ],

  "fes-meknes-wine-3-days": [
    "STAY_FES",
    "FES-MEK-022",
    "FES-MOU-109",
  ],

  "middle-atlas-cedar-forests-4-days": [
    "STAY_FES",
    "FES-IFR-103",
    "FES-AZR-105",
    "AZR-FES-106",
  ],

  "todra-gorge-tinghir-4-days": [
    "STAY_MARRAKECH",
    "MAR-TAM-004",
    "DAD-MER-116",
    "DAD-OUA-117",
  ],

  "10-day-flavors-of-morocco": [
    "STAY_ESSAOUIRA_ARR",
    "STAY_ESSAOUIRA",
    "ESS-MAR-NEW",
    "STAY_MARRAKECH",
    "STAY_MARRAKECH",
    "DAY-ESS-001",
    "MAR-TAM-004",
    "DAD-MER-116",
    "STAY_MERZOUGA",
    "MER-ERR-001",
  ],
};

/**
 * Returns the route sequence for a given journey slug, or null if not mapped.
 */
export function getRouteSequenceForJourney(slug: string): string | null {
  const routes = JOURNEY_ROUTES[slug];
  if (!routes || routes.length === 0) return null;
  return routes.join("\n");
}
