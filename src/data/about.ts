import { type ImageSlot } from './media'
import { site } from './site'

/** About page copy. Facts here (opening date, hometown) also feed JSON-LD. */
export const founding = {
  /** ISO year-month of the first location opening */
  date: '2025-07',
  label: 'July 2025',
  city: 'Roseville, CA',
}

export const story = {
  title: 'Built in Roseville.',
  lead: `${site.name} opened its first location in ${founding.city} in ${founding.label}.`,
  paragraphs: [
    `Founder ${site.founder.name} grew up in Roseville, training in all of the local gyms. He knew the area needed something different: a community hub for everyone who shares a love for fitness and constant improvement.`,
    'Since opening, the Stoik community has grown into an inviting atmosphere where people are motivated to reach their individual goals, and many have made life-changing transformations.',
  ],
}

export const mission =
  'Be humble in the times of glory, and stay focused in the times of defeat. Allow nothing to influence who you are or what you have set out to do. Be authentic, relentless, and unwavering in your pursuit of greatness.'

/** Words lit in silver in the mission statement */
export const missionEmphasis = ['humble', 'focused', 'authentic', 'relentless', 'unwavering']

const img = (src: string, alt: string, aspect: string, focus?: string): ImageSlot => ({ kind: 'image', src, alt, label: alt, aspect, focus })

export const aboutMedia = {
  founder: img('media/about-founder', `${site.founder.name} coaching a member on the Stoik Gym floor`, '4 / 5', '50% 35%'),
  community: img('media/about-community', 'Members training together on a busy night at Stoik Gym', '4 / 5', '50% 45%'),
}
