/** Membership plans and passes. Each location references its own lists (see locations.ts). */
export interface Plan {
  id: string
  name: string
  /** USD, whole dollars */
  price: number
  cadence: 'month' | 'once'
  /** Short term line shown under the price, e.g. "12-month agreement" */
  term: string
  /** Who it's for / one-line pitch */
  summary: string
  /** Small print under the card */
  fine?: string
  featured?: boolean
  /** Former monthly price, shown struck through next to `price` */
  wasPrice?: number
  /** Short highlight line under the summary, e.g. what's now included */
  perk?: string
  /** Number of visits included (passes/punch cards) */
  visits?: number
  /**
   * 'join' → online signup (location joinUrl).
   * 'online' → buy online at `buyUrl`, or in person at the club.
   * 'in-person' → buy at the front desk only.
   */
  purchase: 'join' | 'online' | 'in-person'
  /** Online checkout link, used when purchase is 'online' */
  buyUrl?: string
}

/** Every membership is full access: the whole floor plus the recovery room. */
const fullAccess = 'Now includes full access to our recovery room.'

/** Display order is the order of this list. */
export const rosevillePlans: Plan[] = [
  {
    id: 'standard',
    name: 'Full Access',
    price: 109,
    wasPrice: 199,
    cadence: 'month',
    term: '12-month agreement',
    summary: 'Our best monthly rate, for members who are in it for the long run.',
    perk: fullAccess,
    featured: true,
    purchase: 'join',
  },
  {
    id: 'family',
    name: 'Family Full Access',
    price: 179,
    wasPrice: 379,
    cadence: 'month',
    term: 'Up to 3 members',
    summary: 'Train together under one membership.',
    perk: fullAccess,
    fine: '$30/mo for each additional member.',
    purchase: 'join',
  },
  {
    id: 'month-to-month',
    name: 'Month-to-Month',
    price: 129,
    cadence: 'month',
    term: 'No contract',
    summary: 'Full membership with no long-term commitment.',
    perk: fullAccess,
    purchase: 'join',
  },
  {
    id: 'student-first-responder',
    name: 'Student & First Responder',
    price: 79,
    cadence: 'month',
    term: 'Month-to-month',
    summary: 'A discounted rate for students and first responders.',
    perk: fullAccess,
    fine: 'Status verified at sign-up or on your first visit.',
    purchase: 'join',
  },
]

/** Punch card leads: we want visitors to choose it over a single day pass. */
export const rosevillePasses: Plan[] = [
  {
    id: 'punch-card',
    name: '10-Visit Punch Card',
    price: 110,
    cadence: 'once',
    term: '10 visits · never expires',
    visits: 10,
    summary: 'Coming in more than a few times? Save over buying day passes.',
    featured: true,
    purchase: 'online',
    buyUrl: 'https://secure.peakpayment.com/4340/join/?p=1285',
  },
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 25,
    cadence: 'once',
    term: 'Single visit',
    summary: 'Available any time in person at the front desk.',
    purchase: 'in-person',
  },
]

export function formatPrice(plan: Pick<Plan, 'price' | 'cadence'>): { amount: string; per: string } {
  return { amount: `$${plan.price}`, per: plan.cadence === 'month' ? '/mo' : '' }
}

/** Savings line for the punch card, derived from the day pass price, e.g. "$11 per visit · save $140 vs. day passes". */
export function punchCardSavings(passes: Plan[]): string | undefined {
  const day = passes.find((p) => p.id === 'day-pass')
  const card = passes.find((p) => p.id === 'punch-card')
  if (!day || !card?.visits) return undefined
  const perVisit = card.price / card.visits
  const saved = day.price * card.visits - card.price
  return `$${perVisit % 1 ? perVisit.toFixed(2) : perVisit} per visit · save $${saved} vs. day passes`
}
