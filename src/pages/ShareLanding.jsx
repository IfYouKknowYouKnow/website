import { useEffect, useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import styles from './ShareLanding.module.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/yk-youknow/id6759484614'
const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.youknow.mobile'

function cleanInviteCode(value) {
  return (value || '').trim().replace(/[^A-Za-z0-9]/g, '').toUpperCase()
}

function cleanName(value) {
  return (value || '').trim().replace(/\s+/g, ' ').slice(0, 42)
}

function useQuery() {
  const location = useLocation()
  return useMemo(() => new URLSearchParams(location.search), [location.search])
}

function useDevicePlatform() {
  return useMemo(() => {
    const userAgent = window.navigator.userAgent || ''
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' &&
        window.navigator.maxTouchPoints > 1)
    const isAndroid = /Android/i.test(userAgent)

    if (isIOS) return 'ios'
    if (isAndroid) return 'android'
    return 'desktop'
  }, [])
}

export default function ShareLanding({ type }) {
  const params = useParams()
  const query = useQuery()
  const devicePlatform = useDevicePlatform()
  const isInvite = type === 'invite'
  const inviteCode = cleanInviteCode(query.get('code') || params.code)
  const placeId = (query.get('id') || params.placeId || '').trim()
  const inviterName = cleanName(query.get('from') || query.get('name'))
  const displayName = inviterName || 'Someone'
  const targetId = isInvite ? inviteCode : placeId
  const deepLink = isInvite
    ? `youknow://invite/${encodeURIComponent(inviteCode)}`
    : `youknow://place/${encodeURIComponent(placeId)}`

  useEffect(() => {
    if (!targetId) return undefined

    const title = isInvite
      ? `${displayName} invited you | YouKnow`
      : 'Open this place | YouKnow'
    document.title = title

    const openTimer = window.setTimeout(() => {
      window.location.href = deepLink
    }, 450)

    return () => window.clearTimeout(openTimer)
  }, [deepLink, displayName, isInvite, targetId])

  const title = isInvite
    ? `${displayName} saved you a seat.`
    : 'Open this place in YouKnow.'
  const subtitle = isInvite
    ? 'Join from this invite and you will be connected automatically, so their map can start becoming yours too.'
    : 'Your friend sent you a spot from their map. Open it in the app to see the details, vibes, and who saved it.'
  const missingMessage = isInvite
    ? 'This invite link is missing its invite code.'
    : 'This place link is missing its place id.'
  const fallbackMessage = isInvite
    ? devicePlatform === 'android'
      ? 'If the app did not open, get YouKnow on Google Play and enter the invite code above.'
      : 'If the app did not open, install YouKnow and enter the invite code above.'
    : 'If the app did not open, use the button above or install YouKnow.'
  const storeButtons =
    devicePlatform === 'android'
      ? ['android', 'ios']
      : devicePlatform === 'ios'
      ? ['ios', 'android']
      : ['ios', 'android']

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/" aria-label="YouKnow home">
          <img src="/long_logo.png" alt="YouKnow" decoding="async" />
        </Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            {isInvite ? '✨ Personal invite' : '📍 Shared place'}
          </p>
          <h1>{title}</h1>
          <p className={styles.subhead}>{subtitle}</p>

          {isInvite && inviteCode && (
            <p className={styles.code}>
              Invite code <strong>{inviteCode}</strong>
            </p>
          )}

          <div className={styles.actions}>
            {targetId ? (
              <a className={styles.secondaryButton} href={deepLink}>
                {isInvite ? 'Accept invite' : 'Open in app'}
              </a>
            ) : (
              <Link className={styles.secondaryButton} to="/">
                Go to YouKnow
              </Link>
            )}
            {storeButtons.map((store) =>
              store === 'android' ? (
                <a
                  key="android"
                  className={styles.storeBadgeLink}
                  href={ANDROID_PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Get it on Google Play"
                >
                  <img
                    className={`${styles.storeBadge} ${styles.googlePlayBadge}`}
                    src="/badges/google-play-badge.png"
                    alt="Get it on Google Play"
                    decoding="async"
                  />
                </a>
              ) : (
                <a
                  key="ios"
                  className={styles.storeBadgeLink}
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download on the App Store"
                >
                  <img
                    className={`${styles.storeBadge} ${styles.appStoreBadge}`}
                    src="/badges/app-store-badge.svg"
                    alt="Download on the App Store"
                    decoding="async"
                  />
                </a>
              ),
            )}
          </div>

          <p className={styles.status}>
            {targetId ? fallbackMessage : missingMessage}
          </p>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={`${styles.phone} ${styles.phoneBack}`}>
            <img src={isInvite ? '/images/IMG_3388.PNG' : '/placesheet_screen.PNG'} alt="" />
          </div>
          <div className={styles.phone}>
            <img src={isInvite ? '/images/IMG_3387.PNG' : '/new_screen_iphon.PNG'} alt="" />
          </div>
          <div className={styles.floatCard}>
            <p>{isInvite ? 'Start with someone you trust.' : 'Places, not lists.'}</p>
            <span>
              {isInvite
                ? 'The invite connects you as friends, then YouKnow opens around places your people saved.'
                : 'Jump straight to the shared pin and keep exploring from there.'}
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
