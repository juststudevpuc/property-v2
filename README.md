# The Creators HQ — Property V2

A modern, responsive React 18 + Vite clone of [The Creators HQ](https://www.thecreatorshq.com/en), built with a luxury dark theme design system, fluid Framer Motion animations, and a full client-side router tree.

---

## 🏛️ Features & Architecture

- **Luxury Dark Palette:** Curated `#0D1117` near-black background, `#161C26` elevated cards, `#D4DDE3` typography, and `#EAF3FB` accent strokes.
- **Data Router Architecture:** Built with React Router DOM v6 `createBrowserRouter` + `RouterProvider` supporting persistent layouts and scroll restoration (`<ScrollRestoration />`).
- **Dynamic Projects & Filter:** Responsive 3-column / 2-column grid with live status filtering (*All*, *Available*, *Sold Out*).
- **Rich Project Detail Views:** Dynamic `/project/:slug` route with specifications matrix (density, completion, parking), photo gallery, and sticky VIP private preview registration.
- **Corporate About Page:** Complete with a 10-year milestone timeline (2015–2025) and core values grid.
- **Newsroom & Editorial Reader:** Category-filtered news index with a dedicated dynamic reader page (`/news/:slug`).
- **Integrated Services:** Comprehensive breakdown of architectural master planning, interior curation, private client advisory, and asset management.
- **Production & Deployment Ready:** Includes `vercel.json` for SPA rewrites and `.env.example` + generic typed API client (`src/lib/api.ts`) for headless CMS integration.

---

## 🛠️ Tech Stack

- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React, React Icons (`fa`, `fa6`)
- **Deployment:** Vercel SPA configuration

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build & Typecheck
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # RootLayout, Navbar, Footer
│   ├── sections/      # HeroSection, ProjectsSlider, AboutSection, PromotionSection
│   ├── shared/        # ProjectCard, PromotionCard
│   └── ui/            # UI utilities
├── data/              # Mock datasets (projects, news, promotions)
├── hooks/             # useScrollPosition, useScrollDirection
├── lib/               # utils.ts (cn), api.ts (typed fetch client)
├── pages/             # HomePage, ProjectsPage, ProjectDetailPage, AboutPage, ServicesPage, NewsPage, NewsDetailPage, ContactPage
├── types/             # Domain TypeScript interfaces
└── index.css          # Design token layer & global styles
```

---

## 📄 License

Proprietary — Created for The Creators HQ Property V2.
