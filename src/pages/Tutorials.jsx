import { Link } from 'react-router-dom'
import styles from './Tutorials.module.css'

const TUTORIALS = [
  {
    title: 'Instagram / TikTok',
    steps: [
      'When you see a restaurant, bar, cafe, or place on Instagram or TikTok, share it with the app!',
      'YouKnow will open automatically and indentify the likeliest matching places.',
      'Review the detected place and save it once it looks right.',
    ],
    screenshots: [
      {
        src: '/tuto_1.png',
        alt: 'Instagram or TikTok tutorial step 1.',
      },
      {
        src: '/tuto_2.png',
        alt: 'Instagram or TikTok tutorial step 2.',
      },
      {
        src: '/tuto_3.png',
        alt: 'Instagram or TikTok tutorial step 3.',
      },
      {
        src: '/tuto_4.PNG',
        alt: 'Instagram or TikTok tutorial step 4.',
      },
    ],
  },
  {
    title: 'Pictures',
    steps: [
      'Take a picture directly in the app when you see a place you want to remember.',
      'Or upload a picture from inside YouKnow if it is already on your phone.',
      'You can also share a picture from your gallery straight into YouKnow.',
      'Confirm the matched place, then save it for later.',
    ],
    screenshots: [
      {
        src: '/gallery_1.png',
        alt: 'Gallery import tutorial step 1.',
      },
      {
        src: '/gallery_2.png',
        alt: 'Gallery import tutorial step 2.',
      },
      {
        src: '/gallery_3.png',
        alt: 'Gallery import tutorial step 3.',
      },
    ],
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
              src="/oyster_logo.jpeg"
              alt=""
              aria-hidden="true"
              decoding="async"
            />
            <span>YouKnow</span>
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
            Three quick ways to turn a place you find into something you can actually remember.
          </p>

          <div className={styles.accordion}>
            {TUTORIALS.map((tutorial, index) => (
              <details className={styles.panel} key={tutorial.title} open={index === 0}>
                <summary>
                  <span>{tutorial.title}</span>
                  <span className={styles.summaryIcon} aria-hidden="true" />
                </summary>

                <ol>
                  {tutorial.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>

                {tutorial.screenshots && (
                  <div className={styles.mediaGrid}>
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
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
