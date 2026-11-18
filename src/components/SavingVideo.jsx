import { useEffect, useRef } from 'react'

// A supplied playing value controls homepage previews. Tutorials use native
// controls and start paused. Both stop when hidden or scrolled out of view.
export default function SavingVideo({ demo, playing, className, id }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    let visible = false

    function update() {
      if (!visible || document.hidden || playing === false) video.pause()
      else if (playing === true) video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .15
      update()
    }, { threshold: .15 })
    observer.observe(video)
    document.addEventListener('visibilitychange', update)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      video.pause()
    }
  }, [demo.src, playing])

  return <video ref={videoRef} id={id} className={className}
    controls={playing === undefined} muted playsInline loop={playing !== undefined}
    preload="none" poster={demo.poster} width="540" height="1170"
    aria-label={demo.alt}>
    <source src={demo.src} type="video/mp4" />
    <a href={demo.src}>Watch the {demo.label.toLowerCase()} saving video</a>
  </video>
}
