/**
 * Seasonal theme. One switch: set `activeSeason` and push.
 *   'black-friday' → Black Friday promo strip, hero and plan badge
 *   'holiday'      → gift-giving strip, hero and gift section
 *   null           → the everyday site (no seasonal styling at all)
 *
 * The site is static, so the season changes when this file changes and the site redeploys,
 * not on a timer. Offers here must match real pricing in memberships.ts / locations.ts.
 */
import { primaryLocation } from './locations'
import { site } from './site'

export type SeasonId = 'black-friday' | 'holiday'

export const activeSeason: SeasonId | null = 'black-friday'

export interface SeasonCta {
  href: string
  label: string
}

export interface Season {
  id: SeasonId
  /** Slim strip above the nav */
  strip: { text: string; /** Phone-width version (one line at 390px) */ short: string; cta: SeasonCta }
  /** Home hero copy (replaces the everyday hero text) */
  hero: { eyebrow: string; title: string; lead: string; primary: SeasonCta; secondary: SeasonCta }
  /** Badge on the featured plan card, in place of "Best value" */
  planBadge?: string
  /** Show the gift section on the home page */
  gifts: boolean
}

const fullAccess = primaryLocation.plans.find((p) => p.featured)!
const punchCard = primaryLocation.passes.find((p) => p.id === 'punch-card')!

const seasons: Record<SeasonId, Season> = {
  'black-friday': {
    id: 'black-friday',
    strip: {
      // TODO(owner): add the end date once confirmed, e.g. "Ends Monday."
      text: `Black Friday: Full Access for $${fullAccess.price}/mo, down from $${fullAccess.wasPrice}.`,
      short: `Black Friday: Full Access $${fullAccess.price}/mo, was $${fullAccess.wasPrice}`,
      cta: { href: primaryLocation.joinUrl, label: 'Join Now' },
    },
    hero: {
      eyebrow: 'Black Friday',
      title: 'Black Friday.',
      lead: `Full Access for $${fullAccess.price}/mo, down from $${fullAccess.wasPrice}. The whole floor and the recovery room. Lock in the rate.`,
      primary: { href: primaryLocation.joinUrl, label: 'Join Now' },
      secondary: { href: '/memberships', label: 'View memberships' },
    },
    planBadge: 'Black Friday',
    gifts: true,
  },
  holiday: {
    id: 'holiday',
    strip: {
      text: `Give the gift of Stoik. A ${punchCard.visits}-visit punch card that never expires.`,
      short: `Gift a ${punchCard.visits}-visit punch card. Never expires.`,
      cta: { href: punchCard.buyUrl ?? '/memberships', label: 'Buy a punch card' },
    },
    hero: {
      eyebrow: 'The holidays at Stoik',
      title: 'Give Stoik.',
      lead: 'A punch card that never expires, or apparel built for the floor. Gifts for the people who show up.',
      primary: { href: punchCard.buyUrl ?? '/memberships', label: 'Buy a punch card' },
      secondary: { href: site.shopUrl, label: 'Shop apparel' },
    },
    gifts: true,
  },
}

export const season: Season | null = activeSeason ? seasons[activeSeason] : null

/** Gift ideas, all real products. */
export const gifts = {
  title: 'Gifts that get used.',
  lead: 'For the person who never misses a session, or the one you want to bring along.',
  punchCard: {
    name: punchCard.name,
    price: punchCard.price,
    summary: `${punchCard.visits} visits to the gym. Never expires. Buy online or at the front desk.`,
    href: punchCard.buyUrl,
  },
  apparel: {
    name: 'Stoik apparel',
    summary: 'Tanks, tees and hats from the Stoik Athletix store.',
    href: site.shopUrl,
  },
  note: `Holiday hours may vary. Call ${primaryLocation.phone} before you visit.`,
}
