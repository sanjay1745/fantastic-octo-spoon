// Turns full-resolution originals in /media into web-ready files in public/media/.
//   Images → <slot>-<width>.avif + .webp at each width in media.config.mjs
//   Hero video → compressed, muted MP4 loops (desktop 16:9 + mobile 9:16)
//
// Run: npm run media            (skips outputs that are newer than their source)
//      npm run media -- --force (rebuild everything)
//
// Video needs ffmpeg. It uses `ffmpeg` on your PATH, or set FFMPEG=/path/to/ffmpeg.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import { heroVideo, images, widths } from './media.config.mjs'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'media')
const outDir = path.join(root, 'public', 'media')
const force = process.argv.includes('--force')
const ffmpeg = process.env.FFMPEG || 'ffmpeg'
fs.mkdirSync(outDir, { recursive: true })

const mtime = (f) => (fs.existsSync(f) ? fs.statSync(f).mtimeMs : 0)
const fresh = (out, src) => !force && mtime(out) > mtime(src) && mtime(out) > mtime(path.join(root, 'scripts', 'media.config.mjs'))

function hasFfmpeg() {
  try {
    execFileSync(ffmpeg, ['-version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}
const canVideo = hasFfmpeg()
if (!canVideo) console.warn(`! ffmpeg not found (${ffmpeg}). Video stills and hero loops will be skipped.`)

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stoik-media-'))

for (const [slot, cfg] of Object.entries(images)) {
  const source = path.join(srcDir, cfg.file ?? cfg.video)
  if (!fs.existsSync(source)) {
    console.warn(`! ${slot}: missing source ${path.relative(root, source)}`)
    continue
  }
  const last = path.join(outDir, `${slot}-${widths.at(-1)}.webp`)
  if (fresh(last, source)) continue

  let input = source
  if (cfg.video) {
    if (!canVideo) continue
    input = path.join(tmp, `${slot}.png`)
    execFileSync(ffmpeg, ['-loglevel', 'error', '-y', '-ss', String(cfg.t), '-i', source, '-frames:v', '1', input])
  }

  const base = sharp(input).rotate()
  const { width: srcW } = await base.metadata()
  for (const w of widths) {
    const width = Math.min(w, srcW)
    const img = base.clone().resize({ width, withoutEnlargement: true })
    await img.clone().avif({ quality: 50, effort: 4 }).toFile(path.join(outDir, `${slot}-${w}.avif`))
    await img.clone().webp({ quality: 72 }).toFile(path.join(outDir, `${slot}-${w}.webp`))
  }
  console.log(`✓ ${slot}`)
}

if (canVideo) {
  const source = path.join(srcDir, heroVideo.file)
  for (const v of [heroVideo.desktop, heroVideo.mobile]) {
    const out = path.join(outDir, v.out)
    if (fresh(out, source)) continue
    execFileSync(ffmpeg, [
      '-loglevel', 'error', '-y', '-i', source,
      '-vf', `${v.vf},fps=30`,
      '-an',
      '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-crf', String(v.crf), '-maxrate', v.maxrate, '-bufsize', '3000k',
      '-movflags', '+faststart',
      out,
    ])
    console.log(`✓ ${v.out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`)
  }
}

fs.rmSync(tmp, { recursive: true, force: true })
