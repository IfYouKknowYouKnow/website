import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { appStoreHref, openIOSAppStore } from '../appStoreLink'
import styles from './Landing.module.css'

const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.youknow.mobile'
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
const FALLBACK_STATS = {
  curatedPlaces: 10000,
  cities: 331,
}
const COUNT_REFRESH_INTERVAL_MS = 60000
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const STATS_TABLE = import.meta.env.VITE_SUPABASE_STATS_TABLE || 'website_stats'
const STATS_ROW_ID = import.meta.env.VITE_SUPABASE_STATS_ROW_ID || 'landing'

const FLOATING_TAGS = [
  { text: 'Cute brunch spot', className: styles.floatOne, dotColor: '#e01c1c' },
  { text: 'Natural wine in Zurich', className: styles.floatTwo, dotColor: '#16834a' },
  { text: 'Saved by friends', className: styles.floatThree, dotColor: '#2f6eea' },
  { text: 'Date night', className: styles.floatFour, dotColor: '#d36b17' },
  { text: 'Hidden terrace', className: styles.floatFive, dotColor: '#9b4de3' },
  { text: 'Friend-approved', className: styles.floatSix, dotColor: '#00a6a6' },
]

const SCREEN_FEATURES = [
  {
    src: '/images/IMG_3385.PNG',
    title: 'Start with the living map',
    body: 'Open a map of the right things: places saved by friends, connoisseurs and people whose taste you trust.',
  },
  {
    src: '/images/IMG_3387.PNG',
    title: 'Filter by people you trust',
    body: 'Switch from the community to one friend, and see exactly which places they would send you to.',
  },
  {
    src: '/images/IMG_3386.PNG',
    title: 'Filter by category, open now and trending',
    body: 'Cut through the noise with filters for food, bars, coffee, dance, open now and what is trending nearby.',
  },
  {
    src: '/images/IMG_3388.PNG',
    title: 'Explore any city',
    body: 'Drop into Milan, Zurich, Paris or wherever you are headed, and see the places the community actually recommends.',
  },
  {
    src: '/images/IMG_3389.PNG',
    title: 'See what friends post',
    body: 'Follow the feed for photos, new finds and the nights your friends thought were worth sharing.',
  },
  {
    src: '/images/IMG_3390.PNG',
    title: 'Organize your own recommendations',
    body: 'Keep your recommendations and want-to-try places organized by distance, city or lists.',
  },
  {
    src: '/images/IMG_3391.PNG',
    title: 'Search by vibe with AI',
    body: 'Use natural language. Artificial Intelligence helps match the places on your map to the exact vibe you want.',
  },
].map((feature, index) => ({
  ...feature,
  alt: `YouKnow app screenshot showing ${feature.title.toLowerCase()}.`,
  number: String(index + 1).padStart(2, '0'),
}))

const HERO_SCREENSHOTS = [
  SCREEN_FEATURES[1],
  SCREEN_FEATURES[3],
  SCREEN_FEATURES[4],
]

const QUERY_PILLS = [
  'cozy bar for a first date',
  'casual dinner',
  'quiet cafe to work from',
  'places my friends saved in Paris',
]

function getFaqItems(cityCount) {
  return [
    {
      question: 'Is YouKnow free?',
      answer:
        'Yes. YouKnow is completely free to download and use on iOS and Android. You can save places, build your map, follow recommendations and search by vibe without paying for the app.',
    },
    {
      question: 'Which cities is YouKnow available in?',
      answer: `The YouKnow community currently has curated places across ${formatCount(cityCount)} cities. You can explore recommendations in cities including Zurich, Milan and Paris, and coverage keeps growing as friends and curators add places around the world.`,
    },
    {
      question: 'What kinds of places can I discover?',
      answer:
        'YouKnow helps you find restaurants, bars, cafes, clubs and experiences. Filter the map by category, distance, what is open now, what is trending or the people whose taste you want to follow.',
    },
    {
      question: 'Where do the recommendations come from?',
      answer:
        'Recommendations come from friends, local communities, creators and connoisseurs—not anonymous star ratings. You can explore the wider community or filter the map to see exactly what a particular person has saved.',
    },
    {
      question: 'How can I save a place?',
      answer:
        'Save places directly in YouKnow, share a restaurant or bar from Instagram or TikTok, add one from a photo, or import your Google Saved Places. YouKnow helps identify the matching location before adding it to your map.',
    },
    {
      question: 'How does search by vibe work?',
      answer:
        'Describe the kind of place or plan you want in natural language—such as a cozy first-date bar or a quiet cafe to work from. YouKnow uses AI to match that request with relevant places on your map.',
    },
    {
      question: 'Which devices and languages are supported?',
      answer:
        'YouKnow is available for iPhone and Android. The app supports English, German, French and Italian.',
    },
  ]
}

function StoreButtons({ compact = false }) {
  return (
    <div className={`${styles.actions} ${compact ? styles.actionsCompact : ''}`}>
      <a
        className={styles.storeBadgeLink}
        href={appStoreHref()}
        onClick={openIOSAppStore}
        aria-label="Download on the App Store"
      >
        <img
          className={`${styles.storeBadge} ${styles.appStoreBadge}`}
          src="/badges/app-store-badge.svg"
          alt="Download on the App Store"
          decoding="async"
        />
      </a>
      <a
        className={styles.storeBadgeLink}
        href={ANDROID_PLAY_STORE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Get it on Google Play"
      >
        <img
          className={`${styles.storeBadge} ${styles.googlePlayBadge}`}
          src="/badges/google-play-badge.png"
          alt="Get it on Google Play"
          decoding="async"
        />
      </a>
    </div>
  )
}

function StatStrip({ stats }) {
  const curatedPlaces = positiveCountOrFallback(
    stats.curatedPlaces,
    FALLBACK_STATS.curatedPlaces,
  )
  const cityCount = positiveCountOrFallback(stats.cities, FALLBACK_STATS.cities)

  return (
    <section className={styles.statsStrip} aria-label="YouKnow community stats">
      <div className={`container ${styles.statsInner}`}>
        <div className={styles.statItem}>
          <strong>{formatCount(curatedPlaces)} curated places</strong>
          <span>Saved by people with taste</span>
        </div>
        <div className={styles.statItem}>
          <strong>{formatCount(cityCount)} cities</strong>
          <span>Zero-noise layers for places worth knowing</span>
        </div>
        <div className={styles.statItem}>
          <strong>No stars. No noise.</strong>
          <span>Just people whose taste you trust</span>
        </div>
      </div>
    </section>
  )
}

const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For curators', href: '#curators' },
  { label: 'FAQ', href: '#faq' },
]

function getStaticMapUrl() {
  if (!MAPBOX_TOKEN) {
    return null
  }

  const params = new URLSearchParams({
    access_token: MAPBOX_TOKEN,
  })

  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/8.5417,47.3769,12,0,0/1280x900@2x?${params}`
}

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

function formatCount(count) {
  return new Intl.NumberFormat('en-US').format(count)
}

function positiveCountOrFallback(count, fallback) {
  return typeof count === 'number' && count > 0 ? count : fallback
}

async function fetchLandingStats(signal) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null
  }

  const url = new URL(`/rest/v1/${STATS_TABLE}`, SUPABASE_URL)
  url.searchParams.set('id', `eq.${STATS_ROW_ID}`)
  url.searchParams.set('select', 'curated_places_count,city_count,updated_at')
  url.searchParams.set('limit', '1')

  const response = await fetch(url, {
    signal,
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Cache-Control': 'no-cache',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to fetch website stats')
  }

  const [stats] = await response.json()

  if (!stats) {
    return null
  }

  return {
    curatedPlaces: stats.curated_places_count,
    cities: stats.city_count,
    updatedAt: stats.updated_at,
  }
}

async function recomputeLandingStats(signal) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return
  }

  const url = new URL('/rest/v1/rpc/refresh_website_stats', SUPABASE_URL)
  const response = await fetch(url, {
    method: 'POST',
    signal,
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: '{}',
  })

  if (!response.ok) {
    throw new Error('Unable to recompute website stats')
  }
}

export default function Landing() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState('')
  const [isCuratorFormOpen, setIsCuratorFormOpen] = useState(false)
  const [curatorForm, setCuratorForm] = useState({
    name: '',
    email: '',
    taste: '',
  })
  const [isCuratorSubmitting, setIsCuratorSubmitting] = useState(false)
  const [curatorToast, setCuratorToast] = useState('')
  const [stats, setStats] = useState(FALLBACK_STATS)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeFeatureStart, setActiveFeatureStart] = useState(0)
  const carouselRef = useRef(null)
  const featureRailRef = useRef(null)
  const staticMapUrl = getStaticMapUrl()
  const cityCount = positiveCountOrFallback(stats.cities, FALLBACK_STATS.cities)
  const faqItems = getFaqItems(cityCount)

  useEffect(() => {
    const structuredData = document.createElement('script')
    structuredData.id = 'landing-faq-structured-data'
    structuredData.type = 'application/ld+json'
    structuredData.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
    document.head.appendChild(structuredData)

    return () => structuredData.remove()
  }, [cityCount])

  useEffect(() => {
    const abortController = new AbortController()

    async function refreshCounts({ recompute = false } = {}) {
      try {
        if (recompute) {
          try {
            await recomputeLandingStats(abortController.signal)
          } catch (error) {
            if (error.name !== 'AbortError') {
              console.warn('Stats recompute failed; reading the latest cached values.', error)
            }
          }
        }

        const nextStats = await fetchLandingStats(abortController.signal)

        if (nextStats) {
          setStats({
            curatedPlaces: positiveCountOrFallback(
              nextStats.curatedPlaces,
              FALLBACK_STATS.curatedPlaces,
            ),
            cities: positiveCountOrFallback(nextStats.cities, FALLBACK_STATS.cities),
          })
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Stats refresh failed:', error)
        }
      }
    }

    refreshCounts({ recompute: true })
    const intervalId = window.setInterval(refreshCounts, COUNT_REFRESH_INTERVAL_MS)

    return () => {
      abortController.abort()
      window.clearInterval(intervalId)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setToast('')

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'waitlist',
          email,
        }),
      })

      setEmail('')
      setToast('You are on the list!')

      setTimeout(() => {
        setToast('')
      }, 3000)
    } catch (error) {
      console.error('Mailing list submission failed:', error)
      setToast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCuratorSubmit(e) {
    e.preventDefault()
    setIsCuratorSubmitting(true)
    setCuratorToast('')

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'curator-application',
          ...curatorForm,
        }),
      })

      setCuratorForm({
        name: '',
        email: '',
        taste: '',
      })
      setIsCuratorFormOpen(false)
      setCuratorToast('Application sent.')

      setTimeout(() => {
        setCuratorToast('')
      }, 3000)
    } catch (error) {
      console.error('Curator application submission failed:', error)
      setCuratorToast('Something went wrong. Please try again.')
    } finally {
      setIsCuratorSubmitting(false)
    }
  }

  function handleCuratorChange(e) {
    const { name, value } = e.target

    setCuratorForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleCarouselScroll(e) {
    const { scrollLeft, clientWidth } = e.currentTarget
    const nextSlide = Math.round(scrollLeft / clientWidth)

    if (nextSlide !== activeSlide) {
      setActiveSlide(nextSlide)
    }
  }

  function scrollFeatureTo(index) {
    const rail = featureRailRef.current
    const nextIndex = Math.min(SCREEN_FEATURES.length - 1, Math.max(0, index))
    const targetCard = rail?.children[nextIndex]

    if (!rail || !targetCard) {
      return
    }

    setActiveFeatureStart(nextIndex)

    rail.scrollTo({
      left: targetCard.offsetLeft + targetCard.offsetWidth / 2 - rail.clientWidth / 2,
      behavior: 'smooth',
    })

  }

  function handleFeatureScroll(e) {
    const rail = e.currentTarget
    const cards = Array.from(rail.children)

    if (!cards.length) {
      return
    }

    const railRect = rail.getBoundingClientRect()
    const railCenter = railRect.left + railRect.width / 2
    const nextStart = cards.reduce((closestIndex, card, index) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const closestRect = cards[closestIndex].getBoundingClientRect()
      const closestCenter = closestRect.left + closestRect.width / 2

      return Math.abs(cardCenter - railCenter) < Math.abs(closestCenter - railCenter)
        ? index
        : closestIndex
    }, 0)

    if (nextStart !== activeFeatureStart) {
      setActiveFeatureStart(nextStart)
    }
  }

  function goToSlide(index) {
    const carousel = carouselRef.current

    if (!carousel) {
      return
    }

    carousel.scrollTo({
      left: carousel.clientWidth * index,
      behavior: 'smooth',
    })
    setActiveSlide(index)
  }

  return (
    <div className={styles.page}>
      {staticMapUrl && (
        <img
          className={styles.mapBackdrop}
          src={staticMapUrl}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      )}

      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <a className={styles.brand} href="/" aria-label="YouKnow home">
            <img
              className={styles.brandLogo}
              src="/long_logo.png"
              alt="YouKnow"
              decoding="async"
            />
          </a>

          <div className={styles.navLinks} aria-label="Primary">
            <Link to="/about">About</Link>
            <a href="#how-it-works">How it works</a>
            <a href="#curators">For curators</a>
            <Link to="/tutorials">Tutorials</Link>
            <a className={styles.navCta} href="#download">
              Download
            </a>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.copy}>
              <h1>A Map Curated by People Who Know.</h1>
              <p className={styles.subhead}>
                Skip the endless searching. Find restaurants, bars, cafes and nights
                out through friends and connoisseurs who share your taste.
              </p>

              <div className={styles.heroActions}>
                <span className={styles.heroFreeNote}>Completely Free</span>
                <StoreButtons />
              </div>

              <div className={styles.proof} aria-label="Live YouKnow community stats">
                <span>Live in {formatCount(cityCount)} cities</span>
                <span>Available in English, German, French and Italian</span>
              </div>
            </div>

            <div className={styles.visualWrap} aria-label="YouKnow app preview">
              {FLOATING_TAGS.map((tag) => (
                <span
                  className={`${styles.floatingTag} ${tag.className}`}
                  style={{ '--tag-dot': tag.dotColor }}
                  key={tag.text}
                  aria-hidden="true"
                >
                  {tag.text}
                </span>
              ))}

              <div className={styles.phoneShell}>
                <div
                  className={styles.screenCarousel}
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  aria-label="YouKnow app screenshots"
                >
                  {HERO_SCREENSHOTS.map((screenshot, index) => (
                    <img
                      className={styles.phoneScreen}
                      src={screenshot.src}
                      alt={screenshot.alt}
                      decoding="async"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      key={screenshot.src}
                    />
                  ))}
                </div>

                <div className={styles.carouselDots} aria-label="Choose screenshot">
                  {HERO_SCREENSHOTS.map((screenshot, index) => (
                    <button
                      className={`${styles.carouselDot} ${
                        activeSlide === index ? styles.carouselDotActive : ''
                      }`}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Show screenshot ${index + 1}`}
                      aria-pressed={activeSlide === index}
                      key={screenshot.src}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.visualActions}>
                <a className={`${styles.secondaryCta} ${styles.visualCta}`} href="#waitlist">
                  Join mailing list
                </a>
                <Link className={`${styles.secondaryCta} ${styles.visualCta}`} to="/about">
                  Why YouKnow
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form name="waitlist" method="POST" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="waitlist" />
        <input type="email" name="email" />
      </form>

      <form name="curator-application" method="POST" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="curator-application" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="taste" />
      </form>

      <StatStrip stats={stats} />

      <main className={styles.editorial}>
        <section className={styles.featureSection} id="how-it-works">
          <div className="container">
            <div className={styles.featureIntro}>
              <span className={styles.sectionEyebrow}>How it works</span>
              <h2>No stars. No noise. Just the right places.</h2>
              <p>
                YouKnow turns recommendations from friends and local connoisseurs
                into a living map: clear, personal and built for actual plans.
              </p>
            </div>

            <div
              className={styles.featureRail}
              ref={featureRailRef}
              onScroll={handleFeatureScroll}
              aria-label="YouKnow app features"
            >
              {SCREEN_FEATURES.map((feature, index) => (
                <article
                  className={`${styles.featureCard} ${
                    index === activeFeatureStart
                      ? styles.featureCardActive
                      : index === activeFeatureStart - 1 ||
                          index === activeFeatureStart + 1
                        ? styles.featureCardPreview
                        : styles.featureCardHidden
                  }`}
                  key={feature.src}
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollFeatureTo(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      scrollFeatureTo(index)
                    }
                  }}
                >
                  <div className={styles.featurePhone}>
                    <img
                      src={feature.src}
                      alt={feature.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className={styles.featureText}>
                    <span>{feature.number}</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <Link className={styles.textLink} to="/tutorials">
              See how saving works
            </Link>
          </div>
        </section>

        <section className={`${styles.storySection} ${styles.searchSection}`}>
          <div className={`container ${styles.searchInner}`}>
            <div className={styles.queryPanel}>
              <span className={styles.queryLabel}>Ask YouKnow</span>
              <div className={styles.queryLine}>Find a place for...</div>
              <div className={styles.queryPills}>
                {QUERY_PILLS.map((query) => (
                  <span key={query}>{query}</span>
                ))}
              </div>
            </div>

            <div className={styles.storyCopy}>
              <span className={styles.sectionEyebrow}>Search by vibe</span>
              <h2 className={styles.searchHeadline}>Ask for a vibe, not a rating.</h2>
              <p>
                Describe the night you want, from a quiet coffee to a second-date
                wine bar, and find places that match your people and your mood.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.storySection} id="curators">
          <div className={`container ${styles.curatorBand}`}>
            <div className={styles.storyCopy}>
              <span className={styles.sectionEyebrow}>For curators</span>
              <h2>Built by people who you know.</h2>
              <p>
                For friends, communities, creators and tastemakers who know the
                places that do not need giant neon signs to stay full.
              </p>
              <p>
                Put your map wherever people already follow you. In your profile,
                open Saved and tap <strong>Share list</strong>, choose all your
                recommendations or filter them by city or category, then tap{' '}
                <strong>Share Link</strong>. Add the link to Instagram, TikTok or
                any other social profile so people can open and follow your places
                in YouKnow.
              </p>
            </div>
            <div className={styles.curatorAction}>
              <button
                className={styles.primaryCta}
                type="button"
                onClick={() => setIsCuratorFormOpen((isOpen) => !isOpen)}
                aria-expanded={isCuratorFormOpen}
              >
                Become a curator
              </button>

              {isCuratorFormOpen && (
                <form
                  name="curator-application"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleCuratorSubmit}
                  className={styles.curatorForm}
                >
                  <input type="hidden" name="form-name" value="curator-application" />

                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={curatorForm.name}
                    onChange={handleCuratorChange}
                    required
                  />

                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={curatorForm.email}
                    onChange={handleCuratorChange}
                    required
                  />

                  <textarea
                    className={styles.textarea}
                    name="taste"
                    placeholder="Why should people trust your taste?"
                    value={curatorForm.taste}
                    onChange={handleCuratorChange}
                    required
                  />

                  <button
                    className={styles.formButton}
                    type="submit"
                    disabled={isCuratorSubmitting}
                  >
                    {isCuratorSubmitting ? 'Sending...' : 'Send application'}
                  </button>

                  {curatorToast && curatorToast !== 'Application sent.' && (
                    <p className={styles.toast}>{curatorToast}</p>
                  )}
                </form>
              )}

              {curatorToast === 'Application sent.' && (
                <p className={styles.curatorSuccess} aria-live="polite">
                  <span aria-hidden="true" />
                  {curatorToast}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq" aria-labelledby="faq-heading">
          <div className={`container ${styles.faqInner}`}>
            <div className={styles.faqIntro}>
              <span className={styles.sectionEyebrow}>Good to know</span>
              <h2 id="faq-heading">Questions, answered.</h2>
              <p>
                Everything you need to know before beginning your map with a place
                you already love.
              </p>
            </div>

            <div className={styles.faqList}>
              {faqItems.map((item, index) => (
                <details className={styles.faqItem} key={item.question} open={index === 0}>
                  <summary>
                    <span>{item.question}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className={styles.finalCta} id="download">
        <div className="container">
          <div className={styles.finalCtaInner}>
            <h2>Start with a place you already love.</h2>
            <StoreButtons compact />
            <p className={styles.freeNote}>Free to download.</p>
          </div>
        </div>
      </section>

      <section className={styles.info} id="waitlist">
        <div className="container">
          <div className={styles.waitlistPanel}>
            <p>Get app updates and new city drops.</p>

            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <input type="hidden" name="form-name" value="waitlist" />

              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className={styles.formButton}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join mailing list'}
              </button>
            </form>

            {toast && <p className={styles.toast}>{toast}</p>}
          </div>

          <div className={styles.supportMark}>
            <span>Built with support from</span>
            <div className={styles.supportLogos}>
              <img
                src="/sph_logo.jpeg"
                alt="ETH Student Project House"
                loading="lazy"
                decoding="async"
              />
              <img
                className={styles.agenticLogo}
                src="/asl-logo-white.svg"
                alt="Agentic Systems Lab"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={styles.footerBrand}>
            <img
              className={styles.footerLogo}
              src="/long_logo.png"
              alt="YouKnow"
              loading="lazy"
              decoding="async"
            />
          </span>
          <p className={styles.footerCopy}>© 2026 YouKnow by Marie-Louise Dugua & Fabio Baldini</p>
          <div className={styles.footerLinks}>
            {FOOTER_LINKS.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
