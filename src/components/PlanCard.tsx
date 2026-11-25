import type { CSSProperties, ReactNode } from 'react'
import { enrollmentFee, formatPrice, type Plan } from '../data/memberships'
import { season, seasonalPass } from '../data/season'
import Button from './Button'
import styles from './PlanCard.module.css'

interface Props {
  plan: Plan
  joinUrl: string
  style?: CSSProperties
  /** Optional highlight line, e.g. savings */
  extra?: ReactNode
}

export default function PlanCard({ plan: basePlan, joinUrl, style, extra }: Props) {
  // Seasonal pass price (e.g. Black Friday punch card): normal price shows struck through
  const plan = seasonalPass(basePlan)
  const passPromo = plan !== basePlan
  const { amount, per } = formatPrice(plan)
  // Seasonal membership offer (season.ts): applies to join plans only, not passes
  const promo = plan.purchase === 'join' ? season?.promo : undefined
  const firstMonth = promo?.firstMonth?.planId === plan.id ? promo.firstMonth.price : undefined
  const classes = [styles.card, plan.featured && styles.featured, firstMonth !== undefined && styles.promoCard, passPromo && styles.passPromo]
  return (
    <article className={classes.filter(Boolean).join(' ')} data-reveal style={style}>
      {plan.featured && <p className={styles.badge}>{((plan.purchase === 'join' || passPromo) && season?.planBadge) || 'Best value'}</p>}
      <h3 className={styles.name}>{plan.name}</h3>
      {firstMonth !== undefined ? (
        <>
          <p className={styles.price}>
            <span className={styles.amount}>${firstMonth}</span>
            <span className={styles.per}>first month</span>
          </p>
          <p className={styles.then}>
            Then {amount}
            {per}
            {plan.wasPrice !== undefined && (
              <>
                {' '}
                <s className={styles.wasInline}>
                  <span className="visually-hidden">, normally </span>${plan.wasPrice}
                  {per}
                </s>
              </>
            )}
          </p>
        </>
      ) : (
        <p className={`${styles.price} ${plan.wasPrice !== undefined ? styles.hasWas : ''}`}>
          {plan.wasPrice !== undefined && (
            <s className={styles.was}>
              <span className="visually-hidden">Was </span>${plan.wasPrice}
              {per}
              <span className="visually-hidden">, now</span>
            </s>
          )}
          <span className={styles.amount}>{amount}</span>
          {per && <span className={styles.per}>{per}</span>}
        </p>
      )}
      <p className={styles.term}>{plan.term}</p>
      <p className={styles.summary}>{plan.summary}</p>
      {plan.fine && <p className={styles.fine}>{plan.fine}</p>}
      {extra && <p className={styles.extra}>{extra}</p>}
      {/* The CTA block is pinned to the bottom, so the perk line sits in the same spot on every card */}
      <div className={styles.cta}>
        {promo && (
          <p className={styles.enroll}>
            <strong>${promo.enrollment} enrollment</strong>{' '}
            <s>
              <span className="visually-hidden">normally </span>${enrollmentFee}
            </s>
          </p>
        )}
        {plan.perk && <p className={styles.perk}>{plan.perk}</p>}
        {plan.purchase === 'join' ? (
          <Button href={joinUrl} variant={plan.featured ? 'primary' : 'light'}>
            Join Now
          </Button>
        ) : plan.purchase === 'online' && plan.buyUrl ? (
          <>
            <Button href={plan.buyUrl} variant="light">
              Buy online
            </Button>
            <p className={styles.inPerson}>Or buy at the front desk</p>
          </>
        ) : (
          <p className={styles.inPerson}>Available at the front desk</p>
        )}
      </div>
    </article>
  )
}
