import type { ReactNode } from 'react'
import { locations, primaryLocation } from './data/locations'
import { site } from './data/site'
import Coaching from './pages/Coaching'
import Home from './pages/Home'
import LocationDetail from './pages/LocationDetail'
import Memberships from './pages/Memberships'
import Stub from './pages/Stub'
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
      description: `Skelcore equipment, a recovery room with sauna and two cold plunges, and a dedicated posing room. Inside ${site.name} ${primaryLocation.name}.`,
    },
    element: <Stub eyebrow="The Gym" title="Built for serious training." />,
  },
  {
    path: '/shop',
    label: 'Shop',
    meta: {
      path: '/shop',
      title: 'Shop',
      description: `Stoik apparel, supplements, drinks and meal prep from ${site.name}.`,
    },
    element: <Stub eyebrow="Shop" title="Fuel and gear." />,
  },
  {
    path: '/about',
    label: 'About',
    meta: {
      path: '/about',
      title: 'About',
      description: `The story behind ${site.name}, founded by ${site.founder.name}, and the team that makes it. ${site.tagline}`,
    },
    element: <Stub eyebrow="About" title={site.tagline} />,
  },
  {
    path: '/locations',
    label: 'Locations',
    meta: {
      path: '/locations',
      title: 'Locations',
      description: `${site.name} locations. Now open in ${city}. More coming soon.`,
    },
    element: <Stub eyebrow="Locations" title="Find your gym." />,
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
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Page not found',
  description: site.description,
  noindex: true,
}

/** Primary navigation, in order */
export const navRoutes = ['/memberships', '/coaching', '/the-gym', '/about', '/locations', '/shop']
  .map((p) => routes.find((r) => r.path === p)!)
  .map((r) => ({ to: r.path, label: r.label! }))

export function findRoute(pathname: string): AppRoute | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean)
}
