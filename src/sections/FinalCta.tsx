import Button from '../components/Button'
import Media from '../components/Media'
import { Eyebrow } from '../components/SectionHeader'
import { media } from '../data/media'
import { joinHref, tourHref } from '../lib/cta'
import styles from './FinalCta.module.css'

export default function FinalCta() {
  return (
    <section className={styles.cta} aria-labelledby="final-cta-title">
      <div className={styles.frame} data-reveal="fade">
        <Media slot={media.finalCta} fill sizes="100vw" />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <Eyebrow>Start here</Eyebrow>
          <h2 id="final-cta-title" className="display">
            Start with a free tour.
          </h2>
          <p className={styles.lead}>See the floor, meet the coaches, ask anything. Then decide.</p>
          <div className={styles.actions}>
            <Button href={tourHref} variant="light" size="lg" arrow>
              Book a free tour
            </Button>
            <Button href={joinHref} variant="primary" size="lg">
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
