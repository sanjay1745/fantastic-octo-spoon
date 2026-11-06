/** URL helpers. The base path and origin come from site.config.ts; never hard-code them. */
const BASE = import.meta.env.BASE_URL // e.g. '/fantastic-octo-spoon/' or '/'

/** Router basename without trailing slash ('' when hosted at the root). */
export const basename = BASE.replace(/\/$/, '')

/** URL for a file in /public, e.g. asset('brand/wordmark.svg') */
export function asset(path: string): string {
  return BASE + path.replace(/^\//, '')
}

/** Absolute canonical URL for a route path. Uses trailing slashes to match the pre-rendered folders. */
export function absoluteUrl(path = '/'): string {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}/`
  return `${import.meta.env.VITE_SITE_ORIGIN}${basename}${clean}`
}

export function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href)
}
