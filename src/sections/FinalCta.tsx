import Button from '../components/Button'
import Media from '../components/Media'
import { Eyebrow } from '../components/SectionHeader'
import { media, type ImageSlot } from '../data/media'
import { joinHref, tourHref } from '../lib/cta'
import styles from './FinalCta.module.css'

interface Props {
  eyebrow?: string
  title?: string
  lead?: string
  primary?: { href: string; label: string }
  /** Show the red Join Now button next to the primary CTA */
  join?: boolean
  image?: ImageSlot
}

/** Full-bleed closing call to action. Defaults are the home page's free-tour pitch. */
export default function FinalCta({
  eyebrow = 'Start here',
  title = 'Start with a free tour.',
  lead = 'See the floor, meet the coaches, ask anything. Then decide.',
  primary = { href: tourHref, label: 'Book a free tour' },
  join = true,
  image = media.finalCta,
}: Props) {
  return (
    <section className={styles.cta} aria-labelledby="final-cta-title">
      <div className={styles.frame} data-reveal="fade">
        <Media slot={image} fill sizes="100vw" />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="final-cta-title" className="display">
            {title}
          </h2>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.actions}>
            <Button href={primary.href} variant="light" size="lg" arrow>
              {primary.label}
            </Button>
            {join && (
              <Button href={joinHref} variant="primary" size="lg">
                Join Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
