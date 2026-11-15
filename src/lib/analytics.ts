/**
 * Google Analytics 4, plus named events for the actions that matter.
 *
 * - Off until `site.gaMeasurementId` is set. In dev, events are logged to the console instead of sent.
 * - Google's script loads after the page has finished loading, so it never delays rendering.
 * - Page views: GA4's enhanced measurement records route changes (browser history events) itself.
 * - Clicks: one delegated listener classifies links by destination, so every CTA is covered without
 *   touching each component. Each event carries the link text, the page, and where on the page it sat.
 * - Visitors who send a Global Privacy Control signal are not tracked.
 *
 * Browser only: call `initAnalytics()` from an effect.
 */
import { locations } from '../data/locations'
import { site } from '../data/site'

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let started = false

const optedOut = () => (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true

/** Send a named event (no-op until analytics is configured). */
export function track(event: string, params: Params = {}) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, params)
    return
  }
  window.gtag?.('event', event, params)
}

/** Which part of the page a link sits in: "nav", "footer", "hero", or the id of the section's heading. */
function placement(el: Element): string {
  // The site nav is the only <header> outside <main> (section headings use <header> too)
  if (!el.closest('main') && el.closest('header')) return 'nav'
  if (el.closest('footer')) return 'footer'
  const section = el.closest('section')
  if (!section) return 'page'
  if (section.querySelector('h1')) return 'hero'
  return section.getAttribute('aria-labelledby') || section.id || 'page'
}

const same = (a: string, b: string | null | undefined) => !!b && a.replace(/\/$/, '') === b.replace(/\/$/, '')

/** Map a link destination to an event name, or null if it isn't one we track. */
function classify(href: string): string | null {
  if (same(href, site.tourUrl)) return 'tour_click'
  if (same(href, site.consultUrl)) return 'consult_click'
  if (locations.some((l) => same(href, l.joinUrl))) return 'join_click'
  if (locations.some((l) => l.passes.some((p) => same(href, p.buyUrl)))) return 'punch_card_click'
  if (href.startsWith(site.shopUrl)) return 'shop_click'
  if (href.startsWith('tel:')) return 'phone_click'
  if (href.startsWith('mailto:')) return 'email_click'
  if (/google\.[a-z.]+\/maps/.test(href)) return 'directions_click'
  if (site.socials.some((s) => same(href, s.url))) return 'social_click'
  return null
}

function onClick(e: MouseEvent) {
  const target = e.target as Element | null
  const link = target?.closest?.('a[href]')
  if (link) {
    const href = link.getAttribute('href') ?? ''
    const event = classify(href)
    if (event) {
      track(event, {
        link_text: (link.textContent ?? '').replace(/\s*\(opens in a new tab\)\s*/i, '').trim().slice(0, 80),
        link_url: href.startsWith('mailto:') || href.startsWith('tel:') ? href.split(/[:?]/)[0] : href,
        placement: placement(link),
        page_path: window.location.pathname,
      })
    }
    return
  }
  // "Read full story" on a testimonial
  const story = target?.closest?.('button[aria-haspopup="dialog"]')
  if (story) track('story_open', { placement: placement(story), page_path: window.location.pathname })
}

function loadGtag(id: string) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag expects the raw `arguments` object on the data layer
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}

/** Start analytics once per page load. Safe to call repeatedly. */
export function initAnalytics() {
  if (started) return
  started = true
  const id = site.gaMeasurementId
  if (import.meta.env.DEV) {
    // Dev: no network calls, just log events so they can be checked in the console
    document.addEventListener('click', onClick, { capture: true })
    return
  }
  if (!id || optedOut()) return
  document.addEventListener('click', onClick, { capture: true })
  const start = () => loadGtag(id)
  if (document.readyState === 'complete') setTimeout(start, 0)
  else window.addEventListener('load', () => setTimeout(start, 0), { once: true })
}
