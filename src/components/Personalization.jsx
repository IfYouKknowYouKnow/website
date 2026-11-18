import { useEffect, useRef, useState } from 'react'
import styles from './Personalization.module.css'

const ACTIONS = [
  { id: 'recommend', title: 'Recommend', illustration: '/images/onboarding/recommend.png', label: 'SHARE A FAVOURITE', description: 'Recommend the places you love so your friends can discover them too.' },
  { id: 'wishlist', title: 'Wishlist', illustration: '/images/onboarding/wishlist.png', label: 'SAVE FOR LATER', description: 'Keep the places you want to try in one collection, ready for your next plan.' },
  { id: 'dislike', title: 'Dislike', illustration: '/images/onboarding/dislike.png', label: 'REFINE YOUR TASTE', description: 'Let YouKnow know when a place is not for you, and help your friends make a more informed choice.' },
]

export default function Personalization() {
  const sectionRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPlaying(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const videos = [...sectionRef.current.querySelectorAll('video')]
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting && playing && !document.hidden) target.play().catch(() => {})
        else target.pause()
      })
    }, { threshold: .15 })
    videos.forEach(video => observer.observe(video))
    const visibilityChange = () => {
      videos.forEach(video => {
        const bounds = video.getBoundingClientRect()
        if (!document.hidden && playing && bounds.bottom > 0 && bounds.top < innerHeight) video.play().catch(() => {})
        else video.pause()
      })
    }
    document.addEventListener('visibilitychange', visibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibilityChange)
      videos.forEach(video => video.pause())
    }
  }, [playing])

  return <section className={styles.section} id="make-it-yours" aria-labelledby="personalization-heading" ref={sectionRef}>
    <div className={styles.heading} data-reveal>
      <div><span className={styles.eyebrow}>A LITTLE MORE YOU</span><h2 id="personalization-heading">A map that learns<br /><span>your taste.</span></h2></div>
      <div className={styles.intro}>
        <p><strong>The more you interact, the more it feels like you.</strong> Your recommendations, wishlist and dislikes help YouKnow learn your taste and personalize what you discover.</p>
        <button type="button" onClick={() => setPlaying(!playing)} aria-pressed={playing} aria-controls="personalization-demos"><span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{playing ? 'Pause demos' : 'Play demos'}</button>
      </div>
    </div>
    <div className={styles.grid} id="personalization-demos">
      {ACTIONS.map((action) => <article className={styles.card} data-action={action.id} key={action.id} data-reveal>
        <div className={styles.cardCopy}>
          <div className={styles.actionMeta}><span aria-hidden="true"><img src={action.illustration} alt="" width="64" height="64" loading="lazy" /></span><span>{action.label}</span></div>
          <h3>{action.title}</h3><p id={`${action.id}-description`}>{action.description}</p>
        </div>
        <div className={styles.screen}>
          <video muted loop playsInline preload="none" poster={`/videos/personalization/${action.id}-poster.jpg`} aria-label={`${action.title} a place in YouKnow`} aria-describedby={`${action.id}-description`}>
            <source src={`/videos/personalization/${action.id}.mp4`} type="video/mp4" />
          </video>
        </div>
      </article>)}
    </div>
    <p className={styles.note}><span aria-hidden="true">↗</span> Your taste shapes your map. Your finds help shape theirs.</p>
  </section>
}
