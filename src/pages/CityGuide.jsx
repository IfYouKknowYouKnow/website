import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  buildPlacesUrl,
  displayTags,
  formatLabel,
  normalizePlaces,
  resolveCityGuide,
} from '../cityGuides'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const DEFAULT_TITLE = 'YouKnow App | Friend-Powered Restaurant and Bar Recommendations'
const DEFAULT_DESCRIPTION =
  'YouKnow is an app for discovering restaurants, bars, cafes, clubs, and experiences through recommendations from people you trust.'

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    if (selector.includes('rel="canonical"')) element.setAttribute('rel', 'canonical')
    const property = selector.match(/property="([^"]+)"/)?.[1]
    const name = selector.match(/name="([^"]+)"/)?.[1]
    if (property) element.setAttribute('property', property)
    if (name) element.setAttribute('name', name)
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

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
  return normalizePlaces(await response.json())
}

function initialPlaces(guide) {
  if (!guide) return []
  const embedded = document.getElementById('city-guide-data')?.textContent
  if (embedded) {
    try {
      const payload = JSON.parse(embedded)
      if (payload.path === guide.path) {
        const places = normalizePlaces(payload.places)
        if (places.length > 0) return places
      }
    } catch {
      // Fall through to the checked-in, verified records.
    }
  }
  return normalizePlaces(guide.fallbackPlaces)
}

function PlaceCard({ place, topicSlug }) {
  const categories = (place.category_labels || []).slice(0, 2).map(formatLabel)
  const tags = displayTags(place, topicSlug)

  return (
    <article className="city-place-card">
      <div className="city-place-visual" aria-hidden="true">
        <span>{place.emoji || '📍'}</span>
      </div>
      <div className="city-place-copy">
        <p className="city-place-kicker">
          {[...categories, place.city].filter(Boolean).join(' · ')}
        </p>
        <h3>{place.name}</h3>
        {place.address && <p className="city-place-address">{place.address}</p>}
        {place.description && <p className="city-place-description">{place.description}</p>}
        {tags.length > 0 && (
          <ul className="city-tags" aria-label={`${place.name} vibes`}>
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        <Link className="city-place-link" to={`/place/${place.id}`}>
          View on YouKnow <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

function ContinueInAppCTA({ guide, publicPlaceCount }) {
  return (
    <aside className="city-continue" aria-label="Continue in YouKnow">
      <div>
        <p className="city-continue-count">{publicPlaceCount} places to start</p>
        <h2>{guide.ctaTitle}</h2>
        <p>{guide.ctaBody}</p>
      </div>
      <a className="city-primary-button city-continue-button" href="/#download">
        {guide.ctaLabel} <span aria-hidden="true">→</span>
      </a>
    </aside>
  )
}

function NotFound() {
  return (
    <main className="city-not-found">
      <p>That city guide is not available yet.</p>
      <Link className="city-primary-button" to="/">Explore YouKnow</Link>
    </main>
  )
}

export default function CityGuide() {
  const { citySlug, topicSlug } = useParams()
  const guide = useMemo(() => resolveCityGuide(citySlug, topicSlug), [citySlug, topicSlug])
  const [places, setPlaces] = useState(() => initialPlaces(guide))

  useEffect(() => {
    setPlaces(initialPlaces(guide))
    if (!guide) return undefined
    const controller = new AbortController()
    fetchPlaces(guide, controller.signal)
      .then((freshPlaces) => {
        if (freshPlaces.length > 0) setPlaces(freshPlaces)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('[city-guide] Using verified fallback records', error)
        }
      })
    return () => controller.abort()
  }, [guide])

  useEffect(() => {
    if (!guide) return undefined
    const previousTitle = document.title
    const canonical = `https://ifykyk.app${guide.path}`
    document.title = `${guide.title} | YouKnow`
    setMeta('meta[name="description"]', 'content', guide.intro)
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:title"]', 'content', `${guide.title} | YouKnow`)
    setMeta('meta[property="og:description"]', 'content', guide.intro)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[name="twitter:title"]', 'content', `${guide.title} | YouKnow`)
    setMeta('meta[name="twitter:description"]', 'content', guide.intro)

    document.getElementById('city-guide-structured-data')?.remove()
    const structuredData = document.createElement('script')
    structuredData.type = 'application/ld+json'
    structuredData.id = 'city-guide-structured-data'
    structuredData.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
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
    })
    document.head.appendChild(structuredData)
    return () => {
      document.title = previousTitle === `${guide.title} | YouKnow` ? DEFAULT_TITLE : previousTitle
      setMeta('meta[name="description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('link[rel="canonical"]', 'href', 'https://ifykyk.app/')
      setMeta('meta[property="og:title"]', 'content', 'YouKnow App | Friend-Powered Recommendations')
      setMeta('meta[property="og:description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('meta[property="og:url"]', 'content', 'https://ifykyk.app/')
      setMeta('meta[name="twitter:title"]', 'content', 'YouKnow App | Friend-Powered Recommendations')
      setMeta('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION)
      structuredData.remove()
    }
  }, [guide, places])

  if (!guide) return <NotFound />

  const relatedTopics = Object.values(guide.topics || {}).filter(
    (topic) => topic.slug !== topicSlug,
  )

  return (
    <div className="city-page">
      <header className="city-nav">
        <div className="container city-nav-inner">
          <Link to="/" aria-label="YouKnow home">
            <img src="/long_logo.png" alt="YouKnow" />
          </Link>
          <nav aria-label="Guide navigation">
            <Link to="/about">About</Link>
            <a className="city-nav-button" href="/#download">Get YouKnow</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="city-hero">
          <div className="container city-hero-inner">
            <div>
              {topicSlug && <Link className="city-back-link" to={`/${guide.slug}`}>← All {guide.city} places</Link>}
              <p className="city-eyebrow">{guide.eyebrow}</p>
              <h1>{guide.title}</h1>
              <p className="city-lead">{guide.intro}</p>
              <a className="city-primary-button" href="/#download">Find places on YouKnow →</a>
            </div>
            <div className="city-hero-art" aria-hidden="true">
              <span className="city-art-pin city-art-pin-one">☕</span>
              <span className="city-art-pin city-art-pin-two">🍷</span>
              <span className="city-art-pin city-art-pin-three">🍽️</span>
              <div className="city-art-map-line" />
            </div>
          </div>
        </section>

        <section className="city-places-section" aria-labelledby="city-places-heading">
          <div className="container">
            <div className="city-section-heading">
              <p className="city-eyebrow">From the YouKnow community</p>
              <h2 id="city-places-heading">{guide.sectionTitle}</h2>
              <p>{guide.sectionIntro}</p>
            </div>
            <div className="city-place-list">
              {places.map((place) => (
                <PlaceCard place={place} topicSlug={topicSlug} key={place.id} />
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
              <p className="city-eyebrow">Find places for your vibe</p>
              <h2>Explore {guide.city} your way</h2>
              <div className="city-related-links">
                {relatedTopics.map((topic) => (
                  <Link to={`/${guide.slug}/${topic.slug}`} key={topic.slug}>
                    {topic.title.replace(` in ${guide.city}`, '').replace(` ${guide.city}`, '')} <span>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="city-faq" aria-labelledby="city-faq-heading">
          <div className="container city-faq-grid">
            <div>
              <p className="city-eyebrow">Good to know</p>
              <h2 id="city-faq-heading">{guide.city} recommendations, explained.</h2>
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
          <p>Find places you love from people you trust.</p>
          <div><Link to="/about">About</Link><Link to="/privacy">Privacy</Link></div>
        </div>
      </footer>
    </div>
  )
}
