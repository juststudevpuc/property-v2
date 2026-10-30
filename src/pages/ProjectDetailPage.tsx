import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'

/* ─── House Type Interface ───────────────────────────────── */
interface HouseTypeSpecs {
  landArea: string
  usableArea: string
  bedroom: string
  bathroom: string
  powderRoom: string
  parking: string
}

interface HouseType {
  name: string
  subtitle?: string
  image: string
  specs: HouseTypeSpecs
  description?: string
}

/* ─── Mock Extensions for Editorial Luxury Layout ────────── */
const MOCK_EXTENSIONS: Record<
  string,
  {
    startingPrice: string
    propertyType: string
    conceptText: string[]
    keyStats: { value: string; label: string }[]
    houseTypes: HouseType[]
    amenities: string[]
    progressText: string
    progressPercent: number
  }
> = {
  'cira-residences': {
    startingPrice: '125 MB*',
    propertyType: 'Detached House',
    conceptText: [
      'Conceived as a sanctuary of understated grandeur, CIRA Residences redefines super luxury living in Bangkok. Monolithic stone forms and expansive glazed pavilions blur the boundaries between architectural mastery and verdant private landscape.',
      'Each bespoke residence is thoughtfully calibrated to foster multi-generational intimacy while offering sovereign entertaining spaces. Crafted with artisanal Italian marble, acoustic insulated envelopes, and sovereign green courtyards for generations to cherish.',
    ],
    keyStats: [
      { value: '9', label: 'PRIVATE RESIDENCES' },
      { value: '101 - 156', label: 'SQ.WA LAND AREA' },
      { value: '733 - 1,223', label: 'SQ.M. USABLE AREA' },
    ],
    houseTypes: [
      {
        name: 'Serein',
        subtitle: 'The Grand Estate',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
        specs: {
          landArea: '156.4 sq.wa',
          usableArea: '1,223 sq.m.',
          bedroom: '5 Bedrooms',
          bathroom: '6 Bathrooms',
          powderRoom: '2 Rooms',
          parking: '6 Bays',
        },
      },
      {
        name: 'Elayne',
        subtitle: 'The Signature Villa',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
        specs: {
          landArea: '118.2 sq.wa',
          usableArea: '895 sq.m.',
          bedroom: '4 Bedrooms',
          bathroom: '5 Bathrooms',
          powderRoom: '1 Room',
          parking: '4 Bays',
        },
      },
      {
        name: 'Azure',
        subtitle: 'The Sky Villa',
        image:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
        specs: {
          landArea: '108.5 sq.wa',
          usableArea: '810 sq.m.',
          bedroom: '4 Bedrooms',
          bathroom: '5 Bathrooms',
          powderRoom: '1 Room',
          parking: '4 Bays',
        },
      },
      {
        name: 'Soleil',
        subtitle: 'The Garden Villa',
        image:
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
        specs: {
          landArea: '101.5 sq.wa',
          usableArea: '733 sq.m.',
          bedroom: '4 Bedrooms',
          bathroom: '5 Bathrooms',
          powderRoom: '1 Room',
          parking: '4 Bays',
        },
      },
    ],
    amenities: [
      'Private 15m Saltwater Lap Pool & Sun Deck',
      'Subterranean Private Wine Cellar & Tasting Salon',
      'Double-Volume Living Salon with 6.8m Ceiling',
      'Custom Sub-Zero & Wolf Gourmet Show Kitchen',
      'Private Passenger & Service Elevator',
      'Rooftop Starlight Terrace & BBQ Pavillion',
      'Private Wellness Studio & Steam Retreat',
      'Smart Home Automation & Multi-Tier Biometric Security',
    ],
    progressText: 'Construction of the residence project is completed',
    progressPercent: 100,
  },
}

// Fallback defaults for other projects
const DEFAULT_EDITORIAL_DATA = {
  startingPrice: '125 MB*',
  propertyType: 'Super Luxury Residence',
  conceptText: [
    'Conceived as a sanctuary of understated grandeur, each residence represents a harmonious fusion of monolithic architecture, natural lighting, and refined privacy.',
    'Designed for generational legacy, the interiors prioritize grand entertaining volumes alongside secluded private retreats, crafted with artisanal materials and acoustic insulated envelopes.',
  ],
  keyStats: [
    { value: '9', label: 'PRIVATE RESIDENCES' },
    { value: '101 - 156', label: 'SQ.WA LAND AREA' },
    { value: '733 - 1,223', label: 'SQ.M. USABLE AREA' },
  ],
  houseTypes: [
    {
      name: 'Serein',
      subtitle: 'The Grand Estate',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      specs: {
        landArea: '156.4 sq.wa',
        usableArea: '1,223 sq.m.',
        bedroom: '5 Bedrooms',
        bathroom: '6 Bathrooms',
        powderRoom: '2 Rooms',
        parking: '6 Bays',
      },
    },
    {
      name: 'Elayne',
      subtitle: 'The Signature Villa',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
      specs: {
        landArea: '118.2 sq.wa',
        usableArea: '895 sq.m.',
        bedroom: '4 Bedrooms',
        bathroom: '5 Bathrooms',
        powderRoom: '1 Room',
        parking: '4 Bays',
      },
    },
    {
      name: 'Azure',
      subtitle: 'The Sky Villa',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
      specs: {
        landArea: '108.5 sq.wa',
        usableArea: '810 sq.m.',
        bedroom: '4 Bedrooms',
        bathroom: '5 Bathrooms',
        powderRoom: '1 Room',
        parking: '4 Bays',
      },
    },
    {
      name: 'Soleil',
      subtitle: 'The Garden Villa',
      image:
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
      specs: {
        landArea: '101.5 sq.wa',
        usableArea: '733 sq.m.',
        bedroom: '4 Bedrooms',
        bathroom: '5 Bathrooms',
        powderRoom: '1 Room',
        parking: '4 Bays',
      },
    },
  ],
  amenities: [
    'Private Saltwater Swimming Pool',
    'Double-Volume Living Hall',
    'Private Passenger Elevator',
    'Custom Gourmet Kitchen',
    'Rooftop BBQ & Starlight Terrace',
    'Smart Home Automation',
    '24/7 Multi-Tier Biometric Security',
    'Private Landscaped Courtyard',
  ],
  progressText: 'Construction of the residence project is completed',
  progressPercent: 100,
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = PROJECTS.find((p) => p.slug === slug)

  // Edge-to-edge interactive house type index state
  const [activeHouseIndex, setActiveHouseIndex] = useState(0)
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0)

  // Registration Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Brochure Modal State
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const [brochureEmail, setBrochureEmail] = useState('')
  const [isBrochureSent, setIsBrochureSent] = useState(false)

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // ── Handle 404 Gracefully ──
  if (!project) {
    return (
      <div className="min-h-screen bg-greyon-cream text-greyon-ink flex items-center justify-center pt-32 pb-20">
        <div className="max-w-lg text-center px-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-greyon-muted mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl font-light text-greyon-ink mb-4">
            Residence Not Found
          </h1>
          <p className="text-sm font-light text-greyon-muted leading-relaxed mb-8">
            The project you requested does not exist or may have been archived. Please explore our
            complete active portfolio.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-greyon-primary text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-greyon-primary-hover transition-colors"
          >
            <ArrowLeft size={14} />
            <span>View All Projects</span>
          </Link>
        </div>
      </div>
    )
  }

  // Compose Mock and Real Data
  const mock = MOCK_EXTENSIONS[project.slug] || DEFAULT_EDITORIAL_DATA
  const startingPrice = project.priceLabel || mock.startingPrice
  const propertyType = mock.propertyType
  const conceptText =
    project.fullStory && project.fullStory.length >= 2
      ? project.fullStory.slice(0, 2)
      : mock.conceptText
  const keyStats = mock.keyStats
  const houseTypes = mock.houseTypes
  const amenitiesList = [
    {
      name: 'Swimming Pool',
      image:
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'BBQ Terrace',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Elixir Lounge',
      image:
        'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Family Lounge',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Fitness Studio',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Working Room',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Grand Parlor',
      image:
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Formal Dining Area',
      image:
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=85',
    },
  ]
  const progressText = mock.progressText
  const progressPercent = mock.progressPercent

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)
  const currentHouse = houseTypes[activeHouseIndex] || houseTypes[0]

  const specsList = [
    { label: 'Land Area', value: currentHouse.specs.landArea },
    { label: 'Usable Area', value: currentHouse.specs.usableArea },
    { label: 'Bedroom', value: currentHouse.specs.bedroom },
    { label: 'Bathroom', value: currentHouse.specs.bathroom },
    { label: 'Powder Room', value: currentHouse.specs.powderRoom },
    { label: 'Parking', value: currentHouse.specs.parking },
  ]

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 700)
  }

  const handleBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBrochureSent(true)
    setTimeout(() => {
      setIsBrochureSent(false)
      setIsBrochureOpen(false)
      setBrochureEmail('')
    }, 2000)
  }

  const scrollToRegister = () => {
    const el = document.getElementById('register-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink">
      {/* ───────────────────────────────────────────────────────────
          1. Hero Section (Full-Bleed)
          ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-end">
        {/* Full-bleed background image */}
        <img
          src={project.coverImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Top subtle vignette for navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none" />

        {/* Bottom gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

        {/* Hero Content (Absolute Bottom) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20">
          {/* Top left of content: Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-light text-white/80 mb-6">
            <Link to="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <span className="text-white/40">&gt;</span>
            <span className="text-white/80">{propertyType}</span>
            <span className="text-white/40">&gt;</span>
            <span className="text-white font-normal">{project.name}</span>
          </div>

          {/* Grid layout spanning the bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            {/* Left: Huge project title and sub-title */}
            <div className="lg:col-span-7">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight uppercase leading-[0.95] mb-4">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide max-w-xl">
                {project.tagline || 'Super Luxury Detached House'}
              </p>
            </div>

            {/* Right: Starting price, value & CTA buttons */}
            <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
              <div className="mb-6 lg:text-right">
                <span className="block text-xs uppercase tracking-[0.25em] text-white/70 font-light mb-1">
                  Starting price
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                  {startingPrice}
                </span>
              </div>

              {/* Side-by-side action buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="px-8 py-3.5 rounded-full bg-white text-greyon-ink text-xs font-medium tracking-[0.2em] uppercase hover:bg-greyon-sand transition-all duration-300 shadow-xl cursor-pointer"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setIsBrochureOpen(true)}
                  className="px-8 py-3.5 rounded-full border border-white/70 text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          2. Concept & Stats Grid (White Section)
          ─────────────────────────────────────────────────────────── */}
      <section className="bg-greyon-cream py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left (col-span-7): 'Concept' heading & 2 paragraphs */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-light mb-6 uppercase tracking-wide text-greyon-ink">
              Concept
            </h2>
            <div className="space-y-5 text-base md:text-lg text-greyon-ink/80 leading-relaxed font-light">
              {conceptText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right (col-span-5): CSS grid of keyStats */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-10 border-t lg:border-t-0 lg:border-l border-greyon-stone pt-8 lg:pt-0 lg:pl-12">
              {keyStats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-5xl md:text-6xl font-light text-greyon-ink tracking-tight leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-greyon-muted font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          3. Interactive House Types (Edge-to-Edge Layout)
          ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-greyon-cream">
        {/* Top Image Container (Borderless & Full-Bleed) */}
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-greyon-sand">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHouseIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentHouse.image}
                alt={`House Type ${currentHouse.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Specs Dashboard (White Section) */}
        <div className="bg-greyon-cream py-12 md:py-16 px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Column (Headline) */}
            <div className="col-span-1 lg:col-span-4">
              <h2 className="text-3xl md:text-[40px] text-greyon-ink font-light uppercase tracking-tight leading-tight">
                HOUSE TYPE
              </h2>
            </div>

            {/* Right Column (Tabs & Data) */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-10">
              {/* Tab Menu Row */}
              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                {houseTypes.map((type, idx) => {
                  const isActive = activeHouseIndex === idx
                  return (
                    <button
                      key={type.name}
                      type="button"
                      onClick={() => setActiveHouseIndex(idx)}
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'text-xl md:text-2xl text-greyon-ink border-b border-greyon-ink pb-1 font-normal cursor-pointer'
                          : 'text-lg md:text-xl text-greyon-stone font-light hover:text-greyon-muted cursor-pointer transition-colors pb-1 border-b border-transparent'
                      }`}
                    >
                      {type.name}
                    </button>
                  )
                })}
              </div>

              {/* Specs Grid (Animated) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHouseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4"
                >
                  {specsList.map((spec) => (
                    <div key={spec.label} className="flex flex-col">
                      <span className="text-[11px] md:text-xs text-greyon-ink font-medium mb-2">
                        {spec.label}
                      </span>
                      <span className="text-xs md:text-sm text-greyon-muted font-light">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          3b. Video & Gallery Section
          ─────────────────────────────────────────────────────────── */}
      {(() => {
        const galleryImages = [
          project.gallery?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
          project.gallery?.[1] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
          project.gallery?.[2] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
        ]

        const handleLightboxPrev = () => {
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
          )
        }

        const handleLightboxNext = () => {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % galleryImages.length : null
          )
        }

        return (
          <>
            {/* Cinematic Video + Floating Thumbnails */}
            <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
              {/* Background HTML5 video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/Blueprint.mp4" type="video/mp4" />
                <source src="/staying.mp4" type="video/mp4" />
              </video>

              {/* Dark gradient overlay at the bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-greyon-dark to-transparent pointer-events-none" />

              {/* Floating Thumbnails */}
              <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="w-20 h-14 md:w-32 md:h-20 rounded-md md:rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-white transition-all hover:scale-105 shadow-2xl"
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Lightbox Modal (Popup Slider) */}
            <AnimatePresence>
              {lightboxIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-6 right-6 text-white/80 hover:text-white cursor-pointer transition-colors z-20"
                    aria-label="Close lightbox"
                  >
                    <X size={28} />
                  </button>

                  {/* Previous Arrow */}
                  <button
                    type="button"
                    onClick={handleLightboxPrev}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 hover:bg-white hover:text-black text-white flex items-center justify-center cursor-pointer transition-colors z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Next Arrow */}
                  <button
                    type="button"
                    onClick={handleLightboxNext}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 hover:bg-white hover:text-black text-white flex items-center justify-center cursor-pointer transition-colors z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Active Image */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lightboxIndex}
                      src={galleryImages[lightboxIndex]}
                      alt={`Gallery image ${lightboxIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
                    />
                  </AnimatePresence>

                  {/* Image Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase font-light">
                    {lightboxIndex + 1} / {galleryImages.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )
      })()}

      {/* ───────────────────────────────────────────────────────────
          4. Amenities (Interactive Split-Screen)
          ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row w-full min-h-[70vh] lg:min-h-[850px] bg-greyon-cream">
        {/* Left Column (Image) */}
        <div className="w-full lg:w-1/2 relative overflow-hidden h-[50vh] lg:h-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeAmenityIndex}
              src={amenitiesList[activeAmenityIndex].image}
              alt={amenitiesList[activeAmenityIndex].name}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Right Column (The Clean White Panel) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between py-16 px-8 lg:p-20 xl:p-28">
          {/* Top Header Block */}
          <div>
            <h2 className="text-4xl lg:text-[52px] text-greyon-ink font-light uppercase tracking-wide mb-6">
              AMENITIES
            </h2>
            <p className="text-greyon-muted font-light text-sm leading-[1.8] max-w-xs">
              We offer a &ldquo;Hospitality&rdquo; living experience, providing services and an atmosphere blended perfectly with the rhythm of big city life.
            </p>
          </div>

          {/* Bottom Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 w-full">
            {amenitiesList.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setActiveAmenityIndex(index)}
                className={`w-full text-left py-4 border-b transition-all duration-300 cursor-pointer ${
                  index === activeAmenityIndex
                    ? 'border-greyon-primary text-greyon-primary font-medium'
                    : 'border-greyon-stone/40 text-greyon-muted font-light hover:text-greyon-ink hover:border-greyon-stone'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          5. Blueprint Progress Section
          ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-greyon-dark py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
          >
            {/* Left Column (Interactive Blueprint) */}
            <div className="relative group cursor-pointer w-full">
              <svg
                viewBox="0 0 600 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto text-greyon-stone group-hover:text-greyon-sand transition-colors duration-500"
              >
                {/* Glassmorphism Gradient Definition */}
                <defs>
                  <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#c4a35a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#627063" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Hover Silhouette (Glassmorphism Gradient Fill, Behind Dashed Lines) */}
                <path
                  d="M 60 330 L 60 250 L 110 250 L 110 210 L 110 110 L 90 110 L 90 100 L 200 100 L 200 60 L 360 60 L 360 100 L 440 100 L 440 110 L 420 110 L 420 210 L 480 210 L 480 330 Z"
                  fill="url(#glassGradient)"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out backdrop-blur-sm"
                />

                {/* Dashed Outline Paths (Structural Lines) */}
                <g
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 4"
                  className="text-greyon-stone group-hover:text-greyon-sand transition-colors duration-500"
                >
                  {/* Grid Reference Axis Lines */} 
                  <line x1="80" y1="45" x2="80" y2="350" />
                  <line x1="220" y1="45" x2="220" y2="350" />
                  <line x1="380" y1="45" x2="380" y2="350" />
                  <line x1="500" y1="45" x2="500" y2="350" />

                  {/* Ground Plane Baseline */}
                  <line x1="40" y1="330" x2="560" y2="330" strokeDasharray="6 3" />
                  <line x1="40" y1="338" x2="560" y2="338" strokeDasharray="2 4" />

                  {/* Level 1: Foundation & Ground Floor Pavilion */}
                  <rect x="150" y="210" width="330" height="120" />
                  {/* Carport / Porte-Cochere (Left Cantilever) */}
                  <path d="M 60 250 L 150 250" />
                  <line x1="80" y1="250" x2="80" y2="330" />
                  <line x1="100" y1="250" x2="100" y2="330" />

                  {/* Entrance Door & Grand Glazing */}
                  <rect x="180" y="230" width="60" height="100" />
                  <line x1="210" y1="230" x2="210" y2="330" />
                  {/* Floor-to-ceiling glass living salon */}
                  <rect x="270" y="220" width="190" height="110" />
                  <line x1="315" y1="220" x2="315" y2="330" />
                  <line x1="360" y1="220" x2="360" y2="330" />
                  <line x1="415" y1="220" x2="415" y2="330" />

                  {/* Level 2: Cantilevered Master Suite Volume */}
                  <rect x="110" y="110" width="310" height="100" />
                  {/* Cantilever under-slab support line */}
                  <line x1="110" y1="210" x2="150" y2="210" />
                  {/* Master Suite Panoramic Window Box */}
                  <rect x="130" y="125" width="180" height="70" />
                  <line x1="175" y1="125" x2="175" y2="195" />
                  <line x1="220" y1="125" x2="220" y2="195" />
                  <line x1="265" y1="125" x2="265" y2="195" />

                  {/* Level 2 Balcony / Sky Terrace */}
                  <rect x="330" y="130" width="90" height="80" />
                  <line x1="330" y1="155" x2="420" y2="155" />
                  <line x1="360" y1="155" x2="360" y2="210" />
                  <line x1="390" y1="155" x2="390" y2="210" />

                  {/* Level 3: Penthouse Pavilion / Starlight Roof Canopy */}
                  <path d="M 90 100 L 440 100 L 440 110 L 90 110 Z" />
                  <rect x="200" y="60" width="160" height="40" />
                  <line x1="240" y1="60" x2="240" y2="100" />
                  <line x1="280" y1="60" x2="280" y2="100" />
                  <line x1="320" y1="60" x2="320" y2="100" />

                  {/* Cantilever Roof Overhang */}
                  <line x1="70" y1="52" x2="390" y2="52" />

                  {/* Pool / Water Feature Line */}
                  <path d="M 490 330 L 540 330 L 540 350 L 490 350 Z" />

                  {/* Dimension Lines */}
                  <line x1="60" y1="370" x2="500" y2="370" />
                  <line x1="60" y1="364" x2="60" y2="376" />
                  <line x1="500" y1="364" x2="500" y2="376" />
                  <line x1="150" y1="366" x2="150" y2="374" />
                  <line x1="420" y1="366" x2="420" y2="374" />

                  {/* Vertical Elevation Dimension (Right) */}
                  <line x1="530" y1="52" x2="530" y2="330" />
                  <line x1="524" y1="52" x2="536" y2="52" />
                  <line x1="524" y1="100" x2="536" y2="100" />
                  <line x1="524" y1="210" x2="536" y2="210" />
                  <line x1="524" y1="330" x2="536" y2="330" />
                </g>
              </svg>
            </div>

            {/* Right Column (Data Stack) */}
            <div>
              <h2 className="text-4xl md:text-5xl text-white font-light tracking-wide mb-2">
                PROGRESS
              </h2>
              <p className="text-greyon-sand/80 text-sm font-light mb-12">
                {progressText || 'Construction of the residence project is completed'}
              </p>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-greyon-sand font-medium text-sm mb-1">
                    Completion
                  </h3>
                  <p className="text-greyon-muted font-light text-sm">
                    {progressPercent ? `${progressPercent}%` : '100%'}
                  </p>
                </div>
                <div>
                  <h3 className="text-greyon-sand font-medium text-sm mb-1">
                    Last updated
                  </h3>
                  <p className="text-greyon-muted font-light text-sm">
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* ───────────────────────────────────────────────────────────
          Brochure Download Modal
          ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isBrochureOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white border border-greyon-stone rounded-2xl p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsBrochureOpen(false)}
                className="absolute top-5 right-5 text-greyon-muted hover:text-greyon-ink transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-greyon-sand flex items-center justify-center mx-auto mb-3 text-greyon-ink">
                  <FileText size={22} />
                </div>
                <h3 className="text-2xl font-light text-greyon-ink mb-1">
                  Official Brochure
                </h3>
                <p className="text-xs text-greyon-muted font-light">
                  Receive the confidential architectural catalog and layout dossier for {project.name}.
                </p>
              </div>

              {isBrochureSent ? (
                <div className="py-6 text-center">
                  <CheckCircle2 size={36} className="text-greyon-success mx-auto mb-2" />
                  <p className="text-sm font-medium text-greyon-ink">
                    Brochure Sent
                  </p>
                  <p className="text-xs text-greyon-muted font-light mt-1">
                    Please check your email inbox shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBrochureDownload} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-greyon-muted font-medium mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={brochureEmail}
                      onChange={(e) => setBrochureEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-greyon-stone text-sm text-greyon-ink placeholder-greyon-muted focus:outline-none focus:border-greyon-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-greyon-primary text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-greyon-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Send e-Brochure</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
