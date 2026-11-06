import Button from '../components/Button'
import Media from '../components/Media'
import SectionHeader from '../components/SectionHeader'
import { coaches } from '../data/coaches'
import { media } from '../data/media'
import { consultHref } from '../lib/cta'
import { asset } from '../lib/url'
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
    points: ['Programming built for your goals', 'Ongoing check-ins and adjustments', 'Coached by the same team, wherever you train'],
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
          <div className={styles.teamHead} data-reveal>
            <h3 className={styles.teamTitle}>
              <img src={asset('brand/team-stoik.webp')} alt="Team Stoik" width={720} height={170} loading="lazy" decoding="async" />
            </h3>
            <Button href="/coaching" variant="ghost" size="sm" arrow>
              Meet the coaches
            </Button>
          </div>
          <ul role="list" className={styles.coaches}>
            {coaches.map((c, i) => (
              <li key={c.slug} className={styles.coach} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 6) * 60}ms` }}>
                <Media slot={c.photo} className={styles.portrait} sizes="(min-width: 1100px) 16vw, (min-width: 640px) 30vw, 45vw" />
                <p className={styles.coachName}>{c.name}</p>
                <p className={styles.coachRole}>{c.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
