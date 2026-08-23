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

function cityFaq(city) {
  return [
    {
      question: `Where do these ${city} recommendations come from?`,
      answer: `They come from real places saved and recommended in YouKnow. The public guide shows five examples; the app contains the wider ${city} community map.`,
    },
    {
      question: 'Does YouKnow use star ratings?',
      answer:
        'No. YouKnow is built around recommendations from friends, local communities, creators and people whose taste you trust rather than anonymous star ratings.',
    },
    {
      question: `Can I save my own ${city} places?`,
      answer:
        'Yes. In YouKnow you can save places, organise them on your map and share lists with friends or your community.',
    },
  ]
}

const TOPICS = {
  'cosy-restaurants': {
    slug: 'cosy-restaurants',
    title: 'Cosy Restaurants in Zurich',
    eyebrow: 'Zurich by vibe',
    intro:
      'Looking for a cosy dinner in Zurich? Here are five restaurant matches from the YouKnow community to start with, selected using real saves within the cosy restaurant filter.',
    sectionTitle: 'Five cosy Zurich places to try',
    sectionIntro:
      'Each place below is a real YouKnow recommendation with the category, address, description and vibe metadata currently available in the community map.',
    ctaTitle: 'We picked 5. There are more on YouKnow.',
    ctaBody: 'Explore more cosy restaurants in Zurich in the app.',
    ctaLabel: 'Discover more cosy restaurants on YouKnow',
    requiredCategories: ['restaurant'],
    requiredTerms: ['Cosy', 'cozy'],
    fallbackPlaces: [ZURICH_PLACES[1], ZURICH_PLACES[2], MILCHBAR, CAFE_HENRICI, MONOCLE_CAFE],
    contentSections: [
      {
        title: 'What makes a restaurant feel cosy?',
        body: 'A cosy restaurant is less about a formal score and more about context: warm atmosphere, comfortable conversation, welcoming service and the kind of room that suits an unhurried dinner. YouKnow keeps those vibe signals attached to the place so you can search for how an evening should feel.',
      },
      {
        title: 'Where to find cosy restaurants in Zurich',
        body: 'Zurich’s most inviting dinner spots are spread across the centre and its surrounding neighbourhoods, from old-town rooms to relaxed terraces and local café-restaurants. The address on every recommendation helps you place it in the city before opening the full map in YouKnow.',
      },
      {
        title: 'Finding restaurants by vibe instead of rating',
        body: 'A single rating cannot tell you whether a place is right for a quiet date, a lively group dinner or an easy weeknight meal. Searching by vibe adds that missing context and lets recommendations from people you trust do the useful work.',
      },
    ],
  },
  cafes: {
    slug: 'cafes',
    title: 'Cafés in Zurich',
    eyebrow: 'Zurich café guide',
    intro:
      'Looking for coffee in Zurich? Start with five real café recommendations saved by the YouKnow community.',
    sectionTitle: 'Five Zurich cafés to start with',
    sectionIntro: 'These public picks are a small preview of the cafés available on the YouKnow map.',
    ctaTitle: 'Want to keep exploring?',
    ctaBody: 'Find more cafés across Zurich on YouKnow.',
    ctaLabel: 'Discover more Zurich cafés on YouKnow',
    requiredCategories: ['cafe'],
    fallbackPlaces: ZURICH_PLACES,
    contentSections: [
      {
        title: 'Choosing a Zurich café for the moment',
        body: 'The right café depends on the plan: a quick espresso, an unhurried breakfast, a place to work or somewhere to meet a friend. Community tags in YouKnow keep that context visible alongside the address and category.',
      },
      {
        title: 'Coffee recommendations beyond a generic rating',
        body: 'A rating says little about atmosphere or who a café suits. Saved recommendations and descriptive signals make it easier to choose a place that fits the time of day and the experience you want.',
      },
    ],
  },
  bars: {
    slug: 'bars',
    title: 'Bars in Zurich',
    eyebrow: 'Zurich bar guide',
    intro:
      'Looking for a bar in Zurich? Start with five real places saved and recommended by the YouKnow community.',
    sectionTitle: 'Five Zurich bars to try',
    sectionIntro: 'These picks preview the bars and drinking spots available on the community map.',
    ctaTitle: 'The night does not end here.',
    ctaBody: 'Discover more bars in Zurich on YouKnow.',
    ctaLabel: 'Discover more Zurich bars on YouKnow',
    requiredCategories: ['bar', 'wine_bar'],
    fallbackPlaces: ZURICH_PLACES,
    contentSections: [
      {
        title: 'Finding the right kind of bar in Zurich',
        body: 'A rooftop drink, a lively group bar and a quiet wine spot answer different questions. YouKnow combines categories with real vibe tags so you can start with the kind of evening you want.',
      },
      {
        title: 'Why local bar recommendations need context',
        body: 'Useful recommendations explain more than whether someone liked a place. Atmosphere, occasion and community saves help turn a long list of Zurich bars into a smaller set that fits the night.',
      },
    ],
  },
  'date-night': {
    slug: 'date-night',
    title: 'Date Night Places in Zurich',
    eyebrow: 'Zurich by vibe',
    intro:
      'Planning a date night in Zurich? Here are five real places matched with date-friendly or romantic community tags in YouKnow.',
    sectionTitle: 'Five Zurich date-night picks',
    sectionIntro: 'Use these community recommendations as a starting point, then explore the wider map in the app.',
    ctaTitle: 'Find the right place for the two of you.',
    ctaBody: 'Explore more date-night recommendations in Zurich on YouKnow.',
    ctaLabel: 'Discover more date-night places on YouKnow',
    requiredTerms: ['Great for dates', 'great for dates', 'Romantic', 'romantic'],
    fallbackPlaces: [ZURICH_PLACES[1], ZURICH_PLACES[2], MILCHBAR, CAFE_HENRICI, MONOCLE_CAFE],
    contentSections: [
      {
        title: 'Planning a Zurich date night by atmosphere',
        body: 'The best choice depends on whether the evening calls for intimate conversation, a lively room, dinner or drinks. Date-friendly and romantic tags give each recommendation the context a single popularity score cannot.',
      },
      {
        title: 'From a first idea to the full map',
        body: 'Use the five public picks to understand the range, then continue in YouKnow to compare more community recommendations and save the places that suit your own plan.',
      },
    ],
  },
  'hidden-gems': {
    slug: 'hidden-gems',
    title: 'Hidden Gems in Zurich',
    eyebrow: 'Zurich beyond the obvious',
    intro:
      'Looking beyond the obvious Zurich addresses? Start with five real community places tagged as hidden gems or local favourites in YouKnow.',
    sectionTitle: 'Five local Zurich picks',
    sectionIntro: 'These real records are a small preview of the community’s wider Zurich map.',
    ctaTitle: 'There is more beneath the surface.',
    ctaBody: 'Discover more local recommendations across Zurich on YouKnow.',
    ctaLabel: 'Discover more Zurich hidden gems on YouKnow',
    requiredTerms: ['Hidden gem', 'hidden gem', 'Local favourite', 'local favourite'],
    fallbackPlaces: [ZURICH_PLACES[0], MILCHBAR, CAFE_HENRICI, MONOCLE_CAFE, SILEX],
    contentSections: [
      {
        title: 'What makes a Zurich place feel like a local find?',
        body: 'A local find is not defined by obscurity alone. It is often a place people return to, save for friends or value for a particular mood. Community signals help surface that context without inventing a universal hidden-gem ranking.',
      },
      {
        title: 'Explore beyond the five public picks',
        body: 'These five recommendations show the kind of local context available on YouKnow. The app keeps the wider Zurich map, where more saved places can be explored by category, people and vibe.',
      },
    ],
  },
}

export const cityGuides = {
  zurich: {
    slug: 'zurich',
    city: 'Zurich',
    path: '/zurich',
    title: 'Discover Zurich Like a Local',
    eyebrow: 'YouKnow city guide',
    intro:
      'Looking for restaurants, cafés, bars and hidden gems in Zurich? Start with five real places saved and recommended by the YouKnow community.',
    sectionTitle: 'Places to start with in Zurich',
    sectionIntro:
      'These five community picks are ranked using real save activity in YouKnow. They are a useful preview, not the full Zurich map.',
    ctaTitle: 'Want the full list?',
    ctaBody:
      'YouKnow contains more restaurant, café and bar recommendations across Zurich, curated and saved by people in the community.',
    ctaLabel: 'Discover more places in Zurich on YouKnow',
    fallbackPlaces: ZURICH_PLACES,
    topics: TOPICS,
    contentSections: [
      {
        title: 'How to discover Zurich beyond the obvious places',
        body: 'Start with context, not a generic ranking. A recommendation for a quiet coffee serves a different plan from a rooftop drink or a relaxed dinner. YouKnow brings those signals together on a living map shaped by people who actually saved the places.',
      },
      {
        title: 'Why recommendations from people you trust are different',
        body: 'Anonymous ratings flatten every visit into one number. A recommendation from a friend, local curator or community keeps the useful part: who liked the place, what it suits and why it may fit your own plans in Zurich.',
      },
    ],
    faq: cityFaq('Zurich'),
  },
  geneva: {
    slug: 'geneva',
    city: 'Geneva',
    path: '/geneva',
    title: 'Discover Geneva Like a Local',
    eyebrow: 'YouKnow city guide',
    intro:
      'Looking for restaurants, cafés, bars and hidden gems in Geneva? Start with five real places saved and recommended by the YouKnow community.',
    sectionTitle: 'Places to start with in Geneva',
    sectionIntro:
      'These five community picks are ranked using real save activity in YouKnow. They are a useful preview, not the full Geneva map.',
    ctaTitle: 'Want the full list?',
    ctaBody:
      'YouKnow contains more restaurant, café and bar recommendations across Geneva, curated and saved by people in the community.',
    ctaLabel: 'Discover more places in Geneva on YouKnow',
    fallbackPlaces: GENEVA_PLACES,
    topics: {},
    contentSections: [
      {
        title: 'How to discover Geneva beyond the obvious places',
        body: 'Start with the plan rather than a generic ranking. A relaxed lakeside café, an intimate dinner and a lively bar serve different moments. YouKnow keeps those useful signals attached to recommendations from people who saved the places.',
      },
      {
        title: 'Why community recommendations add useful context',
        body: 'Anonymous ratings compress every visit into one number. Recommendations from friends, local curators and communities preserve what a place suits and why it may fit your own plans in Geneva.',
      },
    ],
    faq: cityFaq('Geneva'),
  },
  berlin: {
    slug: 'berlin',
    city: 'Berlin',
    path: '/berlin',
    title: 'Discover Berlin Like a Local',
    eyebrow: 'YouKnow city guide',
    intro:
      'Looking for restaurants, cafés, bars and hidden gems in Berlin? Start with five real places saved and recommended by the YouKnow community.',
    sectionTitle: 'Places to start with in Berlin',
    sectionIntro:
      'These five community picks are ranked using real save activity in YouKnow. They are a useful preview, not the full Berlin map.',
    ctaTitle: 'Want the full list?',
    ctaBody:
      'YouKnow contains more restaurant, café and bar recommendations across Berlin, curated and saved by people in the community.',
    ctaLabel: 'Discover more places in Berlin on YouKnow',
    fallbackPlaces: BERLIN_PLACES,
    topics: {},
    contentSections: [
      {
        title: 'How to discover Berlin beyond the obvious places',
        body: 'Berlin changes block by block and plan by plan. Starting with atmosphere, category and trusted recommendations makes it easier to find a neighbourhood café, dinner spot or late-night bar that fits the moment.',
      },
      {
        title: 'Why local context matters in a city this varied',
        body: 'A single rating cannot explain whether a place suits a quiet morning, a casual group meal or a night out. YouKnow keeps community saves and vibe signals together so recommendations remain useful.',
      },
    ],
    faq: cityFaq('Berlin'),
  },
}

export const PUBLIC_PLACE_LIMIT = 5

export function resolveCityGuide(citySlug, topicSlug) {
  const cityGuide = cityGuides[citySlug]
  if (!cityGuide) return null
  if (!topicSlug) return cityGuide

  const topic = cityGuide.topics?.[topicSlug]
  if (!topic) return null
  return {
    ...cityGuide,
    ...topic,
    slug: cityGuide.slug,
    path: `/${cityGuide.slug}/${topic.slug}`,
    topicSlug: topic.slug,
    topics: cityGuide.topics,
    faq: cityGuide.faq,
    fallbackPlaces: topic.fallbackPlaces || [],
  }
}

export function buildPlacesUrl(guide, supabaseUrl) {
  const url = new URL('/rest/v1/places', supabaseUrl)
  url.searchParams.set(
    'select',
    'id,name,description,category_labels,tags,hard_tags,address,city,emoji,save_count,recommendation_count',
  )
  url.searchParams.set('city', `ilike.${guide.city}`)
  if (guide.requiredCategories?.length) {
    url.searchParams.set('category_labels', `ov.{${guide.requiredCategories.join(',')}}`)
  }
  if (guide.requiredTerms?.length) {
    const values = `{${guide.requiredTerms.join(',')}}`
    url.searchParams.set('or', `(tags.ov.${values},hard_tags.ov.${values})`)
  }
  url.searchParams.set(
    'order',
    'save_count.desc.nullslast,recommendation_count.desc.nullslast',
  )
  url.searchParams.set('limit', String(PUBLIC_PLACE_LIMIT))
  return url
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
