import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ArrowRight,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { HOTEL_SANCTUARIES } from '@/data/hotels'

const EASE = [0.165, 0.84, 0.44, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

/* ─── Archival Reflections Types & Data ─────────────────────── */
type ReflectionCategoryFilter = 'All' | 'Sanctuary Stays' | 'Residence Owners'

interface ArchivalReflection {
  id: string
  quote: string
  author: string
  stayDate: string
  sanctuary: string
  accommodation: string
  category: 'Sanctuary Stays' | 'Residence Owners'
  rating: string
}

const ARCHIVAL_REFLECTIONS: ArchivalReflection[] = [
  {
    id: 'ref-1',
    quote:
      'The dawn mist rising off Pansea Beach from our Ocean Pavilion felt as if time had ceased. No clocks, no unnecessary intrusions—just the gentle rustle of bamboo and the silent, anticipatory grace of our private butler.',
    author: 'E. & M. Lindqvist',
    stayDate: 'OCTOBER 2026',
    sanctuary: 'GREYON Phuket Sanctuary',
    accommodation: 'Ocean Pool Pavilion',
    category: 'Sanctuary Stays',
    rating: 'Exceptional',
  },
  {
    id: 'ref-2',
    quote:
      'Owning a residence at the Bangkok sanctuary has fundamentally altered our relationship with the city. You step through the stone portal off Wireless Road and the urban cacophony dissolves entirely into reflective water courtyards.',
    author: 'Dr. Hiroshi Tanaka',
    stayDate: 'SEPTEMBER 2026',
    sanctuary: 'GREYON Bangkok Sanctuary',
    accommodation: 'The Rain Tree Penthouse',
    category: 'Residence Owners',
    rating: 'Exceptional',
  },
  {
    id: 'ref-3',
    quote:
      'The twilight blessing ceremony across the reflection pool was deeply moving. The architectural alignment with the ancient forest honors Cambodia’s sacred heritage with breathtaking stillness and reverence.',
    author: 'Lord Julian C.',
    stayDate: 'AUGUST 2026',
    sanctuary: 'GREYON Siem Reap Sanctuary',
    accommodation: 'Courtyard Garden Pavilion',
    category: 'Sanctuary Stays',
    rating: 'Distinguished',
  },
  {
    id: 'ref-4',
    quote:
      'Our stay at the sea-facing cliff villa in Krabi was restorative beyond words. The private omakase counter by the sea and the evening hydrotherapy rituals restored a serenity we had not experienced in years.',
    author: 'A. & K. Al-Mansoor',
    stayDate: 'NOVEMBER 2026',
    sanctuary: 'GREYON Krabi Cove',
    accommodation: 'Seafront Cliff Villa',
    category: 'Sanctuary Stays',
    rating: 'Exceptional',
  },
]

/* ─── Experience Categories & Rating Scales ─────────────────── */
const EXPERIENCE_CATEGORIES = [
  'Sanctuary Stay',
  'Branded Residence Ownership',
  'Holistic Wellness & Dining',
  'Private Advisory',
] as const

type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number]

const RATING_DIMENSIONS = [
  {
    id: 'serenity',
    label: 'Architectural Serenity & Pavilion Privacy',
  },
  {
    id: 'service',
    label: 'Intuitive Service & Butler Stewardship',
  },
  {
    id: 'culinary',
    label: 'Culinary Craft & Dining Venues',
  },
  {
    id: 'wellness',
    label: 'Holistic Wellness & Transfer Coordination',
  },
] as const

const RATING_OPTIONS = [
  'Exceptional',
  'Distinguished',
  'Satisfactory',
  'Requires Attention',
] as const

type RatingOption = (typeof RATING_OPTIONS)[number]

export default function FeedbackPage() {
  // Archive filter state
  const [archiveFilter, setArchiveFilter] = useState<ReflectionCategoryFilter>('All')

  // Form State
  const [experienceCategory, setExperienceCategory] = useState<ExperienceCategory>('Sanctuary Stay')
  const [selectedProperty, setSelectedProperty] = useState<string>(HOTEL_SANCTUARIES[0]?.name || 'GREYON Phuket Sanctuary')
  const [stayMonthYear, setStayMonthYear] = useState('October 2026')
  const [suiteOrResidence, setSuiteOrResidence] = useState('')

  // Stewardship Ratings State
  const [ratings, setRatings] = useState<Record<string, RatingOption>>({
    serenity: 'Exceptional',
    service: 'Exceptional',
    culinary: 'Exceptional',
    wellness: 'Exceptional',
  })

  // Narrative & Personal Details State
  const [narrative, setNarrative] = useState('')
  const [notableSteward, setNotableSteward] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [bookingReference, setBookingReference] = useState('')
  const [isConfidential, setIsConfidential] = useState(false)

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceCode: string
    property: string
    category: string
    guest: string
    isPrivate: boolean
  } | null>(null)

  // Filtered Reflections
  const filteredReflections = useMemo(() => {
    if (archiveFilter === 'All') return ARCHIVAL_REFLECTIONS
    return ARCHIVAL_REFLECTIONS.filter((r) => r.category === archiveFilter)
  }, [archiveFilter])

  const handleRatingChange = (dimensionId: string, option: RatingOption) => {
    setRatings((prev) => ({
      ...prev,
      [dimensionId]: option,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const generatedCode = `GRY-REF-2026-${Math.floor(1000 + Math.random() * 9000)}`
      setSubmissionReceipt({
        referenceCode: generatedCode,
        property: selectedProperty,
        category: experienceCategory,
        guest: guestName || 'Esteemed Guest',
        isPrivate: isConfidential,
      })
      setIsSubmitting(false)
    }, 850)
  }

  const handleResetForm = () => {
    setSubmissionReceipt(null)
    setNarrative('')
    setNotableSteward('')
    setGuestName('')
    setGuestEmail('')
    setBookingReference('')
    setIsConfidential(false)
  }

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-[#c4a35a]/20">
      
      {/* ── A. Centered Editorial Header ───────────────────────────── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-12 md:pb-16 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
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
              Guestbook &amp; Private Reflections
            </span>
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-6">
            Sanctuary Reflections &amp; Feedback
          </h1>

          {/* Subtitle */}
          <p className="font-display text-sm sm:text-base text-stone-600 font-light italic leading-relaxed max-w-2xl mx-auto">
            “Every reflection is reviewed personally by our Sanctuary General Managers and Head of
            Architectural Stewardship to refine the quietude of future stays.”
          </p>
        </motion.div>
      </section>

      {/* ── B. 12-Column Split Layout ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column (5 Cols) — Curated Reflections Ledger ──── */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Archive Header & Filter Pills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c4a35a] font-medium">
                  ARCHIVAL IMPRESSIONS
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  {filteredReflections.length} NOTES
                </span>
              </div>

              {/* Filter pills */}
              <div className="flex items-center space-x-2">
                {(['All', 'Sanctuary Stays', 'Residence Owners'] as const).map((filter) => {
                  const isActive = archiveFilter === filter
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setArchiveFilter(filter)}
                      className={`text-[11px] uppercase tracking-wider font-display px-3 py-1.5 border transition-colors cursor-pointer rounded-none ${
                        isActive
                          ? 'border-[#c4a35a] bg-[#c4a35a]/10 text-greyon-ink font-medium'
                          : 'border-stone-300/80 bg-white/60 text-stone-500 hover:border-stone-400'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Reflections List (Hairline Bordered Ledger) */}
            <div className="border-y border-stone-300/60 divide-y divide-stone-300/60">
              <AnimatePresence mode="popLayout">
                {filteredReflections.map((refItem) => (
                  <motion.article
                    key={refItem.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="py-7 space-y-4"
                  >
                    {/* Poetic Quote */}
                    <p className="font-display font-light italic text-base sm:text-lg leading-relaxed text-greyon-ink">
                      &ldquo;{refItem.quote}&rdquo;
                    </p>

                    {/* Metadata & Attribution */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-display">
                        <span className="font-medium text-greyon-ink tracking-wider">
                          {refItem.author}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-[#c4a35a] uppercase">
                          {refItem.rating}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                        <span>{refItem.sanctuary}</span>
                        <span>•</span>
                        <span>{refItem.accommodation}</span>
                        <span>•</span>
                        <span>{refItem.stayDate}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Direct Executive Stewardship Box */}
            <div className="border border-stone-300/60 p-6 sm:p-7 bg-[#f5f2ed]/60 space-y-3 rounded-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a35a] font-medium block">
                DIRECT EXECUTIVE STEWARDSHIP
              </span>
              <h3 className="font-display text-lg font-light text-greyon-ink">
                Confidential Directorate Inquiries
              </h3>
              <p className="font-body text-xs text-stone-600 font-light leading-relaxed">
                For sensitive operational observations, personal commendations of individual stewards, or
                private residence ownership inquiries, correspondence may be addressed directly to:
              </p>
              <div className="pt-2">
                <a
                  href="mailto:stewardship@greyon.com?subject=Confidential%20Sanctuary%20Stewardship%20Correspondence"
                  className="inline-flex items-center gap-2 text-xs font-mono text-greyon-ink hover:text-[#c4a35a] transition-colors border-b border-stone-400 pb-0.5 hover:border-[#c4a35a]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c4a35a]" />
                  <span>stewardship@greyon.com</span>
                </a>
              </div>
            </div>

          </div>

          {/* ── Right Column (7 Cols) — Reflection Dossier Form ────── */}
          <div className="lg:col-span-7">
            <div className="border border-stone-300/60 bg-white/50 p-6 sm:p-10 md:p-12 rounded-none">
              
              <AnimatePresence mode="wait">
                {submissionReceipt ? (
                  /* ── C. Confirmation Receipt State ──────────────── */
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-3 pb-8 border-b border-stone-300/60">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#c4a35a]/20 flex items-center justify-center text-[#c4a35a]">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c4a35a] font-medium block">
                        REFLECTION DOSSIER RECORDED
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink">
                        {submissionReceipt.referenceCode}
                      </h2>
                      <p className="font-display text-xs sm:text-sm text-stone-500 font-light italic max-w-lg mx-auto leading-relaxed">
                        “We thank you, <span className="font-normal text-greyon-ink">{submissionReceipt.guest}</span>.
                        Your reflections on <span className="font-normal text-greyon-ink">{submissionReceipt.property}</span> have
                        been safely received by the Sanctuary Directorate.”
                      </p>
                    </div>

                    {/* Summary of Evaluation */}
                    <div className="p-6 bg-[#f5f2ed] border border-stone-300/60 space-y-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block">
                        RECORDED STEWARDSHIP EVALUATION
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Property</span>
                          <span className="font-medium text-greyon-ink">{submissionReceipt.property}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Experience</span>
                          <span className="font-medium text-greyon-ink">{submissionReceipt.category}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Confidentiality</span>
                          <span className="font-medium text-greyon-ink">
                            {submissionReceipt.isPrivate ? 'Strictly Confidential (Directorate Only)' : 'Archival Guestbook Permitted'}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Overall Rating</span>
                          <span className="font-medium text-[#c4a35a]">{ratings.serenity}</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-body text-xs text-stone-500 font-light leading-relaxed">
                      Every submission contributes to the continuous architectural and hospitality refinement
                      of the House of GREYON. If follow-up correspondence is desired, our concierge desk will
                      connect with you via your registered email.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                      <Link
                        to="/hotels"
                        className="w-full sm:w-auto px-8 py-3.5 bg-greyon-ink text-[#faf8f6] hover:bg-[#c4a35a] hover:text-greyon-ink transition-colors uppercase tracking-[0.2em] text-xs font-display font-medium text-center rounded-none"
                      >
                        Explore Sanctuaries
                      </Link>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-6 py-3.5 border border-stone-300 text-stone-600 hover:text-greyon-ink hover:border-greyon-ink transition-colors uppercase tracking-[0.2em] text-xs font-display font-medium text-center rounded-none cursor-pointer"
                      >
                        Submit Another Note
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Form View ─────────────────────────────────── */
                  <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* ── STEP 01: EXPERIENCE & SANCTUARY ──────────── */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a35a] font-medium">
                          01 // EXPERIENCE &amp; SANCTUARY
                        </span>
                        <span className="h-[1px] flex-1 bg-stone-200" />
                      </div>

                      {/* Experience Category Pills */}
                      <div className="space-y-2">
                        <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                          Experience Category *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {EXPERIENCE_CATEGORIES.map((cat) => {
                            const isSelected = experienceCategory === cat
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setExperienceCategory(cat)}
                                className={`text-left px-4 py-2.5 text-xs font-display tracking-wider border transition-colors cursor-pointer rounded-none ${
                                  isSelected
                                    ? 'border-[#c4a35a] bg-[#c4a35a]/10 text-greyon-ink font-medium'
                                    : 'border-stone-300 bg-white text-stone-600 hover:border-stone-400'
                                }`}
                              >
                                {cat}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Sanctuary Property Select & Stay Month/Year */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                            Sanctuary / Property *
                          </label>
                          <div className="relative">
                            <select
                              value={selectedProperty}
                              onChange={(e) => setSelectedProperty(e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none appearance-none cursor-pointer transition-colors"
                            >
                              {HOTEL_SANCTUARIES.map((h) => (
                                <option key={h.id} value={h.name}>
                                  {h.name}
                                </option>
                              ))}
                              <option value="Corporate & Branded Residences">
                                Corporate &amp; Branded Residences
                              </option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                            Month &amp; Year of Stay / Visit *
                          </label>
                          <input
                            type="text"
                            required
                            value={stayMonthYear}
                            onChange={(e) => setStayMonthYear(e.target.value)}
                            placeholder="e.g. October 2026"
                            className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Suite or Residence Category (Optional) */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                          Pavilion, Villa or Suite Category (Optional)
                        </label>
                        <input
                          type="text"
                          value={suiteOrResidence}
                          onChange={(e) => setSuiteOrResidence(e.target.value)}
                          placeholder="e.g. Ocean Pool Pavilion or 4-Bedroom Estate Villa"
                          className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* ── STEP 02: STEWARDSHIP IMPRESSIONS ─────────── */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a35a] font-medium">
                          02 // STEWARDSHIP IMPRESSIONS
                        </span>
                        <span className="h-[1px] flex-1 bg-stone-200" />
                      </div>

                      <p className="text-xs font-body text-stone-500 font-light">
                        Select the refined evaluation that best describes each dimension of your sanctuary stay:
                      </p>

                      <div className="space-y-5">
                        {RATING_DIMENSIONS.map((dim) => (
                          <div key={dim.id} className="space-y-2 pb-4 border-b border-stone-200/80 last:border-b-0">
                            <span className="text-xs font-display text-greyon-ink block">
                              {dim.label}
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {RATING_OPTIONS.map((option) => {
                                const isSelected = ratings[dim.id] === option
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleRatingChange(dim.id, option)}
                                    className={`py-2 px-2 text-[11px] uppercase tracking-wider font-display text-center border transition-colors cursor-pointer rounded-none ${
                                      isSelected
                                        ? 'border-[#c4a35a] bg-[#c4a35a]/10 text-greyon-ink font-medium'
                                        : 'border-stone-300 bg-white text-stone-500 hover:border-stone-400'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── STEP 03: PERSONAL NARRATIVE & DISCRETION ──── */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#c4a35a] font-medium">
                          03 // PERSONAL NARRATIVE &amp; DISCRETION
                        </span>
                        <span className="h-[1px] flex-1 bg-stone-200" />
                      </div>

                      {/* Textarea */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                          Your Reflection &amp; Observations *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={narrative}
                          onChange={(e) => setNarrative(e.target.value)}
                          placeholder="Reflect on the spatial atmosphere, private dining, or subtle moments of quietude..."
                          className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors resize-none font-light leading-relaxed"
                        />
                      </div>

                      {/* Notable Steward Commendation */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                          Notable Steward or Host to Commend (Optional)
                        </label>
                        <input
                          type="text"
                          value={notableSteward}
                          onChange={(e) => setNotableSteward(e.target.value)}
                          placeholder="e.g. Villa Host Khem, Sommelier Aris, Spa Therapist Lin"
                          className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                        />
                      </div>

                      {/* Guest Identification Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                            Guest Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="e.g. Eleanor Vance"
                            className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="e.g. eleanor@vance-holdings.com"
                            className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Reservation Reference (Optional) */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-display text-stone-500">
                          Reservation Reference (Optional)
                        </label>
                        <input
                          type="text"
                          value={bookingReference}
                          onChange={(e) => setBookingReference(e.target.value)}
                          placeholder="e.g. GRY-2026-8492"
                          className="w-full px-4 py-3 bg-white border border-stone-300 text-xs text-greyon-ink focus:outline-none focus:border-[#c4a35a] rounded-none transition-colors"
                        />
                      </div>

                      {/* Privacy Toggle Checkbox */}
                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isConfidential}
                            onChange={(e) => setIsConfidential(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded-none accent-[#c4a35a] border-stone-300 cursor-pointer"
                          />
                          <span className="text-xs font-body text-stone-600 font-light leading-relaxed">
                            <span className="font-medium text-greyon-ink">Keep this dossier strictly confidential</span>{' '}
                            for Executive Management review only (do not publish in the Guestbook Archive).
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-stone-300/60">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-greyon-ink text-[#faf8f6] hover:bg-[#c4a35a] hover:text-greyon-ink transition-colors uppercase tracking-[0.2em] text-xs font-display font-medium rounded-none cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{isSubmitting ? 'Recording Reflection Dossier...' : 'Submit Reflection Dossier'}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

