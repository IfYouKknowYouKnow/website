// Illustrative people, distances and recommendations for the homepage hero cards.
// Place names are taken from the app screenshot shown in the hero.
import { msg } from './i18n.js'

export const HERO_MOOD_EXAMPLES = [
  {
    persona: '/images/onboarding/coffee-person.png',
    name: 'Ana', initial: 'A', source: msg('Your friend'),
    heading: msg('Ana recommends these spots near you.'), accent: '#dfff4f',
    places: [
      { name: 'Roots coffee', distance: '350 m', emoji: '☕' },
      { name: 'Café Henrici', distance: '600 m', emoji: '☕' },
    ],
  },
  {
    persona: '/images/onboarding/night-person.png',
    name: 'Maya', initial: 'M', source: msg('Local curator you follow'),
    heading: msg('Maya knows where your night should start.'), accent: '#ff88c5',
    places: [
      { name: 'ORA Bar Zürich', distance: '450 m', emoji: '🍸' },
      { name: 'Milchbar', distance: '800 m', emoji: '🍷' },
    ],
  },
  {
    persona: '/images/onboarding/dinner-person.png',
    name: 'Luca', initial: 'L', source: msg('Food curator you follow'),
    heading: msg('Luca’s dinner picks. Your next good plan.'), accent: '#b9dfff',
    places: [
      { name: 'Positano', distance: '400 m', emoji: '🍕' },
      { name: 'Sora Sushi', distance: '650 m', emoji: '🍣' },
    ],
  },
]
