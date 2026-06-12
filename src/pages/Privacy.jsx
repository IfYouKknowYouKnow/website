import { Link } from 'react-router-dom'
import styles from './Privacy.module.css'

const NOTICE_PATH = '/privacy.html'

export default function Privacy() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link to="/" className={styles.logo} aria-label="YouKnow home">
            <img
              className={styles.logoImage}
              src="/long_logo.png"
              alt="YouKnow"
              decoding="async"
            />
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={`container ${styles.content}`}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Privacy Notice</h1>
            <a
              className={styles.openLink}
              href={NOTICE_PATH}
              target="_blank"
              rel="noreferrer"
            >
              Open the notice in a new tab
            </a>
          </div>

          <div className={styles.frameShell}>
            <iframe
              className={styles.noticeFrame}
              src={NOTICE_PATH}
              title="YouKnow Privacy Notice"
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <Link to="/" className={styles.back}>← Back to ifykyk.app</Link>
        </div>
      </footer>
    </div>
  )
}
