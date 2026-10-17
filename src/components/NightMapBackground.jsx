import styles from './NightMapBackground.module.css'

const PLACES = [
  { name: 'Juniper Café', emoji: '☕', x: '8%', y: '28%', delay: '-3s' },
  { name: 'Blue Hour', emoji: '🍸', x: '89%', y: '21%', delay: '-17s' },
  { name: 'Little Sunday', emoji: '🥐', x: '9%', y: '78%', delay: '-11s' },
  { name: 'Casa Luna', emoji: '🍝', x: '91%', y: '73%', delay: '-23s' },
  { name: 'Studio Nine', emoji: '🪩', x: '52%', y: '92%', delay: '-8s' },
]

// A fictional city: decorative atmosphere, separate from real recommendations.
export default function NightMapBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.map} />
      <div className={styles.shade} />
      {PLACES.map(place => (
        <div className={styles.place} key={place.name}
          style={{ '--pin-x': place.x, '--pin-y': place.y, '--pin-delay': place.delay }}>
          <span className={styles.emoji}>{place.emoji}</span>
          <span className={styles.name}>{place.name}</span>
        </div>
      ))}
    </div>
  )
}
