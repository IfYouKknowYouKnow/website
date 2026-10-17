import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { parse } from 'parse5'
import { attr, findAll, htmlToMarkdown, textContent } from './content-formats.mjs'
import { SITE_URL } from '../src/pageMetadata.js'

const { pages } = JSON.parse(await fs.readFile('dist/content/index.json', 'utf8'))
const { pages: records } = JSON.parse(await fs.readFile('dist/content/site.json', 'utf8'))
const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8')
const llms = await fs.readFile('dist/llms.txt', 'utf8')
const fullText = await fs.readFile('dist/llms-full.txt', 'utf8')
const robots = await fs.readFile('dist/robots.txt', 'utf8')
assert.match(robots, /User-agent: \*\s+Allow: \//)
assert.match(robots, /Sitemap: https:\/\/ifykyk\.app\/sitemap.xml/)
assert.equal(new Set(pages.map((page) => page.url)).size, pages.length)
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length)
const knownRoutes = new Set(pages.map((page) => new URL(page.url).pathname))
let linksChecked = 0
for (const page of pages) {
  const route = new URL(page.url).pathname
  const file = route === '/' ? 'index.html' : route.endsWith('/') ? `${route.slice(1)}index.html` : `${route.slice(1)}.html`
  const html = await fs.readFile(`dist/${file}`, 'utf8')
  const tree = parse(html)
  const elements = findAll(tree, (node) => !!node.tagName)
  const select = (tag, name, value) => elements.filter((node) => node.tagName === tag && attr(node, name) === value)
  assert.equal(select('link', 'rel', 'canonical').length, 1, `${route}: one canonical`)
  assert.equal(attr(select('link', 'rel', 'canonical')[0], 'href'), page.url)
  assert.equal(attr(select('meta', 'property', 'og:url')[0] || {}, 'content') || page.url, page.url)
  assert.equal(attr(elements.find((node) => node.tagName === 'link' && attr(node, 'type') === 'text/markdown'), 'href'), page.markdown_url)
  assert.equal(attr(elements.find((node) => node.tagName === 'link' && attr(node, 'type') === 'application/json'), 'href'), page.json_url)
  assert.equal(elements.filter((node) => node.tagName === 'title').length, 1)
  assert.ok(elements.some((node) => node.tagName === 'h1'), `${route}: initial HTML has a heading`)
  assert.ok(htmlToMarkdown(html, page.url).length > 300, `${route}: initial HTML has substantial text`)
  assert.ok(!select('meta', 'name', 'robots').some((node) => /noindex/.test(attr(node, 'content'))))
  const schemaNodes = select('script', 'type', 'application/ld+json')
  assert.equal(schemaNodes.length, 1, `${route}: one structured-data graph`)
  const record = JSON.parse(await fs.readFile(`dist${new URL(page.json_url).pathname}`, 'utf8'))
  assert.deepEqual(record.structured_data, JSON.parse(textContent(schemaNodes[0])))
  assert.equal(record.url, page.url)
  const markdown = await fs.readFile(`dist${new URL(page.markdown_url).pathname}`, 'utf8')
  assert.equal(markdown, record.markdown)
  assert.ok(markdown.includes(htmlToMarkdown(html, page.url)))
  assert.ok(fullText.includes(markdown), `${route}: full text export contains the public page`)
  assert.ok(llms.includes(page.markdown_url))
  assert.ok(sitemap.includes(`<loc>${page.url}</loc>`))
  if (route === '/') {
    for (const title of ['Start with the living map', 'Explore any city', 'See what friends recommend',
      'Save places from Instagram & TikTok', 'Organize your own recommendations', 'Create and follow curations',
      'Get to know a place', 'Search by vibe with AI']) {
      assert.ok(markdown.includes(title), `/: feature ${title} is extractable`)
    }
    const initialText = textContent(tree).replace(/\s+/g, ' ')
    const exportedText = markdown.replace(/\s+/g, ' ')
    for (const passage of [
      'The map built by people YouKnow.',
      'Instagram, TikTok and Google Maps',
      'Start with people you trust.',
      'Find people who get your taste.',
      'New city. Your friends might already know a place.',
      'Your friends’ favourites shouldn’t be scattered across chats, notes and screenshots.',
      'Ask them to save their spots on YouKnow',
    ]) {
      assert.ok(initialText.includes(passage), `/: initial HTML contains ${passage}`)
      assert.ok(exportedText.includes(passage), `/: text exports contain ${passage}`)
    }
    assert.ok(html.includes('<noscript>'), '/: native fallback reveals expandable feature text')
    assert.deepEqual(JSON.parse(textContent(select('script', 'id', 'landing-stats-data')[0])), record.community_stats)
  }
  for (const faq of (record.structured_data['@graph'] || []).filter((entity) => entity['@type'] === 'FAQPage')) {
    for (const question of faq.mainEntity) {
      assert.ok(textContent(tree).includes(question.name), `${route}: schema question is visible`)
      assert.ok(textContent(tree).includes(question.acceptedAnswer.text), `${route}: schema answer is visible`)
    }
  }
  if (record.places) {
    const embedded = JSON.parse(textContent(select('script', 'id', 'city-guide-data')[0]))
    assert.deepEqual(embedded.places, record.places)
    assert.equal(embedded.path, route)
    const cards = elements.filter((node) => attr(node, 'class') === 'city-place-card')
    assert.equal(cards.length, record.places.length)
    for (const place of record.places) assert.ok(markdown.includes(place.name.trim().replace(/\s+/g, ' ').replace(/([\\`*_\[\]])/g, '\\$1')))
  }
  for (const element of elements.filter((node) => node.tagName === 'a')) {
    const href = attr(element, 'href')
    if (!href || !href.startsWith('/')) continue
    const url = new URL(href, SITE_URL)
    if (url.pathname === route && url.hash) {
      assert.ok(elements.some((node) => attr(node, 'id') === decodeURIComponent(url.hash.slice(1))), `${route}: anchor ${href} exists`)
    }
    if (knownRoutes.has(url.pathname) || /^\/(place|invite|list|community|l)(\/|$)/.test(url.pathname)) continue
    await fs.access(`dist${url.pathname}`)
    linksChecked++
  }
}
assert.equal(records.length, pages.length)
assert.match(await fs.readFile('dist/404.html', 'utf8'), /noindex/)
const netlify = await fs.readFile('netlify.toml', 'utf8')
assert.match(netlify, /to = "\/404.html"\s+status = 404/)
// Netlify matches /city and /city/ as the same URL, including placeholders.
// A browser redirect between them prevents crawlers from reaching the guide.
for (const block of netlify.split(/^\[\[redirects\]\]\s*$/m).slice(1)) {
  const from = block.match(/^\s*from\s*=\s*"([^"]+)"/m)?.[1]
  const to = block.match(/^\s*to\s*=\s*"([^"]+)"/m)?.[1]
  const status = Number(block.match(/^\s*status\s*=\s*(\d+)/m)?.[1] || 301)
  if (!from || !to || status < 300 || status >= 400) continue
  const normalize = (value) => new URL(value, SITE_URL).href.replace(/\/+$/, '')
  assert.notEqual(normalize(from), normalize(to), `Redirect loop after trailing-slash normalization: ${from} → ${to}`)
}
console.log(`[crawlability] ${pages.length} pages: initial HTML, canonicals, schema, FAQs, guide records, alternate formats, sitemap and links passed (${linksChecked} asset links).`)
