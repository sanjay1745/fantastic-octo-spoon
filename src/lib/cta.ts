import { primaryLocation } from '../data/locations'
import { site } from '../data/site'

/** "Book a free tour": external booking link once supplied, otherwise the contact page. */
export const tourHref = site.tourUrl ?? '/contact'

/** "Join Now": ClubLifePro signup for the primary location. */
export const joinHref = primaryLocation.joinUrl

/**
 * "Book a consultation" for coaching: the Typeform consultation form.
 * Every interest shares one form today; the interest is kept so a per-program form can be added later.
 * Without a form link, falls back to the contact page with the interest preselected.
 */
export type Interest = 'coaching' | 'personal-training' | 'lifestyle' | 'contest-prep' | 'fit-club' | 'bodybuilding-club'
export const consultFor = (interest: Interest) => site.consultUrl ?? `/contact?interest=${interest}`
export const consultHref = consultFor('coaching')
