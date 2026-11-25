import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import About from './pages/About'
import Landing from './pages/Landing'
import Privacy from './pages/Privacy'
import ShareLanding from './pages/ShareLanding'
import Tutorials from './pages/Tutorials'
import CityGuide from './pages/CityGuide'
import Founder from './pages/Founder'
import { I18nProvider, localePrefix } from './i18n'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// English is served from the root. Other languages use the same routes under
// /de, /fr or /it: the router basename adds the prefix to every route and link.
export default function App({ locale = 'en' }) {
  return (
    <I18nProvider locale={locale}>
      <BrowserRouter basename={localePrefix(locale) || '/'}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/invite" element={<ShareLanding type="invite" />} />
          <Route path="/invite/:code" element={<ShareLanding type="invite" />} />
          <Route path="/place" element={<ShareLanding type="place" />} />
          <Route path="/place/:placeId" element={<ShareLanding type="place" />} />
          <Route path="/team" element={<Navigate to="/about#team" replace />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/founders/:founderSlug" element={<Founder />} />
          <Route path="/:citySlug/:topicSlug" element={<CityGuide />} />
          <Route path="/:citySlug" element={<CityGuide />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}
