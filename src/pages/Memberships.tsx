import Button from '../components/Button'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import PlanCard from '../components/PlanCard'
import SectionHeader from '../components/SectionHeader'
import { faqsFor } from '../data/faq'
import { type Location, primaryLocation } from '../data/locations'
import { joinHref, tourHref } from '../lib/cta'
import FinalCta from '../sections/FinalCta'
import styles from './Memberships.module.css'

/** Savings line for the punch card, derived from the day pass price. */
function punchCardSavings(loc: Location): string | undefined {
  const day = loc.passes.find((p) => p.id === 'day-pass')
  const card = loc.passes.find((p) => p.id === 'punch-card')
  if (!day || !card?.visits) return undefined
  const visits = card.visits
  const perVisit = card.price / visits
  const saved = day.price * visits - card.price
  return `$${perVisit % 1 ? perVisit.toFixed(2) : perVisit} per visit · save $${saved} vs. day passes`
}

export default function Memberships() {
  const loc = primaryLocation
  const delay = (i: number) => ({ ['--reveal-delay' as string]: `${i * 80}ms` })

  return (
    <>
      <PageHero
        eyebrow={`Memberships · ${loc.name}`}
        title="Choose how you commit."
        lead="Every plan and every price, laid out plainly. Join online in a few minutes, or come see the gym first."
      >
        <div className={styles.heroActions}>
          <Button href={joinHref} variant="primary" size="lg">
            Join Now
          </Button>
          <Button href={tourHref} variant="ghost" size="lg" arrow>
            Book a free tour
          </Button>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="plans-title">
        <div className="container">
          <SectionHeader eyebrow="Monthly" id="plans-title" title="Memberships." />
          <div className={styles.plans}>
            {loc.plans.map((p, i) => (
              <PlanCard key={p.id} plan={p} joinUrl={loc.joinUrl} style={delay(i)} />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.passesSection}`} aria-labelledby="passes-title">
        <div className="container">
          <SectionHeader
            eyebrow="Drop in"
            id="passes-title"
            title="Day passes & punch cards."
            lead="Visiting, or not ready for a membership? Day passes are sold at the front desk. Punch cards are sold online or at the club."
          />
          <div className={styles.passes}>
            {loc.passes.map((p, i) => (
              <PlanCard
                key={p.id}
                plan={p}
                joinUrl={loc.joinUrl}
                style={delay(i)}
                extra={p.id === 'punch-card' ? punchCardSavings(loc) : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="coach-cta-title">
        <div className="container">
          <div className={styles.band} data-reveal>
            <div>
              <h2 id="coach-cta-title" className="h3">
                Want a coach in your corner?
              </h2>
              <p className="muted">Personal training, online coaching and group training with Team Stoik.</p>
            </div>
            <Button href="/coaching" variant="light" arrow>
              Explore coaching
            </Button>
          </div>
        </div>
      </section>

      <section className={`section ${styles.faq}`} aria-labelledby="membership-faq-title">
        <div className={`container ${styles.faqGrid}`}>
          <SectionHeader eyebrow="FAQ" id="membership-faq-title" title="Before you join." />
          <FaqList items={faqsFor('memberships')} />
        </div>
      </section>

      <FinalCta />
    </>
  )
}
