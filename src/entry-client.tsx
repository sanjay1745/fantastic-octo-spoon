// Global styles first so component CSS Modules can override them.
import './styles/base.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { basename } from './lib/url'

const app = (
  <StrictMode>
    <BrowserRouter basename={basename || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const root = document.getElementById('root')!

// Production pages are pre-rendered (scripts/prerender.mjs), so hydrate them.
// In dev the root is empty, so render from scratch.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
