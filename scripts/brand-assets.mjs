// Generates favicon / app icon / default Open Graph image from the vector logos in src/assets/brand.
// Run: node scripts/brand-assets.mjs   (re-run only if the logo SVGs change)
import fs from 'node:fs'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
const p = (u) => fileURLToPath(u)

const src = new URL('../src/assets/brand/', import.meta.url)
const brand = new URL('../public/brand/', import.meta.url)
const read = (f) => fs.readFileSync(new URL(f, src), 'utf8')
const pathOf = (svg) => svg.match(/<path d="([^"]+)"/)[1]
const boxOf = (svg) => svg.match(/viewBox="0 0 (\d+) (\d+)"/).slice(1).map(Number)

const BG = '#0A0A0A'
const icon = read('icon.svg')
const [iw, ih] = boxOf(icon)

// Bolt centered on a rounded black square.
function iconSquare(size, { radius = 0.22, scale = 0.72 } = {}) {
  const s = (size * scale) / ih
  const x = (size - iw * s) / 2
  const y = (size - ih * s) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${size * radius}" fill="${BG}"/>
<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(5)})" fill="#fff" d="${pathOf(icon)}"/></svg>`
}

const pub = new URL('../public/', import.meta.url)
fs.writeFileSync(new URL('favicon.svg', pub), iconSquare(64) + '\n')
await sharp(Buffer.from(iconSquare(512, { radius: 0 }))).resize(180, 180).png().toFile(p(new URL('apple-touch-icon.png', pub)))
await sharp(Buffer.from(iconSquare(512))).resize(32, 32).png().toFile(p(new URL('favicon-32.png', pub)))
await sharp(Buffer.from(iconSquare(512, { radius: 0 }))).png().toFile(p(new URL('icon-512.png', brand)))

// Default Open Graph image: emblem centered on near-black, 1200x630.
const emblem = read('emblem.svg')
const [ew, eh] = boxOf(emblem)
const W = 1200, H = 630
const es = 300 / eh
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<defs><radialGradient id="g" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#1c1c1c"/><stop offset="1" stop-color="${BG}"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<path transform="translate(${((W - ew * es) / 2).toFixed(1)} ${((H - eh * es) / 2).toFixed(1)}) scale(${es.toFixed(5)})" fill="#fff" d="${pathOf(emblem)}"/></svg>`
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile(p(new URL('og-default.jpg', brand)))
console.log('brand assets written')

// Partner / sub-brand marks (PNG sources only): trimmed and resized for the web.
const logos = new URL('../logos/', import.meta.url)
await sharp(p(new URL('TEAMSTOIK_LOGO_WHITE.png', logos))).trim().resize({ width: 720 }).webp({ quality: 90 }).toFile(p(new URL('team-stoik.webp', brand)))
await sharp(p(new URL('Full Skelcore Logo (White).png', logos))).trim().resize({ width: 640 }).webp({ quality: 90 }).toFile(p(new URL('skelcore.webp', brand)))
console.log('partner logos written')
