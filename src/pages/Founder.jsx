import { Link, useParams } from 'react-router-dom'
import { founderMetadata, founderStructuredData } from '../pageMetadata'
import { useDocumentMetadata } from '../usePageMetadata'
import { TEAM, findFounder, founderPath } from '../team'
import about from './About.module.css'
import styles from './Founder.module.css'
import { useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

const NOT_FOUND = { title: 'Page not found | YouKnow', description: 'This profile is not available.', canonical: 'https://ifykyk.app/about', image: 'https://ifykyk.app/logo.png' }

export default function Founder({ initialFounder } = {}) {
  const i18n = useI18n()
  const { tr } = i18n
  const { founderSlug } = useParams()
  const person = initialFounder || findFounder(founderSlug)
  useDocumentMetadata(person ? founderMetadata(person, i18n) : NOT_FOUND, person ? founderStructuredData(person, i18n) : {})

  if (!person) {
    return (
      <main className={styles.notFound}>
        <p>{tr('That profile is not available.')}</p>
        <Link to="/about">{tr('Meet the YouKnow team')}</Link>
      </main>
    )
  }

  const coFounder = TEAM.find((other) => other.slug !== person.slug)

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

      <main>
        <section className={styles.profile} style={{ '--person-accent': person.accent }}>
          <div className={`container ${styles.profileInner}`}>
            <nav className={styles.breadcrumb} aria-label={tr('Breadcrumb')}>
              <Link to="/">YouKnow</Link><span aria-hidden="true">/</span>
              <Link to="/about#team">{tr('Team')}</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{person.name}</span>
            </nav>

            <header className={styles.header}>
              <div className={`${about.portrait} ${styles.portrait}`} style={{ '--portrait-left': `${-person.portraitX / 184 * 100}%` }}>
                <img className={about.portraitImage} src="/images/team/founder-reference.png"
                  alt={tr('Portrait of {name}, co-founder of YouKnow Map', { name: person.name })} width="1556" height="530" fetchpriority="high" />
              </div>
              <div>
                <p className={about.personRole}>{tr('{role}, YouKnow Map', { role: tr(person.role) })}</p>
                <h1>{person.name}</h1>
                <p className={styles.focus}>{tr(person.focus)}</p>
              </div>
            </header>

            <p className={styles.lead}>
              {tr('{name} is co-founder of YouKnow Map, the free app for finding restaurants, cafés, bars and hotels through recommendations from friends, locals and trusted curators. At YouKnow, {firstName} leads {leads}.',
                { name: person.name, firstName: person.firstName, leads: tr(person.leads) })}
            </p>

            <div className={styles.columns}>
              <section aria-labelledby="background-heading">
                <h2 id="background-heading">{tr('Background')}</h2>
                <ul className={styles.background}>
                  {person.background.map((detail) => <li key={detail}>{tr(detail)}</li>)}
                </ul>
                <a className={styles.link} href={person.linkedin} target="_blank" rel="noreferrer me">
                  {tr('{name} on LinkedIn', { name: person.name })} <span aria-hidden="true">↗</span>
                </a>
              </section>

              <section aria-labelledby="words-heading">
                <h2 id="words-heading">{tr('In {firstName}’s words', { firstName: person.firstName })}</h2>
                <blockquote className={styles.quote}>{tr('“{text}”', { text: tr(person.quote) })}</blockquote>
              </section>
            </div>

            <section className={styles.company} aria-labelledby="company-heading">
              <h2 id="company-heading">{tr('About YouKnow Map')}</h2>
              <p>
                {tr('YouKnow Map turns the recommendations people already share in chats, screenshots and saved posts into one personal map. {name} and {coFounder} started it from a simple idea: the best places rarely come from a ranking. They come from people whose taste you trust.',
                  { name: person.name, coFounder: coFounder.name })}
              </p>
              <p>
                {tr('The app is free on iOS and Android, with community recommendations in cities including')}{' '}
                {['zurich', 'geneva', 'berlin', 'milan'].map((slug, index) => <span key={slug}>{index > 0 && (index === 3 ? ` ${tr('and')} ` : ', ')}<Link to={`/${slug}/`}>{i18n.guides.cities[slug]}</Link></span>)}.{' '}
                {tr('It is built with support from the ETH Student Project House and the Agentic Systems Lab.')}
              </p>
              <div className={styles.links}>
                <Link className={styles.link} to="/about">{tr('Read the YouKnow story')}{' '}<span aria-hidden="true">→</span></Link>
                <Link className={styles.link} to={founderPath(coFounder)}>{tr('Meet co-founder {name}', { name: coFounder.name })} <span aria-hidden="true">→</span></Link>
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer className={about.footer}>
        <div className={`container ${about.footerInner}`}>
          <Link to="/" aria-label={tr('YouKnow home')}>
            <img src="/long_logo.png" alt="YouKnow" />
          </Link>
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
