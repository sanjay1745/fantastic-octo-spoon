import type { ReactNode } from 'react'
import { Eyebrow } from './SectionHeader'
import styles from './PageHero.module.css'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  /** Rendered above the eyebrow, e.g. a sub-brand logo */
  top?: ReactNode
}

/** Top-of-page header for inner pages. */
export default function PageHero({ eyebrow, title, lead, children, top }: Props) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.inner} data-reveal>
          {top && <div className={styles.top}>{top}</div>}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h1">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
