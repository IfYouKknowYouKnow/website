# YouKnow Map SEO

The marketing website exports 15 complete HTML pages: home, story, tutorials,
privacy, six city guides and five Zurich topic guides. The same text is available
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

## Checks

`npm run build` exports the pages and runs `scripts/check-crawlability.mjs`.
The check verifies unique titles/descriptions, headings, canonical URLs, structured
data, visible FAQ content, sharing assets, video sources, sitemap membership,
link reachability and the Markdown/JSON content exports. Use
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
2. Inspect the homepage and the Milan, Paris and Tokyo guides with URL Inspection. Confirm the fetched HTML, canonical URL and indexing status.
3. Monitor search queries, indexed pages and field Core Web Vitals. Use the results to choose further city/topic content based on actual demand and community coverage.

The website is English. App language support does not create translated web pages,
so there are no misleading hreflang declarations.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[lazy-loaded content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading),
[site names](https://developers.google.com/search/docs/appearance/site-names).
