# Stoik Gym website

Marketing site for **Stoik Gym**, a premium boutique gym in Roseville, CA. Static React site on GitHub Pages.

## Goals (priority order)
1. Convert visitors into free tours / trial signups and membership joins.
2. Make Stoik Gym feel like *the* premium gym in the area.
3. Fast and great on mobile. Most traffic comes from Instagram and Meta ads on phones. Target: Lighthouse 90+ on mobile.
4. Built to scale. A new location means adding data, not building new pages.

## Brand rules (non-negotiable)
- **Naming:** always write "Stoik Gym" (or "Stoik" for short) in copy, page titles, meta tags and alt text. Never write "STOIK" in all caps as text. The only exception is the logo artwork itself. Don't produce all caps with CSS `text-transform` on the brand name either.
  - Eyebrow labels ("THE GYM", "COACHING") are uppercase styling labels and must never contain the brand name.
- **Ethos / tagline:** "Be Stoik."
- **Positioning:** we sell culture, community and premium coaching/results. We never compete on size or price.
- **The gym is the brand, not Jeremy.** Founder Jeremy Buendia (title on site: "4x Men's Physique Olympia Champion") promotes it, but most coaching is done by the coaching team. Don't build pages around him.
- **Logos:** never redraw, recreate or retype the logo. Use the official artwork only.
  - Vector SVGs, extracted from the `.ai` files in `/logos`, live in `src/assets/brand/` (`wordmark.svg`, `icon.svg`, `emblem.svg`). They use `fill="currentColor"`. Render them with `<Logo variant=… />`.
  - Nav: `wordmark` · Footer / large brand moments: `emblem` (bolt + stacked wordmark) · Favicon / app icon: `icon` on a black square.
  - `npm run brand` regenerates `public/favicon.svg`, `public/apple-touch-icon.png`, `public/favicon-32.png`, `public/brand/icon-512.png` and `public/brand/og-default.jpg` from those SVGs.
  - PNG-only for now: `TEAMSTOIK_LOGO_WHITE.png` (coaching contexts) and `Full Skelcore Logo (White).png` (equipment section).
- **Copy tone:** direct, disciplined, premium. Short declarative lines. No hype words ("ultimate", "beast mode", "insane", "next level").

## Visual direction
- Near-black backgrounds, white type, silver for secondary details.
- **Red is rare and intentional:** key CTAs (Join Now), small highlights, hover/focus states. Never a section or page background.
- Floating, rounded, pill-shaped sticky nav with "Join Now" always visible (including on mobile).
- Big, confident display type. Small, tracked, all-caps eyebrow labels above section headings.
- Signature moment: a large statement paragraph whose words light up as you scroll.
- Rounded photo cards with labels. Images fade/blur in on scroll.
- Full-bleed photography and video. Until real media is supplied, use clearly marked placeholders. No stock fitness clichés.
- Motion is smooth and restrained. **Every animation must respect `prefers-reduced-motion`** (show the final state instantly).
- Inspiration is in `/inspo` (officialalphaland.com, skelcore.com). Take the feel, not the layouts. Never copy them.

## Tech constraints
- Vite + React + TypeScript, ESLint. Static only, **no backend**.
- Hosting: GitHub Pages, deployed by a GitHub Actions workflow on push to `main`.
- **Base path is one setting:** `site.config.ts` (`origin`, `base`). Currently `/fantastic-octo-spoon/`. It switches to `/` (plus a `public/CNAME`) when stoikgym.com is connected. Never hard-code the base path; use `asset()`, `absoluteUrl()` and `basename` from `src/lib/url.ts`.
- **Routing + pre-rendering:** React Router (`BrowserRouter`) with real URLs. `npm run build` also runs an SSR build plus `scripts/prerender.mjs`, which writes static HTML for every route in `src/routes.tsx` (with per-page head tags), and also `404.html`, `sitemap.xml` and `robots.txt`. Components must not touch `window`/`document` during render, only in effects.
- Page titles and descriptions live in `src/routes.tsx` (`meta`). JSON-LD builders are in `src/seo/head.ts`.
- **Shop is not a page.** "Shop" in the nav/footer links straight to the Shopify store (`site.shopUrl`). `/shop` exists only as a redirect (meta refresh, noindex, not in the sitemap).
- Location-specific facility content (carousel photos, highlight sections) lives in `src/data/facilities.ts`, keyed by location slug.
- "Join Now" → ClubLifePro signup. The URL lives in data (per location), never inline in components.
- SEO: per-page title/description, Open Graph images, LocalBusiness/HealthClub JSON-LD generated from location data, `sitemap.xml`, `robots.txt`.
- Performance: responsive, lazy-loaded images (AVIF/WebP), compressed hero video with a poster image, self-hosted fonts, no heavy libraries.
- Accessibility: semantic HTML, real alt text, full keyboard navigation, visible focus states, WCAG AA contrast.

## Fonts
- Display: Archivo Variable at `font-stretch: 125%` (expanded). Body: Inter Variable. Both self-hosted via @fontsource.
- **Ringold Sans is intentionally not used yet.** It is caps-only, so "Stoik Gym" would render as STOIK GYM (violates the naming rule), and it is licensed through Adobe Fonts (web use requires an Adobe Fonts web project, not self-hosting the .otf). Waiting on the owner's decision.

## Where things live
- `src/data/`: **all business info** as typed data: locations (address, hours, phone, geo, join URL, status), memberships/pricing, coaches, FAQs, stats, testimonials, site-wide info (socials, email, shop URL). Components read from here; never hard-code prices, hours, addresses or names in components.
- **Media pipeline:** full-res originals go in `/media` (git-ignored, often 20 MB+ each). `scripts/media.config.mjs` maps originals (or a still at time `t` from a video) to slot names. `npm run media` writes `public/media/<slot>-{480,800,1200,1800}.{avif,webp}` plus the hero loops (`hero-1080.mp4`, `hero-720x1280.mp4`, muted). Video needs ffmpeg on PATH or `FFMPEG=/path/to/ffmpeg`. Then set `src: 'media/<slot>'` in `src/data/media.ts` / `coaches.ts`; `focus` sets the crop. Never commit originals.
- `public/brand/`: generated icon/OG images (see Logos above).
- Styles: `src/styles/tokens.css` (all design tokens) and `base.css`. Components use CSS Modules next to the component. Add `data-reveal` to any element to fade/blur it in on scroll.
- `/logos`: source logo files (committed). Some vector files contain the white and black versions in one file, so split or crop them before use.
- `/inspo`: inspiration screenshots, git-ignored (local only). Never imported by the app.

## Business facts (source of truth is `src/data/`)
- Address: 1105 Roseville Square, Roseville, CA 95678 (same plaza as Trader Joe's). About 6,000 sq ft.
- Hours: 5am–11pm weekdays, 6am–10pm weekends. Holiday hours may vary.
- Phone 916-306-1697 · support@stoikgym.com · Instagram & TikTok @stoik.gyms
- Apparel: Shopify at https://stoikathletix.com/
- Age: **always market Stoik Gym as an 18+ gym.** 16–17 year olds are allowed only after an interview with Jeremy and must maintain a 3.0 GPA. Mention this only where relevant (e.g. an FAQ answer), never as a headline.
- Primary lead CTA is a **free tour** (not a free trial). The booking URL will be supplied later. Until then it lives as one placeholder value in `src/data/site.ts`.
- Pricing:
  - Standard: $109/mo on a 12-month contract, or $129/mo month-to-month with no contract.
  - Student / first responder: $79/mo, month-to-month. Status is verified at sign-up or on the first visit.
  - Family: $180/mo for up to 3 people, plus $30/mo for each additional person.
  - Day pass: $25, sold in person at the club only (no online purchase).
  - 10-visit punch card: $110 for 10 gym visits, never expires. Position it as the better-value alternative to day passes.
- Coaching (PT and online): **no prices on the site.** Pricing is given at a consultation, so coaching CTAs are "Book a consultation".
- Coaching team (each gets a profile card/spotlight): Cinthia Beltran, Michael Lopez, Mel Renee, Stephanie Pleasas, Logan Frushour, Tyler Brey, Kevin Zaragoza. Bios and specialties are still to come; Logan has no photo yet.
- More locations are coming.

## Working conventions
- Commit in small, clearly described steps.
- Check new UI at phone width first (about 390px).
- Run `npm run lint` and `npm run build` before committing.
