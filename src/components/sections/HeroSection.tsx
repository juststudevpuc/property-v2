import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ─── Hero backdrop image (sourced from original CDN) ─────── */
const HERO_IMAGE =
  'https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/69cb84fac765898d37fb2206_The%20Creators%20HQ%20Home%20Banner_CIRA.webp'

/* ─── Scroll-down indicator animation ─────────────────────── */
const bounceVariant: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
  },
}

/* ─── Text entrance animations ────────────────────────────── */
const containerVariant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
}

const lineVariant: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] } },
}

/**
 * HeroSection — full-viewport landing hero.
 *
 * Features:
 * - Parallax background image via Framer Motion useScroll / useTransform
 * - Layered dark gradient overlay (matching original site)
 * - Staggered text entrance on mount
 * - Animated scroll-down chevron
 * - CTA button wired to /projects
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  /* Parallax: image moves slower than scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-end overflow-hidden"
      aria-label="Hero — Explore Projects by The Creators HQ"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
        style={{ y: imageY }}
      >
        <img
          src={HERO_IMAGE}
          alt="CIRA Residences — luxury detached home in Bangkok"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Gradient overlays (multi-layer, matching source) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Bottom-heavy dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1117]/30 to-[#0D1117]/90" />
        {/* Subtle top vignette for logo readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/40 via-transparent to-transparent" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 w-full container-large pb-16 md:pb-24">
        <motion.div
          className="max-w-2xl"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={lineVariant}
            className="text-xs font-medium tracking-[0.3em] uppercase text-[#aebfcb] mb-4"
          >
            Est. 2015 — Bangkok, Thailand
          </motion.p>

          {/* Primary headline */}
          <motion.h1
            variants={lineVariant}
            className="heading-h1 text-[#EAF3FB] mb-6"
          >
            Explore Projects<br />
            by The Creators HQ
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={lineVariant}
            className="text-[#D4DDE3] font-light text-lg leading-relaxed mb-8 max-w-md opacity-80"
          >
            Premier space makers and real estate developers in Bangkok —
            crafting luxury residences that elevate everyday life.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={lineVariant}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/projects"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase"
            >
              View All Projects
            </Link>
            <Link
              to="/about"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#D4DDE3]/60"
        variants={bounceVariant}
        animate="animate"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-light">Scroll</span>
        <ChevronDown size={18} strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}
