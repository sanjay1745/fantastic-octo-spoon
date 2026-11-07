// Derive the 3D tour config (up axis, room axes, camera bounds, jump-to spots) from a COLMAP model,
// and sanity-check the camera poses.
//
//   colmap model_converter --input_path <model> --output_path <txt_dir> --output_type TXT
//   node scripts/tour-from-colmap.mjs <txt_dir> [--spots=overview:f_0001.jpg,dumbbells:f_0113.jpg,...] [--out=room.json]
//
// Prints a `tour3d` snippet for src/data/facilities.ts and (with --out) writes the room frame + crop used by
// scripts/splat-to-ksplat.mjs --room=<file>.
//
// Pose check: consecutive video frames should move a little each time. A large jump is either a hard cut in
// the video (expected for edited footage) or part of the flight placed in the wrong spot (shows up as ghosted,
// doubled geometry after training). Look at the frames either side of each jump to tell which.
import fs from 'node:fs'

const [dir, ...rest] = process.argv.slice(2)
if (!dir) {
  console.error('Usage: node scripts/tour-from-colmap.mjs <colmap_txt_dir> [--spots=label:frame,...] [--out=room.json]')
  process.exit(1)
}
const opt = Object.fromEntries(rest.map((a) => a.replace(/^--/, '').split('=')))

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const sub = (a, b) => a.map((v, i) => v - b[i])
const add = (a, b) => a.map((v, i) => v + b[i])
const mul = (a, s) => a.map((v) => v * s)
const norm = (v) => mul(v, 1 / Math.hypot(...v))
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const pct = (arr, p) => {
  const s = Float64Array.from(arr).sort()
  return s[Math.floor((s.length - 1) * p)]
}
const r3 = (v) => Math.round(v * 1000) / 1000
const rot = (w, x, y, z) => [
  [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
  [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
  [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
]
const RtV = (R, v) => [0, 1, 2].map((j) => R[0][j] * v[0] + R[1][j] * v[1] + R[2][j] * v[2])

// Cameras: center C = -Rᵀt, forward = Rᵀ·z, image-down = Rᵀ·y
const cams = new Map()
const lines = fs.readFileSync(`${dir}/images.txt`, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'))
for (let i = 0; i < lines.length; i += 2) {
  const p = lines[i].split(' ')
  if (p.length < 10) continue
  const [w, x, y, z, tx, ty, tz] = p.slice(1, 8).map(Number)
  const R = rot(w, x, y, z)
  cams.set(p[9], { C: mul(RtV(R, [tx, ty, tz]), -1), fwd: RtV(R, [0, 0, 1]), down: RtV(R, [0, 1, 0]) })
}
const points = fs
  .readFileSync(`${dir}/points3D.txt`, 'utf8')
  .split('\n')
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.split(' ').slice(1, 4).map(Number))
console.log(`cameras ${cams.size}, points ${points.length}`)

// Up = opposite of the average image-down direction (drone stays roughly level)
const list = [...cams.values()]
const up = norm(mul(list.reduce((s, c) => add(s, c.down), [0, 0, 0]), -1))
// Horizontal axes aligned with the main direction of the flight path (PCA)
const mean = mul(list.reduce((s, c) => add(s, c.C), [0, 0, 0]), 1 / list.length)
const t0 = norm(cross(up, Math.abs(up[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]))
const t1 = cross(up, t0)
let sxx = 0, syy = 0, sxy = 0
for (const c of list) {
  const r = sub(c.C, mean), x = dot(r, t0), y = dot(r, t1)
  sxx += x * x; syy += y * y; sxy += x * y
}
const th = 0.5 * Math.atan2(2 * sxy, sxx - syy)
const a = norm(add(mul(t0, Math.cos(th)), mul(t1, Math.sin(th))))
const b = cross(up, a)

// Pose sanity: steps between consecutive frames
const ordered = [...cams.entries()].sort(([x], [y]) => x.localeCompare(y, 'en', { numeric: true }))
const steps = ordered.slice(1).map(([name, c], i) => ({ name, d: Math.hypot(...sub(c.C, ordered[i][1].C)) }))
const median = pct(steps.map((s) => s.d), 0.5)
const jumps = steps.filter((s) => s.d > median * 25).sort((x, y) => y.d - x.d)
console.log(`median step ${r3(median)}; jumps > 25× median: ${jumps.length}${jumps.length ? ' → ' + jumps.slice(0, 8).map((j) => `${j.name}:${r3(j.d)}`).join(' ') : ''}`)
if (jumps.length) console.log('Check the frames either side of each jump: a different view means a video cut (fine); the same view means a misplaced pose (ghosting).')

// Room extents along (up, a, b)
const H = (p) => dot(p, up), A = (p) => dot(p, a), B = (p) => dot(p, b)
const ph = points.map(H), pa = points.map(A), pb = points.map(B)
const ch = list.map((c) => H(c.C)), ca = list.map((c) => A(c.C)), cb = list.map((c) => B(c.C))
const floor = pct(ph, 0.01), ceiling = pct(ph, 0.99)
const room = {
  up: up.map(r3), a: a.map(r3), b: b.map(r3),
  crop: {
    h: [r3(floor - 0.1), r3(ceiling + 0.05)],
    a: [r3(Math.min(pct(pa, 0.005), Math.min(...ca)) - 0.3), r3(Math.max(pct(pa, 0.995), Math.max(...ca)) + 0.3)],
    b: [r3(Math.min(pct(pb, 0.005), Math.min(...cb)) - 0.3), r3(Math.max(pct(pb, 0.995), Math.max(...cb)) + 0.3)],
  },
}
console.log(`floor ${r3(floor)}, ceiling ${r3(ceiling)}; drone height 5–95%: ${r3(pct(ch, 0.05))} … ${r3(pct(ch, 0.95))}`)

const view = (name) => {
  const c = cams.get(name)
  if (!c) throw new Error(`frame ${name} not in model`)
  return { position: c.C.map(r3), lookAt: add(c.C, mul(c.fwd, 3)).map(r3) }
}
const spots = (opt.spots ?? '').split(',').filter(Boolean).map((s) => {
  const [id, frame] = s.split(':')
  return { id, ...view(frame) }
})
const margin = (lo, hi, m) => [r3(lo - m), r3(hi + m)]
const snippet = {
  up: room.up,
  start: spots[0] ? { position: spots[0].position, lookAt: spots[0].lookAt } : undefined,
  spots,
  bounds: {
    a: room.a,
    b: room.b,
    // Camera stays in the band the drone flew (where the splat looks right), with a small margin
    camera: { h: margin(pct(ch, 0.02), Math.min(pct(ch, 0.98), ceiling - 0.2), 0.1), a: margin(pct(ca, 0.01), pct(ca, 0.99), 0.2), b: margin(pct(cb, 0.01), pct(cb, 0.99), 0.2) },
    target: { h: [r3(floor + 0.1), r3(ceiling - 0.3)], a: room.crop.a, b: room.crop.b },
    distance: [0.4, 4.5],
    tilt: [30, 100],
  },
}
console.log('\ntour3d (paste into facilities.ts):\n' + JSON.stringify(snippet, null, 2))
if (opt.out) {
  fs.writeFileSync(opt.out, JSON.stringify(room, null, 1))
  console.log(`\nwrote ${opt.out}`)
}
