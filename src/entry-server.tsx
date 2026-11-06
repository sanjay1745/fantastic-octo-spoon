/**
 * Build-time renderer used by scripts/prerender.mjs. Not shipped to the browser.
 * Each route is rendered to static HTML so every page has its own title, meta and
 * Open Graph tags, and so GitHub Pages can serve deep links without a 404 redirect hack.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { absoluteUrl, basename } from './lib/url'
import { notFoundMeta, routes } from './routes'
import { renderHead } from './seo/head'

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={`${basename}${path}`} basename={basename || '/'}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export function pages() {
  return routes.map((r) => ({ path: r.path, head: renderHead(r.meta), noindex: !!r.meta.noindex }))
}

export const notFound = { path: '/404', head: renderHead(notFoundMeta) }

export function sitemapUrl(path: string): string {
  return absoluteUrl(path)
}
