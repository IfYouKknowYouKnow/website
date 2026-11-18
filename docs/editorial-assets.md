# Homepage editorial photographs

Locally stored venue photography supplies atmosphere in the hero examples,
rather than representing a specific recommendation. City cards and
city guide pages use the corresponding user-supplied app screenshots.

- `public/images/editorial/cafe.jpg`: https://images.unsplash.com/photo-1554118811-1e0d58224f24
- `public/images/editorial/restaurant.jpg`: image asset https://images.unsplash.com/photo-1517248135467-4c7edcad34c4
- `public/images/editorial/bar.jpg`: image asset https://images.unsplash.com/photo-1514933651103-005eec06c04b

The product previews are the existing YouKnow app screenshots. Search prompt
examples are labelled as examples and do not claim to execute an app search.

`public/images/youknow-curations-editorial.png` is the user-supplied Curations
screenshot showing Augusta Sboccia in Città, the MICHELIN Guide and La Liste.
Feature card previews display the complete screenshots, including the saved
place lists at the bottom of the profile screen.

`public/images/cities/{geneva,zurich,berlin,milan,paris,tokyo}-app.png` are the user's screenshots
of flying to each city in YouKnow. Both the homepage city cards and the matching
guide pages show the full city screen, including the map and place list.
Responsive `-430.webp` and `-860.webp` copies preserve that complete screen
while reducing transfer size. The same optimization is applied to the curation
screenshot and main map. The existing raster-backed wordmark SVG is also served
as a smaller transparent WebP, with the original source retained.

`src/cityGuideCommunityPlaces.js` contains five public community place records
per new city (Milan, Paris and Tokyo), read from the website's existing public
Supabase places API on 2026-10-31. These guides query recommendation count
descending, then save count descending, and refresh through the same public API.
The checked-in records provide an offline fallback and homepage preview. The
screenshots are user-supplied app views; their visible Top picks are independent
of the live community ranking shown in the guide. No venue IDs or counts are invented.

The hero's recommendations are explicitly labelled as examples. Ana, Maya and
Luca are illustrative people; their recommendations, reasons and distances are
demo content, not live endorsements or a visitor's location. Place names and
marker positions come from the existing Zurich app-map screenshot. Selecting a
mood changes the example source and shortlist; selecting a place moves the
attribution marker to its position on that screenshot.

## Personalization demos

The “Make the map yours” section uses the user's newest Downloads recording,
`ScreenRecording_10-31-2026 16-41-54_1.MP4`, filmed on 2026-10-31. The source is
unchanged. Three silent extracts are saved in `public/videos/personalization/`:

- `recommend.mp4`: source 2.3–8.5 seconds, including the recommendation flow and star confirmation.
- `wishlist.mp4`: source 8.8–14.0 seconds, including Want to go and the bookmark confirmation.
- `dislike.mp4`: source 18.8–26.9 seconds, including the optional warning and dislike confirmation.

The H.264 MP4s retain the complete phone screen at 444×960, 24 fps, roughly
650 kbps, with no audio tracks. The three clips total approximately 1.8 MB.
JPEG posters are stills from the same recording. Clips play only while visible,
can be paused together, and start as still posters for reduced-motion users.

## Saving videos

The homepage's Save chapter and the Tutorials page use guided versions of the
MP4s bundled in `iykyk_flutter/assets/onboarding/demos/`: `social-share.mp4` and
`camera-roll.mp4`. The social clip shows
Instagram sharing, choosing YouKnow, reviewing detected venues and saving them.
The photo clip shows Photos sharing, choosing the venue and its map placement.
Both keep the app's existing edits, duration and recipient blurring. The website
versions add the onboarding's white pointing glove directly into the frames, so
it remains visible in native video fullscreen on phones. The glove's fingertip
anchors to each control and flips near the bottom/right edges to stay in frame.
It pulses only during the four social-sharing taps and three photo-sharing taps;
the loading, review and confirmation portions have no pointing hand.

`scripts/saving-video-cues.json` copies the timings and normalized coordinates
from `tutorialCuesByFile` in the Flutter app's `tutorial_video.dart`.
`scripts/annotate-saving-videos.swift` ports its `TapMarkerPainter` and exports
the silent 540×1170 H.264 `*-guided.mp4` files into `public/videos/onboarding/`.
To regenerate on macOS, run:

```sh
swift scripts/annotate-saving-videos.swift /path/to/iykyk_flutter/assets/onboarding/demos public/videos/onboarding
```

Matching JPEG posters include the hand and are extracted from 0.3 seconds of each guided recording.
The homepage offers Social posts and Camera roll previews, with a shared pause
control. Videos load on playback, play silently while visible, and pause when
hidden or offscreen. Reduced-motion users initially see posters and can choose
to play. Tutorials start paused and expose native playback and fullscreen controls.
The previous social-sharing GIF and gallery video are no longer used by these pages.

## Founder portraits

`public/images/team/founder-reference.png` is the user-supplied team reference.
The team cards display its original portrait regions using CSS clipping, with no
generative edits to either face. Roles, background details, and quotes are
transcribed from the same reference.

## Onboarding design references

The homepage draws on the Flutter app's onboarding in `iykyk_flutter`:
`onboarding_material.dart`, `onboarding_story_widgets.dart` and `app_theme.dart`.
It uses the same light Zurich map, white raised surfaces, charcoal pill buttons,
muted blue (#395a75), ink (#23252a), and Hanken Grotesk typography.

`public/images/onboarding/zurich-map.jpg` is a resized copy of the app's
`assets/icons/auth_bg_zurich_light.jpg`. The recommendation star, wishlist bookmark
and dislike illustration are resized copies from `assets/generated/`. The three
mood characters are from `assets/onboarding/vibe_personas/`. These are existing
app illustrations, with transparency preserved; no new images were generated.

## Typeface

Hanken Grotesk is self-hosted at `public/fonts/hanken-grotesk-variable.ttf`, copied
from the Flutter app's `assets/fonts/HankenGrotesk.ttf`. The SIL Open Font License
is included at `public/fonts/Hanken-Grotesk-OFL.txt`.

## Mobile presentation

The mobile hero puts both store badges directly below a short introduction,
followed by an unobstructed app screenshot. The mood controls and recommendation
card follow the screenshot rather than covering it. Short-phone spacing targets
at least half the app screen within the initial viewport; text containers remain
flexible for larger font sizes. Landscape phones use two columns. Product-story
screenshots and saving videos also use a larger share of their mobile frames.
