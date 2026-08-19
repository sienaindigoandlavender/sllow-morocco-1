// lib/collections.ts
//
// Collections are editorial acts, not database rows. Each one ropes together
// existing stories and places under a single idea — the Atlas Obscura move,
// the thing that keeps a reader wandering and lets the publication *judge*.
//
// Curation lives here, in version control, not in a CMS. To add or reorder a
// collection, edit this file. Slugs must match published stories/places; any
// slug that doesn't resolve is skipped silently at render, so a typo degrades
// gracefully rather than breaking the build.
//
// Order within storySlugs / placeSlugs is the order shown. Lead with the
// strongest entry — a collection is a ranked argument, not an alphabetical list.
//
// All slugs below are verified against the live stories (99) and places (169)
// tables.

export interface Collection {
  slug: string;
  title: string;
  dek: string;
  intro: string[];
  heroImage?: string;
  storySlugs: string[];
  placeSlugs: string[];
  featured?: boolean;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "al-andalus",
    title: "Al-Andalus",
    dek: "Eight centuries of a civilization that lived on both shores of the strait — and the half of it that continued in Morocco.",
    intro: [
      "For nearly eight hundred years, the Iberian Peninsula and Morocco belonged to a single cultural world. Córdoba and Fes were sister cities of learning. The same dynasties built in Seville and Marrakech, to the same proportions, within the same generation. Music, architecture, gardens, script, and craft moved freely across fourteen kilometres of water.",
      "When that world ended on the northern shore, much of it did not disappear. It crossed south. The horseshoe arch, the honeycomb vaulting, the Andalusi nuba, the whitewashed medinas of the north — all of it was carried to Morocco by people who remembered how it was made. This collection follows that civilization: what it was, what crossed the strait, and where it still lives.",
    ],
    storySlugs: [
      "islamic-spain-legacy",
      "the-berber-caliphate",
      "when-the-strait-was-a-river",
      "al-andalus-corridor",
      "reconquista-exodus",
      "the-fall-of-al-andalus",
      "the-two-rivers",
      "the-blue-gate",
      "the-palace-that-became-a-museum",
      "moroccan-music-traditions",
    ],
    placeSlugs: [
      "quartier-andalou-chefchaouen",
      "kasbah-chefchaouen",
      "kasbah-tangier",
    ],
    featured: true,
  },
  {
    slug: "essaouira",
    title: "Essaouira",
    dek: "The windswept Atlantic port that everyone loves and few understand.",
    intro: [
      "Orson Welles shot Othello on its ramparts. Jimi Hendrix wandered its beaches. The Gnawa hold their great festival in its streets. Essaouira has been a fortified port, a hippie refuge, a fishing town and a film set — often all at once — and it wears every layer at the same time.",
      "This is the whole city: the walls and the cannons, the port and the wood workshops, the fish grills and the wind, and the music that grew out of all of it.",
    ],
    storySlugs: [
      "the-walls-of-essaouira",
      "the-cannons-on-the-wall",
      "the-gnawa-road",
      "the-moqaddema",
    ],
    placeSlugs: [
      "ramparts-essaouira",
      "skala-de-la-ville",
      "port-essaouira",
      "medina-essaouira",
      "souk-essaouira",
      "thuya-wood-workshops",
      "gnawa-essaouira",
      "fish-grills-essaouira",
      "beach-essaouira",
      "essaouira-wind",
      "sidi-kaouki",
      "diabat-ruins",
      "argan-essaouira",
      "bayt-dakira",
    ],
    featured: true,
  },
  {
    slug: "the-film-sahara",
    title: "The Film Sahara",
    dek: "Where Hollywood keeps coming to shoot the ancient world.",
    intro: [
      "For sixty years, when a film needs Rome, Jerusalem, a Targaryen city or a nameless desert at the edge of the map, it has come to the same stretch of southern Morocco. Gladiator, Lawrence of Arabia, Game of Thrones, The Odyssey — all shot below the High Atlas, in the kasbahs and dunes around Ouarzazate.",
      "This is the country behind the camera: the places that have played everywhere, and what they actually are when the crew goes home.",
    ],
    storySlugs: [
      "cinema-morocco",
    ],
    placeSlugs: [
      "ait-benhaddou-ksar",
      "atlas-studios",
      "taourirt-kasbah",
      "erg-chebbi",
      "tizi-n-tichka",
    ],
    featured: true,
  },
  {
    slug: "the-road-of-a-thousand-kasbahs",
    title: "The Road of a Thousand Kasbahs",
    dek: "Over the Atlas and down into the pre-Sahara, kasbah by kasbah.",
    intro: [
      "South of Marrakech the road climbs the Tizi n'Tichka pass, crosses the High Atlas, and drops into another country: palm oases, mud-brick fortresses, rose valleys and the first dunes of the Sahara. This was the caravan route to Timbuktu, and its architecture — the ksour and kasbahs of packed earth — is unlike anything north of the mountains.",
      "This is the arc, in order, from the pass to the deep desert — and the stories of how these earthen walls are built, and why they are melting.",
    ],
    storySlugs: [
      "route-thousand-kasbahs",
      "the-kasbahs",
      "the-ksour",
      "the-fortress-of-grain",
      "the-thermal-battery",
      "the-three-deserts",
      "the-desert-camp",
    ],
    placeSlugs: [
      "tizi-n-tichka",
      "ait-benhaddou-ksar",
      "taourirt-kasbah",
      "fint-oasis",
      "kasbah-amridil",
      "skoura-palmeraie",
      "dades-gorge",
      "rose-valley",
      "todra-gorge-canyon",
      "draa-palmeraie",
      "tamnougalt-kasbah",
      "tamegroute-library",
      "tamegroute-pottery",
      "erg-chebbi",
      "erg-chigaga",
      "khamlia-gnawa-village",
    ],
    featured: true,
  },
  {
    slug: "the-geometry-of-faith",
    title: "The Geometry of Faith",
    dek: "Why Moroccan walls are covered in mathematics instead of pictures.",
    intro: [
      "A prohibition on depicting living things sent Moroccan art somewhere stranger and more rigorous than portraiture ever went: into pure geometry. Zellige tile, carved plaster, the pierced wooden screen — each is a mathematical system worked by hand, some of them describing symmetries European mathematics did not name until the twentieth century.",
      "This is the art born from a prohibition, read closely: the tile, the screen, the light, and the silence they were built to hold.",
    ],
    storySlugs: [
      "the-little-polished-stone",
      "geometry-of-zellige",
      "digital-zellige",
      "shadow-of-the-moucharabieh",
      "hammam-geometry",
      "the-geometry-of-silence",
      "colour-index-morocco",
    ],
    placeSlugs: [
      "koubba-almoravid",
    ],
    featured: true,
  },
  {
    slug: "the-painters-morocco",
    title: "The Painters' Morocco",
    dek: "The light that pulled Delacroix, Matisse and Majorelle north to south.",
    intro: [
      "In 1832 Delacroix crossed into Morocco and filled seven notebooks in six months; the country reordered his palette for the rest of his life. Matisse came for two weeks and stayed for months. Majorelle built a garden the exact blue of a pigment he had patented. Something in the Moroccan light has been rearranging European painting for two centuries.",
      "This is the painters' Morocco — the men, the light, and the places they could not leave.",
    ],
    storySlugs: [
      "the-perfume-of-the-lion",
      "the-color-of-light",
      "the-blue-garden",
      "the-painters-light",
      "the-light-that-changed-color",
      "the-town-the-painters-found",
    ],
    placeSlugs: [],
    featured: false,
  },
  {
    slug: "the-gardens-of-marrakech",
    title: "The Gardens of Marrakech",
    dek: "Water, shade, and power — the walled gardens of the red city.",
    intro: [
      "In a city at the edge of the desert, a garden is a statement of power: it means you command water. Marrakech's great gardens — royal orchards, palace courtyards, a painter's blue folly — are each an answer to the same question of how to make paradise out of a hot plain, and each belongs to a different century of ambition.",
      "This is the red city read through its gardens, from the medieval waterworks to the Majorelle blue.",
    ],
    storySlugs: [
      "gardens-of-morocco",
      "the-basin-and-the-mountains",
      "the-orchard-behind-the-palace",
      "the-garden-behind-the-door",
      "the-blue-garden",
      "the-harem-geometry",
    ],
    placeSlugs: [],
    featured: false,
  },
  {
    slug: "older-than-rome",
    title: "Older Than Rome",
    dek: "The Amazigh — who were here first, and never left.",
    intro: [
      "Before the Arabs, before Rome, before Carthage, the Amazigh were here — and they are here still, a third of the country, with their own language, calendar and alphabet. The Tifinagh script on the road signs is a direct descendant of writing older than Latin. The new year they celebrate counts from a Berber pharaoh.",
      "This is the oldest layer of Morocco, the one everything else was built on top of.",
    ],
    storySlugs: [
      "amazigh-identity-map",
      "yennayer-amazigh-new-year",
      "the-alphabet-in-stone",
      "the-five-tongues",
      "languages-of-morocco",
      "the-nomad-pulse",
    ],
    placeSlugs: [],
    featured: false,
  },
  {
    slug: "jewish-morocco",
    title: "Jewish Morocco",
    dek: "Two thousand years of presence, and the traces that still hold.",
    intro: [
      "Jews lived in Morocco for two millennia — longer than in almost anywhere else on earth — and at the community's height, before the twentieth century emptied it, a quarter of a million remained. The mellah in each city, the synagogue, the pilgrimage to a saint's tomb: the traces are everywhere once you know how to read them.",
      "This is Jewish Morocco — the museum, the synagogue, the pilgrimage, and what remains.",
    ],
    storySlugs: [
      "the-only-museum",
      "the-stained-glass-synagogue",
      "the-hiloula",
    ],
    placeSlugs: [
      "bayt-dakira",
    ],
    featured: false,
  },
  {
    slug: "the-rituals-of-the-table",
    title: "The Rituals of the Table",
    dek: "Tea poured from a height, bread before everything, and why.",
    intro: [
      "Moroccan hospitality runs on rules that look like habits until you ask why. The tea is poured from a height, and there is a reason. The bread arrives first, and there is a reason. There are three glasses, and each one is meant to taste different. None of it is arbitrary; all of it is a code for how people are meant to treat each other.",
      "This is the table, decoded — the tea, the bread, the hammam that comes before the feast.",
    ],
    storySlugs: [
      "why-the-tea-is-poured-from-a-height",
      "the-three-glasses",
      "why-friday-is-different",
      "the-cooking-class",
      "the-hammam",
    ],
    placeSlugs: [],
    featured: false,
  },
  {
    slug: "the-sound-of-gnawa",
    title: "The Sound of Gnawa",
    dek: "The music that came north in chains and turned into healing.",
    intro: [
      "Gnawa music arrived with enslaved West Africans brought across the Sahara, and became something that exists nowhere else: an all-night ceremony of trance and healing, the lila, led by a maâlem on a three-string guembri. It is sacred and it is a festival, played in a village of former slaves near the dunes and on a festival stage in Essaouira.",
      "This is where the sound lives, from the road it travelled to the coast where the world now hears it.",
    ],
    storySlugs: [
      "the-gnawa-road",
      "where-to-hear-gnawa",
      "the-moqaddema",
      "the-sacred-smoke",
    ],
    placeSlugs: [
      "khamlia-gnawa-village",
      "gnawa-essaouira",
    ],
    featured: false,
  },
  {
    slug: "the-blue-city",
    title: "The Blue City",
    dek: "Chefchaouen, and the Rif around it, walked past the photographs.",
    intro: [
      "Chefchaouen is the most photographed town in Morocco and the least explained. Why is it blue? Who painted it, and when? The usual answers are wrong, or younger than everyone assumes. Behind the postcard is a mountain town founded by Andalusian refugees, closed to outsiders for centuries, with a kasbah, a hidden waterfall and a way of life shaped by the Rif.",
      "This is the blue quarter and the country around it.",
    ],
    storySlugs: [
      "the-blue-city",
    ],
    placeSlugs: [
      "chefchaouen-medina",
      "quartier-andalou-chefchaouen",
      "kasbah-chefchaouen",
      "chefchaouen-souks",
      "chefchaouen-viewpoint",
      "ras-el-maa",
      "akchour-waterfalls",
      "rif-mountains-chefchaouen",
    ],
    featured: false,
  },
  {
    slug: "tangier",
    title: "Tangier",
    dek: "The interzone — spies, writers, painters, and the city that belonged to everyone.",
    intro: [
      "For thirty years Tangier was an International Zone governed by no single country, and it drew the century's strangest cast: Bowles and Burroughs, Matisse and Delacroix, the Rolling Stones, smugglers, spies and exiles. The café where they sat still looks over the strait. The bookshop still trades. The city has calmed, but the interzone is still legible if you know the addresses.",
      "This is literary and painted Tangier, address by address.",
    ],
    storySlugs: [
      "the-perfume-of-the-lion",
      "the-color-of-light",
      "literary-morocco",
    ],
    placeSlugs: [
      "cafe-hafa",
      "librairie-des-colonnes",
      "american-legation",
      "grand-socco",
      "kasbah-tangier",
      "kasbah-museum-tangier",
      "cinema-rif-tangier",
      "cap-spartel",
      "caves-hercules",
    ],
    featured: false,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getAllCollectionSlugs(): string[] {
  return COLLECTIONS.map((c) => c.slug);
}

// Reverse lookup — which collections rope in a given story or place.
// Returns just what a cross-link needs: the collection's slug, title, and dek.
export interface CollectionRef {
  slug: string;
  title: string;
  dek: string;
}

export function getCollectionsForStory(storySlug: string): CollectionRef[] {
  return COLLECTIONS.filter((c) => c.storySlugs.includes(storySlug)).map(
    ({ slug, title, dek }) => ({ slug, title, dek })
  );
}

export function getCollectionsForPlace(placeSlug: string): CollectionRef[] {
  return COLLECTIONS.filter((c) => c.placeSlugs.includes(placeSlug)).map(
    ({ slug, title, dek }) => ({ slug, title, dek })
  );
}
