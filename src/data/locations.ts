import { rosevillePasses, rosevillePlans, type Plan } from './memberships'

/**
 * Every location-specific fact lives here. Adding a gym = adding an entry to `locations`.
 * Pages, JSON-LD, the sitemap and /locations/:slug routes are generated from this list.
 */
export type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export interface OpeningHours {
  /** Display label, e.g. "Mon – Fri" */
  label: string
  days: DayName[]
  /** 24h "HH:MM" */
  opens: string
  closes: string
}

export interface Location {
  slug: string
  /** Short name, e.g. "Roseville" */
  name: string
  status: 'open' | 'coming-soon'
  address: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  /** Wayfinding hint shown under the address */
  landmark?: string
  phone: string
  email: string
  hours: OpeningHours[]
  hoursNote?: string
  /** ClubLifePro online signup for this location */
  joinUrl: string
  /** Google place ID (starts with "ChIJ…"), for live Google reviews. Find it with Google's Place ID Finder. */
  googlePlaceId?: string | null
  sizeSqFt?: number
  plans: Plan[]
  passes: Plan[]
}

export const locations: Location[] = [
  {
    slug: 'roseville',
    name: 'Roseville',
    status: 'open',
    address: {
      street: '1105 Roseville Square',
      city: 'Roseville',
      region: 'CA',
      postalCode: '95678',
      country: 'US',
    },
    landmark: "Same plaza as Trader Joe's",
    phone: '916-306-1697',
    email: 'support@stoikgym.com',
    hours: [
      { label: 'Mon – Fri', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '05:00', closes: '23:00' },
      { label: 'Sat – Sun', days: ['Saturday', 'Sunday'], opens: '06:00', closes: '22:00' },
    ],
    hoursNote: 'Holiday hours may vary.',
    joinUrl: 'https://secure.peakpayment.com/4340/join/?p=1088',
    // TODO(owner): Google place ID for Stoik Gym Roseville. While null, the reviews section is hidden.
    googlePlaceId: null,
    sizeSqFt: 6000,
    plans: rosevillePlans,
    passes: rosevillePasses,
  },
]

export const openLocations = locations.filter((l) => l.status === 'open')

/** The flagship. Used wherever a single location is assumed (home page, nav Join Now). */
export const primaryLocation = openLocations[0]

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}

/** "05:00" → "5am", "23:30" → "11:30pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
}

export function formatHours(h: OpeningHours): string {
  return `${formatTime(h.opens)} – ${formatTime(h.closes)}`
}

export function formatAddressLines(l: Location): [string, string] {
  return [l.address.street, `${l.address.city}, ${l.address.region} ${l.address.postalCode}`]
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`
}

function addressQuery(l: Location): string {
  return `${l.address.street}, ${l.address.city}, ${l.address.region} ${l.address.postalCode}`
}

export function mapsSearchUrl(l: Location): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Stoik Gym, ${addressQuery(l)}`)}`
}

export function mapsEmbedUrl(l: Location): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(addressQuery(l))}&output=embed`
}
