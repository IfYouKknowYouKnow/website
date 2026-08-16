import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import About from './pages/About'
import Landing from './pages/Landing'
import Privacy from './pages/Privacy'
import ShareLanding from './pages/ShareLanding'
import Tutorials from './pages/Tutorials'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/invite" element={<ShareLanding type="invite" />} />
        <Route path="/invite/:code" element={<ShareLanding type="invite" />} />
        <Route path="/place" element={<ShareLanding type="place" />} />
        <Route path="/place/:placeId" element={<ShareLanding type="place" />} />
        <Route path="/team" element={<Navigate to="/about" replace />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}
