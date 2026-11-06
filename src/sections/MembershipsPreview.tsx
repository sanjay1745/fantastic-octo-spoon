import Button from '../components/Button'
import PlanCard from '../components/PlanCard'
import SectionHeader from '../components/SectionHeader'
import { formatPrice, punchCardSavings } from '../data/memberships'
import { primaryLocation as loc } from '../data/locations'
import { tourHref } from '../lib/cta'
import styles from './MembershipsPreview.module.css'

/** The pass we steer visitors toward (punch card), and the rest (day pass). */
const lead = loc.passes.find((p) => p.featured) ?? loc.passes[0]
const others = loc.passes.filter((p) => p !== lead)
const savings = punchCardSavings(loc.passes)

export default function MembershipsPreview() {
  return (
    <section className="section" aria-labelledby="memberships-title">
      <div className="container">
        <SectionHeader
          eyebrow="Memberships"
          id="memberships-title"
          title="Choose how you commit."
          lead="Every plan is full access. The whole floor and the recovery room, whichever plan you choose."
        />

        <div className={styles.plans}>
          {loc.plans.map((p, i) => (
            <PlanCard key={p.id} plan={p} joinUrl={loc.joinUrl} style={{ ['--reveal-delay' as string]: `${i * 80}ms` }} />
          ))}
        </div>

        <div className={styles.passes} data-reveal>
          <h3 className={styles.passesTitle}>Just visiting?</h3>

          <div className={styles.lead}>
            <div className={styles.leadInfo}>
              <p className={styles.leadName}>{lead.name}</p>
              <p className={styles.leadTerm}>{lead.term}</p>
              {savings && lead.id === 'punch-card' && <p className={styles.savings}>{savings}</p>}
            </div>
            <p className={styles.leadPrice}>{formatPrice(lead).amount}</p>
            <div className={styles.leadBuy}>
              {lead.purchase === 'online' && lead.buyUrl ? (
                <>
                  <Button href={lead.buyUrl} variant="light">
                    Buy a punch card
                  </Button>
                  <p className={styles.buyNote}>Or buy at the front desk</p>
                </>
              ) : (
                <p className={styles.buyNote}>Available at the front desk</p>
              )}
            </div>
          </div>

          {others.map((p) => (
            <div key={p.id} className={styles.other}>
              <p>
                <span className={styles.otherName}>{p.name}</span>{' '}
                <span className={styles.otherPrice}>{formatPrice(p).amount}</span>
              </p>
              <p className={styles.otherTerm}>
                {p.term}
                {p.purchase === 'in-person' && ' · front desk only'}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button href="/memberships" variant="ghost" arrow>
            Compare memberships
          </Button>
          <Button href={tourHref} variant="light">
            Book a free tour
          </Button>
        </div>
      </div>
    </section>
  )
}
