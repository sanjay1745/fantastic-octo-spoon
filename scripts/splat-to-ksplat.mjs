// Convert a trained Gaussian splat (.ply, e.g. from Brush) into a compressed .ksplat for the web viewer.
//
//   node --max-old-space-size=12288 scripts/splat-to-ksplat.mjs <in.ply> <out.ksplat> [options]
//
// Options:
//   --level=2          compression: 0 none, 1 = 16-bit, 2 = 16-bit + 8-bit colour detail (smallest)
//   --alpha=5          drop splats with opacity below this (0-255); removes faint haze
//   --sh=0             spherical-harmonics degree to keep (0 = flat colour, smallest; 1 = some sheen)
//   --box=x0,x1,y0,y1,z0,z1   drop splats outside this box (scene units); trims floaters outside the room
//   --room=frame.json  room-aligned crop: { up, a, b } axes plus "crop": { h: [floor, ceiling], a: [..], b: [..] }
//                      (heights/extents measured along those axes). Removes junk under the floor and above the ceiling.
//   --maxscale=0.35    drop splats whose largest radius exceeds this (big, blurry haze blobs)
//   --max=1000000      keep at most this many splats (largest × most opaque first)
//
// The .ply originals live in /media (git-ignored). The output goes to public/media/3d/.
import fs from 'node:fs'
import * as THREE from 'three'
import { PlyParser, SplatBufferGenerator } from '@mkkellogg/gaussian-splats-3d'

const [input, output, ...rest] = process.argv.slice(2)
if (!input || !output) {
  console.error('Usage: node scripts/splat-to-ksplat.mjs <in.ply> <out.ksplat> [--level=2] [--alpha=5] [--sh=0] [--box=...] [--max=N]')
  process.exit(1)
}
const opt = Object.fromEntries(rest.map((a) => a.replace(/^--/, '').split('=')))
const level = Number(opt.level ?? 2)
const alpha = Number(opt.alpha ?? 5)
const sh = Number(opt.sh ?? 0)
const box = opt.box?.split(',').map(Number)
const max = opt.max ? Number(opt.max) : Infinity

const file = fs.readFileSync(input)
const arr = PlyParser.parseToUncompressedSplatArray(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength), sh)
console.log(`parsed ${arr.splatCount.toLocaleString()} splats`)

// O = UncompressedSplatArray offsets: 0-2 position, 3-5 scale, 13 opacity
let splats = arr.splats
if (box) {
  const [x0, x1, y0, y1, z0, z1] = box
  splats = splats.filter((s) => s[0] >= x0 && s[0] <= x1 && s[1] >= y0 && s[1] <= y1 && s[2] >= z0 && s[2] <= z1)
  console.log(`inside box: ${splats.length.toLocaleString()}`)
}
if (opt.room) {
  const room = JSON.parse(fs.readFileSync(opt.room, 'utf8'))
  const { up, a, b, crop } = room
  const d = (s, v) => s[0] * v[0] + s[1] * v[1] + s[2] * v[2]
  const inside = (s, axis, range) => !range || (d(s, axis) >= range[0] && d(s, axis) <= range[1])
  splats = splats.filter((s) => inside(s, up, crop.h) && inside(s, a, crop.a) && inside(s, b, crop.b))
  console.log(`inside room: ${splats.length.toLocaleString()}`)
}
if (opt.maxscale) {
  const limit = Number(opt.maxscale)
  splats = splats.filter((s) => Math.max(Math.abs(s[3]), Math.abs(s[4]), Math.abs(s[5])) <= limit)
  console.log(`after size limit: ${splats.length.toLocaleString()}`)
}
if (splats.length > max) {
  const weight = (s) => s[13] * Math.abs(s[3] * s[4] * s[5]) ** (1 / 3)
  splats = splats.sort((a, b) => weight(b) - weight(a)).slice(0, max)
  console.log(`capped to ${splats.length.toLocaleString()}`)
}
arr.splats = splats
arr.splatCount = splats.length

const generator = SplatBufferGenerator.getStandardGenerator(alpha, level, 0, new THREE.Vector3(), 5.0, 256)
const splatBuffer = generator.generateFromUncompressedSplatArray(arr)
fs.mkdirSync(new URL('.', `file://${process.cwd()}/${output}`), { recursive: true })
fs.writeFileSync(output, Buffer.from(splatBuffer.bufferData))
console.log(`wrote ${output}: ${(fs.statSync(output).size / 1e6).toFixed(1)} MB, ${splatBuffer.getSplatCount().toLocaleString()} splats`)
