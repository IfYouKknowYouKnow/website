import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {
  buildPlacesUrl,
  cityGuides,
  displayTags,
  formatLabel,
  normalizePlaces,
  resolveCityGuide,
} from '../src/cityGuides.js'

const root = process.cwd()

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

async function readLocalEnv() {
  try {
    const source = await fs.readFile(path.join(root, '.env'), 'utf8')
    for (const rawLine of source.split(/\r?\n/)) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const separator = line.indexOf('=')
      if (separator < 1) continue
      const key = line.slice(0, separator).trim()
      const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // CI normally provides the VITE_* values directly.
  }
}

async function livePlaces(guide) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) return []
  const response = await fetch(buildPlacesUrl(guide, supabaseUrl), {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`Supabase returned ${response.status}`)
  return normalizePlaces(await response.json())
}

function placeCard(place, topicSlug) {
  const categories = (place.category_labels || []).slice(0, 2).map(formatLabel)
  const tags = displayTags(place, topicSlug)
  const context = [...categories, place.city].filter(Boolean).join(' · ')
  return `<article class="city-place-card">
    <div class="city-place-visual" aria-hidden="true"><span>${escapeHtml(place.emoji || '📍')}</span></div>
    <div class="city-place-copy">
      <p class="city-place-kicker">${escapeHtml(context)}</p>
      <h3>${escapeHtml(place.name)}</h3>
      ${place.address ? `<p class="city-place-address">${escapeHtml(place.address)}</p>` : ''}
      ${place.description ? `<p class="city-place-description">${escapeHtml(place.description)}</p>` : ''}
      ${tags.length ? `<ul class="city-tags" aria-label="${escapeHtml(place.name)} vibes">${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>` : ''}
      <a class="city-place-link" href="/place/${encodeURIComponent(place.id)}">View on YouKnow <span aria-hidden="true">→</span></a>
    </div>
  </article>`
}

function staticMarkup(guide, places) {
  const topicSlug = guide.topicSlug
  const related = Object.values(guide.topics || {}).filter((topic) => topic.slug !== topicSlug)
  return `<div class="city-page">
    <header class="city-nav"><div class="container city-nav-inner">
      <a href="/" aria-label="YouKnow home"><img src="/long_logo.png" alt="YouKnow"></a>
      <nav aria-label="Guide navigation"><a href="/about">About</a><a class="city-nav-button" href="/#download">Get YouKnow</a></nav>
    </div></header>
    <main>
      <section class="city-hero"><div class="container city-hero-inner"><div>
        ${topicSlug ? `<a class="city-back-link" href="/${guide.slug}">← All Zurich places</a>` : ''}
        <p class="city-eyebrow">${escapeHtml(guide.eyebrow)}</p>
        <h1>${escapeHtml(guide.title)}</h1>
        <p class="city-lead">${escapeHtml(guide.intro)}</p>
        <a class="city-primary-button" href="/#download">Find places on YouKnow →</a>
      </div><div class="city-hero-art" aria-hidden="true"><span class="city-art-pin city-art-pin-one">☕</span><span class="city-art-pin city-art-pin-two">🍷</span><span class="city-art-pin city-art-pin-three">🍽️</span><div class="city-art-map-line"></div></div></div></section>
      <section class="city-places-section" aria-labelledby="city-places-heading"><div class="container">
        <div class="city-section-heading"><p class="city-eyebrow">From the YouKnow community</p><h2 id="city-places-heading">${escapeHtml(guide.sectionTitle)}</h2><p>${escapeHtml(guide.sectionIntro)}</p></div>
        <div class="city-place-list">${places.map((place) => placeCard(place, topicSlug)).join('')}</div>
        <aside class="city-continue" aria-label="Continue in YouKnow"><div><p class="city-continue-count">${places.length} places to start</p><h2>${escapeHtml(guide.ctaTitle)}</h2><p>${escapeHtml(guide.ctaBody)}</p></div><a class="city-primary-button city-continue-button" href="/#download">${escapeHtml(guide.ctaLabel)} <span aria-hidden="true">→</span></a></aside>
      </div></section>
      ${guide.contentSections.map((section, index) => `<section class="city-editorial-section ${index % 2 ? 'city-editorial-tint' : ''}"><div class="container city-editorial-inner"><p class="city-section-number">0${index + 1}</p><div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></div></div></section>`).join('')}
      <section class="city-related"><div class="container"><p class="city-eyebrow">Find places for your vibe</p><h2>Explore Zurich your way</h2><div class="city-related-links">${related.map((topic) => `<a href="/${guide.slug}/${topic.slug}">${escapeHtml(topic.title.replace(' in Zurich', '').replace(' Zurich', ''))} <span>→</span></a>`).join('')}</div></div></section>
      <section class="city-faq" aria-labelledby="city-faq-heading"><div class="container city-faq-grid"><div><p class="city-eyebrow">Good to know</p><h2 id="city-faq-heading">Zurich recommendations, explained.</h2></div><div>${guide.faq.map((item, index) => `<details${index === 0 ? ' open' : ''}><summary>${escapeHtml(item.question)}<span aria-hidden="true">+</span></summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}</div></div></section>
    </main>
    <footer class="city-footer"><div class="container city-footer-inner"><a href="/"><img src="/long_logo.png" alt="YouKnow"></a><p>Find places you love from people you trust.</p><div><a href="/about">About</a><a href="/privacy">Privacy</a></div></div></footer>
  </div>`
}

function structuredData(guide, places) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'YouKnow', item: 'https://ifykyk.app/' },
          { '@type': 'ListItem', position: 2, name: guide.city, item: `https://ifykyk.app/${guide.slug}` },
          ...(guide.topicSlug ? [{ '@type': 'ListItem', position: 3, name: guide.title, item: `https://ifykyk.app${guide.path}` }] : []),
        ],
      },
      {
        '@type': 'ItemList',
        name: guide.sectionTitle,
        numberOfItems: places.length,
        itemListElement: places.map((place, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'LocalBusiness',
            '@id': `https://ifykyk.app/place/${place.id}`,
            name: place.name,
            description: place.description || undefined,
            address: place.address || undefined,
            url: `https://ifykyk.app/place/${place.id}`,
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }
}

function pageHtml(template, guide, places) {
  const canonical = `https://ifykyk.app${guide.path}`
  const title = `${guide.title} | YouKnow`
  const json = JSON.stringify(structuredData(guide, places)).replaceAll('<', '\\u003c')
  const embeddedData = JSON.stringify({ path: guide.path, places }).replaceAll('<', '\\u003c')
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(guide.intro)}" />`)
    .replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(guide.intro)}" />`)
    .replace(/<meta name="twitter:title"[^>]*\/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${escapeHtml(guide.intro)}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="city-guide-structured-data" type="application/ld+json">${json}</script>`)
    .replace('</head>', `<script id="city-guide-data" type="application/json">${embeddedData}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticMarkup(guide, places)}</div>`)
}

await readLocalEnv()
const template = await fs.readFile(path.join(root, 'dist', 'index.html'), 'utf8')
const guides = []
for (const cityGuide of Object.values(cityGuides)) {
  guides.push(cityGuide)
  for (const topic of Object.values(cityGuide.topics || {})) {
    guides.push(resolveCityGuide(cityGuide.slug, topic.slug))
  }
}

for (const guide of guides) {
  let places = []
  try {
    places = await livePlaces(guide)
  } catch (error) {
    console.warn(`[prerender] ${guide.path}: ${error.message}`)
  }
  if (places.length === 0) places = normalizePlaces(guide.fallbackPlaces)
  if (places.length === 0) {
    console.warn(`[prerender] Skipping ${guide.path}: no verified records available`)
    continue
  }

  const outputDir = path.join(root, 'dist', ...guide.path.split('/').filter(Boolean))
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'index.html'), pageHtml(template, guide, places))
  console.log(`[prerender] ${guide.path}: ${places.length} public places`)
}
