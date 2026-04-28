import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const ANDROID_DOWNLOAD_PATH =
  'https://github.com/IfYouKknowYouKnow/website/releases/latest/download/app-release.apk'
const APP_STORE_URL = 'https://apps.apple.com/us/app/yk-youknow/id6759484614'
const INVITE_CODE = 'QNU9JKFX'
const CURATED_PLACE_COUNT = '3,035'
const CITY_COUNT = '87'
const APP_SCREENSHOTS = [
  {
    src: '/feed_screen.PNG',
    label: 'Feed',
    alt: 'YouKnow feed screen showing friend activity and trending places.',
  },
  {
    src: '/map_screen.PNG',
    label: 'Map',
    alt: 'YouKnow map screen with place pins and filters.',
  },
  {
    src: '/vibe_screen.PNG',
    label: 'Vibe Search',
    alt: 'YouKnow vibe search screen.',
  },
  {
    src: '/placesheet_screen.PNG',
    label: 'Place Details',
    alt: 'YouKnow place detail screen.',
  },
  {
    src: '/profile_screen.PNG',
    label: 'Profile',
    alt: 'YouKnow profile screen.',
  },
]

const DESKTOP_BUBBLES = [
  { top: '10%', left: '6%' },
  { top: '16%', left: '28%' },
  { top: '12%', left: '78%' },
  { top: '26%', left: '60%' },
  { top: '34%', left: '4%' },
  { top: '50%', left: '76%' },
  { top: '58%', left: '22%' },
  { top: '66%', left: '56%' },
  { top: '74%', left: '10%' },
  { top: '78%', left: '72%' },
  { top: '84%', left: '40%' },
]

const MOBILE_BUBBLES = [
  { top: '2%', left: '25%' },
  { top: '16%', left: '78%' },
  { top: '15%', left: '15%' },
]

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'absolute'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.select()

  const didCopy = document.execCommand('copy')
  document.body.removeChild(textArea)

  return didCopy
}

export default function Landing() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState('')
  const [copyButtonLabel, setCopyButtonLabel] = useState('Copy')

  function resetCopyButtonLabel() {
    window.setTimeout(() => {
      setCopyButtonLabel('Copy')
    }, 2000)
  }

  async function handleInviteCodeCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(INVITE_CODE)
      } else if (!fallbackCopyText(INVITE_CODE)) {
        throw new Error('Clipboard API unavailable')
      }

      setCopyButtonLabel('Copied')
    } catch (error) {
      console.error('Invite code copy failed:', error)
      setCopyButtonLabel('Copy code')
    }

    resetCopyButtonLabel()
  }

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
                #iykyk
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
                #iykyk
              </div>
            ))}
          </div>
      </div>

      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <span className={styles.navBrand}>YouKnow</span>
          <Link to="/privacy" className={styles.navPrivacy}>Privacy</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroTextBlock}>
            <p className={styles.heroLogo}>YouKnow</p>
            <h1 className={styles.youKnow}>A map curated by people who know.</h1>

            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>iPhone on the App Store, Android beta available</p>

              <p className={styles.sub}>
                Save the places you love, see where your friends actually go,
                and search the city by vibe. YouKnow turns trusted
                recommendations into a living map of bars, restaurants, clubs,
                and plans worth remembering.
              </p>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{CURATED_PLACE_COUNT}</span>
                  <span className={styles.statLabel}>curated places</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{CITY_COUNT}</span>
                  <span className={styles.statLabel}>cities</span>
                </div>
              </div>

              <div className={styles.downloadPanel}>
                <div className={styles.downloadDetails}>
                  <p className={styles.downloadLabel}>Download the app</p>
                  <p className={styles.downloadMeta}>Use the invite code below after installing.</p>

                  <div className={styles.inviteCodeBlock}>
                    <label className={styles.inviteCodeLabel} htmlFor="invite-code">
                      Invite code
                    </label>

                    <div className={styles.inviteCodeRow}>
                      <input
                        id="invite-code"
                        className={styles.inviteCodeInput}
                        type="text"
                        value={INVITE_CODE}
                        readOnly
                        aria-label="Invite code"
                      />

                      <button
                        type="button"
                        className={styles.inviteCodeButton}
                        onClick={handleInviteCodeCopy}
                      >
                        {copyButtonLabel}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.downloadActions}>
                  <a
                    className={styles.secondaryDownloadButton}
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on App Store
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
                iPhone users can install from the App Store. On Android, if your
                phone asks, allow installs from your browser first.
              </p>

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
                  {isSubmitting ? 'Joining...' : 'Join mailing list'}
                </button>
              </form>

              {toast && (
                <p className={styles.successMessage}>
                  {toast}
                </p>
              )}

              <p className={styles.formNote}>
                Join the mailing list for launch updates, Android news, and new city drops.
              </p>

              <div className={styles.sphMark} aria-label="ETH Student Project House">
                <span className={styles.sphLabel}>Built with support from</span>
                <img
                  className={styles.sphLogo}
                  src="/sph_logo.png"
                  alt="ETH Student Project House"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.screenshotsSection} aria-label="App screens">
        <div className="container">
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
              <p>Ask for a feeling, a plan, or a kind of night. Get places that fit the mood.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Friends as guides</h3>
              <p>Build a map from places your friends saved, visited, and would actually recommend.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✨</div>
              <h3>Your taste, learned</h3>
              <p>The more you save, search, and share, the sharper your recommendations become.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={styles.logo}>YouKnow</span>
          <p className={styles.footerCopy}>© 2026 YouKnow</p>
          <Link to="/privacy" className={styles.navLink}>Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}
