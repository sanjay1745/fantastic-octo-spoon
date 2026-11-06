import type { CSSProperties } from 'react'
import Button from '../components/Button'
import PhotoCard from '../components/PhotoCard'
import SectionHeader from '../components/SectionHeader'
import { amenities } from '../data/amenities'
import { media } from '../data/media'
import { asset } from '../lib/url'
import styles from './Amenities.module.css'

export default function Amenities() {
  return (
    <section className="section" aria-labelledby="amenities-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeader
            eyebrow="The gym"
            id="amenities-title"
            title="Everything you need. Nothing you don't."
            lead="Premium equipment, a full recovery room and the details serious lifters notice."
          />
          <div className={styles.partner} data-reveal>
            <span>Equipped by</span>
            <img src={asset('brand/skelcore.webp')} alt="Skelcore" width={640} height={115} loading="lazy" decoding="async" />
          </div>
        </div>

        <ul role="list" className={styles.grid}>
          {amenities.map((a, i) => (
            <li key={a.id} className={styles.item}>
              <PhotoCard
                title={a.title}
                blurb={a.blurb}
                image={media[a.media]}
                href={a.href}
                className={styles.card}
                style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties}
                // First and last cards span two columns in the desktop grid
                sizes={i === 0 || i === amenities.length - 1 ? '(min-width: 768px) 66vw, 80vw' : '(min-width: 768px) 33vw, 80vw'}
              />
            </li>
          ))}
        </ul>

        <div className={styles.more}>
          <Button href="/the-gym" variant="ghost" arrow>
            Explore the gym
          </Button>
        </div>
      </div>
    </section>
  )
}
