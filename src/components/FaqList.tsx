import type { Faq } from '../data/faq'
import styles from './FaqList.module.css'

/** Accessible accordion built on native <details>/<summary>. No JS required. */
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className={styles.list}>
      {items.map((f) => (
        <details key={f.id} className={styles.item} data-reveal>
          <summary className={styles.q}>
            <span>{f.q}</span>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <div className={styles.a}>
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
