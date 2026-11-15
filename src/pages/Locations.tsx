import Button from '../components/Button'
import Media from '../components/Media'
import PageHero from '../components/PageHero'
import { getFacility } from '../data/facilities'
import {
  formatAddressLines,
  formatHours,
  type Location,
  locations,
  mapsSearchUrl,
  openLocations,
  primaryLocation,
  telHref,
} from '../data/locations'
import { site } from '../data/site'
import { tourHref } from '../lib/cta'
import FinalCta from '../sections/FinalCta'
import styles from './Locations.module.css'

/** Where "Explore the gym" goes: the flagship has the full The Gym page; others get their own location page. */
const gymHref = (l: Location) => (l.slug === primaryLocation.slug ? '/the-gym' : `/locations/${l.slug}`)

function LocationCard({ location, index }: { location: Location; index: number }) {
  const [street, cityLine] = formatAddressLines(location)
  const open = location.status === 'open'
  const photo = getFacility(location.slug)?.gallery[0]
  const titleId = `location-${location.slug}`

  return (
    <li>
      <article className={styles.card} aria-labelledby={titleId} data-reveal style={{ ['--reveal-delay' as string]: `${index * 100}ms` }}>
        {photo && (
          <div className={styles.photo}>
            <Media slot={photo} fill sizes="(min-width: 900px) 45vw, 100vw" priority={index === 0} />
          </div>
        )}

        <div className={styles.body}>
          <p className={`${styles.status} ${open ? styles.open : ''}`}>{open ? 'Now open' : 'Coming soon'}</p>
          <h2 id={titleId} className="h2">
            {location.name}
          </h2>

          <dl className={styles.details}>
            <div>
              <dt>Address</dt>
              <dd>
                <address>
                  {street}
                  <br />
                  {cityLine}
                </address>
                {location.landmark && <p className={styles.note}>{location.landmark}.</p>}
              </dd>
            </div>
            {open && (
              <>
                <div>
                  <dt>Hours</dt>
                  <dd>
                    <ul role="list" className={styles.hours}>
                      {location.hours.map((h) => (
                        <li key={h.label}>
                          <span>{h.label}</span>
                          <span>{formatHours(h)}</span>
                        </li>
                      ))}
                    </ul>
                    {location.hoursNote && <p className={styles.note}>{location.hoursNote}</p>}
                  </dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd className={styles.contact}>
                    <a href={telHref(location.phone)}>{location.phone}</a>
                    <a href={`mailto:${location.email}`}>{location.email}</a>
                  </dd>
                </div>
              </>
            )}
          </dl>

          {open && (
            <div className={styles.actions}>
              <Button href={tourHref} variant="light" arrow>
                Book a free tour
              </Button>
              <Button href={gymHref(location)} variant="ghost">
                Explore the gym
              </Button>
              <Button href={mapsSearchUrl(location)} variant="ghost">
                Get directions
              </Button>
            </div>
          )}
        </div>
      </article>
    </li>
  )
}

const openNames = openLocations.map((l) => l.name).join(', ')

/** All locations, generated from src/data/locations.ts, plus the "open a Stoik Gym" contact band. */
export default function Locations() {
  return (
    <>
      <PageHero eyebrow="Locations" title="Find your gym." lead={`Now open in ${openNames}. More locations are coming.`} />

      <section className={`section ${styles.list}`} aria-label="Our locations">
        <div className="container">
          <ul role="list" className={styles.cards}>
            {locations.map((l, i) => (
              <LocationCard key={l.slug} location={l} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.ownerSection}`} aria-labelledby="open-a-gym-title">
        <div className="container">
          <div className={styles.band} data-reveal>
            <div>
              <h2 id="open-a-gym-title" className="h3">
                Interested in opening a {site.name}?
              </h2>
              <p className="muted">
                Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> to learn more.
              </p>
            </div>
            <Button href={`mailto:${site.email}?subject=${encodeURIComponent(`Opening a ${site.name}`)}`} variant="light" arrow>
              Email us
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
