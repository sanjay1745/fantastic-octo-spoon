// Post-build step: renders every route to static HTML, then writes 404.html, sitemap.xml and robots.txt.
// Runs after `vite build` (client → dist/) and `vite build --ssr` (renderer → dist-ssr/).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, pages, notFound, sitemapUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// Preload the display font so the hero headline doesn't swap late.
const assetsDir = path.join(dist, 'assets')
const displayFont = fs.readdirSync(assetsDir).find((f) => /^archivo-latin-wdth-normal.*\.woff2$/.test(f))
if (displayFont) {
  const base = template.match(/src="([^"]*)assets\//)?.[1] ?? '/'
  template = template.replace(
    '<!--app-head-->',
    `<link rel="preload" href="${base}assets/${displayFont}" as="font" type="font/woff2" crossorigin />\n    <!--app-head-->`,
  )
}

function write(file, head, html) {
  const out = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, out)
}

const list = pages()
for (const page of list) {
  const file = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path, 'index.html')
  write(file, page.head, render(page.path))
}
write(path.join(dist, '404.html'), notFound.head, render('/__not-found__'))

const today = new Date().toISOString().slice(0, 10)
const urls = list
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${sitemapUrl(p.path)}</loc><lastmod>${today}</lastmod></url>`)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl('/').replace(/\/$/, '')}/sitemap.xml\n`)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${list.length} pages + 404.html, sitemap.xml, robots.txt`)
