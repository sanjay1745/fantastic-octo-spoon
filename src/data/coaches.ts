import type { ImageSlot } from './media'

/**
 * Coaching team. Each coach gets a profile card.
 * TODO(owner): roles, specialties, bios, certifications, photos and Instagram handles.
 */
export interface Coach {
  slug: string
  name: string
  role: string
  specialties: string[]
  bio: string
  certifications: string[]
  instagram?: string
  /** Which locations they coach at (slugs) */
  locations: string[]
  photo: ImageSlot
}

const portrait = (name: string): ImageSlot => ({
  kind: 'image',
  src: null,
  alt: `${name}, coach at Stoik Gym`,
  label: `Portrait · ${name} · 4:5 · dark backdrop`,
  aspect: '4 / 5',
})

const coach = (slug: string, name: string): Coach => ({
  slug,
  name,
  role: 'Coach',
  specialties: [],
  bio: '',
  certifications: [],
  locations: ['roseville'],
  photo: portrait(name),
})

export const coaches: Coach[] = [
  coach('cinthia-beltran', 'Cinthia Beltran'),
  coach('michael-lopez', 'Michael Lopez'),
  coach('mel-renee', 'Mel Renee'),
  coach('stephanie-pleasas', 'Stephanie Pleasas'),
  coach('logan-frushour', 'Logan Frushour'),
  coach('tyler-brey', 'Tyler Brey'),
]
