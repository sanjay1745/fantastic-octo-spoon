import { formatAddressLines, formatHours, primaryLocation as loc } from './locations'
import { getClub } from './coaching'
import { site } from './site'

/** FAQs. Answers pull prices/hours/address from data so they never drift out of sync. */
export interface Faq {
  id: string
  q: string
  a: string
  /** Where it appears */
  tags: ('home' | 'memberships' | 'coaching' | 'gym')[]
}

const plan = (id: string) => {
  const p = [...loc.plans, ...loc.passes].find((x) => x.id === id)
  if (!p) throw new Error(`Unknown plan ${id}`)
  return p
}
const hours = loc.hours.map((h) => `${h.label}: ${formatHours(h)}`).join(' · ')
const [street, cityLine] = formatAddressLines(loc)

export const faqs: Faq[] = [
  {
    id: 'age',
    q: 'How old do I have to be to train here?',
    a: `${site.name} is an 18+ gym. Members aged 16–17 may be considered after an interview with ${site.founder.name.split(' ')[0]} and must maintain a 3.0 GPA.`,
    tags: ['home', 'memberships'],
  },
  {
    id: 'tour',
    q: 'Can I see the gym before I join?',
    a: 'Yes. Book a free tour and someone from our team will walk you through the floor, the recovery room and the memberships.',
    tags: ['home', 'memberships'],
  },
  {
    id: 'contract',
    q: 'Do I have to sign a contract?',
    a: `Only if you want our best rate. Full Access is $${plan('standard').price}/mo on a 12-month agreement. Month-to-month is $${plan('month-to-month').price}/mo with no contract.`,
    tags: ['home', 'memberships'],
  },
  {
    id: 'day-pass',
    q: 'Do you offer day passes?',
    a: `Yes. Day passes are $${plan('day-pass').price} and available in person at the front desk any time we're open. Coming in more often? The 10-visit punch card is $${plan('punch-card').price}, never expires, and can be bought online or at the front desk.`,
    tags: ['home', 'memberships'],
  },
  {
    id: 'discount',
    q: 'Do you have a student or first responder rate?',
    a: `Yes, $${plan('student-first-responder').price}/mo, month-to-month. We verify your status at sign-up or on your first visit.`,
    tags: ['memberships'],
  },
  {
    id: 'family',
    q: 'How does the family plan work?',
    a: `Family Full Access is $${plan('family').price}/mo for up to three members. Each additional member is $30/mo.`,
    tags: ['memberships'],
  },
  {
    id: 'recovery-included',
    q: 'Is the recovery room included in my membership?',
    a: 'Yes. Every membership is full access, including the recovery room: infrared sauna, two cold plunges and leg compression sleeves.',
    tags: ['home', 'memberships'],
  },
  {
    id: 'coaching',
    q: 'Do you offer personal training?',
    a: 'Yes. We offer in-person personal training and online coaching. Pricing depends on your goals and schedule, so it is provided after a free consultation.',
    tags: ['home', 'coaching'],
  },
  {
    id: 'online-includes',
    q: "What's included with online coaching?",
    a: `Lifestyle coaching clients get free access to ${getClub('fit-club').name}. Contest prep clients get free access to ${getClub('bodybuilding-club').name}, our Tuesday-night training and posing session.`,
    tags: ['coaching'],
  },
  {
    id: 'fit-club-solo',
    q: `Can I join ${getClub('fit-club').name} without coaching?`,
    a: `Yes. ${getClub('fit-club').name} is $${getClub('fit-club').price}/mo on its own, or included free with lifestyle coaching.`,
    tags: ['coaching'],
  },
  {
    id: 'bb-club',
    q: `Who can join ${getClub('bodybuilding-club').name}?`,
    a: `${getClub('bodybuilding-club').name} is exclusive to Team Stoik contest prep clients, and it's free for them.`,
    tags: ['coaching'],
  },
  {
    id: 'hours',
    q: 'What are your hours?',
    a: `${hours}. ${loc.hoursNote ?? ''}`.trim(),
    tags: ['home', 'gym'],
  },
  {
    id: 'where',
    q: 'Where are you located?',
    a: `${street}, ${cityLine}${loc.landmark ? `. ${loc.landmark}.` : '.'}`,
    tags: ['home', 'gym'],
  },
]

export const faqsFor = (tag: Faq['tags'][number]) => faqs.filter((f) => f.tags.includes(tag))
