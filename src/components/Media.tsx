import type { ImageSlot } from '../data/media'
import { asset } from '../lib/url'
import styles from './Media.module.css'

interface Props {
  slot: ImageSlot
  /** Fill the parent instead of using the slot's aspect ratio */
  fill?: boolean
  /** Above-the-fold images load eagerly */
  priority?: boolean
  sizes?: string
  className?: string
}

/**
 * Renders a media slot: the real image once `src` is set, otherwise a clearly marked placeholder.
 * Real photos go in /public/media. Responsive .avif/.webp sizes get wired in when real media arrives.
 */
export default function Media({ slot, fill, priority, sizes = '100vw', className }: Props) {
  const cls = [styles.media, fill ? styles.fill : '', className].filter(Boolean).join(' ')
  const style = fill ? undefined : { aspectRatio: slot.aspect }

  if (!slot.src) {
    return (
      <div className={`${cls} ${styles.placeholder}`} style={style} role="img" aria-label={`Placeholder: ${slot.alt}`}>
        <span className={styles.tag}>Placeholder</span>
        <span className={styles.label}>{slot.label}</span>
      </div>
    )
  }

  return (
    <div className={cls} style={style}>
      <img
        src={asset(slot.src)}
        alt={slot.alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </div>
  )
}
