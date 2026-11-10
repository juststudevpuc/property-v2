import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  HOTEL_SANCTUARIES,
  SANCTUARY_CATEGORIES,
  type SanctuaryFilterCategory,
  type HotelSanctuary,
} from '@/data/hotels'

const EASE = [0.165, 0.84, 0.44, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export default function HotelListPage() {
  const [activeCategory, setActiveCategory] = useState<SanctuaryFilterCategory>('All Sanctuaries')

  // Filter sanctuaries according to active category
  const filteredSanctuaries = useMemo(() => {
    if (activeCategory === 'All Sanctuaries') {
      return HOTEL_SANCTUARIES
    }
    return HOTEL_SANCTUARIES.filter((hotel) => hotel.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-greyon-gold/20">
      
      {/* ── 1. Centered Editorial Header ──────────────────────────── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-14 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
              <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
                Hotels &amp; Resorts
              </span>
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-6">
              Sanctuaries of Space &amp; Serenity
            </h1>

            {/* Editorial Narrative */}
            <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed max-w-2xl mx-auto">
              Conceived as private havens of architectural peace, our hotel sanctuaries offer an 
              unhurried immersion into the world’s most evocative natural landscapes. Unlike our 
              permanent residential portfolio, these destinations are crafted for restorative short-stay 
              journeys, distinguished by intuitive personal care and generous, tranquil space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Minimalist Filter Bar & Live Count ──────────────────── */}
      <section className="sticky top-0 z-30 bg-[#faf8f6]/95 backdrop-blur-md border-y border-stone-300/60 py-3.5 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            {SANCTUARY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className="relative pb-2 pt-1 text-xs sm:text-sm tracking-wider uppercase font-display whitespace-nowrap transition-colors cursor-pointer focus:outline-none"
                >
                  <span
                    className={
                      isActive
                        ? 'text-greyon-ink font-medium'
                        : 'text-greyon-muted/75 hover:text-greyon-ink'
                    }
                  >
                    {category}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="hotelFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a35a]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Live Sanctuary Count */}
          <div className="text-[11px] sm:text-xs tracking-widest uppercase font-display text-greyon-muted self-end sm:self-center shrink-0">
            {filteredSanctuaries.length < 10
              ? `0${filteredSanctuaries.length}`
              : filteredSanctuaries.length}{' '}
            {filteredSanctuaries.length === 1 ? 'Sanctuary' : 'Sanctuaries'}
          </div>

        </div>
      </section>

      {/* ── 3. 2-Column Editorial Destination Grid ────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16 lg:gap-y-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredSanctuaries.map((hotel: HotelSanctuary) => (
                <motion.article
                  key={hotel.id}
                  layout
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group flex flex-col"
                >
                  {/* Image Container with Subtle 1.03x Hover Zoom */}
                  <Link
                    to={`/hotels/${hotel.slug}`}
                    className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full overflow-hidden rounded-none bg-stone-200/60 block"
                  >
                    <img
                      src={hotel.heroImage}
                      alt={hotel.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>

                  {/* Meta & Typographic Details */}
                  <div className="flex flex-col flex-1 pt-6">
                    {/* Location Breadcrumb Eyebrow */}
                    <span className="text-[11px] tracking-[0.25em] uppercase text-greyon-gold-deep font-display font-medium block mb-2">
                      {hotel.location.formatted}
                    </span>

                    {/* Sanctuary Name */}
                    <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink group-hover:text-greyon-primary transition-colors tracking-tight">
                      <Link to={`/hotels/${hotel.slug}`}>
                        {hotel.name}
                      </Link>
                    </h2>

                    {/* Editorial Description */}
                    <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mt-2.5 line-clamp-2">
                      {hotel.editorialIntro}
                    </p>

                    {/* 1-Line Summary Spec Strip (No Nightly Rates, matching Aman directory) */}
                    <div className="border-t border-stone-300/60 pt-3.5 mt-5 text-[11px] sm:text-xs tracking-wider uppercase font-display text-greyon-ink/85">
                      {hotel.summarySpecs}
                    </div>

                    {/* Twin Action Links */}
                    <div className="pt-5 mt-auto flex items-center justify-between border-t border-stone-300/40">
                      <Link
                        to={`/hotels/${hotel.slug}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-display text-greyon-ink hover:text-greyon-gold-deep transition-colors font-medium group/link"
                      >
                        <span>Explore Sanctuary</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        to={`/booking?hotel=${hotel.slug}`}
                        className="text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium border-b border-[#c4a35a]/60 pb-0.5 hover:border-greyon-ink"
                      >
                        Reserve
                      </Link>
                    </div>

                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Serene Bottom Narrative Quote ──────────────────────── */}
      <section className="py-20 border-t border-stone-300/60 bg-[#f7f5f2]">
        <div className="max-w-[960px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-light text-greyon-ink italic tracking-tight leading-relaxed">
            “True luxury is quiet. It is found in space, privacy, and the unhurried passage of time.”
          </p>
          <span className="block mt-4 text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep">
            The GREYON Hospitality Ethos
          </span>
        </div>
      </section>

    </div>
  )
}

