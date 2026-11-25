// Collects what the translated city guides need from the place records: the description
// of every place a guide currently shows (live picks plus the checked-in fallbacks), and
// the tag and category labels printed on its card. The output is the source for
// src/locales/places.<lang>.js. Run with: npm run i18n:places -- <output.json>
// With no output path, it reports which shown places still lack a translation.
import fs from 'node:fs/promises'
import { loadEnv } from 'vite'
import { buildPlacesUrl, cityGuides, displayTags, normalizePlaces, resolveCityGuide, selectPlaces } from '../src/cityGuides.js'
import topicFallbackPlaces from '../src/cityGuideTopicPlaces.js'

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const guides = Object.values(cityGuides).flatMap((city) => [city, ...Object.keys(city.topics).map((topic) => resolveCityGuide(city.slug, topic))])
const places = new Map(); const tags = new Set(); const categories = new Set()
function collect(guide, records) {
  for (const place of records) {
    if (place.description) places.set(place.id, { id: place.id, name: place.name.trim(), city: guide.queryCity, description: place.description })
    for (const tag of displayTags(place, guide.topicSlug)) tags.add(tag)
    for (const label of place.category_labels.slice(0, 2)) categories.add(label)
  }
}
for (const guide of guides) {
  collect(guide, normalizePlaces(guide.fallbackPlaces?.length ? guide.fallbackPlaces : topicFallbackPlaces[guide.fallbackKey]))
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) continue
  const response = await fetch(buildPlacesUrl(guide, env.VITE_SUPABASE_URL), {
    headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` }, signal: AbortSignal.timeout(15000) })
  if (response.ok) collect(guide, selectPlaces(guide, await response.json()))
}
const source = { places: [...places.values()], tags: [...tags].sort(), categories: [...categories].sort() }
if (process.argv[2]) {
  await fs.writeFile(process.argv[2], JSON.stringify(source, null, 2) + '\n')
  console.log(`[places] ${source.places.length} descriptions, ${source.tags.length} tags, ${source.categories.length} categories → ${process.argv[2]}`)
} else {
  for (const locale of ['de', 'fr', 'it']) {
    const { default: copy } = await import(`../src/locales/places.${locale}.js`)
    const missing = source.places.filter((place) => !copy.descriptions[place.id])
    const labels = [...source.tags.filter((tag) => !copy.tags[tag]), ...source.categories.filter((label) => !copy.categories[label])]
    console.log(`[places] ${locale}: ${source.places.length - missing.length}/${source.places.length} descriptions translated${missing.length ? `; missing: ${missing.map((place) => place.name).join(', ')}` : ''}${labels.length ? `; untranslated labels: ${labels.join(', ')}` : ''}`)
  }
}
