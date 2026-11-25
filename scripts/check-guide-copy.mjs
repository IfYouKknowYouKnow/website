// Checks that a language's city guide copy (src/locales/guides.<lang>.js) has exactly
// the same shape as the English copy, so every guide can be built in that language.
// Run with: node scripts/check-guide-copy.mjs [de fr it]
import en from '../src/locales/guides.en.js'
import { getCityGuides } from '../src/cityGuides.js'

const locales = process.argv.slice(2).length ? process.argv.slice(2) : ['de', 'fr', 'it']
let problems = 0
const report = (locale, message) => { problems++; console.log(`[guides] ${locale}: ${message}`) }

// Walks both values together; functions are called with sample arguments and their results compared.
function compare(locale, source, target, path, city) {
  if (typeof source === 'function') {
    if (typeof target !== 'function') return report(locale, `${path} should be a function`)
    const args = path === 'hubMeta' ? [[city, true], [city, false]] : [[city]]
    for (const list of args) compare(locale, source(...['City', ...list.slice(1)]), target(...list), `${path}(…)`, city)
    return
  }
  if (Array.isArray(source)) {
    if (!Array.isArray(target) || target.length !== source.length) return report(locale, `${path} should be a list of ${source.length}`)
    source.forEach((item, index) => compare(locale, item, target[index], `${path}[${index}]`, city))
    return
  }
  if (source && typeof source === 'object') {
    if (!target || typeof target !== 'object') return report(locale, `${path} is missing`)
    for (const key of Object.keys(source)) compare(locale, source[key], target[key], path ? `${path}.${key}` : key, city)
    for (const key of Object.keys(target)) if (!(key in source)) report(locale, `${path}.${key} does not exist in English`)
    return
  }
  if (typeof target !== 'string' || !target.trim()) return report(locale, `${path} is missing or empty`)
  if (/\$\{|undefined|\[object/.test(target)) report(locale, `${path} contains broken interpolation: ${target.slice(0, 80)}`)
}

for (const locale of locales) {
  const { default: copy } = await import(`../src/locales/guides.${locale}.js`)
  const before = problems
  compare(locale, en, copy, '', copy.cities?.zurich || 'Zürich')
  let pages = 0, untranslated = 0
  if (problems === before) {
    const english = getCityGuides(en)
    for (const [slug, guide] of Object.entries(getCityGuides(copy))) {
      for (const page of [guide, ...Object.values(guide.topics)]) {
        pages++
        const source = page === guide ? english[slug] : english[slug].topics[page.slug]
        // Search titles and descriptions have length budgets.
        const title = page.seoTitle || page.meta?.title || page.title
        const description = page.metaDescription || page.meta?.description || page.intro
        if (`${title} | YouKnow Map`.length > 70) report(locale, `${slug}/${page.slug === slug ? '' : page.slug}: search title is ${title.length + 14} characters (keep under 70): ${title}`)
        if ((page.metaDescription || page.meta?.description) && description.length > 180) report(locale, `${slug}/${page.slug === slug ? '' : page.slug}: search description is ${description.length} characters (keep under 180)`)
        if (page.intro === source.intro) untranslated++
      }
    }
    if (untranslated) report(locale, `${untranslated} of ${pages} guides still have English text`)
  }
  console.log(`[guides] ${locale}: ${problems === before ? `${pages} guides build correctly` : 'needs fixes'}`)
}
process.exitCode = problems ? 1 : 0
