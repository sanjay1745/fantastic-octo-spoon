import Button from '../components/Button'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import TestimonialCard from '../components/TestimonialCard'
import { aboutMedia } from '../data/about'
import { primaryLocation as loc } from '../data/locations'
import { testimonials } from '../data/testimonials'
import { consultHref, tourHref } from '../lib/cta'
import FinalCta from '../sections/FinalCta'
import GoogleReviews from '../sections/GoogleReviews'
import styles from './Reviews.module.css'

/** Google's "write a review" form for the location (opens straight to the star rating). */
const writeReviewUrl = loc.googlePlaceId ? `https://search.google.com/local/writereview?placeid=${loc.googlePlaceId}` : null

const delay = (i: number) => ({ ['--reveal-delay' as string]: `${i * 120}ms` })

/** Reviews: live Google reviews plus every coaching client story, in one place. */
export default function Reviews() {
  return (
    <>
      <PageHero
        image={aboutMedia.community}
        eyebrow="Reviews"
        title="What our members are saying."
        lead="Straight from the people who train here: Google reviews from members, and stories from our coaching clients."
      >
        <div className={styles.heroActions}>
          <Button href={tourHref} variant="light" size="lg" arrow>
            Book a free tour
          </Button>
          {writeReviewUrl && (
            <Button href={writeReviewUrl} variant="ghost" size="lg">
              Leave us a review
            </Button>
          )}
        </div>
      </PageHero>

      <GoogleReviews eyebrow="Google reviews" title="From the gym floor." />

      <section id="stories" className={`section ${styles.stories}`} aria-labelledby="stories-title">
        <div className="container">
          <SectionHeader
            eyebrow="Coaching results"
            id="stories-title"
            title="In their words."
            lead="Team Stoik coaching clients on what changed, in the gym and out of it."
          />
          <ul role="list" className={styles.grid}>
            {testimonials.map((t, i) => (
              <li key={t.id} data-reveal style={delay(i % 3)}>
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
          <div className={styles.cta}>
            <Button href={consultHref} variant="ghost" arrow>
              Book a free coaching consultation
            </Button>
          </div>
        </div>
      </section>

      <FinalCta title="See it for yourself." lead="Tour the floor, meet the coaches, and talk to the members. Then decide." />
    </>
  )
}
