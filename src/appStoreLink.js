export const APP_STORE_URL = 'https://apps.apple.com/app/id6759484614'

const NATIVE_APP_STORE_URL =
  'itms-apps://itunes.apple.com/app/id6759484614'

const INSTAGRAM_EXTERNAL_BROWSER_URL =
  `instagram://extbrowser/?url=${encodeURIComponent(APP_STORE_URL)}`

function isIOSDevice() {
  const navigator = window.navigator
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function isInstagramIOS() {
  return isIOSDevice() && /Instagram/i.test(window.navigator.userAgent || '')
}

export function openIOSAppStore(event) {
  if (!isIOSDevice()) return

  let fallbackTimer = null

  const cancelFallback = () => {
    if (fallbackTimer === null) return
    window.clearTimeout(fallbackTimer)
    fallbackTimer = null
  }
  const cancelWhenLeaving = () => {
    if (document.hidden) cancelFallback()
  }

  document.addEventListener('visibilitychange', cancelWhenLeaving, {
    once: true,
  })
  window.addEventListener('pagehide', cancelFallback, { once: true })

  // The anchor's native URL opens directly from the user's tap. Instagram's
  // iOS browser commonly suppresses App Store links opened in a new tab.
  fallbackTimer = window.setTimeout(() => {
    fallbackTimer = null
    if (document.hidden) return
    if (isInstagramIOS()) {
      window.alert(
        'Instagram blocked the Safari handoff. Tap the three dots above, then “Open in external browser”.',
      )
      return
    }
    window.location.assign(APP_STORE_URL)
  }, 1400)
}

export function appStoreHref() {
  if (isInstagramIOS()) return INSTAGRAM_EXTERNAL_BROWSER_URL
  return isIOSDevice() ? NATIVE_APP_STORE_URL : APP_STORE_URL
}
