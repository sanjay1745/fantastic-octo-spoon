import type { ReactNode } from 'react'
import { Eyebrow } from './SectionHeader'
import styles from './PageHero.module.css'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}

/** Top-of-page header for inner pages. */
export default function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.inner} data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h1">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
