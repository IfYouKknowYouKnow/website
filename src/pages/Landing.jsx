import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './Landing.module.css'

const ZURICH = [8.541, 47.366]

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
  const mapContainer = useRef(null)
  const map = useRef(null)

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (map.current) return

    const isMobile = window.innerWidth <= 768

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: isMobile ? [8.541, 47.366] : [8.541, 47.376],
      zoom: 13,
      interactive: false,
      attributionControl: false,
    })

    map.current.on('load', () => map.current?.resize())

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

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
      <div className={styles.heroWrap}>
        <div ref={mapContainer} className={styles.mapBg} />
        <div className={styles.mapOverlay} />

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
            <span className={styles.navBrand}>#IYKYK</span>
            <Link to="/privacy" className={styles.navPrivacy}>Privacy</Link>
          </div>
        </nav>

        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroTextBlock}>
              <h1 className={styles.youKnow}>You Know.</h1>

              <div className={styles.heroContent}>
                <p className={styles.eyebrow}>Coming soon</p>

                <p className={styles.sub}>
                  Share your favorite spots with friends. IYKYK combines
                  recommendations from people you trust with AI that understands
                  your taste. It knows the city like a concierge — and you like a
                  friend. A new kind of social feed: your city as the feed, your
                  friends as the guides.
                </p>

                <form name="waitlist" netlify
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
                  No spam. Be the first to know when we launch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <form name="waitlist" method="POST" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="waitlist" />
          <input type="email" name="email" />
        </form>
      </div>

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