# AI crawling and search: YouKnow implementation

Reviewed on 14 October 2026.

## What AI systems read

AI search has two distinct access paths: crawlers build search indexes, and user-directed fetchers retrieve a specific page when someone asks about it. OpenAI uses OAI-SearchBot for search and ChatGPT-User for user requests; GPTBot is a separate training crawler. Perplexity uses PerplexityBot for search and Perplexity-User for user requests. Anthropic separates Claude-SearchBot, Claude-User and ClaudeBot similarly. Our existing wildcard allow policy permits all of these, including training crawlers.

Google's AI search features use the normal search foundations: publicly accessible, indexable pages, crawlable internal links, textual content, and structured data matching the visible page. Neither a special AI schema nor an AI text file is required. Indexing and citations remain decisions made by the provider.

A scraper may only read the initial HTTP response. A rendered browser can execute JavaScript, but relying on it imposes extra work and can hide content from simpler fetchers. Therefore the primary deliverable is complete static HTML served to every visitor and user agent.

Sources:

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [llms.txt proposal](https://llmstxt.org/)

## What changed

Previously, the homepage response contained an empty React root. About and tutorials had separate prerendering, city guides used a hand-written HTML renderer, and the privacy route depended on an iframe. The sitemap was checked in separately with dates unrelated to the current content. The catch-all rewrite returned a successful homepage for missing URLs.

Now one build renders the actual React components for the homepage, about, tutorials and eight city/topic guides. The existing complete privacy notice is served at `/privacy`. Each of the 12 public pages gets its own canonical URL, title, description, structured data and alternate format links. Homepage app, organization and FAQ data share the same source as the browser. City page schema and records share the same source as the rendered cards. Expandable feature descriptions and FAQs remain present in the HTML; the homepage includes a no-JavaScript fallback for its feature panels.

Community counts and the same limited public guide records previously used by the site are read during the build using the existing public API. If the API is unavailable, checked-in fallback records are used. The JSON exports identify their data source. This does not export private maps, profiles, invitations, or a complete place database. Static snapshots update when the site is rebuilt; existing browser refresh behavior continues.

## Public discovery and extraction URLs

| URL | Purpose |
| --- | --- |
| `/robots.txt` | Allows crawling and points to the sitemap. |
| `/sitemap.xml` | Canonical URLs generated from successfully rendered pages. |
| `/sitemap.html` | Linked directory for visitors and link-following crawlers. |
| `/llms.txt` | Small index linking to clean text and structured public content. |
| `/llms-full.txt` | Combined Markdown of all public pages. |
| `/content/index.json` | Page titles, canonical URLs and alternate-format URLs. |
| `/content/site.json` | All public page text, schema and public guide previews. |
| `/index.md`, `/index.json` | Homepage alternate formats. |
| `/about.md`, `/about.json` | About alternate formats; tutorials and privacy use the same convention. |
| `/zurich/index.md`, `/zurich/index.json` | City alternate formats; topic guides and other cities use the same convention. |

Markdown is extracted from the emitted HTML with an HTML parser, preserving headings, links, feature panels and FAQ answers while removing scripts, navigation and forms. No independent AI-only marketing copy is maintained. `llms.txt` is a supplementary proposal, not a guarantee that a search provider will consume it.

Netlify configuration supplies correct alternate-format content types and canonical HTTP links. Alternate formats and generic app-sharing shells use `noindex` to keep duplicate or empty landing pages out of conventional search results; they remain fetchable. App-sharing links still resolve, `/team` redirects to `/about`, and unknown routes receive HTTP 404 instead of a soft 404. Sitemap dates are omitted because the build cannot reliably infer when the underlying content last changed.

## Verification and deployment

Run `npm run build` for the production build and automatic crawlability checks. Run `npm run check:crawlability` against an existing build. For a reproducible build without API requests, run `PRERENDER_OFFLINE=1 npm run build`.

The checks inspect initial HTML without executing JavaScript: content, headings, canonical URLs, social URLs, structured data, visible FAQ/schema agreement, guide records, homepage features, Markdown/JSON parity, format links, sitemap coverage and internal links. They run on every Netlify build and fail it on detected regressions.

Deploy through the existing Netlify workflow. After deployment, verify the actual HTTP responses for `/`, `/about`, `/privacy`, `/zurich/`, `/zurich/cafes/`, `/zurich/index.md`, `/content/index.json`, `/invite/example`, `/place/example` and a nonexistent URL. Check the Markdown content type, canonical Link headers and HTTP 404 behavior. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools when those accounts are available. Host-level bot challenges and firewall configuration are outside this repository; if access is blocked there, use the providers' current verified IP ranges rather than trusting a User-Agent alone.

Local browser verification was unavailable because the installed Browser runtime could not initialize in this session. The build and raw HTML checks are the available verification evidence; production Netlify routing and headers still need a deployed HTTP check.
