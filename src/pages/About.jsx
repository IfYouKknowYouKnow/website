import { useEffect } from 'react'
import { usePageMetadata } from '../usePageMetadata'
import { Link, useLocation } from 'react-router-dom'
import styles from './About.module.css'
import { TEAM, founderPath } from '../team'
import { msg, useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

const APP_STORE_URL = 'https://apps.apple.com/us/app/yk-youknow/id6759484614'
const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.youknow.mobile'

const PRINCIPLES = [
  {
    number: '01',
    title: msg('Taste is personal.'),
    body: msg('A five-star rating cannot tell you whether a place fits your night. A recommendation from someone who knows you often can.'),
  },
  {
    number: '02',
    title: msg('Context beats consensus.'),
    body: msg('The right answer changes with the city, the people, the time and the mood. YouKnow keeps that context attached to the place.'),
  },
  {
    number: '03',
    title: msg('Good finds should stay findable.'),
    body: msg('Recommendations disappear in chats, screenshots and saved posts. We turn them into an organized map you can use when plans become real.'),
  },
]

function StoreButtons() {
  const { tr } = useI18n()
  return (
    <div className={styles.storeButtons}>
      <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
        <img src="/badges/app-store-badge.svg" alt={tr('Download on the App Store')} />
      </a>
      <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noreferrer">
        <img src="/badges/google-play-badge.png" alt={tr('Get it on Google Play')} />
      </a>
    </div>
  )
}

export default function About() {
  const { tr, formatNumber } = useI18n()
  usePageMetadata('about')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash !== '#team') return
    const frame = window.requestAnimationFrame(() => document.getElementById('team')?.scrollIntoView({ behavior: 'instant' }))
    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} to="/" aria-label={tr('YouKnow home')}>
            <img className={styles.brandLogo} src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" />
          </Link>

          <div className={styles.navLinks} aria-label={tr('Primary')}>
            <Link to="/">{tr('Home')}</Link>
            <Link to="/tutorials">{tr('Tutorials')}</Link>
            <a className={styles.navCta} href="#download">{tr('Download')}</a>
          </div>
        </div>
      </nav>

      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>{tr('About YouKnow')}</p>
              <h1>{tr('The best places rarely come from a ranking.')}</h1>
              <p className={styles.lead}>{tr('YouKnow is a free social discovery app for restaurants, bars, cafes, clubs and experiences. It turns recommendations from friends, local communities and connoisseurs into a personal map built around your taste.')}</p>
              <a className={styles.textLink} href="#why">{tr('Why we are building it')}{' '}<span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className={styles.heroVisual} aria-label={tr('YouKnow app map and vibe search')}>
              <span className={`${styles.vibeTag} ${styles.tagOne}`}>{tr('Friend-approved')}</span>
              <span className={`${styles.vibeTag} ${styles.tagTwo}`}>{tr('Natural wine')}</span>
              <div className={`${styles.phone} ${styles.phoneBack}`}>
                <img
                  src="/images/youknow-map-20261015.webp"
                  alt={tr('YouKnow map with category filters and friends’ recommendations')}
                />
              </div>
              <div className={styles.phone}>
                <img
                  src="/images/youknow-search-20261015.webp"
                  alt={tr('YouKnow natural-language vibe search')}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.problemSection} id="why">
          <div className={`container ${styles.splitSection}`}>
            <div>
              <p className={styles.kicker}>{tr('Why YouKnow')}</p>
              <h2>{tr('Local knowledge should not disappear in the group chat.')}</h2>
            </div>
            <div className={styles.longCopy}>
              <p>{tr('Most people already have a network of great recommendations. They live in messages from friends, screenshots of social posts, notes, saved videos and half-remembered conversations. The problem is not a lack of suggestions. It is finding the right one again when you actually need it.')}</p>
              <p>{tr('YouKnow gives those recommendations a place to live. Save a spot when you see it, remember who it came from, organize it on your map and return to it when you are choosing where to go. Instead of asking what is most popular, you can ask what fits your people and your mood.')}</p>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.kicker}>{tr('What we believe')}</p>
              <h2>{tr('A more human way to find a place.')}</h2>
            </div>
            <div className={styles.principlesGrid}>
              {PRINCIPLES.map((principle) => (
                <article className={styles.principleCard} key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{tr(principle.title)}</h3>
                  <p>{tr(principle.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.howSection}>
          <div className={`container ${styles.howInner}`}>
            <div className={styles.howCopy}>
              <p className={styles.kicker}>{tr('From a tip to a plan')}</p>
              <h2>{tr('One living map, shaped by people you trust.')}</h2>
              <p>{tr('Save places from Instagram, TikTok, photos or a simple search. Follow friends and curators whose taste speaks to you. Then explore by person, city, category, distance, what is open now or the exact vibe you have in mind.')}</p>
              <p>{tr('The result is not another anonymous directory. It is your own layer of restaurants, bars, cafes, dance floors and experiences—ready for tonight or for a trip months from now.')}</p>
              <Link className={styles.inlineButton} to="/tutorials">{tr('See how saving works')}</Link>
            </div>
            <div className={styles.factPanel}>
              <p className={styles.factBig}>{formatNumber(10000)}+</p>
              <p className={styles.factLabel}>{tr('curated places')}</p>
              <div className={styles.factRule} />
              <p className={styles.factBig}>331</p>
              <p className={styles.factLabel}>{tr('cities represented')}</p>
              <div className={styles.factRule} />
              <p className={styles.factStatement}>{tr('No stars. No noise.')}</p>
              <p className={styles.factLabel}>{tr('Just recommendations with context.')}</p>
            </div>
          </div>
        </section>

        <section className={styles.teamSection} id="team" aria-labelledby="team-heading">
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.kicker}>{tr('The people behind YouKnow')}</p>
              <h2 id="team-heading">{tr('Small team, shared obsession.')}</h2>
              <p className={styles.introBody}>{tr('We are building YouKnow to make personal recommendations easier to keep, share and act on—without flattening taste into a single score.')}</p>
            </div>

            <div className={styles.teamGrid}>
              {TEAM.map((person) => (
                <article className={styles.personCard} id={person.slug} key={person.name} style={{ '--person-accent': person.accent }}>
                  <div className={styles.personHeader}>
                    <div className={styles.portrait} style={{ '--portrait-left': `${-person.portraitX / 184 * 100}%` }}>
                      <img className={styles.portraitImage} src="/images/team/founder-reference.png"
                        alt={tr('Portrait of {name}', { name: person.name })} width="1556" height="530" loading="lazy" decoding="async" />
                    </div>
                    <div className={styles.personIdentity}>
                      <p className={styles.personRole}>{tr(person.role)}</p>
                      <h3><Link className={styles.personName} to={founderPath(person)}>{person.name}</Link></h3>
                      <p className={styles.personFocus}>{tr(person.focus)}</p>
                    </div>
                  </div>
                  <ul className={styles.personBackground}>
                    {person.background.map(detail => <li key={detail}>{tr(detail)}</li>)}
                  </ul>
                  <blockquote className={styles.personQuote}>{tr('“{text}”', { text: tr(person.quote) })}</blockquote>
                  <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label={tr('{name} on LinkedIn', { name: person.name })}>
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>

            <div className={styles.supportBand}>
              <p>{tr('Built with support from')}</p>
              <div>
                <img src="/sph_logo.jpeg" alt="ETH Student Project House" />
                <img src="/asl-logo-white.svg" alt="Agentic Systems Lab" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="download">
          <div className="container">
            <p className={styles.kicker}>{tr('Start your map')}</p>
            <h2>{tr('Find places you love from people you love.')}</h2>
            <p>{tr('Available free on iOS and Android.')}</p>
            <StoreButtons />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <Link to="/" aria-label={tr('YouKnow home')}>
            <img src="/long_logo.png" alt="YouKnow" />
          </Link>
          <p>{tr('© 2026 YouKnow by Marie-Louise Dugua & Fabio Baldini')}</p>
          <div className={styles.footerLinks}>
            <Link to="/tutorials">{tr('Tutorials')}</Link>
            <a href="/privacy">{tr('Privacy')}</a>
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </div>
  )
}
