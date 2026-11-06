/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Site origin from site.config.ts, injected by vite.config.ts */
  readonly VITE_SITE_ORIGIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
