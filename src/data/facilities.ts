import { type ImageSlot, media } from './media'
import { site } from './site'

/**
 * What's inside each location. Keyed by location slug (see locations.ts).
 * A new gym gets its own entry here; The Gym page renders whichever location it's given.
 */
export interface Highlight {
  id: string
  eyebrow: string
  title: string
  body: string[]
  /** Short tags, e.g. brand names or features */
  tags?: string[]
  images: ImageSlot[]
  /** Optional big number shown with the copy */
  stat?: { value: string; label: string }
  /** Optional partner logo in /public, e.g. 'brand/skelcore.webp' */
  logo?: { src: string; alt: string; width: number; height: number }
  link?: { href: string; label: string }
}

export interface Facility {
  /** Carousel of the floor */
  gallery: ImageSlot[]
  highlights: Highlight[]
}

const g = (slot: string, alt: string, focus?: string): ImageSlot => ({
  kind: 'image',
  src: `media/${slot}`,
  alt,
  label: alt,
  aspect: '4 / 5',
  focus,
})

export const facilities: Record<string, Facility> = {
  roseville: {
    gallery: [
      g('gallery-floor', 'Members training across the Stoik Gym floor'),
      g('gallery-chest-press', 'A row of Skelcore plate-loaded chest presses'),
      g('gallery-cable', 'A Skelcore cable station'),
      g('gallery-coaching-1', 'A coach correcting a member’s form at the cable station', '45% 40%'),
      g('gallery-straightbars', 'Chrome straight bars and curl bars on a Skelcore rack'),
      g('gallery-leg-extension', 'A coach working with a member on the leg extension'),
      g('gallery-low-row', 'A Skelcore plate-loaded low row'),
      g('gallery-coaching-2', 'A coach and member mid-set on a seated machine', '55% 45%'),
      g('gallery-legs', 'The leg training area at Stoik Gym'),
      g('gallery-mural', 'The cardio deck under the Stoik Gym mural'),
      g('gallery-floor-2', 'Members training at the plate-loaded rack'),
    ],
    highlights: [
      {
        id: 'equipment',
        eyebrow: 'Equipment',
        title: 'Premium equipment from Skelcore.',
        body: [
          'More than 60 pieces of premium Skelcore equipment, featuring the latest innovations in fitness.',
          "We're constantly bringing in new equipment to create the best training experience possible.",
        ],
        stat: { value: '60+', label: 'Skelcore pieces' },
        logo: { src: 'brand/skelcore.webp', alt: 'Skelcore', width: 640, height: 115 },
        images: [media.equipmentFeature],
      },
      {
        id: 'posing',
        eyebrow: 'Posing room',
        title: 'A private room for posing.',
        body: ['A dedicated, private posing room with the mirror and lighting to practice for the stage.'],
        images: [media.posingRoom],
      },
      {
        id: 'recovery',
        eyebrow: 'Recovery room',
        title: 'Recover like you train.',
        body: ['Our recovery room features an infrared sauna, two cold plunges and leg compression sleeves.'],
        tags: ['Infrared sauna', '2 cold plunges', 'Leg compression sleeves'],
        images: [media.recovery, media.coldPlunge],
      },
      {
        id: 'pro-shop',
        eyebrow: 'Pro shop',
        title: 'Fuel, on site.',
        body: [
          'The largest variety of Evogen supplements in the area, plus brands like RAW, Ryse and Ghost, and our own Stoik apparel.',
        ],
        tags: ['Evogen', 'RAW', 'Ryse', 'Ghost', 'Stoik apparel'],
        images: [media.proShop, media.fuel],
        link: { href: site.shopUrl, label: 'Shop Stoik apparel' },
      },
      {
        id: 'meal-prep',
        eyebrow: 'Meal prep',
        title: 'Meals made locally.',
        body: ['Fresh meal preps made locally by Full & Fit, ready to grab on your way out.'],
        images: [media.mealPrep],
      },
    ],
  },
}

export const getFacility = (slug: string): Facility | undefined => facilities[slug]
