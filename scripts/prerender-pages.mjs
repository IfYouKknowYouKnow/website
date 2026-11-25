import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer, loadEnv } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { escapeHtml, formatLinks, htmlToMarkdown, machinePaths } from './content-formats.mjs'

const template = await fs.readFile('dist/index.html', 'utf8')
const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const offline = process.env.PRERENDER_OFFLINE === '1'
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
})
const pages = []
const untranslatedPlaces = {}
const staticPages = []   // written after all languages are rendered
const siteSections = []
let SITE_URL, LOCALES, LOCALE_NAMES, missingTranslations, locales

function pageHtml(page, schema, markup, route, { records, stats } = {}) {
  let html = template.replace('<html lang="en">', `<html lang="${page.locale}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
  for (const [tag, attribute, name, valueAttribute, value] of metadata.metadataTags(page)) {
    const pattern = new RegExp(`<${tag}\\s+${attribute}="${name}"[^>]*>`)
    const element = `<${tag} ${attribute}="${name}" ${valueAttribute}="${escapeHtml(value)}" />`
    html = pattern.test(html) ? html.replace(pattern, element) : html.replace('</head>', `${element}\n</head>`)
  }
  html = html.replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/,
    `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
  // Tell search engines which URL serves each language of this page.
  const hreflang = (page.alternates || []).map(({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`).join('\n')
  if (hreflang) html = html.replace('</head>', `${hreflang}\n</head>`)
  if (records) html = html.replace('</head>', `<script id="city-guide-data" type="application/json">${JSON.stringify({ path: page.path, locale: page.locale, places: records }).replaceAll('<', '\\u003c')}</script>\n</head>`)
  if (stats) html = html.replace('</head>', `<script id="landing-stats-data" type="application/json">${JSON.stringify(stats)}</script>\n</head>`)
  return html.replace('</head>', `${formatLinks(route)}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
}

async function emit(route, page, schema, html, extra = {}) {
  const file = route.endsWith('/') ? `${route.slice(1)}index.html` : `${route.slice(1)}.html`
  await fs.mkdir(path.dirname(`dist/${file}`), { recursive: true })
  await fs.writeFile(`dist/${file}`, html)
  const formats = machinePaths(route)
  const markdown = `Source: ${page.canonical}\n\n${htmlToMarkdown(html, page.canonical)}`
  const record = { url: page.canonical, title: page.title, description: page.description, language: page.locale,
    ...(page.alternates ? { alternates: page.alternates } : {}),
    markdown_url: `${SITE_URL}${formats.markdown}`, json_url: `${SITE_URL}${formats.json}`,
    markdown, structured_data: schema, ...extra }
  await fs.writeFile(`dist${formats.markdown}`, markdown)
  await fs.writeFile(`dist${formats.json}`, JSON.stringify(record, null, 2) + '\n')
  pages.push({ route, file, ...record })
}

async function publicPlaces(guide, selectPlaces, normalizePlaces, buildPlacesUrl, topicFallbackPlaces) {
  if (!offline && env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(buildPlacesUrl(guide, env.VITE_SUPABASE_URL), {
        headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` },
        signal: AbortSignal.timeout(20000),
      })
      if (!response.ok) throw new Error(`Public places returned ${response.status}`)
      const places = selectPlaces(guide, await response.json())
      if (places.length) return { places, source: 'public-database' }
    } catch {
      console.warn(`[prerender] ${guide.path}: using checked-in public records`)
    }
  }
  const fallback = guide.fallbackPlaces?.length ? guide.fallbackPlaces : topicFallbackPlaces[guide.fallbackKey]
  return { places: normalizePlaces(fallback), source: 'checked-in-public-records' }
}

async function publicStats(FALLBACK_STATS, normalizeLandingStats) {
  if (!offline && env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
    try {
      const url = new URL(`/rest/v1/${env.VITE_SUPABASE_STATS_TABLE || 'website_stats'}`, env.VITE_SUPABASE_URL)
      url.searchParams.set('id', `eq.${env.VITE_SUPABASE_STATS_ROW_ID || 'landing'}`)
      url.searchParams.set('select', 'curated_places_count,city_count')
      url.searchParams.set('limit', '1')
      const response = await fetch(url, {
        headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` },
        signal: AbortSignal.timeout(20000),
      })
      if (!response.ok) throw new Error('Public stats unavailable')
      const [row] = await response.json()
      if (row) return { stats: normalizeLandingStats({ curatedPlaces: row.curated_places_count, cities: row.city_count }), source: 'public-database' }
    } catch {
      console.warn('[prerender] /: using checked-in community counts')
    }
  }
  return { stats: FALLBACK_STATS, source: 'checked-in-community-counts' }
}

let metadata
try {
  // Load the app's modules through Vite once, so pages and metadata share one language registry.
  const i18nModule = await server.ssrLoadModule('/src/i18n.js')
  metadata = await server.ssrLoadModule('/src/pageMetadata.js')
  const guideModule = await server.ssrLoadModule('/src/cityGuides.js')
  const { TEAM, founderPath } = await server.ssrLoadModule('/src/team.js')
  const { FALLBACK_STATS, normalizeLandingStats } = await server.ssrLoadModule('/src/landingContent.js')
  const { default: topicFallbackPlaces } = await server.ssrLoadModule('/src/cityGuideTopicPlaces.js')
  const staticModule = await server.ssrLoadModule('/src/staticPages.js')
  const components = {}
  for (const name of ['Landing', 'About', 'Tutorials', 'Download', 'Cities', 'Founder', 'CityGuide']) components[name] = (await server.ssrLoadModule(`/src/pages/${name}.jsx`)).default
  ;({ SITE_URL } = metadata)
  ;({ LOCALES, LOCALE_NAMES, missingTranslations } = i18nModule)
  // PRERENDER_LOCALES=en,de limits the export while working on one language.
  locales = process.env.PRERENDER_LOCALES ? process.env.PRERENDER_LOCALES.split(',') : LOCALES
  const { cityGuides, resolveCityGuide, selectPlaces, normalizePlaces, buildPlacesUrl, localizePlaces } = guideModule

  // Community numbers and place records are the same in every language; read them once.
  const landingSnapshot = await publicStats(FALLBACK_STATS, normalizeLandingStats)
  const guideKeys = Object.values(cityGuides).flatMap((guide) => [[guide.slug], ...Object.keys(guide.topics).map((topic) => [guide.slug, topic])])
  // The public database cancels statements after a few seconds, and thirty guide queries
  // at once exceed that. Read a few guides at a time.
  const snapshots = new Array(guideKeys.length)
  let next = 0
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < guideKeys.length) {
      const index = next++
      const [city, topic] = guideKeys[index]
      snapshots[index] = await publicPlaces(resolveCityGuide(city, topic), selectPlaces, normalizePlaces, buildPlacesUrl, topicFallbackPlaces)
    }
  }))

  for (const locale of locales) {
    await i18nModule.loadLocale(locale)
    const i18n = i18nModule.createI18n(locale)
    const placeCopy = await i18nModule.loadPlaceCopy(locale)
    const render = (Component, route, props) => renderToString(
      React.createElement(i18nModule.I18nProvider, { locale },
        React.createElement(StaticRouter, { location: `${i18n.prefix}${route}`, basename: i18n.prefix || undefined },
          React.createElement(Component, props))))

    for (const [key, name] of [['home', 'Landing'], ['about', 'About'], ['tutorials', 'Tutorials'], ['download', 'Download'], ['cities', 'Cities']]) {
      const page = metadata.getPageMetadata(key, i18n)
      const stats = key === 'home' ? landingSnapshot.stats : undefined
      const schema = metadata.pageStructuredData(key, i18n, stats ? { cityCount: stats.cities } : undefined)
      const route = `${i18n.prefix}${page.path}`
      await emit(route, page, schema, pageHtml(page, schema, render(components[name], page.path, { initialStats: stats }), route, { stats }),
        stats ? { community_stats: stats, stats_source: landingSnapshot.source } : {})
    }

    // One profile page per founder, so a search for either name has a page of its own to land on.
    for (const person of TEAM) {
      const page = metadata.founderMetadata(person, i18n)
      const schema = metadata.founderStructuredData(person, i18n)
      const route = `${i18n.prefix}${page.path}`
      await emit(route, page, schema, pageHtml(page, schema, render(components.Founder, page.path, { initialFounder: person }), route))
    }

    if (locale === 'en') {
      // Publish the complete existing legal notice at its canonical URL, without an iframe dependency.
      const { privacyMetadata } = metadata
      const policy = await fs.readFile('public/privacy.html', 'utf8')
      const policySchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: privacyMetadata.title, url: privacyMetadata.canonical }
      const policyHtml = policy.replace(/<html>/i, '<!doctype html>\n<html lang="en">').replace('</head>',
        `<meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="description" content="${escapeHtml(privacyMetadata.description)}" /><link rel="canonical" href="${privacyMetadata.canonical}" />${formatLinks('/privacy')}<script id="page-structured-data" type="application/ld+json">${JSON.stringify(policySchema)}</script></head>`)
      await emit('/privacy', privacyMetadata, policySchema, policyHtml)
    }

    for (let index = 0; index < guideKeys.length; index++) {
      const [citySlug, topicSlug] = guideKeys[index]
      const guide = resolveCityGuide(citySlug, topicSlug, i18n.guides)
      const { places: records, source } = snapshots[index]
      if (!records.length) throw new Error(`No public records for ${guide.path}`)
      const places = localizePlaces(guide, records, placeCopy)
      if (placeCopy) for (const place of records) if (!placeCopy.descriptions[place.id] && place.description) (untranslatedPlaces[locale] ||= new Set()).add(place.name)
      const page = metadata.cityMetadata(guide, i18n)
      const schema = metadata.cityStructuredData(guide, places, i18n)
      const route = `${i18n.prefix}${page.path}`
      await emit(route, page, schema,
        pageHtml(page, schema, render(components.CityGuide, page.path, { initialGuide: guide, initialRecords: places }), route, { records: places }),
        { places, places_source: source })
    }
    // The list of all pages, grouped the way a visitor would look for them, and this language's 404 page.
    const own = pages.filter((page) => page.language === locale)
    const label = (page) => page.title.replace(/ \| YouKnow Map.*$/, '').replace(/^YouKnow Map \| /, '')
    const cityOf = (page) => page.route.slice(i18n.prefix.length).split('/')[1]
    siteSections.push({ locale, groups: [
      { title: 'YouKnow Map', pages: own.filter((page) => !page.places).map((page) => ({ route: page.route, label: label(page) })) },
      ...Object.values(guideModule.getCityGuides(i18n.guides)).map((guide) => (
        { title: guide.city, pages: own.filter((page) => page.places && cityOf(page) === guide.slug).map((page) => ({ route: page.route, label: label(page) })) })),
    ] })
    staticPages.push({ file: `${i18n.prefix.slice(1)}${i18n.prefix ? '/' : ''}404.html`, html: staticModule.notFoundHtml(i18n) })
    if (locale === 'en') staticPages.push({ file: 'sitemap.html', html: () => staticModule.allPagesHtml(i18n, siteSections, `${SITE_URL}/sitemap.html`) })
    console.log(`[prerender] ${locale}: ${own.length} pages as HTML, Markdown and JSON`)
  }
} finally {
  await server.close()
}

// Every visible string must be translated; a missing one would leave English on a translated page.
const missing = Object.entries(missingTranslations).filter(([, keys]) => keys.size)
for (const [locale, keys] of missing) console.error(`[prerender] ${locale}: ${keys.size} untranslated strings\n${[...keys].map((key) => `  - ${key}`).join('\n')}`)
if (missing.length && process.env.ALLOW_UNTRANSLATED !== '1') throw new Error('Untranslated interface strings. Add them to src/locales/ui.<lang>.js.')
// Place descriptions change with the community's picks, so missing ones only warn: the page shows the original text.
for (const [locale, names] of Object.entries(untranslatedPlaces)) console.warn(`[prerender] ${locale}: ${names.size} places without a translated description (${[...names].slice(0, 8).join(', ')}${names.size > 8 ? ', …' : ''}). See docs/seo.md.`)

// Derive discovery resources only from successfully rendered pages. Omit unverified lastmod dates.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pages.map((page) =>
  `  <url><loc>${escapeHtml(page.url)}</loc>${(page.alternates || []).map(({ hreflang, href }) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}"/>`).join('')}</url>`).join('\n')}\n</urlset>\n`
await fs.writeFile('dist/sitemap.xml', sitemap)
const index = pages.map(({ url, title, description, language, markdown_url, json_url }) => ({ url, title, description, language, markdown_url, json_url }))
await fs.mkdir('dist/content', { recursive: true })
await fs.writeFile('dist/content/index.json', JSON.stringify({ name: 'YouKnow', url: `${SITE_URL}/`, languages: locales, pages: index }, null, 2) + '\n')
await fs.writeFile('dist/content/site.json', JSON.stringify({ name: 'YouKnow', pages: pages.map(({ route, file, ...record }) => record) }, null, 2) + '\n')
const byLanguage = (render) => locales.map((locale) => `## ${LOCALE_NAMES[locale]}\n\n${pages.filter((page) => page.language === locale).map(render).join('\n')}`).join('\n\n')
await fs.writeFile('dist/llms.txt', `# YouKnow\n\n> YouKnow is a free iOS and Android app for discovering restaurants, bars, cafes, hotels, clubs and experiences through people you trust. The website is available in English, German, French and Italian.\n\n${byLanguage((page) => `- [${page.title}](${page.markdown_url}): ${page.description}`)}\n\n## Optional\n\n- [Page index](${SITE_URL}/content/index.json): canonical URLs and alternate formats.\n- [Public content](${SITE_URL}/content/site.json): all public page text and guide records as JSON.\n- [Combined text](${SITE_URL}/llms-full.txt): all public pages as Markdown.\n- [Sitemap](${SITE_URL}/sitemap.xml): canonical HTML pages.\n`)
await fs.writeFile('dist/llms-full.txt', pages.map((page) => page.markdown).join('\n---\n\n'))
await fs.writeFile('dist/_headers', pages.map((page) => {
  const { markdown, json } = machinePaths(page.route)
  return [markdown, json].map((route) => `${route}\n  Link: <${page.url}>; rel="canonical", <${SITE_URL}/llms.txt>; rel="describedby"\n  X-Robots-Tag: noindex\n`).join('\n')
}).join('\n'))
for (const { file, html } of staticPages) await fs.writeFile(`dist/${file}`, typeof html === 'function' ? html() : html)
console.log(`[discovery] ${pages.length} public pages exported in ${locales.length} languages`)
