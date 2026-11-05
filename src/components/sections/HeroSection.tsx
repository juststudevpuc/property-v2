import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

/* ─── Hero backdrop photographic canvas ─────────────────────── */
const HERO_IMAGE =
  'https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/69cb84fac765898d37fb2206_The%20Creators%20HQ%20Home%20Banner_CIRA.webp'

/* ─── Text entrance animations ────────────────────────────── */
const containerVariant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
}

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  /* Parallax: image moves gently slower than scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] lg:h-screen min-h-[640px] flex items-end overflow-hidden bg-greyon-dark"
      aria-label="Hero — Explore Projects by Property Schneitec"
    >
      {/* ── Photographic Canvas with Parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
        style={{ y: imageY }}
      >
        <img
          src={HERO_IMAGE}
          alt="Luxury detached residential estate"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Ambient Gradient Overlays for Architectural Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft top vignetting for navbar readability */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-greyon-dark/70 via-greyon-dark/25 to-transparent" />
        {/* Bottom deep ink contrast for editorial typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/95 via-greyon-dark/40 to-transparent" />
      </div>

      {/* ── Editorial Framing & Hero Content ── */}
      <div className="relative z-10 w-full container-large pb-14 sm:pb-16 md:pb-24 pt-32 px-6 sm:px-10">
        <motion.div
          className="max-w-4xl"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Understated Architectural Eyebrow Tag */}
          <motion.div variants={lineVariant} className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-8 h-[1px] bg-greyon-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-greyon-gold font-sans font-medium">
              GREYON HOSPITALITY & PRIVATE SANCTUARIES
            </span>
          </motion.div>

          {/* Understated Editorial Headline */}
          <motion.h1
            variants={lineVariant}
            className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.12] mb-6 max-w-3xl"
          >
            Explore Projects by <br />
            <span className="font-serif italic text-greyon-sand font-normal">
              Property Schneitec
            </span>
          </motion.h1>

          <motion.p
            variants={lineVariant}
            className="text-greyon-sand/80 text-sm sm:text-base md:text-lg font-light max-w-xl leading-relaxed mb-8 sm:mb-10 text-pretty"
          >
            A curated portfolio of monolithic private residences and sky-high sanctuaries,
            harmonizing pure architectural geometry, noble stone, and genuine hospitality.
          </motion.p>

          {/* Minimal CTAs with rounded-lg luxury buttons */}
          <motion.div
            variants={lineVariant}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-lg bg-greyon-primary hover:bg-greyon-primary-hover text-white transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider font-medium shadow-lg hover:shadow-xl active:scale-95"
            >
              <span>Explore Residences</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-lg border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider font-medium backdrop-blur-sm"
            >
              <span>Inquire</span>
            </Link>

            {/* Scroll Indicator Cue */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-widest ml-4 transition-colors"
            >
              <span>Scroll</span>
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
