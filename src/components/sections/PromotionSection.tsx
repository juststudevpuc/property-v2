import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PROMOTIONS } from '@/data/promotions'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export default function PromotionSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = PROMOTIONS[activeSlide] || PROMOTIONS[0]

  return (
    <section
      className="w-full bg-greyon-cream py-20 md:py-28 "
      aria-label="Featured Residences Showcase"
    >
      <div className="container-large">
        {/* ── Section Header Eyebrow ── */}
        <div className="flex items-center gap-3 mb-10 md:mb-12">
          <span className="w-8 h-[1px] bg-greyon-gold-deep" />
          <span className="text-xs uppercase tracking-[0.25em] text-greyon-gold-deep font-medium">
            FEATURED SANCTUARIES
          </span>
        </div>

        {/* ── Architectural Catalog Showcase Card ── */}
        <div className="bg-white rounded-3xl border border-greyon-stone/40 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
          {/* Left Panel: Content & Refined Typography */}
          <div className="w-full md:col-span-6 lg:col-span-6 p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.165, 0.84, 0.44, 1] }}
                className="flex flex-col"
              >
                {/* Project Eyebrow */}
                <span className="text-xs uppercase tracking-[0.25em] text-greyon-gold-deep mb-3 font-medium block">
                  {currentSlide.projectTitle}
                </span>

                {/* Headline in Deep Ink */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-6">
                  {currentSlide.headline}
                </h3>

                {/* Narrative Descriptions */}
                <div className="space-y-4 text-greyon-muted font-light leading-relaxed text-sm sm:text-base max-w-xl mb-8">
                  <p>{currentSlide.description1}</p>
                  {currentSlide.description2 && <p>{currentSlide.description2}</p>}
                </div>

                {/* Minimal Luxury CTA Button */}
                <div className="pt-2">
                  <Link
                    to={currentSlide.buttonUrl || '/contact'}
                    className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-lg bg-greyon-primary hover:bg-greyon-primary-hover text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 w-fit"
                  >
                    <span>{currentSlide.buttonText}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Minimalist Slide Selector Dots */}
            <div
              className="flex items-center gap-3 mt-10 pt-6 border-t border-greyon-stone/30"
              role="tablist"
              aria-label="Slide navigation"
            >
              <span className="text-[11px] uppercase tracking-widest text-greyon-muted font-mono mr-2">
                0{activeSlide + 1} / 0{PROMOTIONS.length}
              </span>
              {PROMOTIONS.map((slide, idx) => {
                const isActive = idx === activeSlide
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}: ${slide.projectTitle}`}
                    onClick={() => setActiveSlide(idx)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-greyon-primary',
                      isActive
                        ? 'w-8 bg-greyon-primary'
                        : 'w-2 bg-greyon-stone/80 hover:bg-greyon-ink/40'
                    )}
                  />
                )
              })}
            </div>
          </div>

          {/* Right Panel: Photographic Framing (Aspect 16/10 landscape or 4/5 portrait) */}
          <div className="relative w-full md:col-span-6 lg:col-span-6 min-h-[380px] sm:min-h-[460px] md:min-h-[540px] overflow-hidden bg-greyon-dark border-t md:border-t-0 md:border-l border-greyon-stone/40">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.projectTitle}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
