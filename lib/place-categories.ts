/* ═══════════════════════════════════════════════════════════════
   PLACE CATEGORIES

   `label` must match the value stored in places.category exactly.
   These are the fifteen values left after the September 2026
   normalisation — Natural and Landscape folded into Nature, Museum
   into Museums, Squares & Markets into Markets, Workshops into
   Craft, Villages into Towns.

   A category with fewer than MIN_FOR_INDEX places still gets a
   working page, but it is noindex and stays out of the sitemap.
   Thin category pages are doorway pages, and Google treats them
   accordingly.
   ═══════════════════════════════════════════════════════════════ */

export interface PlaceCategory {
  slug: string;
  label: string;
  description: string;
  /**
   * Journeys that cover this category, shown as a strip on the
   * category page. Slugs from the journeys table.
   */
  journeys?: string[];
  /**
   * True where the category is earthen architecture, which is the
   * subject of the Ksour Archive. Adds the cross-link that story
   * pages already carry.
   */
  ksourArchive?: boolean;
}

export const MIN_FOR_INDEX = 3;

export const PLACE_CATEGORIES: PlaceCategory[] = [
  {
    slug: "nature",
    journeys: ["morocco-trekking-8-days", "morocco-birdwatching-7-days"],
    label: "Nature",
    description:
      "Cedar forests at 1,700 metres, a lake that only appears after winter rain, dunes that rise 150 metres, and a gorge that narrows to ten. Morocco holds the Atlantic, the Atlas, and the Sahara inside one border, and the transitions between them happen faster than anyone expects.",
  },
  {
    slug: "architecture",
    journeys: ["morocco-architecture-trail-14-days", "architecture-pilgrimage"],
    ksourArchive: true,
    label: "Architecture",
    description:
      "Pisé that dissolves in the rain and is repaired every year. A grid-planned medina designed by a French military engineer. Three hundred art deco buildings in a city nobody visits for its buildings. Moroccan architecture is a set of answers to climate, defence, and privacy — read it that way and it stops being decorative.",
  },
  {
    slug: "monuments",
    journeys: ["roman-morocco-6-days", "8-Day-Imperial-Cities"],
    label: "Monuments",
    description:
      "The tombs sealed for three centuries by a sultan who could not destroy them. The minaret of a mosque never finished. The gate named for the slave who designed it. What survives in Morocco usually survives because destroying it was more trouble than leaving it standing.",
  },
  {
    slug: "culture",
    label: "Culture",
    description:
      "A trance tradition brought north by enslaved people and now UNESCO-listed. A festival that has run every August since 1978 and cares more about the conversations than the murals. A bookshop where Genet had his post delivered. The places where Moroccan public life actually happens.",
  },
  {
    slug: "museums",
    journeys: ["morocco-painters-eyes-8-days", "contemporary-art-morocco-5-days"],
    label: "Museums",
    description:
      "Amazigh silver, Roman mosaics carried in from Volubilis, photographs of ceremonies nobody performs any more, and one Jewish museum serving twenty-two Arab countries. Several of these are worth visiting for the building alone, and we say so where that is the case.",
  },
  {
    slug: "neighborhoods",
    label: "Neighborhoods",
    description:
      "The mellah where balconies were permitted and nowhere else. The quarter the French built to look like a medina and accidentally made more coherent than one. The Andalusian streets of Tetouan, transplanted whole from a Spain that no longer exists.",
  },
  {
    slug: "markets",
    journeys: ["morocco-arts-crafts-7-days"],
    label: "Markets",
    description:
      "Where the souk is a workplace rather than a shopping experience. Sunday at Souk el-Had when the Souss Valley comes in. The coppersmiths' square in Fes where the hammering has not stopped since the 13th century. What is for sale tells you what the region grows, mines, and makes.",
  },
  {
    slug: "kasbahs",
    journeys: ["architecture-pilgrimage", "6-day-kasbahs-valleys", "oasis-hopping-6-days"],
    ksourArchive: true,
    label: "Kasbahs",
    description:
      "Fortified earthen houses, each belonging to a specific family or tribe, strung along the Draa and the Dades in every condition from inhabited to spectacularly ruined. The vocabulary is consistent — crenellated towers, geometric pisé, gateways facing east. The upkeep is not.",
  },
  {
    slug: "craft",
    journeys: ["morocco-arts-crafts-7-days", "morocco-textile-trail-10-days"],
    label: "Craft",
    description:
      "Thuya burl that grows nowhere else. A green glaze fired in underground kilns that has never been reproduced elsewhere. Silver worked by the apprentices of families who left in the 1960s. Where the making is still visible, we say where to stand.",
  },
  {
    slug: "towns",
    ksourArchive: true,
    label: "Towns",
    description:
      "Places that are the destination rather than a stop inside one. A Spanish art deco town on the Atlantic that nobody visits. Morocco's holiest town, draped over two hills above a Roman ruin. A village where the guembri starts when somebody picks it up.",
  },
  {
    slug: "working-areas",
    label: "Working areas",
    description:
      "Ports, tanneries, saffron fields, market towns. Not attractions — workplaces that tolerate visitors. The etiquette is different and so is the timing: you go when the work happens, not when it suits you.",
  },
  {
    slug: "gardens",
    label: "Gardens",
    description:
      "A 12th-century agricultural estate that still harvests its olives in November. A cobalt blue that is not Moroccan at all but one French painter's attempt at the sky. Moroccan gardens are irrigation systems that became beautiful, in that order.",
  },
  {
    slug: "palaces",
    label: "Palaces",
    description:
      "Built with Portuguese ransom gold, or by a grand vizier calibrating four apartments so that none of his wives could read an insult into hers. The painted cedar ceilings are the argument.",
  },
  {
    slug: "food",
    label: "Food",
    description:
      "Oysters farmed in a Saharan lagoon and sold in Paris. Sardines grilled two hundred metres from where they were landed. Where to eat is not a separate question from where to go.",
  },
  {
    slug: "sacred",
    journeys: ["morocco-jewish-heritage-8-days"],
    label: "Sacred",
    description:
      "Shrines, zaouias, and the saints attached to them. A headland where pilgrims and surfers use the same beach without either party seeming troubled by it.",
  },
];

export const CATEGORY_BY_SLUG: Record<string, PlaceCategory> =
  Object.fromEntries(PLACE_CATEGORIES.map((c) => [c.slug, c]));

/** Turn a stored category value into its route slug. */
export function categorySlug(label: string | null | undefined): string | null {
  if (!label) return null;
  const found = PLACE_CATEGORIES.find(
    (c) => c.label.toLowerCase() === label.toLowerCase(),
  );
  return found ? found.slug : null;
}
