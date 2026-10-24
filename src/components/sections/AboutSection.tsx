import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

const STATS = [
  { value: '2015', label: 'Founded in Bangkok' },
  { value: '฿15B+', label: 'Asset Value Created' },
  { value: '5+', label: 'Signature Landmarks' },
  { value: '100%', label: 'Bespoke Architecture' },
]

const PILLARS = [
  {
    icon: Compass,
    title: 'Visionary Locations',
    text: 'Positioned exclusively in Bangkok’s most connected corridors, offering enduring capital value and effortless urban rhythm.',
  },
  {
    icon: Sparkles,
    title: 'Art of Living',
    text: 'Every square meter is sculpted with natural light, organic flow, and refined bespoke craftsmanship that transcends trends.',
  },
  {
    icon: Shield,
    title: 'Generational Value',
    text: 'Built with rigorous structural standards, low-density exclusivity, and sustainable tech to preserve enduring multi-generational prestige.',
  },
]

export default function AboutSection() {
  return (
    <section
      className="relative bg-[#0D1117] py-28 md:py-36 border-b border-[#1E2633] overflow-hidden"
      aria-label="About The Creators HQ"
    >
      {/* ── Ambient Radial Glows ── */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#161C26] rounded-full blur-3xl opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#1E2633]/30 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* ── Eyebrow ── */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#8FA5B3]" />
            <span className="text-xs font-medium tracking-[0.35em] uppercase text-[#8FA5B3]">
              The Space Makers Philosophy
            </span>
          </motion.div>

          {/* ── Typography Hero Pull-Quote ── */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#EAF3FB] leading-[1.2] tracking-tight max-w-4xl mb-12"
          >
            We do not simply construct buildings.{' '}
            <span className="text-[#8FA5B3] italic font-serif">
              We curate living sanctuaries
            </span>{' '}
            that elevate the human spirit and stand the test of time.
          </motion.h2>

          {/* ── Body Narrative Columns ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-[#1E2633] mb-20 text-[#D4DDE3]/80 leading-relaxed font-light text-base md:text-lg"
          >
            <p>
              Founded in 2015, The Creators HQ is a premier Thai boutique real estate
              developer known for redefining urban residences through uncompromising architectural
              curation. Our portfolio spans super-luxury detached houses to iconic high-rise
              condominiums, each distinguished by a deliberate human-centric vision.
            </p>
            <p>
              By harmonizing refined minimalist aesthetics with functional intelligence, we
              create spaces where light, privacy, and community seamlessly converge. Every detail
              reflects our commitment to bespoke craft, environmental stewardship, and timeless distinction.
            </p>
          </motion.div>

          {/* ── Three Pillars ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="p-8 rounded-sm bg-[#161C26]/60 border border-[#1E2633] hover:border-[#2A3649] transition-all group"
              >
                <div className="h-10 w-10 rounded-sm bg-[#1E2633] flex items-center justify-center text-[#D4DDE3] mb-6 group-hover:text-white group-hover:bg-[#2A3649] transition-colors">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-normal text-[#EAF3FB] tracking-tight mb-3">
                  {title}
                </h3>
                <p className="text-sm font-light text-[#8FA5B3] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* ── Stats Bar & CTA ── */}
          <motion.div
            variants={itemVariants}
            className="pt-12 border-t border-[#1E2633] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-14 w-full lg:w-auto">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-light text-[#EAF3FB] tracking-tight mb-1">
                    {value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#8FA5B3]">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 btn-secondary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase shrink-0"
            >
              <span>Our Full Story</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
