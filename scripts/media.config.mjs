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
  apparel: { file: '20260805_STOIK ATHLETIX WEBSITE BANNER.png' },

  // Coaching
  'coaching-in-person': { file: '20260325SSM-29.jpg' },
  'coaching-online': { file: '20250728SSM-38.jpg' },

  // Coaching page
  // Header montage: three training photos composed into one 16:10 image (like the apparel banner)
  'coaching-hero': { file: 'coaching hero montage.jpg' },
  'coaching-pt': { file: '20261103SSM-09.jpg' },
  'coaching-lifestyle': { file: '20260325SSM-25.jpg' },
  'fit-club': { file: 'fit club group pic.jpg' },
  'bodybuilding-club': { file: '20260528SSM-25.jpg' },

  // The Gym: highlights
  'equipment-lateral-raise': { file: 'skelcore lateral raise.jpg' },
  'posing-room': { file: 'posing room.jpg' },
  'pro-shop': { file: 'evogen protein.jpg' },

  // The Gym: facility carousel
  'gallery-floor': { file: '20260801SSM-01.jpg' },
  'gallery-chest-press': { file: 'chest presses.jpg' },
  'gallery-cable': { file: 'cable machine.jpg' },
  'gallery-coaching-1': { file: '20260220SSM-29.jpg' },
  'gallery-straightbars': { file: 'chrome straightbars.jpg' },
  'gallery-leg-extension': { file: 'leg extension.jpg' },
  'gallery-low-row': { file: 'low row.jpg' },
  'gallery-coaching-2': { file: '20260220SSM-49.jpg' },
  'gallery-legs': { file: 'leg equipment.jpg' },
  'gallery-mural': { file: 'mural and cardio.jpg' },
  'gallery-floor-2': { file: '20261103SSM-01.jpg' },

  // About
  'about-founder': { file: 'jeremy coaching.jpg' },
  'about-community': { file: 'community.jpg' },

  // Coach portraits
  'coach-cinthia-beltran': { file: 'cinthia.jpg' },
  'coach-stephanie-pleasas': { file: 'coach steph.jpg' },
  'coach-michael-lopez': { file: 'coach michael.jpg' },
  'coach-mel-renee': { file: 'coach mel pfp.jpg' },
  'coach-tyler-brey': { file: 'coach tyler.jpg' },
  'coach-kevin-zaragoza': { file: 'coach kev pfp.jpg' },

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
