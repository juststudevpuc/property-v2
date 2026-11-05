import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react'
import { PROJECTS } from '@/data/projects'

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
      { value: '9', label: 'Private Residences' },
      { value: '101 - 156', label: 'Sq.wa Land Area' },
      { value: '733 - 1,223', label: 'Sq.m Usable Area' },
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

const DEFAULT_EDITORIAL_DATA = {
  startingPrice: '125 MB*',
  propertyType: 'Super Luxury Residence',
  conceptText: [
    'Conceived as a sanctuary of understated grandeur, each residence represents a harmonious fusion of monolithic architecture, natural lighting, and refined privacy.',
    'Designed for generational legacy, the interiors prioritize grand entertaining volumes alongside secluded private retreats, crafted with artisanal materials and acoustic insulated envelopes.',
  ],
  keyStats: [
    { value: '9', label: 'Private Residences' },
    { value: '101 - 156', label: 'Sq.wa Land Area' },
    { value: '733 - 1,223', label: 'Sq.m Usable Area' },
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

  const [activeHouseIndex, setActiveHouseIndex] = useState(0)
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0)

  // Registration Form State
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', email: '' })
  const [isRegistering, setIsRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  // Brochure Modal State
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const [brochureEmail, setBrochureEmail] = useState('')
  const [isBrochureSent, setIsBrochureSent] = useState(false)

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!project) {
    return (
      <div className="min-h-screen bg-greyon-cream text-greyon-ink flex items-center justify-center pt-32 pb-20 select-none">
        <div className="max-w-md text-center px-6">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep mb-3">
            Portfolio
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-greyon-ink mb-4">
            Residence Not Found
          </h1>
          <p className="font-body text-xs sm:text-sm text-greyon-muted leading-relaxed mb-8">
            The requested property is unavailable or archived from the active collection.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-greyon-primary text-white text-xs font-display tracking-widest uppercase hover:bg-greyon-primary-hover transition-colors rounded-none"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    )
  }

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
        'https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    },
    {
      name: 'Formal Dining Area',
      image:
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=85',
    },
  ]
  const progressText = mock.progressText
  const progressPercent = mock.progressPercent

  const currentHouse = houseTypes[activeHouseIndex] || houseTypes[0]

  const specsList = [
    { label: 'Land Area', value: currentHouse.specs.landArea },
    { label: 'Usable Area', value: currentHouse.specs.usableArea },
    { label: 'Bedroom', value: currentHouse.specs.bedroom },
    { label: 'Bathroom', value: currentHouse.specs.bathroom },
    { label: 'Powder Room', value: currentHouse.specs.powderRoom },
    { label: 'Parking', value: currentHouse.specs.parking },
  ]

  const galleryImages = [
    project.gallery?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    project.gallery?.[1] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    project.gallery?.[2] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
  ]

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)
    setTimeout(() => {
      setIsRegistering(false)
      setIsRegistered(true)
    }, 600)
  }

  const handleBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBrochureSent(true)
    setTimeout(() => {
      setIsBrochureSent(false)
      setIsBrochureOpen(false)
      setBrochureEmail('')
    }, 1800)
  }

  const scrollToRegister = () => {
    const el = document.getElementById('inquiry-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink select-none">
      
      {/* ── 1. Full-Bleed Editorial Hero ────────────────────────── */}
      <section className="relative w-full h-[92vh] min-h-[680px] overflow-hidden flex items-end bg-greyon-dark">
        <img
          src={project.coverImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          loading="eager"
        />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-greyon-dark/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark via-greyon-dark/30 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-20">
          <nav className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] uppercase text-white/60 mb-8">
            <Link to="/projects" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{propertyType}</span>
            <span className="text-white/30">/</span>
            <span className="text-greyon-gold font-medium">{project.name}</span>
          </nav>

          <div className="border-t border-white/20 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-7">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight uppercase leading-[0.95] mb-4">
                {project.name}
              </h1>
              <p className="font-body italic text-sm sm:text-base md:text-lg text-greyon-sand/85 font-light max-w-xl">
                {project.tagline || 'Super Luxury Detached House'}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
              <div className="mb-6 lg:text-right">
                <span className="block font-display text-[11px] uppercase tracking-[0.25em] text-greyon-gold mb-1">
                  Valuation From
                </span>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                  {startingPrice}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="px-8 py-3.5 bg-white text-greyon-ink font-display text-xs tracking-[0.2em] uppercase hover:bg-greyon-sand transition-colors cursor-pointer rounded-none"
                >
                  Request Dossier
                </button>
                <button
                  type="button"
                  onClick={() => setIsBrochureOpen(true)}
                  className="px-8 py-3.5 border border-white/40 text-white font-display text-xs tracking-[0.2em] uppercase hover:border-white transition-colors cursor-pointer rounded-none"
                >
                  e-Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Spatial Philosophy & Direct Proportions ──────────── */}
      <section className="py-24 md:py-36 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-greyon-stone/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep block mb-3">
              Spatial Philosophy
            </span>
            <div className="space-y-6 font-body text-base sm:text-lg text-greyon-ink/80 leading-relaxed font-light">
              {conceptText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-10 border-t lg:border-t-0 lg:border-l border-greyon-stone/40 pt-8 lg:pt-0 lg:pl-16">
              {keyStats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="font-display text-xs uppercase tracking-[0.25em] text-greyon-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Typology Monograph (Sharp, Borderless Canvas) ─────── */}
      <section className="w-full bg-greyon-cream py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="border-b border-greyon-stone/40 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep block mb-2">
                Configurations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-greyon-ink">
                Residence Typologies
              </h2>
            </div>

            <nav className="flex flex-wrap items-center gap-8">
              {houseTypes.map((type, idx) => {
                const isActive = activeHouseIndex === idx
                return (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() => setActiveHouseIndex(idx)}
                    className={`font-display text-sm tracking-widest uppercase transition-all duration-300 pb-1 border-b cursor-pointer ${
                      isActive
                        ? 'text-greyon-ink border-greyon-primary font-medium'
                        : 'text-greyon-muted border-transparent hover:text-greyon-ink'
                    }`}
                  >
                    {type.name}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden bg-greyon-sand rounded-none mb-12">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeHouseIndex}
                src={currentHouse.image}
                alt={currentHouse.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </AnimatePresence>
            <div className="absolute top-6 left-6 pointer-events-none">
              <span className="font-display text-xs tracking-widest uppercase text-white bg-greyon-dark/70 px-4 py-2 backdrop-blur-sm">
                {currentHouse.subtitle || currentHouse.name}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeHouseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 border-t border-greyon-stone/40 pt-8"
            >
              {specsList.map((spec) => (
                <div key={spec.label} className="flex flex-col">
                  <span className="font-display text-[11px] uppercase tracking-wider text-greyon-muted mb-1.5">
                    {spec.label}
                  </span>
                  <span className="font-display text-sm sm:text-base font-light text-greyon-ink">
                    {spec.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. Architectural Film & Gallery Lightbox ─────────────── */}
      <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden bg-greyon-dark">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/Blueprint.mp4" type="video/mp4" />
          <source src="/staying.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          {galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="w-24 h-16 md:w-32 md:h-20 overflow-hidden cursor-pointer rounded-none border border-white/30 hover:border-white transition-all opacity-80 hover:opacity-100"
            >
              <img
                src={imgUrl}
                alt="Gallery Perspective"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-8 right-8 text-white/70 hover:text-white cursor-pointer transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
                )
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % galleryImages.length : null
                )
              }
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <motion.img
              key={lightboxIndex}
              src={galleryImages[lightboxIndex]}
              alt="Architectural View"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 5. Curated Amenities (Split Canvas) ───────────────────── */}
      <section className="flex flex-col lg:flex-row w-full min-h-[680px] bg-greyon-cream border-t border-greyon-stone/40">
        <div className="w-full lg:w-1/2 relative overflow-hidden h-[45vh] lg:h-auto bg-greyon-sand">
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

        <div className="w-full lg:w-1/2 flex flex-col justify-between py-20 px-8 sm:px-12 lg:px-20">
          <div>
            <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep block mb-3">
              Hospitality Features
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-greyon-ink tracking-tight mb-4">
              Curated Amenities
            </h2>
            <p className="font-body text-xs sm:text-sm text-greyon-muted leading-relaxed font-light max-w-md mb-12">
              Spaces tailored to preserve privacy, promote contemplative calm, and host sovereign gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1 w-full border-t border-greyon-stone/40 pt-4">
            {amenitiesList.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setActiveAmenityIndex(index)}
                className={`w-full text-left py-3.5 border-b transition-colors cursor-pointer font-display text-xs tracking-wider uppercase ${
                  index === activeAmenityIndex
                    ? 'border-greyon-primary text-greyon-primary font-medium'
                    : 'border-greyon-stone/30 text-greyon-muted hover:text-greyon-ink'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Blueprint & Structural Integrity ─────────────────── */}
      <section className="w-full bg-greyon-dark py-28 md:py-36 text-greyon-sand">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <svg
                viewBox="0 0 600 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto text-greyon-stone/60"
              >
                <g stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 4">
                  <line x1="80" y1="45" x2="80" y2="350" />
                  <line x1="220" y1="45" x2="220" y2="350" />
                  <line x1="380" y1="45" x2="380" y2="350" />
                  <line x1="500" y1="45" x2="500" y2="350" />
                  <line x1="40" y1="330" x2="560" y2="330" strokeDasharray="6 3" />

                  <rect x="150" y="210" width="330" height="120" />
                  <path d="M 60 250 L 150 250" />
                  <line x1="80" y1="250" x2="80" y2="330" />
                  <line x1="100" y1="250" x2="100" y2="330" />

                  <rect x="180" y="230" width="60" height="100" />
                  <rect x="270" y="220" width="190" height="110" />
                  <line x1="315" y1="220" x2="315" y2="330" />
                  <line x1="360" y1="220" x2="360" y2="330" />

                  <rect x="110" y="110" width="310" height="100" />
                  <rect x="130" y="125" width="180" height="70" />
                  <rect x="330" y="130" width="90" height="80" />

                  <path d="M 90 100 L 440 100 L 440 110 L 90 110 Z" />
                  <rect x="200" y="60" width="160" height="40" />

                  <line x1="60" y1="370" x2="500" y2="370" />
                  <line x1="530" y1="52" x2="530" y2="330" />
                </g>
              </svg>
            </div>

            <div className="lg:col-span-5 border-l border-white/15 pl-10 sm:pl-16">
              <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold block mb-3">
                Milestone Verification
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
                Structural Execution
              </h2>
              <p className="font-body text-xs sm:text-sm text-greyon-sand/80 leading-relaxed font-light mb-10">
                {progressText || 'Construction of the residence project is completed'}
              </p>

              <div className="space-y-6">
                <div>
                  <span className="font-display text-[11px] uppercase tracking-widest text-greyon-sand/60 block mb-1">
                    Completion Status
                  </span>
                  <span className="font-display text-2xl font-light text-white">
                    {progressPercent ? `${progressPercent}%` : '100%'}
                  </span>
                </div>
                <div>
                  <span className="font-display text-[11px] uppercase tracking-widest text-greyon-sand/60 block mb-1">
                    Audit Verification
                  </span>
                  <span className="font-display text-sm text-greyon-gold">
                    Certified for Occupancy
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. Direct Private Inquiry Desk ───────────────────────── */}
      <section id="inquiry-section" className="py-28 md:py-36 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep block mb-3">
              Private Advisory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-greyon-ink tracking-tight mb-4">
              Schedule a Viewing
            </h2>
            <p className="font-body text-xs sm:text-sm text-greyon-muted leading-relaxed font-light max-w-sm">
              Our residential directors provide discreet consultations, bespoke architectural dossiers, and private on-site viewings.
            </p>
          </div>

          <div className="lg:col-span-7">
            {isRegistered ? (
              <div className="py-12 border-t border-greyon-stone/40">
                <CheckCircle2 size={32} className="text-greyon-primary mb-3" />
                <h3 className="font-display text-2xl font-light text-greyon-ink mb-1">
                  Inquiry Registered
                </h3>
                <p className="font-body text-xs text-greyon-muted font-light">
                  A dedicated director will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-display text-[11px] uppercase tracking-widest text-greyon-muted mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      placeholder="Lord / Lady / Mr. / Ms."
                      className="w-full bg-transparent border-b border-greyon-stone/60 py-2 font-display text-sm text-greyon-ink focus:outline-none focus:border-greyon-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-[11px] uppercase tracking-widest text-greyon-muted mb-2">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      placeholder="+66"
                      className="w-full bg-transparent border-b border-greyon-stone/60 py-2 font-display text-sm text-greyon-ink focus:outline-none focus:border-greyon-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-display text-[11px] uppercase tracking-widest text-greyon-muted mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="residence@domain.com"
                    className="w-full bg-transparent border-b border-greyon-stone/60 py-2 font-display text-sm text-greyon-ink focus:outline-none focus:border-greyon-primary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isRegistering}
                  className="px-10 py-4 bg-greyon-primary text-white font-display text-xs tracking-widest uppercase hover:bg-greyon-primary-hover transition-colors rounded-none cursor-pointer"
                >
                  {isRegistering ? 'Transmitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 8. Confidential Dossier Modal ───────────────────────── */}
      <AnimatePresence>
        {isBrochureOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative w-full max-w-md bg-greyon-cream p-10 rounded-none border border-greyon-stone/40"
            >
              <button
                type="button"
                onClick={() => setIsBrochureOpen(false)}
                className="absolute top-6 right-6 text-greyon-muted hover:text-greyon-ink transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="mb-8">
                <FileText size={20} className="text-greyon-gold-deep mb-3" />
                <h3 className="font-display text-2xl font-light text-greyon-ink mb-2">
                  Official Dossier
                </h3>
                <p className="font-body text-xs text-greyon-muted leading-relaxed font-light">
                  Receive the confidential architectural catalog and layout dossier for {project.name}.
                </p>
              </div>

              {isBrochureSent ? (
                <div className="py-6 border-t border-greyon-stone/40">
                  <CheckCircle2 size={28} className="text-greyon-primary mb-2" />
                  <p className="font-display text-sm text-greyon-ink">
                    Dossier Dispatched
                  </p>
                  <p className="font-body text-xs text-greyon-muted font-light mt-1">
                    Check your inbox shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBrochureDownload} className="space-y-6">
                  <div>
                    <label className="block font-display text-[10px] uppercase tracking-widest text-greyon-muted mb-2">
                      Delivery Email
                    </label>
                    <input
                      type="email"
                      required
                      value={brochureEmail}
                      onChange={(e) => setBrochureEmail(e.target.value)}
                      placeholder="client@sanctuary.com"
                      className="w-full bg-transparent border-b border-greyon-stone/60 py-2 font-display text-sm text-greyon-ink focus:outline-none focus:border-greyon-primary transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-greyon-primary text-white font-display text-xs tracking-widest uppercase hover:bg-greyon-primary-hover transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Request Documentation</span>
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