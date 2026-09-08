export const homeMetadata = {
  title: 'YouKnow App | Friend-Powered Restaurant and Bar Recommendations',
  description: 'YouKnow is an app for discovering restaurants, bars, cafes, clubs, and experiences through recommendations from people you trust.',
  canonical: 'https://ifykyk.app/',
  image: 'https://ifykyk.app/images/iykyk-app-preview.png',
}

export const pageMetadata = {
  about: {
    title: 'About YouKnow | A Map Curated by People You Trust',
    description: 'Learn why YouKnow turns restaurant, bar, cafe and experience recommendations from friends and local curators into a personal map.',
    canonical: 'https://ifykyk.app/about',
    image: 'https://ifykyk.app/images/about-youknow-og.png',
  },
  tutorials: {
    title: 'YouKnow Tutorials | How to Save Places',
    description: 'Learn how to save places in YouKnow from Instagram, TikTok, photos, Google Saved Places, or a manual search.',
    canonical: 'https://ifykyk.app/tutorials',
    image: homeMetadata.image,
  },
}

export function metadataTags(page) {
  return [
    ['meta', 'name', 'description', 'content', page.description],
    ['link', 'rel', 'canonical', 'href', page.canonical],
    ['meta', 'property', 'og:type', 'content', 'website'],
    ['meta', 'property', 'og:url', 'content', page.canonical],
    ['meta', 'property', 'og:title', 'content', page.title],
    ['meta', 'property', 'og:description', 'content', page.description],
    ['meta', 'property', 'og:image', 'content', page.image],
    ['meta', 'name', 'twitter:title', 'content', page.title],
    ['meta', 'name', 'twitter:description', 'content', page.description],
    ['meta', 'name', 'twitter:image', 'content', page.image],
  ]
}

export function pageStructuredData(key) {
  const page = pageMetadata[key]
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
        logo: 'https://ifykyk.app/logo.png',
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
