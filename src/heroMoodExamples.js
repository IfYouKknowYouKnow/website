// Illustrative people, distances and recommendations for the homepage preview.
// Place names and map coordinates are taken from the existing app screenshot.
import { msg } from './i18n.js'

export const HERO_MOOD_EXAMPLES = [
  {
    label: msg('Coffee'), persona: '/images/onboarding/coffee-person.png', image: 'cafe', photoAlt: msg('A café with leafy plants and a sunny window.'),
    caption: msg('Your new regular.'), name: 'Ana', initial: 'A', source: msg('Your friend'),
    heading: msg('Ana recommends these spots near you.'), accent: '#dfff4f',
    places: [
      { name: 'Roots coffee', distance: '350 m', emoji: '☕', x: 14.7, y: 26.7, reason: msg('A flat white, a window seat, and no reason to rush.') },
      { name: 'Café Henrici', distance: '600 m', emoji: '☕', x: 64.2, y: 50.5, reason: msg('The spot for a long catch-up over a second coffee.') },
    ],
  },
  {
    label: msg('After dark'), persona: '/images/onboarding/night-person.png', image: 'bar', photoAlt: msg('An inviting bar with warm lamps.'),
    caption: msg('One more round?'), name: 'Maya', initial: 'M', source: msg('Local curator you follow'),
    heading: msg('Maya knows where your night should start.'), accent: '#ff88c5',
    places: [
      { name: 'ORA Bar Zürich', distance: '450 m', emoji: '🍸', x: 74.1, y: 27.9, reason: msg('A cosy corner and a proper cocktail. Bring your favourite person.') },
      { name: 'Milchbar', distance: '800 m', emoji: '🍷', x: 30.2, y: 75.2, reason: msg('For the after-work drink that turns into the whole evening.') },
    ],
  },
  {
    label: msg('Dinner'), persona: '/images/onboarding/dinner-person.png', image: 'restaurant', photoAlt: msg('A restaurant ready for your next dinner plan.'),
    caption: msg('Dinner is sorted.'), name: 'Luca', initial: 'L', source: msg('Food curator you follow'),
    heading: msg('Luca’s dinner picks. Your next good plan.'), accent: '#b9dfff',
    places: [
      { name: 'Positano', distance: '400 m', emoji: '🍕', x: 66.3, y: 18.5, reason: msg('Pizza in the middle of the table. No overthinking required.') },
      { name: 'Sora Sushi', distance: '650 m', emoji: '🍣', x: 25.5, y: 13.1, reason: msg('A little sushi, good company, and the start of a great night.') },
    ],
  },
]
