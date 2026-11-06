import { stats } from '../data/stats'
import styles from './Stats.module.css'

export default function Stats() {
  return (
    <section className={styles.stats} aria-label="Stoik Gym by the numbers">
      <div className="container">
        <dl className={styles.grid}>
          {stats.map((s, i) => (
            <div key={s.label} className={styles.stat} data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
              <dt className={styles.label}>{s.label}</dt>
              <dd className={styles.value}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
