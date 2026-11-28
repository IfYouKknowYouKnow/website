import { Fragment } from 'react'
import styles from './HeroSourcePins.module.css'

// Like the app's onboarding: places arrive on the map from the ways people save them. Each pin
// flies from its source's tile and keeps that source as a badge in its corner.
// Positions are percentages of the phone screen: [x, y].
const SOURCES = [
  { id: 'instagram', icon: '/images/social/instagram.svg', emoji: '🍝', tile: [-3, 17], pin: [30, 37] },
  { id: 'tiktok', icon: '/images/social/tiktok.webp', emoji: '🍸', tile: [103, 8], pin: [69, 31] },
  { id: 'gallery', icon: '/images/social/gallery.svg', emoji: '🥐', tile: [-3, 60], pin: [35, 62] },
  { id: 'whatsapp', icon: '/images/social/whatsapp.svg', emoji: '☕', tile: [103, 27], pin: [70, 54] },
]

export default function HeroSourcePins() {
  return <div className={styles.layer} aria-hidden="true">
    {SOURCES.map(({ id, icon, emoji, tile, pin }, index) => {
      const delay = { '--delay': `${.9 + index * 1.4}s` }
      return <Fragment key={id}>
        <span className={styles.tile} style={{ left: `${tile[0]}%`, top: `${tile[1]}%`, ...delay }}><img src={icon} alt="" width="64" height="64" /></span>
        <span className={styles.pin} style={{ '--sx': `${tile[0]}%`, '--sy': `${tile[1]}%`, '--px': `${pin[0]}%`, '--py': `${pin[1]}%`, '--peak': `${Math.min(tile[1], pin[1]) - 5}%`, ...delay }}>
          <span className={styles.burst} />
          <span className={styles.glyph}>{emoji}<span className={styles.badge}><img src={icon} alt="" width="64" height="64" /></span></span>
        </span>
      </Fragment>
    })}
  </div>
}
