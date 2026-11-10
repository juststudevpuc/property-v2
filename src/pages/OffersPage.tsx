import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowRight, X, Check } from 'lucide-react'
import { OFFERS, FEATURED_OFFER, OFFER_CATEGORIES } from '@/data/offers'
import type { Offer } from '@/types'
import { cn } from '@/lib/utils'

type Category = (typeof OFFER_CATEGORIES)[number]

const EASE = [0.165, 0.84, 0.44, 1] as const

/* ─── Motion variants ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

/* ─── Shared eyebrow ──────────────────────────────────────── */
function Eyebrow({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'light' }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={cn('w-8 h-[1px]', tone === 'gold' ? 'bg-greyon-gold' : 'bg-greyon-gold/70')} />
      <span
        className={cn(
          'text-[11px] uppercase tracking-[0.28em] font-medium',
          tone === 'gold' ? 'text-greyon-gold-deep' : 'text-greyon-gold'
        )}
      >
        {children}
      </span>
    </div>
  )
}

/* ─── Offer detail slide-over ─────────────────────────────── */
function OfferDrawer({
  offer,
  onClose,
}: {
  offer: Offer | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  /* Escape to close + scroll lock while open */
  useEffect(() => {
    if (!offer) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [offer, onClose])

  return (
    <AnimatePresence>
      {offer && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={offer.title}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-greyon-dark/70 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-y-0 right-0 w-full max-w-[560px] bg-greyon-cream flex flex-col overflow-y-auto"
          >
            {/* Media header */}
            <div className="relative h-[240px] sm:h-[280px] w-full overflow-hidden bg-greyon-dark shrink-0">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/85 via-greyon-dark/20 to-transparent" />

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close offer details"
                className="absolute top-5 right-5 inline-flex items-center justify-center h-9 w-9 border border-white/30 text-white/90 hover:bg-white hover:text-greyon-dark transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-greyon-gold"
              >
                <X size={16} />
              </button>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="block text-[10px] tracking-[0.28em] uppercase text-greyon-gold mb-2">
                  {offer.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-tight">
                  {offer.title}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 sm:p-8">
              <p className="text-[11px] tracking-[0.25em] uppercase text-greyon-muted mb-6">
                {offer.validity}
              </p>

              <p className="text-sm font-light text-greyon-ink/90 leading-relaxed mb-8">
                {offer.description}
              </p>

              {/* Inclusions */}
              <div className="mb-8">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-greyon-gold-deep mb-4">
                  Package Inclusions
                </h3>
                <ul className="space-y-3">
                  {offer.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-greyon-gold-deep select-none leading-relaxed">—</span>
                      <span className="text-sm font-light text-greyon-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applicable properties */}
              <div className="mb-10 pt-6 border-t border-greyon-stone/50">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-greyon-gold-deep mb-4">
                  Applicable Properties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {offer.applicableProperties.map((property) => (
                    <span
                      key={property}
                      className="px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-greyon-ink bg-greyon-sand"
                    >
                      {property}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terms note */}
              <p className="text-[11px] font-light italic text-greyon-muted/80 leading-relaxed mb-8">
                *Availability is limited and subject to seasonal occupancy. Terms are confirmed in
                writing at the point of reservation.
              </p>

              {/* CTA */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-between gap-4 w-full px-7 py-4 btn-primary text-[11px] font-medium tracking-[0.2em] uppercase"
              >
                <span>Schedule Private Consultation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All Offers')
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  const filteredOffers = useMemo(() => {
    if (activeCategory === 'All Offers') return OFFERS
    return OFFERS.filter((offer) => offer.category === activeCategory)
  }, [activeCategory])

  const countLabel = String(filteredOffers.length).padStart(2, '0')

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink pt-32 sm:pt-40 pb-0 select-none">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── A. Editorial Hero Header ────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          aria-label="Offers introduction"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-16 sm:pb-20 border-b border-greyon-stone/40"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp}>
              <Eyebrow>Seasonal Privileges &amp; Packages</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-greyon-ink"
            >
              Curated Offers
              <br />
              &amp; Bespoke Stays
            </motion.h1>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <p className="text-sm sm:text-base font-light text-greyon-muted leading-relaxed max-w-xl">
              GREYON extends a private set of privileges to residents and their guests — seasonal
              residency packages, dining and wellness access, and quietly held occasions across the
              portfolio. Each package is arranged by our hospitality desk rather than a booking
              channel, so the terms are drawn around the household rather than the calendar.
            </p>
          </motion.div>
        </motion.section>

        {/* ── B. Featured Flagship Offer ──────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          aria-label="Featured flagship package"
          className="py-16 sm:py-20 border-b border-greyon-stone/40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Media */}
            <div className="lg:col-span-7 relative overflow-hidden group bg-greyon-sand aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={FEATURED_OFFER.image}
                alt={FEATURED_OFFER.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/45 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-5 left-5 px-3 py-1.5 bg-greyon-cream text-greyon-ink text-[10px] tracking-[0.22em] uppercase">
                Flagship Package
              </span>
            </div>

            {/* Content */}
            <div className="lg:col-span-5">
              <span className="block text-[10px] tracking-[0.28em] uppercase text-greyon-gold-deep mb-3">
                {FEATURED_OFFER.validity}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-[1.15] text-greyon-ink mb-2">
                {FEATURED_OFFER.title}
              </h2>
              <p className="text-sm font-light text-greyon-primary mb-6">
                {FEATURED_OFFER.tagline}
              </p>

              <p className="text-sm font-light text-greyon-muted leading-relaxed mb-8">
                {FEATURED_OFFER.description}
              </p>

              <ul className="space-y-3 mb-10">
                {FEATURED_OFFER.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-greyon-gold select-none leading-relaxed">—</span>
                    <span className="text-sm font-light text-greyon-ink/85 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedOffer(FEATURED_OFFER)}
                  className="inline-flex items-center gap-3 px-8 py-4 btn-primary text-[11px] font-medium tracking-[0.2em] uppercase cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-greyon-gold focus-visible:ring-offset-2"
                >
                  <span>Inquire Privilege</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOffer(FEATURED_OFFER)}
                  className="text-[11px] tracking-[0.2em] uppercase text-greyon-muted hover:text-greyon-ink transition-colors duration-300 cursor-pointer underline underline-offset-[6px] decoration-greyon-stone hover:decoration-greyon-gold"
                >
                  View Full Terms
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── C. Category Filter Bar ──────────────────────────── */}
        <div id="offers-collection" className="scroll-mt-32 pt-16 sm:pt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-greyon-stone/40 mb-10 sm:mb-12">
            <nav
              className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-9"
              aria-label="Filter offers by category"
            >
              {OFFER_CATEGORIES.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className="relative pb-2 focus:outline-none cursor-pointer group"
                  >
                    <span
                      className={cn(
                        'text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
                        isActive
                          ? 'text-greyon-ink font-medium'
                          : 'text-greyon-muted/80 group-hover:text-greyon-ink'
                      )}
                    >
                      {category}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="offerCategoryUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-greyon-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            <span className="text-[11px] tracking-[0.25em] uppercase text-greyon-muted/80 font-medium shrink-0">
              {countLabel} Privileges
            </span>
          </div>

          {/* ── D. Offers Collection Grid ─────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pb-24 sm:pb-28">
            <AnimatePresence mode="popLayout">
              {filteredOffers.map((offer) => (
                <motion.article
                  layout
                  key={offer.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="group flex flex-col"
                >
                  {/* Media */}
                  <button
                    type="button"
                    onClick={() => setSelectedOffer(offer)}
                    aria-label={`View details for ${offer.title}`}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-greyon-sand cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-greyon-gold focus-visible:ring-offset-2"
                  >
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <span className="absolute inset-x-0 bottom-0 px-4 py-3 text-[10px] tracking-[0.22em] uppercase text-white bg-gradient-to-t from-greyon-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Explore Package
                    </span>
                  </button>

                  {/* Meta */}
                  <div className="mt-5 flex items-center justify-between gap-3 text-[10px] tracking-[0.2em] uppercase">
                    <span className="text-greyon-gold-deep">{offer.category}</span>
                    <span className="text-greyon-muted/80 text-right">{offer.validity}</span>
                  </div>

                  {/* Title + description */}
                  <button
                    type="button"
                    onClick={() => setSelectedOffer(offer)}
                    className="text-left cursor-pointer focus:outline-none mt-3"
                  >
                    <h3 className="text-lg sm:text-xl font-light tracking-tight text-greyon-ink leading-snug transition-colors duration-300 group-hover:text-greyon-primary">
                      {offer.title}
                    </h3>
                  </button>
                  <p className="mt-3 text-sm font-light text-greyon-muted leading-relaxed line-clamp-3">
                    {offer.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-5 space-y-2">
                    {offer.highlights.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          size={12}
                          strokeWidth={1.5}
                          className="mt-[5px] shrink-0 text-greyon-gold"
                        />
                        <span className="text-xs font-light text-greyon-ink/75 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action */}
                  <div className="mt-auto pt-6">
                    <div className="pt-4 border-t border-greyon-stone/40 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedOffer(offer)}
                        className="text-[11px] tracking-[0.2em] uppercase text-greyon-ink hover:text-greyon-gold-deep transition-colors duration-300 cursor-pointer focus:outline-none"
                      >
                        {offer.ctaLabel}
                      </button>
                      <span className="text-greyon-ink text-sm transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredOffers.length === 0 && (
            <div className="pb-28 text-center">
              <p className="text-[11px] tracking-[0.25em] uppercase text-greyon-muted">
                No privileges currently filed under this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── F. Bespoke Advisory CTA ───────────────────────────-- */}
      <section className="bg-greyon-dark text-white" aria-label="Bespoke advisory">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">Bespoke Arrangements</Eyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.12] text-white">
                Nothing here quite fits?
                <br className="hidden sm:inline" /> We will draw it around you.
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-sm font-light text-greyon-sand/80 leading-relaxed mb-8">
                For long-stay households, corporate residencies, and private occasions, our advisory
                desk assembles packages outside the published collection — terms, staffing, and
                access arranged to the household rather than a template.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-greyon-dark transition-colors duration-300 group"
              >
                <span>Request a Bespoke Package</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail slide-over */}
      <OfferDrawer offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
    </div>
  )
}
