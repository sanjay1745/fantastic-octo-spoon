/**
 * Media slots: every spot on the site that shows a photo or video.
 *
 * To fill or change a slot:
 *   1. Put the full-res original in /media (git-ignored).
 *   2. Map it to a slot name in scripts/media.config.mjs and run `npm run media`.
 *   3. Set `src: 'media/<slot>'` here (no extension; sizes/formats are picked automatically).
 * While `src` is null, a clearly marked placeholder renders with `label` describing the shot needed.
 */
export interface ImageSlot {
  kind: 'image'
  /** 'media/<slot>' → public/media/<slot>-<width>.{avif,webp}; null = placeholder */
  src: string | null
  /** Real alt text */
  alt: string
  /** Placeholder brief: what to shoot */
  label: string
  /** CSS aspect-ratio, e.g. '4 / 5' */
  aspect: string
  /** CSS object-position for cropping, e.g. '30% 70%' */
  focus?: string
}

export interface VideoSlot {
  kind: 'video'
  /** Desktop loop, e.g. 'media/hero-1080.mp4' (H.264, muted) */
  src: string | null
  /** Lighter portrait loop for phones */
  srcMobile?: string | null
  /** Image slot base ('media/<slot>') for the first frame; shown before playback and to reduced-motion users */
  poster: string | null
  label: string
  /** Text description of the video for screen readers */
  alt: string
}

/** Must match `widths` in scripts/media.config.mjs */
export const MEDIA_WIDTHS = [480, 800, 1200, 1800] as const

const slot = (src: string | null, label: string, alt: string, aspect = '4 / 5', focus?: string): ImageSlot => ({
  kind: 'image',
  src,
  alt,
  label,
  aspect,
  focus,
})

export const media = {
  heroVideo: {
    kind: 'video',
    src: 'media/hero-1080.mp4',
    srcMobile: 'media/hero-720x1280.mp4',
    poster: 'media/hero-poster',
    label: 'Hero video loop',
    alt: 'A walkthrough of the Stoik Gym training floor and recovery room',
  } satisfies VideoSlot,

  equipment: slot('media/equipment', 'Skelcore strength floor', 'Skelcore chrome plates racked on the Stoik Gym floor', '16 / 10', '50% 40%'),
  recovery: slot('media/recovery', 'Recovery room · sauna', 'The infrared sauna in the Stoik Gym recovery room', '4 / 5', '55% 50%'),
  coldPlunge: slot('media/cold-plunge', 'Cold plunges', 'A cold plunge tub lit up in the Stoik Gym recovery room', '4 / 5', '45% 50%'),
  compression: slot(null, 'Leg compression sleeves in use', 'A member relaxing in leg compression sleeves'),
  posing: slot('media/posing', 'Posing room', 'A coach guiding a physique athlete through posing at Stoik Gym', '4 / 5', '50% 35%'),
  fuel: slot('media/fuel', 'Supplement store + drinks', 'The supplement wall and front desk at Stoik Gym', '4 / 5', '62% 50%'),
  mealPrep: slot(null, 'Meal prep cooler / packaged meals', 'Prepared meals available at Stoik Gym'),
  apparel: slot('media/apparel', 'Stoik apparel', 'Stoik apparel on display beneath the Stoik Gym mural', '16 / 10', '35% 70%'),

  coachingInPerson: slot('media/coaching-in-person', 'Coach cueing a client', 'A Stoik Gym coach working with a member on a machine', '4 / 5', '50% 40%'),
  coachingPersonal: slot('media/coaching-pt', 'Coach cueing a client', 'A Stoik Gym coach cueing a member through a cable press', '4 / 5', '45% 35%'),
  coachingLifestyle: slot('media/coaching-lifestyle', 'Lifestyle client training', 'A coach guiding a lifestyle client through lateral raises', '4 / 5', '55% 35%'),
  fitClub: slot('media/fit-club', 'Fit Club group', 'Fit Club members and Team Stoik coaches together on the gym floor', '4 / 3', '50% 62%'),
  bodybuildingClub: slot('media/bodybuilding-club', 'Bodybuilding Club session', 'Team Stoik coaches training physique athletes at Bodybuilding Club', '4 / 3', '50% 50%'),
  coachingOnline: slot('media/coaching-online', 'Member training', 'A member pressing dumbbells on an incline bench', '4 / 5', '50% 30%'),

  locationExterior: slot(null, 'Storefront at Roseville Square · dusk', 'The Stoik Gym storefront at Roseville Square', '16 / 10'),
  finalCta: slot('media/final-cta', 'Wide floor shot', 'The Stoik Gym training floor', '16 / 9'),
}

export type MediaKey = keyof typeof media
/** Keys of image (not video) slots */
export type ImageKey = { [K in MediaKey]: (typeof media)[K] extends ImageSlot ? K : never }[MediaKey]
