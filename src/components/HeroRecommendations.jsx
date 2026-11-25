import styles from './HeroRecommendations.module.css'
import { useI18n } from '../i18n'

export default function HeroRecommendations({ mood, selectedIndex, onSelect }) {
  const { tr } = useI18n()
  const selected = mood.places[selectedIndex]

  return <aside id="hero-recommendations" className={styles.card} style={{ '--source-accent': mood.accent }}
    aria-label={tr('Illustrative recommendations from friends and curators')}>
    <div className={styles.header}>
      <span className={styles.avatar} aria-hidden="true">{mood.initial}</span>
      <div className={styles.identity}><strong>{mood.name}</strong><span>{tr(mood.source)}</span></div>
      <span className={styles.example}>{tr('Example')}</span>
    </div>
    <div aria-live="polite" aria-atomic="true"><h2>{tr(mood.heading)}</h2></div>
    <div className={styles.places} role="group" aria-label={tr('{name}’s example recommendations', { name: mood.name })}>
      {mood.places.map((place, index) => <button type="button" key={place.name}
        aria-pressed={selectedIndex === index} aria-controls="hero-recommendation-detail"
        aria-label={tr('Preview {place}, recommended by {name}', { place: place.name, name: mood.name })}
        onClick={() => onSelect(index)}>
        <span className={styles.placeEmoji} aria-hidden="true">{place.emoji}</span>
        <strong>{place.name}</strong><span className={styles.distance}>{place.distance}<span aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    <div className={styles.reason} id="hero-recommendation-detail" aria-live="polite" aria-atomic="true">
      <span>{tr('WHY {name} SAVED IT', { name: mood.name.toUpperCase() })}</span>
      <p key={selected.name}>{tr(selected.reason)}</p>
    </div>
    <span className={styles.hint}>{tr('Tap a spot to find it on the map.')}</span>
  </aside>
}
