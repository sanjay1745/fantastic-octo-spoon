import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { formatAddressLines, formatHours, primaryLocation, telHref } from '../data/locations'
import { site } from '../data/site'
import { joinHref, tourHref } from '../lib/cta'
import { navRoutes } from '../routes'
import Button from './Button'
import Logo from './Logo'
import styles from './Nav.module.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const menuId = useId()

  // Close the menu on navigation (adjusting state during render, per React docs)
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const [street, cityLine] = formatAddressLines(primaryLocation)

  return (
    <header className={styles.nav} data-scrolled={scrolled || open ? '' : undefined}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand} aria-label={`${site.name} home`}>
          <Logo variant="wordmark" label={false} className={styles.wordmark} />
        </Link>

        <nav aria-label="Primary" className={styles.links}>
          <ul role="list">
            {navRoutes.map((r) => (
              <li key={r.to}>
                <NavLink to={r.to} className={styles.link}>
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={tourHref} variant="ghost" size="sm" className={styles.tour}>
            Book a free tour
          </Button>
          <Button href={joinHref} variant="primary" size="sm">
            Join Now
          </Button>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={styles.burger} data-open={open ? '' : undefined} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id={menuId} className={styles.menu} data-open={open ? '' : undefined} hidden={!open}>
        <nav aria-label="Mobile">
          <ul role="list" className={styles.menuLinks}>
            <li>
              <NavLink to="/" end className={styles.menuLink}>
                Home
              </NavLink>
            </li>
            {navRoutes.map((r) => (
              <li key={r.to}>
                <NavLink to={r.to} className={styles.menuLink}>
                  {r.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/contact" className={styles.menuLink}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.menuFooter}>
          <Button href={tourHref} variant="light" size="lg">
            Book a free tour
          </Button>
          <div className={styles.menuInfo}>
            <p>
              {street}
              <br />
              {cityLine}
            </p>
            <p>
              {primaryLocation.hours.map((h) => (
                <span key={h.label} className={styles.menuHours}>
                  {h.label} · {formatHours(h)}
                </span>
              ))}
            </p>
            <p>
              <a href={telHref(primaryLocation.phone)}>{primaryLocation.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
