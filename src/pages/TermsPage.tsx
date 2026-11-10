import { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { Printer, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.165, 0.84, 0.44, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

interface IndexSection {
  id: string
  num: string
  label: string
}

const SECTIONS: IndexSection[] = [
  { id: 'terms-of-use', num: '01', label: 'Terms of Use & Intellectual Property' },
  { id: 'reservations', num: '02', label: 'Sanctuary Reservations & Cancellation' },
  { id: 'privacy',      num: '03', label: 'Privacy Policy & Guest Discretion' },
  { id: 'cookies',      num: '04', label: 'Cookie & Digital Governance' },
]

export default function TermsPage() {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [activeSection, setActiveSection] = useState<string>('terms-of-use')
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(false)
  const [cookieSavedMessage, setCookieSavedMessage] = useState<string | null>(null)

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      const navOffset = 130
      const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // Handle URL query parameters (?section=privacy) or hash (#privacy)
  useEffect(() => {
    const param = searchParams.get('section')
    const hash = location.hash.replace('#', '')
    const target = param || hash

    if (target) {
      let targetId = target
      if (target === 'terms') targetId = 'terms-of-use'
      if (target === 'sanctuary') targetId = 'reservations'

      const matching = SECTIONS.find((s) => s.id === targetId)
      if (matching) {
        setTimeout(() => {
          scrollToSection(targetId)
        }, 180)
      }
    }
  }, [searchParams, location.hash])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleToggleAnalytics = () => {
    const nextState = !analyticsEnabled
    setAnalyticsEnabled(nextState)
    setCookieSavedMessage(
      nextState
        ? 'Telemetry preference updated: Anonymous analytical telemetry enabled.'
        : 'Telemetry preference updated: Minimal essential session cookies only.'
    )
    setTimeout(() => {
      setCookieSavedMessage(null)
    }, 3800)
  }

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-greyon-gold/20">
      
      {/* ── 1. Centered Legal Header ───────────────────────────────── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-14 md:pb-16 border-b border-stone-300/60">
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
                Legal Governance &amp; Guest Protocols
              </span>
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
            </div>

            {/* Display Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-4">
              Terms, Conditions &amp; Policies
            </h1>

            {/* Metadata Strip */}
            <div className="text-xs uppercase tracking-wider font-display text-stone-500 mb-6">
              Effective Date: November 2026 • Document Rev 4.2
            </div>

            {/* Introductory Narrative */}
            <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed max-w-2xl mx-auto">
              This legal monograph governs guest access, sanctuary reservations, private residence
              disclosures, and digital data stewardship across all destinations under GREYON
              Sanctuaries &amp; Residences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. 12-Column Split Legal Monograph Layout ───────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column: Sticky Document Index (4 Cols) ─────────── */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start bg-[#faf8f6]">
            
            <div className="border border-stone-300/80 p-6 sm:p-8 bg-[#f7f5f2]/60">
              
              <span className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-6 font-display font-medium block">
                Document Index
              </span>

              {/* Navigation List */}
              <nav aria-label="Legal sections index" className="space-y-2 border-l border-stone-300/80">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        'block w-full text-left py-2.5 pl-4 -ml-[1px] text-xs uppercase tracking-wider font-display transition-all cursor-pointer focus:outline-none',
                        isActive
                          ? 'border-l-2 border-[#c4a35a] text-greyon-ink font-medium bg-[#c4a35a]/5'
                          : 'border-l-2 border-transparent text-stone-500 hover:text-greyon-ink'
                      )}
                    >
                      <span className="font-mono text-[10px] text-[#c4a35a] mr-2">
                        {section.num} //
                      </span>
                      <span>{section.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Utility Section */}
              <div className="border-t border-stone-300/60 pt-6 mt-8 space-y-6">
                
                {/* Print Trigger */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="rounded-none border border-stone-300 px-4 py-3 text-xs uppercase tracking-[0.18em] font-display text-greyon-ink hover:border-[#c4a35a] hover:text-[#c4a35a] transition-colors w-full text-left flex items-center justify-between group cursor-pointer bg-[#faf8f6]"
                >
                  <span>Print / Save Legal PDF</span>
                  <Printer className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#c4a35a] transition-colors" />
                </button>

                {/* Legal Desk Direct Contacts */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-400 block mb-2">
                    Legal &amp; Data Protection Desk
                  </span>
                  <div className="space-y-1.5 text-xs font-mono text-stone-600">
                    <a
                      href="mailto:legal@greyon.com"
                      className="block hover:text-[#c4a35a] transition-colors"
                    >
                      legal@greyon.com
                    </a>
                    <a
                      href="mailto:privacy@greyon.com"
                      className="block hover:text-[#c4a35a] transition-colors"
                    >
                      privacy@greyon.com
                    </a>
                  </div>

                  <Link
                    to="/contact?subject=legal-inquiry"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium mt-4 group/desk"
                  >
                    <span>Contact Legal Desk</span>
                    <ArrowRight className="w-3 h-3 group-hover/desk:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>

            </div>

          </aside>

          {/* ── Right Column: Structured Editorial Clauses (8 Cols) ─── */}
          <main className="lg:col-span-8 space-y-16 lg:space-y-20">
            
            {/* ── SECTION 01: TERMS OF USE ─────────────────────────── */}
            <article id="terms-of-use" className="border-b border-stone-300/60 pb-16">
              
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                  SECTION 01 //
                </span>
                <span className="text-xs uppercase tracking-[0.25em] font-display text-stone-400 font-medium">
                  General Governance
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-8">
                Terms of Use &amp; Intellectual Property
              </h2>

              <div className="space-y-10">
                
                {/* 1.1 Architectural Renderings */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    1.1 Architectural Renderings &amp; Development Specifications
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    All digital visualizations, floorplates, square-meter dimensions, structural spans,
                    and architectural monographs displayed on this platform relating to GREYON Branded
                    Residences and real estate developments are indicative representations conceived for
                    conceptual illustration. They remain subject to final architectural certification,
                    cadastral survey verification, and governmental master-plan approvals.
                  </p>
                  <ul className="space-y-2 bg-[#f7f5f2]/50 p-4 border border-stone-200/80">
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Indicative Metrics: </strong>
                        All ceiling clearances, terrace areas, and structural finishes are approximate
                        and subject to minor construction adjustments within acceptable tolerances.
                      </span>
                    </li>
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Statutory Precedence: </strong>
                        The formal Deed of Sale, Master Lease Agreement, and statutory disclosure
                        documentation signed by purchaser and developer exclusively govern all contractual obligations.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 1.2 Copyright & Archival Monographs */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    1.2 Copyright &amp; Archival Monographs
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    All archival photography, video cinematography, architectural line plates, press
                    monographs available on the media desk, typographic glyphs, and custom brand marks are the
                    exclusive intellectual property of GREYON Sanctuaries &amp; Residences and its licensors.
                  </p>
                  <ul className="space-y-2 bg-[#f7f5f2]/50 p-4 border border-stone-200/80">
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Mandatory Media Citation: </strong>
                        Editorial use requires the clear, uncropped attribution:
                        <em> &ldquo;Courtesy of GREYON Sanctuaries &amp; Residences&rdquo;</em>.
                      </span>
                    </li>
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Commercial Exploitation Prohibited: </strong>
                        Automated data harvesting, model training, reverse-engineering, or commercial reproduction
                        without prior written deed of license is strictly prohibited.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 1.3 Governing Law */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    1.3 Governing Law &amp; Jurisdiction
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed">
                    These terms and any non-contractual obligations arising from digital engagement are
                    governed by and construed in accordance with applicable international hospitality
                    and commercial arbitration standards. Parties submit to the confidential jurisdiction
                    of recognized commercial dispute resolution bodies.
                  </p>
                </div>

              </div>

            </article>

            {/* ── SECTION 02: RESERVATIONS & CANCELLATION ──────────── */}
            <article id="reservations" className="border-b border-stone-300/60 pb-16">
              
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                  SECTION 02 //
                </span>
                <span className="text-xs uppercase tracking-[0.25em] font-display text-stone-400 font-medium">
                  Hospitality Protocols
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-8">
                Sanctuary Reservations &amp; Cancellation Policy
              </h2>

              <div className="space-y-10">
                
                {/* 2.1 Arrival, Departure & Transfers */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    2.1 Arrival, Departure &amp; Transfers
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    To preserve our meticulous arrival ritual and ensure complete pavilion preparation,
                    standard check-in begins at <strong>15:00</strong> local sanctuary time; check-out
                    is requested by <strong>12:00 noon</strong>. Extended departures or early arrivals
                    are accommodated based on availability and must be arranged with the Private Desk.
                  </p>
                  <ul className="space-y-2 bg-[#f7f5f2]/50 p-4 border border-stone-200/80">
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Complimentary Private Transfers: </strong>
                        Applicable to stays of 3 consecutive nights or more across Phuket, Bangkok,
                        Siem Reap, and Krabi destinations. Executive vehicle or luxury maritime catamaran.
                      </span>
                    </li>
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Aviation Manifest Submissions: </strong>
                        Flight coordination must be submitted at least 48 hours prior to arrival to guarantee
                        tarmac concierge services.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 2.2 Deposit & Seasonal Cancellation */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    2.2 Deposit &amp; Seasonal Cancellation Windows
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    A 50% deposit is required at time of reservation confirmation, with the remainder
                    settled upon check-in. Our seasonal cancellation schedule is calibrated as follows:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                    <div className="p-4 bg-[#f7f5f2] border border-stone-200/80">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#c4a35a] block mb-1">
                        Standard Season
                      </span>
                      <strong className="font-display text-sm text-greyon-ink block mb-1">
                        14-Day Notice
                      </strong>
                      <p className="text-stone-600 leading-relaxed">
                        Cancellations received 14 or more days prior to scheduled arrival receive full deposit refund minus bank administration fee.
                      </p>
                    </div>

                    <div className="p-4 bg-[#f7f5f2] border border-stone-200/80">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#c4a35a] block mb-1">
                        Peak &amp; Festive Season (Dec 20 – Jan 10)
                      </span>
                      <strong className="font-display text-sm text-greyon-ink block mb-1">
                        30-Day Notice
                      </strong>
                      <p className="text-stone-600 leading-relaxed">
                        Cancellations received within 30 days of arrival forfeit the complete 50% reservation deposit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2.3 Sanctuary Quietude & Drone Prohibition */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    2.3 Sanctuary Quietude, Children &amp; Drone Prohibition
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    In deference to architectural serenity and absolute guest seclusion:
                  </p>
                  <ul className="space-y-2 bg-[#f7f5f2]/50 p-4 border border-stone-200/80">
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Unmanned Aerial Systems (Drones): </strong>
                        The operation of recreational drones is strictly prohibited across all GREYON estate airspace
                        to protect privacy and local avian wildlife.
                      </span>
                    </li>
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Circadian Acoustic Quietude: </strong>
                        Shared pavilions and courtyard gardens observe acoustic quietude between 22:00 and 07:00.
                      </span>
                    </li>
                    <li className="text-xs text-stone-600 font-light flex items-start gap-2.5">
                      <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                      <span>
                        <strong className="font-medium text-greyon-ink">Junior Guests: </strong>
                        Certain secluded cliff and pool pavilions are curated exclusively for adult reflection;
                        multi-bedroom private villas warmly welcome multi-generational families.
                      </span>
                    </li>
                  </ul>
                </div>

              </div>

            </article>

            {/* ── SECTION 03: PRIVACY & GUEST DISCRETION ───────────── */}
            <article id="privacy" className="border-b border-stone-300/60 pb-16">
              
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                  SECTION 03 //
                </span>
                <span className="text-xs uppercase tracking-[0.25em] font-display text-stone-400 font-medium">
                  Data Stewardship
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-8">
                Privacy Policy &amp; Guest Discretion
              </h2>

              <div className="space-y-10">
                
                {/* 3.1 Private Dossier Confidentiality */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    3.1 Private Dossier Confidentiality
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    Guest personal profiles, dietary nuances, private wellness assessments, payment records,
                    and residential real estate holdings are encrypted using bank-grade AES-256 standards.
                    This data is safeguarded exclusively within private sanctuary infrastructure and is
                    never commoditized, rented, or syndicated to third-party advertising brokers.
                  </p>
                  <div className="flex items-center gap-3 p-3 bg-[#f7f5f2] border border-stone-200/80 text-xs text-stone-600 font-light">
                    <ShieldCheck className="w-4 h-4 text-[#c4a35a] shrink-0" />
                    <span>
                      Zero Commercial Data Brokering. Information is accessible solely to authorized Private Desk stewards and dedicated in-villa staff.
                    </span>
                  </div>
                </div>

                {/* 3.2 Statutory Check-In Compliance */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    3.2 Statutory Check-In &amp; Identity Compliance
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed">
                    National immigration and regional hospitality authorities mandate passport presentation
                    and registration upon physical check-in. This statutory documentation is handled with
                    discreet protocol and transmitted securely according to official civic guidelines.
                  </p>
                </div>

                {/* 3.3 Data Subject Rights & Erasure */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    3.3 Data Subject Rights &amp; Erasure
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    In compliance with international data privacy regulations (including GDPR and regional
                    statutes), every guest maintains the following inalienable rights:
                  </p>
                  <ul className="space-y-2 bg-[#f7f5f2]/50 p-4 border border-stone-200/80 text-xs text-stone-600 font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a35a]">—</span>
                      <span>The right to inspect and receive an unencrypted digital export of their personal dossier.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a35a]">—</span>
                      <span>The right to request immediate and complete cryptographic erasure of historical records.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c4a35a]">—</span>
                      <span>Direct point of contact for data inquiries: <a href="mailto:privacy@greyon.com" className="text-greyon-ink font-mono underline hover:text-[#c4a35a]">privacy@greyon.com</a>.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </article>

            {/* ── SECTION 04: COOKIE & DIGITAL GOVERNANCE ──────────── */}
            <article id="cookies" className="pb-12">
              
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#c4a35a] font-medium tracking-widest">
                  SECTION 04 //
                </span>
                <span className="text-xs uppercase tracking-[0.25em] font-display text-stone-400 font-medium">
                  Digital Stewardship
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-8">
                Cookie &amp; Digital Governance
              </h2>

              <div className="space-y-10">
                
                {/* 4.1 Essential Reservation Session Data */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    4.1 Essential Reservation Session Data
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed">
                    Our digital interface uses minimal, strictly necessary technical session cookies to
                    maintain suite selection context, selected language indicators, and cryptographic CSRF tokens.
                    These cookies do not track users across external web properties and expire upon browser closure.
                  </p>
                </div>

                {/* 4.2 Analytics & Telemetry Controls */}
                <div>
                  <h3 className="font-display text-lg font-normal text-greyon-ink mb-3">
                    4.2 Analytics &amp; Telemetry Controls
                  </h3>
                  <p className="font-body text-sm text-greyon-muted font-light leading-relaxed mb-6">
                    We aggregate anonymous technical metrics (such as page rendering latency and asset download
                    speeds) solely to tune global content distribution performance across international networks.
                  </p>

                  {/* Interactive Telemetry Box */}
                  <div className="p-6 bg-[#f7f5f2] border border-stone-300/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-display text-sm font-medium text-greyon-ink block">
                          Performance Telemetry Consent
                        </span>
                        <span className="text-xs text-stone-500 font-light block mt-0.5">
                          Currently set to: {analyticsEnabled ? 'Anonymous Telemetry Active' : 'Essential Only (Default)'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleToggleAnalytics}
                        className={cn(
                          'px-5 py-2.5 text-xs uppercase tracking-widest font-display transition-colors rounded-none cursor-pointer focus:outline-none shrink-0',
                          analyticsEnabled
                            ? 'bg-greyon-primary text-white hover:bg-greyon-primary-hover'
                            : 'border border-stone-300 text-stone-600 hover:border-greyon-ink hover:text-greyon-ink bg-white'
                        )}
                      >
                        {analyticsEnabled ? 'Disable Telemetry' : 'Enable Telemetry'}
                      </button>
                    </div>

                    {cookieSavedMessage && (
                      <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center gap-2 text-xs font-mono text-[#8f7340]">
                        <Check className="w-3.5 h-3.5" />
                        <span>{cookieSavedMessage}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </article>

          </main>

        </div>
      </div>

    </div>
  )
}
