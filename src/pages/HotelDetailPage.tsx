import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowRight, ArrowLeft, X } from 'lucide-react'
import {
  HOTEL_SANCTUARIES,
  type HotelSanctuary,
  type AccommodationItem,
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

export default function HotelDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const hotel: HotelSanctuary | undefined = HOTEL_SANCTUARIES.find((h) => h.slug === slug)

  const [activeTab, setActiveTab] = useState<'pavilions' | 'villas'>('pavilions')
  const [selectedSuite, setSelectedSuite] = useState<AccommodationItem | null>(null)

  // Smooth scroll handler for sticky sub-nav
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const navOffset = 135
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Fallback state if sanctuary slug is not found
  if (!hotel) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-[#faf8f6] text-greyon-ink px-6 text-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#c4a35a]" />
          <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
            Sanctuary Archives
          </span>
          <span className="w-8 h-[1px] bg-[#c4a35a]" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-greyon-ink mb-4 tracking-tight">
          Sanctuary Not Found
        </h1>
        <p className="font-body text-sm sm:text-base text-greyon-muted font-light max-w-md leading-relaxed mb-8">
          The sanctuary destination you are searching for does not exist in our active collection or may have been relocated.
        </p>
        <Link
          to="/hotels"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-display font-medium px-8 py-3.5 border border-greyon-primary text-greyon-primary hover:bg-greyon-primary hover:text-white transition-colors rounded-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to All Sanctuaries</span>
        </Link>
      </div>
    )
  }

  const currentAccommodations: AccommodationItem[] =
    activeTab === 'pavilions' ? hotel.pavilions : hotel.villas

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-greyon-gold/20">
      
      {/* ── 1. Full-Bleed Cinematic Hero (88vh) ───────────────────────── */}
      <section className="relative h-[88vh] w-full overflow-hidden bg-stone-900 select-none">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover rounded-none"
          loading="eager"
        />

        {/* Cinematic ambient gradient overlays for optimal text legibility */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Hero Narrative Content */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end pb-16 sm:pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
              <span className="text-xs uppercase tracking-[0.3em] font-display text-[#c4a35a] font-medium">
                {hotel.location.formatted} · {hotel.category}
              </span>
            </div>

            {/* Display Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] mb-4">
              {hotel.name}
            </h1>

            {/* Tagline */}
            <p className="font-body text-base sm:text-lg md:text-xl font-light text-white/90 tracking-wide max-w-2xl leading-relaxed">
              {hotel.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Sticky Resort Sub-Nav Bar ─────────────────────────────── */}
      <nav
        aria-label="Sanctuary sections"
        className="sticky top-20 z-30 bg-[#faf8f6]/95 backdrop-blur-sm border-b border-stone-200/80 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between py-3.5 gap-4">
          
          {/* Left: Sanctuary Identifier */}
          <span className="text-xs uppercase tracking-[0.22em] font-display font-medium text-greyon-ink shrink-0 hidden sm:inline">
            {hotel.shortName}
          </span>

          {/* Center Smooth-Scroll Anchor Links */}
          <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none py-1 text-xs uppercase tracking-widest font-display text-stone-600">
            <button
              type="button"
              onClick={() => scrollToSection('overview')}
              className="hover:text-[#c4a35a] transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('accommodation')}
              className="hover:text-[#c4a35a] transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
            >
              Accommodation
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('dining')}
              className="hover:text-[#c4a35a] transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
            >
              Dining
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('wellness')}
              className="hover:text-[#c4a35a] transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
            >
              Wellness &amp; Fitness
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('location')}
              className="hover:text-[#c4a35a] transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
            >
              Location
            </button>
          </div>

          {/* Right Action: Reserve CTA Button */}
          <Link
            to={`/contact?hotel=${hotel.slug}`}
            className="shrink-0 text-xs uppercase tracking-widest font-display font-medium px-5 py-2 border border-[#c4a35a] bg-[#c4a35a] text-white hover:bg-[#8f7340] hover:border-[#8f7340] transition-colors rounded-none"
          >
            Reserve
          </Link>

        </div>
      </nav>

      {/* ── 3. Editorial Intro & "At a Glance" 3-Column Strip ─────────── */}
      <section id="overview" className="py-20 md:py-28 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Centered Editorial Narrative */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
            <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
              The Sanctuary
            </span>
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-6">
            A Haven of Space &amp; Seclusion
          </h2>

          <p className="font-body text-base sm:text-lg text-greyon-ink font-light leading-relaxed mb-4">
            {hotel.editorialIntro}
          </p>

          <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed">
            {hotel.editorialDescription}
          </p>
        </motion.div>

        {/* 3-Column Hairline "At a Glance" Grid */}
        <div className="border-y border-stone-300/60 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-16 md:mt-24">
          
          {/* Column 1: Accommodation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium mb-6 pb-2 border-b border-stone-200/80">
              Accommodation
            </h3>
            <ul className="space-y-3">
              {hotel.atAGlance.accommodation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-greyon-muted font-light leading-relaxed">
                  <span className="text-[#c4a35a] text-base leading-none select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Dining & Wellness */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium mb-6 pb-2 border-b border-stone-200/80">
              Dining &amp; Wellness
            </h3>
            <ul className="space-y-3">
              {hotel.atAGlance.diningAndWellness.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-greyon-muted font-light leading-relaxed">
                  <span className="text-[#c4a35a] text-base leading-none select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Included in Every Stay */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium mb-6 pb-2 border-b border-stone-200/80">
              Included in Every Stay
            </h3>
            <ul className="space-y-3">
              {hotel.atAGlance.includedInEveryStay.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-greyon-muted font-light leading-relaxed">
                  <span className="text-[#c4a35a] text-base leading-none select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* ── 4. Asymmetric Editorial Diptych ──────────────────────────── */}
      <section className="pb-20 md:pb-28 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 7-Col Landscape */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-stone-200">
              <img
                src={hotel.gallery[0] || hotel.heroImage}
                alt={`${hotel.name} sanctuary architecture`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-display text-greyon-muted mt-3">
              Landscape Architecture &amp; Natural Contours · {hotel.shortName}
            </span>
          </div>

          {/* Right Column: 5-Col Offset Portrait */}
          <div className="lg:col-span-5 flex flex-col lg:mt-16">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-stone-200">
              <img
                src={hotel.gallery[1] || hotel.gallery[0]}
                alt={`${hotel.name} residence interior detail`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-display text-greyon-muted mt-3">
              Sanctuary Living &amp; Secluded Terraces
            </span>
          </div>

        </div>
      </section>

      {/* ── 5. Accommodation Showcase (Pavilions & Villas) ────────────── */}
      <section id="accommodation" className="py-20 md:py-28 border-t border-stone-300/60 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
              <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
                Accommodation Directory
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight">
              Pavilions &amp; Private Villas
            </h2>
            <p className="font-display text-xs sm:text-sm tracking-wider uppercase text-greyon-muted mt-2">
              {hotel.summarySpecs}
            </p>
          </div>

          {/* Pavilions vs Villas Switcher Tabs */}
          <div className="flex items-center space-x-6 border-b border-stone-300/60 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('pavilions')}
              className="relative pb-2 text-xs sm:text-sm tracking-widest uppercase font-display cursor-pointer focus:outline-none"
            >
              <span
                className={
                  activeTab === 'pavilions'
                    ? 'text-greyon-ink font-medium'
                    : 'text-greyon-muted hover:text-greyon-ink'
                }
              >
                Pavilions ({hotel.pavilions.length})
              </span>
              {activeTab === 'pavilions' && (
                <motion.div
                  layoutId="accommodationTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a35a]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('villas')}
              className="relative pb-2 text-xs sm:text-sm tracking-widest uppercase font-display cursor-pointer focus:outline-none"
            >
              <span
                className={
                  activeTab === 'villas'
                    ? 'text-greyon-ink font-medium'
                    : 'text-greyon-muted hover:text-greyon-ink'
                }
              >
                Villas ({hotel.villas.length})
              </span>
              {activeTab === 'villas' && (
                <motion.div
                  layoutId="accommodationTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a35a]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Accommodation 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          <AnimatePresence mode="wait">
            {currentAccommodations.map((item: AccommodationItem) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group flex flex-col"
              >
                {/* Photo with subtle hover scale */}
                <div
                  onClick={() => setSelectedSuite(item)}
                  className="relative aspect-[16/10.5] w-full overflow-hidden rounded-none bg-stone-200 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="pt-6 flex flex-col flex-1">
                  
                  {/* Category and View */}
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#c4a35a] font-display font-medium block mb-1">
                    {item.category} · {item.view}
                  </span>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedSuite(item)}
                    className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight group-hover:text-greyon-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  {/* Spec Strip (No Nightly Rates) */}
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-display text-stone-500 py-3 border-y border-stone-200/80 my-3.5">
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.bedrooms}</span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Feature Highlights with Gold Em-Dashes */}
                  <ul className="space-y-1.5 mb-6">
                    {item.features.slice(0, 3).map((feature, fIdx) => (
                      <li key={fIdx} className="text-xs text-greyon-muted font-light flex items-center gap-2">
                        <span className="text-[#c4a35a] font-normal">—</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Twin Action Links */}
                  <div className="pt-4 mt-auto flex items-center justify-between border-t border-stone-200/60">
                    <button
                      type="button"
                      onClick={() => setSelectedSuite(item)}
                      className="text-xs uppercase tracking-widest font-display text-greyon-ink hover:text-[#c4a35a] transition-colors font-medium border-b border-stone-300 pb-0.5 cursor-pointer focus:outline-none"
                    >
                      Explore Suite
                    </button>

                    <Link
                      to={`/contact?hotel=${hotel.slug}&suite=${encodeURIComponent(item.name)}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium group/arr"
                    >
                      <span>Check Availability</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/arr:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* ── 6. Culinary Showcase ─────────────────────────────────────── */}
      <section id="dining" className="py-20 md:py-28 border-t border-stone-300/60 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
            <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
              Gastronomy
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight mb-4">
            Culinary Pavilions &amp; Cellars
          </h2>
          <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed">
            Celebrating harvests from surrounding coastal waters and organic regional estates, our dining venues embody culinary simplicity, seasonal integrity, and generous hospitality.
          </p>
        </div>

        {/* Venues Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${hotel.dining.length > 2 ? 'lg:grid-cols-4' : ''} gap-8 lg:gap-10`}>
          {hotel.dining.map((venue) => (
            <article key={venue.id} className="flex flex-col">
              <div className="aspect-[16/11] w-full overflow-hidden rounded-none bg-stone-200">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-5 flex flex-col flex-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#c4a35a] font-display font-medium block">
                  {venue.cuisine}
                </span>
                <h3 className="font-display text-2xl font-light text-greyon-ink tracking-tight mt-1 mb-2">
                  {venue.name}
                </h3>
                <span className="text-xs italic text-stone-500 font-light mb-2 block">
                  {venue.setting}
                </span>
                <p className="font-body text-xs sm:text-sm text-greyon-muted font-light leading-relaxed mb-4">
                  {venue.description}
                </p>
                {venue.hours && (
                  <div className="mt-auto pt-3 border-t border-stone-200/60 text-[11px] uppercase tracking-wider font-display text-stone-400">
                    {venue.hours}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* ── 7. Holistic Wellness & Offers Cross-Link ─────────────────── */}
      <section id="wellness" className="py-20 md:py-28 border-t border-stone-300/60 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
            <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
              Holistic Healing
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight mb-4">
            Restorative Wellness &amp; Rituals
          </h2>
          <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed">
            Immersive treatments guided by resident medical practitioners, naturopaths, and traditional herbal masters, designed to foster deep circadian equilibrium.
          </p>
        </div>

        {/* Split Wellness Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {hotel.wellness.map((item) => (
            <article key={item.id} className="flex flex-col">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-none bg-stone-200">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium block">
                  {item.subtitle}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mt-1 mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Signature Therapies */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] font-display text-stone-400 font-medium mb-3">
                    Signature Therapies &amp; Modalities
                  </h4>
                  <ul className="space-y-2">
                    {item.therapies.map((therapy, tIdx) => (
                      <li key={tIdx} className="text-xs text-greyon-muted font-light flex items-center gap-2">
                        <span className="text-[#c4a35a]">—</span>
                        <span>{therapy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Curated Offers Editorial Cross-Link Banner */}
        <div className="mt-16 md:mt-24 p-8 sm:p-12 md:p-16 border border-stone-300/80 bg-[#f7f5f2] relative">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.28em] font-display text-greyon-gold-deep font-medium block mb-3">
              Seasonal Privileges
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-4">
              Sanctuary Immersions &amp; Private Stays
            </h3>
            <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-6">
              From holistic multi-day wellness retreats to seasonal dining masterclasses and complimentary executive airport transfers, discover our bespoke seasonal privileges.
            </p>
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-display font-medium px-7 py-3.5 bg-greyon-ink text-white hover:bg-greyon-primary transition-colors rounded-none"
            >
              <span>Explore Seasonal Privileges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </section>

      {/* ── 8. Location & Getting There ──────────────────────────────── */}
      <section id="location" className="py-20 md:py-28 border-t border-stone-300/60 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
            <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
              Arrival &amp; Journey
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-greyon-ink tracking-tight">
            Location &amp; Getting There
          </h2>
        </div>

        {/* 3-Column Dossier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-10 border-y border-stone-300/60">
          
          {/* Dossier Col 1: Destination */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium mb-3">
              Sanctuary Address
            </h3>
            <p className="font-display text-base text-greyon-ink font-light leading-relaxed">
              {hotel.location.formatted}
            </p>
            <p className="text-xs text-greyon-muted font-light mt-1">
              {hotel.location.area}, {hotel.location.city}, {hotel.location.country}
            </p>
          </div>

          {/* Dossier Col 2: Nearest Airport */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium mb-3">
              Nearest Airport &amp; Transit
            </h3>
            <p className="font-display text-base text-greyon-ink font-light leading-relaxed">
              {hotel.gettingThere.nearestAirport}
            </p>
            <p className="text-xs text-greyon-muted font-light mt-1">
              {hotel.gettingThere.distance}
            </p>
          </div>

          {/* Dossier Col 3: Transfer Inclusions */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c4a35a] font-display font-medium mb-3">
              Chauffeured Transfers
            </h3>
            <p className="font-body text-xs sm:text-sm text-greyon-muted font-light leading-relaxed">
              {hotel.gettingThere.transferDetails}
            </p>
          </div>

        </div>

        {/* Bottom Nav Links */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-display text-greyon-ink hover:text-[#c4a35a] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View All Sanctuaries &amp; Resorts</span>
          </Link>

          <Link
            to={`/contact?hotel=${hotel.slug}`}
            className="text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium border-b border-[#c4a35a] pb-0.5"
          >
            Contact Concierge &amp; Reservations →
          </Link>
        </div>

      </section>

      {/* ── 9. Suite Details Modal ("Explore Suite") ──────────────────── */}
      <AnimatePresence>
        {selectedSuite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedSuite(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#faf8f6] text-greyon-ink border border-stone-300/80 rounded-none p-6 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSuite(null)}
                className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 border border-stone-300/80 bg-[#faf8f6]/80 backdrop-blur-sm rounded-none transition-colors cursor-pointer"
                aria-label="Close suite details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* High-res Image */}
              <div className="aspect-[16/9] w-full overflow-hidden rounded-none bg-stone-200 mb-6">
                <img
                  src={selectedSuite.image}
                  alt={selectedSuite.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Eyebrow & Name */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-[1px] bg-[#c4a35a]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-display text-[#c4a35a] font-medium">
                  {selectedSuite.category} · {selectedSuite.view}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-3">
                {selectedSuite.name}
              </h3>

              {/* Spec Strip */}
              <div className="flex items-center gap-4 text-xs uppercase tracking-wider font-display text-stone-500 py-3 border-y border-stone-200/80 my-4">
                <span>{selectedSuite.size}</span>
                <span>•</span>
                <span>{selectedSuite.bedrooms}</span>
                <span>•</span>
                <span>{selectedSuite.view}</span>
              </div>

              {/* Description */}
              <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-6">
                {selectedSuite.description}
              </p>

              {/* Full Features Grid */}
              <div className="mb-8">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-display text-stone-500 font-medium mb-3">
                  Suite Highlights &amp; Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedSuite.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-greyon-ink/85 font-light flex items-center gap-2"
                    >
                      <span className="text-[#c4a35a] font-normal">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedSuite(null)}
                  className="text-xs uppercase tracking-widest font-display text-stone-500 hover:text-greyon-ink transition-colors font-medium order-2 sm:order-1 cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to={`/contact?hotel=${hotel.slug}&suite=${encodeURIComponent(selectedSuite.name)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-display font-medium px-8 py-3.5 bg-greyon-primary text-white hover:bg-greyon-primary-hover transition-colors rounded-none order-1 sm:order-2"
                >
                  <span>Reserve This {selectedSuite.category}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
