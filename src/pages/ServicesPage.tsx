import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] },
  },
}

const PROPERTY_CARE_SLIDES = [
  {
    title: 'Home Check-Up',
    subtitle: 'Confidence in Every Corner',
    intro:
      'Complimentary inspection of condominiums and homes up to 2 times during the structural warranty period*',
    bullets: [
      'Covers 7 key categories: doors & windows, flooring/walls/ceilings/stairs, electrical systems, communication systems, fire protection & alarm systems, appliances, and plumbing & sanitary systems',
      'Scheduled 2 times a year or before the warranty expires (from the date of ownership transfer)',
      'Conducted by our professional technical team and on-site staff',
    ],
    footnote: '*Terms and conditions as specified by the company',
    image:
      'https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/697f1c7bdc0dcce7eaaeb088_property-care.webp',
  },
  {
    title: 'Healthy Home Event',
    subtitle: 'Wellness for Your Home',
    intro:
      'Complimentary inspection and basic maintenance of selected installed products within condominiums, homes, or townhomes',
    bullets: [
      'Carried out by authorized product specialists*',
      'Up to 2 products can be inspected per event',
    ],
    footnote: '*Terms and conditions as specified by the company',
    image:
      'https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/698cb067fb0239be942f8d17_healthy%20home%20event.webp',
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

  // Smooth drawing and subtle parallax for the ultra-tall architectural wireframe
  const pathLength = useTransform(scrollYProgress, [0, 0.7], [0.15, 1])
  const buildingY = useTransform(scrollYProgress, [0, 1], [25, -25])

  // Vertical scroll transformation: 4 min-h-screen blocks smoothly cycle through center
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#D4DDE3]">
      {/* ── Edge-to-Edge Hero Section ── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background Image Container */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/697daee1a57b9ce537587461_service-hero.webp"
            alt="Services - Preserving Value, Elevating Living"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay focused on the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050810]" />
        </motion.div>

        {/* Split Column Text Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 w-full px-6 md:px-12 lg:px-24 pb-12 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            {/* Left: Headline */}
            <div className="md:col-span-6 lg:col-span-5">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-light text-white tracking-tight leading-[1.1]">
                PRESERVING VALUE,<br />ELEVATING LIVING
              </h1>
            </div>

            {/* Right: Paragraph */}
            <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
              <p className="text-sm md:text-base font-light text-[#D4DDE3] leading-relaxed">
                At The Creators HQ, we are committed to safeguarding and enhancing the long-term
                value of our customers through dedicated after-sales services. These include brokerage
                solutions for rental management and resales, as well as comprehensive home care services.
                Our objective is to maximize asset performance, ensure lasting satisfaction, and foster
                long-term engagement with our residents, while also providing solutions that address
                their broader investment and property needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section Header: BROKERAGE (Symmetrically aligned with columns below) ── */}
      <section className="bg-[#050810] pt-20 md:pt-28 pb-10 md:pb-14 ">
        <div className="w-full flex flex-col md:flex-row">
          {/* Left: Aligned symmetrically with left column */}
          <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 flex items-end">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8FA5B3] font-light">
              SERVICE
            </span>
          </div>

          {/* Right: Aligned symmetrically with right column content */}
          <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 mt-6 md:mt-0">
            <div className="max-w-lg">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-2">
                BROKERAGE
              </h2>
              <span className="text-xs sm:text-sm font-light text-[#8FA5B3] tracking-widest uppercase">
                by Space Management
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: Sticky Scroll BROKERAGE Wireframe Section (300vh) ── */}
      <section ref={brokerageRef} className="relative h-[300vh] bg-[#050810] text-[#D4DDE3]">
        {/* Sticky Container locks to viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">

          {/* Left Column (The Building: Sleek Ultra-Tall Architectural Wireframe) */}
          <div className="absolute inset-0 md:relative md:inset-auto w-full md:w-1/2 h-full flex items-end justify-center p-4 md:p-8 z-10 pointer-events-none opacity-20 md:opacity-100">
            <motion.div
              style={{ y: buildingY }}
              className="w-full max-w-[340px] h-[80vh] md:h-[85vh] flex items-end justify-center"
            >
              <svg
                viewBox="0 0 320 840"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Ground Datum Lines */}
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

                {/* ── 1. Central Ultra-Tall Skyscraper (Needle & Angular Crown) ── */}
                {/* Spire Tip */}
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
                {/* Outer Shell & Sharp Angular Roof */}
                <motion.path
                  d="M110 800 L110 110 L160 40 L210 110 L210 800"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                  style={{ pathLength }}
                />
                {/* Long Uninterrupted Vertical Mullions */}
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
                {/* Minimalist Horizontal Floor Rings */}
                <motion.path
                  d="
                    M110 180 H210
                    M110 250 H210
                    M110 320 H210
                    M110 390 H210
                    M110 460 H210
                    M110 530 H210
                    M110 600 H210
                    M110 670 H210
                    M110 740 H210
                  "
                  stroke="white"
                  strokeWidth="0.6"
                  strokeOpacity="0.25"
                  style={{ pathLength }}
                />

                {/* ── 2. Left Slender Tower (Sharp Chamfer Roof) ── */}
                <motion.path
                  d="M35 800 L35 230 L95 160 L95 800"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                  style={{ pathLength }}
                />
                {/* Long Uninterrupted Vertical Mullions */}
                <motion.path
                  d="
                    M50 212 L50 800
                    M65 195 L65 800
                    M80 178 L80 800
                  "
                  stroke="white"
                  strokeWidth="0.65"
                  strokeOpacity="0.35"
                  style={{ pathLength }}
                />
                {/* Subtle Horizontal Floor Lines */}
                <motion.path
                  d="
                    M35 290 H95
                    M35 360 H95
                    M35 430 H95
                    M35 500 H95
                    M35 570 H95
                    M35 640 H95
                    M35 710 H95
                  "
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  style={{ pathLength }}
                />

                {/* ── 3. Right Tower (Stepped Angular Facet) ── */}
                <motion.path
                  d="M225 800 L225 140 L285 200 L285 800"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                  style={{ pathLength }}
                />
                {/* Long Uninterrupted Vertical Mullions */}
                <motion.path
                  d="
                    M240 155 L240 800
                    M255 170 L255 800
                    M270 185 L270 800
                  "
                  stroke="white"
                  strokeWidth="0.65"
                  strokeOpacity="0.35"
                  style={{ pathLength }}
                />
                {/* Subtle Horizontal Floor Lines */}
                <motion.path
                  d="
                    M225 270 H285
                    M225 340 H285
                    M225 410 H285
                    M225 480 H285
                    M225 550 H285
                    M225 620 H285
                    M225 690 H285
                  "
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  style={{ pathLength }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Right Column (Scrolling Content: 4 min-h-screen centered blocks) */}
          <div className="w-full md:w-1/2 h-full relative z-10 overflow-hidden flex flex-col px-6 md:px-12 lg:px-20">
            <motion.div style={{ y: contentY }} className="flex flex-col">
              {/* Block 1: Space Management */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8FA5B3] block mb-2 font-mono">
                  01 / SUBSIDIARY
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Space Management
                </h3>
                <h4 className="text-sm font-medium text-white/90 mb-4">
                  Protecting Your Interests, Growing Your Value
                </h4>
                <p className="text-sm sm:text-base font-light text-[#D4DDE3] leading-relaxed">
                  Through our subsidiary, Space Management, we believe every property is a valuable
                  investment. Our role is to safeguard your interests while ensuring your assets continue
                  to generate income and appreciate in value. With trusted services in both rental
                  management and resale, we provide peace of mind that your property is always in good
                  hands.
                </p>
              </div>

              {/* Block 2: Rental Services */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8FA5B3] block mb-2 font-mono">
                  02 / LEASING
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Rental Services
                </h3>
                <h4 className="text-sm font-medium text-white/90 mb-4">
                  Seamless Rentals, Effortless Income
                </h4>
                <p className="text-sm sm:text-base font-light text-[#D4DDE3] leading-relaxed">
                  From finding the right tenants and managing rental collections to property maintenance
                  and housekeeping, we handle every step with care. Our goal is to always keep your unit
                  rental-ready, so you can enjoy effortless Passive Income while knowing your investment
                  is being looked after with integrity.
                </p>
              </div>

              {/* Block 3: Resales */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8FA5B3] block mb-2 font-mono">
                  03 / BROKERAGE
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Resales
                </h3>
                <h4 className="text-sm font-medium text-white/90 mb-4">
                  Stronger Network, Higher Value
                </h4>
                <p className="text-sm sm:text-base font-light text-[#D4DDE3] leading-relaxed">
                  With comprehensive marketing strategies and a strong network of co-agents, we help you
                  secure a selling price above market value. We also manage the entire transfer process
                  with transparency and efficiency, so you never have to worry—simply trust us to deliver
                  the best outcome for your property.
                </p>
              </div>

              {/* Block 4: Property Care */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8FA5B3] block mb-2 font-mono">
                  04 / STEWARDSHIP
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                  Property Care
                </h3>
                <h4 className="text-sm font-medium text-white/90 mb-4">
                  Preserving Pristine Condition &amp; Security
                </h4>
                <p className="text-sm sm:text-base font-light text-[#D4DDE3] leading-relaxed">
                  Our dedicated Home Care Service ensures your residence remains in its prime condition—safe,
                  well-maintained, and rental-ready. We provide scheduled engineering check-ups, product
                  servicing, and preventative maintenance for total peace of mind.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Right: Horizontal Circle Outlined Buttons */}
          <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 flex flex-wrap items-center justify-end gap-2.5 pointer-events-auto">
            {['Rental', 'Cleaning', 'Laundry', 'Decoration', 'Resales'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="px-4 py-2 rounded-full border border-white/30 text-[11px] sm:text-xs tracking-wider uppercase font-light text-white bg-transparent hover:border-white hover:bg-white hover:text-[#050810] transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: PROPERTY CARE (Light Theme Header Block) ── */}
      <section className="bg-white py-16 px-6 md:px-12 text-[#050810]">
        <div className="container-large grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column (col-span-4) */}
          <div className="md:col-span-4">
            <span className="text-slate-500 uppercase tracking-widest text-sm font-medium">
              SERVICE
            </span>
          </div>

          {/* Right Column (col-span-8) */}
          <div className="md:col-span-8">
            <h2 className="text-[#050810] text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none">
              PROPERTY CARE
            </h2>
            <p className="text-slate-500 font-light text-base sm:text-lg mt-4">
              Protecting Your Home. Preserving Its Value.
            </p>
          </div>
        </div>
      </section>

      {/* ── Full-Bleed Image Container with Bottom Dark Gradient ── */}
      <section className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden">
        {/* Warm, modern home interior image */}
        <img
          src="https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/697f1c7bdc0dcce7eaaeb088_property-care.webp"
          alt="Property Care Interior"
          className="w-full h-full object-cover"
        />

        {/* Bottom Dark Gradient fading upwards */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#02040A] via-[#02040A]/80 to-transparent pointer-events-none" />

        {/* Overlay Text Inside the Gradient */}
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-12 z-10 w-full">
          <div className="container-large flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
            {/* Left side: Large white headline */}
            <div className="md:w-1/2">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-none">
                PROPERTY CARE
              </h3>
            </div>

            {/* Right side: Introductory paragraph */}
            <div className="md:w-1/2">
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-light max-w-xl">
                At The Creators HQ, our Home Care Service ensures your residence remains in its best
                condition—safe, well-maintained, and rental-ready. We go beyond standard after-sales
                support to protect your investment and provide peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Property Care Slider: White Content Container ── */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <h3 className="text-3xl md:text-[40px] text-[#050810] font-light mb-6">
                {PROPERTY_CARE_SLIDES[activeSlide].title}
              </h3>
              <h4 className="text-sm font-semibold text-[#050810] mb-2">
                {PROPERTY_CARE_SLIDES[activeSlide].subtitle}
              </h4>
              <p className="text-slate-500 font-light text-sm md:text-base mb-6">
                {PROPERTY_CARE_SLIDES[activeSlide].intro}
              </p>
              <ul className="list-disc ml-5 text-slate-500 font-light text-sm md:text-base space-y-2 mb-8">
                {PROPERTY_CARE_SLIDES[activeSlide].bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 mt-4">
                {PROPERTY_CARE_SLIDES[activeSlide].footnote}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Full-Bleed Lifestyle Image Block with Animated Crossfade & Dots ── */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-[#050810]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide}
            src={PROPERTY_CARE_SLIDES[activeSlide].image}
            alt={PROPERTY_CARE_SLIDES[activeSlide].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Interactive Slider Dots */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-10">
          {PROPERTY_CARE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? 'bg-white scale-125'
                  : 'bg-white/50 cursor-pointer hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>


     
    </div>
  )
}
