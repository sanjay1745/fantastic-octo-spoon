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
  /** Number of visits included (passes/punch cards) */
  visits?: number
  /** 'join' → online signup (location joinUrl). 'in-person' → buy at the front desk. */
  purchase: 'join' | 'in-person'
}

export const rosevillePlans: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 109,
    cadence: 'month',
    term: '12-month agreement',
    summary: 'Our best monthly rate, for members who are in it for the long run.',
    featured: true,
    purchase: 'join',
  },
  {
    id: 'month-to-month',
    name: 'Month-to-Month',
    price: 129,
    cadence: 'month',
    term: 'No contract',
    summary: 'Full membership with no long-term commitment.',
    purchase: 'join',
  },
  {
    id: 'student-first-responder',
    name: 'Student & First Responder',
    price: 79,
    cadence: 'month',
    term: 'Month-to-month',
    summary: 'A discounted rate for students and first responders.',
    fine: 'Status verified at sign-up or on your first visit.',
    purchase: 'join',
  },
  {
    id: 'family',
    name: 'Family',
    price: 180,
    cadence: 'month',
    term: 'Up to 3 members',
    summary: 'Train together under one membership.',
    fine: '$30/mo for each additional member.',
    purchase: 'join',
  },
]

export const rosevillePasses: Plan[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 25,
    cadence: 'once',
    term: 'Single visit',
    summary: 'Available any time in person at the front desk.',
    purchase: 'in-person',
  },
  {
    id: 'punch-card',
    name: '10-Visit Punch Card',
    price: 110,
    cadence: 'once',
    term: '10 visits · never expires',
    visits: 10,
    summary: 'Coming in more than a few times? Save over buying day passes.',
    purchase: 'in-person',
  },
]

export function formatPrice(plan: Pick<Plan, 'price' | 'cadence'>): { amount: string; per: string } {
  return { amount: `$${plan.price}`, per: plan.cadence === 'month' ? '/mo' : '' }
}
