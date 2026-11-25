// Two stand-alone pages that are plain HTML rather than part of the app: the
// "page not found" page (served for any unknown address, so it cannot rely on the
// router) and the list of all pages. Both use the site's look and are written
// once per language by scripts/prerender-pages.mjs.
import { LOCALES, LOCALE_NAMES } from './i18n.js'

const escape = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const STYLES = `
@font-face { font-family: 'Hanken Grotesk'; font-style: normal; font-weight: 100 900; font-display: swap; src: url('/fonts/hanken-grotesk-variable.ttf') format('truetype'); }
* { box-sizing: border-box; margin: 0; }
body { min-height: 100vh; display: flex; flex-direction: column; background: #fcfcfb; color: #23252a; font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 18px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
a:focus-visible { outline: 2px solid #86c6fd; outline-offset: 4px; }
.wrap { width: min(1280px, calc(100% - 48px)); margin-inline: auto; }
header { background: #ffffffed; border-bottom: 1px solid #23252a14; }
header .wrap { display: flex; align-items: center; justify-content: space-between; gap: 24px; min-height: 82px; }
header img { display: block; width: 145px; height: auto; }
.button { display: inline-flex; align-items: center; gap: 14px; min-height: 48px; padding: 12px 22px; border: 1px solid #23252a; border-radius: 999px; background: #23252a; color: #fff; font-size: 16px; font-weight: 600; box-shadow: 0 5px 0 #23252a10; transition: background .2s, color .2s; }
.button:hover { background: #395a75; border-color: #395a75; }
.button.quiet { background: #fff; color: #23252a; border-color: #d5dfe5; box-shadow: none; }
.button.quiet:hover { background: #e5eef5; color: #23252a; border-color: #d5dfe5; }
.eyebrow { display: block; color: #686d73; font-size: 15px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
h1 { font-size: clamp(44px, 7vw, 92px); font-weight: 650; line-height: 1; letter-spacing: -.05em; text-wrap: balance; }
h1 span { color: #395a75; }
footer { margin-top: auto; border-top: 1px solid #23252a14; color: #686d73; font-size: 14px; }
footer .wrap { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; padding-block: 24px; }
footer nav { display: flex; flex-wrap: wrap; gap: 8px 20px; font-weight: 600; }
footer a:hover { color: #395a75; }

.lost { flex: 1; display: grid; align-items: center; padding-block: clamp(56px, 10vw, 120px); background: linear-gradient(100deg, #ffffffe6, #ffffff99), url('/images/onboarding/zurich-map.jpg') center / cover; }
.lost p { max-width: 520px; margin-top: 26px; color: #4b5560; font-size: clamp(20px, 2.2vw, 23px); line-height: 1.6; }
.lost h1 { margin-top: 20px; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 36px; }
.pin { display: inline-grid; place-items: center; width: 56px; height: 56px; margin-bottom: 28px; border: 1px solid #fff; border-radius: 18px; background: #fff; box-shadow: 0 22px 44px -8px #1f29371a, 0 2px 6px #1f29370f; font-size: 26px; }

.pages { padding-block: clamp(48px, 7vw, 96px); }
.pages h1 { margin-top: 18px; font-size: clamp(40px, 6vw, 76px); }
.pages > .wrap > p { max-width: 600px; margin-top: 22px; color: #686d73; font-size: 20px; line-height: 1.6; }
.languages { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 30px; }
.languages .button { min-height: 40px; padding: 8px 18px; }
.language { margin-top: clamp(48px, 6vw, 80px); padding-top: 28px; border-top: 1px solid #23252a14; scroll-margin-top: 24px; }
.language h2 { font-size: clamp(28px, 3.4vw, 40px); font-weight: 650; letter-spacing: -.045em; }
.groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-top: 24px; }
.group { padding: 24px; border: 1px solid #fff; border-radius: 24px; background: #fff; box-shadow: 0 22px 44px -8px #1f29371a, 0 2px 6px #1f29370f; }
.group h3 { font-size: 22px; font-weight: 650; letter-spacing: -.04em; }
.group ul { display: grid; gap: 8px; margin-top: 14px; padding: 0; list-style: none; color: #4b5560; font-size: 17px; }
.group a { text-decoration: underline; text-decoration-color: #cad7df; text-underline-offset: 4px; }
.group a:hover { color: #395a75; }
`

function shell({ locale, title, description, head = '', body, i18n }) {
  const { tr, href } = i18n
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
${head}
<link rel="icon" type="image/png" href="/youknow-favicon.png">
<link rel="preload" href="/fonts/hanken-grotesk-variable.ttf" as="font" type="font/ttf" crossorigin>
<style>${STYLES}</style>
</head>
<body>
<header><div class="wrap">
<a href="${href('/')}" aria-label="${escape(tr('YouKnow home'))}"><img src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" width="145" height="43"></a>
<a class="button" href="${href('/download')}">${escape(tr('Get YouKnow'))}</a>
</div></header>
${body}
<footer><div class="wrap">
<span>${escape(tr('© 2026 YouKnow by Marie-Louise Dugua & Fabio Baldini'))}</span>
<nav aria-label="${escape(tr('Footer navigation'))}">
<a href="${href('/about')}">${escape(tr('Our story'))}</a>
<a href="${href('/cities')}">${escape(tr('City guides'))}</a>
<a href="${href('/tutorials')}">${escape(tr('How to save'))}</a>
<a href="/privacy">${escape(tr('Privacy'))}</a>
</nav>
</div></footer>
</body>
</html>
`
}

export function notFoundHtml(i18n) {
  const { tr, href, locale } = i18n
  return shell({ locale, i18n, title: `${tr('Page not found')} | YouKnow Map`, description: tr('This page is not on the map.'),
    head: '<meta name="robots" content="noindex">',
    body: `<main class="lost"><div class="wrap">
<div class="pin" aria-hidden="true">📍</div>
<span class="eyebrow">${escape(tr('404 · Page not found'))}</span>
<h1>${escape(tr('Do you want'))}<br><span>${escape(tr('to know?'))}</span></h1>
<p>${escape(tr('This page is not on the map. The good spots are, though, and we know where to find them.'))}</p>
<div class="actions">
<a class="button" href="${href('/')}">${escape(tr('Take me home'))} <span aria-hidden="true">→</span></a>
<a class="button quiet" href="${href('/cities')}">${escape(tr('City guides'))}</a>
<a class="button quiet" href="${href('/download')}">${escape(tr('Download the app'))}</a>
</div>
</div></main>` })
}

// `sections` is one entry per language: { locale, groups: [{ title, pages: [{ route, label }] }] }.
export function allPagesHtml(i18n, sections, canonical) {
  const { tr, locale } = i18n
  return shell({ locale, i18n, title: `${tr('All pages')} | YouKnow Map`,
    description: tr('Every page and city guide on the YouKnow Map website, in English, German, French and Italian.'),
    head: `<link rel="canonical" href="${canonical}">`,
    body: `<main class="pages"><div class="wrap">
<span class="eyebrow">${escape(tr('All pages'))}</span>
<h1>${escape(tr('Everything on the map.'))}</h1>
<p>${escape(tr('Every page and city guide on the YouKnow Map website, in English, German, French and Italian.'))}</p>
<nav class="languages" aria-label="${escape(tr('Language'))}">${LOCALES.map((code) => `<a class="button quiet" href="#${code}" hreflang="${code}">${LOCALE_NAMES[code]}</a>`).join('')}</nav>
${sections.map((section) => `<section class="language" id="${section.locale}" lang="${section.locale}">
<h2>${LOCALE_NAMES[section.locale]}</h2>
<div class="groups">${section.groups.map((group) => `<div class="group"><h3>${escape(group.title)}</h3><ul>${group.pages.map((page) =>
    `<li><a href="${page.route}">${escape(page.label)}</a></li>`).join('')}</ul></div>`).join('')}</div>
</section>`).join('\n')}
</div></main>` })
}
