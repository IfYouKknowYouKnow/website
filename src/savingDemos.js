// The app's onboarding recordings with its timed pointing hand rendered into
// the video, so the cues remain visible in native mobile fullscreen playback.
import { msg } from './i18n.js'

export const SAVING_DEMOS = [
  {
    id: 'social-sharing',
    label: msg('Social posts'),
    src: '/videos/onboarding/social-share-guided.mp4',
    poster: '/videos/onboarding/social-share-guided-poster.jpg',
    description: msg('That restaurant on Instagram. A late-night TikTok find. Tap Share, choose YouKnow, review the matching places and save them for your next plan.'),
    detail: msg('Save places from Instagram & TikTok'),
    alt: msg('Instagram sharing recording: tap Share, choose YouKnow, review the places and save them.'),
  },
  {
    id: 'photo-sharing',
    label: msg('Camera roll'),
    src: '/videos/onboarding/camera-roll-guided.mp4',
    poster: '/videos/onboarding/camera-roll-guided-poster.jpg',
    description: msg('A good meal. A place worth remembering. Share a photo from your camera roll to YouKnow, choose the matching place and keep it on your map.'),
    detail: msg('Save a place from your photos'),
    alt: msg('Camera roll recording: share a photo to YouKnow, choose the matching venue and see it on your map.'),
  },
]
