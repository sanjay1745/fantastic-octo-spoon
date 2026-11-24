/** Decorative red gift bow (seasonal). Sits on the corner of the nav pill. */
export default function Bow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 52" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bow-loop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0362c" />
          <stop offset="1" stopColor="#b8170f" />
        </linearGradient>
        <linearGradient id="bow-tail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c81c13" />
          <stop offset="1" stopColor="#8f0f09" />
        </linearGradient>
      </defs>
      {/* Tails */}
      <path d="M29 26 L17 48 L22.5 46.5 L24.5 51 L33 28 Z" fill="url(#bow-tail)" />
      <path d="M35 26 L47 48 L41.5 46.5 L39.5 51 L31 28 Z" fill="url(#bow-tail)" />
      {/* Loops */}
      <path d="M32 24 C 22 6, 4 4, 4 17 C 4 28, 20 29, 32 24 Z" fill="url(#bow-loop)" />
      <path d="M32 24 C 42 6, 60 4, 60 17 C 60 28, 44 29, 32 24 Z" fill="url(#bow-loop)" />
      {/* Inner folds */}
      <path d="M30 22 C 22 12, 11 11, 10 17" fill="none" stroke="#8f0f09" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      <path d="M34 22 C 42 12, 53 11, 54 17" fill="none" stroke="#8f0f09" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      {/* Highlights */}
      <path d="M8 13 C 11 9, 17 9, 21 12" fill="none" stroke="#ff8a80" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M56 13 C 53 9, 47 9, 43 12" fill="none" stroke="#ff8a80" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Knot */}
      <rect x="27" y="18" width="10" height="11" rx="3.5" fill="#d21f15" stroke="#8f0f09" strokeWidth="1" />
    </svg>
  )
}
