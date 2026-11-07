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

export interface GymRule {
  /** Optional short label shown in bold, e.g. "Be respectful" */
  title?: string
  text: string
}

type Vec3 = [number, number, number]

/** A camera viewpoint inside the 3D scene (scene units) */
export interface TourView {
  position: Vec3
  lookAt: Vec3
}

/**
 * Interactive 3D floor (Gaussian splat reconstructed from drone footage).
 * Pipeline: frames → COLMAP poses → Brush training → scripts/splat-to-ksplat.mjs → public/media/3d/.
 * Camera positions come from the COLMAP poses of the matching video frames.
 */
export interface FloorTour3D {
  /** Show it on the site. When false, The Gym hero keeps the video. */
  enabled: boolean
  /** 'media/3d/<file>.ksplat' (relative to the site base) */
  scene: string
  /** Approximate download size in MB, shown on the button */
  sizeMb: number
  /** Still shown before the viewer loads; should match the start view */
  poster: ImageSlot
  /** The scene's "up" direction (COLMAP's axes are arbitrary) */
  up: Vec3
  start: TourView
  /** Jump-to buttons */
  spots: (TourView & { id: string; label: string })[]
  /**
   * Where the camera may go. The splat only looks right near where the drone flew, so the camera is
   * held inside that band (and inside the room). Ranges are measured along `up`, `a` and `b`
   * (orthonormal, `a`/`b` horizontal), in scene units.
   */
  bounds: {
    a: Vec3
    b: Vec3
    camera: { h: [number, number]; a: [number, number]; b: [number, number] }
    /** The point the camera orbits around */
    target: { h: [number, number]; a: [number, number]; b: [number, number] }
    /** Zoom limits: distance from camera to target */
    distance: [number, number]
    /** Tilt limits in degrees from straight down (0) to straight up (180) */
    tilt: [number, number]
  }
}

export interface Facility {
  /** Carousel of the floor */
  gallery: ImageSlot[]
  highlights: Highlight[]
  rules: GymRule[]
  /** Replaces the hero video on The Gym page when present */
  tour3d?: FloorTour3D
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
      g('gallery-dumbbells', 'Racks of dumbbells and Skelcore plate-loaded machines on the Stoik Gym floor', '27% 50%'),
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
    rules: [
      { title: 'Be respectful', text: 'Treat the gym like your home, and the members like your family.' },
      { text: 'Wear proper footwear and clothing in the gym.' },
      { text: 'Re-rack your weights correctly.' },
      { text: "Don't slam the weights." },
      { text: 'Clean machines and benches after use.' },
      { text: "No illegal substances or needles. Don't put the gym in jeopardy." },
      { text: "No vaping or smoking in the gym, and don't come into the gym smelling like cigarettes or marijuana." },
      { text: 'Filming on phones and use of tripods is allowed, but be considerate of others.' },
      { text: 'Shirts stay on, unless you are filming or posing. Please get permission if you want to work out shirtless.' },
      { text: 'Mix supplement powders at the front desk or in the lobby.' },
      { text: 'Maintain good hygiene. Body odor will be addressed.' },
      { text: 'Guests must purchase guest passes at the front desk.' },
      { title: 'Report issues', text: 'Let staff know about broken equipment, injuries or any other issues.' },
      { title: 'Train with purpose', text: 'No loitering.' },
      { title: 'Locker use', text: 'Lockers are day-use only. No overnight storage. Anything left in lockers overnight will be disposed of.' },
      { title: 'Check-in required', text: 'Always scan in at the front desk.' },
      { title: '3-strike rule', text: 'Memberships will be revoked beyond 2 warnings.' },
      { text: 'Stoik Gym is 18+, unless you get permission.' },
    ],
    tour3d: {
      // Off until the reconstruction stops ghosting (see CLAUDE.md, 3D floor tour). Flip to true to test.
      enabled: false,
      scene: 'media/3d/roseville.ksplat',
      sizeMb: 24,
      poster: {
        kind: 'image',
        src: 'media/tour-poster',
        alt: 'The Stoik Gym Roseville training floor from above',
        label: '3D tour start view',
        aspect: '16 / 9',
      },
      up: [0.903, -0.317, -0.29],
      start: { position: [-2.963, 0.901, -9.04], lookAt: [-2.322, 0.269, -6.178] },
      spots: [
        { id: 'overview', label: 'Overview', position: [-2.963, 0.901, -9.04], lookAt: [-2.322, 0.269, -6.178] },
        { id: 'dumbbells', label: 'Dumbbells', position: [0.447, -0.926, 2.368], lookAt: [-1.004, -0.368, -0.198] },
        { id: 'strength', label: 'Strength floor', position: [-0.414, 3.998, -5.056], lookAt: [-1.472, 1.414, -3.958] },
        { id: 'cardio', label: 'Cardio', position: [-0.113, -1.936, 1.273], lookAt: [0.506, -1.634, 4.193] },
        { id: 'desk', label: 'Front desk', position: [0.073, -1.04, 1.311], lookAt: [-1.365, -3.66, 1.046] },
      ],
      // Floor ≈ -2.1, ceiling ≈ 0.95; the drone flew between ≈ -0.9 and 0.5 (from the COLMAP poses)
      bounds: {
        a: [0.15, -0.4, 0.904],
        b: [-0.402, -0.86, -0.313],
        camera: { h: [-0.75, 0.6], a: [-11.5, 5.2], b: [-3.1, 3.7] },
        target: { h: [-2.0, 0.4], a: [-6, 9.2], b: [-5, 6] },
        distance: [0.4, 4.5],
        tilt: [30, 100],
      },
    },
  },
}

export const getFacility = (slug: string): Facility | undefined => facilities[slug]
