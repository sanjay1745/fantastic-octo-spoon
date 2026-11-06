import type { CSSProperties, ReactNode } from 'react'
import type { ImageSlot } from '../data/media'
import Media from './Media'
import styles from './PhotoCard.module.css'
import SmartLink from './SmartLink'

interface Props {
  title: string
  blurb?: ReactNode
  image: ImageSlot
  href?: string
  className?: string
  style?: CSSProperties
  sizes?: string
  /** Heading level inside the card */
  as?: 'h3' | 'h4'
}

/** Rounded photo card with a label over a bottom gradient. Fades/blurs in on scroll. */
export default function PhotoCard({ title, blurb, image, href, className, style, sizes, as: H = 'h3' }: Props) {
  const body = (
    <>
      <Media slot={image} fill sizes={sizes} />
      <div className={styles.shade} />
      <div className={styles.label}>
        <div>
          <H className={styles.title}>{title}</H>
          {blurb && <p className={styles.blurb}>{blurb}</p>}
        </div>
        {href && (
          <span className={styles.arrow} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </>
  )

  const cls = [styles.card, href ? styles.linked : '', className].filter(Boolean).join(' ')
  return href ? (
    <SmartLink href={href} className={cls} style={style} data-reveal="">
      {body}
    </SmartLink>
  ) : (
    <article className={cls} style={style} data-reveal="">
      {body}
    </article>
  )
}
