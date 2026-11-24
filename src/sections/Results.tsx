import SectionHeader from '../components/SectionHeader'
import SmartLink from '../components/SmartLink'
import TestimonialCard from '../components/TestimonialCard'
import { featuredTestimonials, testimonials } from '../data/testimonials'
import styles from './Results.module.css'

/** Home page social proof: featured coaching client stories, linking to the rest on the Coaching page. */
export default function Results() {
  const more = testimonials.length - featuredTestimonials.length
  return (
    <section className={`section ${styles.results}`} aria-labelledby="results-title">
      <div className="container">
        <SectionHeader eyebrow="Results" id="results-title" title="The work shows." lead="Real members. Real coaching. Real change." />

        <ul role="list" className={styles.quotes}>
          {featuredTestimonials.map((t, i) => (
            <li key={t.id} data-reveal style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
              <TestimonialCard t={t} />
            </li>
          ))}
        </ul>

        {more > 0 && (
          <SmartLink href="/reviews#stories" className={styles.moreLink}>
            Read {more} more client stories
          </SmartLink>
        )}
      </div>
    </section>
  )
}
