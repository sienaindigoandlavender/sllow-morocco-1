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
// Restocked September 2026. The original thirteen were built against 99
// stories; there are now 301, so each list was reordered and extended rather
// than appended to. Six sequences were added for material that did not exist
// when this file was written — water, earth, the mountains, the deserts, the
// trades, and the calendar. Every slug below is verified against the live
// stories table.

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
      "the-fall-of-al-andalus",
      "al-andalus-corridor",
      "the-two-rivers",
      "the-blue-gate",
      "the-nuba",
      "malhun",
      "moroccan-music-traditions",
      "pastilla",
      "the-two-libraries",
      "the-golden-madrasas",
      "the-palace-that-became-a-museum",
      "the-shared-larder",
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
      "the-forty-percent",
      "the-blue-boats",
      "the-purple-traders",
      "atlantic-coast-morocco",
      "surf-coast-morocco",
      "the-thuya-woodworkers",
      "the-oyster-lagoon",
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
      "hollywood-of-the-south",
      "gladiator-country",
      "cinema-morocco",
      "the-odyssey-returns",
      "the-sheltering-sky",
      "play-it-again-sam",
      "the-assembly-of-the-dead",
      "the-three-deserts",
      "the-moving-mountains",
      "the-other-dunes",
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
      "the-khettara",
      "the-oasis-engineers",
      "the-water-masters",
      "date-palm-oases",
      "the-date-cathedral",
      "the-draa",
      "the-lake-that-stopped-arriving",
      "fifty-two-days-to-timbuktu",
      "the-last-souk-before-the-sand",
      "the-pashas-betrayal",
      "the-pottery-of-tamegroute",
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
      "geometry-of-zellige",
      "digital-zellige",
      "the-zellige-cutters",
      "alphabet-of-craft",
      "the-golden-madrasas",
      "the-koutoubia-mistake",
      "the-three-sisters",
      "the-unfinished-tower",
      "the-mosque-on-the-water",
      "shadow-of-the-moucharabieh",
      "the-geometry-of-silence",
      "hammam-geometry",
      "the-thermal-battery",
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
      "the-painters-light",
      "the-blue-garden",
      "the-man-who-found-his-colours",
      "the-photograph",
      "the-magician-from-memphis",
      "the-man-who-painted-the-boulders",
      "the-town-the-painters-found",
      "colour-index-morocco",
      "the-museums-that-arrived-at-once",
      "the-museum-rabat-built-for-itself",
      "the-palace-that-became-a-museum",
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
      "the-orchard-behind-the-palace",
      "the-basin-and-the-mountains",
      "the-blue-garden",
      "the-garden-behind-the-door",
      "the-khettara",
      "the-quarry",
      "the-red-city",
      "calendar-of-light",
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
      "before-the-crescent",
      "amazigh-identity-map",
      "the-amazigh",
      "the-alphabet-in-stone",
      "the-stone-canvas",
      "the-galleries",
      "the-green-sahara",
      "the-berber-pharaoh",
      "the-warrior-queen",
      "the-first-skull",
      "yennayer-amazigh-new-year",
      "the-five-tongues",
      "languages-of-morocco",
      "the-nomads-calendar",
      "the-transhumance",
      "the-last-nomads",
      "the-nomad-pulse",
      "the-circle",
      "the-silver-capital",
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
      "jewish-heritage-morocco",
      "the-mellah",
      "the-forty-percent",
      "maimonides-in-fes",
      "lalla-solica",
      "the-hiloula",
      "tinghir-jerusalem",
      "the-stained-glass-synagogue",
      "the-only-museum",
      "the-kasbah-with-a-mellah",
      "the-sultans-refusal",
    ],
    placeSlugs: [
      "bayt-dakira",
    ],
    featured: false,
  },
  {
    slug: "the-rituals-of-the-table",
    title: "The Rituals of the Table",
    dek: "One dish in the middle, bread instead of cutlery, and a rule about which part of it is yours.",
    intro: [
      "Moroccan hospitality runs on rules that look like habits until you ask why. The tea is poured from a height, and there is a reason. The bread arrives first, and there is a reason. There are three glasses, and each one is meant to taste different. None of it is arbitrary; all of it is a code for how people are meant to treat each other.",
      "This is the table, decoded — the tea, the bread, the hammam that comes before the feast.",
    ],
    storySlugs: [
      "couscous-friday",
      "the-tagine",
      "the-cone",
      "the-salad-course",
      "tanjia",
      "the-fassi-table",
      "the-casablanca-table",
      "harira",
      "moroccan-iftar",
      "hand-rolled-couscous",
      "pastilla",
      "bread-of-morocco",
      "the-bread-ovens",
      "moroccan-breakfast",
      "msemmen-and-beghrir",
      "the-mint-tea-ritual",
      "why-the-tea-is-poured-from-a-height",
      "the-tea-trade",
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
      "the-maalems-guembri",
      "the-lila",
      "the-moqaddema",
      "where-to-hear-gnawa",
      "the-same-spirit",
      "the-salt-caravans",
      "trans-saharan-trade",
      "the-village-that-changed-music",
      "the-hendrix-myth",
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
      "al-andalus-corridor",
      "the-town-spain-gave-back",
      "the-indigo-trail",
      "colour-index-morocco",
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
      "the-zone",
      "the-14-kilometres",
      "the-pillars",
      "the-cave-at-the-edge",
      "the-color-of-light",
      "literary-morocco",
      "the-sheltering-sky",
      "the-first-friend",
      "the-american-hostage",
      "solar-eclipse-morocco-2027",
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
  {
    slug: "the-water-sequence",
    title: "Water",
    dek: "Follow one thing through the country and most of the rest explains itself: where the water comes from, what it made possible, and who got rich on it.",
    intro: [
      "Morocco is a dry country with a mountain range across it. Almost everything else — where the cities are, why the oases exist, which routes the caravans took, what the empires were paid for — follows from where the water arrives and where it stops.",
      "This is the sequence to read first. It starts underground with a tunnel dug by hand, ends with gold crossing the Sahara, and every step is caused by the one before it.",
    ],
    storySlugs: [
      "the-khettara",
      "the-water-masters",
      "the-oasis-engineers",
      "date-palm-oases",
      "the-date-cathedral",
      "the-last-souk-before-the-sand",
      "the-salt-caravans",
      "trans-saharan-trade",
      "the-caravan-navigators",
      "the-golden-one",
      "the-red-city",
      "the-quarry",
      "water-crisis-morocco",
      "the-lake-that-stopped-arriving",
    ],
    placeSlugs: [],
  },
  {
    slug: "building-in-earth",
    title: "Building in Earth",
    dek: "Mud, straw and lime, on a hillside, for a thousand years. Why the walls lean inward and what happens when nobody re-renders them.",
    intro: [
      "The south of Morocco is built almost entirely of the ground it stands on. Rammed earth and adobe, mixed on site, laid in courses, and rendered with more of the same. It is cheap, it is cool in summer, and it needs maintaining every few years or it goes back to being a field.",
      "Read in order, this is a course in how earth architecture works: the material, the household, the village, the collective granary, and the city that grew out of the same technique.",
    ],
    storySlugs: [
      "the-kasbahs",
      "route-thousand-kasbahs",
      "the-ksour",
      "the-fortress-of-grain",
      "the-riad",
      "the-medina-logic",
      "medina-atlas",
      "the-gates",
      "the-oldest-room-in-marrakech",
      "the-tadelakt-masters",
      "colour-index-morocco",
      "al-haouz-earthquake",
    ],
    placeSlugs: [],
  },
  {
    slug: "the-mountains",
    title: "The Mountains",
    dek: "Six ranges, four rock ages, and two of them are open when the one everybody climbs is shut.",
    intro: [
      "The Atlas is not one mountain range. It is several, made of different rock, raised at different times, and walkable in different months. The Anti-Atlas is two billion years old. The High Atlas is still rising.",
      "This sequence runs from the geology up through the people who move across it twice a year, and ends where the mountains meet the sand.",
    ],
    storySlugs: [
      "the-collision",
      "atlas-mountains",
      "four-peaks-morocco",
      "beyond-toubkal",
      "vertical-migration",
      "the-transhumance",
      "the-monkeys-in-the-cedars",
      "the-gorge",
      "the-road-of-a-thousand-bends",
      "the-volcano-under-the-cedar-trees",
      "the-galleries",
      "calendar-of-light",
    ],
    placeSlugs: [],
  },
  {
    slug: "the-three-deserts",
    title: "Three Deserts",
    dek: "Erg, hammada, and a stone plain forty minutes from Marrakech. Only one of them has any sand in it.",
    intro: [
      "The Sahara that appears in photographs is a small fraction of the Sahara that exists. Most of it is flat rock. Some of it was under water. One of it is close enough to Marrakech for lunch.",
      "This sequence sorts out which is which, how each one was formed, and what still lives in them.",
    ],
    storySlugs: [
      "the-three-deserts",
      "the-hammada",
      "the-desert-that-is-not-a-desert",
      "the-moving-mountains",
      "the-other-dunes",
      "the-singing-sands",
      "the-green-sahara",
      "the-fossil-souk",
      "the-phosphate-fossils",
      "the-camps",
      "the-desert-camp",
      "the-camel-souk",
    ],
    placeSlugs: [],
  },
  {
    slug: "the-loom-and-the-kiln",
    title: "The Loom and the Kiln",
    dek: "Ten years to be trusted with a hammer. What the trades actually do, and how long each one takes to learn.",
    intro: [
      "A maallem is not a job title anyone applies for. It is the end of an apprenticeship that starts in childhood, and the length is different for every trade — ten years for a zellige cutter, four for a man turning spindles on a bow lathe.",
      "This sequence goes trade by trade, and ends with the room that four of them build together, from the floor to the ceiling.",
    ],
    storySlugs: [
      "alphabet-of-craft",
      "the-zellige-cutters",
      "geometry-of-zellige",
      "the-tadelakt-masters",
      "the-thuya-woodworkers",
      "shadow-of-the-moucharabieh",
      "the-carpenters-fondouk",
      "moroccan-pottery-guide",
      "the-pottery-of-tamegroute",
      "the-tannery",
      "the-babouche-makers",
      "the-silver-capital",
      "carpet-atlas",
      "the-carpet",
      "the-carpet-weavers",
      "the-indigo-trail",
      "the-square-that-still-hammers",
    ],
    placeSlugs: [],
  },
  {
    slug: "the-calendar",
    title: "The Calendar",
    dek: "Three calendars run at once here. The state uses one, the mosque another, and the fields a third.",
    intro: [
      "A Moroccan household keeps three dates in its head: the Gregorian one for school and work, the Hijri one for Ramadan and the Eids, and an agricultural calendar inherited from Rome that decides when to plant.",
      "This sequence explains how they interlock, why Ramadan moves backwards through the seasons, and what the year actually looks like from the inside.",
    ],
    storySlugs: [
      "moroccan-calendar",
      "ramadan-moon",
      "moroccan-iftar",
      "the-call",
      "calendar-of-light",
      "why-friday-is-different",
      "couscous-friday",
      "the-festival-calendar",
      "the-moussems",
      "seasonal-produce-wheel",
      "morocco-harvest-calendar",
      "yennayer-amazigh-new-year",
      "pulse-of-the-medina",
      "moroccan-souk-guide",
    ],
    placeSlugs: [],
  },
  {
    slug: "the-pantry",
    title: "The Pantry",
    dek: "Butter buried for seven years, meat kept a year under its own fat, lemons in salt. What a household did with a surplus before there were fridges.",
    intro: [
      "Almost every distinctive Moroccan flavour is a preservation technique that outlived the need for it. Salt, fat, sun and time, applied to a glut so that the glut was still there in February.",
      "This sequence runs through the jars on the shelf, then out to where their contents are grown, pressed, picked and gathered.",
    ],
    storySlugs: [
      "the-preserved-lemons",
      "smen",
      "khlii",
      "ras-el-hanout",
      "moroccan-spice-guide",
      "spice-routes-morocco",
      "moroccan-olives",
      "olive-oil-economy",
      "amlou",
      "the-saffron-harvest",
      "inzerki-apiary",
      "the-sugar-loaf",
      "the-apothecary",
      "seasonal-produce-wheel",
      "morocco-harvest-calendar",
    ],
    placeSlugs: [],
  },
  {
    slug: "sweet-things-and-the-street",
    title: "Sweet Things and the Street",
    dek: "Eaten standing up, bought by weight, and made in enormous batches weeks before anybody needs them.",
    intro: [
      "The food a Moroccan household puts out for guests and the food a Moroccan buys on the way to work are two different cuisines, and neither of them appears on a restaurant menu.",
      "One is judged by cracks and thinness and made in quantities that would supply a shop. The other is one man selling one thing from one cart, at one hour of the day.",
    ],
    storySlugs: [
      "moroccan-street-food",
      "maakouda",
      "moroccan-pastries",
      "kaab-el-ghzal",
      "ghriba",
      "the-oyster-lagoon",
    ],
    placeSlugs: [],
  },
  {
    slug: "women-who-held-power",
    title: "Women Who Held Power",
    dek: "A queen who fought the Arab conquest, a governor who ran the western Mediterranean, a woman who founded the oldest university on earth, and the ones who still decide how a night goes.",
    intro: [
      "This is not a list of exceptions. It runs from the seventh century to this week, and the through-line is authority that was real rather than ceremonial — territory governed, armies commanded, institutions founded, ceremonies directed.",
      "It ends where it begins, with women whose names nobody wrote down.",
    ],
    storySlugs: [
      "the-warrior-queen",
      "the-nafzawiyya",
      "the-queen-who-built-fez",
      "sayyida-al-hurra",
      "the-shareefa-of-ouezzane",
      "lalla-solica",
      "the-music-of-resistance",
      "the-five-women",
      "the-moqaddema",
      "the-carpet-weavers",
      "the-argan-women",
    ],
    placeSlugs: [],
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
