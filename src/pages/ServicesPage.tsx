import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

interface CareService {
  index: string
  title: string
  subtitle: string
  intro: string
  bullets: string[]
  footnote: string
  image: string
}

const PROPERTY_CARE_SLIDES: CareService[] = [
  {
    index: '01',
    title: 'Precision Home Inspection',
    subtitle: 'Structural Assurance & Performance',
    intro:
      'Complimentary bi-annual technical audits conducted across all primary building envelopes during the active warranty tenure.',
    bullets: [
      'Comprehensive audit of 7 critical domains: Fenestration, interior surfaces, acoustic barriers, MEP installations, fire safety systems, and automated valves.',
      'Conducted bi-annually by licensed architectural engineers and senior technicians.',
      'Includes digital diagnostic reports with preventative maintenance recommendations.',
    ],
    footnote: '*Terms, inspection schedules, and warranty scope apply per residential agreement.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
  },
  {
    index: '02',
    title: 'Wellness & Habitat Servicing',
    subtitle: 'Preventative Longevity Care',
    intro:
      'Specialized maintenance protocols for engineered finishes, acoustic assemblies, and integrated climate systems.',
    bullets: [
      'Certified technicians oversee calibration of concealed air filtration and microclimate systems.',
      'Tactile surface treatments for natural timber and imported natural stone slabs.',
      'Flexible annual concierge scheduling tailored to resident lifestyle preferences.',
    ],
    footnote: '*Terms, inspection schedules, and warranty scope apply per residential agreement.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
  },
]

export default function ServicesPage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const brokerageRef = useRef<HTMLElement>(null)

  // Scroll progress for the 300vh sticky Brokerage section
  const { scrollYProgress } = useScroll({
    target: brokerageRef,
    offset: ['start start', 'end end'],
  })

  // Smooth drawing and subtle parallax for the architectural wireframe
  const pathLength = useTransform(scrollYProgress, [0, 0.7], [0.15, 1])
  const buildingY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // Vertical scroll transformation for text blocks
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <div className="min-h-screen bg-greyon-dark text-greyon-sand select-none">
      
      {/* ── 1. Edge-to-Edge Hero Section ────────────────────────── */}
      <section className="relative w-full h-[90vh] min-h-[640px] overflow-hidden bg-greyon-dark">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
            alt="GREYON Services - Preserving Value, Elevating Living"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark via-greyon-dark/40 to-transparent" />
        </motion.div>

        {/* Editorial Split Header Block */}
        <div className="absolute inset-x-0 bottom-0 z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="border-t border-white/20 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-6 lg:col-span-6">
              <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold mb-4 block">
                Asset Stewardship &amp; Hospitality
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]">
                Preserving Value,<br />Elevating Living
              </h1>
            </div>

            <div className="md:col-span-6 lg:col-span-6">
              <p className="font-body text-sm sm:text-base font-light text-greyon-sand/90 leading-relaxed">
                At GREYON, asset management extends beyond handover. Through dedicated brokerage, 
                leasing advisory, and precision home health audits, we preserve the architectural integrity 
                and long-term yield of every residence while ensuring an effortless ownership experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Sticky Scroll BROKERAGE Wireframe Section (300vh) ─ */}
      <section ref={brokerageRef} className="relative h-[300vh] bg-greyon-dark text-greyon-sand">
        <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Sleek Ultra-Tall Architectural Wireframe */}
          <div className="absolute inset-0 md:relative md:inset-auto w-full md:w-1/2 h-full flex items-end justify-center p-6 md:p-12 z-10 pointer-events-none opacity-20 md:opacity-100">
            <motion.div
              style={{ y: buildingY }}
              className="w-full max-w-[340px] h-[80vh] md:h-[85vh] flex items-end justify-center"
            >
              <svg
                viewBox="0 0 320 840"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
              >
                {/* Datum Lines */}
                <motion.line
                  x1="15"
                  y1="800"
                  x2="305"
                  y2="800"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                  style={{ pathLength }}
                />
                <motion.line
                  x1="30"
                  y1="815"
                  x2="290"
                  y2="815"
                  stroke="white"
                  strokeWidth="0.8"
                  strokeOpacity="0.2"
                  style={{ pathLength }}
                />

                {/* Central Spire & Core Tower */}
                <motion.line
                  x1="160"
                  y1="15"
                  x2="160"
                  y2="40"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                  style={{ pathLength }}
                />
                <motion.path
                  d="M110 800 L110 110 L160 40 L210 110 L210 800"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                  style={{ pathLength }}
                />
                <motion.path
                  d="
                    M122 98 L122 800
                    M135 80 L135 800
                    M148 57 L148 800
                    M160 40 L160 800
                    M172 57 L172 800
                    M185 80 L185 800
                    M198 98 L198 800
                  "
                  stroke="white"
                  strokeWidth="0.7"
                  strokeOpacity="0.4"
                  style={{ pathLength }}
                />
                <motion.path
                  d="
                    M110 180 H210 M110 250 H210 M110 320 H210
                    M110 390 H210 M110 460 H210 M110 530 H210
                    M110 600 H210 M110 670 H210 M110 740 H210
                  "
                  stroke="white"
                  strokeWidth="0.6"
                  strokeOpacity="0.25"
                  style={{ pathLength }}
                />

                {/* Left Flank */}
                <motion.path
                  d="M35 800 L35 230 L95 160 L95 800"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                  style={{ pathLength }}
                />
                <motion.path
                  d="M50 212 L50 800 M65 195 L65 800 M80 178 L80 800"
                  stroke="white"
                  strokeWidth="0.65"
                  strokeOpacity="0.35"
                  style={{ pathLength }}
                />

                {/* Right Flank */}
                <motion.path
                  d="M225 800 L225 140 L285 200 L285 800"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                  style={{ pathLength }}
                />
                <motion.path
                  d="M240 155 L240 800 M255 170 L255 800 M270 185 L270 800"
                  stroke="white"
                  strokeWidth="0.65"
                  strokeOpacity="0.35"
                  style={{ pathLength }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Right Column: Narrative Steps */}
          <div className="w-full md:w-1/2 h-full relative z-10 overflow-hidden flex flex-col px-6 md:px-12 lg:px-20">
            <motion.div style={{ y: contentY }} className="flex flex-col">
              
              {/* Block 1 */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg  pl-8 my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  01 / Stewardship
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Asset Management
                </h3>
                <h4 className="font-display text-xs tracking-wider uppercase text-white/80 mb-4">
                  Protecting Interests, Sustaining Yield
                </h4>
                <p className="font-body text-sm sm:text-base font-light text-greyon-sand/85 leading-relaxed">
                  Every residence is a legacy investment. Our role is to safeguard capital 
                  through proactive tenancy curation, transparent financial reporting, and comprehensive 
                  resale positioning to preserve long-term asset value.
                </p>
              </div>

              {/* Block 2 */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg  pl-8 my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  02 / Leasing
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Private Leasing
                </h3>
                <h4 className="font-display text-xs tracking-wider uppercase text-white/80 mb-4">
                  Seamless Tenancies, Curated Occupants
                </h4>
                <p className="font-body text-sm sm:text-base font-light text-greyon-sand/85 leading-relaxed">
                  From multi-channel tenant screening to rent collection, contract administration, and 
                  turnover housekeeping, our hospitality desk ensures your residence remains pristine and 
                  consistently yielding without administrative friction.
                </p>
              </div>

              {/* Block 3 */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg  pl-8 my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  03 / Secondary Market
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Bespoke Resales
                </h3>
                <h4 className="font-display text-xs tracking-wider uppercase text-white/80 mb-4">
                  Private Network, Premium Realization
                </h4>
                <p className="font-body text-sm sm:text-base font-light text-greyon-sand/85 leading-relaxed">
                  Leveraging an established network of ultra-high-net-worth investors and discreet 
                  private brokerage channels, we market signature residences with confidentiality, 
                  achieving optimal valuation and effortless title transfers.
                </p>
              </div>

              {/* Block 4 */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg  pl-8 my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  04 / Maintenance
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Residence Care
                </h3>
                <h4 className="font-display text-xs tracking-wider uppercase text-white/80 mb-4">
                  Enduring Condition &amp; Security
                </h4>
                <p className="font-body text-sm sm:text-base font-light text-greyon-sand/85 leading-relaxed">
                  Our dedicated engineering desk coordinates scheduled structural check-ups, 
                  appliance diagnostics, and preventative servicing to ensure your habitat operates at peak 
                  acoustic and functional performance.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Right: Clean Sharp Typology Filters */}
          <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 flex flex-wrap items-center justify-end gap-2 pointer-events-auto">
            {['Leasing', 'Housekeeping', 'Interior Curation', 'Discreet Resale'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 border border-white/20 text-[11px] tracking-widest uppercase font-display text-white/80 bg-greyon-dark/60 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROPERTY CARE (Editorial Monograph Section) ──────── */}
      <section className="bg-greyon-cream py-28 md:py-36 text-greyon-ink border-t border-greyon-stone/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Header */}
          <div className="border-b border-greyon-stone/40 pb-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep">
                Stewardship Protocols
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-light tracking-tight text-greyon-ink">
                Architectural Home Care
              </h2>
            </div>

            {/* Slider Tab Navigation */}
            <div className="flex items-center space-x-6">
              {PROPERTY_CARE_SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx
                return (
                  <button
                    key={slide.index}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className="group flex items-baseline space-x-2 pb-1 border-b transition-all duration-300 focus:outline-none"
                    style={{
                      borderColor: isActive ? 'var(--color-greyon-gold-deep)' : 'transparent',
                    }}
                  >
                    <span
                      className={`font-display text-xs tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-greyon-gold-deep font-semibold' : 'text-greyon-stone group-hover:text-greyon-muted'
                      }`}
                    >
                      {slide.index}
                    </span>
                    <span
                      className={`font-display text-sm tracking-wider uppercase transition-colors duration-300 ${
                        isActive ? 'text-greyon-ink font-medium' : 'text-greyon-muted group-hover:text-greyon-ink'
                      }`}
                    >
                      {slide.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Exhibition Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Interactive Details */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display text-xs tracking-[0.25em] uppercase text-greyon-gold-deep mb-2 block">
                    {PROPERTY_CARE_SLIDES[activeSlide].subtitle}
                  </span>
                  
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-4">
                    {PROPERTY_CARE_SLIDES[activeSlide].title}
                  </h3>
                  
                  <p className="font-body text-sm sm:text-base text-greyon-muted leading-relaxed font-light mb-6">
                    {PROPERTY_CARE_SLIDES[activeSlide].intro}
                  </p>

                  <div className="border-t border-greyon-stone/40 pt-6 space-y-4 mb-6">
                    {PROPERTY_CARE_SLIDES[activeSlide].bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <span className="font-display text-xs text-greyon-gold-deep mt-0.5">•</span>
                        <p className="font-body text-xs sm:text-sm text-greyon-muted leading-relaxed font-light">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="font-display text-[11px] text-greyon-muted/80 tracking-wide italic">
                    {PROPERTY_CARE_SLIDES[activeSlide].footnote}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Sharp Architectural Photography Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-greyon-sand border border-greyon-stone/40">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide}
                    src={PROPERTY_CARE_SLIDES[activeSlide].image}
                    alt={PROPERTY_CARE_SLIDES[activeSlide].title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Corner Frame Accent */}
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <span className="font-display text-[11px] tracking-[0.2em] uppercase text-white/90 bg-greyon-dark/70 px-3 py-1">
                    Phase {PROPERTY_CARE_SLIDES[activeSlide].index}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}