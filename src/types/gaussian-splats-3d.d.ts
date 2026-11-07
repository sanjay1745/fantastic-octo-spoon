// Minimal types for @mkkellogg/gaussian-splats-3d (the package ships none). Only what FloorTourViewer uses.
declare module '@mkkellogg/gaussian-splats-3d' {
  import type { PerspectiveCamera, Vector3 } from 'three'

  export const SceneRevealMode: { Default: number; Gradual: number; Instant: number }
  export const LogLevel: { None: number; Error: number; Warning: number; Info: number; Debug: number }

  export interface ViewerOptions {
    rootElement?: HTMLElement
    cameraUp?: number[]
    initialCameraPosition?: number[]
    initialCameraLookAt?: number[]
    sharedMemoryForWorkers?: boolean
    gpuAcceleratedSort?: boolean
    integerBasedSort?: boolean
    ignoreDevicePixelRatio?: boolean
    sphericalHarmonicsDegree?: number
    sceneRevealMode?: number
    logLevel?: number
    useBuiltInControls?: boolean
    halfPrecisionCovariancesOnGPU?: boolean
  }

  export interface SceneOptions {
    showLoadingUI?: boolean
    progressiveLoad?: boolean
    splatAlphaRemovalThreshold?: number
    onProgress?: (percent: number, label: string, status: number) => void
  }

  export class Viewer {
    constructor(options?: ViewerOptions)
    camera: PerspectiveCamera
    controls: { target: Vector3; update(): void; enabled: boolean } | undefined
    addSplatScene(path: string, options?: SceneOptions): Promise<void>
    start(): void
    dispose(): Promise<void>
  }
}
