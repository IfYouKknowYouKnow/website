import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const ANDROID_DOWNLOAD_PATH =
  'https://github.com/IfYouKknowYouKnow/website/releases/download/v0.1.0/app-release.apk'
const ANDROID_APK_SHA256 =
  '3765f25fec80d5c9df4492d4d0b48a945f98711be1903c68eba6d018e7f5a472'
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/sg6HhJjE'
const APP_SCREENSHOTS = [
  {
    src: '/feed_screen.PNG',
    label: 'Feed',
    alt: 'IYKYK feed screen showing friend activity and trending places.',
  },
  {
    src: '/map_screen.PNG',
    label: 'Map',
    alt: 'IYKYK map screen with place pins and filters.',
  },
  {
    src: '/vibe_screen.PNG',
    label: 'Vibe Search',
    alt: 'IYKYK vibe search screen.',
  },
  {
    src: '/placesheet_screen.PNG',
    label: 'Place Details',
    alt: 'IYKYK place detail screen.',
  },
  {
    src: '/profile_screen.PNG',
    label: 'Profile',
    alt: 'IYKYK profile screen.',
  },
]

const DESKTOP_BUBBLES = [
  { top: '10%', left: '6%' },
  { top: '16%', left: '28%' },
  { top: '12%', left: '78%' },
  { top: '26%', left: '60%' },
  { top: '34%', left: '14%' },
  { top: '42%', left: '48%' },
  { top: '50%', left: '76%' },
  { top: '58%', left: '22%' },
  { top: '66%', left: '56%' },
  { top: '74%', left: '10%' },
  { top: '78%', left: '72%' },
  { top: '84%', left: '40%' },
]

const MOBILE_BUBBLES = [
  { top: '6%', left: '25%' },
  { top: '16%', left: '78%' },
  { top: '15%', left: '15%' },
]

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Landing() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState('')

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
      console.error('Waitlist submission failed:', error)
      setToast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bubblesLayer}>
          <div className={styles.bubblesDesktop}>
            {DESKTOP_BUBBLES.map((pos, i) => (
              <div
                key={`desktop-${i}`}
                className={styles.bubble}
                style={{ top: pos.top, left: pos.left }}
              >
                #IYKYK
              </div>
            ))}
          </div>

          <div className={styles.bubblesMobile}>
            {MOBILE_BUBBLES.map((pos, i) => (
              <div
                key={`mobile-${i}`}
                className={styles.bubble}
                style={{ top: pos.top, left: pos.left }}
              >
                #IYKYK
              </div>
            ))}
          </div>
      </div>

      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <span className={styles.navBrand}>#You Know</span>
          <Link to="/privacy" className={styles.navPrivacy}>Privacy</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroTextBlock}>
            <h1 className={styles.youKnow}>You Know.</h1>

            <div className={styles.screenshotsSection}>
              <div className={styles.screenshotsRail}>
                {APP_SCREENSHOTS.map((screenshot) => (
                  <figure className={styles.screenshotCard} key={screenshot.src}>
                    <div className={styles.phoneFrame}>
                      <img
                        className={styles.phoneScreen}
                        src={screenshot.src}
                        alt={screenshot.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <figcaption className={styles.screenshotLabel}>
                      {screenshot.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>iPhone and Android beta available</p>

              <p className={styles.sub}>
                Share your favorite spots with friends. IYKYK combines
                recommendations from people you trust with AI that understands
                your taste. It knows the city like a concierge — and you like a
                friend. A new kind of social feed: your city as the feed, your
                friends as the guides.
              </p>

              <div className={styles.downloadPanel}>
                <div>
                  <p className={styles.downloadLabel}>Download the app</p>
                  <p className={styles.downloadMeta}>Install on iPhone with TestFlight or download the Android APK.</p>
                </div>

                <div className={styles.downloadActions}>
                  <a
                    className={styles.secondaryDownloadButton}
                    href={TESTFLIGHT_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join TestFlight
                  </a>

                  <a
                    className={styles.downloadButton}
                    href={ANDROID_DOWNLOAD_PATH}
                  >
                    Download APK
                  </a>
                </div>
              </div>

              <p className={styles.downloadNote}>
                iPhone users can install through TestFlight. On Android, if your
                phone asks, allow installs from your browser first.
              </p>

              <div className={styles.checksumBlock}>
                <p className={styles.checksumLabel}>Android APK SHA-256</p>
                <code className={styles.checksumValue}>{ANDROID_APK_SHA256}</code>
              </div>

              <form
                name="waitlist"
                netlify
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
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  className={styles.btn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Joining...' : 'Join waitlist'}
                </button>
              </form>

              {toast && (
                <p className={styles.successMessage}>
                  {toast}
                </p>
              )}

              <p className={styles.formNote}>
                Join the waitlist for launch updates, iOS access, and feature drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <form name="waitlist" method="POST" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="waitlist" />
        <input type="email" name="email" />
      </form>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🔍</div>
              <h3>Search by vibe</h3>
              <p>Type a feeling. Get places that match your vibe, not just keyword hits.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Powered by your community</h3>
              <p>See where your friends have actually been. Their taste, your map.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✨</div>
              <h3>AI taste profile</h3>
              <p>The more you use it, the more accurate it gets. Five stars mean nothing.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={`gradient-text ${styles.logo}`}>IYKYK</span>
          <p className={styles.footerCopy}>© 2026 IYKYK</p>
          <Link to="/privacy" className={styles.navLink}>Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}
