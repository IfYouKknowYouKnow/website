import { Link } from 'react-router-dom'
import { usePageMetadata } from '../usePageMetadata'
import { appStoreHref, openIOSAppStore } from '../appStoreLink'
import { useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'
import about from './About.module.css'
import styles from './Simple.module.css'

const ANDROID_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.youknow.mobile'

// A page of its own for "download the app", so searches and shared links have
// somewhere to land other than a section halfway down the homepage.
export default function Download() {
  const { tr } = useI18n()
  usePageMetadata('download')
  const features = [
    [tr('See what friends recommend'), tr('Find people who get your taste. Follow their finds and see what they are loving lately.')],
    [tr('Save places from Instagram & TikTok'), tr('Less lost in your saved posts. More see you there.'), '/tutorials', tr('See how saving works')],
    [tr('Search by vibe with AI'), tr('Your plans, in your own words.')],
    [tr('Explore any city'), tr('Take your people’s favourites with you. From a familiar neighbourhood to your next trip.'), '/cities', tr('City guides')],
  ]

  return (
    <div className={about.page}>
      <nav className={about.nav}>
        <div className={`container ${about.navInner}`}>
          <Link className={about.brand} to="/" aria-label={tr('YouKnow home')}>
            <img className={about.brandLogo} src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" />
          </Link>
          <div className={about.navLinks} aria-label={tr('Primary')}>
            <Link to="/">{tr('Home')}</Link>
            <Link to="/cities">{tr('City guides')}</Link>
            <Link to="/about">{tr('About')}</Link>
          </div>
        </div>
      </nav>

      <main className={`container ${styles.main}`}>
        <p className={about.kicker}>{tr('Download')}</p>
        <h1>{tr('Download YouKnow Map')}</h1>
        <p className={styles.lead}>{tr('Free for iPhone and Android. Save the places you love and find your next favourites through people you trust.')}</p>

        <div className={styles.stores}>
          <a href={appStoreHref()} onClick={openIOSAppStore}>
            <img src="/badges/app-store-badge.svg" alt={tr('Download on the App Store')} width="140" height="47" />
          </a>
          <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <img src="/badges/google-play-badge.png" alt={tr('Get it on Google Play')} width="164" height="63" />
          </a>
        </div>
        <p className={styles.icon}>
          <img src="/icons/youknow-icon-192.png" alt={tr('YouKnow app icon')} width="44" height="44" />
          <span><strong>YouKnow Map</strong> {tr('Look for this icon in the app stores.')}</span>
        </p>

        <section className={styles.section} aria-labelledby="features-heading">
          <h2 id="features-heading">{tr('What you can do with YouKnow')}</h2>
          <div className={styles.grid}>
            {features.map(([title, text, to, label]) => <article className={styles.card} key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              {to && <Link className={styles.link} to={to}>{label} <span aria-hidden="true">→</span></Link>}
            </article>)}
          </div>
        </section>
      </main>

      <footer className={about.footer}>
        <div className={`container ${about.footerInner}`}>
          <Link to="/" aria-label={tr('YouKnow home')}><img src="/long_logo.png" alt="YouKnow" /></Link>
          <p>{tr('© 2026 YouKnow by Marie-Louise Dugua & Fabio Baldini')}</p>
          <div className={about.footerLinks}>
            <Link to="/about">{tr('About')}</Link>
            <a href="/privacy">{tr('Privacy')}</a>
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </div>
  )
}
