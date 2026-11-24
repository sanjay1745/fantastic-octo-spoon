import { useEffect, useRef, useState } from 'react'
import Carousel from '../components/Carousel'
import SectionHeader from '../components/SectionHeader'
import SmartLink from '../components/SmartLink'
import { type Location, primaryLocation } from '../data/locations'
import { site } from '../data/site'
import { fetchGoogleReviews, type GoogleReview, type GoogleReviewsResult } from '../lib/googleReviews'
import styles from './GoogleReviews.module.css'

/**
 * Live, positive Google reviews in a carousel.
 * Hidden until `site.googleMapsApiKey` and the location's `googlePlaceId` are set,
 * and whenever Google returns nothing usable (so visitors never see an empty or broken block).
 * Loads Google's script only when the section is about to scroll into view.
 *
 * Dev only: add `?reviews=sample` to the URL to preview the design with labeled sample cards.
 */
interface Props {
  location?: Location
  eyebrow?: string
  title?: string
}

export default function GoogleReviews({ location = primaryLocation, eyebrow = 'Reviews', title = 'Members say it best.' }: Props) {
  const sentinel = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<GoogleReviewsResult | null>(null)

  const apiKey = site.googleMapsApiKey
  const placeId = location.googlePlaceId

  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('reviews') === 'sample') {
      let live = true
      Promise.resolve().then(() => live && setData(devSample()))
      return () => {
        live = false
      }
    }
    const el = sentinel.current
    if (!apiKey || !placeId || !el) return

    let cancelled = false
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        fetchGoogleReviews(apiKey, placeId)
          .then((res) => !cancelled && setData(res))
          .catch((err) => {
            if (import.meta.env.DEV) console.warn('[GoogleReviews]', err)
          })
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [apiKey, placeId])

  if (!data || data.reviews.length === 0) {
    // Invisible marker the observer watches; renders nothing visible.
    return apiKey && placeId ? <div ref={sentinel} aria-hidden="true" /> : null
  }

  const summary =
    data.rating !== undefined && data.total !== undefined
      ? `${data.rating.toFixed(1)} out of 5 from ${data.total.toLocaleString('en-US')} Google reviews.`
      : undefined

  return (
    <section className={`section ${styles.section}`} aria-labelledby="reviews-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeader eyebrow={eyebrow} id="reviews-title" title={title} lead={summary} />
          {data.mapsUrl && (
            <SmartLink href={data.mapsUrl} className={styles.all}>
              See all reviews on Google
            </SmartLink>
          )}
        </div>
      </div>

      <Carousel
        label={`Google reviews of ${site.name} ${location.name}`}
        noun="reviews"
        slideClassName={styles.slide}
        slides={data.reviews.map((r) => ({ key: r.id, node: <ReviewCard review={r} /> }))}
      />

      <div className="container">
        <p className={styles.attribution}>Reviews from Google Maps</p>
      </div>
    </section>
  )
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <p className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" aria-hidden="true" className={n <= full ? styles.on : styles.off}>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </p>
  )
}

function ReviewCard({ review: r }: { review: GoogleReview }) {
  const initial = r.author.trim().charAt(0).toUpperCase()
  return (
    <figure className={styles.card}>
      <Stars rating={r.rating} />
      <blockquote className={styles.quote}>
        <p>{r.text}</p>
      </blockquote>
      <figcaption className={styles.author}>
        {r.authorPhoto ? (
          <img src={r.authorPhoto} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" className={styles.avatar} />
        ) : (
          <span className={styles.avatar} aria-hidden="true">
            {initial}
          </span>
        )}
        <span className={styles.who}>
          {r.authorUrl ? (
            <SmartLink href={r.authorUrl} className={styles.name}>
              {r.author}
            </SmartLink>
          ) : (
            <span className={styles.name}>{r.author}</span>
          )}
          {r.when && <span className={styles.when}>{r.when}</span>}
        </span>
      </figcaption>
      {r.url && (
        <SmartLink href={r.url} className={styles.readMore}>
          Read on Google
        </SmartLink>
      )}
    </figure>
  )
}

/** Dev-only preview data. Clearly fake; stripped from production builds. */
function devSample(): GoogleReviewsResult {
  const lengths = [
    'SAMPLE REVIEW (dev preview only). A short one-line review.',
    'SAMPLE REVIEW (dev preview only). A medium-length review that runs a couple of lines, to check how the card handles typical text from Google.',
    'SAMPLE REVIEW (dev preview only). A long review to check clamping. '.repeat(6),
    'SAMPLE REVIEW (dev preview only). Another medium review with a few sentences in it. It should sit neatly next to the others.',
  ]
  return {
    rating: 4.9,
    total: 123,
    mapsUrl: 'https://maps.google.com',
    reviews: lengths.map((text, i) => ({ id: `sample-${i}`, rating: 5, text, author: `Sample Reviewer ${i + 1}`, when: `${i + 1} weeks ago` })),
  }
}
