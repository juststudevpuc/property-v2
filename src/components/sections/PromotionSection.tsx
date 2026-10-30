import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PROMOTIONS } from '@/data/promotions'
import { cn } from '@/lib/utils'

export default function PromotionSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentSlide = PROMOTIONS[activeSlide] || PROMOTIONS[0]

  return (
    <section
      className="w-full p-0 m-0 overflow-hidden bg-greyon-dark flex flex-col md:flex-row h-auto md:h-[700px] lg:h-[750px]"
      aria-label="Featured Residences Showcase"
    >
      {/* ── Left Panel (Rich Gradient & Content) ── */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-greyon-dark to-[#262e27] p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.165, 0.84, 0.44, 1] }}
            className="flex flex-col"
          >
            {/* Project Title */}
            <span className="text-xs sm:text-sm font-light uppercase tracking-[0.25em] text-greyon-gold mb-4 sm:mb-6 block">
              {currentSlide.projectTitle}
            </span>

            {/* Headline */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.2] mb-6 sm:mb-8">
              {currentSlide.headline}
            </h3>

            {/* Descriptions */}
            <div className="space-y-4 sm:space-y-5 text-greyon-sand font-light leading-relaxed text-sm sm:text-base max-w-xl mb-8 sm:mb-10">
              <p>{currentSlide.description1}</p>
              <p>{currentSlide.description2}</p>
            </div>

            {/* Action Button */}
            <div>
              <Link
                to={currentSlide.buttonUrl || '/contact'}
                className="inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-greyon-primary hover:bg-greyon-primary-hover text-white border border-white/20 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:border-white/40 active:scale-95 w-fit"
              >
                <span>{currentSlide.buttonText}</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Clickable Dots */}
        <div
          className="flex items-center gap-3 mt-10 sm:mt-12"
          role="tablist"
          aria-label="Slide navigation"
        >
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
                  'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
                  isActive
                    ? 'bg-white scale-110 shadow-sm'
                    : 'bg-transparent border border-white/50 hover:border-white hover:bg-white/10'
                )}
              />
            )
          })}
        </div>
      </div>

      {/* ── Right Panel (Flush Edge-to-Edge Image) ── */}
      <div className="relative w-full md:w-1/2 h-[360px] sm:h-[460px] md:h-full overflow-hidden bg-greyon-dark">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.projectTitle}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>
      </div>
    </section>
  )
}
