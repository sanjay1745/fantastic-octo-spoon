/** Brand-wide info that is not tied to a single location. */
export interface Social {
  id: 'instagram' | 'tiktok'
  label: string
  handle: string
  url: string
}

export const site = {
  name: 'Stoik Gym',
  shortName: 'Stoik',
  tagline: 'Be Stoik.',
  description:
    'Stoik Gym is a premium boutique gym in Roseville, CA. Premium coaching, a disciplined culture and a community that shows up. Book a free tour.',
  email: 'support@stoikgym.com',
  shopUrl: 'https://stoikathletix.com/',
  /**
   * Free tour booking link (ClubLifePro booking widget). Every "Book a free tour" CTA uses it.
   * Set to null to fall back to the on-site /contact page.
   */
  tourUrl: 'https://link.clublifepro.com/widget/booking/oY43OaIkWwVuXrB1QIhk' as string | null,
  /**
   * Coaching consultation form (ClubLifePro). Every "Book a consultation" CTA uses it.
   * Set to null to fall back to the on-site /contact page.
   */
  consultUrl: 'https://link.clublifepro.com/widget/form/nm4QLUVVZajiQcyjb5mB' as string | null,
  /**
   * Google Maps Platform browser key, used only to load live Google reviews (Places API).
   * This key ships to the browser by design. In Google Cloud, restrict it to:
   *   - Application restriction: websites → the site's domains (and localhost for dev)
   *   - API restriction: Maps JavaScript API + Places API (New)
   * TODO(owner): supply the key. While null, the reviews section is hidden.
   */
  googleMapsApiKey: null as string | null,
  founder: {
    name: 'Jeremy Buendia',
    title: "4x Men's Physique Olympia Champion",
  },
  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@stoik.gyms', url: 'https://www.instagram.com/stoik.gyms/' },
    { id: 'tiktok', label: 'TikTok', handle: '@stoik.gyms', url: 'https://www.tiktok.com/@stoik.gyms' },
  ] satisfies Social[],
}
