import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import FloorTour, { ExploreButton } from '../components/FloorTour'
import Logo from '../components/Logo'
import Media from '../components/Media'
import { Eyebrow } from '../components/SectionHeader'
import type { FloorTour3D } from '../data/facilities'
import { formatHours, primaryLocation } from '../data/locations'
import { media } from '../data/media'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { tourHref } from '../lib/cta'
import { asset } from '../lib/url'
import styles from './Hero.module.css'

interface Props {
  eyebrow?: string
  title?: ReactNode
  lead?: ReactNode
  /** Buttons under the lead. Defaults to the home page tour + memberships CTAs. */
  actions?: ReactNode
  /** Show the hours/landmark strip */
  meta?: boolean
  /** Interactive 3D floor. Replaces the video with its still and adds an "Explore in 3D" button. */
  tour?: FloorTour3D
}

/** Full-bleed hero: the tour video loop (Home), or a still that opens into the 3D floor (The Gym). */
export default function Hero({ eyebrow, title = 'Be Stoik.', lead, actions, meta = true, tour }: Props) {
  const video = media.heroVideo
  const ref = useRef<HTMLVideoElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)

  const closeTour = useCallback(() => {
    setTourOpen(false)
    // Return focus to the button that opened it
    requestAnimationFrame(() => ctasRef.current?.querySelector<HTMLButtonElement>('button')?.focus())
  }, [])

  // The poster image is the first paint (and LCP). The video starts after hydration
  // and fades in once frames are actually playing. Reduced motion: poster only.
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduced) v.pause()
    else v.play().catch(() => {})
  }, [reduced])

  const loc = primaryLocation

  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-tour-open={tourOpen ? '' : undefined}>
      <div className={styles.bg}>
        {tour ? (
          <Media slot={tour.poster} fill priority sizes="100vw" />
        ) : (
          <>
            {video.poster && (
              <Media
                slot={{ kind: 'image', src: video.poster, alt: '', label: '', aspect: '16 / 9' }}
                fill
                priority
                sizes="100vw"
              />
            )}
            {video.src ? (
              <video
                ref={ref}
                className={styles.video}
                data-playing={playing ? '' : undefined}
                muted
                loop
                playsInline
                preload="none"
                aria-label={video.alt}
                onPlaying={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
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
          </>
        )}
        <div className={styles.overlay} />
      </div>

      {tour && tourOpen && <FloorTour tour={tour} onClose={closeTour} />}

      <div className={`container ${styles.content}`} aria-hidden={tourOpen || undefined} inert={tourOpen || undefined}>
        <Eyebrow>{eyebrow ?? `Premium boutique gym · ${loc.address.city}, ${loc.address.region}`}</Eyebrow>
        <h1 id="hero-title" className={`display ${styles.title}`}>
          {title}
        </h1>
        <p className={styles.lead}>
          {lead ?? 'Discipline, community and coaching that delivers results. This is where the standard is higher.'}
        </p>
        <div className={styles.ctas} ref={ctasRef}>
          {actions ?? (
            <>
              <Button href={tourHref} variant="light" size="lg" arrow>
                Book a free tour
              </Button>
              <Button href="/memberships" variant="ghost" size="lg">
                View memberships
              </Button>
            </>
          )}
          {tour && <ExploreButton tour={tour} onOpen={() => setTourOpen(true)} />}
        </div>
        {meta && (
          <ul role="list" className={styles.meta}>
            {loc.hours.map((h) => (
              <li key={h.label}>
                <span>{h.label}</span> {formatHours(h)}
              </li>
            ))}
            {loc.landmark && <li>{loc.landmark}</li>}
          </ul>
        )}
      </div>
    </section>
  )
}
