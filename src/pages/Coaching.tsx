import Button from '../components/Button'
import CoachGrid, { TeamStoikLogo } from '../components/CoachGrid'
import FaqList from '../components/FaqList'
import Media from '../components/Media'
import PageHero from '../components/PageHero'
import SectionHeader, { Eyebrow } from '../components/SectionHeader'
import SmartLink from '../components/SmartLink'
import TestimonialCard from '../components/TestimonialCard'
import { type Club, clubs, coachingTiers, formatSession, getClub, onlineCoaching, personalTraining } from '../data/coaching'
import { faqsFor } from '../data/faq'
import { media } from '../data/media'
import { testimonials } from '../data/testimonials'
import { consultFor } from '../lib/cta'
import FinalCta from '../sections/FinalCta'
import styles from './Coaching.module.css'

const jump = [
  { href: '#personal-training', label: 'Personal training' },
  { href: '#online-coaching', label: 'Online coaching' },
  { href: '#clubs', label: 'Clubs' },
  { href: '#stories', label: 'Results' },
  { href: '#team', label: 'The team' },
]

const delay = (i: number) => ({ ['--reveal-delay' as string]: `${i * 120}ms` })

function ClubCard({ club, index }: { club: Club; index: number }) {
  const tier = coachingTiers.find((t) => t.id === club.includedWith)!
  return (
    <article className={styles.club} data-reveal style={delay(index)}>
      <Media slot={club.image} className={styles.clubMedia} sizes="(min-width: 900px) 45vw, 100vw" />
      <div className={styles.clubBody}>
        <h3 className="h3">{club.name}</h3>
        <ul role="list" className={styles.schedule} aria-label={`${club.name} schedule`}>
          {club.schedule.map((s) => (
            <li key={s.day}>{formatSession(s)}</li>
          ))}
        </ul>
        <p className="muted">{club.summary}</p>

        <div className={styles.clubPrice}>
          <p>
            <span className={styles.free}>Free</span>{' '}
            <span className={styles.freeWith}>
              {club.exclusive ? `for ${tier.name.toLowerCase()} clients` : `with ${tier.name.toLowerCase()}`}
            </span>
          </p>
          {club.price !== null ? (
            <p className={styles.solo}>Or ${club.price}/mo on its own</p>
          ) : (
            <p className={styles.solo}>Exclusive to Team Stoik contest prep clients</p>
          )}
        </div>

        <div className={styles.clubActions}>
          <Button href={consultFor(tier.id)} variant="light" arrow>
            {club.exclusive ? `Apply for ${tier.name.toLowerCase()}` : `Get ${club.name} with coaching`}
          </Button>
          {club.price !== null && (
            <SmartLink href={consultFor(club.id)} className={styles.textLink}>
              Join {club.name} only
            </SmartLink>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Coaching() {
  return (
    <>
      <PageHero
        top={<TeamStoikLogo />}
        image={media.coachingHero}
        eyebrow="Coaching"
        title="Coached to a higher standard."
        lead="Train one-on-one, get coached online, or train with the group. Every path is led by Team Stoik."
      >
        <div className={styles.heroActions}>
          <Button href={consultFor('coaching')} variant="light" size="lg" arrow>
            Book a free consultation
          </Button>
        </div>
        <nav aria-label="On this page" className={styles.jump}>
          {jump.map((j) => (
            <a key={j.href} href={j.href}>
              {j.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Personal training */}
      <section id="personal-training" className="section" aria-labelledby="pt-title">
        <div className={`container ${styles.split}`}>
          <Media slot={personalTraining.image} className={styles.splitMedia} sizes="(min-width: 900px) 45vw, 100vw" />
          <div className={styles.splitBody} data-reveal>
            <Eyebrow>In person</Eyebrow>
            <h2 id="pt-title" className="h2">
              {personalTraining.name}.
            </h2>
            <p className="lead">{personalTraining.summary}</p>
            <p className="muted">{personalTraining.body}</p>
            <ul role="list" className={styles.points}>
              {personalTraining.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <Button href={consultFor('personal-training')} variant="light" arrow>
                Book a consultation
              </Button>
              <p className={styles.priceNote}>Pricing is shared at your free consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Online coaching */}
      <section id="online-coaching" className={`section ${styles.online}`} aria-labelledby="online-title">
        <div className="container">
          <SectionHeader eyebrow="Online" id="online-title" title={`${onlineCoaching.name}.`} lead={onlineCoaching.summary} />
          <div className={styles.tiers}>
            {coachingTiers.map((t, i) => {
              const club = getClub(t.club)
              return (
                <article key={t.id} className={styles.tier} data-reveal style={delay(i)}>
                  <Media slot={t.image} className={styles.tierMedia} sizes="(min-width: 900px) 45vw, 100vw" />
                  <div className={styles.tierBody}>
                    <p className={styles.kicker}>{t.forWho}</p>
                    <h3 className="h3">{t.name}</h3>
                    <p className="muted">{t.summary}</p>
                    <ul role="list" className={styles.points}>
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <a href="#clubs" className={styles.perk}>
                      <span className={styles.perkLabel}>Included free</span>
                      <span className={styles.perkName}>{club.name}</span>
                      <span className={styles.perkWhen}>{club.schedule.map(formatSession).join(' · ')}</span>
                    </a>
                    <div className={styles.tierCta}>
                      <Button href={consultFor(t.id)} variant="light" arrow>
                        Apply for {t.name.toLowerCase()}
                      </Button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <p className={styles.priceNote}>Every coaching plan is built around you, so pricing is shared at a free consultation.</p>
        </div>
      </section>

      {/* Clubs */}
      <section id="clubs" className="section" aria-labelledby="clubs-title">
        <div className="container">
          <SectionHeader
            eyebrow="Clubs"
            id="clubs-title"
            title={
              <>
                <span className={styles.line}>Train together.</span> <span className={styles.line}>Free with coaching.</span>
              </>
            }
            lead="In-person group sessions at Stoik Gym, led by Team Stoik coaches and included with online coaching."
          />
          <div className={styles.clubs}>
            {clubs.map((c, i) => (
              <ClubCard key={c.id} club={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Client stories */}
      <section id="stories" className={`section ${styles.storiesSection}`} aria-labelledby="stories-title">
        <div className="container">
          <SectionHeader eyebrow="Results" id="stories-title" title="In their words." lead="Coaching clients on what changed, in the gym and out of it." />
          <ul role="list" className={styles.stories}>
            {testimonials.map((t, i) => (
              <li key={t.id} data-reveal style={delay(i % 3)}>
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section id="team" className={`section ${styles.team}`} aria-labelledby="team-title">
        <div className="container">
          <SectionHeader eyebrow="The team" id="team-title" title="Your coaches." />
          <CoachGrid link={false} />
        </div>
      </section>

      <section className={`section ${styles.faq}`} aria-labelledby="coaching-faq-title">
        <div className={`container ${styles.faqGrid}`}>
          <SectionHeader eyebrow="FAQ" id="coaching-faq-title" title="Coaching questions." />
          <FaqList items={faqsFor('coaching')} />
        </div>
      </section>

      <FinalCta
        title="Start with a free consultation."
        lead="Tell us your goals. We'll match you with the right coach and the right plan."
        primary={{ href: consultFor('coaching'), label: 'Book a free consultation' }}
        join={false}
        image={media.coachingGroup}
      />
    </>
  )
}
