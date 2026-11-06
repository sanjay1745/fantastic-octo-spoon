// Which original in /media feeds which slot on the site.
// Originals stay in /media (git-ignored, full resolution). `npm run media` writes web versions to public/media/.
// Slot names must match `src` values in src/data/media.ts and src/data/coaches.ts ('media/<slot>').
//
//   file:  photo in /media
//   video + t: grab a still from a video at t seconds
export const tourVideo = 'STOIK GYM TOUR.mp4'

export const images = {
  // Amenities
  equipment: { file: 'chrome plates.jpg' },
  recovery: { video: tourVideo, t: 13.5 },
  'cold-plunge': { video: tourVideo, t: 10.5 },
  posing: { file: '20260528SSM-39.jpg' },
  fuel: { video: tourVideo, t: 30.5 },
  apparel: { video: tourVideo, t: 27.5 },

  // Coaching
  'coaching-in-person': { file: '20260325SSM-29.jpg' },
  'coaching-online': { file: '20250728SSM-38.jpg' },

  // Coach portraits
  'coach-michael-lopez': { file: 'coach michael.jpg' },
  'coach-mel-renee': { file: 'coach mel pfp.jpg' },
  'coach-tyler-brey': { file: 'coach tyler.jpg' },

  // Full-bleed
  'final-cta': { file: 'WIDE GYM FLOOR.jpg' },
  'hero-poster': { video: tourVideo, t: 0.5 },
}

/** Responsive widths generated for every image (never upscaled). */
export const widths = [480, 800, 1200, 1800]

/** Background loop for the home hero. Audio is stripped. */
export const heroVideo = {
  file: tourVideo,
  desktop: { out: 'hero-1080.mp4', vf: 'scale=1920:-2', crf: 32, maxrate: '1100k' },
  // Phones are portrait: center 9:16 crop so we don't ship pixels that get cropped away.
  mobile: { out: 'hero-720x1280.mp4', vf: 'crop=ih*9/16:ih,scale=720:-2', crf: 32, maxrate: '600k' },
}
