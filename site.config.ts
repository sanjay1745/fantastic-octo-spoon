/**
 * Where the site is hosted. THIS IS THE ONE SETTING TO CHANGE when stoikgym.com is connected:
 *
 *   GitHub Pages (now):   origin: 'https://sanjay1745.github.io',  base: '/fantastic-octo-spoon/'
 *   Custom domain:        origin: 'https://stoikgym.com',          base: '/'
 *                         (and add a public/CNAME file containing `stoikgym.com`)
 *
 * Everything else (asset URLs, router basename, canonical URLs, sitemap, Open Graph, JSON-LD)
 * is derived from these two values.
 */
export const siteConfig = {
  origin: 'https://sanjay1745.github.io',
  base: '/fantastic-octo-spoon/',
} as const
