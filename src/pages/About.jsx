import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/yk-youknow/id6759484614'
const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.youknow.mobile'

const TEAM = [
  {
    name: 'Marie-Louise Dugua',
    role: 'Co-founder',
    focus: 'Product & Development',
    initials: 'ML',
    accent: '#e01c1c',
    linkedin: 'https://www.linkedin.com/in/marie-louise-dugua-aa6956186',
  },
  {
    name: 'Fabio Baldini',
    role: 'Co-founder',
    focus: 'Business Development & Partnerships',
    initials: 'FB',
    accent: '#167dc4',
    linkedin: 'https://www.linkedin.com/in/fabio-baldini-16937422/',
  },
  {
    name: 'Jinisha Chamate',
    role: 'Team',
    focus: 'Marketing & Social Media',
    initials: 'JC',
    accent: '#16834a',
    linkedin: 'https://www.linkedin.com/in/jinisha-chamate-a833371ba/',
  },
]

const PRINCIPLES = [
  {
    number: '01',
    title: 'Taste is personal.',
    body: 'A five-star rating cannot tell you whether a place fits your night. A recommendation from someone who knows you often can.',
  },
  {
    number: '02',
    title: 'Context beats consensus.',
    body: 'The right answer changes with the city, the people, the time and the mood. YouKnow keeps that context attached to the place.',
  },
  {
    number: '03',
    title: 'Good finds should stay findable.',
    body: 'Recommendations disappear in chats, screenshots and saved posts. We turn them into an organized map you can use when plans become real.',
  },
]

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

function useAboutMetadata() {
  useEffect(() => {
    const title = 'About YouKnow | A Map Curated by People You Trust'
    const description =
      'Learn why YouKnow turns restaurant, bar, cafe and experience recommendations from friends and local curators into a personal map.'
    const canonical = 'https://ifykyk.app/about'
    const image = 'https://ifykyk.app/images/about-youknow-og.png'

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:type"]', 'content', 'website')
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', image)

    const structuredData = document.createElement('script')
    structuredData.id = 'about-page-structured-data'
    structuredData.type = 'application/ld+json'
    structuredData.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About YouKnow',
      url: canonical,
      description,
      mainEntity: {
        '@type': 'Organization',
        name: 'YouKnow',
        alternateName: 'YK YouKnow',
        url: 'https://ifykyk.app/',
        logo: 'https://ifykyk.app/logo.png',
        founder: [
          { '@type': 'Person', name: 'Marie-Louise Dugua' },
          { '@type': 'Person', name: 'Fabio Baldini' },
        ],
        sameAs: [APP_STORE_URL, ANDROID_PLAY_STORE_URL],
      },
    })
    document.head.appendChild(structuredData)

    return () => {
      structuredData.remove()
      document.title = 'YouKnow App | Friend-Powered Restaurant and Bar Recommendations'
      setMeta(
        'meta[name="description"]',
        'content',
        'YouKnow is an app for discovering restaurants, bars, cafes, clubs, and experiences through recommendations from people you trust.',
      )
      setMeta('link[rel="canonical"]', 'href', 'https://ifykyk.app/')
      setMeta('meta[property="og:url"]', 'content', 'https://ifykyk.app/')
      setMeta(
        'meta[property="og:title"]',
        'content',
        'YouKnow App | Friend-Powered Recommendations',
      )
      setMeta(
        'meta[property="og:description"]',
        'content',
        'Discover restaurants, bars, cafes, clubs, and experiences through recommendations from people you trust.',
      )
      setMeta(
        'meta[property="og:image"]',
        'content',
        'https://ifykyk.app/images/iykyk-app-preview.png',
      )
      setMeta(
        'meta[name="twitter:title"]',
        'content',
        'YouKnow App | Friend-Powered Recommendations',
      )
      setMeta(
        'meta[name="twitter:description"]',
        'content',
        'Discover restaurants, bars, cafes, clubs, and experiences through recommendations from people you trust.',
      )
      setMeta(
        'meta[name="twitter:image"]',
        'content',
        'https://ifykyk.app/images/iykyk-app-preview.png',
      )
    }
  }, [])
}

function StoreButtons() {
  return (
    <div className={styles.storeButtons}>
      <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
        <img src="/badges/app-store-badge.svg" alt="Download on the App Store" />
      </a>
      <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noreferrer">
        <img src="/badges/google-play-badge.png" alt="Get it on Google Play" />
      </a>
    </div>
  )
}

export default function About() {
  useAboutMetadata()

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} to="/" aria-label="YouKnow home">
            <img className={styles.brandLogo} src="/long_logo.png" alt="YouKnow" />
          </Link>

          <div className={styles.navLinks} aria-label="Primary">
            <Link to="/">Home</Link>
            <Link to="/tutorials">Tutorials</Link>
            <a className={styles.navCta} href="#download">
              Download
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>About YouKnow</p>
              <h1>The best places rarely come from a ranking.</h1>
              <p className={styles.lead}>
                YouKnow is a free social discovery app for restaurants, bars, cafes,
                clubs and experiences. It turns recommendations from friends, local
                communities and connoisseurs into a personal map built around your taste.
              </p>
              <a className={styles.textLink} href="#why">
                Why we are building it <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className={styles.heroVisual} aria-label="YouKnow app map and vibe search">
              <span className={`${styles.vibeTag} ${styles.tagOne}`}>Friend-approved</span>
              <span className={`${styles.vibeTag} ${styles.tagTwo}`}>Natural wine</span>
              <div className={`${styles.phone} ${styles.phoneBack}`}>
                <img
                  src="/images/IMG_3387.PNG"
                  alt="YouKnow map filtered to recommendations from a trusted friend"
                />
              </div>
              <div className={styles.phone}>
                <img
                  src="/images/IMG_3391.PNG"
                  alt="YouKnow natural-language vibe search"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.problemSection} id="why">
          <div className={`container ${styles.splitSection}`}>
            <div>
              <p className={styles.kicker}>Why YouKnow</p>
              <h2>Local knowledge should not disappear in the group chat.</h2>
            </div>
            <div className={styles.longCopy}>
              <p>
                Most people already have a network of great recommendations. They live in
                messages from friends, screenshots of social posts, notes, saved videos and
                half-remembered conversations. The problem is not a lack of suggestions. It
                is finding the right one again when you actually need it.
              </p>
              <p>
                YouKnow gives those recommendations a place to live. Save a spot when you
                see it, remember who it came from, organize it on your map and return to it
                when you are choosing where to go. Instead of asking what is most popular,
                you can ask what fits your people and your mood.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.kicker}>What we believe</p>
              <h2>A more human way to find a place.</h2>
            </div>
            <div className={styles.principlesGrid}>
              {PRINCIPLES.map((principle) => (
                <article className={styles.principleCard} key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.howSection}>
          <div className={`container ${styles.howInner}`}>
            <div className={styles.howCopy}>
              <p className={styles.kicker}>From a tip to a plan</p>
              <h2>One living map, shaped by people you trust.</h2>
              <p>
                Save places from Instagram, TikTok, photos or a simple search. Follow
                friends and curators whose taste speaks to you. Then explore by person,
                city, category, distance, what is open now or the exact vibe you have in
                mind.
              </p>
              <p>
                The result is not another anonymous directory. It is your own layer of
                restaurants, bars, cafes, dance floors and experiences—ready for tonight or
                for a trip months from now.
              </p>
              <Link className={styles.inlineButton} to="/tutorials">
                See how saving works
              </Link>
            </div>
            <div className={styles.factPanel}>
              <p className={styles.factBig}>10,000+</p>
              <p className={styles.factLabel}>curated places</p>
              <div className={styles.factRule} />
              <p className={styles.factBig}>331</p>
              <p className={styles.factLabel}>cities represented</p>
              <div className={styles.factRule} />
              <p className={styles.factStatement}>No stars. No noise.</p>
              <p className={styles.factLabel}>Just recommendations with context.</p>
            </div>
          </div>
        </section>

        <section className={styles.teamSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.kicker}>The people behind YouKnow</p>
              <h2>Small team, shared obsession.</h2>
              <p className={styles.introBody}>
                We are building YouKnow to make personal recommendations easier to keep,
                share and act on—without flattening taste into a single score.
              </p>
            </div>

            <div className={styles.teamGrid}>
              {TEAM.map((person) => (
                <article className={styles.personCard} key={person.name}>
                  <div className={styles.avatar} style={{ '--accent': person.accent }}>
                    {person.initials}
                  </div>
                  <p className={styles.personRole}>{person.role}</p>
                  <h3>{person.name}</h3>
                  <p>{person.focus}</p>
                  <a href={person.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </article>
              ))}
            </div>

            <div className={styles.supportBand}>
              <p>Built with support from</p>
              <div>
                <img src="/sph_logo.jpeg" alt="ETH Student Project House" />
                <img src="/asl-logo-white.svg" alt="Agentic Systems Lab" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="download">
          <div className="container">
            <p className={styles.kicker}>Start your map</p>
            <h2>Begin with a place you already love.</h2>
            <p>Available free on iOS and Android.</p>
            <StoreButtons />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <Link to="/" aria-label="YouKnow home">
            <img src="/long_logo.png" alt="YouKnow" />
          </Link>
          <p>© 2026 YouKnow by Marie-Louise Dugua & Fabio Baldini</p>
          <div className={styles.footerLinks}>
            <Link to="/tutorials">Tutorials</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
