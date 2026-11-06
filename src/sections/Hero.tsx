import { useEffect, useRef } from 'react'
import Button from '../components/Button'
import Logo from '../components/Logo'
import { Eyebrow } from '../components/SectionHeader'
import { formatHours, primaryLocation } from '../data/locations'
import { media } from '../data/media'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { tourHref } from '../lib/cta'
import { asset } from '../lib/url'
import styles from './Hero.module.css'

export default function Hero() {
  const video = media.heroVideo
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  // Reduced motion: keep the poster frame, don't autoplay.
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduced) v.pause()
    else v.play().catch(() => {})
  }, [reduced])

  const loc = primaryLocation

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg}>
        {video.src ? (
          <video
            ref={ref}
            className={styles.video}
            muted
            loop
            playsInline
            preload="metadata"
            poster={video.poster ? asset(video.poster) : undefined}
            aria-label={video.alt}
          >
            {video.srcMobile && <source src={asset(video.srcMobile)} media="(max-width: 767px)" type="video/mp4" />}
            <source src={asset(video.src)} type="video/mp4" />
          </video>
        ) : (
          <div className={styles.placeholder} role="img" aria-label={`Placeholder: ${video.alt}`}>
            <Logo variant="icon" label={false} className={styles.bolt} />
            <span className={styles.placeholderTag}>Placeholder · {video.label}</span>
          </div>
        )}
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <Eyebrow>Premium boutique gym · {loc.address.city}, {loc.address.region}</Eyebrow>
        <h1 id="hero-title" className={`display ${styles.title}`}>
          Be Stoik.
        </h1>
        <p className={styles.lead}>
          Discipline, community and coaching that delivers results. This is where the standard is higher.
        </p>
        <div className={styles.ctas}>
          <Button href={tourHref} variant="light" size="lg" arrow>
            Book a free tour
          </Button>
          <Button href="/memberships" variant="ghost" size="lg">
            View memberships
          </Button>
        </div>
        <ul role="list" className={styles.meta}>
          {loc.hours.map((h) => (
            <li key={h.label}>
              <span>{h.label}</span> {formatHours(h)}
            </li>
          ))}
          <li>{loc.landmark}</li>
        </ul>
      </div>
    </section>
  )
}
