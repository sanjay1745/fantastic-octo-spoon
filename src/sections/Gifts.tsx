import Button from '../components/Button'
import Media from '../components/Media'
import SectionHeader from '../components/SectionHeader'
import { media } from '../data/media'
import { gifts } from '../data/season'
import styles from './Gifts.module.css'

/** Seasonal gift ideas: the punch card and the apparel store. Shown on Home while a season is active. */
export default function Gifts() {
  const { punchCard, apparel } = gifts
  return (
    <section className={`section ${styles.gifts}`} aria-labelledby="gifts-title">
      <div className="container">
        <SectionHeader eyebrow="Gifts" id="gifts-title" title={gifts.title} lead={gifts.lead} />

        <div className={styles.grid}>
          <article className={styles.card} data-reveal>
            <div className={styles.ticket} aria-hidden="true">
              <span className={styles.ticketCount}>10</span>
              <span className={styles.ticketLabel}>visits</span>
              <span className={styles.punches}>
                {Array.from({ length: 10 }, (_, i) => (
                  <i key={i} />
                ))}
              </span>
            </div>
            <div className={styles.body}>
              <h3 className="h3">{punchCard.name}</h3>
              <p className={styles.price}>${punchCard.price}</p>
              <p className="muted">{punchCard.summary}</p>
              {punchCard.href && (
                <Button href={punchCard.href} variant="light" arrow>
                  Buy a punch card
                </Button>
              )}
            </div>
          </article>

          <article className={styles.card} data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <Media slot={media.apparel} className={styles.media} sizes="(min-width: 900px) 45vw, 100vw" />
            <div className={styles.body}>
              <h3 className="h3">{apparel.name}</h3>
              <p className="muted">{apparel.summary}</p>
              <Button href={apparel.href} variant="ghost" arrow>
                Shop apparel
              </Button>
            </div>
          </article>
        </div>

        <p className={styles.note}>{gifts.note}</p>
      </div>
    </section>
  )
}
