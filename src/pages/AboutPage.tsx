import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Gem, Layers, Leaf, Users } from 'lucide-react'

/* ─── Hero Tabbed Monograph Data ──────────────────────────── */
interface AboutTab {
  id: string
  index: string
  label: string
  title: string
  subtitle: string
  image: string
  description: [string, string]
}

const ABOUT_TABS: AboutTab[] = [
  {
    id: 'about',
    index: '01',
    label: 'About Us',
    subtitle: 'The Architectural Thesis',
    title: 'Crafting Habitats Where Architecture Meets The Human Soul',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    description: [
      'Established to redefine modern sanctuary living, GREYON dedicates itself to architectural purity. With a resident-first philosophy, we craft spaces that balance quiet innovation with timeless human connection.',
      'We reject repetitive development formulas to champion bespoke spaces centered on spatial clarity, acoustic calm, and enduring architectural distinction.',
    ],
  },
  {
    id: 'vision',
    index: '02',
    label: 'Vision',
    subtitle: 'Future Habitat',
    title: 'Pioneering Human-Centric Architectural Wellness',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    description: [
      'Our vision is to set the benchmark for modern luxury living across Southeast Asia, delivering residences that transcend utilitarian structures to become timeless works of living art.',
      'We envision environments where high-performance engineering harmonizes with natural elements—cultivating sanctuaries that nurture clarity, calm, and multi-generational connection.',
    ],
  },
  {
    id: 'mission',
    index: '03',
    label: 'Mission',
    subtitle: 'Enduring Purpose',
    title: 'Transforming Cities Through Purpose and Emotion',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    description: [
      'To challenge the commodification of urban development by ensuring every square meter possesses intentional purpose, emotional resonance, and sustainable integrity.',
      'We partner with world-renowned master planners and craftsmen to deliver homes characterized by meticulous detailing, noble materials, and enduring investment value.',
    ],
  },
  {
    id: 'culture',
    index: '04',
    label: 'Culture',
    subtitle: 'Studio Ethos',
    title: 'An Obsession with Craft, Detail, and Integrity',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85',
    description: [
      'Our culture thrives on collaborative boldness, spatial curiosity, and an uncompromising commitment to architectural perfection at every stage of development.',
      'Every member of our team is guided by empathy and craft—listening intently to how people aspire to live and translating those dreams into inspiring physical reality.',
    ],
  },
]

/* ─── Core Values Data ───────────────────────────────────── */
const VALUES = [
  {
    icon: Gem,
    title: 'Authentic Craftsmanship',
    description:
      'We curate raw, noble materials—hand-selected marbles, solid natural timber, and tactile stone—that develop a graceful patina over time.',
  },
  {
    icon: Layers,
    title: 'Bespoke Individuality',
    description:
      'No two developments share the same blueprint. Every residence is an original architectural thesis responding to its specific urban setting.',
  },
  {
    icon: Leaf,
    title: 'Ecological Intelligence',
    description:
      'Integrating natural cross-ventilation, microclimate courtyards, and smart energy grids to minimize environmental footprints sustainably.',
  },
  {
    icon: Users,
    title: 'Multi-Generational Vision',
    description:
      'Our spaces are conceived as lasting legacies, offering enduring functional flexibility for families across multiple life chapters.',
  },
]

/* ─── Timeline / Heritage Data ───────────────────────────── */
const TIMELINE_EVENTS = [
  {
    year: '2015',
    title: 'Foundation of GREYON',
    description:
      'Founded with a radical design mandate: rejecting repetitive developer formulas to champion tailored architectural spaces centered on human wellness.',
  },
  {
    year: '2018',
    title: 'Skyline Landmark Award',
    description:
      'Unveiled our premier high-rise residential tower, earning international critical acclaim for elevating high-density vertical living into an art form.',
  },
  {
    year: '2021',
    title: 'Urban Sanctuary Initiative',
    description:
      'Pioneered human-scale communal living, setting new benchmarks for integrated biophilic design and private residential gardens.',
  },
  {
    year: '2024',
    title: 'Curva Private Residences',
    description:
      'Engineered an ultra-exclusive boutique sanctuary showcasing fluid curved stone facades and private botanical courtyard lift entries.',
  },
  {
    year: '2026',
    title: 'Flagship Estate Collection',
    description:
      'Introduced our crown jewel: ultra-luxury private detached estates designed for generational wealth preservation and architectural permanence.',
  },
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<string>('about')
  const currentTab = ABOUT_TABS.find((t) => t.id === activeTab) || ABOUT_TABS[0]

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink selection:bg-greyon-gold/20 selection:text-greyon-ink">
      {/* ── 1. Interactive Monograph Hero ──────────────────────── */}
      <section className="relative min-h-[92vh] w-full flex items-center overflow-hidden bg-greyon-dark">
        {/* Photographic Canvas with Subtle Zoom on Switch */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentTab.id}
            src={currentTab.image}
            alt={currentTab.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 object-cover w-full h-full pointer-events-none"
          />
        </AnimatePresence>

        {/* Ambient Overlays */}
        <div className="absolute inset-0 bg-greyon-dark/55 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark via-transparent to-greyon-dark/40 pointer-events-none" />

        {/* Hero Grid Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Refined Index Selector */}
            <div className="lg:col-span-4 flex flex-col space-y-2 border-l border-white/20 pl-6">
              <span className="font-display text-[11px] tracking-[0.25em] uppercase text-greyon-gold mb-4">
                Directory / Overview
              </span>

              {ABOUT_TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="group flex items-baseline space-x-3 text-left py-2 focus:outline-none transition-all duration-300"
                  >
                    <span
                      className={`font-display text-xs tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-greyon-gold font-medium' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {tab.index}
                    </span>
                    <span
                      className={`font-display text-xl sm:text-2xl font-light tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-white translate-x-1 font-normal'
                          : 'text-white/45 group-hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Column: Editorial Focus Block */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl"
                >
                  <p className="font-display text-xs tracking-[0.25em] uppercase text-greyon-gold mb-3">
                    {currentTab.subtitle}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.15] mb-6">
                    {currentTab.title}
                  </h1>
                  <div className="space-y-4 font-body text-base sm:text-lg text-greyon-sand/90 font-light leading-relaxed">
                    <p>{currentTab.description[0]}</p>
                    <p className="text-white/70">{currentTab.description[1]}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Core Architectural Values ───────────────────────── */}
      <section className="py-28 md:py-36 border-b border-greyon-stone/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-xl mb-20">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-greyon-gold-deep">
              Design Principles
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-greyon-ink">
              Quiet Luxury Grounded in Noble Materiality
            </h2>
          </div>

          {/* Minimalist 4-Column Grid with Hairline Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {VALUES.map((val, idx) => {
              const Icon = val.icon
              return (
                <article
                  key={idx}
                  className="flex flex-col border-t border-greyon-stone/50 pt-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <Icon className="w-5 h-5 stroke-[1.25] text-greyon-gold-deep" />
                    <span className="font-display text-xs text-greyon-muted tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-greyon-ink mb-3">
                    {val.title}
                  </h3>
                  <p className="font-body text-sm text-greyon-muted leading-relaxed font-light">
                    {val.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Chronological Heritage / Milestones ─────────────── */}
      <section className="py-28 md:py-36 bg-greyon-sand/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-greyon-stone/40">
            <div>
              <span className="font-display text-xs tracking-[0.25em] uppercase text-greyon-gold-deep">
                Monograph Archive
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-greyon-ink">
                A Decade of Spatial Innovation
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 font-display text-xs tracking-widest uppercase text-greyon-ink hover:text-greyon-primary transition-colors duration-200 group"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Clean Editorial Timeline Strip */}
          <div className="divide-y divide-greyon-stone/40">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group"
              >
                <div className="md:col-span-3">
                  <span className="font-display text-3xl md:text-4xl font-light tracking-tight text-greyon-ink/80 group-hover:text-greyon-primary transition-colors duration-300">
                    {event.year}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-lg font-medium text-greyon-ink">
                    {event.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="font-body text-sm text-greyon-muted leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}