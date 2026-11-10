import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ArrowRight,
  Calendar,
  PhoneCall,
} from 'lucide-react'
import {
  HOTEL_SANCTUARIES,
  type HotelSanctuary,
  type AccommodationItem,
} from '@/data/hotels'

const EASE = [0.165, 0.84, 0.44, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

/* ─── Date Utility Functions ─────────────────────────────── */
function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

function getInitialCheckOutDate(): string {
  const outDate = new Date()
  outDate.setDate(outDate.getDate() + 5)
  return outDate.toISOString().split('T')[0]
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day))
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BookingPage() {
  const [searchParams] = useSearchParams()

  const urlHotelSlug = searchParams.get('hotel') || ''
  const urlSuiteName = searchParams.get('suite') || ''
  const urlOffer = searchParams.get('offer') || ''

  // 1. Selected Hotel State
  const initialHotel = useMemo(() => {
    return (
      HOTEL_SANCTUARIES.find((h) => h.slug === urlHotelSlug) ||
      HOTEL_SANCTUARIES[0]
    )
  }, [urlHotelSlug])

  const [selectedHotelSlug, setSelectedHotelSlug] = useState<string>(initialHotel.slug)

  const selectedHotel: HotelSanctuary = useMemo(() => {
    return (
      HOTEL_SANCTUARIES.find((h) => h.slug === selectedHotelSlug) ||
      HOTEL_SANCTUARIES[0]
    )
  }, [selectedHotelSlug])

  // 2. Accommodation Type State ('pavilions' vs 'villas')
  const initialType: 'pavilions' | 'villas' = useMemo(() => {
    if (urlSuiteName) {
      const matchVilla = initialHotel.villas.some(
        (v) => v.name.toLowerCase() === urlSuiteName.toLowerCase()
      )
      if (matchVilla) return 'villas'
    }
    return 'pavilions'
  }, [urlSuiteName, initialHotel])

  const [accommodationType, setAccommodationType] = useState<'pavilions' | 'villas'>(initialType)

  // 3. Suite List & Selected Suite
  const availableSuites: AccommodationItem[] = useMemo(() => {
    return accommodationType === 'pavilions'
      ? selectedHotel.pavilions
      : selectedHotel.villas
  }, [selectedHotel, accommodationType])

  const [selectedSuiteName, setSelectedSuiteName] = useState<string>(() => {
    if (urlSuiteName) {
      const match = availableSuites.find(
        (s) => s.name.toLowerCase() === urlSuiteName.toLowerCase()
      )
      if (match) return match.name
    }
    return availableSuites[0]?.name || ''
  })

  // Synchronize suite when sanctuary or type changes
  useEffect(() => {
    const exists = availableSuites.some((s) => s.name === selectedSuiteName)
    if (!exists && availableSuites.length > 0) {
      setSelectedSuiteName(availableSuites[0].name)
    }
  }, [availableSuites, selectedSuiteName])

  const currentSuite: AccommodationItem | undefined = useMemo(() => {
    return (
      availableSuites.find((s) => s.name === selectedSuiteName) ||
      availableSuites[0]
    )
  }, [availableSuites, selectedSuiteName])

  // 4. Dates & Calculated Nights
  const [checkInDate, setCheckInDate] = useState<string>(getTomorrowDate())
  const [checkOutDate, setCheckOutDate] = useState<string>(getInitialCheckOutDate())

  const calculatedNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1
    const inTime = new Date(checkInDate).getTime()
    const outTime = new Date(checkOutDate).getTime()
    const diff = Math.round((outTime - inTime) / (1000 * 60 * 60 * 24))
    return Math.max(1, diff)
  }, [checkInDate, checkOutDate])

  const handleCheckInChange = (newInDate: string) => {
    setCheckInDate(newInDate)
    if (newInDate >= checkOutDate) {
      const nextDay = new Date(newInDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setCheckOutDate(nextDay.toISOString().split('T')[0])
    }
  }

  // 5. Guest Steppers
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)

  // 6. Offer Code
  const [offerCode, setOfferCode] = useState<string>(urlOffer)

  // 7. Guest Contact Info
  const [guestTitle, setGuestTitle] = useState<'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.'>('Mr.')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  // 8. Arrival Preferences Checkboxes
  const [prefChauffeur, setPrefChauffeur] = useState<boolean>(true)
  const [prefWellness, setPrefWellness] = useState<boolean>(false)
  const [prefDining, setPrefDining] = useState<boolean>(false)
  const [specialNotes, setSpecialNotes] = useState<string>('')

  // 9. Receipt / Confirmation State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [confirmationData, setConfirmationData] = useState<{
    referenceId: string
    hotelName: string
    suiteName: string
    suiteCategory: string
    suiteSize: string
    guestName: string
    email: string
    phone: string
    checkInFormatted: string
    checkOutFormatted: string
    nights: number
    guestsSummary: string
    preferences: string[]
    specialNotes: string
    offerApplied: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const refCode = `GRY-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const preferencesList: string[] = []
    if (prefChauffeur) preferencesList.push('Private Airport Chauffeur Transfer')
    if (prefWellness) preferencesList.push('Holistic Wellness & Spa Consultation')
    if (prefDining) preferencesList.push('Private Dining & Dietary Preparation')

    setConfirmationData({
      referenceId: refCode,
      hotelName: selectedHotel.name,
      suiteName: currentSuite?.name || 'Selected Suite',
      suiteCategory: currentSuite?.category || 'Pavilion',
      suiteSize: currentSuite?.size || '',
      guestName: `${guestTitle} ${fullName}`,
      email,
      phone,
      checkInFormatted: formatDisplayDate(checkInDate),
      checkOutFormatted: formatDisplayDate(checkOutDate),
      nights: calculatedNights,
      guestsSummary: `${adults} ${adults === 1 ? 'Adult' : 'Adults'}${
        children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''
      }`,
      preferences: preferencesList,
      specialNotes,
      offerApplied: offerCode,
    })

    setIsSubmitted(true)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-greyon-gold/20">
      
      {/* ── 1. Centered Editorial Header ───────────────────────────── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-12 sm:pb-16 border-b border-stone-300/60">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
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
                Private Reservations &amp; Concierge
              </span>
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
            </div>

            {/* Display Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-4">
              Reserve Your Sanctuary
            </h1>

            {/* Subtitle */}
            <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed max-w-2xl mx-auto">
              Every stay is personally coordinated by the GREYON Private Desk with complimentary
              airport fast-track and private chauffeur transfers for an unhurried arrival.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Main Content: Form or Confirmation Receipt ──────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-20">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* ── Split 12-Column Reservation Dossier ────────────────── */
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              
              {/* ── LEFT COLUMN (7 Cols): 3-Step Reservation Form ───── */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-14">
                  
                  {/* ── STEP 01 // SELECT SANCTUARY & SUITE ─────────── */}
                  <div className="border-b border-stone-300/60 pb-12 space-y-8">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                        STEP 01 //
                      </span>
                      <h2 className="text-xs uppercase tracking-[0.25em] font-display text-stone-500 font-medium">
                        Select Sanctuary &amp; Suite
                      </h2>
                    </div>

                    {/* Sanctuary Destination Dropdown */}
                    <div>
                      <label
                        htmlFor="sanctuary-select"
                        className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                      >
                        Sanctuary Destination
                      </label>
                      <div className="relative">
                        <select
                          id="sanctuary-select"
                          value={selectedHotelSlug}
                          onChange={(e) => setSelectedHotelSlug(e.target.value)}
                          className="w-full bg-transparent border-b border-stone-300 py-3 pr-8 text-sm sm:text-base font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none cursor-pointer appearance-none transition-colors"
                        >
                          {HOTEL_SANCTUARIES.map((hotel) => (
                            <option
                              key={hotel.slug}
                              value={hotel.slug}
                              className="bg-[#faf8f6] text-greyon-ink py-2"
                            >
                              {hotel.name} — {hotel.location.formatted}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Accommodation Type Switcher */}
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-3">
                        Accommodation Category
                      </span>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setAccommodationType('pavilions')}
                          className={`py-3 px-4 text-xs uppercase tracking-widest font-display transition-all border rounded-none cursor-pointer focus:outline-none ${
                            accommodationType === 'pavilions'
                              ? 'border-[#c4a35a] bg-[#c4a35a]/10 text-greyon-ink font-medium'
                              : 'border-stone-300 bg-transparent text-stone-500 hover:border-stone-400'
                          }`}
                        >
                          Pavilions ({selectedHotel.pavilions.length})
                        </button>

                        <button
                          type="button"
                          onClick={() => setAccommodationType('villas')}
                          className={`py-3 px-4 text-xs uppercase tracking-widest font-display transition-all border rounded-none cursor-pointer focus:outline-none ${
                            accommodationType === 'villas'
                              ? 'border-[#c4a35a] bg-[#c4a35a]/10 text-greyon-ink font-medium'
                              : 'border-stone-300 bg-transparent text-stone-500 hover:border-stone-400'
                          }`}
                        >
                          Private Villas ({selectedHotel.villas.length})
                        </button>
                      </div>
                    </div>

                    {/* Specific Suite Selection */}
                    <div>
                      <label
                        htmlFor="suite-select"
                        className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                      >
                        Specific {accommodationType === 'pavilions' ? 'Pavilion' : 'Villa'}
                      </label>
                      <div className="relative">
                        <select
                          id="suite-select"
                          value={selectedSuiteName}
                          onChange={(e) => setSelectedSuiteName(e.target.value)}
                          className="w-full bg-transparent border-b border-stone-300 py-3 pr-8 text-sm sm:text-base font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none cursor-pointer appearance-none transition-colors"
                        >
                          {availableSuites.map((suite) => (
                            <option
                              key={suite.id}
                              value={suite.name}
                              className="bg-[#faf8f6] text-greyon-ink py-2"
                            >
                              {suite.name} ({suite.size} • {suite.bedrooms})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                      </div>
                    </div>

                  </div>

                  {/* ── STEP 02 // STAY DATES & GUESTS ──────────────── */}
                  <div className="border-b border-stone-300/60 pb-12 space-y-8">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                        STEP 02 //
                      </span>
                      <h2 className="text-xs uppercase tracking-[0.25em] font-display text-stone-500 font-medium">
                        Stay Dates &amp; Guests
                      </h2>
                    </div>

                    {/* Date Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="check-in-date"
                          className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                        >
                          Check-In Date
                        </label>
                        <div className="relative">
                          <input
                            id="check-in-date"
                            type="date"
                            min={getTomorrowDate()}
                            value={checkInDate}
                            onChange={(e) => handleCheckInChange(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none cursor-pointer transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="check-out-date"
                          className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                        >
                          Check-Out Date
                        </label>
                        <div className="relative">
                          <input
                            id="check-out-date"
                            type="date"
                            min={checkInDate}
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none cursor-pointer transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Steppers: Adults & Children */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      {/* Adults */}
                      <div className="flex items-center justify-between p-4 border border-stone-200/80 bg-[#f7f5f2]/40">
                        <div>
                          <span className="block text-xs uppercase tracking-wider font-display text-greyon-ink font-medium">
                            Adults
                          </span>
                          <span className="text-[11px] text-stone-500 font-light">Age 12+</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                            className="w-8 h-8 rounded-none border border-stone-300 bg-white text-greyon-ink hover:border-[#c4a35a] transition-colors flex items-center justify-center font-mono text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-display text-sm font-medium">
                            {adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAdults((prev) => Math.min(8, prev + 1))}
                            className="w-8 h-8 rounded-none border border-stone-300 bg-white text-greyon-ink hover:border-[#c4a35a] transition-colors flex items-center justify-center font-mono text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between p-4 border border-stone-200/80 bg-[#f7f5f2]/40">
                        <div>
                          <span className="block text-xs uppercase tracking-wider font-display text-greyon-ink font-medium">
                            Children
                          </span>
                          <span className="text-[11px] text-stone-500 font-light">Under 12</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-none border border-stone-300 bg-white text-greyon-ink hover:border-[#c4a35a] transition-colors flex items-center justify-center font-mono text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-display text-sm font-medium">
                            {children}
                          </span>
                          <button
                            type="button"
                            onClick={() => setChildren((prev) => Math.min(6, prev + 1))}
                            className="w-8 h-8 rounded-none border border-stone-300 bg-white text-greyon-ink hover:border-[#c4a35a] transition-colors flex items-center justify-center font-mono text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Optional Seasonal Offer Code */}
                    <div>
                      <label
                        htmlFor="offer-code"
                        className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                      >
                        Seasonal Privilege / Invitation Code (Optional)
                      </label>
                      <input
                        id="offer-code"
                        type="text"
                        placeholder="e.g. AMANPURI-IMMERSION-2026"
                        value={offerCode}
                        onChange={(e) => setOfferCode(e.target.value)}
                        className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none transition-colors"
                      />
                    </div>

                  </div>

                  {/* ── STEP 03 // GUEST DETAILS & ARRIVAL ──────────── */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                        STEP 03 //
                      </span>
                      <h2 className="text-xs uppercase tracking-[0.25em] font-display text-stone-500 font-medium">
                        Guest Details &amp; Arrival
                      </h2>
                    </div>

                    {/* Title & Full Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="guest-title"
                          className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                        >
                          Title
                        </label>
                        <select
                          id="guest-title"
                          value={guestTitle}
                          onChange={(e) =>
                            setGuestTitle(e.target.value as 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.')
                          }
                          className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none cursor-pointer"
                        >
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Dr.">Dr.</option>
                        </select>
                      </div>

                      <div className="sm:col-span-9">
                        <label
                          htmlFor="full-name"
                          className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="full-name"
                          type="text"
                          required
                          placeholder="Lord / Lady / First & Last Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="guest-email"
                          className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="guest-email"
                          type="email"
                          required
                          placeholder="dossier@residence.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="guest-phone"
                          className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="guest-phone"
                          type="tel"
                          required
                          placeholder="+66 81 234 5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent border-b border-stone-300 py-3 text-sm font-display text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Complimentary Arrival Preferences (Square Checkboxes) */}
                    <div className="space-y-3 pt-2">
                      <span className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-1">
                        Complimentary Arrival Preferences
                      </span>

                      {/* Chauffeur */}
                      <label className="flex items-start gap-3 p-3.5 border border-stone-200/80 bg-[#f7f5f2]/40 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={prefChauffeur}
                          onChange={(e) => setPrefChauffeur(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded-none border-stone-400 text-greyon-ink focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-greyon-ink block">
                            Private Airport Chauffeur Transfer
                          </span>
                          <span className="text-stone-500 font-light">
                            Complimentary for stays of 3+ consecutive nights. Includes VIP tarmac coordination.
                          </span>
                        </div>
                      </label>

                      {/* Wellness */}
                      <label className="flex items-start gap-3 p-3.5 border border-stone-200/80 bg-[#f7f5f2]/40 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={prefWellness}
                          onChange={(e) => setPrefWellness(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded-none border-stone-400 text-greyon-ink focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-greyon-ink block">
                            Holistic Wellness &amp; Spa Consultation
                          </span>
                          <span className="text-stone-500 font-light">
                            Pre-arrival consultation with resident medical naturopaths and traditional Thai herbalists.
                          </span>
                        </div>
                      </label>

                      {/* Dining */}
                      <label className="flex items-start gap-3 p-3.5 border border-stone-200/80 bg-[#f7f5f2]/40 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={prefDining}
                          onChange={(e) => setPrefDining(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded-none border-stone-400 text-greyon-ink focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-greyon-ink block">
                            Private Dining &amp; Dietary Preparation
                          </span>
                          <span className="text-stone-500 font-light">
                            Advance coordination of personalized in-villa chef menus and bespoke wine cellar pairings.
                          </span>
                        </div>
                      </label>
                    </div>

                    {/* Special Notes / Flight Number */}
                    <div>
                      <label
                        htmlFor="special-notes"
                        className="block text-xs uppercase tracking-wider font-display text-stone-500 mb-2"
                      >
                        Special Notes or Arrival Flight Number
                      </label>
                      <textarea
                        id="special-notes"
                        rows={3}
                        placeholder="Inbound airline flight numbers, dietary requirements, or private anniversary requests..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full bg-transparent border border-stone-300/80 p-3 text-xs font-body text-greyon-ink focus:border-[#c4a35a] outline-none rounded-none transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-5 bg-greyon-ink text-[#faf8f6] hover:bg-[#c4a35a] hover:text-greyon-ink transition-colors uppercase tracking-[0.2em] text-xs font-medium rounded-none cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Request Reservation Confirmation</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-[11px] text-stone-400 font-light text-center mt-3">
                        No immediate payment is charged. The Private Desk will review and confirm suite allocation.
                      </p>
                    </div>

                  </div>

                </form>
              </div>

              {/* ── RIGHT COLUMN (5 Cols): Sticky Live Summary Card ─── */}
              <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                <div className="border border-stone-300/80 p-6 sm:p-8 bg-[#faf8f6]">
                  
                  {/* Hero Photo */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-stone-200 mb-6">
                    <img
                      src={selectedHotel.heroImage}
                      alt={selectedHotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Sanctuary Identification */}
                  <div className="mb-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] font-display text-[#c4a35a] font-medium block mb-1">
                      {selectedHotel.location.formatted}
                    </span>
                    <h3 className="font-display text-2xl font-light text-greyon-ink tracking-tight">
                      {selectedHotel.name}
                    </h3>
                  </div>

                  {/* Selected Suite Block */}
                  <div className="py-4 border-y border-stone-200/80 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-display text-stone-400 block mb-1">
                      Selected Accommodation
                    </span>
                    <div className="font-display text-lg font-normal text-greyon-ink">
                      {currentSuite?.name || 'Selected Suite'}
                    </div>
                    {currentSuite && (
                      <div className="text-xs text-stone-500 font-light mt-1">
                        {currentSuite.size} • {currentSuite.bedrooms} • {currentSuite.view}
                      </div>
                    )}
                  </div>

                  {/* Stay Duration Block */}
                  <div className="pb-5 border-b border-stone-200/80 mb-5 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-display text-stone-400 block">
                      Dates &amp; Party
                    </span>
                    <div className="flex items-center gap-2 text-xs font-display text-greyon-ink">
                      <Calendar className="w-3.5 h-3.5 text-[#c4a35a]" />
                      <span>
                        {formatDisplayDate(checkInDate)} → {formatDisplayDate(checkOutDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-500 font-light pt-1">
                      <span>{calculatedNights} {calculatedNights === 1 ? 'Night' : 'Nights'}</span>
                      <span>
                        {adults} {adults === 1 ? 'Adult' : 'Adults'}
                        {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="pb-5 border-b border-stone-200/80 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-display text-stone-400 block mb-2.5">
                      Included in Every Stay
                    </span>
                    <ul className="space-y-1.5">
                      {selectedHotel.atAGlance.includedInEveryStay.slice(0, 3).map((inc, iIdx) => (
                        <li key={iIdx} className="text-xs text-greyon-muted font-light flex items-start gap-2">
                          <span className="text-[#c4a35a]">—</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Getting There Note */}
                  <div className="pb-5 border-b border-stone-200/80 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-display text-stone-400 block mb-1">
                      Arrival &amp; Transit
                    </span>
                    <p className="text-xs text-greyon-muted font-light leading-relaxed">
                      {selectedHotel.gettingThere.transferDetails}
                    </p>
                  </div>

                  {/* Priority Desk Line */}
                  <div className="text-xs font-mono text-stone-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-[#c4a35a]" />
                      <span>+66 (0) 76 324 333</span>
                    </div>
                    <div>concierge@greyon.com</div>
                  </div>

                </div>
              </aside>

            </motion.div>
          ) : (
            /* ── CONFIRMATION RECEIPT VIEW ──────────────────────────── */
            confirmationData && (
              <motion.div
                key="confirmation-receipt"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="max-w-3xl mx-auto"
              >
                <div className="border border-stone-300/80 p-8 sm:p-12 md:p-16 bg-[#faf8f6]">
                  
                  {/* Status Banner */}
                  <div className="flex items-center justify-between border-b border-stone-300/60 pb-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-none bg-[#c4a35a] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.25em] font-display text-[#c4a35a] font-medium">
                        Request Received
                      </span>
                    </div>
                    <span className="font-mono text-xs text-stone-500 tracking-wider">
                      {confirmationData.referenceId}
                    </span>
                  </div>

                  {/* Title & Introduction */}
                  <h2 className="font-display text-3xl sm:text-4xl font-light text-greyon-ink tracking-tight mb-4">
                    Sanctuary Reservation Requested
                  </h2>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-8">
                    Thank you, <strong className="text-greyon-ink font-medium">{confirmationData.guestName}</strong>.
                    Your private dossier has been logged under priority reference{' '}
                    <span className="font-mono text-greyon-ink font-medium">{confirmationData.referenceId}</span>.
                    A member of the GREYON Private Desk will contact you at{' '}
                    <strong className="text-greyon-ink font-medium">{confirmationData.email}</strong> within 2 hours
                    to confirm suite allocation and coordinate bespoke arrival transfers.
                  </p>

                  {/* Dossier Summary Table */}
                  <div className="border-y border-stone-300/60 py-8 space-y-6 mb-8">
                    
                    {/* Row 1: Sanctuary & Suite */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Sanctuary Destination
                        </span>
                        <span className="font-display text-base text-greyon-ink font-normal">
                          {confirmationData.hotelName}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Reserved Suite
                        </span>
                        <span className="font-display text-base text-greyon-ink font-normal">
                          {confirmationData.suiteName}
                        </span>
                        <span className="text-xs text-stone-500 font-light block">
                          {confirmationData.suiteCategory} • {confirmationData.suiteSize}
                        </span>
                      </div>
                    </div>

                    {/* Row 2: Dates & Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200/60">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Check-In
                        </span>
                        <span className="text-xs sm:text-sm font-display text-greyon-ink">
                          {confirmationData.checkInFormatted}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Check-Out
                        </span>
                        <span className="text-xs sm:text-sm font-display text-greyon-ink">
                          {confirmationData.checkOutFormatted}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Duration &amp; Party
                        </span>
                        <span className="text-xs sm:text-sm font-display text-greyon-ink">
                          {confirmationData.nights} Nights • {confirmationData.guestsSummary}
                        </span>
                      </div>
                    </div>

                    {/* Row 3: Preferences */}
                    {confirmationData.preferences.length > 0 && (
                      <div className="pt-4 border-t border-stone-200/60">
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-2">
                          Confirmed Arrival Inclusions
                        </span>
                        <ul className="space-y-1">
                          {confirmationData.preferences.map((p, idx) => (
                            <li key={idx} className="text-xs text-greyon-muted font-light flex items-center gap-2">
                              <span className="text-[#c4a35a] font-normal">—</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Row 4: Offer Code */}
                    {confirmationData.offerApplied && (
                      <div className="pt-4 border-t border-stone-200/60">
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Seasonal Privilege Code Applied
                        </span>
                        <span className="font-mono text-xs text-[#8f7340]">
                          {confirmationData.offerApplied}
                        </span>
                      </div>
                    )}

                    {/* Row 5: Special Notes */}
                    {confirmationData.specialNotes && (
                      <div className="pt-4 border-t border-stone-200/60">
                        <span className="text-[10px] uppercase tracking-wider font-display text-stone-400 block mb-1">
                          Special Inquiries &amp; Flight Notes
                        </span>
                        <p className="text-xs text-stone-600 font-light leading-relaxed">
                          {confirmationData.specialNotes}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs uppercase tracking-widest font-display text-stone-500 hover:text-greyon-ink transition-colors font-medium border-b border-stone-300 pb-0.5 cursor-pointer"
                    >
                      ← Modify Reservation Request
                    </button>

                    <Link
                      to="/hotels"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-display font-medium px-8 py-3.5 bg-greyon-ink text-white hover:bg-greyon-primary transition-colors rounded-none"
                    >
                      <span>Return to Sanctuaries &amp; Resorts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
