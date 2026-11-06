import type { ReactNode } from 'react'
import styles from './SectionHeader.module.css'

interface Props {
  /** Small uppercase label above the heading. Never the brand name. */
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  /** Heading level; sections default to h2 */
  as?: 'h1' | 'h2'
  align?: 'start' | 'center'
  size?: 'h1' | 'h2' | 'display'
  id?: string
  actions?: ReactNode
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>
}

export default function SectionHeader({ eyebrow, title, lead, as: Tag = 'h2', align = 'start', size = 'h2', id, actions }: Props) {
  return (
    <header className={`${styles.header} ${align === 'center' ? styles.center : ''}`} data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag id={id} className={size}>
        {title}
      </Tag>
      {lead && <p className="lead">{lead}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  )
}
