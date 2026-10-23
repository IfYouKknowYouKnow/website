import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SocialSaveSection.module.css'

const SOURCES = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/images/social/instagram.svg',
    x: '2%', y: '11%', angle: '-12deg',
    heading: 'Share the post. Keep the place.',
    description: 'Tap Share on Instagram and choose YouKnow. Confirm the matching place and save it to your map, ready for your next plan.',
    tutorial: '/tutorials',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '/images/social/tiktok.webp',
    x: '84%', y: '28%', angle: '11deg',
    heading: 'Make that video your next plan.',
    description: 'Share a TikTok with YouKnow. Check the matching place and save it to your map so you can actually go there.',
    tutorial: '/tutorials',
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    icon: '/images/social/google-maps.svg',
    x: '3%', y: '68%', angle: '-9deg',
    heading: 'Your saved list. Ready to go.',
    description: 'Paste a shared Google Maps list link. Select the places you want, choose Want to go or Recommended, and save them to your map.',
    tutorial: '/tutorials#google-saved-places',
  },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function SocialSaveSection({ screenshots, downloadButtons, communityNote }) {
  const [activeSource, setActiveSource] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const visualRef = useRef(null)
  const carouselRef = useRef(null)
  const dragRef = useRef(null)
  const source = SOURCES[activeSource]
  const previewLabels = ['Your map', 'Search places', 'Inside a place']

  function goToSlide(index) {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollTo({
      left: carousel.clientWidth * clamp(index, 0, screenshots.length - 1),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  function handleCarouselScroll(event) {
    const { scrollLeft, clientWidth } = event.currentTarget
    setActiveSlide(clamp(Math.round(scrollLeft / clientWidth), 0, screenshots.length - 1))
  }

  function handlePreviewKeyDown(event) {
    if (event.target !== event.currentTarget) return
    const target = { ArrowLeft: activeSlide - 1, ArrowRight: activeSlide + 1, Home: 0, End: screenshots.length - 1 }[event.key]
    if (target === undefined) return
    event.preventDefault()
    goToSlide(target)
  }

  function startDrag(event) {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, a')) return
    dragRef.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
    event.currentTarget.dataset.dragging = 'true'
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event) {
    if (!dragRef.current) return
    event.currentTarget.scrollLeft = dragRef.current.scrollLeft + dragRef.current.x - event.clientX
  }

  function endDrag(event) {
    if (!dragRef.current) return
    dragRef.current = null
    delete event.currentTarget.dataset.dragging
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    goToSlide(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))
  }

  function selectSource(index) {
    setActiveSource(index)
    setHasInteracted(true)
    goToSlide(0)
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
    if (dragRef.current || event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
          <span className={styles.eyebrow}><span aria-hidden="true">↗</span> Your people. Your places.</span>
          <h1 id="social-save-heading">Found it?<br /><span>Map it.</span></h1>
          <p className={styles.communityHeadline}>The map built by people <strong>YouKnow.</strong></p>
          <p className={styles.intro}>Discover places recommended by friends and local communities alongside independent curations from the Michelin Guide, The World’s 50 Best and La Liste. Bring their picks and your Instagram, TikTok and Google Maps finds together on one personal map.</p>

          <div className={styles.downloads}>
            <span className={styles.freeNote}>Completely free. On iOS & Android.</span>
            {downloadButtons}
          </div>

          <div className={styles.guide} hidden={!hasInteracted} id="sharing-source-guide" aria-live="polite" aria-atomic="true">
            <div className={styles.guideTop}><span>{source.name} → YouKnow</span><span>0{activeSource + 1} / 03</span></div>
            <h3>{source.heading}</h3>
            <p hidden={!hasInteracted}>{source.description}</p>
            {hasInteracted && <Link to={source.tutorial}>See how it works <span aria-hidden="true">↗</span></Link>}
          </div>

          <div className={styles.proof}>
            <span>{communityNote}</span>
            <span>English, German, French & Italian</span>
          </div>
        </div>

        <figure className={styles.visual} ref={visualRef} data-engaged={hasInteracted} onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
          <div className={styles.composition}>
            <div className={styles.screensFloat}>
              <div className={styles.screensTilt}>
                <div className={styles.sources} hidden={activeSlide !== 0}
                  role="group" aria-label="Choose where you found a place">
                  {SOURCES.map((item, index) => (
                    <button className={styles.sourceButton} type="button" key={item.id}
                      data-source={item.id} data-name={item.name}
                      style={{ '--source-x': item.x, '--source-y': item.y, '--source-angle': item.angle }}
                      aria-label={`Show how to save from ${item.name}`}
                      aria-pressed={index === activeSource} aria-controls="sharing-source-guide"
                      onClick={() => selectSource(index)}>
                      <img src={item.icon} alt="" width="48" height="48" decoding="async" draggable="false" />
                    </button>
                  ))}
                </div>
                {activeSlide === 0 && (
                  <svg className={styles.sharingArrows} viewBox="0 0 500 730" fill="none" aria-hidden="true">
                    <g className={styles.sharingArrow} data-active={activeSource === 0}>
                      <path d="M82 123C127 122 127 212 205 248" />
                      <path d="m190 232 15 16-22-1" />
                    </g>
                    <g className={styles.sharingArrow} data-active={activeSource === 1}>
                      <path d="M423 240C408 238 403 264 383 276" />
                      <path d="m397 258-14 18 23-1" />
                    </g>
                    <g className={styles.sharingArrow} data-active={activeSource === 2}>
                      <path d="M82 530C154 571 170 380 322 408" />
                      <path d="m302 394 20 14-23 7" />
                    </g>
                  </svg>
                )}
                <div className={styles.backPhone}>
                  <img src="/images/youknow-feed-20261015.webp"
                    alt="YouKnow community feed with top curators and recommendations from friends."
                    width="1290" height="2796" loading="eager" decoding="async" draggable="false" />
                </div>
                <div className={styles.frontPhone}>
                  <div className={styles.carousel} ref={carouselRef}
                    role="region" aria-roledescription="carousel" aria-label="YouKnow app previews"
                    tabIndex={0} onScroll={handleCarouselScroll} onKeyDown={handlePreviewKeyDown}
                    onPointerDown={startDrag} onPointerMove={moveDrag}
                    onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
                    {screenshots.map((screenshot, index) => (
                      <div className={styles.slide} key={screenshot.id}
                        role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${screenshots.length}: ${previewLabels[index]}`}
                        aria-hidden={activeSlide !== index}>
                        <img className={styles.appScreenshot} src={screenshot.src} alt={screenshot.alt}
                          width="1290" height="2796" loading={index === 0 ? 'eager' : 'lazy'}
                          fetchpriority={index === 0 ? 'high' : undefined} decoding="async" draggable="false" />
                      </div>
                    ))}
                  </div>
                </div>
                <span className={styles.communityNote}>A friend’s favourite.<br /><strong>Your next find.</strong></span>
              </div>
            </div>
          </div>
          <div className={styles.previewPicker} role="group" aria-label="Choose app preview">
            {previewLabels.map((label, index) => (
              <button type="button" key={label} aria-pressed={activeSlide === index}
                onClick={() => goToSlide(index)}>{label}</button>
            ))}
          </div>
          <div className={styles.visualLinks}>
            <a href="#waitlist">Join mailing list</a>
            <a href="#community">Meet your people</a>
          </div>
          <figcaption className={styles.caption}>Swipe the front screen to explore <span aria-hidden="true">↔</span></figcaption>
        </figure>
      </div>
      <div className={`container ${styles.heroBottom}`}>
        <span>Good finds travel from person to person.</span>
        <a href="#how-it-works">Explore YouKnow <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
