import { msg } from './i18n.js'

// Single source for founder details: the About page, the founder profile
// pages and the structured data all read from here.
export const TEAM = [
  {
    slug: 'marie-louise-dugua',
    name: 'Marie-Louise Dugua',
    firstName: 'Marie-Louise',
    role: msg('Co-founder'),
    focus: msg('Product, AI and engineering'),
    leads: msg('product, AI and engineering'),
    portraitX: 43,
    accent: '#ff88c5',
    background: [
      msg('MSc Computer Science, ETH Zurich'),
      msg('Researcher, Agentic Systems Lab, ETH'),
      msg('Student Project House and J-Floor Zurich'),
      msg('Co-founder, LupAi LLC'),
    ],
    alumniOf: ['ETH Zurich'],
    quote: msg('If a place has a queue, I don’t go. Hidden gems only.'),
    linkedin: 'https://www.linkedin.com/in/marie-louise-dugua-aa6956186',
  },
  {
    slug: 'fabio-baldini',
    name: 'Fabio Baldini',
    firstName: 'Fabio',
    role: msg('Co-founder'),
    focus: msg('Business, partnerships and finance'),
    leads: msg('business, partnerships and finance'),
    portraitX: 822,
    accent: '#dfff4f',
    background: [
      msg('MSc Finance, Bocconi'),
      msg('MAS AI and Digital Technology, ETH'),
      msg('Co-founder, LupAi LLC'),
    ],
    alumniOf: ['Bocconi University', 'ETH Zurich'],
    quote: msg('I book the restaurants before I book the flights.'),
    linkedin: 'https://www.linkedin.com/in/fabio-baldini-16937422/',
  },
]

export const founderPath = (person) => `/founders/${person.slug}/`
export const findFounder = (slug) => TEAM.find((person) => person.slug === slug)
