import Button from '../components/Button'
import CoachGrid from '../components/CoachGrid'
import Media from '../components/Media'
import SectionHeader from '../components/SectionHeader'
import { media } from '../data/media'
import { consultHref } from '../lib/cta'
import styles from './Coaching.module.css'

const programs = [
  {
    id: 'in-person',
    eyebrow: 'In person',
    title: 'Personal training',
    points: ['One-on-one sessions on the Stoik Gym floor', 'Technique, programming and progression', 'Built around your goals and schedule'],
    image: media.coachingInPerson,
  },
  {
    id: 'online',
    eyebrow: 'Anywhere',
    title: 'Online coaching',
    points: ['Lifestyle and contest prep coaching', 'Free Fit Club or Bodybuilding Club access', 'Coached by the same team, wherever you train'],
    image: media.coachingOnline,
  },
]

export default function Coaching() {
  return (
    <section className={`section ${styles.coaching}`} aria-labelledby="coaching-title">
      <div className="container">
        <SectionHeader
          eyebrow="Coaching"
          id="coaching-title"
          title="Coaching that delivers results."
          lead="Our coaching team works with members in person and online. Clear programming, real accountability and feedback that moves you forward."
        />

        <div className={styles.programs}>
          {programs.map((p, i) => (
            <article key={p.id} className={styles.program} data-reveal style={{ ['--reveal-delay' as string]: `${i * 120}ms` }}>
              <Media slot={p.image} className={styles.programMedia} sizes="(min-width: 900px) 40vw, 100vw" />
              <div className={styles.programBody}>
                <p className={styles.kicker}>{p.eyebrow}</p>
                <h3 className="h3">{p.title}</h3>
                <ul role="list" className={styles.points}>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.consult} data-reveal>
          <p>Pricing is tailored to you and shared at a free consultation.</p>
          <Button href={consultHref} variant="light" arrow>
            Book a consultation
          </Button>
        </div>

        <div className={styles.team}>
          <CoachGrid />
        </div>
      </div>
    </section>
  )
}
