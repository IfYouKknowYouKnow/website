import { Link } from 'react-router-dom'
import styles from './Tutorials.module.css'

const TUTORIALS = [
  {
    title: 'Instagram / TikTok',
    steps: [
      'When you see a restaurant, bar, cafe, or place on Instagram or TikTok, share it with the app!',
      'YouKnow will open automatically and identify the likeliest matching places.',
      'Review the detected place and save it once it looks right.',
    ],
    video: {
      src: '/video_insta.mp4',
      type: 'video/mp4',
      label: 'Instagram or TikTok place sharing tutorial video.',
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
    title: 'Google Saved Places',
    steps: [
      <>
        Go to{' '}
        <a href="https://takeout.google.com/" target="_blank" rel="noreferrer">
          Google Takeout
        </a>{' '}
        and sign in with the Google account that has your saved places.
      </>,
      'Click Deselect all so you only export the place data you need.',
      'Scroll to Saved and select Saved places.',
      'Choose CSV as the export format, then create the export and download it when Google has prepared the file.',
      <>
        Send the CSV to{' '}
        <a href="mailto:ifyouknowyouknowrecs@gmail.com">ifyouknowyouknowrecs@gmail.com</a>{' '}
        and we will import it to your user.
      </>,
    ],
    screenshots: [
      {
        src: '/takeout_1.png',
        alt: 'Google Takeout tutorial step 1.',
      },
      {
        src: '/takeout_2.png',
        alt: 'Google Takeout tutorial step 2.',
      },
      {
        src: '/takeout_3.png',
        alt: 'Google Takeout tutorial step 3.',
      },
      {
        src: '/takeout_4.png',
        alt: 'Google Takeout tutorial step 4.',
      },
    ],
    mediaVariant: 'takeoutMedia',
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
              <details className={styles.panel} key={tutorial.title} open={index === 0}>
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
