import type { ImageSlot } from './media'

/**
 * Member testimonials and transformations.
 * Every entry is a PLACEHOLDER until `placeholder` is removed. Never publish invented quotes.
 * TODO(owner): real quotes (with permission), names and transformation photos.
 */
export interface Testimonial {
  id: string
  quote: string
  name: string
  detail: string
  placeholder?: boolean
}

export interface Transformation {
  id: string
  name: string
  detail: string
  before: ImageSlot
  after: ImageSlot
  placeholder?: boolean
}

export const testimonials: Testimonial[] = [1, 2, 3].map((n) => ({
  id: `placeholder-${n}`,
  quote: 'Placeholder. A real member quote goes here: what changed, how the coaching and community feel, why they stay.',
  name: 'Member name',
  detail: 'Member since 20XX',
  placeholder: true,
}))

const shot = (n: number, when: 'Before' | 'After'): ImageSlot => ({
  kind: 'image',
  src: null,
  alt: `Transformation ${n}, ${when.toLowerCase()}`,
  label: `${when} · transformation ${n} · 4:5`,
  aspect: '4 / 5',
})

export const transformations: Transformation[] = [1, 2].map((n) => ({
  id: `placeholder-${n}`,
  name: 'Member name',
  detail: 'Timeframe · coached by …',
  before: shot(n, 'Before'),
  after: shot(n, 'After'),
  placeholder: true,
}))
