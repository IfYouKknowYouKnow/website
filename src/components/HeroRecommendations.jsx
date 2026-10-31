import styles from './HeroRecommendations.module.css'

export default function HeroRecommendations({ mood, selectedIndex, onSelect }) {
  const selected = mood.places[selectedIndex]

  return <aside id="hero-recommendations" className={styles.card} style={{ '--source-accent': mood.accent }}
    aria-label="Illustrative recommendations from friends and curators">
    <div className={styles.header}>
      <span className={styles.avatar} aria-hidden="true">{mood.initial}</span>
      <div className={styles.identity}><strong>{mood.name}</strong><span>{mood.source}</span></div>
      <span className={styles.example}>Example</span>
    </div>
    <div aria-live="polite" aria-atomic="true"><h2>{mood.heading}</h2></div>
    <div className={styles.places} role="group" aria-label={`${mood.name}’s example recommendations`}>
      {mood.places.map((place, index) => <button type="button" key={place.name}
        aria-pressed={selectedIndex === index} aria-controls="hero-recommendation-detail"
        aria-label={`Preview ${place.name}, recommended by ${mood.name}`}
        onClick={() => onSelect(index)}>
        <span className={styles.placeEmoji} aria-hidden="true">{place.emoji}</span>
        <strong>{place.name}</strong><span className={styles.distance}>{place.distance}<span aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    <div className={styles.reason} id="hero-recommendation-detail" aria-live="polite" aria-atomic="true">
      <span>WHY {mood.name.toUpperCase()} SAVED IT</span>
      <p key={selected.name}>{selected.reason}</p>
    </div>
    <span className={styles.hint}>Tap a spot to find it on the map.</span>
  </aside>
}
