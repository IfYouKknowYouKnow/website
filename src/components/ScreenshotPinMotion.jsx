import { useState } from 'react'
import styles from './ScreenshotPinMotion.module.css'

const SCREENSHOT = '/images/youknow-map-20261015.webp'
const PINS = [
  { name: 'Roots coffee', x: 14.7, y: 26.7 },
  { name: 'ORA Bar Zürich', x: 74.1, y: 27.9 },
  { name: 'Café Henrici', x: 64.2, y: 50.5 },
  { name: 'Positano pizza', x: 66.3, y: 18.5 },
  { name: 'Sora Sushi', x: 25.5, y: 13.1 },
  { name: 'Milchbar coffee', x: 30.2, y: 75.2 },
]

// Magnify the existing screenshot pixels, preserving the app's exact map design.
export default function ScreenshotPinMotion() {
  const [activePin, setActivePin] = useState(null)

  return (
    <div className={styles.layer}>
      {PINS.map((pin, index) => (
        <button
          className={styles.pin}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          type="button"
          aria-label={`Enlarge ${pin.name} map pin`}
          aria-pressed={activePin === index}
          onClick={() => setActivePin(current => current === index ? null : index)}
          key={pin.name}
        >
          <span className={styles.lens} aria-hidden="true">
            <svg viewBox={`${1290 * pin.x / 100 - 70} ${2796 * pin.y / 100 - 70} 140 140`}>
              <image href={SCREENSHOT} width="1290" height="2796" />
            </svg>
          </span>
        </button>
      ))}
    </div>
  )
}
