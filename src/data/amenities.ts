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
    blurb: '60+ pieces of premium Skelcore equipment, with new additions all the time.',
    media: 'equipment',
  },
  {
    id: 'recovery',
    title: 'Recovery room',
    blurb: 'Infrared sauna and leg compression sleeves on site.',
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
    title: 'Private posing room',
    blurb: 'A dedicated room to practice for the stage.',
    media: 'posingRoom',
  },
  {
    id: 'fuel',
    title: 'Pro shop',
    blurb: 'The largest Evogen selection in the area, plus RAW, Ryse and Ghost.',
    media: 'proShop',
  },
  {
    id: 'meal-prep',
    title: 'Meal prep',
    blurb: 'Made locally by Full & Fit, ready to grab on your way out.',
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
