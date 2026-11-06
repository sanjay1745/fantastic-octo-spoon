import { useEffect } from 'react'
import { absoluteUrl } from '../lib/url'
import { findRoute, notFoundMeta } from '../routes'
import { fullTitle } from '../seo/head'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Keeps <title>, description and canonical in sync during client-side navigation.
 * (Pre-rendered HTML already has the full head for crawlers and link previews.)
 */
export function useHeadSync(pathname: string) {
  useEffect(() => {
    const meta = findRoute(pathname)?.meta ?? notFoundMeta
    const title = fullTitle(meta)
    document.title = title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', absoluteUrl(meta.path))
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = absoluteUrl(meta.path)
  }, [pathname])
}
