import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { FloorTour3D } from '../data/facilities'
import { useReducedMotion } from '../hooks/useReducedMotion'
import buttonStyles from './Button.module.css'
import type { FloorTourViewerHandle } from './FloorTourViewer'
import styles from './FloorTour.module.css'

// three.js + the splat renderer: only fetched once someone opens the tour
const FloorTourViewer = lazy(() => import('./FloorTourViewer'))

/** True when the browser can render WebGL2 (checked after mount; false during pre-render). */
function useWebGL2(): boolean {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    let supported = false
    try {
      supported = !!document.createElement('canvas').getContext('webgl2')
    } catch {
      supported = false
    }
    // Deferred so the check never blocks hydration
    const id = requestAnimationFrame(() => setOk(supported))
    return () => cancelAnimationFrame(id)
  }, [])
  return ok
}

/** "Explore in 3D" button for the hero. Renders nothing on devices without WebGL2. */
export function ExploreButton({ tour, onOpen }: { tour: FloorTour3D; onOpen(): void }) {
  const supported = useWebGL2()
  if (!supported) return null
  return (
    <button type="button" className={`${buttonStyles.btn} ${buttonStyles.ghost} ${buttonStyles.lg} ${styles.explore}`} onClick={onOpen}>
      <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.cube}>
        <path d="M10 2 3 6v8l7 4 7-4V6l-7-4Zm0 0v8m0 0 7-4m-7 4-7-4m7 4v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span>
        Explore in 3D <span className={styles.size}>· {tour.sizeMb} MB</span>
      </span>
    </button>
  )
}

type Status = 'loading' | 'ready' | 'error'

/**
 * Full-bleed interactive 3D floor, layered over the hero while open.
 * Drag to look around, scroll/pinch to zoom, right-drag/two-finger drag to move. Esc or "Exit 3D" closes.
 */
export default function FloorTour({ tour, onClose }: { tour: FloorTour3D; onClose(): void }) {
  const reduced = useReducedMotion()
  const viewer = useRef<FloorTourViewerHandle>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [pct, setPct] = useState(0)
  const [active, setActive] = useState(tour.spots[0]?.id)

  useEffect(() => {
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      ref={panel}
      className={styles.tour}
      data-status={status}
      role="region"
      aria-label="Interactive 3D view of the gym floor"
      tabIndex={-1}
    >
      <Suspense fallback={null}>
        <FloorTourViewer
          ref={viewer}
          tour={tour}
          reducedMotion={reduced}
          onProgress={(p) => setPct(Math.round(p))}
          onReady={() => setStatus('ready')}
          onError={() => setStatus('error')}
        />
      </Suspense>

      {status !== 'ready' && (
        <div className={styles.status} aria-live="polite">
          {status === 'loading' ? (
            <>
              <p>Loading the 3D floor{pct > 0 ? ` · ${pct}%` : '…'}</p>
              <div className={styles.bar} aria-hidden="true">
                <span style={{ transform: `scaleX(${pct / 100})` }} />
              </div>
            </>
          ) : (
            <p>The 3D tour couldn’t load on this device. Try the photos below instead.</p>
          )}
        </div>
      )}

      <div className={styles.toolbar}>
        <div className="container">
          <div className={styles.toolbarInner}>
            {status === 'ready' && (
              <>
                <ul role="list" className={styles.spots} aria-label="Jump to a spot">
                  {tour.spots.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        className={styles.spot}
                        aria-pressed={active === s.id}
                        onClick={() => {
                          setActive(s.id)
                          viewer.current?.goTo(s)
                        }}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className={styles.hint}>
                  <span className={styles.hintFine}>Drag to look around · Scroll to zoom · Right-drag to move</span>
                  <span className={styles.hintCoarse}>Drag to look · Pinch to zoom · Two fingers to move</span>
                </p>
              </>
            )}
            <button type="button" className={`${buttonStyles.btn} ${buttonStyles.light} ${buttonStyles.md} ${styles.exit}`} onClick={onClose}>
              Exit 3D
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
