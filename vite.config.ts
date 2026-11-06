import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteConfig } from './site.config.ts'

// https://vite.dev/config/
export default defineConfig({
  base: siteConfig.base,
  define: {
    // Exposed to app code as import.meta.env.VITE_SITE_ORIGIN (see src/lib/url.ts)
    'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify(siteConfig.origin),
  },
  plugins: [react()],
  // Allow `vite preview` to be shared through a temporary Cloudflare tunnel
  preview: { allowedHosts: ['.trycloudflare.com'] },
})
