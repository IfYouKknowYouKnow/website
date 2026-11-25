import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FALLBACK_STATS, getFaqItems, initialLandingStats } from '../landingContent'
import { usePageMetadata } from '../usePageMetadata'
import { appStoreHref, openIOSAppStore } from '../appStoreLink'
import ProductStory from '../components/ProductStory'
import Personalization from '../components/Personalization'
import HeroRecommendations from '../components/HeroRecommendations'
import { HERO_MOOD_EXAMPLES } from '../heroMoodExamples'
import communityPlaces from '../cityGuideCommunityPlaces.js'
import { categoryLabels, getCityGuides } from '../cityGuides'
import styles from './Landing.module.css'
import { msg, useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

const ANDROID_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.youknow.mobile'
const COUNT_REFRESH_INTERVAL_MS = 60000
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const STATS_TABLE = import.meta.env.VITE_SUPABASE_STATS_TABLE || 'website_stats'
const STATS_ROW_ID = import.meta.env.VITE_SUPABASE_STATS_ROW_ID || 'landing'

function Icon({ name = 'arrow', className = '' }) {
  const paths = {
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15m6-12v15" /></>,
    bookmark: <path d="M6 4h12v17l-6-4-6 4V4Z" />,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
    place: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    import: <><path d="M12 3v12m-4-4 4 4 4-4M4 15v6h16v-6" /></>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>
}

function AppIdentity() {
  const { tr } = useI18n()
  return <div className={styles.appIdentity}>
    <img src="/icons/youknow-icon-192.png" alt={tr('YouKnow app icon')} width="56" height="56" />
    <div><strong>YouKnow Map</strong><span>{tr('Look for this icon in the app stores.')}</span></div>
  </div>
}

function StoreButtons() {
  const { tr } = useI18n()
  return <div className={styles.storeButtons}>
    <a href={appStoreHref()} onClick={openIOSAppStore} aria-label={tr('Download on the App Store')}>
      <img src="/badges/app-store-badge.svg" alt={tr('Download on the App Store')} width="140" height="47" />
    </a>
    <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noreferrer" aria-label={tr('Get it on Google Play')}>
      <img src="/badges/google-play-badge.png" alt={tr('Get it on Google Play')} width="164" height="63" />
    </a>
  </div>
}

const COLLECTION_FEATURES = [
  { number: '01', title: msg('See what friends recommend'), text: msg('Find people who get your taste. Follow their finds and see what they are loving lately.'), src: '/images/youknow-feed-20261015.webp', alt: msg('YouKnow feed showing top curators and recommendations from friends.'), theme: 'peach', icon: 'people' },
  { number: '02', title: msg('Organize your own recommendations'), text: msg('Want to go. Already love. Keep your places together, ready for the right moment.'), src: '/images/youknow-profile-20261015.webp', alt: msg('YouKnow profile with saved places, want-to-go lists and filters.'), theme: 'blue', icon: 'bookmark' },
  { number: '03', title: msg('Create and follow curations'), text: msg('Your personal shortlist, a friend’s collection, or an independent guide. Good taste comes in many forms.'), src: '/images/youknow-curations-editorial-860.webp', srcSet: '/images/youknow-curations-editorial-430.webp 430w, /images/youknow-curations-editorial-860.webp 860w', alt: msg('YouKnow curations showing Augusta Sboccia in Città, the MICHELIN Guide and La Liste.'), theme: 'green', icon: 'map' },
]
const CITY_GUIDES = [
  { slug: 'zurich', href: '/zurich/', image: '/images/cities/zurich-app-860.webp', mood: msg('Coffee stops. Dinner plans. Your people’s picks.'), alt: msg('YouKnow’s Zurich city view, showing the map, category filters and recommended places.') },
  { slug: 'geneva', href: '/geneva/', image: '/images/cities/geneva-app-860.webp', mood: msg('A little local knowledge, ready when you land.'), alt: msg('YouKnow’s Geneva city view, showing the lakeside map and a list of places to explore.') },
  { slug: 'berlin', href: '/berlin/', image: '/images/cities/berlin-app-860.webp', mood: msg('Good food. Late nights. One city map.'), alt: msg('YouKnow’s Berlin city view, showing the map and recommendations including Gropius Bau and Bellboy Bar.') },
  { slug: 'milan', href: '/milan/', image: '/images/cities/milan-app-860.webp', mood: msg('Aperitivo plans. Long dinners. Good company.'), alt: msg('YouKnow’s Milan city view, with the map and its Top picks list.'), picks: communityPlaces.milan.slice(0, 3).map(place => place.name) },
  { slug: 'paris', href: '/paris/', image: '/images/cities/paris-app-860.webp', mood: msg('Bistros, wine bars and your next favourite address.'), alt: msg('YouKnow’s Paris city view, with the map and its Top picks list.'), picks: communityPlaces.paris.slice(0, 3).map(place => place.name) },
  { slug: 'tokyo', href: '/tokyo/', image: '/images/cities/tokyo-app-860.webp', mood: msg('Dinner, discoveries and nights worth sharing.'), alt: msg('YouKnow’s Tokyo city view, with the map and its Top picks list.'), picks: communityPlaces.tokyo.slice(0, 3).map(place => place.name) },
]

function useScrollDesign(pageRef, isMenuOpen, setIsMenuOpen) {
  useEffect(() => {
    const page = pageRef.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.dataset.visible = 'true'; reveal.unobserve(entry.target) } })
    }, { threshold: .12 })
    page.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element))
    const motionChange = () => { page.dataset.motion = !media.matches }
    motionChange()
    media.addEventListener('change', motionChange)
    return () => { reveal.disconnect(); media.removeEventListener('change', motionChange) }
  }, [pageRef])
  useEffect(() => {
    if (!isMenuOpen) return
    const close = event => { if (event.key === 'Escape') { setIsMenuOpen(false); pageRef.current.querySelector('[aria-controls="primary-links"]').focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [isMenuOpen, pageRef, setIsMenuOpen])
}

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
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
  const i18n = useI18n()
  const { tr, href, formatNumber: formatCount, guides: copy } = i18n
  const guides = getCityGuides(copy)
  const labels = categoryLabels(copy)
  const [heroMood, setHeroMood] = useState(0)
  const [heroPlace, setHeroPlace] = useState(0)
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pageRef = useRef(null)
  const cityScrollerRef = useRef(null)
  const [cityScroll, setCityScroll] = useState({ start: true, end: false })
  const cityCount = positiveCountOrFallback(stats.cities, FALLBACK_STATS.cities)
  const faqItems = getFaqItems(cityCount, i18n)
  const mood = HERO_MOOD_EXAMPLES[heroMood]
  const selectedHeroPlace = mood.places[heroPlace]

  usePageMetadata('home', { cityCount })
  useScrollDesign(pageRef, isMenuOpen, setIsMenuOpen)

  useEffect(() => {
    const scroller = cityScrollerRef.current
    const update = () => {
      const start = scroller.scrollLeft < 2
      const end = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2
      setCityScroll(current => current.start === start && current.end === end ? current : { start, end })
    }
    const resize = new ResizeObserver(update)
    resize.observe(scroller)
    scroller.addEventListener('scroll', update, { passive: true })
    update()
    return () => { resize.disconnect(); scroller.removeEventListener('scroll', update) }
  }, [])

  function scrollCities(direction) {
    const scroller = cityScrollerRef.current
    const step = scroller.firstElementChild.offsetWidth + parseFloat(getComputedStyle(scroller).columnGap)
    scroller.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

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
      setToast(tr('You are on the list!'))

      setTimeout(() => {
        setToast('')
      }, 3000)
    } catch (error) {
      console.error('Mailing list submission failed:', error)
      setToast(tr('Something went wrong. Please try again.'))
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
      setCuratorToast(tr('Application sent.'))

      setTimeout(() => {
        setCuratorToast('')
      }, 3000)
    } catch (error) {
      console.error('Curator application submission failed:', error)
      setCuratorToast(tr('Something went wrong. Please try again.'))
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


  return <div className={styles.page} ref={pageRef}>
    <a className={styles.skipLink} href="#main-content">{tr('Skip to content')}</a>
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link className={styles.brand} to="/" aria-label={tr('YouKnow home')}><img src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" width="145" height="43" /></Link>
        <button className={styles.menuToggle} type="button" aria-expanded={isMenuOpen} aria-controls="primary-links" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? tr('Close −') : tr('Menu +')}</button>
        <nav id="primary-links" className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`} aria-label={tr('Primary navigation')} onClick={() => setIsMenuOpen(false)}>
          <a href="#how-it-works">{tr('Product')}</a><a href="#community">{tr('Community')}</a><a href="#guides">{tr('City guides')}</a><Link to="/about">{tr('About')}</Link>
          <a className={styles.navCta} href="#download">{tr('Get YouKnow')}</a>
        </nav>
      </div>
    </header>

    <main id="main-content">
      <section className={styles.hero} data-hero aria-labelledby="hero-heading">
        <div className={`${styles.heroInner} ${styles.wrap}`}>
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>{tr('Welcome to YouKnow')}</span>
          <h1 id="hero-heading">{tr('Your map starts')}<br /><span>{tr('with you.')}</span></h1>
          <p className={styles.heroDescription}>
            <span className={styles.desktopHeroDescription}>{tr('Save the places you love. Find your next favourites through people who get you.')}</span>
            <span className={styles.mobileHeroDescription}>{tr('Good places, from people you trust.')}</span>
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#download">{tr('Get YouKnow')}</a>
            <a className={styles.heroExplore} href="#how-it-works">{tr('Explore the app')}{' '}<span aria-hidden="true">↓</span></a>
          </div>
          <StoreButtons />
          <span className={styles.freeNote}>{tr('Completely free. On iOS & Android.')}</span>
        </div>
        <div className={styles.heroVisual} data-mood={heroMood}>
          <div className={styles.visualHeading}><span>{tr('Find your next favourite.')}</span><span>{tr('Pick a mood')}</span></div>
          <div className={styles.moodPicker} role="group" aria-label={tr('Choose a mood for the homepage preview')}>
            {HERO_MOOD_EXAMPLES.map((example, index) => <button type="button" key={example.label} aria-pressed={heroMood === index}
              aria-controls="hero-recommendations" onClick={() => { setHeroMood(index); setHeroPlace(0) }}><img src={example.persona} alt="" width="26" height="26" />{tr(example.label)}</button>)}
          </div>
          <div className={styles.heroScene}>
            <div className={styles.heroPhoto}>
              <img key={heroMood} src={`/images/editorial/${mood.image}.jpg`} alt={tr(mood.photoAlt)} width="1400" height="960" fetchpriority="high" />
              <p>{tr(mood.caption)}</p>
            </div>
            <div className={styles.heroPhone}>
              <img src="/images/youknow-map-860.webp" srcSet="/images/youknow-map-430.webp 430w, /images/youknow-map-860.webp 860w" sizes="(max-width:760px) clamp(184px,58vw,244px), (max-width:900px) 220px, 245px" alt={tr('YouKnow app map showing real recommendations around Zurich.')} width="1290" height="2796" fetchpriority="high" />
              <span className={styles.heroMapPick} aria-hidden="true" key={`${heroMood}-${heroPlace}`}
                style={{ left: `${selectedHeroPlace.x}%`, top: `${selectedHeroPlace.y}%`, '--source-accent': mood.accent }}>
                <span>{mood.initial}</span><strong>{tr('{name}’s pick', { name: mood.name })}</strong>
              </span>
            </div>
          </div>
          <HeroRecommendations mood={mood} selectedIndex={heroPlace} onSelect={setHeroPlace} />
        </div>
        <div className={styles.heroBottom}><span>{tr('Local knowledge. A world of possibilities.')}</span><span>{tr('AVAILABLE IN')} <LanguageSwitcher /></span><a href="#how-it-works">{tr('DISCOVER YOUKNOW')}{' '}<span aria-hidden="true">↓</span></a></div>
        </div>
      </section>

      <section className={styles.stats} aria-label={tr('YouKnow community stats')}>
        <div className={styles.wrap}>
          <div><strong>{formatCount(positiveCountOrFallback(stats.curatedPlaces, FALLBACK_STATS.curatedPlaces))}<span>+</span></strong><span>{tr('curated places')}</span></div>
          <div><strong>{formatCount(cityCount)}</strong><span>{tr('cities and counting')}</span></div>
          <p>{tr('Recommendations with a point of view.')}<br /><span>{tr('From your friends to independent guides.')}</span></p>
        </div>
      </section>

      <div className={styles.wrap}><ProductStory /></div>

      <div className={styles.wrap}><Personalization /></div>

      <section className={`${styles.collection} ${styles.wrap}`} id="community" aria-labelledby="collection-heading">
        <div className={styles.sectionHeader} data-reveal>
          <div><span className={styles.eyebrow}>{tr('BETTER WITH YOUR PEOPLE')}</span><h2 id="collection-heading">{tr('Good taste.')}<br /><span>{tr('Better connected.')}</span></h2></div>
          <p>{tr('A personal collection of places, shaped by')}<br />{tr('the people and guides you choose to follow.')}</p>
        </div>
        <div className={styles.featureGrid}>
          {COLLECTION_FEATURES.map(feature => <article className={styles.featureCard} data-theme={feature.theme} key={feature.number} data-reveal>
            <div className={styles.cardTop}><Icon name={feature.icon} /><span>{tr('Made for your map')}</span></div>
            <h3>{tr(feature.title)}</h3><p>{tr(feature.text)}</p>
            <div className={styles.cardScreen}><img src={feature.src} srcSet={feature.srcSet} sizes={feature.srcSet ? '240px' : undefined} alt={tr(feature.alt)} width="1290" height="2796" loading="lazy" decoding="async" /></div>
          </article>)}
        </div>
        <div className={styles.smallFeatures}>
          <article data-reveal><Icon name="globe" /><h3>{tr('Explore any city')}</h3><p>{tr('Take your people’s favourites with you. From a familiar neighbourhood to your next trip.')}</p></article>
          <article data-reveal><Icon name="place" /><h3>{tr('Get to know a place')}</h3><p>{tr('Photos, details, directions, and the people who saved it. Everything you need to make a plan.')}</p></article>
          <article data-reveal><Icon name="import" /><h3>{tr('Bring your saved places')}</h3><p>{tr('Import a shared Google Maps list and keep your Instagram, TikTok and Google Maps finds together.')}</p><Link to="/tutorials#google-saved-places">{tr('See how to import')}{' '}<span aria-hidden="true">↗</span></Link></article>
        </div>
        <div className={styles.guideNote}><span>{tr('Independent curations alongside your inner circle.')}</span><p>{tr('Michelin Guide')}{' '}<span> / </span>{' '}{tr('The World’s 50 Best')}{' '}<span> / </span>{' '}{tr('La Liste')}</p></div>
      </section>

      <section className={styles.travel} id="guides" aria-labelledby="travel-heading">
        <div className={styles.wrap}>
          <div className={styles.sectionHeader} data-reveal>
            <div><span className={styles.eyebrow}>{tr('LOCAL KNOWLEDGE, EVERYWHERE')}</span><h2 id="travel-heading">{tr('A new city.')}<br /><span>{tr('A familiar feeling.')}</span></h2></div>
            <div className={styles.travelIntro}><p>{tr('Explore recommendations in')} <strong>{tr('{count} cities and counting.', { count: formatCount(cityCount) })}</strong> {tr('These are just a few city previews.')}</p><a className={styles.textLink} href="#download">{tr('Explore more cities in the app')}{' '}<Icon /></a></div>
          </div>
          <div className={styles.cityControls}>
            <span>{tr('SIX CITY GUIDES. KEEP EXPLORING.')}{' '}<span aria-hidden="true">↔</span></span>
            <div role="group" aria-label={tr('Scroll city guides')}>
              <button type="button" aria-label={tr('Previous city guides')} aria-controls="city-previews" disabled={cityScroll.start} onClick={() => scrollCities(-1)}><span aria-hidden="true">←</span></button>
              <button type="button" aria-label={tr('Next city guides')} aria-controls="city-previews" disabled={cityScroll.end} onClick={() => scrollCities(1)}><span aria-hidden="true">→</span></button>
            </div>
          </div>
          <div className={styles.cityGrid} id="city-previews" ref={cityScrollerRef} role="region" aria-label={tr('City guide previews')} tabIndex={0} onKeyDown={event => {
            if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
              event.preventDefault()
              scrollCities(event.key === 'ArrowRight' ? 1 : -1)
            }
          }}>{CITY_GUIDES.map((guide) => <Link className={styles.cityCard} to={guide.href} key={guide.slug} data-reveal>
            <div className={styles.cityImage}><img src={guide.image} srcSet={`${guide.image.replace('-860.webp', '-430.webp')} 430w, ${guide.image} 860w`} sizes="230px" alt={tr(guide.alt)} width="1290" height="2796" loading="lazy" decoding="async" /><span className={styles.cityBadge}>{tr('Your next stop')}</span><span className={styles.cityArrow}><Icon /></span></div>
            <div className={styles.cityCopy}><h3>{copy.cities[guide.slug]}</h3><p>{tr(guide.mood)}</p>{guide.picks && <p className={styles.cityCommunityPicks}><span>{tr('COMMUNITY PICKS')}</span>{guide.picks.join(' · ')}</p>}</div>
          </Link>)}</div>
          <nav className={styles.cityDirectory} aria-label={tr('City guides by category')}>
            {Object.values(guides).map(city => <div className={styles.moodLinks} key={city.slug}><span>{city.city.toUpperCase()}</span>
              {Object.keys(labels).filter(kind => city.topics[kind]).map(kind => <Link to={`${city.path}${kind}/`} key={kind}>{city.topics[kind].title} ↗</Link>)}
            </div>)}
          </nav>
          <div className={styles.moodLinks}><span>{tr('ZURICH, BY MOOD')}</span><Link to="/zurich/cafes/">{tr('Coffee stops ↗')}</Link><Link to="/zurich/cosy-restaurants/">{tr('Cosy dinners ↗')}</Link><Link to="/zurich/bars/">{tr('One more drink ↗')}</Link><Link to="/zurich/date-night/">{tr('Date night ↗')}</Link><Link to="/zurich/hidden-gems/">{tr('Hidden gems ↗')}</Link></div>
        </div>
      </section>

      <section className={`${styles.curators} ${styles.wrap}`} id="curators" aria-labelledby="curator-heading">
        <div className={styles.curatorVisual} data-reveal>
          <span className={styles.curatorVisualLabel}>{tr('CURATED BY PEOPLE. SHARED WITH PURPOSE.')}</span>
          <svg className={styles.sharingRoute} viewBox="0 0 500 500" fill="none" aria-hidden="true"><path d="M-30 250C40 340 75 165 165 190S290 330 375 250 465 125 530 170" stroke="currentColor" strokeWidth="2" strokeDasharray="7 9" /></svg>
          <div className={styles.placeTicket}>
            <div className={styles.ticketPin}><Icon name="place" /></div>
            <div><span>{tr('SAVED BY YOU')}</span><strong>{tr('Your go-to spot.')}</strong><small>{tr('Too good to keep to yourself.')}</small></div>
            <Icon name="bookmark" className={styles.ticketBookmark} />
          </div>
          <div className={styles.sharingStamp}><Icon /></div>
          <div className={styles.sharingPeople}><Icon name="people" /><span>{tr('Shared with your people')}</span></div>
          <p className={styles.sharingHeadline}>{tr('Know a good place?')}<br /><em>{tr('Pass it on.')}</em></p>
        </div>
        <div className={styles.curatorCopy} data-reveal><span className={styles.eyebrow}>{tr('FOR PEOPLE WITH GOOD TASTE')}</span><h2 id="curator-heading">{tr('Your perspective.')}<br /><span>{tr('Worth sharing.')}</span></h2><p>{tr('For friends, creators, communities and local connoisseurs. Collect your favourite places, share your map, and help someone find their next favourite.')}</p>
          <button type="button" className={styles.textButton} onClick={() => setIsCuratorFormOpen(!isCuratorFormOpen)} aria-expanded={isCuratorFormOpen} aria-controls="curator-form">{isCuratorFormOpen ? tr('Close application') : tr('Become a curator')}</button>
          {isCuratorFormOpen && <form id="curator-form" name="curator-application" method="POST" data-netlify="true" onSubmit={handleCuratorSubmit} className={styles.curatorForm}>
            <input type="hidden" name="form-name" value="curator-application" />
            <label>{tr('Your name')}<input className={styles.input} type="text" name="name" autoComplete="name" value={curatorForm.name} onChange={handleCuratorChange} required /></label>
            <label>{tr('Email address')}<input className={styles.input} type="email" name="email" autoComplete="email" value={curatorForm.email} onChange={handleCuratorChange} required /></label>
            <label>{tr('Tell us about your taste')}<textarea className={styles.input} name="taste" rows="3" value={curatorForm.taste} onChange={handleCuratorChange} required /></label>
            <button className={styles.formButton} type="submit" disabled={isCuratorSubmitting}>{isCuratorSubmitting ? tr('Sending…') : tr('Send application')}<Icon /></button>
          </form>}
          {curatorToast && <p className={styles.formStatus} role="status">{curatorToast}</p>}
        </div>
      </section>

      <section className={`${styles.faqSection} ${styles.wrap}`} id="faq" aria-labelledby="faq-heading">
        <div data-reveal><span className={styles.eyebrow}>{tr('THE DETAILS')}</span><h2 id="faq-heading">{tr('A few things')}<br />{tr('to know.')}</h2><p>{tr('Everything you need to get started.')}</p></div>
        <div>{faqItems.map((item, index) => <details className={styles.faqItem} key={item.question} open={index === 0}><summary>{item.question}<span className={styles.faqIcon} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className={styles.download} id="download" aria-labelledby="download-heading">
        <div className={styles.wrap} data-reveal><span className={styles.eyebrow}>{tr('TAKE GOOD TASTE WITH YOU')}</span><h2 id="download-heading">{tr('Your next favourite.')}<br /><span>{tr('Already on the map.')}</span></h2><div className={styles.downloadBottom}><p>{tr('Start with a place you already love.')}<br />{tr('See where your people take you.')}</p><div><AppIdentity /><StoreButtons /><span className={styles.freeNote}>{tr('Free to download. On iOS & Android.')}</span></div></div></div>
      </section>
    </main>

    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footerTop} id="waitlist">
          <div><Link to="/" className={styles.footerBrand} aria-label={tr('YouKnow home')}><img src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" width="160" height="48" /></Link><p>{tr('Good places. Better together.')}</p></div>
          <div className={styles.newsletter}><label htmlFor="newsletter-email">{tr('News, places and things worth sharing.')}</label><form name="waitlist" method="POST" data-netlify="true" onSubmit={handleSubmit}><input type="hidden" name="form-name" value="waitlist" /><input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder={tr('Your email address')} value={email} onChange={e => setEmail(e.target.value)} required /><button type="submit" disabled={isSubmitting} aria-label={tr('Join mailing list')}>{isSubmitting ? '…' : <Icon />}</button></form>{toast && <p className={styles.formStatus} role="status">{toast}</p>}</div>
        </div>
        <div className={styles.footerMiddle}><nav aria-label={tr('Footer navigation')}><Link to="/about">{tr('Our story')}</Link><Link to="/download">{tr('Download the app')}</Link><Link to="/cities">{tr('City guides')}</Link><Link to="/tutorials">{tr('How to save')}</Link><a href="#curators">{tr('For curators')}</a><a href="#faq">{tr('FAQ')}</a><a href="/privacy">{tr('Privacy')}</a><a href="/sitemap.html">{tr('All pages')}</a></nav><div className={styles.support}><span>{tr('SUPPORTED BY')}</span><img src="/sph_logo.jpeg" alt="ETH Student Project House" width="75" height="38" loading="lazy" /><img src="/asl-logo-white.svg" alt="Agentic Systems Lab" width="110" height="30" loading="lazy" /></div></div>
        <div className={styles.footerBottom}><span>{tr('© 2026 YouKnow by')} <Link className={styles.founderLink} to="/founders/marie-louise-dugua/">Marie-Louise Dugua</Link> & <Link className={styles.founderLink} to="/founders/fabio-baldini/">Fabio Baldini</Link></span><LanguageSwitcher /><a href="#main-content">{tr('BACK TO TOP ↑')}</a></div>
      </div>
    </footer>
  </div>
}
