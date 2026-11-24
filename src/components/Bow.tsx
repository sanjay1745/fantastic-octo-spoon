/**
 * Decorative metallic red star gift bow (seasonal). Sits on the corner of the nav pill.
 * Built like a real pull bow: rings of folded-ribbon points (each split into a shaded
 * half and a lit half along the fold), then open ribbon loops curling up in the middle.
 * Small deterministic jitter keeps it from looking like a perfect flower.
 */

/** Left (shaded) half of a folded ribbon loop: outer edge out to the rounded end, back down the fold. */
const halfL = (len: number, w: number) =>
  `M ${-w / 2} 0 C ${-w * 0.72} ${-len * 0.45}, ${-w * 0.24} ${-len * 0.98}, 0 ${-len} Q ${-w * 0.08} ${-len * 0.5}, 0 0 Z`
/** Right (lit) half. */
const halfR = (len: number, w: number) =>
  `M ${w / 2} 0 C ${w * 0.72} ${-len * 0.45}, ${w * 0.24} ${-len * 0.98}, 0 ${-len} Q ${-w * 0.08} ${-len * 0.5}, 0 0 Z`

/** An open ribbon loop standing up from the centre: the band, and the darker inside of it. */
const loopOuter = (len: number, w: number) =>
  `M ${-w / 2} 0 C ${-w * 0.9} ${-len}, ${w * 0.9} ${-len}, ${w / 2} 0 Z`
const loopInner = (len: number, w: number) =>
  `M ${-w * 0.2} ${-len * 0.12} C ${-w * 0.5} ${-len * 0.78}, ${w * 0.5} ${-len * 0.78}, ${w * 0.2} ${-len * 0.12} Z`

const jitter = (i: number, seed: number) => Math.sin(i * 2.31 + seed * 1.7)

interface Ring {
  count: number
  len: number
  w: number
  offset: number
  shade: string
  lit: string
}

const rings: Ring[] = [
  { count: 8, len: 46, w: 27, offset: 4, shade: 'url(#bow-shade-deep)', lit: 'url(#bow-lit-deep)' },
  { count: 7, len: 36, w: 25, offset: 22, shade: 'url(#bow-shade)', lit: 'url(#bow-lit)' },
]

const loops = [
  { a: -20, len: 26, w: 22 },
  { a: 60, len: 24, w: 20 },
  { a: 140, len: 25, w: 21 },
  { a: 215, len: 23, w: 20 },
  { a: 290, len: 24, w: 21 },
]

const core = [
  { a: 20, len: 15, w: 14 },
  { a: 140, len: 14, w: 13 },
  { a: 255, len: 15, w: 14 },
]

export default function Bow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-54 -54 108 108" aria-hidden="true" focusable="false">
      <defs>
        {/* Shaded half: deep red to near-black at the edge */}
        <linearGradient id="bow-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5c0703" />
          <stop offset="0.6" stopColor="#a8140b" />
          <stop offset="1" stopColor="#c81c12" />
        </linearGradient>
        <linearGradient id="bow-shade-deep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#420402" />
          <stop offset="0.6" stopColor="#8c1008" />
          <stop offset="1" stopColor="#ad160d" />
        </linearGradient>
        {/* Lit half: bright streak near the fold, falling off to red */}
        <linearGradient id="bow-lit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6a5e" />
          <stop offset="0.25" stopColor="#ffc4bc" />
          <stop offset="0.55" stopColor="#ec2d21" />
          <stop offset="1" stopColor="#9e1209" />
        </linearGradient>
        <linearGradient id="bow-lit-deep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e2382d" />
          <stop offset="0.3" stopColor="#ff9488" />
          <stop offset="0.6" stopColor="#c81c12" />
          <stop offset="1" stopColor="#6e0905" />
        </linearGradient>
        {/* Loop band: shine across the top of the curl */}
        <linearGradient id="bow-loop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb0a6" />
          <stop offset="0.3" stopColor="#ee2f23" />
          <stop offset="0.75" stopColor="#b3170e" />
          <stop offset="1" stopColor="#6a0804" />
        </linearGradient>
        <linearGradient id="bow-inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a0301" />
          <stop offset="1" stopColor="#8a0f08" />
        </linearGradient>
      </defs>

      {/* Slight top-down tilt */}
      <g transform="scale(1 0.92)">
        {rings.map((r, ri) =>
          Array.from({ length: r.count }, (_, i) => {
            const a = r.offset + (360 / r.count) * i + 4 * jitter(i, ri)
            const len = r.len * (1 + 0.05 * jitter(i, ri + 3))
            return (
              <g key={`${ri}-${i}`} transform={`rotate(${a.toFixed(1)})`}>
                <path d={halfL(len, r.w)} fill={r.shade} />
                <path d={halfR(len, r.w)} fill={r.lit} />
                <path d={`M 0 0 Q ${-r.w * 0.08} ${-len * 0.5}, 0 ${-len * 0.96}`} fill="none" stroke="#ffd9d4" strokeWidth="0.6" opacity="0.6" />
              </g>
            )
          }),
        )}

        {/* Open loops curling up around the centre */}
        {loops.map((l) => (
          <g key={`loop-${l.a}`} transform={`rotate(${l.a})`}>
            <path d={loopOuter(l.len, l.w)} fill="url(#bow-loop)" stroke="#4a0502" strokeWidth="0.5" />
            <path d={loopInner(l.len, l.w)} fill="url(#bow-inside)" />
          </g>
        ))}

        {/* Tight curls at the core */}
        {core.map((l) => (
          <g key={`core-${l.a}`} transform={`rotate(${l.a})`}>
            <path d={loopOuter(l.len, l.w)} fill="url(#bow-loop)" stroke="#4a0502" strokeWidth="0.5" />
            <path d={loopInner(l.len, l.w)} fill="url(#bow-inside)" />
          </g>
        ))}
        <ellipse rx="4.5" ry="3.5" fill="#6a0804" />
      </g>
    </svg>
  )
}
