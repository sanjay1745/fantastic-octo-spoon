import { coaches } from '../data/coaches'
import { asset } from '../lib/url'
import Button from './Button'
import styles from './CoachGrid.module.css'
import Media from './Media'

interface Props {
  /** Show the "Meet the coaches" link (hide it on the coaching page itself) */
  link?: boolean
}

/** Team Stoik roster with portraits. */
export default function CoachGrid({ link = true }: Props) {
  return (
    <div className={styles.team}>
      <div className={styles.head} data-reveal>
        <h3 className={styles.title}>
          <img src={asset('brand/team-stoik.webp')} alt="Team Stoik" width={720} height={170} loading="lazy" decoding="async" />
        </h3>
        {link && (
          <Button href="/coaching" variant="ghost" size="sm" arrow>
            Meet the coaches
          </Button>
        )}
      </div>
      <ul role="list" className={styles.grid}>
        {coaches.map((c, i) => (
          <li key={c.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 6) * 60}ms` }}>
            <Media slot={c.photo} className={styles.portrait} sizes="(min-width: 1100px) 16vw, (min-width: 640px) 30vw, 45vw" />
            <p className={styles.name}>{c.name}</p>
            <p className={styles.role}>{c.role}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
