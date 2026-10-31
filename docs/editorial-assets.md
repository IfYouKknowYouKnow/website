# Homepage editorial photographs

Locally stored venue photography supplies atmosphere in the hero and curator
sections, rather than representing a specific recommendation. City cards and
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

## Founder portraits

`public/images/team/founder-reference.png` is the user-supplied team reference.
The team cards display its original portrait regions using CSS clipping, with no
generative edits to either face. Roles, background details, and quotes are
transcribed from the same reference.

## Typeface

Space Grotesk is self-hosted as variable WOFF2 files (weights 400–700), with Latin
and extended Latin subsets from Google Fonts. Its SIL Open Font License is
included at `public/fonts/OFL.txt`. All page typography uses the same family.
