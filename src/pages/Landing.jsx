import NightMapBackground from '../components/NightMapBackground'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FALLBACK_STATS, getFaqItems, initialLandingStats } from '../landingContent'
import { usePageMetadata } from '../usePageMetadata'
import { appStoreHref, openIOSAppStore } from '../appStoreLink'
import SocialSaveSection from '../components/SocialSaveSection'
import NeighbourhoodMap from '../components/NeighbourhoodMap'
import styles from './Landing.module.css'

const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.youknow.mobile'
const COUNT_REFRESH_INTERVAL_MS = 60000
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const STATS_TABLE = import.meta.env.VITE_SUPABASE_STATS_TABLE || 'website_stats'
const STATS_ROW_ID = import.meta.env.VITE_SUPABASE_STATS_ROW_ID || 'landing'

const SCREEN_FEATURES = [
  {
    id: 'map',
    src: '/images/youknow-map-20261015.webp',
    title: 'Start with the living map',
    body: 'Explore places recommended by people you trust. Narrow your map by friends, food, drinks, coffee or what is open now.',
  },
  {
    id: 'cities',
    src: '/images/IMG_6350.PNG',
    title: 'Explore any city',
    body: 'Drop into Zurich, Milan, Paris or wherever you are headed, and see the places the community actually recommends.',
  },
  {
    id: 'friends',
    src: '/images/youknow-feed-20261015.webp',
    title: 'See what friends recommend',
    body: 'Explore your feed for friends’ recommendations, recent pictures and the community’s top curators.',
    alt: 'YouKnow feed showing top curators and places recommended by friends.',
  },
  {
    id: 'social-sharing',
    title: 'Save places from Instagram & TikTok',
    body: 'Turn a place you discover while scrolling into somewhere you can actually go. Share it straight into YouKnow to find the location and keep it on your map.',
    steps: [
      'Find a restaurant, bar or café on Instagram or TikTok. Tap Share and choose YouKnow.',
      'YouKnow opens and suggests the likeliest matching places. Check the result to choose the right one.',
      'Save the place to your map, ready for your next plan.',
    ],
    src: '/images/social-sharing-demo.gif',
    animationStill: '/images/social-sharing-poster.png',
    alt: 'Animation showing sharing an Instagram post into YouKnow, confirming the place, and saving it to your map.',
  },
  {
    id: 'saved',
    src: '/images/youknow-profile-20261015.webp',
    title: 'Organize your own recommendations',
    body: 'Keep your saved and want-to-go places together on your profile, and browse them by city, category or distance.',
    alt: 'YouKnow profile showing saved places, want-to-go lists and filters for city, category and distance.',
  },
  {
    id: 'curations',
    src: '/images/youknow-curations-20261015.webp',
    title: 'Create and follow curations',
    body: 'Follow independent curations drawn from the Michelin Guide, The World’s 50 Best and La Liste alongside collections made by friends and creators. Or bring places together in a curation of your own.',
    alt: 'YouKnow Curations screen showing personal collections of places and an option to join a private curation with an invite code.',
  },
  {
    id: 'place',
    src: '/images/youknow-place-20261015.webp',
    title: 'Get to know a place',
    body: 'See photos and who saved a place, check the details, then save it for later or get directions.',
  },
  {
    id: 'ai-search',
    src: '/images/youknow-search-20261015.webp',
    title: 'Search by vibe with AI',
    body: 'Describe what you have in mind. Get recommendations from your map and ask follow-up questions to find the right place.',
  },
].map((feature, index) => ({
  ...feature,
  alt: feature.alt || `YouKnow app screenshot showing ${feature.title.toLowerCase()}.`,
  number: String(index + 1).padStart(2, '0'),
}))

const HERO_SCREENSHOTS = [
  SCREEN_FEATURES[0],
  SCREEN_FEATURES.find(feature => feature.id === 'ai-search'),
  SCREEN_FEATURES.find(feature => feature.id === 'place'),
]

function AnimatedFeaturePreview({ feature, className }) {
  const [isPaused, setIsPaused] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setIsPaused(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <figure className={className}>
      <img className={styles.featureAnimationImage}
        src={isPaused ? feature.animationStill : feature.src}
        alt={feature.alt} width="320" height="706" loading="lazy" decoding="async" />
      <button className={styles.featureAnimationToggle} type="button"
        aria-label={isPaused ? 'Play sharing animation' : 'Pause sharing animation'}
        onClick={() => setIsPaused((paused) => !paused)}>
        {isPaused ? 'Play' : 'Pause'}
      </button>
    </figure>
  )
}

function FeaturePreview({ feature, className, active = true }) {
  if (feature.animationStill) {
    return active ? <AnimatedFeaturePreview feature={feature} className={className} /> : null
  }

  return (
    <img className={className} src={feature.src} alt={feature.alt}
      aria-hidden={!active} loading="lazy" decoding="async" />
  )
}

function CityArtwork({ city }) {
  return <svg className={styles.cityArtwork} viewBox="0 0 320 130" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {city === 'Zurich' ? <><path d="m0 85 46-47 33 25 42-52 52 60 30-25 45 39M25 102h270M77 102V72h27v30M80 72l10-14 11 14M182 102V51h16v51M190 51V29M181 29h18M135 102V76h30v26M250 102V82h29v20" /><path d="m110 112 40 5 43-5 55 8M37 124h40" /></> : city === 'Geneva' ? <><path d="M0 101h320M134 100c0-23 21-37 23-74M157 26c0 38 24 46 25 74M157 26V7M157 26l-9-13m9 13 10-15M16 100V76h47v24M27 76V58h24v18M240 100V68h44v32M250 68V49h24v19" /><path d="m0 118 45-5 51 7 62-7 53 6 55-6 54 6" /></> : <><path d="M0 110h320M51 110V65h14v45m34 0V65h14v45m33 0V65h14v45m34 0V65h14v45M43 64h175V50H43v14ZM43 50l88-25 87 25M130 25V14M254 110V59m0 0V31m0 28h-10m10 0h10" /><circle cx="254" cy="65" r="13" /><path d="M21 110V83h14v27M285 110V91h26v19" /></>}
    </g>
  </svg>
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
          <span>Shared by the YouKnow community</span>
        </div>
        <div className={styles.statItem}>
          <strong>{formatCount(cityCount)} cities</strong>
          <span>Local knowledge, shared from person to person</span>
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
  { label: 'Community', href: '#community' },
  { label: 'Travel', href: '#guides' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For curators', href: '#curators' },
  { label: 'FAQ', href: '#faq' },
]

const CITY_GUIDES = [
  { city: 'Zurich', href: '/zurich/', description: 'Local favourites across Switzerland’s largest city' },
  { city: 'Geneva', href: '/geneva/', description: 'Lakefront cafés, dinners and local finds' },
  { city: 'Berlin', href: '/berlin/', description: 'Kiez favourites, coffee and nights out' },
]

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

export default function Landing({ initialStats } = {}) {
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
  const [stats, setStats] = useState(() => initialStats || initialLandingStats())
  const [activeFeature, setActiveFeature] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pageRef = useRef(null)
  const cityCount = positiveCountOrFallback(stats.cities, FALLBACK_STATS.cities)
  const faqItems = getFaqItems(cityCount)

  usePageMetadata('home', { cityCount })

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

  function selectFeature(index) {
    setActiveFeature(index)
  }

  return (
    <div className={styles.page} ref={pageRef}>
      <NightMapBackground />
      <a className={styles.skipLink} href="#how-it-works">Skip to content</a>
      <div className={styles.scrollProgress} aria-hidden="true" />
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
            <a href="#community">Community</a>
            <Link to="/about">About</Link>
            <a href="#guides">Travel</a>
            <a href="#how-it-works">How it works</a>
            <a className={styles.navCta} href="#download">
              Get the app <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </nav>

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

      <main className={styles.editorial}>
        <SocialSaveSection
          screenshots={HERO_SCREENSHOTS}
          downloadButtons={<StoreButtons />}
          communityNote={`Live in ${formatCount(cityCount)} cities`}
        />

        <StatStrip stats={stats} />

        <section className={styles.communitySection} id="community" aria-labelledby="community-heading">
          <div className="container">
            <div className={styles.communityIntro}>
              <span className={styles.sectionEyebrow}>Good places. Better together.</span>
              <h2 id="community-heading">Your people<br />know a place.</h2>
              <p>
                A friend’s favourite café. A local’s little secret. A place you
                cannot wait to share. Every recommendation adds a little more
                local knowledge to a map built by the community.
              </p>
            </div>
            <div className={styles.communityWays}>
              <article>
                <span>01 / Your friends</span>
                <h3>Start with people you trust.</h3>
                <p>See what your friends recommend, follow their finds, and turn “you’d love this place” into your next plan.</p>
              </article>
              <article>
                <span>02 / Your kind of locals</span>
                <h3>Find people who get your taste.</h3>
                <p>Discover local connoisseurs and curations made by people who know the neighbourhood, wherever you go.</p>
              </article>
              <article>
                <span>03 / A little from you</span>
                <h3>Pass a good place on.</h3>
                <p>Save somewhere you love and share your recommendations. Your favourite spot could be someone else’s next great find.</p>
              </article>
            </div>
            <a className={styles.textLink} href="#download">Find your people. Build your map.</a>
          </div>
        </section>

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
                    <FeaturePreview
                      feature={feature}
                      className={`${styles.showcaseScreen} ${index === activeFeature ? styles.showcaseScreenActive : ''}`}
                      key={feature.id}
                      active={index === activeFeature}
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
                  <article className={`${styles.featureStep} ${index === activeFeature ? styles.featureStepActive : ''}`} key={feature.id}>
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
                      {feature.steps && (
                        <ol className={styles.sharingSteps}>
                          {feature.steps.map((step) => <li key={step}>{step}</li>)}
                        </ol>
                      )}
                      {index === activeFeature && (
                        <FeaturePreview feature={feature} className={styles.featureMobileScreen} />
                      )}
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

        <NeighbourhoodMap />

        <section className={styles.cityGuideSection} id="guides" aria-labelledby="travel-heading">
          <div className="container">
            <div className={styles.cityGuideHeader} data-reveal>
              <div>
                <span className={styles.sectionEyebrow}>Travel with your people’s favourites</span>
                <h2 id="travel-heading">New city. Your friends might already know a place.</h2>
              </div>
              <p>
                Your friends’ favourites shouldn’t be scattered across chats, notes
                and screenshots. Ask them to save their spots on YouKnow, then see
                all their recommendations together on your map—ready for your next trip.
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
            <a href="/sitemap.html">All pages</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
