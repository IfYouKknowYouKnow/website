import { Link } from 'react-router-dom'
import { usePageMetadata } from '../usePageMetadata'
import { getCityGuides } from '../cityGuides'
import { useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'
import about from './About.module.css'
import styles from './Simple.module.css'

// One index of every city guide: each city, then each guide within it.
export default function Cities() {
  const { tr, guides: copy } = useI18n()
  usePageMetadata('cities')
  const guides = Object.values(getCityGuides(copy))

  return (
    <div className={about.page}>
      <nav className={about.nav}>
        <div className={`container ${about.navInner}`}>
          <Link className={about.brand} to="/" aria-label={tr('YouKnow home')}>
            <img className={about.brandLogo} src="/images/youknow-wordmark-blue-592.webp" alt="YouKnow" />
          </Link>
          <div className={about.navLinks} aria-label={tr('Primary')}>
            <Link to="/">{tr('Home')}</Link>
            <Link to="/about">{tr('About')}</Link>
            <Link className={about.navCta} to="/download">{tr('Download')}</Link>
          </div>
        </div>
      </nav>

      <main className={`container ${styles.main}`}>
        <p className={about.kicker}>{tr('City guides')}</p>
        <h1>{tr('City guides: restaurants, bars, cafés and hotels')}</h1>
        <p className={styles.lead}>{tr('Local tips from the YouKnow community. Pick a city, then the kind of place you are looking for.')}</p>

        <div className={`${styles.grid} ${styles.section}`}>
          {guides.map((guide) => <article className={styles.card} key={guide.slug}>
            <h2><Link to={guide.path}>{guide.city}</Link></h2>
            <ul className={styles.list}>
              <li><Link to={guide.path}>{guide.title}</Link></li>
              {Object.values(guide.topics).map((topic) => <li key={topic.slug}><Link to={`${guide.path}${topic.slug}/`}>{topic.title}</Link></li>)}
            </ul>
          </article>)}
        </div>

        <p className={styles.after}>
          <Link className={styles.link} to="/download">{tr('Explore more cities in the app')} <span aria-hidden="true">→</span></Link>
        </p>
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
