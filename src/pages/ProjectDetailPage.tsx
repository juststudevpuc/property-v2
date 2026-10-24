import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Building,
  Maximize2,
  Calendar,
  Car,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  Download,
} from 'lucide-react'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = PROJECTS.find((p) => p.slug === slug)

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

  // ── Handle 404 Gracefully ──
  if (!project) {
    return (
      <div className="min-h-[70vh] bg-[#0D1117] flex items-center justify-center pt-28 pb-20">
        <div className="container-large text-center max-w-lg">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
            Portfolio
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-[#EAF3FB] mb-4">
            Residence Not Found
          </h1>
          <p className="text-sm font-light text-[#D4DDE3]/80 leading-relaxed mb-8">
            The project you requested does not exist or may have been archived. Please explore our
            complete active portfolio.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3.5 rounded-sm text-xs font-medium tracking-[0.2em] uppercase"
          >
            <ArrowLeft size={14} />
            <span>View All Projects</span>
          </Link>
        </div>
      </div>
    )
  }

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)
  const isAvailable = project.status === 'available'

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pt-20 pb-24">
      {/* ── Breadcrumb / Back Link ── */}
      <div className="container-large py-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8FA5B3] hover:text-[#EAF3FB] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative h-[65vh] min-h-[500px] max-h-[720px] w-full overflow-hidden flex items-end">
        <img
          src={project.coverImage}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        {/* Layered dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/60 via-transparent to-transparent" />

        <div className="container-large relative z-10 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            {/* Status & Price Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1117]/80 backdrop-blur-md border border-[#2A3649] text-xs font-medium tracking-wider uppercase">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-[#8FA5B3]'
                  }`}
                />
                <span className={isAvailable ? 'text-[#D4DDE3]' : 'text-[#8FA5B3]'}>
                  {isAvailable ? 'Available for Private Preview' : 'Sold Out / Archive'}
                </span>
              </span>

              <span className="text-xs font-semibold tracking-widest uppercase text-[#EAF3FB] bg-[#161C26]/80 backdrop-blur-md px-3.5 py-1 rounded-sm border border-[#2A3649]">
                {project.priceLabel}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#EAF3FB] tracking-tight mb-3">
              {project.name}
            </h1>

            {/* Tagline & Location */}
            <p className="text-lg md:text-xl font-light text-[#D4DDE3] mb-4">
              {project.tagline}
            </p>

            <div className="flex items-center gap-2 text-sm text-[#8FA5B3]">
              <MapPin size={16} className="text-[#aebfcb]" />
              <span>{project.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <div className="container-large py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Specs, Narrative, Amenities, Gallery */}
          <div className="lg:col-span-8 flex flex-col gap-16">

            {/* Specs Grid */}
            {project.specs && (
              <section aria-label="Property Specifications">
                <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8FA5B3] mb-6">
                  Key Specifications
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 sm:p-8 rounded-sm bg-[#161C26]/70 border border-[#1E2633]">
                  {project.specs.unitTypes && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#8FA5B3]">
                        <Home size={14} />
                        <span>Unit Types</span>
                      </div>
                      <span className="text-sm font-medium text-[#EAF3FB]">
                        {project.specs.unitTypes}
                      </span>
                    </div>
                  )}

                  {project.specs.usableArea && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#8FA5B3]">
                        <Maximize2 size={14} />
                        <span>Usable Area</span>
                      </div>
                      <span className="text-sm font-medium text-[#EAF3FB]">
                        {project.specs.usableArea}
                      </span>
                    </div>
                  )}

                  {project.specs.landArea && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#8FA5B3]">
                        <Building size={14} />
                        <span>Land Area</span>
                      </div>
                      <span className="text-sm font-medium text-[#EAF3FB]">
                        {project.specs.landArea}
                      </span>
                    </div>
                  )}

                  {project.specs.totalUnits && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#8FA5B3]">
                        <Building size={14} />
                        <span>Density</span>
                      </div>
                      <span className="text-sm font-medium text-[#EAF3FB]">
                        {project.specs.totalUnits}
                      </span>
                    </div>
                  )}

                  {project.specs.completionYear && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#8FA5B3]">
                        <Calendar size={14} />
                        <span>Completion</span>
                      </div>
                      <span className="text-sm font-medium text-[#EAF3FB]">
                        {project.specs.completionYear}
                      </span>
                    </div>
                  )}

                  {project.specs.parking && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#8FA5B3]">
                        <Car size={14} />
                        <span>Parking</span>
                      </div>
                      <span className="text-sm font-medium text-[#EAF3FB]">
                        {project.specs.parking}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Narrative & Philosophy */}
            <section aria-label="About the Residence">
              <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8FA5B3] mb-4">
                Architectural Narrative
              </h2>
              <div className="space-y-4 text-base md:text-lg font-light text-[#D4DDE3]/85 leading-relaxed">
                <p>{project.description}</p>
                {project.fullStory?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Amenities Grid */}
            {project.amenities && project.amenities.length > 0 && (
              <section aria-label="Curated Amenities">
                <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8FA5B3] mb-6">
                  Curated Sanctuaries &amp; Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-4 rounded-sm bg-[#161C26]/40 border border-[#1E2633]"
                    >
                      <Sparkles size={16} className="text-[#8FA5B3] shrink-0" />
                      <span className="text-sm font-light text-[#D4DDE3]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Photo Gallery Grid */}
            {project.gallery && project.gallery.length > 0 && (
              <section aria-label="Residence Gallery">
                <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8FA5B3] mb-6">
                  Visual Collection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="group relative h-64 sm:h-72 overflow-hidden rounded-sm bg-[#161C26] border border-[#1E2633]"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.name} gallery image ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Register Interest Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="p-8 rounded-sm bg-[#161C26] border border-[#1E2633] shadow-2xl">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#8FA5B3] block mb-2">
                Private Consultation
              </span>
              <h3 className="text-2xl font-light text-[#EAF3FB] mb-2">
                Register Your Interest
              </h3>
              <p className="text-xs font-light text-[#D4DDE3]/80 leading-relaxed mb-6">
                Receive confidential floor plans, investment yields, and book a priority show-villa tour for {project.name}.
              </p>

              {isSubmitted ? (
                <div className="py-8 text-center bg-[#0D1117]/60 rounded-sm p-6 border border-emerald-500/20">
                  <CheckCircle2 size={36} className="text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-light text-[#EAF3FB] mb-1">
                    Registration Confirmed
                  </h4>
                  <p className="text-xs text-[#8FA5B3] leading-relaxed mb-4">
                    Our private property manager for {project.name} will contact you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs tracking-wider uppercase text-[#D4DDE3] underline cursor-pointer"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#D4DDE3] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Eleanor Rigby"
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-xs text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#D4DDE3] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+66 81 234 5678"
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-xs text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#D4DDE3] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-xs text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#D4DDE3] mb-1">
                      Preferred Viewing Date
                    </label>
                    <input
                      type="date"
                      value={formState.date}
                      onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-xs text-[#EAF3FB] focus:outline-none focus:border-[#D4DDE3]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 mt-2 rounded-sm text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing…</span>
                    ) : (
                      <>
                        <span>Register for Preview</span>
                        <Send size={13} />
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:contact@thecreatorshq.com?subject=Brochure%20Request"
                    className="inline-flex items-center justify-center gap-2 text-[11px] text-[#8FA5B3] hover:text-[#EAF3FB] tracking-wider uppercase pt-2 transition-colors"
                  >
                    <Download size={13} />
                    <span>Download e-Brochure</span>
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Related Residences ── */}
        <div className="mt-28 pt-16 border-t border-[#1E2633]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-2">
                Portfolio
              </p>
              <h2 className="text-2xl sm:text-3xl font-light text-[#EAF3FB]">
                Explore Other Residences
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#D4DDE3] hover:text-white"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
