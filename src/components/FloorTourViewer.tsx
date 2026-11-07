import { LogLevel, SceneRevealMode, Viewer } from '@mkkellogg/gaussian-splats-3d'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Vector3 } from 'three'
import type { FloorTour3D, TourView } from '../data/facilities'
import { asset } from '../lib/url'
import styles from './FloorTour.module.css'

export interface FloorTourViewerHandle {
  /** Glide (or jump, with reduced motion) to a viewpoint */
  goTo(view: TourView): void
}

interface Props {
  tour: FloorTour3D
  reducedMotion: boolean
  onProgress(percent: number): void
  onReady(): void
  onError(): void
}

/**
 * The WebGL splat viewer. Loaded on demand (React.lazy) so three.js and the scene file
 * only download after a visitor asks for the 3D tour.
 * GitHub Pages can't send cross-origin-isolation headers, so shared-memory sorting is off.
 */
const FloorTourViewer = forwardRef<FloorTourViewerHandle, Props>(function FloorTourViewer(
  { tour, reducedMotion, onProgress, onReady, onError },
  ref,
) {
  const root = useRef<HTMLDivElement>(null)
  const viewer = useRef<Viewer | null>(null)
  const anim = useRef(0)
  // Keep the latest callbacks without re-creating the viewer
  const cb = useRef({ onProgress, onReady, onError })
  cb.current = { onProgress, onReady, onError }

  useEffect(() => {
    const el = root.current
    if (!el) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const v = new Viewer({
      rootElement: el,
      cameraUp: tour.up,
      initialCameraPosition: tour.start.position,
      initialCameraLookAt: tour.start.lookAt,
      sharedMemoryForWorkers: false,
      gpuAcceleratedSort: false,
      integerBasedSort: false,
      halfPrecisionCovariancesOnGPU: true,
      ignoreDevicePixelRatio: coarse, // phones: render at 1x for a steady frame rate
      sphericalHarmonicsDegree: 0,
      sceneRevealMode: reducedMotion ? SceneRevealMode.Instant : SceneRevealMode.Default,
      logLevel: LogLevel.None,
      useBuiltInControls: true,
    })
    viewer.current = v
    let alive = true
    v.addSplatScene(asset(tour.scene), {
      showLoadingUI: false,
      progressiveLoad: false,
      splatAlphaRemovalThreshold: 5,
      onProgress: (pct) => alive && cb.current.onProgress(pct),
    })
      .then(() => {
        if (!alive) return
        v.start()
        cb.current.onReady()
      })
      .catch(() => alive && cb.current.onError())

    return () => {
      alive = false
      cancelAnimationFrame(anim.current)
      viewer.current = null
      v.dispose().catch(() => {})
    }
    // The tour config is static for the page; reduced-motion only affects the reveal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour])

  useImperativeHandle(
    ref,
    () => ({
      goTo(view) {
        const v = viewer.current
        if (!v?.controls) return
        const cam = v.camera
        const ctl = v.controls
        const toPos = new Vector3(...view.position)
        const toTarget = new Vector3(...view.lookAt)
        cancelAnimationFrame(anim.current)
        if (reducedMotion) {
          cam.position.copy(toPos)
          ctl.target.copy(toTarget)
          ctl.update()
          return
        }
        const fromPos = cam.position.clone()
        const fromTarget = ctl.target.clone()
        const t0 = performance.now()
        const dur = 1100
        const ease = (t: number) => 1 - Math.pow(1 - t, 3)
        const step = (now: number) => {
          const k = ease(Math.min(1, (now - t0) / dur))
          cam.position.lerpVectors(fromPos, toPos, k)
          ctl.target.lerpVectors(fromTarget, toTarget, k)
          ctl.update()
          if (k < 1) anim.current = requestAnimationFrame(step)
        }
        anim.current = requestAnimationFrame(step)
      },
    }),
    [reducedMotion],
  )

  return <div ref={root} className={styles.canvas} />
})

export default FloorTourViewer
