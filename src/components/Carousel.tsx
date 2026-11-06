import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ImageSlot } from '../data/media'
import styles from './Carousel.module.css'
import Media from './Media'

interface Props {
  items: ImageSlot[]
  /** Accessible name for the carousel region */
  label: string
}

/**
 * Photo carousel: native horizontal scrolling with scroll-snap (swipe on phones,
 * trackpad/shift-scroll on desktop), plus previous/next buttons and arrow keys.
 * No autoplay. Works without JS as a plain scrollable row.
 */
export default function Carousel({ items, label }: Props) {
  const track = useRef<HTMLUListElement>(null)
  const [state, setState] = useState({ atStart: true, atEnd: false, index: 0 })
  const id = useId()

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : el.clientWidth
    setState({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      index: Math.min(items.length - 1, Math.round(el.scrollLeft / step)),
    })
  }, [items.length])

  useEffect(() => {
    const el = track.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    measure()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [measure])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className={styles.carousel} aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        id={id}
        role="list"
        className={styles.track}
        tabIndex={0}
        aria-label={`${label}, ${items.length} photos. Use arrow keys to scroll.`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            go(1)
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            go(-1)
          }
        }}
      >
        {items.map((item, i) => (
          <li key={item.src ?? i} className={styles.slide} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
            <Media slot={item} fill sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 80vw" />
          </li>
        ))}
      </ul>

      <div className="container">
        <div className={styles.controls}>
          <p className={styles.count} aria-hidden="true">
            <span>{String(state.index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
          </p>
          <div className={styles.progress} aria-hidden="true">
            <span style={{ transform: `scaleX(${(state.index + 1) / items.length})` }} />
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={() => go(-1)} disabled={state.atStart} aria-controls={id} aria-label="Previous photos">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} disabled={state.atEnd} aria-controls={id} aria-label="Next photos">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
