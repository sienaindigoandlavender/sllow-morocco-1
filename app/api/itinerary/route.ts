import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ── Full route index — 204 routes with IDs ────────────────────────────────────
// Claude selects from this list. No hallucination possible.
const ROUTE_INDEX = [
  { id: "AGA-ESS-NEW09", from: "Agadir", to: "Essaouira", type: "Coastal" },
  { id: "AGA-GUE-049", from: "Agadir", to: "Guelmim", type: "Coastal" },
  { id: "AGA-LEG-042", from: "Agadir", to: "Legzira", type: "Coastal" },
  { id: "AGA-MAR-NEW12", from: "Agadir", to: "Marrakech", type: "Coastal" },
  { id: "AGA-SID-059", from: "Agadir", to: "Sidi Ifni", type: "Coastal" },
  { id: "AGA-TAG-018", from: "Agadir", to: "Taghazout", type: "Coastal" },
  { id: "AGA-TAR-019", from: "Agadir", to: "Taroudant", type: "Mountain" },
  { id: "AGA-TIZ-080", from: "Agadir", to: "Tiznit", type: "Coastal" },
  { id: "AGAFAY-MAR", from: "Agafay Desert", to: "Marrakech", type: "Transfer" },
  { id: "AIT-DEM-NEW19", from: "Ait Bouguemez", to: "Demnate", type: "Mountain" },
  { id: "AIT-IMI-092", from: "Ait Bouguemez", to: "Imilchil", type: "Mountain" },
  { id: "AIT-MAR-090", from: "Ait Bouguemez", to: "Marrakech", type: "Mountain" },
  { id: "AKC-TAN-NEW14", from: "Akchour", to: "Tangier", type: "Mountain" },
  { id: "AKH-KHE-064", from: "Akhfennir", to: "Khenifiss", type: "Coastal" },
  { id: "AKH-TAR-065", from: "Akhfennir", to: "Tarfaya", type: "Coastal" },
  { id: "ASI-CHE-NEW22", from: "Asilah", to: "Chefchaouen", type: "Cities" },
  { id: "AZR-FES-106", from: "Azrou", to: "Fes", type: "Mountain" },
  { id: "AZR-FES-NEW30", from: "Azrou", to: "Fes", type: "Mountain" },
  { id: "AZR-MID-099", from: "Azrou", to: "Midelt", type: "Mountain" },
  { id: "STAY_CAS_JEWISH", from: "Casablanca", to: "Casablanca", type: "Stay" },
  { id: "CAS-EL -038", from: "Casablanca", to: "El Jadida", type: "Coastal" },
  { id: "CAS-FES-028", from: "Casablanca", to: "Fes", type: "Cities" },
  { id: "CAS-MAR-NEW04", from: "Casablanca", to: "Marrakech", type: "Cities" },
  { id: "CAS-MEK-026", from: "Casablanca", to: "Meknes", type: "Cities" },
  { id: "CAS-RAB-025", from: "Casablanca", to: "Rabat", type: "Cities" },
  { id: "CAS-TAN-030", from: "Casablanca", to: "Tangier", type: "Cities" },
  { id: "CHE-AKC-NEW13", from: "Chefchaouen", to: "Akchour", type: "Mountain" },
  { id: "STAY_CHEFCHAOUEN", from: "Chefchaouen", to: "Chefchaouen", type: "Stay" },
  { id: "CHE-FES-NEW05", from: "Chefchaouen", to: "Fes", type: "Cities" },
  { id: "CHE-MEK-034", from: "Chefchaouen", to: "Meknes", type: "Cities" },
  { id: "CHE-RAB-115", from: "Chefchaouen", to: "Rabat", type: "Transfer" },
  { id: "CHE-TAN-033", from: "Chefchaouen", to: "Tangier", type: "Cities" },
  { id: "CHE-TET-NEW23", from: "Chefchaouen", to: "Tetouan", type: "Cities" },
  { id: "DAD-MAR-NEW02", from: "Dades", to: "Marrakech", type: "Desert" },
  { id: "DAD-MER-116", from: "Dades", to: "Merzouga", type: "Scenic" },
  { id: "DAD-OUA-117", from: "Dades", to: "Ouarzazate", type: "Scenic" },
  { id: "DAD-TAM-NEW06", from: "Dades", to: "Tamnougalt", type: "Desert" },
  { id: "DAK-GUE-058", from: "Dakhla", to: "Guelmim", type: "Coastal" },
  { id: "DAK-TAR-068", from: "Dakhla", to: "Tarfaya", type: "Coastal" },
  { id: "DEM-MAR-NEW20", from: "Demnate", to: "Marrakech", type: "Mountain" },
  { id: "EL -CAS-039", from: "El Jadida", to: "Casablanca", type: "Coastal" },
  { id: "EL -ESS-040", from: "El Jadida", to: "Essaouira", type: "Coastal" },
  { id: "EL -MAR-088", from: "El Jadida", to: "Marrakech", type: "Coastal" },
  { id: "ERG-FOU-NEW25", from: "Erg Chigaga", to: "Foum Zguid", type: "Desert" },
  { id: "ERG-MAR-046", from: "Erg Chigaga", to: "Marrakech", type: "Desert" },
  { id: "ERG-MAR-045", from: "Erg Chigaga", to: "Marrakech", type: "Desert" },
  { id: "ERG-TAR-047", from: "Erg Chigaga", to: "Taroudant", type: "Desert" },
  { id: "ESS-CAS-NEW10", from: "Essaouira", to: "Casablanca", type: "Coastal" },
  { id: "ESS-EL -041", from: "Essaouira", to: "El Jadida", type: "Coastal" },
  { id: "STAY_ESSAOUIRA", from: "Essaouira", to: "Essaouira", type: "Stay" },
  { id: "ESS-LEG-NEW11", from: "Essaouira", to: "Legzira", type: "Coastal" },
  { id: "ESS-MAR-NEW", from: "Essaouira", to: "Marrakech", type: "Coastal" },
  { id: "ESS-SID-NEW15", from: "Essaouira", to: "Sidi Kaouki", type: "Coastal" },
  { id: "FES-AZR-NEW29", from: "Fes", to: "Azrou", type: "Mountain" },
  { id: "FES-AZR-105", from: "Fes", to: "Azrou", type: "Mountain" },
  { id: "FES-CAS-029", from: "Fes", to: "Casablanca", type: "Cities" },
  { id: "FES-CHE-118", from: "Fes", to: "Chefchaouen", type: "Transfer" },
  { id: "STAY_FES_JEWISH", from: "Fes", to: "Fes", type: "Stay" },
  { id: "STAY_FES", from: "Fes", to: "Fes", type: "Stay" },
  { id: "FES-IFR-103", from: "Fes", to: "Ifrane", type: "Mountain" },
  { id: "FES-IFR-NEW27", from: "Fes", to: "Ifrane", type: "Mountain" },
  { id: "FES-MAR-020", from: "Fes", to: "Marrakech", type: "Cities" },
  { id: "FES-MEK-022", from: "Fes", to: "Meknes", type: "Cities" },
  { id: "FES-MER-009", from: "Fes", to: "Merzouga", type: "Desert" },
  { id: "FES-MID-119", from: "Fes", to: "Midelt", type: "Scenic" },
  { id: "FES-MOU-NEW33", from: "Fes", to: "Moulay Idriss", type: "Cities" },
  { id: "FES-MOU-109", from: "Fes", to: "Moulay Idriss", type: "Cities" },
  { id: "FES-SEF-107", from: "Fes", to: "Seffrou", type: "Cities" },
  { id: "FES-SEF-NEW31", from: "Fes", to: "Sefrou", type: "Cities" },
  { id: "FOU-MAR-NEW26", from: "Foum Zguid", to: "Marrakech", type: "Desert" },
  { id: "GUE-DAK-057", from: "Guelmim", to: "Dakhla", type: "Coastal" },
  { id: "GUE-KHE-050", from: "Guelmim", to: "Khenifiss", type: "Coastal" },
  { id: "GUE-PLA-055", from: "Guelmim", to: "Plage Blanche", type: "Coastal" },
  { id: "GUE-SID-062", from: "Guelmim", to: "Sidi Ifni", type: "Coastal" },
  { id: "GUE-TAR-051", from: "Guelmim", to: "Tarfaya", type: "Coastal" },
  { id: "IFR-FES-NEW28", from: "Ifrane", to: "Fes", type: "Mountain" },
  { id: "IFR-FES-104", from: "Ifrane", to: "Fes", type: "Mountain" },
  { id: "IMI-AIT-091", from: "Imilchil", to: "Ait Bouguemez", type: "Mountain" },
  { id: "IMI-KAL-096", from: "Imilchil", to: "Kalaat M'Gouna", type: "Desert" },
  { id: "IMI-MID-098", from: "Imilchil", to: "Midelt", type: "Mountain" },
  { id: "IML-AIT-NEW18", from: "Imlil", to: "Ait Bouguemez", type: "Mountain" },
  { id: "KAL-IMI-095", from: "Kalaat M'Gouna", to: "Imilchil", type: "Desert" },
  { id: "KAL-OUA-094", from: "Kalaat M'Gouna", to: "Ouarzazate", type: "Desert" },
  { id: "KHE-AKH-063", from: "Khenifiss", to: "Akhfennir", type: "Coastal" },
  { id: "KHE-TAR-052", from: "Khenifiss", to: "Tarfaya", type: "Coastal" },
  { id: "TAN-LAR-NEW", from: "Larache", to: "Asilah, Lixus", type: "Cities" },
  { id: "LEG-AGA-043", from: "Legzira", to: "Agadir", type: "Coastal" },
  { id: "MAR-AGA-015", from: "Marrakech", to: "Agadir", type: "Coastal" },
  { id: "MAR-AGAFAY", from: "Marrakech", to: "Agafay Desert", type: "Transfer" },
  { id: "DAY-AGA-001", from: "Marrakech", to: "Agafay Desert", type: "Day Trip" },
  { id: "MAR-AIT-089", from: "Marrakech", to: "Ait Bouguemez", type: "Mountain" },
  { id: "MAR-ATL-FOOTHILLS", from: "Marrakech", to: "Atlas Foothills", type: "Day Trip" },
  { id: "MAR-CAS-013", from: "Marrakech", to: "Casablanca", type: "Transfer" },
  { id: "MAR-CAS-014", from: "Marrakech", to: "Casablanca", type: "Transfer" },
  { id: "MAR-DAD-003", from: "Marrakech", to: "Dades", type: "Desert" },
  { id: "MAR-EL -087", from: "Marrakech", to: "El Jadida", type: "Coastal" },
  { id: "MAR-ESS-011", from: "Marrakech", to: "Essaouira", type: "Coastal" },
  { id: "DAY-ESS-001", from: "Marrakech", to: "Essaouira", type: "Day Trip" },
  { id: "MAR-FES-021", from: "Marrakech", to: "Fes", type: "Cities" },
  { id: "MAR-IML-NEW17", from: "Marrakech", to: "Imlil", type: "Mountain" },
  { id: "DAY-IML-001", from: "Marrakech", to: "Imlil", type: "Day Trip" },
  { id: "STAY_MAR_JEWISH", from: "Marrakech", to: "Marrakech", type: "Stay" },
  { id: "STAY_MARRAKECH", from: "Marrakech", to: "Marrakech", type: "Stay" },
  { id: "DAY-KAS-001", from: "Marrakech", to: "Ouarzazate", type: "Day Trip" },
  { id: "MAR-OUA-001", from: "Marrakech", to: "Ouarzazate", type: "Desert" },
  { id: "MAR-OUA-002", from: "Marrakech", to: "Ouarzazate", type: "Desert" },
  { id: "DAY-OUR-001", from: "Marrakech", to: "Ourika Valley", type: "Day Trip" },
  { id: "DAY-OUZ-001", from: "Marrakech", to: "Ouzoud Falls", type: "Day Trip" },
  { id: "MAR-RAB-023", from: "Marrakech", to: "Rabat", type: "Cities" },
  { id: "MAR-SID-012", from: "Marrakech", to: "Sidi Kaouki", type: "Coastal" },
  { id: "MAR-TAG-017", from: "Marrakech", to: "Taghazout", type: "Coastal" },
  { id: "MAR-TAM-004", from: "Marrakech", to: "Tamnougalt", type: "Desert" },
  { id: "MAR-TAN-036", from: "Marrakech", to: "Tangier", type: "Cities" },
  { id: "MAR-TAR-016", from: "Marrakech", to: "Taroudant", type: "Mountain" },
  { id: "MAR-ZAG-120", from: "Marrakech", to: "Zagora", type: "Scenic" },
  { id: "MEK-CAS-027", from: "Meknes", to: "Casablanca", type: "Cities" },
  { id: "MEK-CHE-035", from: "Meknes", to: "Chefchaouen", type: "Cities" },
  { id: "MEK-FES-NEW2", from: "Meknes", to: "Fes", type: "Cities" },
  { id: "MEK-MER-121", from: "Meknes", to: "Merzouga", type: "Scenic" },
  { id: "MEK-MOU-111", from: "Meknes", to: "Moulay Idriss", type: "Cities" },
  { id: "MEK-MOU-NEW35", from: "Meknes", to: "Moulay Idriss", type: "Cities" },
  { id: "MEK-RAB-024", from: "Meknes", to: "Rabat", type: "Cities" },
  { id: "MEK-VOL-NEW37", from: "Meknes", to: "Volubilis", type: "Cities" },
  { id: "MEK-VOL-113", from: "Meknes", to: "Volubilis", type: "Cities" },
  { id: "MER-DAD-NEW01", from: "Merzouga", to: "Dades", type: "Desert" },
  { id: "MER-FES-122", from: "Merzouga", to: "Fes", type: "Scenic" },
  { id: "MER-MAR-007", from: "Merzouga", to: "Marrakech", type: "Desert" },
  { id: "STAY_MERZOUGA", from: "Merzouga", to: "Merzouga", type: "Stay" },
  { id: "MER-MID-102", from: "Merzouga", to: "Midelt", type: "Desert" },
  { id: "MER-OUA-008", from: "Merzouga", to: "Ouarzazate", type: "Desert" },
  { id: "MID-AZR-100", from: "Midelt", to: "Azrou", type: "Mountain" },
  { id: "MID-FES-123", from: "Midelt", to: "Fes", type: "Scenic" },
  { id: "MID-IMI-097", from: "Midelt", to: "Imilchil", type: "Mountain" },
  { id: "MID-MER-101", from: "Midelt", to: "Merzouga", type: "Desert" },
  { id: "MID-TIN-NEW", from: "Midelt", to: "Tinghir", type: "Scenic" },
  { id: "MIR-TIZ-078", from: "Mirleft", to: "Tiznit", type: "Coastal" },
  { id: "MOU-FES-110", from: "Moulay Idriss", to: "Fes", type: "Cities" },
  { id: "MOU-FES-NEW34", from: "Moulay Idriss", to: "Fes", type: "Cities" },
  { id: "MOU-MEK-NEW36", from: "Moulay Idriss", to: "Meknes", type: "Cities" },
  { id: "MOU-MEK-112", from: "Moulay Idriss", to: "Meknes", type: "Cities" },
  { id: "OUA-DAD-NEW", from: "Ouarzazate", to: "Dades", type: "Scenic" },
  { id: "OUA-ERG-044", from: "Ouarzazate", to: "Erg Chigaga", type: "Desert" },
  { id: "OUA-KAL-093", from: "Ouarzazate", to: "Kalaat M'Gouna", type: "Desert" },
  { id: "OUA-MAR-NEW", from: "Ouarzazate", to: "Marrakech", type: "Scenic" },
  { id: "OUA-MAR-124", from: "Ouarzazate", to: "Marrakech", type: "Scenic" },
  { id: "OUA-MER-125", from: "Ouarzazate", to: "Merzouga", type: "Scenic" },
  { id: "SKO-OUA-NEW", from: "Ouarzazate", to: "Rose Valley", type: "Scenic" },
  { id: "PLA-GUE-056", from: "Plage Blanche", to: "Guelmim", type: "Coastal" },
  { id: "RAB-CAS-NEW03", from: "Rabat", to: "Casablanca", type: "Cities" },
  { id: "RAB-CHE-126", from: "Rabat", to: "Chefchaouen", type: "Transfer" },
  { id: "RAB-FES-127", from: "Rabat", to: "Fes", type: "Transfer" },
  { id: "RAB-MAR-128", from: "Rabat", to: "Marrakech", type: "Transfer" },
  { id: "RAB-MEK-NEW", from: "Rabat", to: "Meknes", type: "Cities" },
  { id: "STAY_RAB_JEWISH", from: "Rabat", to: "Rabat", type: "Stay" },
  { id: "RAB-TAN-129", from: "Rabat", to: "Tangier", type: "Transfer" },
  { id: "SEF-FES-108", from: "Seffrou", to: "Fes", type: "Cities" },
  { id: "SEF-FES-NEW32", from: "Sefrou", to: "Fes", type: "Cities" },
  { id: "SID-AGA-060", from: "Sidi Ifni", to: "Agadir", type: "Coastal" },
  { id: "SID-GUE-061", from: "Sidi Ifni", to: "Guelmim", type: "Coastal" },
  { id: "SID-ESS-NEW16", from: "Sidi Kaouki", to: "Essaouira", type: "Coastal" },
  { id: "MER-SKO-NEW", from: "Skoura", to: "Tinghir, Todra Gorge, Boumalne Dades", type: "Scenic" },
  { id: "TAF-TAL-076", from: "Tafraoute", to: "Taliouine", type: "Mountain" },
  { id: "TAF-TAR-048", from: "Tafraoute", to: "Taroudant", type: "Mountain" },
  { id: "TAF-TAR-083", from: "Tafraoute", to: "Taroudant", type: "Mountain" },
  { id: "TAF-TAT-085", from: "Tafraoute", to: "Tata", type: "Mountain" },
  { id: "TAF-TIZ-081", from: "Tafraoute", to: "Tiznit", type: "Mountain" },
  { id: "TAL-TAF-075", from: "Taliouine", to: "Tafraoute", type: "Mountain" },
  { id: "TAL-TAR-070", from: "Taliouine", to: "Taroudant", type: "Mountain" },
  { id: "TAL-TAZ-071", from: "Taliouine", to: "Taznakht", type: "Mountain" },
  { id: "TAL-TIZ-073", from: "Taliouine", to: "Tiznit", type: "Mountain" },
  { id: "TAM-ERG-005", from: "Tamnougalt", to: "Erg Chigaga", type: "Desert" },
  { id: "TAM-MAR-NEW07", from: "Tamnougalt", to: "Marrakech", type: "Desert" },
  { id: "TAM-MER-006", from: "Tamnougalt", to: "Merzouga", type: "Desert" },
  { id: "TAN-ASI-NEW21", from: "Tangier", to: "Asilah", type: "Cities" },
  { id: "TAN-CAS-031", from: "Tangier", to: "Casablanca", type: "Cities" },
  { id: "TAN-CHE-032", from: "Tangier", to: "Chefchaouen", type: "Cities" },
  { id: "TAN-MAR-037", from: "Tangier", to: "Marrakech", type: "Cities" },
  { id: "TAR-AKH-066", from: "Tarfaya", to: "Akhfennir", type: "Coastal" },
  { id: "TAR-DAK-067", from: "Tarfaya", to: "Dakhla", type: "Coastal" },
  { id: "TAR-GUE-054", from: "Tarfaya", to: "Guelmim", type: "Coastal" },
  { id: "TAR-KHE-053", from: "Tarfaya", to: "Khenifiss", type: "Coastal" },
  { id: "TAR-AGA-NEW08", from: "Taroudant", to: "Agadir", type: "Coastal" },
  { id: "TAR-TAF-084", from: "Taroudant", to: "Tafraoute", type: "Mountain" },
  { id: "TAR-TAL-069", from: "Taroudant", to: "Taliouine", type: "Mountain" },
  { id: "TAT-TAF-086", from: "Tata", to: "Tafraoute", type: "Mountain" },
  { id: "TAZ-TAL-072", from: "Taznakht", to: "Taliouine", type: "Mountain" },
  { id: "TET-TAN-NEW24", from: "Tetouan", to: "Tangier", type: "Cities" },
  { id: "TIN-OUA-NEW", from: "Tinghir", to: "Ouarzazate", type: "Scenic" },
  { id: "STAY_TIN_JEWISH", from: "Tinghir", to: "Tinghir", type: "Stay" },
  { id: "TIZ-AGA-079", from: "Tiznit", to: "Agadir", type: "Coastal" },
  { id: "TIZ-MIR-077", from: "Tiznit", to: "Mirleft", type: "Coastal" },
  { id: "TIZ-TAF-082", from: "Tiznit", to: "Tafraoute", type: "Mountain" },
  { id: "TIZ-TAL-074", from: "Tiznit", to: "Taliouine", type: "Mountain" },
  { id: "VOL-MEK-NEW38", from: "Volubilis", to: "Meknes", type: "Cities" },
  { id: "VOL-MEK-114", from: "Volubilis", to: "Meknes", type: "Cities" },
  { id: "ZAG-MAR-130", from: "Zagora", to: "Marrakech", type: "Scenic" },
  { id: "MER-FES-010", from: "Merzouga", to: "Fes", type: "Desert" },
];

export async function POST(req: NextRequest) {
  try {
    const { duration, cities, interests, pace, season } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const durationMap: Record<string, number> = {
      "3 days": 3, "5 days": 5, "7 days": 7, "10 days": 10, "2 weeks": 14,
    };
    const days = durationMap[duration] || 7;

    // ── Ask Claude to select a chain of route IDs ─────────────────────────────
    const selectionPrompt = `You are building a Morocco itinerary using real route lego blocks.

Trip parameters:
- Duration: ${days} days
- Cities the traveler wants to visit: ${(cities as string[]).join(", ")}
- Interests: ${(interests as string[]).join(", ")}
- Pace: ${pace}
- Season: ${season || "unspecified"}

Available routes (id, from, to, type):
${JSON.stringify(ROUTE_INDEX.map(r => ({ id: r.id, from: r.from, to: r.to, type: r.type })), null, 2)}

Select a sequence of route IDs that:
1. Chains correctly — each route's "to" city connects to the next route's "from" city
2. Covers the traveler's requested cities
3. Uses Stay routes (type: "Stay") for nights in a city — typically 1-2 nights per city
4. Uses Day Trip routes where appropriate without breaking the main chain
5. Fits within ${days} days total
6. Is geographically logical — no impossible jumps
7. Matches interests: prefer Desert/Scenic routes for desert lovers, Coastal for coast, Mountain for trekkers, Cities for culture
8. Avoid suggesting Sahara desert routes in summer (June-August) — extreme heat

Rules:
- Prefer STAY_ routes when spending multiple nights in a city
- For a 7-day trip visiting Marrakech and Fes: Marrakech Stay → Marrakech→Fes → Fes Stay → Fes Stay → return
- Do NOT include template routes (ARRIVAL_STANDARD, DEPARTURE_STANDARD)
- Select 1 route per day — Stay routes count as a day
- Return exactly ${days} route IDs

Return ONLY valid JSON:
{
  "summary": "One sentence on the trip logic — specific to this combination",
  "route_ids": ["id1", "id2", "id3", ...]
}`;

    const selectionRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [{ role: "user", content: selectionPrompt }],
      }),
    });

    if (!selectionRes.ok) throw new Error("Selection API error");

    const selectionData = await selectionRes.json();
    const selectionText = selectionData.content?.[0]?.text || "";
    const selectionClean = selectionText.replace(/```json|```/g, "").trim();
    const selection = JSON.parse(selectionClean);

    // ── Fetch real route records from Supabase ────────────────────────────────
    const supabase = getSupabase();
    const { data: routes } = await supabase
      .from("routes")
      .select("*")
      .in("id", selection.route_ids);

    if (!routes || routes.length === 0) {
      throw new Error("No routes found");
    }

    // ── Order routes by selection sequence ───────────────────────────────────
    const routeMap = new Map(routes.map((r: any) => [r.id, r]));
    const orderedRoutes = selection.route_ids
      .map((id: string) => routeMap.get(id))
      .filter(Boolean);

    // ── Build ItineraryDay[] — same format as journeys page ───────────────────
    const itinerary = {
      summary: selection.summary,
      days: orderedRoutes.map((route: any, index: number) => ({
        dayNumber: index + 1,
        cityName: route.to_city || route.from_city || "",
        fromCity: route.from_city || "",
        toCity: route.to_city || "",
        description: route.route_narrative || "",
        imageUrl: route.image_url || route.hero_image_url || "",
        travelTime: String(route.travel_time_hours || ""),
        difficulty: route.difficulty_level || "",
        activities: route.activities || "",
        meals: route.meals || "",
        routeType: route.route_type || "",
        dayTitle: route.day_title || "",
        highlights: route.highlights || "",
      })),
    };

    return NextResponse.json(itinerary);
  } catch (error) {
    console.error("Itinerary API error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
