# YouKnow Map SEO

The marketing website exports 157 complete HTML pages in four languages. Each
language has 39 pages: home, story, tutorials, download, the city guide index, two
founder profiles, six city guides, 23 city category guides (restaurants, bars, cafés
and hotels) and three Zurich mood guides. The privacy notice is a legal text and
exists in English only.

`/download` and `/cities` exist so that "download the app" and "city guides" are real
pages with their own titles, linked from the homepage footer and every guide. Google
builds the sub-links under a search result from pages like these; sections of the
homepage cannot become sub-links. The "page not found" page and the list of all pages
(`/sitemap.html`) are plain HTML in the site's design, written per language from
`src/staticPages.js`. The same text is available
to visitors and crawlers before JavaScript runs. The client hydrates this HTML.

## Implemented

- Unique search titles and descriptions, with YouKnow Map branding and city/topic context.
- Canonical URLs, one primary heading per page and crawlable links from the homepage to every public page.
- Organization, WebSite, MobileApplication, page, place-list and breadcrumb structured data. FAQ markup matches visible answers.
- A sitemap generated from the pages actually built, plus robots.txt. No invented rankings, reviews or modification dates.
- Dedicated 1200×630 sharing images for home, story, tutorials and the six cities, with Open Graph and Twitter image descriptions. Artwork source: `scripts/social-card-template.mjs`.
- Smaller responsive app screenshots, an optimized wordmark and lightweight favicon. Original user screenshots remain in the repository.
- Content stays visible before scroll animations run. Video source URLs, still posters and explanatory copy are present in the initial HTML; video playback stays lazy.
- Hashed JavaScript and CSS assets receive long-lived cache headers. Netlify keeps unknown URLs as real 404s and app invitation/share pages out of the index.

## Search targets

| Search | Page that answers it |
| --- | --- |
| "restaurants in Zurich", "bars in Milan", "hotels in Geneva" … | `/{city}/{restaurants,bars,cafes,hotels}/`, titled "Restaurants in Zurich: Local Tips & Top Picks". Tokyo has no hotel guide because its hotel records are too thin. |
| "Zurich restaurants bars hotels", "Zurich local tips" | `/{city}/` hub, which links to every category guide for the city. |
| "Marie-Louise Dugua", "Fabio Baldini" | `/founders/{slug}/`: name in the title, heading and URL, `ProfilePage` and `Person` data with LinkedIn as `sameAs`. The About title also carries both names. |
| "YouKnow", "YouKnow Map", "You Know Map app" | Homepage title, the "What is YouKnow Map?" answer, and `WebSite`/`Organization` names with alternate spellings. |
| "app for restaurant recommendations", "local tips app" | Homepage title and description. |

Category guides are defined in `src/cityGuides.js`: `CATEGORY_KINDS` holds the shared
wording and `LOCAL_CONTEXT` the hand-written neighbourhood paragraph for each city and
category. A guide exists only where both are present. Add a city or category there, then
run `npm run refresh:guides` to update the checked-in records in
`src/cityGuideTopicPlaces.js` (used when the public API is unavailable; the browser loads
that file on demand, so it stays out of the main bundle). Places whose first category
matches the guide are listed first, so a museum with a restaurant does not outrank
restaurants. Founder details live in `src/team.js`.

## Checks

`npm run build` exports the pages and runs `scripts/check-crawlability.mjs`.
The check verifies unique titles/descriptions, headings, canonical URLs, structured
data, visible FAQ content, sharing assets, video sources, sitemap membership,
link reachability, the Markdown/JSON content exports, the category guides for every
city (present, linked from the homepage and city hub, titled with the search phrase) and
the founder profiles (name-led title, `Person` data, linked from About). Use
`PRERENDER_OFFLINE=1 npm run build` to validate the checked-in data without API access.

The built-site browser checks passed at 1440, 390 and 320 px, including retained
server-rendered DOM, interactive mood selection, metadata, optimized images and
no horizontal overflow. Milan, Paris, Tokyo and the Zurich café guide also passed
hydration and cross-city navigation checks. With JavaScript disabled, the
homepage text, personalization section and six city links remain available. All
15 routes returned complete HTML with 200 responses in the local production
preview; an unknown URL returned 404 with noindex. No hydration errors, runtime
errors or failed local assets were observed.

Browser checks use the built files as well as the Vite development preview.
The local production preview is a check of the generated artifacts; Netlify's
live response headers and redirects should also be checked after publishing.

## After deployment

1. In the verified Google Search Console property for `https://ifykyk.app/`, submit `https://ifykyk.app/sitemap.xml`.
2. Inspect the homepage, one category guide per language (for example `/de/zurich/restaurants/`, `/fr/geneva/restaurants/`, `/it/milan/restaurants/`) and both founder profiles with URL Inspection. Confirm the fetched HTML, canonical URL, detected language and indexing status.
3. Monitor search queries, indexed pages and field Core Web Vitals. Use the results to choose further city/topic content based on actual demand and community coverage.

## Languages

English is served from the root (`/zurich/restaurants/`). German, French and Italian
use the same paths under `/de/`, `/fr/` and `/it/` (`/de/zurich/restaurants/`).
`/en/…` redirects to the root, so English has one address per page. Every page names
its counterparts with `hreflang` tags (English is `x-default`), in the HTML head and in
the sitemap, and sets `<html lang>` and `og:locale`. Visitors are never redirected by
browser language; the switcher in the homepage hero and in every footer links to the
same page in each language.

How it fits together:

- `src/i18n.js` holds the list of languages and the `tr()` translator. The router
  basename is the language prefix, so routes and `<Link>`s need no changes per language.
- **Interface strings** are written in English in the components, wrapped in `tr('…')`
  (or `msg('…')` inside data constants), and translated in `src/locales/ui.<lang>.js`,
  where the English string is the key. Placeholders such as `{city}` must be kept.
- **City guide copy** lives in `src/locales/guides.<lang>.js`, one file per language
  with the same shape as `guides.en.js`. `src/cityGuides.js` only holds query
  configuration.
- **Place descriptions and tags** come from the database in English. Translations for
  the places the guides currently show are in `src/locales/places.<lang>.js`, keyed by
  place id. A place without a translation shows its English description, and the build
  prints a warning naming it.

After changing copy or when the community's top picks change:

| Command | What it tells you |
| --- | --- |
| `npm run i18n:check` | Interface strings missing from, or no longer used by, each language. |
| `node scripts/check-guide-copy.mjs` | Whether each language's guide copy matches the English shape and title/description length budgets. |
| `npm run i18n:places` | Which currently shown places lack a translated description. Add `-- file.json` to export the English source for translation. |

`npm run build` fails if any interface string is untranslated, and checks that every
translated page links only within its own language (apart from the switcher and the
privacy notice). `PRERENDER_LOCALES=en,de npm run build` skips the other languages'
pages while working on one, but the final checks expect all four.

Style decisions for the translations: informal address (du / tu / tu), Swiss spelling
in German (ss, no ß), local city names (Zürich, Genève, Milano …), and the founders
described without grammatical gender ("Co-Founder").

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[lazy-loaded content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading),
[site names](https://developers.google.com/search/docs/appearance/site-names).
