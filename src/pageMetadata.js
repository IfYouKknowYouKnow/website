import { FALLBACK_STATS, getFaqItems } from './landingContent.js'
import { TEAM, founderPath } from './team.js'
import { getCityGuides } from './cityGuides.js'
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, createI18n, localePrefix } from './i18n.js'

export const SITE_URL = 'https://ifykyk.app'
const APP_ICON = `${SITE_URL}/icons/youknow-icon-192.png`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const STORE_URLS = ['https://apps.apple.com/us/app/yk-youknow/id6759484614', 'https://play.google.com/store/apps/details?id=com.youknow.mobile']
const ENGLISH = createI18n()

export function pageContentPaths(route) {
  const stem = route === '/' ? '/index' : route.endsWith('/') ? `${route}index` : route
  return { markdown: `${stem}.md`, json: `${stem}.json` }
}

// `path` is the page's address without a language prefix; every language shares it.
export const localizedUrl = (path, locale) => `${SITE_URL}${localePrefix(locale)}${path}`

// The same page in every language, for hreflang. English is the default for other languages.
export function alternateLinks(path) {
  return [...LOCALES.map((locale) => ({ hreflang: locale, href: localizedUrl(path, locale) })),
    { hreflang: 'x-default', href: localizedUrl(path, DEFAULT_LOCALE) }]
}

function page(i18n, path, fields) {
  return { imageWidth: 1200, imageHeight: 630, card: 'summary_large_image', ...fields,
    path, locale: i18n.locale, canonical: localizedUrl(path, i18n.locale), alternates: alternateLinks(path) }
}

export function getPageMetadata(key, i18n = ENGLISH) {
  const { tr } = i18n
  if (key === 'about') return page(i18n, '/about', {
    title: tr('About YouKnow Map | Founders Marie-Louise Dugua & Fabio Baldini'),
    description: tr('YouKnow Map was founded by Marie-Louise Dugua and Fabio Baldini to turn restaurant, bar and café recommendations from friends and local curators into a personal map.'),
    image: `${SITE_URL}/images/social-cards/about.jpg`,
    imageAlt: tr('YouKnow Map: the people and story behind a map built on good taste.'),
  })
  if (key === 'tutorials') return page(i18n, '/tutorials', {
    title: tr('Save Places From Instagram & TikTok | YouKnow Map Tutorials'),
    description: tr('Learn how to save places in YouKnow from Instagram, TikTok, photos, Google Saved Places, or a manual search.'),
    image: `${SITE_URL}/images/social-cards/tutorials.jpg`,
    imageAlt: tr('YouKnow Map: save places from Instagram, TikTok and Google Maps.'),
  })
  if (key === 'download') return page(i18n, '/download', {
    title: tr('Download YouKnow Map | Free App for iPhone & Android'),
    description: tr('Download YouKnow Map free on the App Store and Google Play. Save places from Instagram, TikTok and Google Maps, and find restaurants, bars and cafés through people you trust.'),
    image: `${SITE_URL}/images/social-cards/home.jpg`,
    imageAlt: tr('YouKnow Map: good spots, great people. Discover places through people you trust.'),
  })
  if (key === 'cities') return page(i18n, '/cities', {
    title: tr('City Guides: Restaurants, Bars, Cafés & Hotels | YouKnow Map'),
    description: tr('Local tips for Zurich, Geneva, Berlin, Milan, Paris and Tokyo: restaurants, bars, cafés and hotels recommended by the YouKnow community.'),
    image: `${SITE_URL}/images/social-cards/home.jpg`,
    imageAlt: tr('YouKnow Map: good spots, great people. Discover places through people you trust.'),
  })
  return page(i18n, '/', {
    title: tr('YouKnow Map | The App for Local Restaurant, Bar & Café Tips'),
    description: tr('YouKnow Map is the free app for local recommendations: restaurants, cafés, bars and hotels from friends and trusted curators in Zurich, Geneva, Berlin, Milan and beyond.'),
    image: `${SITE_URL}/images/social-cards/home.jpg`,
    imageAlt: tr('YouKnow Map: good spots, great people. Discover places through people you trust.'),
  })
}

export function metadataTags(page) {
  return [
    ['meta', 'name', 'description', 'content', page.description],
    ['link', 'rel', 'canonical', 'href', page.canonical],
    ['meta', 'property', 'og:type', 'content', 'website'],
    ['meta', 'property', 'og:site_name', 'content', 'YouKnow Map'],
    ['meta', 'property', 'og:locale', 'content', OG_LOCALES[page.locale] || OG_LOCALES[DEFAULT_LOCALE]],
    ['meta', 'property', 'og:url', 'content', page.canonical],
    ['meta', 'property', 'og:title', 'content', page.title],
    ['meta', 'property', 'og:description', 'content', page.description],
    ['meta', 'property', 'og:image', 'content', page.image],
    ['meta', 'property', 'og:image:alt', 'content', page.imageAlt || page.title],
    ['meta', 'property', 'og:image:width', 'content', String(page.imageWidth || 1200)],
    ['meta', 'property', 'og:image:height', 'content', String(page.imageHeight || 630)],
    ['meta', 'name', 'twitter:card', 'content', page.card || 'summary_large_image'],
    ['meta', 'name', 'twitter:title', 'content', page.title],
    ['meta', 'name', 'twitter:description', 'content', page.description],
    ['meta', 'name', 'twitter:image', 'content', page.image],
    ['meta', 'name', 'twitter:image:alt', 'content', page.imageAlt || page.title],
  ]
}

const founderUrl = (person, locale) => localizedUrl(founderPath(person), locale)
// Founder profiles keep one identity across languages: the English profile URL.
const founderId = (person) => `${founderUrl(person, DEFAULT_LOCALE)}#person`

// One Person entity per founder, with a stable @id shared by every page that mentions them.
function founderEntity(person, { tr, locale }) {
  return { '@type': 'Person', '@id': founderId(person), name: person.name,
    jobTitle: tr('{role}, YouKnow Map', { role: tr(person.role) }), url: founderUrl(person, locale),
    description: tr('{name} is co-founder of YouKnow Map and leads {leads}.', { name: person.name, leads: tr(person.leads) }),
    worksFor: { '@id': ORGANIZATION_ID },
    alumniOf: person.alumniOf.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    sameAs: [person.linkedin] }
}

function organizationEntity(i18n) {
  return { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'YouKnow',
    alternateName: ['YouKnow Map', 'YK YouKnow', 'You Know Map'], url: `${SITE_URL}/`, logo: APP_ICON,
    description: i18n.tr('YouKnow Map is a free iOS and Android app for discovering restaurants, cafés, bars and hotels through recommendations from friends, locals and trusted curators.'),
    founder: TEAM.map((person) => founderEntity(person, i18n)), sameAs: STORE_URLS }
}

function breadcrumbs(items) {
  return { '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], index) => (
    { '@type': 'ListItem', position: index + 1, name, item })) }
}

export function founderMetadata(person, i18n = ENGLISH) {
  const { tr } = i18n
  return page(i18n, founderPath(person), {
    title: tr('{name} | Co-founder of YouKnow Map', { name: person.name }),
    description: tr('{name} is co-founder of YouKnow Map, the app for restaurant, bar, café and hotel recommendations from people you trust. Role, background and LinkedIn.', { name: person.name }),
    image: `${SITE_URL}/images/social-cards/about.jpg`,
    imageAlt: tr('{name}, co-founder of YouKnow Map.', { name: person.name }),
  })
}

export function founderStructuredData(person, i18n = ENGLISH) {
  const page = founderMetadata(person, i18n)
  const { tr, locale } = i18n
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'ProfilePage', '@id': `${page.canonical}#page`, url: page.canonical, name: page.title,
      description: page.description, inLanguage: locale, isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': founderId(person) } },
    founderEntity(person, i18n),
    { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'YouKnow', alternateName: ['YouKnow Map', 'YK YouKnow'],
      url: `${SITE_URL}/`, logo: APP_ICON },
    breadcrumbs([['YouKnow', localizedUrl('/', locale)], [tr('About'), localizedUrl('/about', locale)], [person.name, page.canonical]]),
  ] }
}

export function pageStructuredData(key, i18n = ENGLISH, { cityCount = FALLBACK_STATS.cities } = {}) {
  const page = getPageMetadata(key, i18n)
  const { tr, locale } = i18n
  if (key === 'home') return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationEntity(i18n),
      { '@type': 'WebSite', '@id': WEBSITE_ID, name: 'YouKnow Map', alternateName: ['YouKnow', 'YK YouKnow', 'You Know Map', 'YouKnow App'], url: `${SITE_URL}/`,
        publisher: { '@id': ORGANIZATION_ID }, inLanguage: LOCALES },
      { '@type': 'WebPage', '@id': `${page.canonical}#page`, url: page.canonical, name: page.title, description: page.description,
        isPartOf: { '@id': WEBSITE_ID }, about: { '@id': `${SITE_URL}/#app` }, inLanguage: locale },
      { '@type': 'MobileApplication', '@id': `${SITE_URL}/#app`, name: 'YouKnow Map', alternateName: ['YouKnow', 'YK YouKnow'],
        description: page.description, url: page.canonical, image: APP_ICON,
        applicationCategory: 'LifestyleApplication', operatingSystem: 'iOS, Android',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        inLanguage: ['en', 'de', 'fr', 'it'], publisher: { '@id': ORGANIZATION_ID },
        sameAs: STORE_URLS },
      { '@type': 'FAQPage', '@id': `${page.canonical}#faq`, url: `${page.canonical}#faq`,
        mainEntity: getFaqItems(cityCount, i18n).map(({ question, answer }) => ({
          '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
        })) },
    ],
  }
  if (key === 'about') return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'AboutPage', '@id': `${page.canonical}#page`, name: tr('About YouKnow'), url: page.canonical,
        description: page.description, inLanguage: locale, isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': ORGANIZATION_ID } },
      organizationEntity(i18n),
      breadcrumbs([['YouKnow', localizedUrl('/', locale)], [tr('About'), page.canonical]]),
    ],
  }
  if (key === 'download') return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${page.canonical}#page`, url: page.canonical, name: page.title, description: page.description,
        inLanguage: locale, isPartOf: { '@id': WEBSITE_ID }, mainEntity: { '@id': `${SITE_URL}/#app` } },
      { '@type': 'MobileApplication', '@id': `${SITE_URL}/#app`, name: 'YouKnow Map', alternateName: ['YouKnow', 'YK YouKnow'],
        description: page.description, url: page.canonical, image: APP_ICON,
        applicationCategory: 'LifestyleApplication', operatingSystem: 'iOS, Android',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        installUrl: STORE_URLS, publisher: { '@id': ORGANIZATION_ID }, sameAs: STORE_URLS },
      breadcrumbs([['YouKnow', localizedUrl('/', locale)], [tr('Download'), page.canonical]]),
    ],
  }
  if (key === 'cities') return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${page.canonical}#page`, url: page.canonical, name: page.title, description: page.description,
        inLanguage: locale, isPartOf: { '@id': WEBSITE_ID } },
      { '@type': 'ItemList', itemListElement: Object.values(getCityGuides(i18n.guides)).map((guide, index) => (
        { '@type': 'ListItem', position: index + 1, name: guide.title, url: localizedUrl(guide.path, locale) })) },
      breadcrumbs([['YouKnow', localizedUrl('/', locale)], [tr('City guides'), page.canonical]]),
    ],
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: tr('YouKnow Tutorials'),
    url: page.canonical,
    description: page.description,
    inLanguage: locale,
  }
}

// The privacy notice is a legal text and is published in English only.
export const privacyMetadata = {
  title: 'YouKnow Map Privacy Policy',
  description: 'Read the YouKnow Map privacy policy and how personal information is handled.',
  path: '/privacy', locale: DEFAULT_LOCALE, canonical: `${SITE_URL}/privacy`,
  image: `${SITE_URL}/images/social-cards/home.jpg`, card: 'summary_large_image',
}

// `guide` is already built from the language's copy, so its text is localized.
export function cityMetadata(guide, i18n = ENGLISH) {
  return page(i18n, guide.path, {
    title: `${guide.topicSlug ? guide.seoTitle || guide.title : guide.meta.title} | YouKnow Map`,
    description: guide.topicSlug ? guide.metaDescription || guide.intro : guide.meta.description,
    image: `${SITE_URL}/images/social-cards/${guide.slug}.jpg`,
    imageAlt: i18n.tr('{city} city guide from YouKnow Map: recommendations from people you trust.', { city: guide.city }),
  })
}

const PLACE_TYPES = { restaurant: 'Restaurant', bar: 'BarOrPub', wine_bar: 'BarOrPub', cafe: 'CafeOrCoffeeShop',
  hotel: 'Hotel', bakery: 'Bakery', club: 'NightClub', museum: 'Museum' }

// Use the most specific schema.org type the place's own categories support.
function placeType(place, guide) {
  const labels = place.category_labels || []
  const preferred = (guide.requiredCategories || []).find((label) => labels.includes(label))
  return PLACE_TYPES[preferred] || PLACE_TYPES[labels.find((label) => PLACE_TYPES[label])] || 'Place'
}

export function cityStructuredData(guide, places, i18n = ENGLISH) {
  const page = cityMetadata(guide, i18n)
  const { locale } = i18n
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${page.canonical}#page`, url: page.canonical,
      name: guide.title, description: guide.intro, inLanguage: locale, isPartOf: { '@id': WEBSITE_ID },
      about: { '@type': 'City', name: guide.city },
      mainEntity: { '@id': `${page.canonical}#places` } },
    breadcrumbs([['YouKnow', localizedUrl('/', locale)], [guide.city, localizedUrl(`/${guide.slug}/`, locale)],
      ...(guide.topicSlug ? [[guide.title, page.canonical]] : [])]),
    { '@type': 'ItemList', '@id': `${page.canonical}#places`, name: guide.sectionTitle,
      numberOfItems: places.length, itemListElement: places.map((place, index) => ({
        '@type': 'ListItem', position: index + 1, item: {
          '@type': placeType(place, guide), '@id': `${SITE_URL}/place/${place.id}`, name: place.name,
          description: place.description || undefined, address: place.address || undefined,
          url: `${SITE_URL}/place/${place.id}`,
        },
      })) },
    { '@type': 'FAQPage', mainEntity: guide.faq.map(({ question, answer }) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })) },
  ] }
}
