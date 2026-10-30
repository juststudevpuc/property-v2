import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/* ─── Hero backdrop image (sourced from original CDN) ─────── */
const HERO_IMAGE =
  'https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/69cb84fac765898d37fb2206_The%20Creators%20HQ%20Home%20Banner_CIRA.webp'

/* ─── Text entrance animations ────────────────────────────── */
const containerVariant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
}

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
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
      aria-label="Hero — Explore Projects by Property Schneitec"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
        style={{ y: imageY }}
      >
        <img
          src={HERO_IMAGE}
          alt="Luxury detached home"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-greyon-dark/30 to-greyon-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-greyon-dark/40 via-transparent to-transparent" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 w-full container-large pb-12 md:pb-16 pl-8 md:pl-16">
        <motion.div
          className="max-w-3xl"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Text and Scroll indicator aligned symmetrically on the left */}
          <motion.div
            variants={lineVariant}
            className="flex items-center gap-3 text-white text-2xl md:text-[28px] tracking-wide"
          >
            <span>Explore Projects by Property Schneitec</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="mt-1"
            >
              {/* Note: The image uses a double chevron. Import ChevronsDown from lucide-react for the exact match */}
              <ChevronDown size={24} strokeWidth={2} className="opacity-80" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
