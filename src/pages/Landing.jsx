import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const ANDROID_DOWNLOAD_PATH =
  'https://github.com/IfYouKknowYouKnow/website/releases/latest/download/app-release.apk'
const APP_STORE_URL = 'https://apps.apple.com/us/app/yk-youknow/id6759484614'
const INVITE_CODE = 'QNU9JKFX'
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
const FALLBACK_STATS = {
  curatedPlaces: 4814,
  cities: 331,
}
const COUNT_REFRESH_INTERVAL_MS = 60000
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const STATS_TABLE = import.meta.env.VITE_SUPABASE_STATS_TABLE || 'website_stats'
const STATS_ROW_ID = import.meta.env.VITE_SUPABASE_STATS_ROW_ID || 'landing'

const FLOATING_TAGS = [
  { text: 'Cute brunch spot', className: styles.floatOne, dotColor: '#e01c1c' },
  { text: 'Natural Wine in Zurich', className: styles.floatTwo, dotColor: '#16834a' },
  { text: 'Saved by friends', className: styles.floatThree, dotColor: '#2f6eea' },
  { text: 'Date night', className: styles.floatFour, dotColor: '#d36b17' },
  { text: 'Karaoke night with the girls', className: styles.floatFive, dotColor: '#9b4de3' },
  { text: 'IYKYK', className: styles.floatSix, dotColor: '#00a6a6' },
]

const HERO_SCREENSHOTS = [
  {
    src: '/new_screen_iphon.PNG',
    alt: 'YouKnow app screen showing the latest place recommendation view.',
  },
  {
    src: '/feed_new.png',
    alt: 'YouKnow feed screen showing friend activity and trending places.',
  },
  {
    src: '/profile_new.png',
    alt: 'YouKnow profile screen showing saved places and personal recommendations.',
  },
]

const QUIET_POINTS = [
  {
    text: 'Save places you like',
    tutorialLink: true,
  },
  {
    text: 'Get recommendations from people you trust',
  },
  {
    text: 'Plan nights out without endless searching',
  },
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
  url.searchParams.set('select', 'curated_places_count,city_count')
  url.searchParams.set('limit', '1')

  const response = await fetch(url, {
    signal,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
  }
}

export default function Landing() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState('')
  const [stats, setStats] = useState(FALLBACK_STATS)
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef(null)
  const staticMapUrl = getStaticMapUrl()

  useEffect(() => {
    const abortController = new AbortController()

    async function refreshCounts() {
      try {
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

    refreshCounts()
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

  function handleCarouselScroll(e) {
    const { scrollLeft, clientWidth } = e.currentTarget
    const nextSlide = Math.round(scrollLeft / clientWidth)

    if (nextSlide !== activeSlide) {
      setActiveSlide(nextSlide)
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
              src="/oyster_logo.jpeg"
              alt=""
              aria-hidden="true"
              decoding="async"
            />
            <span>YouKnow</span>
          </a>

          <a className={styles.navCta} href="#waitlist">
            Join waitlist
          </a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.copy}>
              <p className={styles.kicker}>YouKnow</p>
              <h1>A Map Curated by People Who Know.</h1>
              <p className={styles.subhead}>
                Discover restaurants, bars, cafes, and experiences through people you trust.
              </p>

              <div className={styles.actions}>
                <a
                  className={styles.primaryButton}
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get the app
                </a>
                <a className={styles.secondaryLink} href={ANDROID_DOWNLOAD_PATH}>
                  Android beta
                </a>
              </div>

              <div className={styles.proof} aria-label="Live YouKnow community stats">
                <div className={styles.proofStat}>
                  <strong>{formatCount(stats.curatedPlaces)}</strong>
                  <span>places</span>
                </div>
                <span className={styles.proofJoin}>in</span>
                <div className={styles.proofStat}>
                  <strong>{formatCount(stats.cities)}</strong>
                  <span>cities</span>
                </div>
                <p className={styles.proofMeta}>
                  <span>Invite code {INVITE_CODE}</span>
                </p>
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
            </div>
          </div>
        </div>
      </section>

      <form name="waitlist" method="POST" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="waitlist" />
        <input type="email" name="email" />
      </form>

      <section className={styles.info} id="waitlist">
        <div className="container">
          <div className={styles.infoGrid}>
            {QUIET_POINTS.map((point) => (
              <div className={styles.infoPoint} key={point.text}>
                <p>{point.text}</p>

                {point.tutorialLink && (
                  <Link className={styles.infoButton} to="/tutorials">
                    How?
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className={styles.waitlistPanel}>
            <p>Get launch updates and new city drops.</p>

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
                {isSubmitting ? 'Joining...' : 'Join waitlist'}
              </button>
            </form>

            {toast && <p className={styles.toast}>{toast}</p>}
          </div>

          <div className={styles.supportMark}>
            <span>Built with the support of SPH</span>
            <img
              src="/sph_logo.jpeg"
              alt="ETH Student Project House"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={styles.footerBrand}>YouKnow</span>
          <p className={styles.footerCopy}>© 2026 YouKnow</p>
          <div className={styles.footerLinks}>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
