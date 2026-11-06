import type { ImageKey } from './media'
import { site } from './site'

export interface Amenity {
  id: string
  title: string
  blurb: string
  media: ImageKey
  /** Optional link, internal path or external URL */
  href?: string
}

export const amenities: Amenity[] = [
  {
    id: 'equipment',
    title: 'Skelcore equipment',
    blurb: 'A floor built primarily on Skelcore. Precise, smooth and made for serious training.',
    media: 'equipment',
  },
  {
    id: 'recovery',
    title: 'Recovery room',
    blurb: 'Sauna and leg compression sleeves on site.',
    media: 'recovery',
  },
  {
    id: 'cold-plunge',
    title: 'Two cold plunges',
    blurb: 'No waiting. Get in, get cold, get back to work.',
    media: 'coldPlunge',
  },
  {
    id: 'posing',
    title: 'Posing room',
    blurb: 'A dedicated room to practice for the stage.',
    media: 'posing',
  },
  {
    id: 'fuel',
    title: 'Supplements & drinks',
    blurb: 'Pre-workout to post-workout, stocked in the gym.',
    media: 'fuel',
  },
  {
    id: 'meal-prep',
    title: 'Meal prep',
    blurb: 'Prepared meals ready to grab on your way out.',
    media: 'mealPrep',
  },
  {
    id: 'apparel',
    title: 'Stoik apparel',
    blurb: 'Wear the standard.',
    media: 'apparel',
    href: site.shopUrl,
  },
]
