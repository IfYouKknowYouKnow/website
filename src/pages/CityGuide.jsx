import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cityMetadata, cityStructuredData } from '../pageMetadata'
import { useDocumentMetadata } from '../usePageMetadata'
import { loadPlaceCopy, useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'
import {
  buildPlacesUrl,
  categoryLabels,
  displayTags,
  formatLabel,
  getCityGuides,
  localizePlaces,
  normalizePlaces,
  resolveCityGuide,
  selectPlaces,
} from '../cityGuides'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
async function fetchPlaces(guide, signal) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return []
  const response = await fetch(buildPlacesUrl(guide, SUPABASE_URL), {
    signal,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })
  if (!response.ok) throw new Error('Unable to load city recommendations')
  return selectPlaces(guide, await response.json())
}

// Records exported into the page for this guide and language, if this is the page that was loaded.
function embeddedPlaces(guide, locale) {
  const embedded = typeof document === 'undefined' ? null : document.getElementById('city-guide-data')?.textContent
  if (!embedded) return []
  try {
    const payload = JSON.parse(embedded)
    return payload.path === guide.path && (payload.locale || 'en') === locale ? normalizePlaces(payload.places) : []
  } catch {
    return []
  }
}

function initialPlaces(guide, locale) {
  if (!guide) return []
  const places = embeddedPlaces(guide, locale)
  if (places.length > 0) return places
  // Checked-in English records. Other languages wait for their translated copy instead.
  return locale === 'en' ? normalizePlaces(guide.fallbackPlaces) : []
}

async function fallbackPlaces(guide) {
  if (guide.fallbackPlaces?.length) return normalizePlaces(guide.fallbackPlaces)
  // Category guides keep their checked-in records out of the main bundle.
  const { default: records } = await import('../cityGuideTopicPlaces.js')
  return normalizePlaces(records[guide.fallbackKey])
}

function PlaceCard({ place, topicSlug, rank }) {
  const { tr } = useI18n()
  // Translated guides carry ready-made labels; English derives them from the record.
  const categories = place.displayCategories || (place.category_labels || []).slice(0, 2).map(formatLabel)
  const tags = place.displayTags || displayTags(place, topicSlug)

  return (
    <article className="city-place-card">
      <div className="city-place-visual" aria-hidden="true">
        <span>{place.emoji || '📍'}</span>
      </div>
      <div className="city-place-copy">
        <p className="city-place-kicker">
          {[...categories, place.displayCity || place.city].filter(Boolean).join(' · ')}
        </p>
        <h3>{place.name}</h3>
        {rank && <p className="city-community-signal">{String(rank).padStart(2, '0')} · {place.recommendation_count === 1 ? tr('1 community recommendation') : tr('{count} community recommendations', { count: place.recommendation_count })}</p>}
        {place.address && <p className="city-place-address">{place.address}</p>}
        {place.description && <p className="city-place-description">{place.description}</p>}
        {tags.length > 0 && (
          <ul className="city-tags" aria-label={tr('{place} vibes', { place: place.name })}>
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        <a className="city-place-link" href={`/place/${place.id}`}>{tr('View on YouKnow')}{' '}<span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

function ContinueInAppCTA({ guide, publicPlaceCount }) {
  const { tr } = useI18n()
  return (
    <aside className="city-continue" aria-label={tr('Continue in YouKnow')}>
      <div>
        <p className="city-continue-count">{tr('{count} places to start', { count: publicPlaceCount })}</p>
        <h2>{guide.ctaTitle}</h2>
        <p>{guide.ctaBody}</p>
      </div>
      <Link className="city-primary-button city-continue-button" to="/download">
        {guide.ctaLabel} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}

function NotFound() {
  const { tr } = useI18n()
  return (
    <main className="city-not-found">
      <p>{tr('That city guide is not available yet.')}</p>
      <Link className="city-primary-button" to="/">{tr('Explore YouKnow')}</Link>
    </main>
  )
}

export default function CityGuide({ initialGuide, initialRecords } = {}) {
  const i18n = useI18n()
  const { tr, locale, guides: copy } = i18n
  const guides = getCityGuides(copy)
  const labels = categoryLabels(copy)
  const { citySlug, topicSlug: routeTopicSlug } = useParams()
  const topicSlug = initialGuide?.topicSlug || routeTopicSlug
  const guide = useMemo(() => initialGuide || resolveCityGuide(citySlug, topicSlug, copy), [initialGuide, citySlug, topicSlug, copy])
  const [places, setPlaces] = useState(() => initialRecords || initialPlaces(guide, locale))

  useEffect(() => {
    setPlaces(initialPlaces(guide, locale))
    if (!guide) return undefined
    const controller = new AbortController()
    const show = (records) => { if (!controller.signal.aborted && records.length > 0) setPlaces(records) }

    if (locale !== 'en') {
      // The exported page already holds translated records. After in-app navigation,
      // load this language's place copy and apply it to the latest records.
      if (embeddedPlaces(guide, locale).length > 0) return undefined
      Promise.all([loadPlaceCopy(locale), fetchPlaces(guide, controller.signal).catch(() => [])])
        .then(async ([placeCopy, fresh]) => show(localizePlaces(guide, fresh.length ? fresh : await fallbackPlaces(guide), placeCopy)))
        .catch(() => {})
      return () => controller.abort()
    }

    if (initialPlaces(guide, locale).length === 0) fallbackPlaces(guide).then((records) => {
      if (!controller.signal.aborted) setPlaces((current) => current.length > 0 ? current : records)
    }).catch(() => {})
    fetchPlaces(guide, controller.signal).then(show).catch((error) => {
      if (error.name !== 'AbortError') console.warn('[city-guide] Using verified fallback records', error)
    })
    return () => controller.abort()
  }, [guide, locale])

  useDocumentMetadata(guide ? cityMetadata(guide, i18n) : { title: 'Page not found | YouKnow', description: 'This city guide is not available.', canonical: 'https://ifykyk.app/', image: 'https://ifykyk.app/logo.png' }, guide ? cityStructuredData(guide, places, i18n) : {})

  if (!guide) return <NotFound />

  const relatedTopics = Object.values(guide.topics || {}).filter(
    (topic) => topic.slug !== topicSlug,
  )

  return (
    <div className="city-page">
      <header className="city-nav">
        <div className="container city-nav-inner">
          <Link to="/" aria-label={tr('YouKnow home')}>
            <img src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" />
          </Link>
          <nav aria-label={tr('Guide navigation')}>
            <Link to="/cities">{tr('City guides')}</Link>
            <Link to="/about">{tr('About')}</Link>
            <Link className="city-nav-button" to="/download">{tr('Get YouKnow')}</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="city-hero">
          <div className="container city-hero-inner">
            <div>
              {topicSlug && <Link className="city-back-link" to={`/${guide.slug}/`}>{tr('← All {city} places', { city: guide.city })}</Link>}
              <p className="city-eyebrow">{guide.eyebrow}</p>
              <h1>{guide.title}</h1>
              <p className="city-lead">{guide.intro}</p>
              <Link className="city-primary-button" to="/download">{tr('Find places on YouKnow →')}</Link>
            </div>
            <div className="city-hero-art" data-city={guide.slug}>
              <img src={`/images/cities/${guide.slug}-app-860.webp`} srcSet={`/images/cities/${guide.slug}-app-430.webp 430w, /images/cities/${guide.slug}-app-860.webp 860w`} sizes="245px" fetchpriority="high" alt={tr('YouKnow’s {city} city view, with its map and recommended places.', { city: guide.city })} width="1290" height="2796" />
            </div>
          </div>
        </section>

        <section className="city-places-section" aria-labelledby="city-places-heading">
          <div className="container">
            <div className="city-section-heading">
              <p className="city-eyebrow">{tr('From the YouKnow community')}</p>
              <h2 id="city-places-heading">{guide.sectionTitle}</h2>
              <p>{guide.sectionIntro}</p>
            </div>
            <div className="city-place-list">
              {places.map((place, index) => (
                <PlaceCard place={place} topicSlug={topicSlug} rank={guide.ranking === 'recommendations' ? index + 1 : undefined} key={place.id} />
              ))}
            </div>
            <ContinueInAppCTA guide={guide} publicPlaceCount={places.length} />
          </div>
        </section>

        {guide.contentSections.map((section, index) => (
          <section className={`city-editorial-section ${index % 2 ? 'city-editorial-tint' : ''}`} key={section.title}>
            <div className="container city-editorial-inner">
              <p className="city-section-number">0{index + 1}</p>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </div>
          </section>
        ))}

        {relatedTopics.length > 0 && (
          <section className="city-related">
            <div className="container">
              <p className="city-eyebrow">{tr('Find places for your vibe')}</p>
              <h2>{tr('Explore {city} your way', { city: guide.city })}</h2>
              <div className="city-related-links">
                {relatedTopics.map((topic) => (
                  <Link to={`/${guide.slug}/${topic.slug}/`} key={topic.slug}>
                    {topic.title} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="city-related" aria-labelledby="other-cities-heading">
          <div className="container">
            <p className="city-eyebrow">{tr('Take your good taste with you')}</p>
            <h2 id="other-cities-heading">{guide.kind ? tr('{category} in other cities', { category: labels[guide.kind] }) : tr('Explore another city')}</h2>
            <nav className="city-related-links" aria-label={tr('More city guides')}>
              {Object.values(guides).filter(city => city.slug !== guide.slug).map(city => (
                guide.kind && city.topics?.[guide.kind]
                  ? <Link to={`${city.path}${guide.kind}/`} key={city.slug}>{city.topics[guide.kind].title} <span aria-hidden="true">→</span></Link>
                  : <Link to={city.path} key={city.slug}>{tr('{city} city guide', { city: city.city })} <span aria-hidden="true">→</span></Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="city-faq" aria-labelledby="city-faq-heading">
          <div className="container city-faq-grid">
            <div>
              <p className="city-eyebrow">{tr('Good to know')}</p>
              <h2 id="city-faq-heading">{tr('{city} recommendations, explained.', { city: guide.city })}</h2>
            </div>
            <div>
              {guide.faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="city-footer">
        <div className="container city-footer-inner">
          <Link to="/"><img src="/long_logo.png" alt="YouKnow" /></Link>
          <p>{tr('Find places you love from people you trust.')}</p>
          <div><Link to="/about">{tr('About')}</Link><a href="/privacy">{tr('Privacy')}</a><LanguageSwitcher /></div>
        </div>
      </footer>
    </div>
  )
}
