import styles from './NightMapBackground.module.css'

const PLACES = [
  { name: 'Juniper Café', emoji: '☕', x: '8%', y: '28%', delay: '-3s', mobile: true },
  { name: 'Blue Hour', emoji: '🍸', x: '89%', y: '21%', delay: '-17s', mobile: true },
  { name: 'Little Sunday', emoji: '🥐', x: '9%', y: '78%', delay: '-11s', mobile: true },
  { name: 'Casa Luna', emoji: '🍝', x: '91%', y: '73%', delay: '-23s' },
  { name: 'Studio Nine', emoji: '🪩', x: '52%', y: '92%', delay: '-8s' },
  { name: 'Miso Corner', emoji: '🍣', x: '96%', y: '44%', delay: '-5s', mobile: true },
  { name: 'Slice Club', emoji: '🍕', x: '4%', y: '52%', delay: '-19s', mobile: true },
  { name: 'Taquería Sol', emoji: '🌮', x: '26%', y: '10%', delay: '-13s' },
  { name: 'Gelato Days', emoji: '🍦', x: '73%', y: '9%', delay: '-25s' },
  { name: 'Petit Verre', emoji: '🍷', x: '28%', y: '92%', delay: '-1s' },
  { name: 'Noodle House', emoji: '🍜', x: '76%', y: '91%', delay: '-15s' },
]

// A fictional city: decorative atmosphere, separate from real recommendations.
export default function NightMapBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.map} />
      <div className={styles.shade} />
      {PLACES.map(place => (
        <div className={styles.place} key={place.name} data-mobile={place.mobile || undefined}
          style={{ '--pin-x': place.x, '--pin-y': place.y, '--pin-delay': place.delay }}>
          <span className={styles.emoji}>{place.emoji}</span>
          <span className={styles.name}>{place.name}</span>
        </div>
      ))}
    </div>
  )
}
