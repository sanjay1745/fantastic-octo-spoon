import { useEffect, useId, useRef } from 'react'
import { useLocation } from 'react-router'
import { season } from '../data/season'
import { track } from '../lib/analytics'
import Bow from './Bow'
import Button from './Button'
import styles from './PromoPopup.module.css'

/** Pages where the popup never opens on its own */
const QUIET_PATHS = ['/privacy']
/** Open after this long on the site, or once the visitor scrolls past most of the first screen */
const DELAY_MS = 6000
const SCROLL_TRIGGER = 0.6

const storageKey = (id: string) => `stoik:promo-popup:${id}`

function seen(id: string) {
  try {
    return window.localStorage.getItem(storageKey(id)) !== null
  } catch {
    return false
  }
}
function markSeen(id: string) {
  try {
    window.localStorage.setItem(storageKey(id), new Date().toISOString())
  } catch {
    // Storage blocked (private mode etc.): the popup may show again next visit, which is fine
  }
}

/**
 * Seasonal promo popup (content in src/data/season.ts → popup).
 * Shows once per visitor per season, a few seconds in (never on first paint), as a native modal
 * <dialog>: focus is trapped, Escape closes it, and a click outside the panel closes it.
 */
export default function PromoPopup() {
  const popup = season?.popup
  const id = season?.id
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const { pathname } = useLocation()
  const quiet = QUIET_PATHS.some((p) => pathname.startsWith(p))

  useEffect(() => {
    if (!popup || !id || quiet || seen(id)) return
    let done = false
    const open = () => {
      const d = ref.current
      // Don't stack on another dialog or the open mobile menu
      if (done || !d || d.open || document.querySelector('dialog[open]') || document.documentElement.style.overflow === 'hidden') return
      done = true
      cleanup()
      d.showModal()
      markSeen(id)
      track('promo_popup_view', { season: id, page_path: window.location.pathname })
    }
    const onScroll = () => window.scrollY > window.innerHeight * SCROLL_TRIGGER && open()
    const timer = window.setTimeout(open, DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    function cleanup() {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
    return cleanup
  }, [popup, id, quiet])

  if (!popup || !id) return null

  const close = () => ref.current?.close()

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      data-promo-popup={id}
      // A click on the dialog element itself (the backdrop area, outside the panel) closes it
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {/* Outside the panel so the panel's scroll area doesn't clip it */}
      <Bow className={styles.bow} />
      <div className={styles.panel}>
        <button type="button" className={styles.close} onClick={close} aria-label="Close">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <p className={styles.eyebrow}>{popup.eyebrow}</p>
        <h2 id={titleId} className={styles.title}>
          {popup.title}
        </h2>

        <ul role="list" className={styles.offers}>
          {popup.offers.map((o) => (
            <li key={o.lead}>
              <strong className={styles.lead}>{o.lead}</strong>
              <span className={styles.detail}>{o.detail}</span>
            </li>
          ))}
        </ul>

        {/* Any CTA closes the popup (an internal link changes the page underneath it) */}
        <div className={styles.actions} onClick={close}>
          <Button href={popup.primary.href} variant="primary" size="lg" arrow>
            {popup.primary.label}
          </Button>
          <Button href={popup.secondary.href} variant="ghost" size="lg">
            {popup.secondary.label}
          </Button>
        </div>
        {popup.fine && <p className={styles.fine}>{popup.fine}</p>}
      </div>
    </dialog>
  )
}
