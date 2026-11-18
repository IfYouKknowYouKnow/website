import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { usePageMetadata } from '../usePageMetadata'
import styles from './Tutorials.module.css'
import SavingVideo from '../components/SavingVideo'
import { SAVING_DEMOS } from '../savingDemos'

const TUTORIALS = [
  {
    id: 'social-sharing',
    title: 'Instagram / TikTok',
    steps: [
      'When you see a restaurant, bar, cafe, or place on Instagram or TikTok, share it with the app!',
      'YouKnow will open automatically and identify the likeliest matching places.',
      'Review the detected places and save the ones you want to try.',
    ],
    video: SAVING_DEMOS[0],
  },
  {
    id: 'photo-sharing',
    title: 'Pictures',
    steps: [
      'Take a picture directly in the app when you see a place you want to remember.',
      'Or upload a picture from inside YouKnow if it is already on your phone.',
      'You can also share a picture from your gallery straight into YouKnow.',
      'Confirm the matched place, then save it for later.',
    ],
    video: SAVING_DEMOS[1],
  },
  {
    id: 'google-saved-places',
    title: 'Google Saved Places',
    steps: [
      'Open a saved list in Google Maps, make it public or turn on link sharing, then copy its link.',
      'In YouKnow, tap the add button, choose Import from Google Maps, and paste the list link.',
      'Review the places and select the ones you want to add. Deselect any you do not want, or use Select all and Clear to change your selection.',
      'Choose Want to go or Recommended, then save the selected places to your map.',
    ],
    screenshots: [
      {
        src: '/images/google-maps-list-import.webp',
        alt: 'YouKnow Google Maps list import: paste a list link, select or deselect places, choose Want to go or Recommended, and save your selection.',
      },
    ],
    mediaVariant: 'googleMapsMedia',
  },
  {
    title: 'Manually',
    steps: [
      'Open YouKnow and tap the add button.',
      'Search for the place by name or address.',
      'Choose the right result, add a note if you want, then save it to your map.',
    ],
  },
]

export default function Tutorials() {
  usePageMetadata('tutorials')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} to="/" aria-label="YouKnow home">
            <img
              className={styles.brandLogo}
              src="/images/youknow-wordmark-blue-592.webp"
              alt="YouKnow"
              decoding="async"
            />
          </Link>

          <Link className={styles.navLink} to="/">
            Back home
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={`container ${styles.content}`}>
          <p className={styles.kicker}>Tutorials</p>
          <h1>How to save places you like.</h1>
          <p className={styles.subhead}>
            Four quick ways to turn a place you find into something you can actually remember.
          </p>

          <div className={styles.accordion}>
            {TUTORIALS.map((tutorial, index) => (
              <details
                className={styles.panel}
                id={tutorial.id}
                key={tutorial.title}
                open={TUTORIALS.some(item => `#${item.id}` === hash) ? `#${tutorial.id}` === hash : index === 0}
              >
                <summary>
                  <span>{tutorial.title}</span>
                  <span className={styles.summaryIcon} aria-hidden="true" />
                </summary>

                <ol>
                  {tutorial.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>

                {tutorial.screenshots && (
                  <div
                    className={`${styles.mediaGrid} ${
                      tutorial.mediaVariant ? styles[tutorial.mediaVariant] : ''
                    }`}
                  >
                    {tutorial.screenshots.map((screenshot) => (
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        loading="lazy"
                        decoding="async"
                        key={screenshot.src}
                      />
                    ))}
                  </div>
                )}

                {tutorial.video && (
                  <div className={styles.videoMedia}>
                    <SavingVideo demo={tutorial.video} className={styles.tutorialVideo} />
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
