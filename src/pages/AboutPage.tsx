import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Gem,
  Layers,
  Leaf,
  Users,
} from 'lucide-react'

/* ─── Tabs Data for Interactive Hero ─────────────────────── */
interface AboutTab {
  id: string
  label: string
  title: string
  image: string
  description: [string, string]
}

const ABOUT_TABS: AboutTab[] = [
  {
    id: 'about',
    label: 'About us',
    title: 'Crafting Habitats Where Architecture Meets The Human Soul',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    description: [
      'Established since 2015, Schneitec Property dedicates itself to redefining modern living. With a customer-first philosophy, we craft residences that combine innovation, architectural purity, and human touch, delivering homes that elevate everyday life.',
      'We reject repetitive developer formulas to champion tailored architectural spaces centered on wellness, clarity, and enduring distinction across Bangkok and beyond.',
    ],
  },
  {
    id: 'vision',
    label: 'Vision',
    title: 'Pioneering Human-Centric Architectural Wellness',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    description: [
      'Our vision is to set the benchmark for modern luxury living across Southeast Asia, delivering residences that transcend utilitarian structures to become timeless works of living art.',
      'We envision environments where high-performance engineering harmonizes with natural elements—cultivating sanctuaries that nurture clarity, calm, and multi-generational connection.',
    ],
  },
  {
    id: 'mission',
    label: 'Mission',
    title: 'Transforming Cities Through Purpose and Emotion',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    description: [
      'To challenge the commodification of urban development by ensuring every square meter possesses intentional purpose, emotional resonance, and sustainable integrity.',
      'We partner with world-renowned master planners and craftsmen to deliver homes characterized by meticulous detailing, noble materials, and enduring investment value.',
    ],
  },
  {
    id: 'culture',
    label: 'Culture',
    title: 'An Obsession with Craft, Detail, and Integrity',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85',
    description: [
      'Our culture thrives on collaborative boldness, spatial curiosity, and an uncompromising commitment to architectural perfection at every stage of development.',
      'Every member of our team is guided by empathy and craft—listening intently to how people aspire to live and translating those dreams into inspiring physical reality.',
    ],
  },
]

/* ─── Timeline Events Data ───────────────────────────────── */
const TIMELINE_EVENTS = [
  {
    year: '2015',
    title: 'Inception of The Creators HQ',
    description:
      'Established in Bangkok with a radical vision: rejecting repetitive developer formulas to champion tailored architectural spaces centered on human wellness.',
  },
  {
    year: '2017',
    title: 'C Ekkamai Milestone',
    description:
      'Unveiled our premier 44-story skyline tower on Sukhumvit 63, earning critical acclaim for elevating high-density vertical living into an art form.',
  },
  {
    year: '2019',
    title: 'Common TU Community Hub',
    description:
      'Pioneered human-scale co-living with Common TU, selling out in record time and setting new benchmarks for university-adjacent student residences.',
  },
  {
    year: '2022',
    title: 'Corner Ratchathewi',
    description:
      'Launched an iconic high-rise 300 meters from BTS Ratchathewi, blending skyline hydroponic gardens with dual-key layouts for global citizens.',
  },
  {
    year: '2024',
    title: 'Curva Ekkamai Boutique Release',
    description:
      'Engineered an ultra-exclusive 12-unit low-rise sanctuary showcasing fluid curved facades and private botanical courtyard lift entries.',
  },
  {
    year: '2025',
    title: 'CIRA Residences Flagship',
    description:
      'Introduced our crown jewel: ultra-luxury private detached houses in prime central Bangkok starting at 125 MB, designed for multi-generational wealth preservation.',
  },
]

/* ─── Core Values Data ───────────────────────────────────── */
const VALUES = [
  {
    icon: Gem,
    title: 'Authentic Craftsmanship',
    description:
      'We curate raw, noble materials—hand-selected Italian marbles, solid natural timber, and tactile stone—that age gracefully with time.',
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

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<string>('about')
  const currentTab = ABOUT_TABS.find((t) => t.id === activeTab) || ABOUT_TABS[0]

  return (
    <div className="min-h-screen">
      {/* ── Interactive Full-Screen Hero Section ── */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden">
        {/* Full-screen background image with smooth crossfade */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentTab.id}
            src={currentTab.image}
            alt={currentTab.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </AnimatePresence>

        {/* Darkening overlay for text readability */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />

        {/* ── Bottom Gradient & Aurora matching Footer (#070D17) ── */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 sm:h-80 md:h-96 pointer-events-none overflow-hidden z-[1]"
          aria-hidden="true"
        >
          {/* Smooth vertical fade directly into footer background */}
          <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark via-greyon-dark/75 to-transparent" />

          {/* Soft ambient aurora glow blobs matching footer */}
          <div className="absolute -bottom-20 left-1/4 w-[480px] h-[280px] rounded-full bg-greyon-primary opacity-60 blur-[100px]" />
          <div className="absolute -bottom-20 right-1/4 w-[480px] h-[280px] rounded-full bg-greyon-gold-deep opacity-50 blur-[110px]" />
        </div>

        {/* Hero content container */}
        <div className="container-large relative z-10 w-full pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column (Menu) */}
            <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-6">
              {ABOUT_TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left text-3xl sm:text-4xl md:text-5xl font-light tracking-tight transition-all duration-300 focus:outline-none ${isActive
                        ? 'text-white'
                        : 'text-white/50 hover:text-white'
                      }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Right Column (Content) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="max-w-2xl"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.2] mb-6 sm:mb-8">
                    {currentTab.title}
                  </h1>
                  <div className="space-y-5 text-base sm:text-lg font-light text-greyon-sand leading-relaxed">
                    <p>{currentTab.description[0]}</p>
                    <p>{currentTab.description[1]}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Philosophy Narrative ── */}
      {/* <section className="container-large mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
              The Manifesto
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#EAF3FB] leading-snug">
              Every Square Meter Must Have Purpose and Emotion
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base md:text-lg font-light text-[#D4DDE3]/85 leading-relaxed">
            <p>
              In a rapidly modernizing metropolis like Bangkok, high-density residential towers too
              frequently succumb to repetitive grids and disposable materials. The Creators HQ was
              founded as a deliberate counterweight to this commodification.
            </p>
            <p>
              We believe great architecture is experienced from the inside out: how morning sunlight
              filters through a bespoke louver, how natural acoustic dampening creates quietude in a
              vibrant district, and how spatial proportions instill tranquility after demanding days.
            </p>
            <p>
              By collaborating exclusively with award-winning master planners, structural innovators,
              and landscape visionaries, each development under our banner is an enduring testament
              to elevated living.
            </p>
          </div>
        </div>
      </section> */}

      {/* ── Timeline Milestone Block ── */}
      {/* <section className="bg-greyon-dark/60 py-24 md:py-32 border-y border-greyon-stone/20 mb-28">
        <div className="container-large">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-greyon-gold mb-3">
              A Decade of Distinction
            </p>
            <h2 className="heading-h2 text-white">
              Our Journey &amp; Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TIMELINE_EVENTS.map(({ year, title, description }) => (
              <div
                key={year}
                className="p-8 rounded-sm bg-greyon-dark/70 border border-greyon-stone/20 hover:border-greyon-gold/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-light text-white tracking-wider block mb-4 border-b border-greyon-stone/20 pb-3">
                    {year}
                  </span>
                  <h3 className="text-lg font-normal text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-sm font-light text-greyon-sand/80 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Core Values Grid ── */}
      {/* <section className="container-large mb-28">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-greyon-gold mb-3">
            Guiding Principles
          </p>
          <h2 className="heading-h2 text-white">
            The Pillars of Our Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-sm bg-greyon-dark/40 border border-greyon-stone/20 hover:border-greyon-gold/40 transition-all group"
            >
              <div className="h-10 w-10 rounded-sm bg-greyon-dark flex items-center justify-center text-greyon-sand mb-6 group-hover:bg-greyon-primary group-hover:text-white transition-all">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-normal text-white mb-3">
                {title}
              </h3>
              <p className="text-xs font-light text-greyon-sand/80 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── Bottom Call To Action ── */}
      {/* <section className="container-large">
        <div className="p-8 sm:p-14 rounded-sm bg-greyon-dark border border-greyon-stone/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-greyon-gold block mb-2">
              Explore Our Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">
              Ready to Discover Your Next Sanctuary?
            </h2>
            <p className="text-sm font-light text-greyon-sand/80 max-w-xl">
              From super-luxury detached villas to landmark skyline condominiums, tour our complete portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 btn-primary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 btn-secondary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  )
}
