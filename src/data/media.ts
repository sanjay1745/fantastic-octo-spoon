/**
 * Media slots. Each slot is a spot on the site waiting for real photo/video.
 * To swap a placeholder: drop the file in /public/media and set `src` (path relative to /public).
 * While `src` is null, a clearly marked placeholder renders with `label` describing the shot needed.
 */
export interface ImageSlot {
  kind: 'image'
  src: string | null
  /** Real alt text, written for the final photo */
  alt: string
  /** Placeholder brief: what to shoot */
  label: string
  /** CSS aspect-ratio, e.g. '4 / 5' */
  aspect: string
}

export interface VideoSlot {
  kind: 'video'
  /** Desktop loop, e.g. 'media/hero-1080.mp4' (H.264, muted, ~10s, ≤ 4 MB) */
  src: string | null
  /** Optional lighter loop for phones (720p portrait or 16:9, ≤ 2 MB) */
  srcMobile?: string | null
  /** First frame as an image; shown before the video plays and to reduced-motion users */
  poster: string | null
  label: string
  /** Text description of the video for screen readers */
  alt: string
}

const img = (label: string, alt: string, aspect = '4 / 5'): ImageSlot => ({ kind: 'image', src: null, alt, label, aspect })

export const media = {
  heroVideo: {
    kind: 'video',
    src: null,
    srcMobile: null,
    poster: null,
    label: 'Hero video loop · 16:9 + 9:16 cut · 8–12s · no audio',
    alt: 'Members training on the floor at Stoik Gym',
  } satisfies VideoSlot,

  equipment: img('Skelcore strength floor · wide · moody light', 'Rows of Skelcore strength equipment on the Stoik Gym floor', '16 / 10'),
  recovery: img('Recovery room · sauna glow', 'The sauna in the Stoik Gym recovery room'),
  coldPlunge: img('Cold plunges · both tubs in frame', 'Two cold plunge tubs in the Stoik Gym recovery room'),
  compression: img('Leg compression sleeves in use', 'A member relaxing in leg compression sleeves'),
  posing: img('Posing room · mirror + lighting', 'The dedicated posing room at Stoik Gym'),
  fuel: img('Supplement store + drinks fridge', 'Supplements and drinks available at Stoik Gym'),
  mealPrep: img('Meal prep cooler / packaged meals', 'Prepared meals available at Stoik Gym'),
  apparel: img('Stoik apparel · flat lay or on a member', 'Stoik Athletix apparel'),

  coachingInPerson: img('Coach cueing a client mid-set', 'A Stoik Gym coach working with a client on the floor', '4 / 5'),
  coachingOnline: img('Check-in / programming on phone', 'A Stoik Gym online coaching check-in', '4 / 5'),

  locationExterior: img('Storefront at Roseville Square · dusk', 'The Stoik Gym storefront at Roseville Square', '16 / 10'),
  finalCta: img('Wide floor shot · empty gym · early morning', 'The Stoik Gym training floor', '16 / 9'),
}

export type MediaKey = keyof typeof media
