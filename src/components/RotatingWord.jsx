import { useEffect, useRef, useState } from 'react'
import styles from './RotatingWord.module.css'

const WORDS = ['vibey', 'great', 'cosy', 'lively', 'romantic', 'unexpected']

export default function RotatingWord() {
  const ref = useRef(null)
  const [text, setText] = useState(WORDS[0])
  const [active, setActive] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer
    let visible = false
    let running = false
    let index = 0
    let length = WORDS[0].length
    let deleting = true
    let delay = 1800

    function tick() {
      if (!running) return
      if (deleting) {
        length -= 1
        delay = 65
        if (length === 0) {
          index = (index + 1) % WORDS.length
          deleting = false
          delay = 250
        }
      } else {
        length += 1
        delay = 100
        if (length === WORDS[index].length) {
          deleting = true
          delay = 1800
        }
      }
      setText(WORDS[index].slice(0, length))
      timer = window.setTimeout(tick, delay)
    }

    function sync() {
      window.clearTimeout(timer)
      running = visible && !media.matches && !document.hidden
      setActive(running)
      if (media.matches) {
        index = 0
        length = WORDS[0].length
        deleting = true
        delay = 1800
        setText(WORDS[0])
      }
      if (running) timer = window.setTimeout(tick, delay)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    }, { threshold: .15 })
    observer.observe(ref.current)
    media.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      running = false
      window.clearTimeout(timer)
      observer.disconnect()
      media.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return <span className={styles.line} ref={ref} aria-hidden="true" data-rotating-word data-active={active}>
    <em>{text}{text && '.'}<span className={styles.cursor} /></em>
  </span>
}
