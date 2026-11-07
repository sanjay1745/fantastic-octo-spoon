import Button from '../components/Button'
import Carousel from '../components/Carousel'
import Media from '../components/Media'
import SectionHeader, { Eyebrow } from '../components/SectionHeader'
import { getFacility, type Highlight } from '../data/facilities'
import { type Location, primaryLocation } from '../data/locations'
import { joinHref, tourHref } from '../lib/cta'
import { asset } from '../lib/url'
import FinalCta from '../sections/FinalCta'
import Hero from '../sections/Hero'
import Visit from '../sections/Visit'
import styles from './TheGym.module.css'

function HighlightRow({ h, index }: { h: Highlight; index: number }) {
  const flip = index % 2 === 1
  return (
    <section id={h.id} className={`${styles.row} ${flip ? styles.flip : ''}`} aria-labelledby={`${h.id}-title`}>
      <div className={`${styles.media} ${h.images.length > 1 ? styles.pair : ''}`} data-reveal>
        {h.images.map((img, i) => (
          <Media key={img.src ?? i} slot={img} className={styles.photo} sizes="(min-width: 900px) 45vw, 100vw" />
        ))}
      </div>
      <div className={styles.copy} data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        <Eyebrow>{h.eyebrow}</Eyebrow>
        <h2 id={`${h.id}-title`} className="h2">
          {h.title}
        </h2>
        {h.stat && (
          <p className={styles.stat}>
            <span className={styles.statValue}>{h.stat.value}</span>
            <span className={styles.statLabel}>{h.stat.label}</span>
          </p>
        )}
        {h.body.map((p) => (
          <p key={p} className="lead">
            {p}
          </p>
        ))}
        {h.tags && (
          <ul role="list" className={styles.tags}>
            {h.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {h.logo && (
          <img className={styles.logo} src={asset(h.logo.src)} alt={h.logo.alt} width={h.logo.width} height={h.logo.height} loading="lazy" decoding="async" />
        )}
        {h.link && (
          <Button href={h.link.href} variant="ghost" arrow>
            {h.link.label}
          </Button>
        )}
      </div>
    </section>
  )
}

export default function TheGym({ location = primaryLocation }: { location?: Location }) {
  const facility = getFacility(location.slug)
  const size = location.sizeSqFt ? `${location.sizeSqFt.toLocaleString('en-US')} sq ft` : null

  return (
    <>
      <Hero
        eyebrow={`The gym · ${location.name}, ${location.address.region}`}
        tour={facility?.tour3d?.enabled ? facility.tour3d : undefined}
        title="Built for serious training."
        lead={`${size ? `${size} of` : 'A floor of'} premium Skelcore equipment, a full recovery room and a private posing room.`}
        actions={
          <>
            <Button href={tourHref} variant="light" size="lg" arrow>
              Book a free tour
            </Button>
            <Button href={joinHref} variant="ghost" size="lg">
              Join Now
            </Button>
          </>
        }
      />

      {facility && (
        <>
          <section className={`section ${styles.floor}`} aria-labelledby="floor-title">
            <div className="container">
              <SectionHeader
                eyebrow="The floor"
                id="floor-title"
                title="Take a look around."
                lead={`Inside Stoik Gym ${location.name}. Swipe through the floor.`}
              />
            </div>
            <Carousel items={facility.gallery} label={`Photos of Stoik Gym ${location.name}`} />
          </section>

          <div className={`container ${styles.highlights}`}>
            {facility.highlights.map((h, i) => (
              <HighlightRow key={h.id} h={h} index={i} />
            ))}
          </div>
        </>
      )}

      <Visit location={location} />

      {facility && facility.rules.length > 0 && (
        <section id="rules" className={`section ${styles.rulesSection}`} aria-labelledby="rules-title">
          <div className={`container ${styles.rulesGrid}`}>
            <SectionHeader
              eyebrow="House rules"
              id="rules-title"
              title="Gym rules."
              lead="A few standards that keep Stoik Gym the best place to train."
            />
            <ol className={styles.rules}>
              {facility.rules.map((r, i) => (
                <li key={r.text} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 2) * 60}ms` }}>
                  <span className={styles.ruleNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>
                    {r.title && <strong>{r.title}: </strong>}
                    {r.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  )
}
