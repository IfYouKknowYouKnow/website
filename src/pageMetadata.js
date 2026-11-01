import { FALLBACK_STATS, getFaqItems } from './landingContent.js'

export const SITE_URL = 'https://ifykyk.app'
const APP_ICON = `${SITE_URL}/icons/youknow-icon-192.png`

export function pageContentPaths(route) {
  const stem = route === '/' ? '/index' : route.endsWith('/') ? `${route}index` : route
  return { markdown: `${stem}.md`, json: `${stem}.json` }
}

export const homeMetadata = {
  title: 'YouKnow Map | Restaurants, Cafés & Bars From People You Trust',
  description: 'Discover restaurants, cafés and bars recommended by friends and trusted curators. Save your finds and build a map that learns your taste with YouKnow Map.',
  canonical: 'https://ifykyk.app/',
  image: `${SITE_URL}/images/social-cards/home.jpg`,
  imageAlt: 'YouKnow Map: good spots, great people. Discover places through people you trust.',
  imageWidth: 1200, imageHeight: 630,
  card: 'summary_large_image',
}

export const pageMetadata = {
  home: homeMetadata,
  about: {
    title: 'About YouKnow Map | Our Story & Founders',
    description: 'Learn why YouKnow turns restaurant, bar, cafe and experience recommendations from friends and local curators into a personal map.',
    canonical: 'https://ifykyk.app/about',
    image: `${SITE_URL}/images/social-cards/about.jpg`,
    imageAlt: 'YouKnow Map: the people and story behind a map built on good taste.',
    imageWidth: 1200, imageHeight: 630,
  },
  tutorials: {
    title: 'Save Places From Instagram & TikTok | YouKnow Map Tutorials',
    description: 'Learn how to save places in YouKnow from Instagram, TikTok, photos, Google Saved Places, or a manual search.',
    canonical: 'https://ifykyk.app/tutorials',
    image: `${SITE_URL}/images/social-cards/tutorials.jpg`,
    imageAlt: 'YouKnow Map: save places from Instagram, TikTok and Google Maps.',
    imageWidth: 1200, imageHeight: 630,
    card: homeMetadata.card,
  },
}

export function metadataTags(page) {
  return [
    ['meta', 'name', 'description', 'content', page.description],
    ['link', 'rel', 'canonical', 'href', page.canonical],
    ['meta', 'property', 'og:type', 'content', 'website'],
    ['meta', 'property', 'og:site_name', 'content', 'YouKnow Map'],
    ['meta', 'property', 'og:locale', 'content', 'en_US'],
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

export function pageStructuredData(key, { cityCount = FALLBACK_STATS.cities } = {}) {
  const page = pageMetadata[key]
  if (key === 'home') return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'YouKnow',
        alternateName: ['YouKnow Map', 'YK YouKnow'], url: homeMetadata.canonical, logo: APP_ICON,
        founder: [{ '@type': 'Person', name: 'Marie-Louise Dugua' }, { '@type': 'Person', name: 'Fabio Baldini' }] },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'YouKnow Map', alternateName: ['YouKnow', 'YK YouKnow'], url: homeMetadata.canonical,
        publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/#page`, url: page.canonical, name: page.title, description: page.description,
        isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#app` }, inLanguage: 'en' },
      { '@type': 'MobileApplication', '@id': `${SITE_URL}/#app`, name: 'YouKnow Map', alternateName: ['YouKnow', 'YK YouKnow'],
        description: page.description, url: page.canonical, image: APP_ICON,
        applicationCategory: 'LifestyleApplication', operatingSystem: 'iOS, Android',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        inLanguage: ['en', 'de', 'fr', 'it'], publisher: { '@id': `${SITE_URL}/#organization` },
        sameAs: ['https://apps.apple.com/us/app/yk-youknow/id6759484614', 'https://play.google.com/store/apps/details?id=com.youknow.mobile'] },
      { '@type': 'FAQPage', '@id': `${SITE_URL}/#faq`, url: `${SITE_URL}/#faq`,
        mainEntity: getFaqItems(cityCount).map(({ question, answer }) => ({
          '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
        })) },
    ],
  }
  return {
    '@context': 'https://schema.org',
    '@type': key === 'about' ? 'AboutPage' : 'WebPage',
    name: key === 'about' ? 'About YouKnow' : 'YouKnow Tutorials',
    url: page.canonical,
    description: page.description,
    ...(key === 'about' ? {
      mainEntity: {
        '@type': 'Organization',
        name: 'YouKnow',
        alternateName: 'YK YouKnow',
        url: homeMetadata.canonical,
        logo: APP_ICON,
        founder: [
          { '@type': 'Person', name: 'Marie-Louise Dugua' },
          { '@type': 'Person', name: 'Fabio Baldini' },
        ],
        sameAs: [
          'https://apps.apple.com/us/app/yk-youknow/id6759484614',
          'https://play.google.com/store/apps/details?id=com.youknow.mobile',
        ],
      },
    } : {}),
  }
}

export const privacyMetadata = {
  title: 'YouKnow Map Privacy Policy',
  description: 'Read the YouKnow Map privacy policy and how personal information is handled.',
  canonical: `${SITE_URL}/privacy`, image: homeMetadata.image, card: homeMetadata.card,
}

export function cityMetadata(guide) {
  return { ...homeMetadata,
    title: `${guide.topicSlug ? guide.title : `${guide.city} Restaurants, Cafés & Bars`} | YouKnow Map`,
    description: guide.topicSlug ? guide.intro : `Find restaurants, cafés, bars and places to explore in ${guide.city}, recommended by the YouKnow community. Preview five picks and discover more in the app.`,
    canonical: `${SITE_URL}${guide.path}`,
    image: `${SITE_URL}/images/social-cards/${guide.slug}.jpg`,
    imageAlt: `${guide.city} city guide from YouKnow Map: recommendations from people you trust.`,
  }
}

export function cityStructuredData(guide, places) {
  const page = cityMetadata(guide)
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${page.canonical}#page`, url: page.canonical,
      name: guide.title, description: guide.intro, inLanguage: 'en',
      mainEntity: { '@id': `${page.canonical}#places` } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'YouKnow', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: guide.city, item: `${SITE_URL}/${guide.slug}/` },
      ...(guide.topicSlug ? [{ '@type': 'ListItem', position: 3, name: guide.title, item: page.canonical }] : []),
    ] },
    { '@type': 'ItemList', '@id': `${page.canonical}#places`, name: guide.sectionTitle,
      numberOfItems: places.length, itemListElement: places.map((place, index) => ({
        '@type': 'ListItem', position: index + 1, item: {
          '@type': 'Place', '@id': `${SITE_URL}/place/${place.id}`, name: place.name,
          description: place.description || undefined, address: place.address || undefined,
          url: `${SITE_URL}/place/${place.id}`,
        },
      })) },
    { '@type': 'FAQPage', mainEntity: guide.faq.map(({ question, answer }) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })) },
  ] }
}
