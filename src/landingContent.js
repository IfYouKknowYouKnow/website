export const FALLBACK_STATS = {
  curatedPlaces: 10000,
  cities: 331,
}

export function normalizeLandingStats(stats = {}) {
  return Object.fromEntries(Object.entries(FALLBACK_STATS).map(([key, fallback]) =>
    [key, typeof stats[key] === 'number' && stats[key] > 0 ? stats[key] : fallback]))
}

export function initialLandingStats() {
  if (typeof document === 'undefined') return FALLBACK_STATS
  try {
    return normalizeLandingStats(JSON.parse(document.getElementById('landing-stats-data')?.textContent || '{}'))
  } catch {
    return FALLBACK_STATS
  }
}

// Questions and answers are written in English here and translated through tr().
export function getFaqItems(cityCount, { tr, formatNumber }) {
  return [
    {
      question: tr('What is YouKnow Map?'),
      answer: tr('YouKnow Map, or YouKnow for short, is a free app for iPhone and Android that helps you find restaurants, cafés, bars and hotels through recommendations from friends, locals and trusted curators instead of anonymous star ratings. It was founded by Marie-Louise Dugua and Fabio Baldini.'),
    },
    {
      question: tr('Is YouKnow free?'),
      answer: tr('Yes. YouKnow is completely free to download and use on iOS and Android. You can save places, build your map, follow recommendations and search by vibe without paying for the app.'),
    },
    {
      question: tr('Which cities is YouKnow available in?'),
      answer: tr('The YouKnow community currently has curated places across {count} cities. You can explore recommendations in cities including Zurich, Geneva, Berlin, Milan, Paris and Tokyo, and coverage keeps growing as friends and curators add places around the world.', { count: formatNumber(cityCount) }),
    },
    {
      question: tr('What kinds of places can I discover?'),
      answer: tr('YouKnow helps you find restaurants, bars, cafes, hotels, clubs and experiences. Filter the map by category, distance, what is open now, what is trending or the people whose taste you want to follow.'),
    },
    {
      question: tr('Where do the recommendations come from?'),
      answer: tr('Recommendations come from friends, local communities and creators, alongside independent curations drawn from the Michelin Guide, The World’s 50 Best and La Liste. Follow a guide or a person to explore their picks on the map.'),
    },
    {
      question: tr('How can I save a place?'),
      answer: tr('Save places directly in YouKnow, share a restaurant or bar from Instagram or TikTok, or add one from a photo. To import a Google Maps list, paste its shared link in YouKnow, select or deselect the places you want, and save them as Want to go or Recommended.'),
    },
    {
      question: tr('How does search by vibe work?'),
      answer: tr('Describe the kind of place or plan you want in natural language—such as a cozy first-date bar or a quiet cafe to work from. YouKnow uses AI to match that request with relevant places on your map.'),
    },
    {
      question: tr('Which devices and languages are supported?'),
      answer: tr('YouKnow is available for iPhone and Android. The app supports English, German, French and Italian.'),
    },
  ]
}
