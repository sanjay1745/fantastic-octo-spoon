import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useHeadSync } from '../hooks/useHeadSync'
import { useRevealObserver } from '../hooks/useRevealObserver'
import Footer from './Footer'
import Nav from './Nav'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useHeadSync(pathname)
  useRevealObserver(pathname)

  // New page → start at the top (unless linking to an anchor)
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
