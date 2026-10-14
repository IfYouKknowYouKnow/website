import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer, loadEnv } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { metadataTags, pageMetadata, pageStructuredData, privacyMetadata, cityMetadata, cityStructuredData, SITE_URL } from '../src/pageMetadata.js'
import { buildPlacesUrl, cityGuides, normalizePlaces, resolveCityGuide } from '../src/cityGuides.js'
import { escapeHtml, formatLinks, htmlToMarkdown, machinePaths } from './content-formats.mjs'
import { FALLBACK_STATS, normalizeLandingStats } from '../src/landingContent.js'

const template = await fs.readFile('dist/index.html', 'utf8')
const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const offline = process.env.PRERENDER_OFFLINE === '1'
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
})
const pages = []

function pageHtml(page, schema, markup, route, records, stats) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
  for (const [tag, attribute, name, valueAttribute, value] of metadataTags(page)) {
    const pattern = new RegExp(`<${tag}\\s+${attribute}="${name}"[^>]*>`)
    if (!pattern.test(html)) throw new Error(`Missing ${name} in HTML template`)
    html = html.replace(pattern, `<${tag} ${attribute}="${name}" ${valueAttribute}="${escapeHtml(value)}" />`)
  }
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
  if (records) html = html.replace('</head>', `<script id="city-guide-data" type="application/json">${JSON.stringify({ path: route, places: records }).replaceAll('<', '\\u003c')}</script>\n</head>`)
  if (stats) html = html.replace('</head>', `<script id="landing-stats-data" type="application/json">${JSON.stringify(stats)}</script>\n</head>`)
  return html.replace('</head>', `${formatLinks(route)}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
}

async function emit(route, file, page, schema, html, extra = {}) {
  await fs.mkdir(path.dirname(`dist/${file}`), { recursive: true })
  await fs.writeFile(`dist/${file}`, html)
  const formats = machinePaths(route)
  const markdown = `Source: ${page.canonical}\n\n${htmlToMarkdown(html, page.canonical)}`
  const record = { url: page.canonical, title: page.title, description: page.description, language: 'en',
    markdown_url: `${SITE_URL}${formats.markdown}`, json_url: `${SITE_URL}${formats.json}`,
    markdown, structured_data: schema, ...extra }
  await fs.writeFile(`dist${formats.markdown}`, markdown)
  await fs.writeFile(`dist${formats.json}`, JSON.stringify(record, null, 2) + '\n')
  pages.push({ route, file, ...record })
  console.log(`[prerender] ${route}: HTML, Markdown and JSON`)
}

async function publicPlaces(guide) {
  if (!offline && env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(buildPlacesUrl(guide, env.VITE_SUPABASE_URL), {
        headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` },
        signal: AbortSignal.timeout(8000),
      })
      if (!response.ok) throw new Error(`Public places returned ${response.status}`)
      const places = normalizePlaces(await response.json())
      if (places.length) return { places, source: 'public-database' }
    } catch {
      console.warn(`[prerender] ${guide.path}: using checked-in public records`)
    }
  }
  return { places: normalizePlaces(guide.fallbackPlaces), source: 'checked-in-public-records' }
}

async function publicStats() {
  if (!offline && env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
    try {
      const url = new URL(`/rest/v1/${env.VITE_SUPABASE_STATS_TABLE || 'website_stats'}`, env.VITE_SUPABASE_URL)
      url.searchParams.set('id', `eq.${env.VITE_SUPABASE_STATS_ROW_ID || 'landing'}`)
      url.searchParams.set('select', 'curated_places_count,city_count')
      url.searchParams.set('limit', '1')
      const response = await fetch(url, {
        headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` },
        signal: AbortSignal.timeout(8000),
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

try {
  const landingSnapshot = await publicStats()
  for (const [key, name, file] of [['home', 'Landing', 'index.html'], ['about', 'About', 'about.html'], ['tutorials', 'Tutorials', 'tutorials.html']]) {
    const page = pageMetadata[key]
    const route = new URL(page.canonical).pathname
    const { default: Component } = await server.ssrLoadModule(`/src/pages/${name}.jsx`)
    const stats = key === 'home' ? landingSnapshot.stats : undefined
    const markup = renderToString(React.createElement(StaticRouter, { location: route }, React.createElement(Component, { initialStats: stats })))
    const schema = pageStructuredData(key, stats ? { cityCount: stats.cities } : undefined)
    await emit(route, file, page, schema, pageHtml(page, schema, markup, route, undefined, stats),
      stats ? { community_stats: stats, stats_source: landingSnapshot.source } : {})
  }

  // Publish the complete existing legal notice at its canonical URL, without an iframe dependency.
  const policy = await fs.readFile('public/privacy.html', 'utf8')
  const policySchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: privacyMetadata.title, url: privacyMetadata.canonical }
  const policyHtml = policy.replace(/<html>/i, '<!doctype html>\n<html lang="en">').replace('</head>',
    `<meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="description" content="${escapeHtml(privacyMetadata.description)}" /><link rel="canonical" href="${privacyMetadata.canonical}" />${formatLinks('/privacy')}<script id="page-structured-data" type="application/ld+json">${JSON.stringify(policySchema)}</script></head>`)
  await emit('/privacy', 'privacy.html', privacyMetadata, policySchema, policyHtml)

  const { default: CityGuide } = await server.ssrLoadModule('/src/pages/CityGuide.jsx')
  const guides = Object.values(cityGuides).flatMap((guide) => [guide, ...Object.values(guide.topics || {}).map((topic) => resolveCityGuide(guide.slug, topic.slug))])
  const snapshots = await Promise.all(guides.map(publicPlaces))
  for (let index = 0; index < guides.length; index++) {
    const guide = guides[index]
    const { places, source } = snapshots[index]
    if (!places.length) throw new Error(`No public records for ${guide.path}`)
    const page = cityMetadata(guide)
    const schema = cityStructuredData(guide, places)
    const markup = renderToString(React.createElement(StaticRouter, { location: guide.path },
      React.createElement(CityGuide, { initialGuide: guide, initialRecords: places })))
    await emit(guide.path, `${guide.path.slice(1)}index.html`, page, schema,
      pageHtml(page, schema, markup, guide.path, places), { places, places_source: source })
  }
} finally {
  await server.close()
}

// Derive discovery resources only from successfully rendered pages. Omit unverified lastmod dates.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escapeHtml(page.url)}</loc></url>`).join('\n')}\n</urlset>\n`
await fs.writeFile('dist/sitemap.xml', sitemap)
const index = pages.map(({ url, title, description, markdown_url, json_url }) => ({ url, title, description, markdown_url, json_url }))
await fs.mkdir('dist/content', { recursive: true })
await fs.writeFile('dist/content/index.json', JSON.stringify({ name: 'YouKnow', url: `${SITE_URL}/`, pages: index }, null, 2) + '\n')
await fs.writeFile('dist/content/site.json', JSON.stringify({ name: 'YouKnow', pages: pages.map(({ route, file, ...record }) => record) }, null, 2) + '\n')
await fs.writeFile('dist/llms.txt', `# YouKnow\n\n> YouKnow is a free iOS and Android app for discovering restaurants, bars, cafes, clubs and experiences through people you trust.\n\n## Public pages\n\n${pages.map((page) => `- [${page.title}](${page.markdown_url}): ${page.description}`).join('\n')}\n\n## Optional\n\n- [Page index](${SITE_URL}/content/index.json): canonical URLs and alternate formats.\n- [Public content](${SITE_URL}/content/site.json): all public page text and guide records as JSON.\n- [Combined text](${SITE_URL}/llms-full.txt): all public pages as Markdown.\n- [Sitemap](${SITE_URL}/sitemap.xml): canonical HTML pages.\n`)
await fs.writeFile('dist/llms-full.txt', pages.map((page) => page.markdown).join('\n---\n\n'))
await fs.writeFile('dist/_headers', pages.map((page) => {
  const { markdown, json } = machinePaths(page.route)
  return [markdown, json].map((route) => `${route}\n  Link: <${page.url}>; rel="canonical", <${SITE_URL}/llms.txt>; rel="describedby"\n  X-Robots-Tag: noindex\n`).join('\n')
}).join('\n'))
await fs.writeFile('dist/sitemap.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>All pages | YouKnow</title><meta name="description" content="Browse YouKnow pages and city guides."><link rel="canonical" href="${SITE_URL}/sitemap.html"></head><body><main><h1>YouKnow pages and city guides</h1><ul>${pages.map((page) => `<li><a href="${page.route}">${escapeHtml(page.title)}</a></li>`).join('')}</ul><p><a href="/content/index.json">JSON page index</a> · <a href="/llms.txt">Markdown page index</a></p></main></body></html>`)
await fs.writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | YouKnow</title></head><body><main><h1>Page not found</h1><p><a href="/">Explore YouKnow</a> or <a href="/sitemap.html">browse our pages and guides</a>.</p></main></body></html>')
console.log(`[discovery] ${pages.length} public pages exported`)
