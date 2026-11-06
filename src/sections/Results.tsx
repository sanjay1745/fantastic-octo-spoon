import Media from '../components/Media'
import SectionHeader from '../components/SectionHeader'
import { testimonials, transformations } from '../data/testimonials'
import styles from './Results.module.css'

export default function Results() {
  return (
    <section className={`section ${styles.results}`} aria-labelledby="results-title">
      <div className="container">
        <SectionHeader eyebrow="Results" id="results-title" title="The work shows." lead="Real members. Real coaching. Real change." />

        <ul role="list" className={styles.transformations}>
          {transformations.map((t, i) => (
            <li key={t.id} className={styles.transformation} data-reveal style={{ ['--reveal-delay' as string]: `${i * 120}ms` }}>
              <div className={styles.pair}>
                <figure>
                  <Media slot={t.before} sizes="(min-width: 900px) 22vw, 45vw" />
                  <figcaption>Before</figcaption>
                </figure>
                <figure>
                  <Media slot={t.after} sizes="(min-width: 900px) 22vw, 45vw" />
                  <figcaption>After</figcaption>
                </figure>
              </div>
              <p className={styles.tName}>
                {t.name}
                {t.placeholder && <span className={styles.ph}>Placeholder</span>}
              </p>
              <p className={styles.tDetail}>{t.detail}</p>
            </li>
          ))}
        </ul>

        <ul role="list" className={styles.quotes}>
          {testimonials.map((q, i) => (
            <li key={q.id} data-reveal style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
              <figure className={styles.quote}>
                {q.placeholder && <span className={styles.ph}>Placeholder</span>}
                <blockquote>
                  <p>“{q.quote}”</p>
                </blockquote>
                <figcaption>
                  <span className={styles.qName}>{q.name}</span>
                  <span className={styles.qDetail}>{q.detail}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
