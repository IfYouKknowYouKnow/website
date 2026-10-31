// Illustrative people, distances and recommendations for the homepage preview.
// Place names and map coordinates are taken from the existing app screenshot.
export const HERO_MOOD_EXAMPLES = [
  {
    label: '☕ Coffee run', image: 'cafe', photoAlt: 'A café with leafy plants and a sunny window.',
    caption: 'Your new regular.', name: 'Ana', initial: 'A', source: 'Your friend',
    heading: 'Ana recommends these spots near you.', accent: '#dfff4f',
    places: [
      { name: 'Roots coffee', distance: '350 m', emoji: '☕', x: 14.7, y: 26.7, reason: 'A flat white, a window seat, and no reason to rush.' },
      { name: 'Café Henrici', distance: '600 m', emoji: '☕', x: 64.2, y: 50.5, reason: 'The spot for a long catch-up over a second coffee.' },
    ],
  },
  {
    label: '🍸 After dark', image: 'bar', photoAlt: 'An inviting bar with warm lamps.',
    caption: 'One more round?', name: 'Maya', initial: 'M', source: 'Local curator you follow',
    heading: 'Maya knows where your night should start.', accent: '#ff88c5',
    places: [
      { name: 'ORA Bar Zürich', distance: '450 m', emoji: '🍸', x: 74.1, y: 27.9, reason: 'A cosy corner and a proper cocktail. Bring your favourite person.' },
      { name: 'Milchbar', distance: '800 m', emoji: '🍷', x: 30.2, y: 75.2, reason: 'For the after-work drink that turns into the whole evening.' },
    ],
  },
  {
    label: '🍝 Dinner plans', image: 'restaurant', photoAlt: 'A restaurant ready for your next dinner plan.',
    caption: 'Dinner is sorted.', name: 'Luca', initial: 'L', source: 'Food curator you follow',
    heading: 'Luca’s dinner picks. Your next good plan.', accent: '#b9dfff',
    places: [
      { name: 'Positano', distance: '400 m', emoji: '🍕', x: 66.3, y: 18.5, reason: 'Pizza in the middle of the table. No overthinking required.' },
      { name: 'Sora Sushi', distance: '650 m', emoji: '🍣', x: 25.5, y: 13.1, reason: 'A little sushi, good company, and the start of a great night.' },
    ],
  },
]
