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
   * Free tour booking link. TODO(owner): supply the booking URL.
   * While null, every "Book a free tour" CTA routes to the on-site /contact page.
   */
  tourUrl: null as string | null,
  founder: {
    name: 'Jeremy Buendia',
    title: "4x Men's Physique Olympia Champion",
  },
  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@stoik.gyms', url: 'https://www.instagram.com/stoik.gyms/' },
    { id: 'tiktok', label: 'TikTok', handle: '@stoik.gyms', url: 'https://www.tiktok.com/@stoik.gyms' },
  ] satisfies Social[],
}
