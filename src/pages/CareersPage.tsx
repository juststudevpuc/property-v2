import { useState, useMemo } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  X,
  Check,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
  UploadCloud,
  FileText,
  Mail,
} from 'lucide-react'

const EASE = [0.165, 0.84, 0.44, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

/* ─── Discipline Filters ──────────────────────────────────── */
const DISCIPLINE_FILTERS = [
  'All Disciplines',
  'Sanctuary Hospitality',
  'Architecture & Development',
  'Culinary & Wellness',
  'Corporate & Advisory',
] as const

type DisciplineFilter = (typeof DISCIPLINE_FILTERS)[number]

/* ─── Career Role Data Structure ──────────────────────────── */
interface CareerRole {
  id: string
  code: string
  title: string
  discipline: DisciplineFilter
  location: string
  type: string
  experienceLevel: string
  overview: string
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
}

const CAREER_ROLES: CareerRole[] = [
  {
    id: 'role-arch-lead',
    code: 'ROLE 01',
    title: 'Senior Architectural Project Lead',
    discipline: 'Architecture & Development',
    location: 'Bangkok, Thailand',
    type: 'Full-Time',
    experienceLevel: '8+ Years Architecture & Spatial Design',
    overview:
      'Direct the architectural execution of upcoming GREYON sanctuaries and branded residences across Southeast Asia, bridging timeless vernacular craftsmanship with contemporary high-performance construction.',
    responsibilities: [
      'Oversee schematic through construction administration phases in direct collaboration with monograph architecture partners and master stone masons.',
      'Ensure uncompromising alignment with GREYON’s biophilic, low-impact structural philosophy across tropical microclimates.',
      'Conduct on-site technical audits across Thailand and Indochina, preserving material integrity from local teak joinery to monolithic rammed earth.',
      'Lead multidisciplinary coordination with MEP, acoustic, and landscape specialists to guarantee absolute sensory serenity.',
    ],
    qualifications: [
      'Licensed Architect with a minimum of 8 years in luxury hospitality or high-end residential architecture.',
      'Demonstrated portfolio featuring published international resort sanctuaries or museum-grade private estates.',
      'Mastery of BIM, ArchiCAD, Rhino, and fine physical architectural detailing.',
      'Fluency in English; working proficiency in Thai is advantageous.',
    ],
    benefits: [
      'Global atelier mobility & site residency stipends across Thailand and Indochina.',
      'Annual complimentary stays across all GREYON Sanctuaries & Resorts.',
      'Comprehensive executive health, wellness, and bespoke sabbatical programs.',
    ],
  },
  {
    id: 'role-villa-butler',
    code: 'ROLE 02',
    title: 'Private Villa Head Butler',
    discipline: 'Sanctuary Hospitality',
    location: 'Phuket, Thailand',
    type: 'Full-Time',
    experienceLevel: '5+ Years Luxury Hospitality / Private Household',
    overview:
      'Provide unscripted, intuitive stewardship for guests residing within GREYON Phuket’s oceanfront private pool pavilions and multi-bedroom estate villas overlooking Pansea Beach.',
    responsibilities: [
      'Orchestrate seamless, tailor-made daily itineraries, private dining experiences, and coastal charters with silent discretion.',
      'Anticipate unspoken guest preferences through careful pre-arrival coordination and intuitive personal attention.',
      'Supervise and mentor the dedicated villa host team, ensuring immaculate pavilion maintenance and botanical readiness.',
      'Coordinate directly with the Executive Chef and Wellness Director for in-villa culinary rituals and therapeutic sessions.',
    ],
    qualifications: [
      '5+ years in five-star ultra-luxury resorts (Aman, Rosewood, Six Senses) or ultra-high-net-worth private estates.',
      'Certified Guild of Professional English Butlers or equivalent accredited luxury butler certification.',
      'Impeccable poise, emotional intelligence, and absolute confidentiality.',
      'Fluent in English; additional fluency in Mandarin, Russian, or French is highly valued.',
    ],
    benefits: [
      'Sanctuary beachfront living quarters with full board and wellness privileges.',
      'Discretionary gratuity share and annual international hospitality exchange.',
      'Full holistic medical coverage and round-trip annual homecoming travel stipend.',
    ],
  },
  {
    id: 'role-wellness-director',
    code: 'ROLE 03',
    title: 'Holistic Wellness & Hydrotherapy Director',
    discipline: 'Culinary & Wellness',
    location: 'Siem Reap, Cambodia',
    type: 'Full-Time',
    experienceLevel: '7+ Years Integrative Wellness Leadership',
    overview:
      'Design and lead the sanctuary wellness vision in Siem Reap, harmonizing ancient Khmer herbal healing traditions, circadian hydrotherapy, and modern therapeutic diagnostics.',
    responsibilities: [
      'Curate bespoke multi-day immersion programs including mindfulness retreats, posture alignment, and forest bathing.',
      'Manage the holistic sanctuary spa, private consultation chambers, hydrotherapy circuit, and herbal apothecary.',
      'Recruit, train, and inspire local practitioners, preservationist herbalists, and international visiting masters.',
      'Collaborate with the culinary team to develop farm-to-table circadian nutritional menus and botanical tonics.',
    ],
    qualifications: [
      'Degree or advanced certifications in Naturopathy, Physiotherapy, Integrative Medicine, or Traditional Asian Therapeutics.',
      'Proven leadership tenure heading world-class wellness destinations or spa sanctuaries in Asia.',
      'Deep reverence for regional healing botanicals, mindfulness rituals, and ethical sustainability.',
      'Exceptional leadership, guest consultation, and interpersonal communication skills.',
    ],
    benefits: [
      'Dedicated on-property sanctuary suite and organic wellness culinary plan.',
      'Annual international wellness conference and botanical research exploration budget.',
      'Full healthcare coverage including integrative therapies and sabbatical allowances.',
    ],
  },
  {
    id: 'role-residences-advisor',
    code: 'ROLE 04',
    title: 'Branded Residences Private Advisor',
    discipline: 'Corporate & Advisory',
    location: 'Bangkok / Phnom Penh',
    type: 'Full-Time',
    experienceLevel: '6+ Years Ultra-Prime Real Estate & Private Client Advisory',
    overview:
      'Serve as trusted private advisor to ultra-high-net-worth collectors, family offices, and investors acquiring GREYON branded villas and city penthouses across Thailand and Cambodia.',
    responsibilities: [
      'Conduct discreet private viewings, architectural presentations, and monograph briefings for accredited buyers.',
      'Manage end-to-end transaction advisory, ownership structuring, and bespoke interior modification requests.',
      'Foster long-term relationships with global family offices, private wealth bankers, and premier lifestyle advisory firms.',
      'Represent GREYON at high-profile international architecture bienniales, private salons, and collector symposiums.',
    ],
    qualifications: [
      '6+ years representing ultra-prime residential developments ($3M–$25M+ tier) in Southeast Asia or global capitals.',
      'Established network of private clients, family office representatives, and legal structuring advisors.',
      'Sophisticated understanding of architectural design, capital preservation, and leasehold/freehold titling.',
      'Polished bilingual communication; native fluency in English with Thai or Khmer capabilities.',
    ],
    benefits: [
      'Uncapped performance incentive structures reflecting ultra-prime transaction scales.',
      'Executive travel allowances between Bangkok, Phnom Penh, Singapore, and Hong Kong.',
      'Privileged access to GREYON collector events and sanctuary suites.',
    ],
  },
  {
    id: 'role-executive-chef',
    code: 'ROLE 05',
    title: 'Executive Omakase & Coastal Chef',
    discipline: 'Culinary & Wellness',
    location: 'Krabi, Thailand',
    type: 'Full-Time',
    experienceLevel: '6+ Years Fine Dining / Coastal & Japanese Gastronomy',
    overview:
      'Lead the sea-facing cliffside dining experience at GREYON Krabi Cove, presenting intimate 12-seat Edomae-style omakase alongside regenerative Andaman seafood gastronomy.',
    responsibilities: [
      'Source pristine daily line-caught seafood from artisanal Krabi fishermen and organic micro-farms in the Phang Nga basin.',
      'Curate daily seasonal tasting menus reflecting the tidal rhythms and ancient preservation techniques of the Andaman Sea.',
      'Host nightly intimate counter services for sanctuary guests, pairing each course with rare sake and biodynamic wines.',
      'Maintain a zero-single-use-plastic, near-zero-food-waste kitchen operation adhering to strict circular gastronomy.',
    ],
    qualifications: [
      'Classic Edomae sushi or modern Kaiseki training under accredited masters, paired with luxury resort experience.',
      'Deep passion for sustainable marine conservation and relationships with artisanal fishermen.',
      'Calm, respectful demeanor suited to open-counter guest interaction and educational storytelling.',
      'Strong kitchen management skills with rigorous hygiene, cost control, and ingredient provenance tracking.',
    ],
    benefits: [
      'Custom cliffside culinary atelier equipped with bespoke Japanese knife stations and artisanal charcoal grills.',
      'Competitive compensation package with performance bonus and ocean-view housing.',
      'Annual culinary exploration trips to Japan and Southeast Asian coastal food capitals.',
    ],
  },
  {
    id: 'role-guest-exp-manager',
    code: 'ROLE 06',
    title: 'Sanctuary Guest Experience Manager',
    discipline: 'Sanctuary Hospitality',
    location: 'Phuket, Thailand',
    type: 'Full-Time',
    experienceLevel: '5+ Years Luxury Resort Guest Relations',
    overview:
      'Curate the sensory journey of every guest from initial private tarmac greeting to farewell blessing at GREYON Phuket Sanctuary, orchestrating moments of quiet wonder.',
    responsibilities: [
      'Oversee the front of house, guest concierge, and airport limousine fleet with effortless, unobtrusive grace.',
      'Design tailor-made cultural and nature excursions across Phang Nga Bay, secluded island temples, and coral sanctuaries.',
      'Resolve guest inquiries with creative autonomy, empowering team members to deliver meaningful, memorable gestures.',
      'Analyze guest feedback and behavioural cues to continually elevate sanctuary rituals and pre-arrival preparations.',
    ],
    qualifications: [
      'Proven experience managing guest experience or front office operations in top-tier luxury retreat environments.',
      'Empathetic leadership style that nurtures local Thai hospitality traditions with international luxury standards.',
      'Problem-solving agility with a gracious, tranquil demeanor under any situation.',
      'Fluency in English and Thai; additional European or Asian languages are highly valued.',
    ],
    benefits: [
      'On-property resort accommodations and comprehensive wellness privileges.',
      'Relocation support, annual airline tickets to home country, and health coverage.',
      'Clear career progression pathway to Resident Manager and General Manager roles.',
    ],
  },
]

export default function CareersPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineFilter>('All Disciplines')
  const [activeRole, setActiveRole] = useState<CareerRole | null>(null)

  // Candidacy Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    portfolioUrl: '',
    resumeFileName: '',
    coverNote: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null)

  // Filtered Roles
  const filteredRoles = useMemo(() => {
    if (selectedDiscipline === 'All Disciplines') {
      return CAREER_ROLES
    }
    return CAREER_ROLES.filter((role) => role.discipline === selectedDiscipline)
  }, [selectedDiscipline])

  const handleOpenRoleModal = (role: CareerRole) => {
    setActiveRole(role)
    setSubmissionSuccess(null)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      portfolioUrl: '',
      resumeFileName: '',
      coverNote: '',
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate luxury dossier submission
    setTimeout(() => {
      const generatedCode = `GRY-HR-${Math.floor(1000 + Math.random() * 9000)}`
      setSubmissionSuccess(generatedCode)
      setIsSubmitting(false)
    }, 900)
  }

  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resumeFileName: e.target.files![0].name,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-[#c4a35a]/20">
      
      {/* ── A. Centered Editorial Header & Hero Split ───────────────── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-14 md:pb-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
            <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
              Atelier &amp; Sanctuary Careers
            </span>
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-6">
            Join the House of GREYON
          </h1>

          {/* Lead Narrative */}
          <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed max-w-2xl mx-auto">
            We invite visionary architects, private hosts, culinary artisans, and integrative wellness
            practitioners to shape spaces of quietude and enduring beauty across Asia. Discover
            appointments within our design ateliers and flagship sanctuaries.
          </p>
        </motion.div>

        {/* Asymmetric 2-Image Editorial Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-14 md:mt-20"
        >
          {/* Left: Studio & Architectural Craftsmanship (7 Columns) */}
          <div className="md:col-span-7 group relative overflow-hidden bg-stone-200">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85"
                alt="Architectural atelier craftsmanship and joinery prototyping"
                className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#faf8f6] border border-t-0 border-stone-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a35a] font-medium block">
                  ATELIER BANGKOK
                </span>
                <span className="text-xs font-display text-greyon-ink tracking-wider font-light">
                  Architectural Stewardship &amp; Vernacular Prototyping
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">STUDIO 01</span>
            </div>
          </div>

          {/* Right: Sanctuary Hospitality (5 Columns) */}
          <div className="md:col-span-5 group relative overflow-hidden bg-stone-200">
            <div className="aspect-[16/10] md:aspect-auto md:h-[calc(100%-81px)] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
                alt="Sanctuary hospitality and reflective pavilion pool"
                className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#faf8f6] border border-t-0 border-stone-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a35a] font-medium block">
                  RESORT SANCTUARIES
                </span>
                <span className="text-xs font-display text-greyon-ink tracking-wider font-light">
                  Intuitive Service Across Coastal Havens
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">ESTATE 02</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── B. Three Pillars of Stewardship (3-Column Hairline Grid) ── */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-y border-stone-300/60 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Pillar 1 */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a35a] font-medium block">
              01 // ARCHITECTURAL PRECISION
            </span>
            <h3 className="text-lg font-display font-light text-greyon-ink">
              Monograph Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm font-body text-stone-500 font-light leading-relaxed">
              Collaborating with world-renowned monograph architects and sustainable stone/timber artisans
              to construct timeless structures that age gracefully across generations.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a35a] font-medium block">
              02 // INTUITIVE HOSPITALITY
            </span>
            <h3 className="text-lg font-display font-light text-greyon-ink">
              Unscripted Personal Service
            </h3>
            <p className="text-xs sm:text-sm font-body text-stone-500 font-light leading-relaxed">
              Unscripted, deeply personal service across our private pavilions, villas, and residences,
              grounded in genuine empathy, silent anticipation, and warm dignity.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a35a] font-medium block">
              03 // GLOBAL SANCTUARY MOBILITY
            </span>
            <h3 className="text-lg font-display font-light text-greyon-ink">
              Regional Pathways &amp; Exchanges
            </h3>
            <p className="text-xs sm:text-sm font-body text-stone-500 font-light leading-relaxed">
              Career pathways, cross-training, and residential mobility across our sanctuaries in
              Phuket, Bangkok, Siem Reap, and Krabi, supporting lifelong holistic mastery.
            </p>
          </div>

        </div>
      </section>

      {/* ── C. Open Positions Filter & Interactive Ledger ──────────── */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-display text-[#c4a35a] font-medium block mb-2">
              CURRENT OPPORTUNITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-greyon-ink">
              Open Atelier &amp; Sanctuary Appointments
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-none pb-2 border-b border-stone-200 lg:border-none">
            {DISCIPLINE_FILTERS.map((disc) => {
              const isActive = selectedDiscipline === disc
              return (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setSelectedDiscipline(disc)}
                  className="relative pb-2.5 pt-1 text-xs uppercase tracking-wider font-display whitespace-nowrap transition-colors cursor-pointer focus:outline-none"
                >
                  <span
                    className={
                      isActive
                        ? 'text-greyon-ink font-medium'
                        : 'text-stone-400 hover:text-greyon-ink'
                    }
                  >
                    {disc}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="careersFilter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a35a]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Roles Ledger (Hairline List) */}
        <div className="border-y border-stone-300/60 divide-y divide-stone-300/60">
          <AnimatePresence mode="popLayout">
            {filteredRoles.map((role) => (
              <motion.div
                key={role.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#f6f2ec]/60 transition-colors px-2 sm:px-4 cursor-pointer"
                onClick={() => handleOpenRoleModal(role)}
              >
                {/* Left Metadata & Title */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                      {role.code}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#c4a35a]" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium">
                      {role.discipline}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-light text-greyon-ink group-hover:text-greyon-gold-deep transition-colors">
                    {role.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-body text-stone-500 font-light">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {role.location}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                      {role.type}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {role.experienceLevel}
                    </span>
                  </div>
                </div>

                {/* Right Action */}
                <div className="shrink-0 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenRoleModal(role)
                    }}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-display font-medium text-greyon-ink group-hover:text-greyon-gold-deep transition-colors border-b border-stone-300 pb-1 group-hover:border-[#c4a35a]"
                  >
                    <span>View Dossier &amp; Apply</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* ── D. Interactive Role Detail & Application Modal ─────────── */}
      <AnimatePresence>
        {activeRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRole(null)}
              className="absolute inset-0 bg-greyon-dark/70 backdrop-blur-sm"
            />

            {/* Modal Dialog (Rounded-None) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#faf8f6] text-greyon-ink border border-stone-300/80 rounded-none overflow-y-auto shadow-2xl z-10"
            >
              {/* Top Bar with Close Button */}
              <div className="sticky top-0 bg-[#faf8f6]/95 backdrop-blur-md border-b border-stone-200/80 px-6 sm:px-8 py-5 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                    {activeRole.code}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#c4a35a]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium">
                    {activeRole.discipline}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveRole(null)}
                  className="p-1.5 text-stone-400 hover:text-greyon-ink transition-colors cursor-pointer focus:outline-none"
                  aria-label="Close dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dossier Content */}
              <div className="p-6 sm:p-8 md:p-10 space-y-8">
                
                {/* Header Information */}
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink mb-3">
                    {activeRole.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-body text-stone-500 font-light">
                    <span>{activeRole.location}</span>
                    <span>•</span>
                    <span>{activeRole.type}</span>
                    <span>•</span>
                    <span>{activeRole.experienceLevel}</span>
                  </div>
                </div>

                {/* Role Overview */}
                <div className="border-t border-stone-200/80 pt-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium mb-3">
                    ROLE OVERVIEW
                  </h4>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed">
                    {activeRole.overview}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div className="border-t border-stone-200/80 pt-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium mb-3">
                    KEY RESPONSIBILITIES
                  </h4>
                  <ul className="space-y-2.5">
                    {activeRole.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-greyon-ink/90 font-light leading-relaxed">
                        <span className="text-[#c4a35a] font-bold select-none">—</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Candidate Qualifications */}
                <div className="border-t border-stone-200/80 pt-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium mb-3">
                    CANDIDATE QUALIFICATIONS
                  </h4>
                  <ul className="space-y-2.5">
                    {activeRole.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-greyon-ink/90 font-light leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#c4a35a] mt-0.5 shrink-0" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stewardship Privileges / Benefits */}
                <div className="border-t border-stone-200/80 pt-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium mb-3">
                    STEWARDSHIP &amp; PRIVILEGES
                  </h4>
                  <ul className="space-y-2.5">
                    {activeRole.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-2 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Section */}
                <div className="border-t border-stone-300/80 pt-8">
                  {submissionSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 bg-[#f5f2ed] border border-stone-300/80 text-center space-y-4"
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#c4a35a]/20 flex items-center justify-center text-[#c4a35a]">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono tracking-widest text-stone-500 block uppercase">
                        APPLICATION SUBMISSION CONFIRMED
                      </span>
                      <h3 className="font-display text-2xl font-light text-greyon-ink">
                        {submissionSuccess}
                      </h3>
                      <p className="text-xs sm:text-sm font-body text-stone-600 font-light max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-normal text-greyon-ink">{formData.fullName}</span>.
                        Your candidacy dossier for <span className="font-normal text-greyon-ink">{activeRole.title}</span> has
                        been received by the Talent Stewardship Committee.
                      </p>
                      <p className="text-xs text-stone-500 font-light italic">
                        Our HR desk reviews each portfolio with discreet care and will contact qualified applicants within 48 to 72 hours.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => setActiveRole(null)}
                          className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-display font-medium bg-greyon-ink text-white hover:bg-black transition-colors rounded-none"
                        >
                          Return to Opportunities
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <span className="text-xs uppercase tracking-[0.2em] font-display text-[#c4a35a] font-medium block">
                          CANDIDACY DOSSIER
                        </span>
                        <h3 className="font-display text-xl font-light text-greyon-ink">
                          Submit Your Application
                        </h3>
                        <p className="text-xs font-body text-stone-500 font-light mt-1">
                          All submissions are treated with absolute discretion under GREYON’s executive privacy protocols.
                        </p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="e.g. Alistair Vance"
                              className="w-full px-4 py-2.5 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="e.g. alistair@vance-arch.com"
                              className="w-full px-4 py-2.5 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                              Phone / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+66 81 234 5678"
                              className="w-full px-4 py-2.5 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                              Current City &amp; Country *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              placeholder="e.g. Bangkok, Thailand"
                              className="w-full px-4 py-2.5 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                            Portfolio or LinkedIn Dossier URL
                          </label>
                          <input
                            type="url"
                            value={formData.portfolioUrl}
                            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                            Curriculum Vitae / Resume Dossier
                          </label>
                          <div className="relative border border-dashed border-stone-300 bg-white p-4 text-center hover:border-[#c4a35a] transition-colors">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFakeFileUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              <UploadCloud className="w-5 h-5 text-stone-400" />
                              <span className="text-xs text-stone-600 font-light">
                                {formData.resumeFileName ? (
                                  <span className="inline-flex items-center gap-1 text-[#c4a35a] font-medium">
                                    <FileText className="w-3.5 h-3.5" />
                                    {formData.resumeFileName}
                                  </span>
                                ) : (
                                  'Click or drag PDF / Word document (Max 15MB)'
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500 mb-1.5">
                            Cover Note &amp; Architectural / Hospitality Philosophy
                          </label>
                          <textarea
                            rows={3}
                            value={formData.coverNote}
                            onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                            placeholder="Share briefly why you are drawn to the quiet stewardship of GREYON..."
                            className="w-full px-4 py-2.5 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors resize-none"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-greyon-primary text-white hover:bg-greyon-primary-hover text-xs uppercase tracking-[0.2em] font-display font-medium rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>{isSubmitting ? 'Submitting Dossier...' : 'Submit Candidacy Dossier'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── E. Spontaneous Application Footer Strip ────────────────── */}
      <section className="border-t border-stone-300/60 bg-[#f5f2ed]/60 py-16 md:py-20 text-center">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-display text-[#c4a35a] font-medium block">
              SPONTANEOUS TALENT INQUIRIES &amp; FELLOWSHIPS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink">
              Unscripted Paths to GREYON
            </h3>
            <p className="text-xs sm:text-sm font-body text-stone-500 font-light leading-relaxed">
              If your discipline does not appear above but you possess exceptional talent in timber and stone
              masonry, landscape architecture, organic agronomy, or private sanctuary hospitality, we welcome
              unscripted inquiries.
            </p>
            <div className="pt-3">
              <a
                href="mailto:careers@greyon.com?subject=Speculative%20Candidacy%20Dossier%20//%20House%20of%20GREYON"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-display font-medium text-greyon-ink hover:text-greyon-gold-deep transition-colors border-b border-stone-400 pb-1 hover:border-[#c4a35a]"
              >
                <Mail className="w-3.5 h-3.5 text-[#c4a35a]" />
                <span>Inquire with PR &amp; Talent Desk (careers@greyon.com) →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
