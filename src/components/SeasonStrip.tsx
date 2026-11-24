import type { Season } from '../data/season'
import SmartLink from './SmartLink'
import styles from './SeasonStrip.module.css'

/** Slim seasonal promo line above the nav pill; the whole strip is one link. Collapses once the page scrolls. */
export default function SeasonStrip({ season }: { season: Season }) {
  return (
    <div className={styles.strip} data-season={season.id}>
      <SmartLink href={season.strip.cta.href} className={styles.inner}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.text}>
          <span className={styles.long}>{season.strip.text}</span>
          <span className={styles.short}>{season.strip.short}</span>
        </span>
        <span className={styles.cta}>
          <span className={styles.ctaLabel}>{season.strip.cta.label}</span>
          <span aria-hidden="true"> →</span>
        </span>
      </SmartLink>
    </div>
  )
}
