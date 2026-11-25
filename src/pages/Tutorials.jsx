import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { usePageMetadata } from '../usePageMetadata'
import styles from './Tutorials.module.css'
import SavingVideo from '../components/SavingVideo'
import { SAVING_DEMOS } from '../savingDemos'
import { msg, useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

const TUTORIALS = [
  {
    id: 'social-sharing',
    title: msg('Instagram / TikTok'),
    steps: [
      msg('When you see a restaurant, bar, cafe, or place on Instagram or TikTok, share it with the app!'),
      msg('YouKnow will open automatically and identify the likeliest matching places.'),
      msg('Review the detected places and save the ones you want to try.'),
    ],
    video: SAVING_DEMOS[0],
  },
  {
    id: 'photo-sharing',
    title: msg('Pictures'),
    steps: [
      msg('Take a picture directly in the app when you see a place you want to remember.'),
      msg('Or upload a picture from inside YouKnow if it is already on your phone.'),
      msg('You can also share a picture from your gallery straight into YouKnow.'),
      msg('Confirm the matched place, then save it for later.'),
    ],
    video: SAVING_DEMOS[1],
  },
  {
    id: 'google-saved-places',
    title: msg('Google Saved Places'),
    steps: [
      msg('Open a saved list in Google Maps, make it public or turn on link sharing, then copy its link.'),
      msg('In YouKnow, tap the add button, choose Import from Google Maps, and paste the list link.'),
      msg('Review the places and select the ones you want to add. Deselect any you do not want, or use Select all and Clear to change your selection.'),
      msg('Choose Want to go or Recommended, then save the selected places to your map.'),
    ],
    screenshots: [
      {
        src: '/images/google-maps-list-import.webp',
        alt: msg('YouKnow Google Maps list import: paste a list link, select or deselect places, choose Want to go or Recommended, and save your selection.'),
      },
    ],
    mediaVariant: 'googleMapsMedia',
  },
  {
    title: msg('Manually'),
    steps: [
      msg('Open YouKnow and tap the add button.'),
      msg('Search for the place by name or address.'),
      msg('Choose the right result, add a note if you want, then save it to your map.'),
    ],
  },
]

export default function Tutorials() {
  const { tr } = useI18n()
  usePageMetadata('tutorials')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} to="/" aria-label={tr('YouKnow home')}>
            <img
              className={styles.brandLogo}
              src="/images/youknow-wordmark-blue-592.webp"
              alt="YouKnow"
              decoding="async"
            />
          </Link>

          <Link className={styles.navLink} to="/">{tr('Back home')}</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={`container ${styles.content}`}>
          <p className={styles.kicker}>{tr('Tutorials')}</p>
          <h1>{tr('How to save places you like.')}</h1>
          <p className={styles.subhead}>{tr('Four quick ways to turn a place you find into something you can actually remember.')}</p>

          <div className={styles.accordion}>
            {TUTORIALS.map((tutorial, index) => (
              <details
                className={styles.panel}
                id={tutorial.id}
                key={tutorial.title}
                open={TUTORIALS.some(item => `#${item.id}` === hash) ? `#${tutorial.id}` === hash : index === 0}
              >
                <summary>
                  <span>{tr(tutorial.title)}</span>
                  <span className={styles.summaryIcon} aria-hidden="true" />
                </summary>

                <ol>
                  {tutorial.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{tr(step)}</li>
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
                        alt={tr(screenshot.alt)}
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
          <LanguageSwitcher className={styles.languages} />
        </div>
      </main>
    </div>
  )
}
