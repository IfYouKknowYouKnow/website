import { Link } from 'react-router-dom'
import styles from './Team.module.css'

const COFOUNDERS = [
  {
    name: 'Marie-Louise Dugua',
    role: 'Co-founder',
    initials: 'ML',
    accent: '#e01c1c',
    linkedin: 'www.linkedin.com/in/marie-louise-dugua-aa6956186',
    bio: 'Product & Development.',
  },
  {
    name: 'Fabio Baldini',
    role: 'Co-founder',
    initials: 'FB',
    accent: '#167dc4',
    linkedin: 'https://www.linkedin.com/in/fabio-baldini-16937422/',
    bio: 'Vision, Concept & Business Development.',
  },
]

function PersonCard({ person, featured = false }) {
  return (
    <article className={`${styles.personCard} ${featured ? styles.featuredCard : ''}`}>
      <div className={styles.avatar} style={{ '--accent': person.accent }}>
        <span>{person.initials}</span>
      </div>
      <div>
        <p className={styles.personRole}>{person.role}</p>
        <h2>{person.name}</h2>
        <p className={styles.personBio}>{person.bio}</p>
        {person.linkedin && (
          <a
            className={styles.linkedinLink}
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${person.name} on LinkedIn`}
          >
            LinkedIn
          </a>
        )}
      </div>
    </article>
  )
}

export default function Team() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} to="/" aria-label="YouKnow home">
            <img
              className={styles.brandLogo}
              src="/long_logo.png"
              alt="YouKnow"
              decoding="async"
            />
          </Link>

          <div className={styles.navLinks} aria-label="Primary">
            <Link to="/">Home</Link>
            <Link to="/tutorials">Tutorials</Link>
            <Link className={styles.navCta} to="/#download">
              Download
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className={`${styles.section} ${styles.firstSection}`} aria-labelledby="cofounders-heading">
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Co-founders</p>
              <h1 id="cofounders-heading">Co-founders</h1>
            </div>

            <div className={styles.founderGrid}>
              {COFOUNDERS.map((person) => (
                <PersonCard person={person} featured key={person.name} />
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <img
            className={styles.footerLogo}
            src="/long_logo.png"
            alt="YouKnow"
            loading="lazy"
            decoding="async"
          />
          <p>© 2026 YouKnow by Marie-Louise Dugua & Fabio Baldini</p>
          <div className={styles.footerLinks}>
            <Link to="/privacy">Privacy</Link>
            <Link to="/tutorials">Tutorials</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
