import type { ImageSlot } from './media'

/**
 * Coaching client testimonials, supplied by the owner.
 * Text is the client's own words. Edits are limited to capitalization ("Stoik"), spacing and
 * removing emoji. Never invent or reword quotes.
 *
 * Before/after photos: when they arrive, run them through the media pipeline and set
 * `before.src` / `after.src` (e.g. 'media/story-isaac-before'). A pair shows only when both are set.
 */
export interface Testimonial {
  id: string
  name: string
  /** Short pull quote, verbatim from `story` */
  excerpt: string
  /** Full testimonial, one string per paragraph */
  story: string[]
  /** Program, e.g. "Online coaching", "Fit Club" */
  program: string
  /** Coaches credited on the card */
  coaches?: string[]
  /** Phrases to emphasize, each copied exactly from the excerpt or story */
  highlights?: string[]
  /** Shown in the home page Results section */
  featured?: boolean
  before: ImageSlot
  after: ImageSlot
}

const photo = (name: string, when: 'Before' | 'After'): ImageSlot => ({
  kind: 'image',
  src: null,
  alt: `${name}, ${when.toLowerCase()} coaching with Team Stoik`,
  label: `${when} · ${name} · 4:5`,
  aspect: '4 / 5',
})

const story = (t: Omit<Testimonial, 'before' | 'after'>): Testimonial => ({
  ...t,
  before: photo(t.name, 'Before'),
  after: photo(t.name, 'After'),
})

export const testimonials: Testimonial[] = [
  story({
    id: 'isaac-norman',
    name: 'Isaac Norman',
    program: 'First-time competitor',
    highlights: ['healthier, more disciplined, and more confident'],
    coaches: ['Michael Lopez', 'Jeremy Buendia'],
    featured: true,
    excerpt:
      'Being part of the Stoik community has played a huge role in my personal growth, helping me become a healthier, more disciplined, and more confident individual.',
    story: [
      'When I first came to Stoik, I was transitioning between different training styles. I had always been interested in bodybuilding, but I lacked the structure, direction, and consistency needed to truly pursue it.',
      'From the beginning, the coaches and community made me feel welcome and helped guide me toward achieving my goals. Being part of the Stoik community has played a huge role in my personal growth, helping me become a healthier, more disciplined, and more confident individual.',
      'One of the things I appreciate most about Stoik is the community itself. Everyone who walks through those doors is there to better themselves, while also supporting and encouraging those around them. It’s an environment where everyone genuinely wants to see each other succeed.',
      'The coaches have also been nothing short of outstanding. Michael and Jeremy, in particular, have played a major role in helping me transform my physique and push beyond what I once thought I was capable of achieving.',
      'I can’t thank the coaches and everyone who has become part of my Stoik family enough for making this bodybuilding journey such a rewarding and enjoyable experience. I’m grateful to be part of a community that pushes me to be better every day, and I’m excited to see what the future holds and what we can all accomplish together!',
    ],
  }),
  story({
    id: 'nik-santos',
    name: 'Nik Santos',
    program: 'Lifestyle coaching',
    highlights: ['greater results in this past month'],
    coaches: ['Michael Lopez', 'Jeremy Buendia'],
    featured: true,
    excerpt:
      'I can honestly say I’ve seen greater results in this past month than I was able to achieve on my own over the previous six months.',
    story: [
      'I’ve been training with Michael and Jeremy at Stoik for a little over a month now, and I can honestly say I’ve seen greater results in this past month than I was able to achieve on my own over the previous six months.',
      'The online coaching has been amazing and incredibly comprehensive. The workouts are well-structured and tailored to my goals, and Michael and Jeremy provide helpful tips to continually improve my form and technique. The nutrition guidance has also been a huge part of my progress — it goes beyond just calories and macros and even takes into consideration the vitamins and supplements I’m taking.',
      'One of the things I appreciate most is having knowledgeable coaches who are always accessible and willing to answer questions, troubleshoot workouts, and help me stay on track. The daily and weekly check-ins keep me accountable, and Michael uses that feedback to adjust my nutrition and workout plan based on my progress and goals.',
      'It’s only been a little over a month, and I’m already seeing a noticeable difference. I’m really excited to continue the program and see just how far I can take my results!',
    ],
  }),
  story({
    id: 'juan-magana',
    name: 'Juan Magana',
    program: 'Fit Club',
    highlights: ['life changing'],
    coaches: ['Michael Lopez', 'Jeremy Buendia'],
    featured: true,
    excerpt: 'Working with Stoik Fit Club has been life changing. Especially coach Michael Lopez. Incredibly knowledgeable. Always just a message away.',
    story: [
      'Working with Stoik Fit Club has been life changing. Especially coach Michael Lopez. Incredibly knowledgeable. Always just a message away. Responds to all of my questions no matter how dumb they can be sometimes. Helps me out in our training and motivates me even when I feel I’m not doing enough. It’s been a great experience so far and so glad I’m locked in for a year with him. No other gym can compare to the level of dedication and detail his coaching offers.',
    ],
  }),
  story({
    id: 'brian-bradford',
    name: 'Brian Bradford',
    program: 'Contest prep',
    highlights: ['the best physical shape of my life'],
    coaches: ['Michael Lopez', 'Jeremy Buendia'],
    excerpt: 'Jeremy and the entire Team Stoik staff pushed me, guided me, and helped me reach the best physical shape of my life.',
    story: [
      'Being part of Team Stoik has been an incredible experience, and I feel truly blessed and grateful for the opportunity to work alongside such talented and knowledgeable professionals.',
      'This experience has exceeded every expectation I had. Jeremy and the entire Team Stoik staff pushed me, guided me, and helped me reach the best physical shape of my life. Because of their knowledge, coaching, and belief in me, we experienced tremendous success on stage. Success I couldn’t have achieved without them.',
      'Team Stoik is more than just a team. It’s a family built on hard work, accountability, support, and the relentless pursuit of becoming your best version.',
      'Without hesitation, I’m signing up for another year with Team Stoik. I’m excited to keep learning, improving, and building on the success we’ve already created together. I’m incredibly grateful for this team, and I know the best is still ahead.',
    ],
  }),
  story({
    id: 'dominick-lee',
    name: 'Dominick Lee',
    program: 'Bodybuilding',
    coaches: ['Michael Lopez', 'Jeremy Buendia'],
    highlights: ['changed my mindset, confidence, and overall lifestyle'],
    excerpt: 'Being coached by Team Stoik not only changed my overall physique but also changed my mindset, confidence, and overall lifestyle.',
    story: [
      'Being coached by Team Stoik not only changed my overall physique but also changed my mindset, confidence, and overall lifestyle. The coaches are not just there to give me a workout regiment and a diet plan, but they are there beside me throughout the whole journey and process. They gave me a simple yet precise plan and in return I give them my discipline, dedication, relentless effort, and personal accountability in order to attain my goal and victory. So far it has yielded very expressive results that has helped me unlock my potential as an aspiring bodybuilder and as well as becoming a more well-rounded athlete.',
    ],
  }),
  story({
    id: 'jason-depuy',
    name: 'Jason Depuy',
    program: 'Coaching',
    highlights: ['none compare to Jeremy, Michael, and the entire Stoik family'],
    coaches: ['Michael Lopez', 'Jeremy Buendia'],
    excerpt: 'I’ve had coaches in the past, but none compare to Jeremy, Michael, and the entire Stoik family.',
    story: [
      'Since joining Stoik Gym and having Jeremy and Michael as my coaches, I’m finally starting to build the physique and confidence I’ve always wanted. I’ve had coaches in the past, but none compare to Jeremy, Michael, and the entire Stoik family. The knowledge, support, and accountability they provide are next level. I couldn’t be happier with the progress I’m making!',
    ],
  }),
]

export const featuredTestimonials = testimonials.filter((t) => t.featured)

/** True once both before and after photos are supplied */
export const hasPhotos = (t: Testimonial) => Boolean(t.before.src && t.after.src)

/** "Coached by Michael & Jeremy" (first names keep it to one line); "Coached by Team Stoik" when no coach is named. */
export function coachedBy(t: Testimonial): string {
  const first = (t.coaches ?? []).map((n) => n.split(' ')[0])
  if (!first.length) return 'Coached by Team Stoik'
  const names = first.length > 1 ? `${first.slice(0, -1).join(', ')} & ${first.at(-1)}` : first[0]
  return `Coached by ${names}`
}
