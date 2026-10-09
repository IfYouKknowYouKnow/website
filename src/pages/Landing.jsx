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
  { text: 'Cute brunch spot', className: styles.floatOne, dotColor: 'var(--brand-blue)' },
  { text: 'Natural wine in Zurich', className: styles.floatTwo, dotColor: 'var(--brand-blue)' },
  { text: 'Saved by friends', className: styles.floatThree, dotColor: 'var(--brand-blue)' },
  { text: 'Date night', className: styles.floatFour, dotColor: 'var(--brand-blue)' },
  { text: 'Hidden terrace', className: styles.floatFive, dotColor: 'var(--brand-blue)' },
  { text: 'Friend-approved', className: styles.floatSix, dotColor: 'var(--brand-blue)' },
]

const SCREEN_FEATURES = [
  {
    src: '/images/IMG_6338.PNG',
    title: 'Start with the living map',
    body: 'Explore places recommended by people you trust. Narrow your map by friends, food, drinks, coffee or what is open now.',
  },
  {
    src: '/images/IMG_6350.PNG',
    title: 'Explore any city',
    body: 'Drop into Zurich, Milan, Paris or wherever you are headed, and see the places the community actually recommends.',
  },
  {
    src: '/images/IMG_6337.PNG',
    title: 'See what friends recommend',
    body: 'Explore your feed for friends’ recommendations, recent pictures and the community’s top curators.',
  },
  {
    src: '/images/IMG_6339.PNG',
    title: 'Organize your own recommendations',
    body: 'Keep your saved and want-to-go places together on your profile, and browse them by city, category or distance.',
  },
  {
    src: '/images/IMG_6342.PNG',
    title: 'Get to know a place',
    body: 'See photos and who saved a place, check the details, then save it for later or get directions.',
  },
  {
    src: '/images/IMG_6327.PNG',
    title: 'Search by vibe with AI',
    body: 'Describe what you have in mind. Get recommendations from your map and ask follow-up questions to find the right place.',
  },
].map((feature, index) => ({
  ...feature,
  alt: `YouKnow app screenshot showing ${feature.title.toLowerCase()}.`,
  number: String(index + 1).padStart(2, '0'),
}))

const HERO_SCREENSHOTS = [
  SCREEN_FEATURES[0],
  SCREEN_FEATURES[1],
  SCREEN_FEATURES[2],
]

const QUERY_PILLS = [
  'cozy bar for a first date',
  'casual dinner',
  'quiet cafe to work from',
  'places my friends saved in Paris',
]

function Sparkle() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2 14.8 9.2 22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" stroke="currentColor" strokeWidth="1.5" /></svg>
}

function MapArtwork() {
  return <svg className={styles.mapArtwork} viewBox="0 0 640 740" fill="none" aria-hidden="true">
    <defs><pattern id="map-grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" stroke="currentColor" strokeOpacity=".12" /></pattern></defs>
    <rect width="640" height="740" fill="url(#map-grid)" />
    <path d="M420-20c-120 140 70 240-80 370S390 610 250 760" stroke="white" strokeOpacity=".5" strokeWidth="76" />
    <g stroke="currentColor" strokeOpacity=".18" strokeWidth="1.5"><path d="M-20 120 660 310M-20 400l680-80M110-20l160 780M500-20 410 760M-20 620l680-100" /><circle cx="320" cy="340" r="250" /><circle cx="320" cy="340" r="190" strokeDasharray="3 9" /></g>
    <path d="m90 480 115-180 230 95 100-200" stroke="var(--brand-blue)" strokeWidth="2" strokeDasharray="6 8" />
    {[ [90,480], [205,300], [435,395], [535,195] ].map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r="16" fill="var(--brand-blue)" fillOpacity=".12" /><circle cx={x} cy={y} r="5" fill="var(--brand-blue)" /></g>)}
  </svg>
}

function CityArtwork({ city }) {
  return <svg className={styles.cityArtwork} viewBox="0 0 320 130" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {city === 'Zurich' ? <><path d="m0 85 46-47 33 25 42-52 52 60 30-25 45 39M25 102h270M77 102V72h27v30M80 72l10-14 11 14M182 102V51h16v51M190 51V29M181 29h18M135 102V76h30v26M250 102V82h29v20" /><path d="m110 112 40 5 43-5 55 8M37 124h40" /></> : city === 'Geneva' ? <><path d="M0 101h320M134 100c0-23 21-37 23-74M157 26c0 38 24 46 25 74M157 26V7M157 26l-9-13m9 13 10-15M16 100V76h47v24M27 76V58h24v18M240 100V68h44v32M250 68V49h24v19" /><path d="m0 118 45-5 51 7 62-7 53 6 55-6 54 6" /></> : <><path d="M0 110h320M51 110V65h14v45m34 0V65h14v45m33 0V65h14v45m34 0V65h14v45M43 64h175V50H43v14ZM43 50l88-25 87 25M130 25V14M254 110V59m0 0V31m0 28h-10m10 0h10" /><circle cx="254" cy="65" r="13" /><path d="M21 110V83h14v27M285 110V91h26v19" /></>}
    </g>
  </svg>
}

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
  { label: 'Guides', href: '#guides' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For curators', href: '#curators' },
  { label: 'FAQ', href: '#faq' },
]

const CITY_GUIDES = [
  { city: 'Zurich', href: '/zurich/', description: 'Local favourites across Switzerland’s largest city' },
  { city: 'Geneva', href: '/geneva/', description: 'Lakefront cafés, dinners and local finds' },
  { city: 'Berlin', href: '/berlin/', description: 'Kiez favourites, coffee and nights out' },
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
  const [activeFeature, setActiveFeature] = useState(0)
  const [activeQuery, setActiveQuery] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pageRef = useRef(null)
  const carouselRef = useRef(null)
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

  useEffect(() => {
    const page = pageRef.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sections = page.querySelectorAll('[data-reveal]')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = 'true'
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    sections.forEach((section) => revealObserver.observe(section))
    let frame = 0
    function updateScroll() {
      frame = 0
      const scroll = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      page.style.setProperty('--scroll-progress', total > 0 ? scroll / total : 0)
      page.dataset.scrolled = scroll > 24
      if (!media.matches) {
        page.style.setProperty('--hero-shift', `${Math.min(scroll * 0.12, 85)}px`)
      }
    }
    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateScroll)
    }
    updateScroll()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setToast('')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'waitlist',
          email,
        }),
      })

      if (!response.ok) throw new Error('Mailing list submission failed')
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
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'curator-application',
          ...curatorForm,
        }),
      })

      if (!response.ok) {
        throw new Error(`Curator application failed with status ${response.status}`)
      }

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

  function selectFeature(index) {
    setActiveFeature(index)
  }

  function goToSlide(index) {
    const carousel = carouselRef.current

    if (!carousel) {
      return
    }

    carousel.scrollTo({
      left: carousel.clientWidth * index,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
    setActiveSlide(index)
  }

  return (
    <div className={styles.page} ref={pageRef}>
      <a className={styles.skipLink} href="#how-it-works">Skip to content</a>
      <div className={styles.scrollProgress} aria-hidden="true" />
      {staticMapUrl && (
        <img
          className={styles.mapBackdrop}
          src={staticMapUrl}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      )}

      <nav className={styles.nav} aria-label="Primary navigation">
        <div className={`container ${styles.navInner}`}>
          <a className={styles.brand} href="/" aria-label="YouKnow home">
            <img
              className={styles.brandLogo}
              src="/youknow-wordmark-blue.svg"
              alt="YouKnow"
              decoding="async"
            />
          </a>

          <button className={styles.menuToggle} type="button" aria-expanded={isMenuOpen} aria-controls="primary-links" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? 'Close −' : 'Menu +'}
          </button>
          <div id="primary-links" className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Link to="/about">About</Link>
            <a href="#guides">Guides</a>
            <a href="#how-it-works">How it works</a>
            <a href="#curators">For curators</a>
            <Link to="/tutorials">Tutorials</Link>
            <a className={styles.navCta} href="#download">
              Get the app <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.copy}>
              <span className={styles.heroEyebrow}>YOUR PEOPLE. YOUR PLACES.</span>
              <h1>
                The map curated by people
                <img
                  className={styles.heroWordmark}
                  src="/youknow-wordmark-blue.svg"
                  alt="YouKnow"
                  width="1420"
                  height="418"
                  decoding="async"
                />
              </h1>
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
              <MapArtwork />
              <span className={styles.mapCoordinate} aria-hidden="true">47.3769° N · 8.5417° E</span>
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

              <div className={styles.heroBackPhone} aria-hidden="true">
                <img src={SCREEN_FEATURES[4].src} alt="" decoding="async" />
              </div>
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
              </div>
              <div className={styles.heroPreviewPicker} aria-label="Choose app preview">
                {HERO_SCREENSHOTS.map((screenshot, index) => (
                  <button type="button" onClick={() => goToSlide(index)}
                    aria-pressed={activeSlide === index} key={screenshot.src}>
                    {['Your map', 'New cities', 'Your people'][index]}
                  </button>
                ))}
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
        <div className={`container ${styles.heroBottom}`}>
          <span>A little local knowledge. A whole new world.</span>
          <a href="#how-it-works">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
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
            <div className={styles.featureIntro} data-reveal>
              <span className={styles.sectionEyebrow}>How it works</span>
              <h2>No stars. No noise. Just the right places.</h2>
              <p>
                YouKnow turns recommendations from friends and local connoisseurs
                into a living map: clear, personal and built for actual plans.
              </p>
            </div>

            <div className={styles.featureStage}>
              <div className={styles.showcaseSticky}>
                <div className={styles.showcaseOrbit} aria-hidden="true" />
                <span className={styles.showcaseKicker}>A little look inside</span>
                <div className={styles.showcasePhone} aria-label="YouKnow app showcase">
                  {SCREEN_FEATURES.map((feature, index) => (
                    <img
                      className={`${styles.showcaseScreen} ${index === activeFeature ? styles.showcaseScreenActive : ''}`}
                      src={feature.src} alt={feature.alt} key={feature.src}
                      aria-hidden={index !== activeFeature}
                      loading="lazy" decoding="async"
                    />
                  ))}
                </div>
                <div className={styles.showcaseControls} aria-label="Choose app feature">
                  <button type="button" onClick={() => selectFeature(activeFeature - 1)} disabled={activeFeature === 0} aria-label="Previous app feature">←</button>
                  <span>{SCREEN_FEATURES[activeFeature].number} <span>/ {String(SCREEN_FEATURES.length).padStart(2, '0')}</span></span>
                  <button type="button" onClick={() => selectFeature(activeFeature + 1)} disabled={activeFeature === SCREEN_FEATURES.length - 1} aria-label="Next app feature">→</button>
                </div>
              </div>
              <div className={styles.featureSteps}>
                {SCREEN_FEATURES.map((feature, index) => (
                  <article className={`${styles.featureStep} ${index === activeFeature ? styles.featureStepActive : ''}`} key={feature.src}>
                    <h3>
                      <button type="button" className={styles.featureStepButton}
                        aria-expanded={index === activeFeature} aria-controls={`feature-panel-${index}`}
                        onClick={() => selectFeature(index)}>
                        <span className={styles.featureNumber}>{feature.number}</span>
                        <span>{feature.title}</span>
                        <span className={styles.featureToggle} aria-hidden="true">{index === activeFeature ? '−' : '+'}</span>
                      </button>
                    </h3>
                    <div id={`feature-panel-${index}`} hidden={index !== activeFeature} className={styles.featureDescription}>
                      <p>{feature.body}</p>
                      <img className={styles.featureMobileScreen} src={feature.src} alt={feature.alt} loading="lazy" decoding="async" />
                      <a href="#download">Try it in YouKnow <span aria-hidden="true">↗</span></a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.featureFooter}>
              <span>From “where should we go?” to “see you there.”</span>
              <Link className={styles.textLink} to="/tutorials">See how saving works</Link>
            </div>
          </div>
        </section>

        <section className={`${styles.storySection} ${styles.searchSection}`}>
          <div className={`container ${styles.searchInner}`}>
            <div className={styles.queryPanel}>
              <span className={styles.queryLabel}><Sparkle /> Ask YouKnow</span>
              <div className={styles.queryLine}>Find a place for...</div>
              <div className={styles.queryPrompt} aria-live="polite" key={activeQuery}>{QUERY_PILLS[activeQuery]}<span aria-hidden="true">↗</span></div>
              <p className={styles.queryHint}>A little inspiration. Pick your mood.</p>
              <div className={styles.queryPills}>
                {QUERY_PILLS.map((query, index) => (
                  <button type="button" className={activeQuery === index ? styles.queryPillActive : ''} aria-pressed={activeQuery === index} onClick={() => setActiveQuery(index)} key={query}>{query}</button>
                ))}
              </div>
              <a className={styles.queryFootnote} href="#download">Try search by vibe in the app <span aria-hidden="true">↗</span></a>
            </div>

            <div className={styles.storyCopy} data-reveal>
              <span className={styles.sectionEyebrow}>Search by vibe</span>
              <h2 className={styles.searchHeadline}>Ask for a vibe, not a rating.</h2>
              <p>
                Describe the night you want, from a quiet coffee to a second-date
                wine bar, and find places that match your people and your mood.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cityGuideSection} id="guides">
          <div className="container">
            <div className={styles.cityGuideHeader} data-reveal>
              <div>
                <span className={styles.sectionEyebrow}>Explore guides</span>
                <h2>Guides for your next city trip.</h2>
              </div>
              <p>
                Choose a city to open its guide. Each one starts with five real
                community recommendations, then lets you continue on the full map.
              </p>
            </div>

            <div className={styles.cityGuideCities} aria-label="Available city guides">
              {CITY_GUIDES.map((guide, index) => (
                <Link className={styles.cityGuideCityCard} to={guide.href} key={guide.href}>
                  <div className={styles.cityGuideCityTop}>
                    <span>YouKnow city guide</span>
                    <span className={styles.cityIndex} aria-hidden="true">0{index + 1} ↗</span>
                  </div>
                  <CityArtwork city={guide.city} />
                  <div>
                    <h3>{guide.city}</h3>
                    <p>{guide.description}</p>
                    <span className={styles.cityGuideCityLink}>Explore {guide.city} →</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.guideMoods}>
              <span>Explore Zurich by mood</span>
              <div aria-label="Zurich guides by mood">
                <Link to="/zurich/cafes/">Coffee stops <span aria-hidden="true">↗</span></Link>
                <Link to="/zurich/cosy-restaurants/">Cosy dinners <span aria-hidden="true">↗</span></Link>
                <Link to="/zurich/bars/">One more drink <span aria-hidden="true">↗</span></Link>
                <Link to="/zurich/date-night/">Date night <span aria-hidden="true">↗</span></Link>
                <Link to="/zurich/hidden-gems/">Hidden gems <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.storySection} id="curators">
          <div className={`container ${styles.curatorBand}`}>
            <div className={styles.storyCopy} data-reveal>
              <span className={styles.sectionEyebrow}>For curators</span>
              <h2>Built by people who know you.</h2>
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
                    aria-label="Your name"
                    autoComplete="name"
                    placeholder="Name"
                    value={curatorForm.name}
                    onChange={handleCuratorChange}
                    required
                  />

                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    aria-label="Your email"
                    autoComplete="email"
                    placeholder="Email"
                    value={curatorForm.email}
                    onChange={handleCuratorChange}
                    required
                  />

                  <textarea
                    className={styles.textarea}
                    name="taste"
                    aria-label="Why should people trust your taste?"
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
            <div className={styles.faqIntro} data-reveal>
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
          <div className={styles.finalCtaInner} data-reveal>
            <span className={styles.sectionEyebrow}>GOOD PLACES. BETTER COMPANY.</span>
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
                aria-label="Email for app updates"
                autoComplete="email"
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

            {toast && <p className={styles.toast} role="status">{toast}</p>}
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
