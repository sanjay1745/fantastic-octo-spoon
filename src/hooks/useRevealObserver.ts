import { useEffect } from 'react'

/**
 * Watches every [data-reveal] element on the page and sets [data-revealed] once it scrolls into view.
 * The hidden → visible styles live in base.css and only apply with JS + motion allowed.
 * Re-runs when `key` changes (pass the pathname) to pick up new page content.
 */
export function useRevealObserver(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-revealed', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revealed', '')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
