import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section
      className="relative bg-greyon-cream py-10 md:py-20 overflow-hidden "
      aria-label="About Schneitec Property"
    >
      <div className="container-large relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
          className="w-full max-w-5xl"
        >
          {/* ── Understated Eyebrow ── */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-greyon-gold-deep" />
            <span className="text-xs uppercase tracking-[0.25em] text-greyon-gold-deep font-sans font-medium">
              PHILOSOPHY OF ARCHITECTURE & LIVING
            </span>
          </div>

          {/* ── Editorial Philosophy Quote ── */}
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-greyon-ink/90 font-light leading-[1.3] tracking-tight mb-8 max-w-4xl">
            “True luxury is not defined by excess, but by the quiet harmony of natural light,
            monolithic stone, and spaces designed to nurture the human spirit with genuine
            warmth.”
          </blockquote>

          {/* ── Narrative Body ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-greyon-ink/80 leading-relaxed font-light text-base sm:text-lg mb-12">
            <p>
              Established since 2015, Schneitec Property dedicates itself to redefining modern
              living. Guided by a customer-first philosophy, we craft residences that marry
              architectural purity, functional clarity, and human connection—delivering homes
              that elevate everyday life.
            </p>
            <p>
              By rejecting repetitive formulas, each project is sculpted as a bespoke habitat
              centered on spatial wellness, enduring materiality, and multi-generational legacy
              across Bangkok.
            </p>
          </div>

          {/* ── Thin Horizontal Stone Divider Bar with Milestone Numbers ── */}
          <div className="border-t border-b border-greyon-stone/40 py-8 md:py-10 my-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              <div className="border-l-2 border-greyon-gold/40 pl-5">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-greyon-ink tracking-tight">
                  2015
                </span>
                <span className="block text-xs uppercase tracking-[0.2em] text-greyon-gold-deep mt-1 font-medium">
                  Established
                </span>
                <p className="text-xs text-greyon-muted mt-1 font-light">
                  A decade of purposeful architectural craftsmanship.
                </p>
              </div>

              <div className="border-l-2 border-greyon-gold/40 pl-5">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-greyon-ink tracking-tight">
                  100%
                </span>
                <span className="block text-xs uppercase tracking-[0.2em] text-greyon-gold-deep mt-1 font-medium">
                  Noble Stone
                </span>
                <p className="text-xs text-greyon-muted mt-1 font-light">
                  Hand-selected Italian marble and acoustic detailing.
                </p>
              </div>

              <div className="border-l-2 border-greyon-gold/40 pl-5">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-greyon-ink tracking-tight">
                  10-12
                </span>
                <span className="block text-xs uppercase tracking-[0.2em] text-greyon-gold-deep mt-1 font-medium">
                  Private Enclaves
                </span>
                <p className="text-xs text-greyon-muted mt-1 font-light">
                  Strictly limited collections for acoustic serenity.
                </p>
              </div>

              <div className="border-l-2 border-greyon-gold/40 pl-5">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-greyon-ink tracking-tight">
                  24/7
                </span>
                <span className="block text-xs uppercase tracking-[0.2em] text-greyon-gold-deep mt-1 font-medium">
                  Warm Hospitality
                </span>
                <p className="text-xs text-greyon-muted mt-1 font-light">
                  Discreet concierges catering to residential wellness.
                </p>
              </div>
            </div>
          </div>

          {/* ── Sign-off ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-greyon-ink">
              Creators for Space — Curated for Life.
            </p>
            <span className="text-xs tracking-widest uppercase text-greyon-gold-deep font-sans">
              GREYON MANIFESTO
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
