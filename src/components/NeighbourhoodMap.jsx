import { useState } from 'react'
import styles from './NeighbourhoodMap.module.css'

const PLACES = [
  { id: 'juniper', name: 'Juniper Café', emoji: '☕', category: 'coffee', vibe: 'Slow mornings. Excellent coffee.', description: 'A window seat, a second flat white, and absolutely nowhere to rush to.', x: '23%', y: '27%', colour: '#f0c38a' },
  { id: 'sunday', name: 'Little Sunday', emoji: '🥐', category: 'coffee', vibe: 'Your new morning ritual.', description: 'Flaky pastries, a sunny little table, and the kind of morning you wish lasted longer.', x: '51%', y: '19%', colour: '#ffcb80' },
  { id: 'blue-hour', name: 'Blue Hour', emoji: '🍸', category: 'drinks', vibe: 'Stay for one more.', description: 'The lights are low. The playlist is right. Your usual order is already on its way.', x: '77%', y: '33%', colour: '#bed9ad' },
  { id: 'casa-luna', name: 'Casa Luna', emoji: '🍝', category: 'food', vibe: 'Dinner with your favourite people.', description: 'A tiny trattoria with big bowls of pasta. Bring someone who always orders something good.', x: '57%', y: '67%', colour: '#f7af91' },
  { id: 'studio-nine', name: 'Studio Nine', emoji: '🪩', category: 'night', vibe: 'For the one-more-song kind of night.', description: 'A little room, a great sound system, and a dance floor that feels like old friends.', x: '83%', y: '76%', colour: '#c3a4fa' },
  { id: 'petit-verre', name: 'Petit Verre', emoji: '🍷', category: 'drinks', vibe: 'Something new by the glass.', description: 'Natural wine, a few small plates, and a conversation that goes on a little longer.', x: '38%', y: '48%', colour: '#efa5bd' },
]

const FILTERS = [
  { id: 'all', label: 'A little of everything' },
  { id: 'coffee', label: '☕ A quiet coffee' },
  { id: 'food', label: '🍝 A casual dinner' },
  { id: 'drinks', label: '🍸 A cosy date night' },
  { id: 'night', label: '🪩 One more song' },
]

export default function NeighbourhoodMap() {
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState('juniper')
  const places = PLACES.filter(place => filter === 'all' || place.category === filter)
  const selected = places.find(place => place.id === selectedId) || places[0]

  function selectFilter(id) {
    setFilter(id)
    setSelectedId(PLACES.find(place => id === 'all' || place.category === id).id)
  }

  return (
    <section className={styles.section} id="search-by-vibe" aria-labelledby="neighbourhood-heading">
      <div className="container">
        <div className={styles.intro}>
          <span className={styles.eyebrow}>A little taste of YouKnow</span>
          <h2 id="neighbourhood-heading">Ask for a vibe,<br /><span>not a rating.</span></h2>
          <p>Pick the kind of moment you have in mind. See the places that fit your people and your mood.</p>
        </div>
        <div className={styles.filters} role="group" aria-label="Explore places by mood">
          {FILTERS.map(item => (
            <button type="button" key={item.id} aria-pressed={filter === item.id}
              aria-controls="neighbourhood-map"
              onClick={() => selectFilter(item.id)}>{item.label}</button>
          ))}
        </div>
        <div className={styles.stage}>
          <div className={styles.map} id="neighbourhood-map" role="group" aria-label="Places matching your vibe">
            <span className={styles.mapNote} role="status">
              {filter === 'all' ? 'Every kind of good place.' : `${places.length} ${places.length === 1 ? 'place' : 'places'} for your vibe.`} Tap a pin to explore.
            </span>
            {places.map(place => (
              <button className={styles.pin} type="button" key={place.id}
                style={{ left: place.x, top: place.y, '--glow': place.colour }}
                aria-label={`Explore ${place.name}`} aria-pressed={selected.id === place.id}
                aria-controls="neighbourhood-place" onClick={() => setSelectedId(place.id)}>
                <span className={styles.pinEmoji} aria-hidden="true">{place.emoji}</span>
                <span className={styles.pinName}>{place.name}</span>
              </button>
            ))}
            <span className={styles.mapCaption}>An imaginary neighbourhood.<br />Find your real places in YouKnow.</span>
          </div>
          <div className={styles.detail} id="neighbourhood-place" aria-live="polite" aria-atomic="true">
            <span className={styles.detailEmoji} aria-hidden="true">{selected.emoji}</span>
            <span className={styles.detailEyebrow}>Somewhere you’d love</span>
            <h3>{selected.name}</h3>
            <p className={styles.vibe}>{selected.vibe}</p>
            <p className={styles.description}>{selected.description}</p>
            <a href="#download">Find your real places <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
