# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Schneitec Property (`propertyv2`)** — a marketing site for a Bangkok luxury
real-estate developer. Originally a clone/rebuild of "The Creators HQ" Webflow
site, restyled into the **GREYON** contemporary-luxury editorial design system.

Stack: **React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build  (type-check then bundle)
npm run lint      # oxlint (not ESLint)
npm run preview   # serve the production build
```

Deployment targets Vercel (`vercel.json` rewrites all paths to `index.html`
for client-side routing, and sets immutable caching on `/assets/*`).

## Tech Stack

| Concern        | Choice                                          |
| -------------- | ----------------------------------------------- |
| Framework      | React 19.3 (`react-jsx`, StrictMode)            |
| Build          | Vite 8 (`@vitejs/plugin-react`, Rolldown)       |
| Language       | TypeScript ~6.0, `moduleResolution: bundler`    |
| Styling        | Tailwind CSS v4 via `@tailwindcss/vite`         |
| Animation      | Framer Motion 14                                |
| Routing        | react-router-dom 7 (`createBrowserRouter`)      |
| Icons          | lucide-react (primary), react-icons (secondary) |
| UI primitives  | Radix UI (dialog, dropdown, select, tooltip, slot) |
| Class utils    | `clsx` + `tailwind-merge` via `cn()`            |
| Linting        | oxlint                                          |

**Path alias:** `@/` → `src/` — configured in both `vite.config.ts` and
`tsconfig.app.json`. Always import with `@/...`, never long relative chains.

**shadcn/ui** is configured (`components.json`, style `default`, baseColor
`zinc`, icons `lucide`) pointing at `src/components/ui/`. Only `dialog.tsx`
exists so far; add further primitives with the shadcn CLI rather than
hand-rolling them.

## Tailwind v4 — no config file

There is **no `tailwind.config.js/ts`**. This is deliberate. Tailwind v4 is
configured entirely in CSS:

- `src/index.css` starts with `@import "tailwindcss";`
- Design tokens are declared in an `@theme { ... }` block
- Utilities/base styles live in `@layer base` and `@layer utilities`

To add a color, spacing, or font token, add a CSS custom property to the
`@theme` block — **do not** create a `tailwind.config` file. A token named
`--color-greyon-gold` generates `bg-greyon-gold`, `text-greyon-gold`,
`border-greyon-gold`, etc.

## GREYON Design System

### Core palette (from `@theme` in `src/index.css`)

| Token                  | Hex       | Role                                  |
| ---------------------- | --------- | ------------------------------------- |
| `greyon-cream`         | `#faf8f6` | Page background                       |
| `greyon-primary`       | `#627063` | Moss green — primary brand color      |
| `greyon-gold`          | `#c4a35a` | Gold — accent, focus ring, hairlines  |
| `greyon-dark`          | `#1c1814` | Deep ink — dark sections, overlays    |
| `greyon-ink`           | `#454c4b` | Default body text                     |
| `greyon-primary-hover` | `#525e53` | Moss hover state                      |
| `greyon-gold-deep`     | `#8f7340` | Gold hover / deeper accent            |
| `greyon-muted`         | `#7a736a` | Secondary text, captions              |
| `greyon-sand`          | `#f1f1f1` | Neutral surface                       |
| `greyon-stone`         | `#d9d0c3` | Borders, dividers                     |
| `greyon-beige`         | `#e4d5c0` | Warm surface accent                   |
| `greyon-white`         | `#ffffff` | Pure white                            |
| `greyon-success`       | `#5f7a55` | Status                                |
| `greyon-danger`        | `#8b2e2e` | Status                                |
| `greyon-warning`       | `#a89278` | Status                                |

The same palette is duplicated as plain `:root` variables (`--color-cream`,
`--color-gold`, `--color-primary`, …) for inline/`var()` use, plus HSL
shadcn variables (`--background`, `--foreground`, `--primary`, `--ring`, …).

### Aesthetic rules

- **Minimal, editorial, contemporary luxury.** Generous whitespace, large
  type, photographic imagery, restrained color.
- **Sharp corners.** The look is `rounded-none`-leaning; avoid rounding
  unless a component genuinely needs it. (`--radius: 0.25rem` exists for
  shadcn primitives only.)
- **Gold is an accent, not a fill.** Use it for hairlines, small caps labels,
  focus states, and hover detail — never large background blocks.
- **Cream, not pure white,** is the default page ground.
- Typography utilities: `.heading-h1` … `.heading-h4`,
  `.text-{xl,lg,md,sm,xs}-custom`, `.container-site` (1440px),
  `.container-large` (1200px), `.clamp-2`, `.clamp-3`.
- Buttons: `.btn-primary` (moss fill), `.btn-secondary` (moss outline),
  `.btn-glass` (transparent over photography).

> ⚠️ **Known inconsistency:** `index.css` declares
> `--font-sans: 'Montserrat'` and `--font-serif: 'Lora'`, but `index.html`
> only loads **Manrope** from Google Fonts. Montserrat/Lora therefore
> currently fall back to system sans. Fix whichever side is authoritative
> before relying on font metrics.

### Framer Motion conventions

- Variants are declared as module-level `const` with `type Variants`.
- Standard easing used across the site: `[0.165, 0.84, 0.44, 1]`.
- Scroll-driven motion uses `useScroll({ target: ref, offset: ... })` with
  `useTransform` for parallax (see `HeroSection.tsx`).
- Entrance animations stagger via `staggerChildren` / `delayChildren`.
- Global page transitions were **removed** from `RootLayout` for rendering
  stability; re-add carefully and verify the hero still paints.

## Routes

Defined in `src/App.tsx` with `createBrowserRouter`, all nested under
`RootLayout` (Navbar + `<main><Outlet/></main>` + Footer + `ScrollRestoration`).

| Path              | Component            | Notes                                  |
| ----------------- | -------------------- | -------------------------------------- |
| `/`               | `HomePage`           | Sections composed in order, see below  |
| `/about`          | `AboutPage`          |                                        |
| `/projects`       | `ProjectsPage`       | Listing from `src/data/projects.ts`    |
| `/projects/:slug` | `ProjectDetailPage`  | Canonical detail route                 |
| `/project/:slug`  | `ProjectDetailPage`  | Legacy/alias route — data uses this    |
| `/services`       | `ServicesPage`       |                                        |
| `/news`           | `NewsPage`           | Listing from `src/data/news.ts`        |
| `/news/:slug`     | `NewsDetailPage`     |                                        |
| `/contact`        | `ContactPage`        |                                        |
| `/privacy-policy` | `PlaceholderPage`    | Stub — "coming soon"                   |
| `*`               | → `/`                | Catch-all redirect                     |

Note the two project-detail paths: `PROJECTS[].projectUrl` in the data file
points to `/project/:slug` (singular). Keep both routes working, or update
the data and navigation together.

## Source layout

```
src/
├── main.tsx                 # createRoot → <App />
├── App.tsx                  # router definition
├── index.css                # Tailwind import + @theme + base + utilities
├── App.css                  # leftover Vite template styles (unused by app)
├── components/
│   ├── layout/              # RootLayout, Navbar, Footer
│   ├── sections/            # Homepage sections (composed by HomePage)
│   ├── shared/              # ProjectCard, PromotionCard
│   └── ui/                  # shadcn primitives
├── pages/                   # One file per route
├── data/                    # Static content: projects.ts, news.ts, promotions.ts
├── hooks/                   # useMediaQuery, useScrollDirection, useScrollPosition
├── lib/                     # api.ts, utils.ts (cn)
└── types/index.ts           # Project, Promotion, NewsItem, SocialLink, NavLink
```

`HomePage` composes, in order: `HeroSection` → `VideoShowcaseSection` →
`ProjectsSlider` → `AboutSection` → `PromotionSection` → `VideoShowcaseSection`
(second instance, `src="/staying.mp4"`) → `LatestNewsSection`.

## Conventions

- **Content is data-driven.** Projects, news, and promotions live in
  `src/data/*.ts` typed by `src/types/index.ts`. Add content there, not
  hardcoded in JSX.
- **Types are in one place.** Extend interfaces in `src/types/index.ts`
  rather than declaring local shapes for domain objects.
- **Images are remote** (Webflow CDN `cdn.prod.website-files.com` URLs).
  No local image pipeline or `public/` assets beyond the favicon.
- **Sections over one-off markup.** Homepage blocks belong in
  `components/sections/`; reusable cards in `components/shared/`.
- **`cn()` for conditional classes** (`@/lib/utils`), never string concat.
- **Verbatim TS imports:** `verbatimModuleSyntax` is on — use
  `import { type Variants }` / `import type { Project }`.
- **Comments** in existing files use box-drawing section headers
  (`/* ─── Title ─── */`) — match that style when editing nearby code.
- Do not introduce a CSS-in-JS library, a second animation library, or a
  component framework; Tailwind + Framer Motion + Radix is the agreed set.
