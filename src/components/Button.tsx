import type { ReactNode } from 'react'
import styles from './Button.module.css'
import SmartLink from './SmartLink'

interface Props {
  href: string
  children: ReactNode
  /** primary = red (Join Now only) · light = white · ghost = outline */
  variant?: 'primary' | 'light' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  className?: string
}

export default function Button({ href, children, variant = 'light', size = 'md', arrow, className }: Props) {
  return (
    <SmartLink href={href} className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}>
      <span>{children}</span>
      {arrow && (
        <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </SmartLink>
  )
}
