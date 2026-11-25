// Languages for the marketing site. English lives at the root; the others are
// served under /de, /fr and /it with the same paths.
import { createContext, createElement, useContext, useMemo } from 'react'
import enGuides from './locales/guides.en.js'

export const LOCALES = ['en', 'de', 'fr', 'it']
export const DEFAULT_LOCALE = 'en'
export const LOCALE_NAMES = { en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano' }
export const OG_LOCALES = { en: 'en_US', de: 'de_DE', fr: 'fr_FR', it: 'it_IT' }
// Thousands separators. Written out rather than left to Intl, whose output for these
// languages differs between browsers and the build, which would break hydration.
// German follows Swiss conventions throughout (ss spelling, 33’408).
const THOUSANDS = { en: ',', de: '’', fr: '\u202f', it: '.' }

// ui: English source string → translation. guides: city guide copy (see locales/guides.en.js).
const bundles = { en: { ui: {}, guides: enGuides } }
const loaders = {
  de: () => import('./locales/de.js'),
  fr: () => import('./locales/fr.js'),
  it: () => import('./locales/it.js'),
}
const placeLoaders = {
  de: () => import('./locales/places.de.js'),
  fr: () => import('./locales/places.fr.js'),
  it: () => import('./locales/places.it.js'),
}

export async function loadLocale(locale) {
  if (!bundles[locale] && loaders[locale]) bundles[locale] = (await loaders[locale]()).default
  return bundles[locale] || bundles.en
}

// Translated place descriptions and tags, loaded only where a guide needs them.
export async function loadPlaceCopy(locale) {
  return placeLoaders[locale] ? (await placeLoaders[locale]()).default : null
}

export function localeFromPath(pathname = '/') {
  const segment = pathname.split('/')[1]
  return segment !== DEFAULT_LOCALE && LOCALES.includes(segment) ? segment : DEFAULT_LOCALE
}

export const localePrefix = (locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)

// Marks a string in a data constant for translation; tr() translates it where it is rendered.
export const msg = (text) => text

// Source strings that had no translation when a page was rendered, per language.
// The build reads this to fail on untranslated text.
export const missingTranslations = {}

export function createI18n(locale = DEFAULT_LOCALE) {
  const bundle = bundles[locale] || bundles.en
  const prefix = localePrefix(locale)
  const missing = (missingTranslations[locale] ||= new Set())
  function tr(key, vars) {
    let text = bundle.ui[key]
    if (text === undefined) {
      if (locale !== DEFAULT_LOCALE) missing.add(key)
      text = key
    }
    return vars ? text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? vars[name] : match)) : text
  }
  return {
    locale, prefix, tr, guides: bundle.guides,
    // For plain <a href> links; router <Link>s get the prefix from the router basename.
    href: (path) => `${prefix}${path}`,
    formatNumber: (value) => String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS[locale]),
  }
}

const I18nContext = createContext(createI18n())

export function I18nProvider({ locale, children }) {
  const value = useMemo(() => createI18n(locale), [locale])
  return createElement(I18nContext.Provider, { value }, children)
}

export const useI18n = () => useContext(I18nContext)
