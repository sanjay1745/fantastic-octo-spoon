import type { ReactNode } from 'react'
import { locations, primaryLocation } from './data/locations'
import { site } from './data/site'
import About from './pages/About'
import Coaching from './pages/Coaching'
import Home from './pages/Home'
import LocationDetail from './pages/LocationDetail'
import Locations from './pages/Locations'
import Privacy from './pages/Privacy'
import Reviews from './pages/Reviews'
import Memberships from './pages/Memberships'
import ExternalRedirect from './pages/ExternalRedirect'
import Stub from './pages/Stub'
import TheGym from './pages/TheGym'
import { healthClubJsonLd, organizationJsonLd, type PageMeta } from './seo/head'

export interface AppRoute {
  path: string
  /** Label used in navigation */
  label?: string
  meta: PageMeta
  element: ReactNode
}

const city = `${primaryLocation.address.city}, ${primaryLocation.address.region}`

export const routes: AppRoute[] = [
  {
    path: '/',
    meta: {
      path: '/',
      description: site.description,
      jsonLd: [organizationJsonLd(), ...locations.filter((l) => l.status === 'open').map(healthClubJsonLd)],
    },
    element: <Home />,
  },
  {
    path: '/memberships',
    label: 'Memberships',
    meta: {
      path: '/memberships',
      title: 'Memberships',
      description: `Membership plans, day passes and punch cards at ${site.name} in ${city}. Join online or book a free tour.`,
    },
    element: <Memberships />,
  },
  {
    path: '/coaching',
    label: 'Coaching',
    meta: {
      path: '/coaching',
      title: 'Personal Training & Online Coaching',
      description: `Personal training, lifestyle and contest prep online coaching, Fit Club and Bodybuilding Club with Team Stoik at ${site.name}. Book a free consultation.`,
    },
    element: <Coaching />,
  },
  {
    path: '/the-gym',
    label: 'The Gym',
    meta: {
      path: '/the-gym',
      title: 'The Gym',
      description: `60+ pieces of Skelcore equipment, a recovery room with infrared sauna and two cold plunges, a private posing room and a pro shop. Inside ${site.name} ${primaryLocation.name}.`,
    },
    element: <TheGym />,
  },
  {
    path: '/reviews',
    label: 'Reviews',
    meta: {
      path: '/reviews',
      title: 'Reviews',
      description: `What members say about ${site.name} in ${city}: Google reviews and coaching client stories.`,
    },
    element: <Reviews />,
  },
  {
    // Not a page: /shop forwards to the Shopify store (kept so old links and bios still work)
    path: '/shop',
    meta: {
      path: '/shop',
      title: 'Shop',
      description: `Stoik apparel on ${site.shopUrl.replace(/^https?:\/\/|\/$/g, '')}.`,
      noindex: true,
      redirect: site.shopUrl,
    },
    element: <ExternalRedirect to={site.shopUrl} label="the Stoik shop" />,
  },
  {
    path: '/about',
    label: 'About',
    meta: {
      path: '/about',
      title: 'About',
      description: `${site.name} opened in Roseville, CA in July 2025. Our story, our mission and the team behind it. ${site.tagline}`,
    },
    element: <About />,
  },
  {
    path: '/locations',
    label: 'Locations',
    meta: {
      path: '/locations',
      title: 'Locations',
      description: `${site.name} locations. Now open in ${city}. More coming soon.`,
    },
    element: <Locations />,
  },
  ...locations.map<AppRoute>((l) => ({
    path: `/locations/${l.slug}`,
    meta: {
      path: `/locations/${l.slug}`,
      title: `${l.name}, ${l.address.region}`,
      description: `${site.name} ${l.name}: ${l.address.street}, ${l.address.city}. Hours, directions and memberships.`,
      jsonLd: l.status === 'open' ? [healthClubJsonLd(l)] : [],
    },
    element: <LocationDetail location={l} />,
  })),
  {
    path: '/contact',
    label: 'Contact',
    meta: {
      path: '/contact',
      title: 'Book a Free Tour',
      description: `Book a free tour of ${site.name} in ${city}, or get in touch with our team.`,
    },
    element: <Stub eyebrow="Contact" title="Book a free tour." />,
  },
  {
    path: '/privacy',
    label: 'Privacy',
    meta: {
      path: '/privacy',
      title: 'Privacy Policy',
      description: `How the ${site.name} website collects and uses information, and the choices you have.`,
    },
    element: <Privacy />,
  },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Page not found',
  description: site.description,
  noindex: true,
}

export interface NavItem {
  to: string
  label: string
  /** Off-site link (opens the URL directly instead of routing) */
  external?: boolean
}

/** Primary navigation, in order */
export const navRoutes: NavItem[] = [
  ...['/memberships', '/coaching', '/the-gym', '/reviews', '/about', '/locations']
    .map((p) => routes.find((r) => r.path === p)!)
    .map((r) => ({ to: r.path, label: r.label! })),
  { to: site.shopUrl, label: 'Shop', external: true },
]

export function findRoute(pathname: string): AppRoute | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean)
}
