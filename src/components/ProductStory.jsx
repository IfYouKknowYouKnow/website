import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductStory.module.css'
import SavingVideo from './SavingVideo'
import { SAVING_DEMOS } from '../savingDemos'
import { msg, useI18n } from '../i18n'

const CHAPTERS = [
  {
    id: 'discover', label: msg('Discover'), eyebrow: msg('Follow good taste'),
    title: [msg('Your people.'), msg('Their good spots.')],
    description: msg('The café your friend keeps going back to. The bar a local swears by. Bring recommendations from people you trust onto a map that feels like you.'),
    detail: msg('Start with the living map'),
    src: '/images/youknow-map-20261015.webp',
    alt: msg('The real YouKnow map showing recommended places in Zurich and category filters.'),
    note: msg('A little local knowledge goes a long way.'),
  },
  {
    id: 'save', label: msg('Save'), eyebrow: msg('From your feed to your map'),
    title: [msg('Found it?'), msg('Make it a plan.')],
    description: msg('That restaurant on Instagram. A late-night TikTok find. Share it with YouKnow, confirm the place, and save it for the moment you actually want to go.'),
    detail: msg('Save places from Instagram & TikTok'),
    src: SAVING_DEMOS[0].poster,
    alt: msg('YouKnow saving flow: share a social post, confirm the matching place, and save it to your map.'),
    note: msg('Less lost in your saved posts. More see you there.'),
  },
  {
    id: 'find', label: msg('Find'), eyebrow: msg('A search that gets the mood'),
    title: [msg('Name the vibe.'), msg('Find the place.')],
    description: msg('A quiet café to work from. A cosy bar for a first date. Describe what you have in mind and let AI help you find the right place on your map.'),
    detail: msg('Search by vibe with AI'),
    src: '/images/youknow-search-20261015.webp',
    alt: msg('The YouKnow app’s natural-language search, with filters for people, curations, food, drinks and opening times.'),
    note: msg('Your plans, in your own words.'),
  },
]

const PROMPTS = [msg('A quiet café to work from'), msg('A cosy bar for a first date'), msg('Somewhere for dinner with friends')]
const PROMPT_LABELS = [msg('Coffee'), msg('Date night'), msg('Dinner')]

export default function ProductStory() {
  const { tr } = useI18n()
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [prompt, setPrompt] = useState(0)
  const [savingDemoIndex, setSavingDemoIndex] = useState(0)
  const savingDemo = SAVING_DEMOS[savingDemoIndex]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => {
      setReducedMotion(media.matches)
      setPlaying(!media.matches)
    }
    change()
    media.addEventListener('change', change)
    let frame = 0
    const section = sectionRef.current
    const chapters = [...section.querySelectorAll('[data-chapter]')]
    function update() {
      frame = 0
      if (window.innerWidth < 801) return
      const bounds = section.getBoundingClientRect()
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return
      const target = window.innerHeight * .5
      let closest = 0
      let distance = Infinity
      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect()
        const next = Math.abs(rect.top + rect.height / 2 - target)
        if (next < distance) { closest = index; distance = next }
      })
      setActive(closest)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      media.removeEventListener('change', change)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  function selectChapter(index) {
    setActive(index)
    sectionRef.current.querySelector(`[data-chapter="${index}"]`).scrollIntoView({
      behavior: reducedMotion ? 'instant' : 'smooth', block: 'center',
    })
  }

  function preview(chapter, index, mobile = false) {
    return <div className={mobile ? styles.mobilePreview : `${styles.screen} ${index === active ? styles.activeScreen : ''}`}
      aria-hidden={!mobile && index !== active} key={chapter.id}>
      {index === 1
        ? <SavingVideo key={savingDemo.id} demo={savingDemo} playing={playing && (mobile || active === index)}
            id={mobile ? 'mobile-saving-demo' : 'desktop-saving-demo'} />
        : <img src={chapter.src} alt={tr(chapter.alt)} width="1290" height="2796" loading="lazy" decoding="async" />}
    </div>
  }

  return <section className={styles.section} id="how-it-works" ref={sectionRef} aria-labelledby="product-heading">
    <div className={styles.heading} data-reveal>
      <span className={styles.eyebrow}>{tr('GOOD PLANS START HERE')}</span>
      <h2 id="product-heading">{tr('From a recommendation')}<br /><span>{tr('to your next plan.')}</span></h2>
      <p>{tr('Discover, save and find your way back.')}<br />{tr('Everything you need, on one map.')}</p>
    </div>
    <div className={styles.layout}>
      <div className={styles.sticky}>
        <div className={styles.stage} data-active={active}>
          <span className={styles.stageLabel}>{tr('Good taste, to go.')}</span>
          <div className={styles.phone}>{CHAPTERS.map((chapter, index) => preview(chapter, index))}</div>
          <div className={styles.stageFooter}>
            <span className={styles.stageCount}>0{active + 1}<span> / 03</span></span>
            <p>{tr(CHAPTERS[active].note)}</p>
          </div>
        </div>
        <div className={styles.tabs} role="group" aria-label={tr('Explore product chapters')}>
          {CHAPTERS.map((chapter, index) => <button key={chapter.id} type="button" aria-pressed={active === index}
            onClick={() => selectChapter(index)}><span>0{index + 1}</span>{tr(chapter.label)}<span aria-hidden="true">↗</span></button>)}
        </div>
      </div>
      <div className={styles.chapters}>
        {CHAPTERS.map((chapter, index) => <article key={chapter.id} id={`product-${chapter.id}`} data-chapter={index}
          className={styles.chapter}>
          <div className={styles.chapterCopy} data-reveal>
            <span className={styles.eyebrow}>{tr(chapter.eyebrow)}</span>
            <h3>{tr(chapter.title[0])}<br />{tr(chapter.title[1])}</h3>
            <p aria-live={index === 1 ? 'polite' : undefined}>{tr(index === 1 ? savingDemo.description : chapter.description)}</p>
            {index === 0 && <div className={styles.peopleNote}><span aria-hidden="true">↗</span>{' '}{tr('Start with people you trust.')}</div>}
            {index === 1 && <>
              <div className={styles.sources} aria-label={tr('Save places from Instagram, TikTok and Google Maps')}>
                <img src="/images/social/instagram.svg" alt="Instagram" width="24" height="24" />
                <img src="/images/social/tiktok.webp" alt="TikTok" width="24" height="24" />
                <img src="/images/social/google-maps.svg" alt="Google Maps" width="24" height="24" />
                <span>{tr('All your finds. One map.')}</span>
              </div>
              <div className={styles.savingChoices} role="group" aria-label={tr('Choose a saving demo')}>
                {SAVING_DEMOS.map((demo, i) => <button type="button" key={demo.id} aria-pressed={savingDemoIndex === i}
                  aria-controls="desktop-saving-demo mobile-saving-demo" onClick={() => setSavingDemoIndex(i)}>{tr(demo.label)}</button>)}
              </div>
              <button className={styles.demoButton} type="button" aria-pressed={playing}
                aria-controls="desktop-saving-demo mobile-saving-demo" onClick={() => setPlaying(!playing)}>
                <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{playing ? tr('Pause saving demo') : tr('Play saving demo')}
              </button>
            </>}
            {index === 2 && <div className={styles.promptDemo}>
              <span className={styles.promptLabel}>{tr('TRY AN EXAMPLE PROMPT')}</span>
              <p key={prompt}>{tr('“{text}”', { text: tr(PROMPTS[prompt]) })}<span aria-hidden="true">↗</span></p>
              <div role="group" aria-label={tr('Choose an example search prompt')}>
                {PROMPT_LABELS.map((label, i) => <button type="button" key={label} aria-pressed={prompt === i} onClick={() => setPrompt(i)}>{tr(label)}</button>)}
              </div>
              <span className={styles.promptHint}>{tr('Search your own map in the app.')}</span>
            </div>}
            <span className={styles.featureName}>{tr(index === 1 ? savingDemo.detail : chapter.detail)}</span>
            {index === 1 && <Link className={styles.tutorialLink} to={`/tutorials#${savingDemo.id}`}>{tr('See the saving guide')}{' '}<span aria-hidden="true">↗</span></Link>}
          </div>
          {preview(chapter, index, true)}
        </article>)}
      </div>
    </div>
  </section>
}
