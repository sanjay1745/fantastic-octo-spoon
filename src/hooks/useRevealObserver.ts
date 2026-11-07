import { useEffect } from 'react'

/**
 * Watches every [data-reveal] element on the page and sets [data-revealed] once it scrolls into view.
 * The hidden → visible styles live in base.css and only apply with JS + motion allowed.
 * Re-runs when `key` changes (pass the pathname) to pick up new page content, and also
 * watches the DOM so elements rendered later (e.g. live Google reviews) reveal too.
 */
export function useRevealObserver(key: string) {
  useEffect(() => {
    const pending = (root: ParentNode) => Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'))

    if (!('IntersectionObserver' in window)) {
      const revealAll = () => pending(document).forEach((el) => el.setAttribute('data-revealed', ''))
      revealAll()
      const mo = new MutationObserver(revealAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
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
    pending(document).forEach((el) => io.observe(el))

    // Late content: observe any [data-reveal] element added after this effect ran.
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches('[data-reveal]:not([data-revealed])')) io.observe(node)
          pending(node).forEach((el) => io.observe(el))
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [key])
}
