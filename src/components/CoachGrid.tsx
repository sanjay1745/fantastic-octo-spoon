import { coaches } from '../data/coaches'
import { asset } from '../lib/url'
import Button from './Button'
import styles from './CoachGrid.module.css'
import Media from './Media'

/** The Team Stoik wordmark (official artwork, PNG source). */
export function TeamStoikLogo({ className }: { className?: string }) {
  return (
    <img
      className={[styles.logo, className].filter(Boolean).join(' ')}
      src={asset('brand/team-stoik.webp')}
      alt="Team Stoik"
      width={720}
      height={170}
      decoding="async"
    />
  )
}

interface Props {
  /** Show the "Meet the coaches" link (hide it on the coaching page itself) */
  link?: boolean
}

/** Team Stoik roster with portraits. */
export default function CoachGrid({ link = true }: Props) {
  return (
    <div>
      <ul role="list" className={styles.grid}>
        {coaches.map((c, i) => (
          <li key={c.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 7) * 60}ms` }}>
            <Media slot={c.photo} className={styles.portrait} sizes="(min-width: 1100px) 14vw, (min-width: 640px) 30vw, 45vw" />
            <p className={styles.name}>{c.name}</p>
            <p className={styles.role}>{c.role}</p>
          </li>
        ))}
      </ul>
      {link && (
        <div className={styles.more}>
          <Button href="/coaching#team" variant="ghost" size="sm" arrow>
            Meet the coaches
          </Button>
        </div>
      )}
    </div>
  )
}
