import { formatAddressLines, type Location, openLocations } from '../data/locations'
import { site } from '../data/site'
import { absoluteUrl, asset } from '../lib/url'

export interface PageMeta {
  /** Page title without the brand suffix. Omit on the home page. */
  title?: string
  description: string
  /** Route path, e.g. '/memberships' */
  path: string
  /** Path in /public for the Open Graph image */
  image?: string
  noindex?: boolean
  /** Send visitors straight to this URL (meta refresh in the pre-rendered HTML) */
  redirect?: string
  /** Extra JSON-LD objects for this page */
  jsonLd?: object[]
}

const DEFAULT_TITLE = `${site.name} | Premium Boutique Gym in Roseville, CA`

export function fullTitle(meta: Pick<PageMeta, 'title'>): string {
  return meta.title ? `${meta.title} | ${site.name}` : DEFAULT_TITLE
}

export function ogImageUrl(meta: Pick<PageMeta, 'image'>): string {
  return `${import.meta.env.VITE_SITE_ORIGIN}${asset(meta.image ?? 'brand/og-default.jpg')}`
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Static <head> tags for a pre-rendered page. */
export function renderHead(meta: PageMeta): string {
  const title = fullTitle(meta)
  const url = absoluteUrl(meta.path)
  const image = ogImageUrl(meta)
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : '',
    meta.redirect ? `<meta http-equiv="refresh" content="0; url=${esc(meta.redirect)}" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(meta.jsonLd ?? []).map(
      (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
  return tags.filter(Boolean).join('\n    ')
}

/* ---------- JSON-LD ---------- */

export function healthClubJsonLd(l: Location): object {
  const [street] = formatAddressLines(l)
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': `${absoluteUrl(`/locations/${l.slug}`)}#gym`,
    name: openLocations.length > 1 ? `${site.name} ${l.name}` : site.name,
    description: site.description,
    url: absoluteUrl(`/locations/${l.slug}`),
    image: ogImageUrl({}),
    logo: `${import.meta.env.VITE_SITE_ORIGIN}${asset('brand/icon-512.png')}`,
    telephone: `+1-${l.phone}`,
    email: l.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: l.address.city,
      addressRegion: l.address.region,
      postalCode: l.address.postalCode,
      addressCountry: l.address.country,
    },
    openingHoursSpecification: l.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    founder: { '@type': 'Person', name: site.founder.name },
    sameAs: site.socials.map((s) => s.url),
  }
}

export function organizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: absoluteUrl('/'),
    logo: `${import.meta.env.VITE_SITE_ORIGIN}${asset('brand/icon-512.png')}`,
    email: site.email,
    sameAs: site.socials.map((s) => s.url),
  }
}
