import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section
      className="relative bg-greyon-cream py-28 md:py-36 overflow-hidden"
      aria-label="About Schneitec Property"
    >
      {/* ── Ambient Radial Glows ── */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-greyon-sand/0 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
          className="w-full max-w-5xl"
        >
          {/* ── Headline ── */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight leading-[1.2] mb-8 sm:mb-10 whitespace-nowrap">
            Schneitec Property: Curated Spaces for Life
          </h2>

          {/* ── Body Text ── */}
          <div className="max-w-3xl space-y-6 text-greyon-ink leading-relaxed font-light text-base sm:text-lg">
            <p>
              Established since 2015, Schneitec Property dedicates to redefining how people live. With a
              Customer-First Philosophy, we craft residences that combine innovation, functionality, and
              human touch, delivering homes that elevate everyday life.
            </p>

            <p>
              Schneitec Property continues to shape modern living with spaces that inspire, endure, and
              connect deeply with the people who call them home.
            </p>
          </div>

          {/* ── Sign-off ── */}
          <p className="mt-8 sm:mt-10 font-semibold text-greyon-ink text-base sm:text-lg">
            Creators for Space - Curated for Life.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
