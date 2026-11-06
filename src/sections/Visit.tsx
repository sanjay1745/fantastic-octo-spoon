import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import {
  formatAddressLines,
  formatHours,
  type Location,
  mapsEmbedUrl,
  mapsSearchUrl,
  primaryLocation,
  telHref,
} from '../data/locations'
import { site } from '../data/site'
import { tourHref } from '../lib/cta'
import styles from './Visit.module.css'

export default function Visit({ location = primaryLocation }: { location?: Location }) {
  const [street, cityLine] = formatAddressLines(location)
  return (
    <section className="section" aria-labelledby="visit-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <SectionHeader eyebrow={`Visit · ${location.name}`} id="visit-title" title="Come see it for yourself." lead={location.landmark ? `${location.landmark}.` : undefined} />

            <dl className={styles.details} data-reveal>
              <div>
                <dt>Address</dt>
                <dd>
                  <address>
                    {street}
                    <br />
                    {cityLine}
                  </address>
                </dd>
              </div>
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
            </dl>

            <div className={styles.actions} data-reveal>
              <Button href={tourHref} variant="light" arrow>
                Book a free tour
              </Button>
              <Button href={mapsSearchUrl(location)} variant="ghost">
                Get directions
              </Button>
            </div>
          </div>

          <div className={styles.map} data-reveal="fade">
            <iframe
              title={`Map showing ${site.name} at ${street}, ${cityLine}`}
              src={mapsEmbedUrl(location)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
