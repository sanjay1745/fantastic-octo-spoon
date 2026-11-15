import { Link } from 'react-router'
import { formatAddressLines, formatHours, mapsSearchUrl, openLocations, telHref } from '../data/locations'
import { site } from '../data/site'
import { joinHref, tourHref } from '../lib/cta'
import { navRoutes } from '../routes'
import Button from './Button'
import styles from './Footer.module.css'
import Logo from './Logo'
import SocialIcon from './SocialIcon'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo variant="emblem" className={styles.emblem} />
            <p className={styles.tagline}>{site.tagline}</p>
            <div className={styles.ctas}>
              <Button href={joinHref} variant="primary">
                Join Now
              </Button>
              <Button href={tourHref} variant="ghost">
                Book a free tour
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className={styles.col}>
            <h2 className={styles.heading}>Explore</h2>
            <ul role="list">
              {navRoutes.map((r) => (
                <li key={r.to}>
                  {r.external ? <a href={r.to}>{r.label}</a> : <Link to={r.to}>{r.label}</Link>}
                </li>
              ))}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {openLocations.map((l) => {
            const [street, cityLine] = formatAddressLines(l)
            return (
              <div key={l.slug} className={styles.col}>
                <h2 className={styles.heading}>{l.name}</h2>
                <address className={styles.address}>
                  <a href={mapsSearchUrl(l)} target="_blank" rel="noopener noreferrer">
                    {street}
                    <br />
                    {cityLine}
                    <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
                  </a>
                </address>
                <ul role="list" className={styles.hours}>
                  {l.hours.map((h) => (
                    <li key={h.label}>
                      <span>{h.label}</span> <span>{formatHours(h)}</span>
                    </li>
                  ))}
                </ul>
                {l.hoursNote && <p className={styles.note}>{l.hoursNote}</p>}
              </div>
            )
          })}

          <div className={styles.col}>
            <h2 className={styles.heading}>Contact</h2>
            <ul role="list">
              <li>
                <a href={telHref(openLocations[0].phone)}>{openLocations[0].phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
            <ul role="list" className={styles.socials}>
              {site.socials.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.social}>
                    <SocialIcon id={s.id} />
                    <span>
                      {s.label}
                      <span className="visually-hidden"> {s.handle} (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.name}. All rights reserved.{' '}
            <Link to="/privacy" className={styles.legal}>
              Privacy
            </Link>
          </p>
          <p>18+ gym · More locations coming soon</p>
        </div>
      </div>
    </footer>
  )
}
