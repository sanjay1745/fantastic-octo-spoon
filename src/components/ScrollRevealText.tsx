import { useEffect, useRef } from 'react'
import styles from './ScrollRevealText.module.css'

interface Props {
  text: string
  /** Words to render in silver once lit (matched case-insensitively, punctuation ignored) */
  emphasis?: string[]
  className?: string
}

/**
 * Signature statement: words light up one by one as the paragraph scrolls through the viewport.
 * Without JS or with reduced motion, the full paragraph is simply shown lit.
 */
export default function ScrollRevealText({ text, emphasis = [], className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(/\s+/)
  const emph = new Set(emphasis.map((w) => w.toLowerCase()))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-word]'))
    el.setAttribute('data-animate', '')
    let lit = -1
    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Starts when the top reaches 85% of the viewport, completes when the bottom reaches 55%.
      const start = vh * 0.85
      const end = vh * 0.55
      const progress = (start - rect.top) / (start - end + rect.height)
      const next = Math.round(Math.min(1, Math.max(0, progress)) * spans.length)
      if (next === lit) return
      spans.forEach((s, i) => (i < next ? s.setAttribute('data-lit', '') : s.removeAttribute('data-lit')))
      lit = next
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      el.removeAttribute('data-animate')
    }
  }, [text])

  return (
    <p ref={ref} className={[styles.text, className].filter(Boolean).join(' ')}>
      {words.map((w, i) => (
        <span key={i}>
          <span data-word="" className={emph.has(w.toLowerCase().replace(/[^\w']/g, '')) ? styles.emph : undefined}>
            {w}
          </span>{' '}
        </span>
      ))}
    </p>
  )
}
