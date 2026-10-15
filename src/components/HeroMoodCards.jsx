import styles from './HeroMoodCards.module.css'

const MOODS = [
  { id: 'date', label: 'Date night spot', href: '/zurich/date-night/', colour: '#fb77a4' },
  { id: 'night', label: 'Underground techno clubs', href: '#download', colour: '#a55ae8' },
  { id: 'cafe', label: 'Cosy café', href: '/zurich/cafes/', colour: '#589cf7' },
  { id: 'aperitivo', label: 'Aperitivo with a view', href: '/zurich/bars/', colour: '#4bd65d' },
]

export default function HeroMoodCards() {
  return (
    <div className={styles.cards}>
      {MOODS.map(mood => (
        <a className={`${styles.card} ${styles[mood.id]}`} href={mood.href} style={{ '--mood-colour': mood.colour }} key={mood.id}>
          <span className={styles.label}><span aria-hidden="true" />{mood.label}</span>
        </a>
      ))}
      <svg className={styles.doodles} viewBox="0 0 600 780" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m76 56-16-12m28 3-7-20M535 106l9-23m4 29 18-10" />
          <path d="M37 415c-18-7-22 3-4 15 14-13 9-27 2-20l-2 9" />
          <path d="m554 415 4-13 5 13 11 5-11 5-5 13-4-13-10-5z" />
          <path d="M543 663c23-64-48-88-83-45m0 0 6-16m-6 16 18-2" />
        </g>
      </svg>
      <span className={styles.note} aria-hidden="true">Same places.<br />Better people.</span>
    </div>
  )
}
