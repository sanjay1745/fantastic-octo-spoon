import Button from '../components/Button'
import CoachGrid from '../components/CoachGrid'
import Logo from '../components/Logo'
import Media from '../components/Media'
import PageHero from '../components/PageHero'
import ScrollRevealText from '../components/ScrollRevealText'
import SectionHeader, { Eyebrow } from '../components/SectionHeader'
import { aboutMedia, founding, mission, missionEmphasis, story } from '../data/about'
import { coaches } from '../data/coaches'
import { site } from '../data/site'
import { consultHref } from '../lib/cta'
import FinalCta from '../sections/FinalCta'
import styles from './About.module.css'

export default function About() {
  const facts = [
    { value: founding.label, label: `First location opened in ${founding.city}` },
    { value: String(coaches.length), label: 'Coaches on Team Stoik' },
    { value: '4x', label: `Men's Physique Olympia titles held by ${site.founder.name.split(' ')[0]}` },
  ]

  return (
    <>
      <PageHero eyebrow="About" title={story.title} lead={story.lead} />

      {/* Story */}
      <section className="section" aria-labelledby="story-title">
        <div className={`container ${styles.story}`}>
          <div className={styles.storyMedia} data-reveal>
            <Media slot={aboutMedia.founder} className={styles.photo} sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div className={styles.storyCopy} data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-title" className="h2">
              Something different.
            </h2>
            {story.paragraphs.map((p) => (
              <p key={p} className="lead">
                {p}
              </p>
            ))}
            <dl className={styles.facts}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Mission: signature scroll-lit statement */}
      <section className={`section ${styles.mission}`} aria-labelledby="mission-title">
        <div className="container">
          <Eyebrow>Our mission</Eyebrow>
          <h2 id="mission-title" className="visually-hidden">
            Our mission
          </h2>
          <ScrollRevealText text={mission} emphasis={missionEmphasis} className={styles.missionText} />
          <div className={styles.signoff} data-reveal>
            <Logo variant="icon" label={false} className={styles.bolt} />
            <p className={styles.tagline}>{site.tagline}</p>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className={`section ${styles.communitySection}`} aria-labelledby="community-title">
        <div className={`container ${styles.story} ${styles.flip}`}>
          <div className={styles.storyMedia} data-reveal>
            <Media slot={aboutMedia.community} className={styles.photo} sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div className={styles.storyCopy} data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <Eyebrow>Community</Eyebrow>
            <h2 id="community-title" className="h2">
              A room that expects your best.
            </h2>
            <p className="lead">
              Members come for the equipment and stay for the people. Everyone here is chasing something, and everyone pushes each other to get there.
            </p>
            <div className={styles.actions}>
              <Button href="/coaching" variant="light" arrow>
                Train with Team Stoik
              </Button>
              <Button href={consultHref} variant="ghost">
                Book a consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.team}`} aria-labelledby="team-title">
        <div className="container">
          <SectionHeader eyebrow="The team" id="team-title" title="The people behind it." />
          <CoachGrid />
        </div>
      </section>

      <FinalCta />
    </>
  )
}
