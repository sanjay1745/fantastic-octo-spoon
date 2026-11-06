import { primaryLocation } from '../data/locations'
import { site } from '../data/site'

/** "Book a free tour": external booking link once supplied, otherwise the contact page. */
export const tourHref = site.tourUrl ?? '/contact'

/** "Join Now": ClubLifePro signup for the primary location. */
export const joinHref = primaryLocation.joinUrl

/** "Book a consultation" for coaching. Routes to the contact page with the interest preselected. */
export type Interest = 'coaching' | 'personal-training' | 'lifestyle' | 'contest-prep' | 'fit-club' | 'bodybuilding-club'
export const consultFor = (interest: Interest) => `/contact?interest=${interest}`
export const consultHref = consultFor('coaching')
