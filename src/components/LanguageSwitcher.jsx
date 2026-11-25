import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { LOCALES, LOCALE_NAMES, localePrefix, useI18n } from '../i18n'
import styles from './LanguageSwitcher.module.css'

// Links to this page in each language. They are ordinary links, not router links:
// every language is its own exported page with its own copy.
export default function LanguageSwitcher({ className = '' }) {
  const { locale, tr } = useI18n()
  const { pathname } = useLocation()
  return <span className={`${styles.switcher} ${className}`} role="group" aria-label={tr('Language')}>
    {LOCALES.map((code, index) => <Fragment key={code}>
      {index > 0 && <span aria-hidden="true"> / </span>}
      <a href={`${localePrefix(code)}${pathname}`} hrefLang={code} lang={code} title={LOCALE_NAMES[code]}
        aria-current={code === locale ? 'true' : undefined}>{code.toUpperCase()}</a>
    </Fragment>)}
  </span>
}
