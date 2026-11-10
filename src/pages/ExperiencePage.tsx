import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.165, 0.84, 0.44, 1] as const

/* ─── Motion variants ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

/* ─── Shared eyebrow ──────────────────────────────────────── */
function Eyebrow({
  children,
  tone = 'gold-deep',
}: {
  children: ReactNode
  tone?: 'gold-deep' | 'gold'
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-[1px] bg-greyon-gold" />
      <span
        className={cn(
          'text-[11px] uppercase tracking-[0.28em] font-medium',
          tone === 'gold' ? 'text-greyon-gold' : 'text-greyon-gold-deep'
        )}
      >
        {children}
      </span>
    </div>
  )
}

/* ─── Pillar data ─────────────────────────────────────────── */
interface ExperiencePillar {
  id: string
  index: string
  kicker: string
  title: string
  description: string
  highlights: string[]
  image: string
  alt: string
}

const PILLARS: ExperiencePillar[] = [
  {
    id: 'spatial-harmony',
    index: '01',
    kicker: 'Spatial Harmony',
    title: 'Architectural Sanctuary',
    description:
      'Proportion is the first luxury. Each residence is organised around daylight, cross-ventilation, and the quiet distance between rooms — so that a household can occupy the same building for decades without ever feeling crowded by it.',
    highlights: [
      'Biophilic planning with planted courtyards and framed sightlines',
      'Natural stone and timber palettes, unfinished to age honestly',
      'Acoustic separation engineered between every floor plate',
      'Cantilevered living terraces held clear of the envelope',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    alt: 'Residence living space framed by natural stone and timber',
  },
  {
    id: 'bespoke-concierge',
    index: '02',
    kicker: 'Bespoke Concierge',
    title: 'Invisible Stewardship',
    description:
      'A residence is only restful if its operation is invisible. Our stewardship desk anticipates rather than responds — holding the household calendar, the vehicles, the travel, and the staffing in one continuous line of responsibility.',
    highlights: [
      'Private butler and lifestyle desk, staffed around the clock',
      'Curated cultural access and gallery appointments',
      'Chauffeured mobility and private aviation coordination',
      'In-residence dining arranged with the estate kitchen',
    ],
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85',
    alt: 'Private villa terrace prepared for guest arrival',
  },
  {
    id: 'holistic-wellness',
    index: '03',
    kicker: 'Holistic Wellness',
    title: 'Restorative Rituals',
    description:
      'Wellness here is structural rather than scheduled. Light temperature, air quality, and acoustic calm are designed into the fabric of the building, then supported by a thermal suite and treatment rooms kept for residents alone.',
    highlights: [
      'Thermal hydrotherapy circuit and cold plunge',
      'Private movement studios with natural daylight',
      'Circadian lighting tuned to the hour of the day',
      'Botanical treatments drawn from the estate garden',
    ],
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=85',
    alt: 'Thermal wellness suite with stone treatment tables',
  },
  {
    id: 'culinary-social',
    index: '04',
    kicker: 'Culinary & Social',
    title: 'Epicurean Gatherings',
    description:
      'Hosting is a form of architecture. The estate provides the table, the cellar, and the kitchen; the household provides the occasion. What follows is arranged quietly and cleared completely.',
    highlights: [
      'Private cellar tastings led by the estate sommelier',
      "Chef's table residences for twelve seats",
      'Garden lounges held for residents through the evening',
      'Catering and service staffed in house',
    ],
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85',
    alt: 'Private dining room set for an evening service',
  },
]

/* ─── Day-in-residence data ───────────────────────────────── */
interface DayMoment {
  id: string
  time: string
  label: string
  title: string
  description: string
  highlights: string[]
  image: string
  alt: string
  coordinates: string
  ambient: string
}

const DAY_MOMENTS: DayMoment[] = [
  {
    id: 'morning',
    time: '07:00',
    label: 'Morning Ritual',
    title: 'First light, before the house wakes',
    description:
      'The terrace faces east by design. Meditation is unguided and unscheduled; breakfast is prepared in residence and left where it will be found.',
    highlights: [
      'Sunrise terrace meditation, unstaffed by intention',
      'Artisanal breakfast served in residence',
      'Garden walk along the planted north edge',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    alt: 'Morning light across a stone terrace',
    coordinates: '13.7563° N, 100.5018° E',
    ambient: '21°C · Clear · Low wind',
  },
  {
    id: 'afternoon',
    time: '13:00',
    label: 'Afternoon Sanctuary',
    title: 'The slowest hours of the day',
    description:
      'The pool pavilion holds shade through the afternoon. Should the household prefer the city, the desk arranges a gallery appointment and a car, and nothing else is required of them.',
    highlights: [
      'Private pool pavilion with shaded lounging',
      'Thermal spa circuit and cold plunge',
      'Curated gallery and studio visits by appointment',
    ],
    image:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=2000&q=85',
    alt: 'Shaded pool pavilion in afternoon light',
    coordinates: '13.7563° N, 100.5018° E',
    ambient: '32°C · Hazy · Still',
  },
  {
    id: 'evening',
    time: '19:30',
    label: 'Evening Soirée',
    title: 'The house turns toward the garden',
    description:
      'Lighting steps down as the sun does. Dinner is served at the long table, introduced course by course, and paired from a cellar chosen with the household rather than for it.',
    highlights: [
      "Sommelier-led private dining at the chef's table",
      'Twilight architectural illumination of the facades',
      'Cellar tasting for up to twelve guests',
    ],
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=85',
    alt: 'Evening table setting under warm architectural lighting',
    coordinates: '13.7563° N, 100.5018° E',
    ambient: '27°C · Clear · Still',
  },
]

/* ─── Materiality data ────────────────────────────────────── */
interface Material {
  name: string
  index: string
  origin: string
  detail: string
}

const MATERIALS: Material[] = [
  {
    name: 'Travertine Stone',
    index: '01',
    origin: 'Tivoli, Italy',
    detail: 'Vein-cut and honed, laid in full slabs so the grain runs unbroken across each floor plate.',
  },
  {
    name: 'Brushed Champagne Brass',
    index: '02',
    origin: 'Hand-finished',
    detail: 'Hardware, thresholds, and joinery pulls brushed by hand and left unlacquered to darken slowly.',
  },
  {
    name: 'Aged Teak',
    index: '03',
    origin: 'Reclaimed, Northern Thailand',
    detail: 'Salvaged structural teak, re-milled for ceilings and screens, retaining its original patina.',
  },
  {
    name: 'Acoustic Glass',
    index: '04',
    origin: 'Laminated, triple-glazed',
    detail: 'Full-height assemblies tuned to hold the city outside without narrowing the daylight.',
  },
]

/* ─── Page ────────────────────────────────────────────────── */
export default function ExperiencePage() {
  const [activeMoment, setActiveMoment] = useState<string>(DAY_MOMENTS[0].id)
  const currentMoment =
    DAY_MOMENTS.find((moment) => moment.id === activeMoment) ?? DAY_MOMENTS[0]

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink selection:bg-greyon-gold/20 selection:text-greyon-ink">
      {/* ── A. Full-Bleed Editorial Hero ────────────────────── */}
      <section
        className="relative min-h-[92vh] w-full flex items-end overflow-hidden bg-greyon-dark"
        aria-label="The GREYON art of living"
      >
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
          alt="Architectural facade at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />

        {/* Ambient overlays */}
        <div className="absolute inset-0 bg-greyon-dark/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark via-greyon-dark/40 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-40">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end"
          >
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp}>
                <Eyebrow tone="gold">The GREYON Art of Living</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08]"
              >
                Sanctuaries of Quiet
                <br />
                Architecture &amp; Timeless
                <br />
                Hospitality
              </motion.h1>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-5">
              <p className="text-sm sm:text-base font-light text-greyon-sand/90 leading-relaxed max-w-xl">
                GREYON harmonises raw mineral architecture with bespoke private concierge service
                and holistic wellness, so that a residence performs quietly in the background of a
                life rather than demanding attention within it. What follows is not a list of
                amenities but a description of how a day is actually spent.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── B. Four-Pillar Sensory Journey ──────────────────── */}
      <section className="bg-greyon-cream py-28 md:py-36" aria-label="The four pillars">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mb-20 md:mb-28">
            <Eyebrow>Four Experiences</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.15] text-greyon-ink">
              The pillars a GREYON residence is built around
            </h2>
          </div>

          <div className="space-y-24 md:space-y-36">
            {PILLARS.map((pillar, idx) => {
              const isReversed = idx % 2 === 1
              return (
                <motion.article
                  key={pillar.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* Media */}
                  <div
                    className={cn(
                      'lg:col-span-7 relative overflow-hidden group bg-greyon-sand',
                      'aspect-[4/3] sm:aspect-[16/10]',
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    )}
                  >
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Copy */}
                  <div
                    className={cn(
                      'lg:col-span-5',
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    )}
                  >
                    {/* Studio metadata notation */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] tracking-[0.28em] uppercase text-greyon-gold-deep font-medium">
                        Experience {pillar.index}
                      </span>
                      <span className="text-greyon-stone select-none">//</span>
                      <span className="text-[11px] tracking-[0.28em] uppercase text-greyon-muted">
                        {pillar.kicker}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-[1.2] text-greyon-ink mb-5">
                      {pillar.title}
                    </h3>

                    <p className="text-sm font-light text-greyon-muted leading-relaxed mb-8">
                      {pillar.description}
                    </p>

                    <ul className="space-y-3">
                      {pillar.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="text-greyon-gold select-none leading-relaxed">—</span>
                          <span className="text-sm font-light text-greyon-ink/80 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── C. A Day in Residence ───────────────────────────── */}
      <section className="bg-greyon-sand/40 py-28 md:py-36" aria-label="A day in residence">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header + time tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-greyon-stone/50 mb-12">
            <div className="max-w-xl">
              <Eyebrow>A Day in Residence</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-[1.15] text-greyon-ink">
                Three hours, three atmospheres
              </h2>
            </div>

            <nav
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
              aria-label="Select a time of day"
            >
              {DAY_MOMENTS.map((moment) => {
                const isActive = activeMoment === moment.id
                return (
                  <button
                    key={moment.id}
                    type="button"
                    onClick={() => setActiveMoment(moment.id)}
                    aria-pressed={isActive}
                    className="relative pb-2 group cursor-pointer focus:outline-none"
                  >
                    <span
                      className={cn(
                        'text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
                        isActive
                          ? 'text-greyon-ink font-medium'
                          : 'text-greyon-muted/80 group-hover:text-greyon-ink'
                      )}
                    >
                      {moment.time} // {moment.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="experienceTimeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-greyon-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Crossfade panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-greyon-sand">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMoment.id}
                  src={currentMoment.image}
                  alt={currentMoment.alt}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Ambient metadata caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between gap-4 bg-gradient-to-t from-greyon-dark/80 to-transparent">
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/80">
                  {currentMoment.coordinates}
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-greyon-gold">
                  {currentMoment.ambient}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMoment.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <span className="block text-[11px] tracking-[0.25em] uppercase text-greyon-gold-deep mb-3">
                    {currentMoment.time} — {currentMoment.label}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-[1.2] text-greyon-ink mb-5">
                    {currentMoment.title}
                  </h3>

                  <p className="text-sm font-light text-greyon-muted leading-relaxed mb-8">
                    {currentMoment.description}
                  </p>

                  <ul className="space-y-3">
                    {currentMoment.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-greyon-gold select-none leading-relaxed">—</span>
                        <span className="text-sm font-light text-greyon-ink/80 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── D. Materiality & Craftsmanship ──────────────────── */}
      <section className="bg-greyon-dark text-white py-28 md:py-36" aria-label="Materiality">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <Eyebrow tone="gold">Materiality &amp; Craft</Eyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.12] text-white">
                Four materials, chosen for how they age
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm font-light text-greyon-sand/80 leading-relaxed">
                Nothing here is applied as a finish. Each material is structural, repairable, and
                selected because it improves rather than degrades with a decade of use.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {MATERIALS.map((material) => (
              <article
                key={material.name}
                className="flex flex-col border-t border-white/15 pt-6"
              >
                <span className="text-[10px] tracking-[0.28em] uppercase text-greyon-gold mb-5">
                  {material.index}
                </span>
                <h3 className="text-base sm:text-lg font-light text-white tracking-tight mb-2">
                  {material.name}
                </h3>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-4">
                  {material.origin}
                </span>
                <p className="text-xs font-light text-greyon-sand/70 leading-relaxed">
                  {material.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── E. Private Preview CTA ──────────────────────────── */}
      <section className="bg-greyon-cream py-24 md:py-32" aria-label="Private preview">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>By Appointment</Eyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.12] text-greyon-ink">
                The experience is best
                <br className="hidden sm:inline" /> understood in person.
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-sm font-light text-greyon-muted leading-relaxed mb-8">
                Private previews are arranged individually, with time in the residence rather than
                a presentation about it. Seasonal stay packages can be reviewed in advance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 btn-primary text-[11px] font-medium tracking-[0.2em] uppercase group focus:outline-none focus-visible:ring-2 focus-visible:ring-greyon-gold focus-visible:ring-offset-2"
                >
                  <span>Schedule a Private Experience</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/offers"
                  className="text-[11px] tracking-[0.2em] uppercase text-greyon-muted hover:text-greyon-ink transition-colors duration-300 underline underline-offset-[6px] decoration-greyon-stone hover:decoration-greyon-gold"
                >
                  Explore Seasonal Stays
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
