/**
 * Live Google reviews via the Maps JavaScript API (Places library, `Place.fetchFields`).
 *
 * - Browser only: call from an effect, never during render (pre-rendering runs without `window`).
 * - Fetched fresh on each page view, as Google's terms require (no storing review content).
 * - Google returns at most 5 reviews per place ("most relevant"); we keep the positive ones.
 * - Billing: each call is a Place Details request with the reviews field (Google Maps Platform pricing).
 */

/** Reviews at or above this star rating are shown */
export const MIN_RATING = 4

export interface GoogleReview {
  id: string
  rating: number
  text: string
  author: string
  authorUrl?: string
  authorPhoto?: string
  /** e.g. "2 weeks ago" */
  when?: string
  /** Link to this review on Google Maps, when Google provides one */
  url?: string
}

export interface GoogleReviewsResult {
  rating?: number
  total?: number
  /** The place on Google Maps (all reviews live here) */
  mapsUrl?: string
  reviews: GoogleReview[]
}

// Minimal shapes of the Google objects we touch (avoids pulling in @types/google.maps).
interface GAuthor {
  displayName?: string | null
  uri?: string | null
  photoURI?: string | null
}
interface GReview {
  rating?: number | null
  text?: string | null
  authorAttribution?: GAuthor | null
  relativePublishTimeDescription?: string | null
  publishTime?: Date | null
  googleMapsURI?: string | null
}
interface GPlace {
  rating?: number | null
  userRatingCount?: number | null
  googleMapsURI?: string | null
  reviews?: GReview[] | null
  fetchFields(req: { fields: string[] }): Promise<unknown>
}
interface GPlacesLib {
  Place: new (opts: { id: string }) => GPlace
}
interface GMaps {
  maps: { importLibrary(name: 'places'): Promise<GPlacesLib> }
}

const CALLBACK = '__stoikMapsReady'
let loader: Promise<GMaps> | null = null

/** Loads the Maps JavaScript API once per page. */
function loadMaps(apiKey: string): Promise<GMaps> {
  const w = window as unknown as Record<string, unknown> & { google?: GMaps }
  if (w.google?.maps?.importLibrary) return Promise.resolve(w.google)
  if (loader) return loader
  loader = new Promise<GMaps>((resolve, reject) => {
    w[CALLBACK] = () => (w.google ? resolve(w.google) : reject(new Error('Google Maps failed to load')))
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=${CALLBACK}`
    s.async = true
    s.onerror = () => {
      loader = null
      reject(new Error('Google Maps failed to load'))
    }
    document.head.appendChild(s)
  })
  return loader
}

export async function fetchGoogleReviews(apiKey: string, placeId: string): Promise<GoogleReviewsResult> {
  const google = await loadMaps(apiKey)
  const { Place } = await google.maps.importLibrary('places')
  const place = new Place({ id: placeId })
  await place.fetchFields({ fields: ['rating', 'userRatingCount', 'googleMapsURI', 'reviews'] })

  const reviews = (place.reviews ?? [])
    .filter((r) => (r.rating ?? 0) >= MIN_RATING && r.text?.trim())
    .map((r, i) => ({
      id: `${r.authorAttribution?.displayName ?? 'review'}-${r.publishTime?.valueOf() ?? i}`,
      rating: r.rating ?? MIN_RATING,
      text: r.text!.trim(),
      author: r.authorAttribution?.displayName ?? 'Google user',
      authorUrl: r.authorAttribution?.uri ?? undefined,
      authorPhoto: r.authorAttribution?.photoURI ?? undefined,
      when: r.relativePublishTimeDescription ?? undefined,
      url: r.googleMapsURI ?? undefined,
    }))

  return {
    rating: place.rating ?? undefined,
    total: place.userRatingCount ?? undefined,
    mapsUrl: place.googleMapsURI ?? undefined,
    reviews,
  }
}
