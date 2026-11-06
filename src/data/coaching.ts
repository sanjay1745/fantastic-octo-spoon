import { type DayName, formatTime } from './locations'
import { media, type ImageSlot } from './media'

/**
 * Coaching offerings. Coaching (personal training, online coaching) is priced at a consultation.
 * The clubs are perks of online coaching; Fit Club can also be bought on its own.
 */
export interface Session {
  day: DayName
  /** 24h "HH:MM" */
  start: string
  end: string
}

export interface CoachingTier {
  id: 'lifestyle' | 'contest-prep'
  name: string
  forWho: string
  summary: string
  points: string[]
  /** Club included free with this tier */
  club: Club['id']
  image: ImageSlot
}

export interface Club {
  id: 'fit-club' | 'bodybuilding-club'
  name: string
  summary: string
  schedule: Session[]
  /** Stand-alone monthly price; null when not sold separately */
  price: number | null
  /** Coaching tier that gets it free */
  includedWith: CoachingTier['id']
  /** Only available to that tier's clients */
  exclusive: boolean
  location: string
  image: ImageSlot
}

export const personalTraining = {
  name: 'Personal training',
  summary:
    'Elite one-on-one coaching from Team Stoik coaches with years of experience on the gym floor and with clients.',
  body: 'Your coach shows you everything you need to know about training, from technique and programming to progression, and works with you toward whatever goal you set.',
  points: ['One-on-one sessions at Stoik Gym', 'Technique, programming and progression', 'Built around your goals and schedule'],
  image: media.coachingPersonal,
}

export const onlineCoaching = {
  name: 'Online coaching',
  summary: 'Multiple levels of online coaching, built for two kinds of clients: lifestyle and contest prep.',
}

export const coachingTiers: CoachingTier[] = [
  {
    id: 'lifestyle',
    name: 'Lifestyle coaching',
    forWho: 'For lifestyle clients',
    summary: 'For people who want to look, feel and perform better, with a plan that fits real life.',
    points: ['Programming built around your goals', 'Accountability from your Team Stoik coach'],
    club: 'fit-club',
    image: media.coachingLifestyle,
  },
  {
    id: 'contest-prep',
    name: 'Contest prep coaching',
    forWho: 'For competitors',
    summary: 'For athletes preparing to step on stage, coached by the team behind Stoik Gym.',
    points: ['Prep coaching from Team Stoik', 'Built around your show and your timeline'],
    club: 'bodybuilding-club',
    image: media.posing,
  },
]

export const clubs: Club[] = [
  {
    id: 'fit-club',
    name: 'Fit Club',
    summary:
      'In-person group training led by Team Stoik coaches. Built for lifestyle clients who want extra motivation, hands-on training and a group that expects you to show up.',
    schedule: [
      { day: 'Monday', start: '12:00', end: '13:00' },
      { day: 'Thursday', start: '19:00', end: '20:00' },
    ],
    price: 199,
    includedWith: 'lifestyle',
    exclusive: false,
    location: 'roseville',
    image: media.fitClub,
  },
  {
    id: 'bodybuilding-club',
    name: 'Bodybuilding Club',
    summary:
      'A Tuesday-night workout with Team Stoik coaches, followed by posing practice. Train alongside other competitors in prep.',
    schedule: [{ day: 'Tuesday', start: '19:00', end: '21:00' }],
    price: null,
    includedWith: 'contest-prep',
    exclusive: true,
    location: 'roseville',
    image: media.bodybuildingClub,
  },
]

export const getClub = (id: Club['id']) => clubs.find((c) => c.id === id)!

/** "Mondays · 12pm – 1pm" */
export function formatSession(s: Session): string {
  return `${s.day}s · ${formatTime(s.start)} – ${formatTime(s.end)}`
}
