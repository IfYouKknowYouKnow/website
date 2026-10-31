import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePageMetadata } from '../usePageMetadata'
import styles from './Tutorials.module.css'

const TUTORIALS = [
  {
    title: 'Instagram / TikTok',
    steps: [
      'When you see a restaurant, bar, cafe, or place on Instagram or TikTok, share it with the app!',
      'YouKnow will open automatically and identify the likeliest matching places.',
      'Review the detected place and save it once it looks right.',
    ],
    animation: {
      src: '/images/social-sharing-demo.gif',
      poster: '/images/social-sharing-poster.png',
      alt: 'Animation showing sharing an Instagram post into YouKnow, confirming the place, and saving it to your map.',
    },
  },
  {
    title: 'Pictures',
    steps: [
      'Take a picture directly in the app when you see a place you want to remember.',
      'Or upload a picture from inside YouKnow if it is already on your phone.',
      'You can also share a picture from your gallery straight into YouKnow.',
      'Confirm the matched place, then save it for later.',
    ],
    video: {
      src: '/gallery_video.MP4',
      type: 'video/mp4',
      label: 'Gallery place sharing tutorial video.',
    },
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

function TutorialAnimation({ animation }) {
  const [isPaused, setIsPaused] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setIsPaused(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <div className={styles.animationMedia}>
      <img
        className={styles.tutorialVideo}
        src={isPaused ? animation.poster : animation.src}
        alt={animation.alt}
        width="320"
        height="706"
        loading="lazy"
        decoding="async"
      />
      <button
        className={styles.animationToggle}
        type="button"
        aria-label={isPaused ? 'Play sharing animation' : 'Pause sharing animation'}
        onClick={() => setIsPaused((paused) => !paused)}
      >
        {isPaused ? 'Play' : 'Pause'}
      </button>
    </div>
  )
}

export default function Tutorials() {
  usePageMetadata('tutorials')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#google-saved-places') {
      document.getElementById('google-saved-places')?.scrollIntoView()
    }
  }, [hash])

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} to="/" aria-label="YouKnow home">
            <img
              className={styles.brandLogo}
              src="/youknow-wordmark-blue.svg"
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
                open={hash === '#google-saved-places' ? tutorial.id === 'google-saved-places' : index === 0}
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

                {tutorial.animation && (
                  <div className={styles.videoMedia}>
                    <TutorialAnimation animation={tutorial.animation} />
                  </div>
                )}

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
                    <video
                      className={styles.tutorialVideo}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={tutorial.video.label}
                    >
                      <source src={tutorial.video.src} type={tutorial.video.type} />
                      Your browser does not support the video tag.
                    </video>
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
