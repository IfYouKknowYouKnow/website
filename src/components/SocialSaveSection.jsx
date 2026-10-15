import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SocialSaveSection.module.css'

const SOURCES = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/images/social/instagram.svg',
    heading: 'Share the post. Keep the place.',
    description: 'Tap Share on Instagram and choose YouKnow. Confirm the matching place and save it to your map, ready for your next plan.',
    hint: 'From post to pin',
    tutorial: '/tutorials',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '/images/social/tiktok.webp',
    heading: 'Make that video your next plan.',
    description: 'Share a TikTok with YouKnow. Check the matching place and save it to your map so you can actually go there.',
    hint: 'From video to visit',
    tutorial: '/tutorials',
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    icon: '/images/social/google-maps.svg',
    heading: 'Your saved list. Ready to go.',
    description: 'Paste a shared Google Maps list link. Select the places you want, choose Want to go or Recommended, and save them to your map.',
    hint: 'From list to your map',
    tutorial: '/tutorials#google-saved-places',
  },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function SocialSaveSection() {
  const [activeSource, setActiveSource] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const visualRef = useRef(null)
  const source = SOURCES[activeSource]

  function selectSource(index) {
    setActiveSource(index)
    setHasInteracted(true)
  }

  useEffect(() => {
    const visual = visualRef.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    function update() {
      frame = 0
      if (media.matches) {
        visual.style.setProperty('--art-travel', '0px')
        visual.style.setProperty('--art-rotate-x', '0deg')
        visual.style.setProperty('--art-rotate-y', '0deg')
        return
      }
      const rect = visual.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight
      visual.style.setProperty('--art-travel', `${clamp(progress * 40, -18, 18).toFixed(2)}px`)
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    media.addEventListener('change', scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      media.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  function moveArtwork(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const visual = visualRef.current
    const rect = visual.getBoundingClientRect()
    const x = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5)
    const y = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5)
    visual.style.setProperty('--art-rotate-x', `${(-y * 5).toFixed(2)}deg`)
    visual.style.setProperty('--art-rotate-y', `${(x * 7).toFixed(2)}deg`)
  }

  function resetArtwork() {
    visualRef.current.style.setProperty('--art-rotate-x', '0deg')
    visualRef.current.style.setProperty('--art-rotate-y', '0deg')
  }

  return (
    <section className={styles.section} id="from-feed-to-map" aria-labelledby="social-save-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}><span aria-hidden="true">↗</span> Your discoveries, connected</span>
          <h2 id="social-save-heading">Found it?<br /><span>Map it.</span></h2>
          <p className={styles.intro}>That restaurant. That rooftop. That next great night. Bring your Instagram, TikTok and Google Maps finds into one map you can actually use.</p>

          <div className={styles.sources} role="group" aria-label="Choose where you found a place">
            {SOURCES.map((item, index) => (
              <button
                className={styles.sourceButton}
                type="button"
                aria-pressed={index === activeSource}
                aria-controls="sharing-source-guide"
                onClick={() => selectSource(index)}
                key={item.id}
              >
                <img src={item.icon} alt="" width="28" height="28" />
                {item.name}
              </button>
            ))}
          </div>

          <div className={styles.guide} id="sharing-source-guide" aria-live="polite" aria-atomic="true">
            <div className={styles.guideTop}><span>{source.name} → YouKnow</span><span>0{activeSource + 1} / 03</span></div>
            <h3>{source.heading}</h3>
            <p>{source.description}</p>
            <Link to={source.tutorial}>See how it works <span aria-hidden="true">↗</span></Link>
          </div>

          <div className={styles.actions}>
            <a className={styles.download} href="#download">Start saving places <span aria-hidden="true">↗</span></a>
            <span>Free on iOS & Android.</span>
          </div>
        </div>

        <figure className={styles.visual} ref={visualRef} data-engaged={hasInteracted} onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.posterFloat}>
            <div className={styles.posterTilt}>
              <img
                className={styles.poster}
                src="/images/social/save-places-poster.webp"
                alt="Save places from Instagram, TikTok and Google Maps into YouKnow. Arrows connect all three apps to places on the YouKnow map."
                width="1122"
                height="1402"
                loading="lazy"
                decoding="async"
              />
              {SOURCES.map((item, index) => (
                <button
                  className={`${styles.hotspot} ${styles[item.id]}`}
                  type="button"
                  aria-label={`Show how to save from ${item.name}`}
                  aria-pressed={index === activeSource}
                  aria-controls="sharing-source-guide"
                  onClick={() => selectSource(index)}
                  key={item.id}
                >
                  <span className={styles.liftedIcon}><img src={item.icon} alt="" width="64" height="64" /></span>
                  <span className={styles.hotspotHint}>{item.hint} <span aria-hidden="true">↗</span></span>
                </button>
              ))}
            </div>
          </div>
          <figcaption className={styles.caption}><span aria-hidden="true">✳</span> Good finds deserve real plans.</figcaption>
        </figure>
      </div>
    </section>
  )
}
