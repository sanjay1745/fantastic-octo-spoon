import type { CSSProperties, ReactNode } from 'react'
import { formatPrice, type Plan } from '../data/memberships'
import Button from './Button'
import styles from './PlanCard.module.css'

interface Props {
  plan: Plan
  joinUrl: string
  style?: CSSProperties
  /** Optional highlight line, e.g. savings */
  extra?: ReactNode
}

export default function PlanCard({ plan, joinUrl, style, extra }: Props) {
  const { amount, per } = formatPrice(plan)
  return (
    <article className={`${styles.card} ${plan.featured ? styles.featured : ''}`} data-reveal style={style}>
      {plan.featured && <p className={styles.badge}>Best value</p>}
      <h3 className={styles.name}>{plan.name}</h3>
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
      <p className={styles.term}>{plan.term}</p>
      <p className={styles.summary}>{plan.summary}</p>
      {plan.fine && <p className={styles.fine}>{plan.fine}</p>}
      {extra && <p className={styles.extra}>{extra}</p>}
      {/* The CTA block is pinned to the bottom, so the perk line sits in the same spot on every card */}
      <div className={styles.cta}>
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
