import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { loadLocale, localeFromPath } from './i18n'

const root = document.getElementById('root')
const locale = localeFromPath(window.location.pathname)

// The page's language copy must be in memory before React attaches to the
// exported HTML, otherwise the first render would not match it.
loadLocale(locale).then(() => {
  const app = (
    <React.StrictMode>
      <App locale={locale} />
    </React.StrictMode>
  )
  if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
  else ReactDOM.createRoot(root).render(app)
})
