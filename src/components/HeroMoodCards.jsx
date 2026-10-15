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
      <svg className={styles.arrow} viewBox="0 0 600 780" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M543 663c23-64-48-88-83-45m0 0 6-16m-6 16 18-2" />
        </g>
      </svg>
      <span className={styles.note} aria-hidden="true">Same places.<br />Better people.</span>
    </div>
  )
}
