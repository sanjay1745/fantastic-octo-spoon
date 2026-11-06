import Button from '../components/Button'
import PlanCard from '../components/PlanCard'
import SectionHeader from '../components/SectionHeader'
import SmartLink from '../components/SmartLink'
import { formatPrice } from '../data/memberships'
import { primaryLocation as loc } from '../data/locations'
import { tourHref } from '../lib/cta'
import styles from './MembershipsPreview.module.css'

const punchCard = loc.passes.find((p) => p.purchase === 'online')

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
          <p className={styles.passesTitle}>Just visiting?</p>
          <ul role="list" className={styles.passList}>
            {loc.passes.map((p) => {
              const { amount } = formatPrice(p)
              return (
                <li key={p.id}>
                  <span className={styles.passName}>{p.name}</span>
                  <span className={styles.passPrice}>{amount}</span>
                  <span className={styles.passTerm}>{p.term}</span>
                </li>
              )
            })}
          </ul>
          <p className={styles.passNote}>
            Day passes are sold at the front desk.{' '}
            {punchCard?.buyUrl ? (
              <>
                Punch cards are sold at the club or{' '}
                <SmartLink href={punchCard.buyUrl} className={styles.passLink}>
                  online
                </SmartLink>
                .
              </>
            ) : (
              'Punch cards are sold at the club.'
            )}
          </p>
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
