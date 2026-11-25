import communityPlaces from './cityGuideCommunityPlaces.js'
import enCopy from './locales/guides.en.js'

const ZURICH_PLACES = [
  {
    id: 'fd6d6d30-cb3d-46c2-b522-b4d54975d2d4',
    name: 'BQM Kulturcafé & Bar',
    description:
      'Rooftop bar with panoramic city views, live music, karaoke, and affordable drinks. Popular with students and locals, featuring outdoor seating, a lively atmosphere, and a great spot for after-work hangouts.',
    category_labels: ['bar', 'cafe'],
    tags: [
      'Chill',
      'Good for groups',
      'Lively',
      'Local favourite',
      'Great drinks',
      'Live music',
      'After-work',
      'budget-friendly',
      'rooftop',
    ],
    hard_tags: ['coffee', 'outdoor', 'live-music', 'pub', 'budget', 'rooftop', 'karaoke'],
    address: 'Leonhardstrasse 34, 8092 Zürich, Switzerland',
    city: 'Zurich',
    emoji: '🍻',
    save_count: 54,
    recommendation_count: 47,
  },
  {
    id: '2c2b4c4a-9882-4e9c-b6d6-3fbc2c8c2efa',
    name: 'Haus Hiltl',
    description:
      "The world's oldest continuously operating vegetarian restaurant since 1898, housed in an elegant corner building near Bahnhofstrasse with over 100 homemade dishes. Vibrant yet relaxed atmosphere blending chic decor with cozy nooks, featuring a legendary buffet, à la carte dining, patisserie, and cooking academy.",
    category_labels: ['restaurant', 'bar', 'cafe', 'takeaway'],
    tags: [
      'buffet',
      'Chill',
      'Great food',
      'Great for dates',
      'lively',
      'Romantic',
      'vegetarian',
      'healthy',
      'cozy',
    ],
    hard_tags: ['vegetarian', 'swiss', 'vegan', 'historic', 'brunch', 'coffee'],
    address: 'Sihlstrasse 28, 8001 Zürich, Switzerland',
    city: 'Zurich',
    emoji: '🥗',
    save_count: 30,
    recommendation_count: 26,
  },
  {
    id: '2e1ea0f1-69c8-4101-9ece-b3a4c1e7ed47',
    name: 'Hiltl Dachterrasse',
    description:
      "Soar above Zurich's bustling Bahnhofstrasse in a glass lift to discover vegetarian cuisine and specialty coffees. Two airy, verdant terraces offer serene respite with panoramic views of the vibrant shopping district.",
    category_labels: ['restaurant', 'bar', 'cafe'],
    tags: [
      'Chill',
      'Cool',
      'Cosy',
      'Elegant',
      'After-work',
      'Great food',
      'Great for dates',
      'Romantic',
      'Rooftop',
    ],
    hard_tags: ['vegetarian', 'specialty-coffee', 'rooftop', 'outdoor', 'viewpoint', 'vegan'],
    address: 'Bahnhofstrasse 88, 8001 Zürich, Switzerland',
    city: 'Zurich',
    emoji: '🥗',
    save_count: 28,
    recommendation_count: 23,
  },
]

const MILCHBAR = {
  id: '8396e44e-705a-4a2c-99e6-7998ab1edfad',
  name: 'Milchbar',
  description:
    'Bright café concept serving coffee, breakfast, and light fare throughout the day. Modern, friendly atmosphere with attentive service in the heart of the business district near Paradeplatz. Known for accommodating staff and quality beverages in a relaxed setting.',
  category_labels: ['cafe', 'bar', 'restaurant'],
  tags: [
    'cozy',
    'solo friendly',
    'daytime',
    'local favourite',
    'lively',
    'romantic',
    'after work',
    'brunch spot',
    'trendy',
  ],
  hard_tags: ['coffee', 'outdoor', 'specialty-coffee', 'tea', 'brunch', 'dessert'],
  address: 'Kappelergasse 16, Zürich, 8001 Zürich, Switzerland',
  city: 'Zurich',
  emoji: '☕',
  save_count: 26,
  recommendation_count: 17,
}

const CAFE_HENRICI = {
  id: 'd156c152-e927-4711-b223-6e1bd592d427',
  name: 'Café Henrici',
  description:
    'A modern coffee-focused locale inspired by San Francisco\'s vibrant café culture, serving expertly crafted espressos and creative coffee cocktails. The kitchen delights throughout the day with crispy flammkuchen, eggs, pastries, and premium coffee creations.',
  category_labels: ['cafe', 'bar', 'restaurant'],
  tags: [
    'all-day',
    'breakfast',
    'coffee-culture',
    'Cosy',
    'Great for dates',
    'Intimate',
    'Local favourite',
    'Romantic',
    'Value for money',
  ],
  hard_tags: ['coffee', 'specialty-coffee', 'brunch', 'bakery', 'outdoor', 'tea'],
  address: 'Niederdorfstrasse 1, 8001 Zürich, Switzerland',
  city: 'Zurich',
  emoji: '☕',
  save_count: 24,
  recommendation_count: 18,
}

const MONOCLE_CAFE = {
  id: 'cf25dbcb-324b-4c55-b200-1eced7f195c6',
  name: 'Monocle Shop & Café',
  description:
    'The Monocle Shop & Café Zurich is a cafe in Zürich with outdoor seating, on-site services, takeaway, great coffee, great dessert. Typical price range CHF 10–20.',
  category_labels: ['cafe', 'shop', 'restaurant', 'bar'],
  tags: ['Chill', 'Daytime', 'Elegant', 'Great for dates', 'Local favourite', 'Modern & minimal', 'Trendy', 'cozy'],
  hard_tags: ['coffee', 'concept-store', 'outdoor', 'specialty-coffee', 'books', 'brunch'],
  address: 'Dufourstrasse 90, 8008 Zürich, Switzerland',
  city: 'Zurich',
  emoji: '☕',
  save_count: 10,
  recommendation_count: 9,
}

const SILEX = {
  id: '3fdf7827-365e-4050-92c1-443403e94f10',
  name: 'Silex - Restaurant mit Wein-Fokus',
  description:
    'Silex - Restaurant mit Wein-Fokus is a modern european restaurant in Zürich with outdoor seating, great coffee, great dessert, great wine list, lunch. Typical price range CHF 100+.',
  category_labels: ['restaurant', 'wine_bar', 'bar'],
  tags: ['Cool', 'Chill', 'Cosy', 'Local favourite', 'modern european', 'cozy', 'quiet', 'romantic'],
  hard_tags: ['wine-bar', 'mediterranean', 'fine-dining', 'apero', 'outdoor', 'dessert'],
  address: 'Freyastrasse 3, 8004 Zürich, Switzerland',
  city: 'Zurich',
  emoji: '🍷',
  save_count: 9,
  recommendation_count: 8,
}

ZURICH_PLACES.push(MILCHBAR, CAFE_HENRICI)

const GENEVA_PLACES = [
  {
    id: '5950687f-16af-4dce-8766-b733dd3f2f2e',
    name: 'Soï',
    description:
      'Rainbow neon strips pulse across a compact ceiling while plates of bold Thai bites — including what regulars insist is the best mango sticky rice in town — land on red stools. Gault&Millau-recognised and buzzing well into the evening.',
    category_labels: ['restaurant', 'bar', 'cafe'],
    tags: ['lively', 'trendy', 'authentic', 'hidden gem', 'good for groups', 'casual'],
    address: 'Rue du Prieuré 6, 1202 Genève, Switzerland',
    city: 'Geneva', emoji: '🍜', save_count: 25, recommendation_count: 22,
  },
  {
    id: '2a95c8a2-b7fd-4931-b8c1-4f21d9eb4124',
    name: 'Café de la Bourse',
    description:
      'Natural wines poured alongside charcuterie and fresh tapas in a spot that draws locals after work for relaxed evenings with occasional live music. Passionate about small producers, it doubles as a delicatessen with outdoor seating when the weather cooperates.',
    category_labels: ['bar', 'restaurant', 'cafe', 'wine_bar'],
    tags: ['Cosy', 'Chill', 'Fun', 'local', 'relaxed', 'Romantic'],
    address: 'Rue du Stand 56, 1204 Genève, Switzerland',
    city: 'Geneva', emoji: '☕', save_count: 15, recommendation_count: 11,
  },
  {
    id: 'ce93efca-1036-4491-98bd-d62a7078c673',
    name: 'Le Dim Sum Gourmand',
    description:
      'A women-owned dim sum restaurant in Geneva offering handmade dumplings, vegetarian baozi, and seasonal specialties. Features outdoor seating, wheelchair access, and a cozy atmosphere. Serves coffee, cocktails, and wine. Reservations recommended for lunch and dinner.',
    category_labels: ['restaurant', 'cafe'],
    tags: ['Chill', 'artisanal', 'chinese cuisine', 'dim sum', 'Good for groups', 'Cosy'],
    address: 'Rue du Prieuré 5, 1202 Genève, Switzerland',
    city: 'Geneva', emoji: '🥟', save_count: 15, recommendation_count: 11,
  },
  {
    id: 'bdaf79e1-88b1-41fb-b30f-4b0dcb5ab7f1',
    name: 'Suahoy',
    description:
      'Red neon bathes a long communal table strung with flower garlands, while floor-to-ceiling shelves hold an impressive natural wine selection — the regional Thai recipes here earned a Michelin Bib Gourmand, and the cocktails keep things going well past midnight.',
    category_labels: ['restaurant', 'bar'],
    tags: ['Chill', 'Intimate', 'Cool', 'Fun', 'Lively', 'Cosy'],
    address: 'Rue Prévost-Martin 25, 1205 Genève, Switzerland',
    city: 'Geneva', emoji: '🍜', save_count: 13, recommendation_count: 12,
  },
  {
    id: '51e91c03-9309-427a-a921-8128668d9d7e',
    name: 'Le Thé',
    description:
      'A nine-table gem open since 1994, serving handmade dim sum alongside an extraordinary selection of over 100 Chinese teas. Perpetually busy, intimate in atmosphere, and beloved for its authentic Asian specialities meant for sharing.',
    category_labels: ['restaurant', 'cafe'],
    tags: ['cozy', 'intimate', 'local favourite', 'hidden gem', 'great food', 'great dessert'],
    address: 'Rue des Bains 65, 1205 Genève, Switzerland',
    city: 'Geneva', emoji: '🍵', save_count: 12, recommendation_count: 9,
  },
]

const BERLIN_PLACES = [
  {
    id: '94075f15-6884-440a-bb6d-ea1f59d37966',
    name: 'Weinblatt',
    description:
      'Turkish and Mediterranean deli with housemade pastas, salads, and meze in a cozy, welcoming setting. Offers vegan and vegetarian options, great coffee, and counter service. Popular for breakfast, lunch, dinner, and weekend brunch. Women-owned and cash-only with outdoor seating.',
    category_labels: ['restaurant', 'cafe'],
    tags: ['Chill', 'Cosy', 'Daytime', 'Expat-friendly', 'Good for groups', 'Good service'],
    address: 'Dieffenbachstrasse 59, 10967 Berlin',
    city: 'Berlin', emoji: '🍃', save_count: 8, recommendation_count: 8,
  },
  {
    id: 'f8afa166-fca7-47c5-8869-7e48b9fd1f6c',
    name: 'Atlas Café',
    description:
      'Step into a warm, wood-furnished corner café where subdued lighting and a charming terrace create the perfect escape after a long day. Known for hearty international comfort food and a solid espresso bar, this neighborhood favorite draws a relaxed Kreuzberg crowd of locals and creatives.',
    category_labels: ['restaurant', 'cafe', 'drink', 'eat', 'bar'],
    tags: ['casual', 'Daytime', 'Hidden gem', 'neighborhood', 'relaxed', 'Chill'],
    address: 'Graefestraße 10, 10967 Berlin, Germany',
    city: 'Berlin', emoji: '☕', save_count: 8, recommendation_count: 7,
  },
  {
    id: 'fe460b1e-5e7a-43f6-9f68-3cf5eea13718',
    name: 'Akatsuki Sushi',
    description:
      'Intimate Kreuzberg sushi spot with fresh, meticulously crafted rolls and a warm, cozy atmosphere. Popular with locals for its authentic flavors, reasonable prices, and welcoming vibe—perfect for solo diners, quick bites, or relaxed group meals. Offers outdoor seating and takeaway.',
    category_labels: ['restaurant', 'takeaway'],
    tags: ['Great food', 'Local favourite', 'Value for money', 'Chill', 'Good for groups', 'Good service'],
    address: 'Schönleinstraße 8, 10967 Berlin, Germany',
    city: 'Berlin', emoji: '🍣', save_count: 4, recommendation_count: 4,
  },
  {
    id: '198b2ed3-46d4-4ed2-964d-ccf02d9495e5',
    name: 'Mephisto Coffee & Kitchen',
    description:
      'Chic Berlin café in Kottbusser Tor offering specialty coffee, organic dishes, and creative brunch fare like smoked salmon avocado toast and seasonal salads. Outdoor terrace, cozy interior, and a relaxed vibe make it ideal for work, casual meetups, or a quiet lunch.',
    category_labels: ['cafe', 'restaurant'],
    tags: ['Chill', 'Cosy', 'After-work', 'Cool', 'Fun', 'Intimate'],
    address: 'Graefestraße 10, 10967 Berlin, Germany',
    city: 'Berlin', emoji: '☕', save_count: 4, recommendation_count: 4,
  },
  {
    id: 'ae054240-636f-4222-98e6-35e81054b771',
    name: 'Der Milchladen',
    description:
      'Sunny daytime refuge on a quiet Kreuzberg street, drawing a loyal local crowd for homemade cakes, fresh lunch, and good coffee. Sweet staff, a relaxed pace, and outdoor seating make it an easy weekday favourite that somehow still feels undiscovered.',
    category_labels: ['cafe', 'bar', 'shop', 'restaurant'],
    tags: ['daytime', 'cozy', 'chill', 'hidden gem', 'local favourite', 'laid back'],
    address: 'Dresdener Str. 20, 10999 Berlin, Germany',
    city: 'Berlin', emoji: '🥛', save_count: 4, recommendation_count: 3,
  },
]


// Which places each guide asks for. All wording comes from the language's copy
// module (src/locales/guides.<lang>.js); nothing here is shown to visitors.
const KIND_CONFIG = {
  restaurants: { requiredCategories: ['restaurant'] },
  bars: { requiredCategories: ['bar', 'wine_bar'] },
  cafes: { requiredCategories: ['cafe'] },
  hotels: { requiredCategories: ['hotel'] },
}
const KINDS = Object.keys(KIND_CONFIG)

const ZURICH_TOPIC_CONFIG = {
  'cosy-restaurants': { requiredCategories: ['restaurant'], requiredTerms: ['Cosy', 'cozy'],
    fallbackPlaces: [ZURICH_PLACES[1], ZURICH_PLACES[2], MILCHBAR, CAFE_HENRICI, MONOCLE_CAFE] },
  cafes: { kind: 'cafes', preferPrimaryCategory: true, requiredCategories: ['cafe'], fallbackPlaces: ZURICH_PLACES },
  bars: { kind: 'bars', preferPrimaryCategory: true, requiredCategories: ['bar', 'wine_bar'], fallbackPlaces: ZURICH_PLACES },
  'date-night': { requiredTerms: ['Great for dates', 'great for dates', 'Romantic', 'romantic'],
    fallbackPlaces: [ZURICH_PLACES[1], ZURICH_PLACES[2], MILCHBAR, CAFE_HENRICI, MONOCLE_CAFE] },
  'hidden-gems': { requiredTerms: ['Hidden gem', 'hidden gem', 'Local favourite', 'local favourite'],
    fallbackPlaces: [ZURICH_PLACES[0], MILCHBAR, CAFE_HENRICI, MONOCLE_CAFE, SILEX] },
}

// queryCity is the name stored in the place database. Tokyo has no hotel guide:
// its hotel records are too thin to publish.
const CITY_CONFIG = [
  { slug: 'zurich', queryCity: 'Zurich', kinds: KINDS, fallbackPlaces: ZURICH_PLACES, topics: ZURICH_TOPIC_CONFIG },
  { slug: 'geneva', queryCity: 'Geneva', kinds: KINDS, fallbackPlaces: GENEVA_PLACES },
  { slug: 'berlin', queryCity: 'Berlin', kinds: KINDS, fallbackPlaces: BERLIN_PLACES },
  { slug: 'milan', queryCity: 'Milan', kinds: KINDS, community: true },
  { slug: 'paris', queryCity: 'Paris', kinds: KINDS, community: true },
  { slug: 'tokyo', queryCity: 'Tokyo', kinds: ['restaurants', 'bars', 'cafes'], community: true },
]

function categoryTopic(copy, config, city, kind, existing) {
  const kindCopy = copy.kinds[kind]
  const faq = [kindCopy.faq(city), ...copy.cityFaq(city)]
  const localContext = copy.localContext[config.slug][kind]
  if (existing) return { ...existing, contentSections: [localContext, ...existing.contentSections], faq }
  return {
    slug: kind, kind, ...kindCopy.topic(city), ...KIND_CONFIG[kind], preferPrimaryCategory: true,
    contentSections: [localContext, kindCopy.choosing(city)], faq,
  }
}

function buildCityGuide(copy, config) {
  const city = copy.cities[config.slug]
  // Hand-written topics for this city (only Zurich has them): the copy plus its query filters.
  const custom = Object.fromEntries(Object.entries(config.topics || {}).map(([slug, topicConfig]) =>
    [slug, { slug, ...copy.zurichTopics[slug], ...topicConfig }]))
  const topics = {}
  for (const kind of config.kinds) topics[kind] = categoryTopic(copy, config, city, kind, custom[kind])
  for (const [slug, topic] of Object.entries(custom)) if (!topics[slug]) topics[slug] = topic
  const hub = config.community
    ? { ...copy.communityHub(city), ranking: 'recommendations', contentSections: copy.communitySections[config.slug] }
    : copy.hubs[config.slug]
  return {
    slug: config.slug, city, queryCity: config.queryCity, path: `/${config.slug}/`, ...hub,
    meta: copy.hubMeta(city, config.kinds.includes('hotels')),
    fallbackPlaces: config.fallbackPlaces || communityPlaces[config.slug],
    topics, faq: copy.cityFaq(city),
  }
}

// One set of guides per language, built on first use.
const built = new Map()
export function getCityGuides(copy = enCopy) {
  if (!built.has(copy)) built.set(copy, Object.fromEntries(CITY_CONFIG.map((config) => [config.slug, buildCityGuide(copy, config)])))
  return built.get(copy)
}

// English guides, for scripts and anything that only needs slugs and paths.
export const cityGuides = getCityGuides()

export const categoryLabels = (copy = enCopy) => Object.fromEntries(KINDS.map((kind) => [kind, copy.kinds[kind].plural]))

export const PUBLIC_PLACE_LIMIT = 5

export function resolveCityGuide(citySlug, topicSlug, copy = enCopy) {
  const cityGuide = getCityGuides(copy)[citySlug]
  if (!cityGuide) return null
  if (!topicSlug) return cityGuide

  const topic = cityGuide.topics?.[topicSlug]
  if (!topic) return null
  return {
    ...cityGuide,
    ...topic,
    slug: cityGuide.slug,
    path: `/${cityGuide.slug}/${topic.slug}/`,
    topicSlug: topic.slug,
    topics: cityGuide.topics,
    faq: topic.faq || cityGuide.faq,
    fallbackPlaces: topic.fallbackPlaces || [],
    fallbackKey: `${cityGuide.slug}/${topic.slug}`,
  }
}

export function buildPlacesUrl(guide, supabaseUrl) {
  const url = new URL('/rest/v1/places', supabaseUrl)
  url.searchParams.set(
    'select',
    'id,name,description,category_labels,tags,hard_tags,address,city,emoji,save_count,recommendation_count',
  )
  url.searchParams.set('city', `ilike.${guide.queryCity}`)
  if (guide.requiredCategories?.length) {
    url.searchParams.set('category_labels', `ov.{${guide.requiredCategories.join(',')}}`)
  }
  if (guide.requiredTerms?.length) {
    const values = `{${guide.requiredTerms.join(',')}}`
    url.searchParams.set('or', `(tags.ov.${values},hard_tags.ov.${values})`)
  }
  url.searchParams.set(
    'order',
    guide.ranking === 'recommendations'
      ? 'recommendation_count.desc.nullslast,save_count.desc.nullslast'
      : 'save_count.desc.nullslast,recommendation_count.desc.nullslast',
  )
  // Category guides fetch a wider window so selectPlaces can put real matches first.
  url.searchParams.set('limit', String(guide.preferPrimaryCategory ? PUBLIC_PLACE_LIMIT * 4 : PUBLIC_PLACE_LIMIT))
  return url
}

// A place tagged "museum, restaurant" should not outrank actual restaurants on a
// restaurant guide. Keep the community order, but list primary-category matches first.
export function selectPlaces(guide, rows) {
  if (!Array.isArray(rows) || !guide.preferPrimaryCategory || !guide.requiredCategories?.length) return normalizePlaces(rows)
  const isPrimary = (place) => guide.requiredCategories.includes(place?.category_labels?.[0])
  return normalizePlaces([...rows.filter(isPrimary), ...rows.filter((place) => !isPrimary(place))])
}

export function normalizePlaces(rows) {
  if (!Array.isArray(rows)) return []
  return rows
    .filter((place) => place?.id && place?.name)
    .slice(0, PUBLIC_PLACE_LIMIT)
    .map((place) => ({
      ...place,
      category_labels: Array.isArray(place.category_labels) ? place.category_labels : [],
      tags: Array.isArray(place.tags) ? place.tags : [],
      hard_tags: Array.isArray(place.hard_tags) ? place.hard_tags : [],
    }))
}

export function formatLabel(value = '') {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function displayTags(place, topicSlug) {
  const tags = [...(place.tags || []), ...(place.hard_tags || [])]
  const priorities = topicSlug === 'cosy-restaurants' ? ['cosy', 'cozy'] : []
  return [...tags]
    .sort((a, b) => {
      const aPriority = priorities.includes(a.toLowerCase()) ? 0 : 1
      const bPriority = priorities.includes(b.toLowerCase()) ? 0 : 1
      return aPriority - bPriority
    })
    .filter((tag, index, all) => {
      const normalized = tag.toLowerCase().replace(/-/g, ' ')
      return all.findIndex((item) => item.toLowerCase().replace(/-/g, ' ') === normalized) === index
    })
    .slice(0, 3)
    .map(formatLabel)
}

// Applies a language's place copy (src/locales/places.<lang>.js) to records for one
// guide: the translated description, plus the tag and category labels shown on the card.
// Anything without a translation keeps its original text.
export function localizePlaces(guide, places, placeCopy) {
  if (!placeCopy) return places
  return places.map((place) => ({
    ...place,
    description: placeCopy.descriptions[place.id] || place.description,
    displayCity: guide.city,
    displayTags: displayTags(place, guide.topicSlug).map((tag) => placeCopy.tags[tag] || tag),
    displayCategories: (place.category_labels || []).slice(0, 2).map((label) => placeCopy.categories[label] || formatLabel(label)),
  }))
}
