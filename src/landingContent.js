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

export function getFaqItems(cityCount) {
  return [
    {
      question: 'Is YouKnow free?',
      answer:
        'Yes. YouKnow is completely free to download and use on iOS and Android. You can save places, build your map, follow recommendations and search by vibe without paying for the app.',
    },
    {
      question: 'Which cities is YouKnow available in?',
      answer: `The YouKnow community currently has curated places across ${new Intl.NumberFormat('en-US').format(cityCount)} cities. You can explore recommendations in cities including Zurich, Milan and Paris, and coverage keeps growing as friends and curators add places around the world.`,
    },
    {
      question: 'What kinds of places can I discover?',
      answer:
        'YouKnow helps you find restaurants, bars, cafes, clubs and experiences. Filter the map by category, distance, what is open now, what is trending or the people whose taste you want to follow.',
    },
    {
      question: 'Where do the recommendations come from?',
      answer:
        'Recommendations come from friends, local communities, creators and connoisseurs—not anonymous star ratings. You can explore the wider community or filter the map to see exactly what a particular person has saved.',
    },
    {
      question: 'How can I save a place?',
      answer:
        'Save places directly in YouKnow, share a restaurant or bar from Instagram or TikTok, or add one from a photo. To import a Google Maps list, paste its shared link in YouKnow, select or deselect the places you want, and save them as Want to go or Recommended.',
    },
    {
      question: 'How does search by vibe work?',
      answer:
        'Describe the kind of place or plan you want in natural language—such as a cozy first-date bar or a quiet cafe to work from. YouKnow uses AI to match that request with relevant places on your map.',
    },
    {
      question: 'Which devices and languages are supported?',
      answer:
        'YouKnow is available for iPhone and Android. The app supports English, German, French and Italian.',
    },
  ]
}

