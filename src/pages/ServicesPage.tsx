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
  // index: string
  tabName: string
  title: string
  subtitle: string
  intro: string
  bullets: string[]
  footnote: string
  image: string
}

const PROPERTY_CARE_SLIDES: CareService[] = [
  {
    // index: '01',
    tabName: '01 / Home Check-Up',
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
    // index: '02',
    tabName: '02 / Healthy Home Event',
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

  // Staggered architectural draw-in sequence: ground datum → podium → guest tower floors → rooftop → details & annotations
  const pathLengthDatum = useTransform(scrollYProgress, [0, 0.2], [0.15, 1])
  const pathLengthGround = useTransform(scrollYProgress, [0.05, 0.28], [0, 1])
  const pathLengthPodium = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
  const pathLengthTower = useTransform(scrollYProgress, [0.35, 0.72], [0, 1])
  const pathLengthRooftop = useTransform(scrollYProgress, [0.55, 0.88], [0, 1])
  const pathLengthDetails = useTransform(scrollYProgress, [0.65, 0.95], [0, 1])
  const annotationOpacity = useTransform(scrollYProgress, [0.25, 0.8], [0.1, 0.95])

  // Subtle vertical parallax for the elevation blueprint
  const buildingY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // Vertical scroll transformation for right-column narrative blocks
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

        {/* Editorial Split Header Block (Clean borderless transition) */}
        <div className="absolute inset-x-0 bottom-0 z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
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

      {/* ── 2. Dedicated Brokerage Section Header ───────────────── */}
      <section className="bg-greyon-dark text-greyon-sand py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold mb-4 block">
            Lifecycle Stewardship
          </span>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <h2 className="md:col-span-7 font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.15]">
              Comprehensive Ownership &amp; Brokerage Lifecycle
            </h2>
            <p className="md:col-span-5 font-body text-sm sm:text-base text-greyon-sand/80 font-light leading-relaxed">
              From acquisition to ongoing stewardship, our dedicated advisory desk orchestrates every phase with discretion, precision, and enduring architectural care.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Sticky Scroll BROKERAGE Showcase Section (300vh) ──── */}
      <section ref={brokerageRef} className="relative h-[300vh] bg-greyon-dark text-greyon-sand">
        <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Bespoke Luxury Resort-Hotel Architectural Blueprint */}
          <div className="absolute inset-0 md:relative md:inset-auto w-full md:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 z-10 pointer-events-none opacity-25 md:opacity-100">
            <motion.div
              style={{ y: buildingY }}
              className="w-full max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] h-[85vh] md:h-[90vh] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 600 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_18px_rgba(196,163,90,0.12)]"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* ── 1. DATUM & GRID LAYER ─────────────────────────── */}
                <g id="datum">
                  {/* Ground Datum Lines (GREYON Champagne Gold) */}
                  <motion.line
                    x1="30"
                    y1="820"
                    x2="570"
                    y2="820"
                    stroke="#c4a35a"
                    strokeWidth="1.2"
                    style={{ pathLength: pathLengthDatum }}
                  />
                  <motion.line
                    x1="50"
                    y1="828"
                    x2="550"
                    y2="828"
                    stroke="#c4a35a"
                    strokeWidth="0.7"
                    strokeOpacity="0.4"
                    style={{ pathLength: pathLengthDatum }}
                  />

                  {/* Foundation Hatching */}
                  <motion.path
                    d="
                      M 40 828 L 30 838 M 70 828 L 60 838 M 100 828 L 90 838
                      M 130 828 L 120 838 M 160 828 L 150 838 M 190 828 L 180 838
                      M 220 828 L 210 838 M 250 828 L 240 838 M 280 828 L 270 838
                      M 310 828 L 300 838 M 340 828 L 330 838 M 370 828 L 360 838
                      M 400 828 L 390 838 M 430 828 L 420 838 M 460 828 L 450 838
                      M 490 828 L 480 838 M 520 828 L 510 838 M 550 828 L 540 838
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.7"
                    strokeOpacity="0.3"
                    style={{ pathLength: pathLengthDatum }}
                  />

                  {/* Vertical Elevation Axis */}
                  <motion.line
                    x1="535"
                    y1="835"
                    x2="535"
                    y2="90"
                    stroke="#c4a35a"
                    strokeWidth="0.9"
                    strokeOpacity="0.5"
                    strokeDasharray="4 4"
                    style={{ pathLength: pathLengthDatum }}
                  />

                  {/* Level Datum Ticks */}
                  <motion.path
                    d="
                      M 528 820 H 542
                      M 528 740 H 542
                      M 528 670 H 542
                      M 528 600 H 542
                      M 528 420 H 542
                      M 528 240 H 542
                      M 528 180 H 542
                      M 528 110 H 542
                    "
                    stroke="#c4a35a"
                    strokeWidth="1.2"
                    style={{ pathLength: pathLengthDatum }}
                  />

                  {/* Elevation Indicator Arrows */}
                  <motion.path
                    d="
                      M 528 820 L 522 817 V 823 Z
                      M 528 740 L 522 737 V 743 Z
                      M 528 670 L 522 667 V 673 Z
                      M 528 600 L 522 597 V 603 Z
                      M 528 420 L 522 417 V 423 Z
                      M 528 240 L 522 237 V 243 Z
                      M 528 180 L 522 177 V 183 Z
                      M 528 110 L 522 107 V 113 Z
                    "
                    fill="#c4a35a"
                    fillOpacity="0.75"
                    stroke="#c4a35a"
                    strokeWidth="0.5"
                    style={{ pathLength: pathLengthDatum }}
                  />

                  {/* Vertical Structural Grid Lines */}
                  <motion.path
                    d="
                      M 100 820 V 535
                      M 240 820 V 220
                      M 360 820 V 60
                      M 480 820 V 160
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.6"
                    strokeDasharray="5 4"
                    strokeOpacity="0.3"
                    style={{ pathLength: pathLengthDatum }}
                  />

                  {/* Grid Axis Head Bubbles */}
                  <motion.circle cx="100" cy="855" r="9" stroke="#c4a35a" strokeWidth="0.8" style={{ pathLength: pathLengthDatum }} />
                  <motion.circle cx="240" cy="855" r="9" stroke="#c4a35a" strokeWidth="0.8" style={{ pathLength: pathLengthDatum }} />
                  <motion.circle cx="360" cy="855" r="9" stroke="#c4a35a" strokeWidth="0.8" style={{ pathLength: pathLengthDatum }} />
                  <motion.circle cx="480" cy="855" r="9" stroke="#c4a35a" strokeWidth="0.8" style={{ pathLength: pathLengthDatum }} />

                  {/* Grid Crosshair Markers */}
                  <motion.path
                    d="
                      M 352 60 H 368 M 360 52 V 68
                      M 94 535 H 106 M 100 529 V 541
                      M 474 180 H 486 M 480 174 V 186
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.8"
                    style={{ pathLength: pathLengthDatum }}
                  />
                </g>

                {/* ── 2. STRUCTURE LAYER ────────────────────────────── */}
                <g id="structure">
                  {/* Ground Arrival & Double-Height Lobby */}
                  <motion.path
                    d="M 220 820 V 740 H 480 V 820"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeOpacity="0.75"
                    style={{ pathLength: pathLengthGround }}
                  />

                  {/* Lobby Floor-to-Ceiling Glazed Mullions */}
                  <motion.path
                    d="
                      M 240 740 V 820
                      M 260 740 V 820
                      M 280 740 V 820
                      M 300 740 V 820
                      M 320 740 V 820
                      M 340 740 V 820
                      M 360 740 V 820
                      M 380 740 V 820
                      M 400 740 V 820
                      M 420 740 V 820
                      M 440 740 V 820
                      M 460 740 V 820
                    "
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthGround }}
                  />

                  {/* Mid-Height Lobby Transom Band */}
                  <motion.line
                    x1="220"
                    y1="780"
                    x2="480"
                    y2="780"
                    stroke="white"
                    strokeWidth="0.6"
                    strokeOpacity="0.25"
                    style={{ pathLength: pathLengthGround }}
                  />

                  {/* Wide Cantilevered Porte-Cochère Canopy Slab */}
                  <motion.path
                    d="M 185 768 H 385 V 773 H 185 Z"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeOpacity="0.9"
                    style={{ pathLength: pathLengthGround }}
                  />

                  {/* Slender Canopy Support Columns */}
                  <motion.path
                    d="
                      M 198 773 V 820
                      M 203 773 V 820
                      M 372 773 V 820
                      M 377 773 V 820
                    "
                    stroke="white"
                    strokeWidth="0.9"
                    strokeOpacity="0.75"
                    style={{ pathLength: pathLengthGround }}
                  />

                  {/* Revolving Door & Entrance Marker */}
                  <motion.path
                    d="M 334 820 A 15 15 0 0 1 364 820"
                    stroke="#c4a35a"
                    strokeWidth="1.2"
                    style={{ pathLength: pathLengthGround }}
                  />
                  <motion.line
                    x1="349"
                    y1="820"
                    x2="349"
                    y2="805"
                    stroke="#c4a35a"
                    strokeWidth="1.2"
                    style={{ pathLength: pathLengthGround }}
                  />
                  <motion.line
                    x1="328"
                    y1="820"
                    x2="370"
                    y2="820"
                    stroke="#c4a35a"
                    strokeWidth="1.5"
                    style={{ pathLength: pathLengthGround }}
                  />

                  {/* ── Podium Levels 1 & 2 ─────────────────────────── */}
                  <motion.line
                    x1="160"
                    y1="740"
                    x2="505"
                    y2="740"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeOpacity="0.85"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.line
                    x1="160"
                    y1="670"
                    x2="500"
                    y2="670"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeOpacity="0.85"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.line
                    x1="175"
                    y1="600"
                    x2="495"
                    y2="600"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeOpacity="0.9"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* Level 1 Glazed Colonnade Columns */}
                  <motion.path
                    d="
                      M 180 740 V 670
                      M 210 740 V 670
                      M 240 740 V 670
                      M 270 740 V 670
                      M 300 740 V 670
                      M 330 740 V 670
                      M 360 740 V 670
                      M 390 740 V 670
                      M 420 740 V 670
                      M 450 740 V 670
                      M 480 740 V 670
                      M 500 740 V 670
                    "
                    stroke="white"
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.line
                    x1="220"
                    y1="705"
                    x2="480"
                    y2="705"
                    stroke="white"
                    strokeWidth="0.6"
                    strokeOpacity="0.25"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* Level 1 West Terrace & Planter Line */}
                  <motion.path
                    d="M 160 726 H 220 V 740"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.65"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.path
                    d="
                      M 164 726 Q 169 716 174 726
                      M 174 726 Q 179 714 184 726
                      M 184 726 Q 189 715 194 726
                      M 194 726 Q 199 713 204 726
                      M 204 726 Q 209 715 214 726
                      M 214 726 Q 218 716 220 726
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* Level 2 Ballroom & Spa Structural Bays */}
                  <motion.path
                    d="
                      M 180 670 V 600
                      M 240 670 V 600
                      M 300 670 V 600
                      M 360 670 V 600
                      M 420 670 V 600
                      M 480 670 V 600
                    "
                    stroke="white"
                    strokeWidth="1.2"
                    strokeOpacity="0.75"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.path
                    d="
                      M 200 670 V 600
                      M 220 670 V 600
                      M 260 670 V 600
                      M 280 670 V 600
                      M 320 670 V 600
                      M 340 670 V 600
                      M 380 670 V 600
                      M 400 670 V 600
                      M 440 670 V 600
                      M 460 670 V 600
                    "
                    stroke="white"
                    strokeWidth="0.6"
                    strokeOpacity="0.3"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* East Terrace Overhang & Balustrade */}
                  <motion.line
                    x1="480"
                    y1="592"
                    x2="495"
                    y2="592"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeOpacity="0.45"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.line
                    x1="495"
                    y1="592"
                    x2="495"
                    y2="600"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeOpacity="0.45"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* ── 4-Storey Stepped Resort Villa Wing ──────────── */}
                  <motion.path
                    d="
                      M 75 820 V 745 H 160
                      M 85 745 V 680 H 160
                      M 100 680 V 615 H 175
                      M 120 615 V 555 H 180
                    "
                    stroke="white"
                    strokeWidth="1.1"
                    strokeOpacity="0.75"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* Villa Stepped Terraces Balustrades */}
                  <motion.line x1="75" y1="738" x2="85" y2="738" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" style={{ pathLength: pathLengthPodium }} />
                  <motion.line x1="85" y1="673" x2="100" y2="673" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" style={{ pathLength: pathLengthPodium }} />
                  <motion.line x1="100" y1="608" x2="120" y2="608" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" style={{ pathLength: pathLengthPodium }} />

                  {/* Villa Roof Pergola */}
                  <motion.path
                    d="
                      M 115 545 H 175
                      M 120 545 V 555
                      M 138 545 V 555
                      M 156 545 V 555
                      M 175 545 V 555
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.8"
                    strokeOpacity="0.65"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* Villa Windows & Louvers */}
                  <motion.path
                    d="
                      M 95 780 H 145 M 95 795 H 145
                      M 105 710 H 150 M 105 725 H 150
                      M 120 645 H 165 M 120 660 H 165
                      M 135 580 H 175 M 135 595 H 175
                    "
                    stroke="white"
                    strokeWidth="0.6"
                    strokeOpacity="0.3"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* Resort Landscaping & Palm Tree Line */}
                  <motion.path
                    d="
                      M 45 820 C 40 785 55 765 60 740
                      M 68 820 C 72 790 65 770 70 750
                    "
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.path
                    d="
                      M 60 740 C 42 730 30 738 24 748
                      M 60 740 C 48 722 62 714 74 717
                      M 60 740 C 75 725 86 732 94 742
                      M 70 750 C 56 742 46 748 40 758
                      M 70 750 C 78 738 88 742 96 752
                    "
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.4"
                    style={{ pathLength: pathLengthPodium }}
                  />
                  <motion.path
                    d="M 28 820 Q 42 812 56 820 M 56 820 Q 70 813 84 820"
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.3"
                    style={{ pathLength: pathLengthPodium }}
                  />

                  {/* ── Guest Tower (Levels 3 - 10) ────────────────── */}
                  {/* Outer Tower Structural Slabs & Core */}
                  <motion.path
                    d="
                      M 240 600 V 240
                      M 480 600 V 240
                      M 360 600 V 240
                    "
                    stroke="white"
                    strokeWidth="1.3"
                    strokeOpacity="0.75"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* Repeating Floor Slabs (Levels 3 through 10) */}
                  <motion.path
                    d="
                      M 240 600 H 480
                      M 240 555 H 480
                      M 240 510 H 480
                      M 240 465 H 480
                      M 240 420 H 480
                      M 240 375 H 480
                      M 240 330 H 480
                      M 240 285 H 480
                      M 235 240 H 485
                    "
                    stroke="white"
                    strokeWidth="1.4"
                    strokeOpacity="0.8"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* Facade Rhythm: Staggered Projecting Balconies */}
                  {/* Even Floors: Flanking Balconies (Levels 4, 6, 8, 10) */}
                  <motion.path
                    d="
                      M 226 555 H 335
                      M 226 465 H 335
                      M 226 375 H 335
                      M 226 285 H 335
                      M 385 555 H 494
                      M 385 465 H 494
                      M 385 375 H 494
                      M 385 285 H 494
                    "
                    stroke="white"
                    strokeWidth="1.4"
                    strokeOpacity="0.85"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* Even Floors Balcony Railings & Edge Returns */}
                  <motion.path
                    d="
                      M 226 548 H 335 M 226 555 V 548
                      M 226 458 H 335 M 226 465 V 458
                      M 226 368 H 335 M 226 375 V 368
                      M 226 278 H 335 M 226 285 V 278
                      M 385 548 H 494 M 494 555 V 548
                      M 385 458 H 494 M 494 465 V 458
                      M 385 368 H 494 M 494 375 V 368
                      M 385 278 H 494 M 494 285 V 278
                    "
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* Odd Floors: Expansive Central Balconies (Levels 3, 5, 7, 9) */}
                  <motion.path
                    d="
                      M 285 600 H 435
                      M 285 510 H 435
                      M 285 420 H 435
                      M 285 330 H 435
                    "
                    stroke="white"
                    strokeWidth="1.4"
                    strokeOpacity="0.85"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* Odd Floors Central Balcony Railings & Returns */}
                  <motion.path
                    d="
                      M 285 593 H 435 M 285 600 V 593 M 435 600 V 593
                      M 285 503 H 435 M 285 510 V 503 M 435 510 V 503
                      M 285 413 H 435 M 285 420 V 413 M 435 420 V 413
                      M 285 323 H 435 M 285 330 V 323 M 435 330 V 323
                    "
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* Window Subdivisions & Mullions Grid */}
                  <motion.path
                    d="
                      M 265 600 V 240
                      M 290 600 V 240
                      M 315 600 V 240
                      M 340 600 V 240
                      M 380 600 V 240
                      M 405 600 V 240
                      M 430 600 V 240
                      M 455 600 V 240
                    "
                    stroke="white"
                    strokeWidth="0.6"
                    strokeOpacity="0.25"
                    style={{ pathLength: pathLengthTower }}
                  />

                  {/* ── Sky Level, Penthouse & Rooftop Deck ────────── */}
                  {/* Level 11: Recessed Penthouse Suite Envelope */}
                  <motion.path
                    d="
                      M 260 240 V 180
                      M 460 240 V 180
                    "
                    stroke="white"
                    strokeWidth="1.3"
                    strokeOpacity="0.8"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Penthouse Wrap-around Flanking Terraces & Balustrades */}
                  <motion.path
                    d="
                      M 235 233 H 260 V 240
                      M 460 240 V 233 H 485
                    "
                    stroke="#c4a35a"
                    strokeWidth="1"
                    strokeOpacity="0.7"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Penthouse Full-Height Panoramic Mullions */}
                  <motion.path
                    d="
                      M 285 240 V 180
                      M 310 240 V 180
                      M 335 240 V 180
                      M 360 240 V 180
                      M 385 240 V 180
                      M 410 240 V 180
                      M 435 240 V 180
                    "
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Penthouse Roof Slab */}
                  <motion.line
                    x1="248"
                    y1="180"
                    x2="472"
                    y2="180"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeOpacity="0.9"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Cantilevered Glass Infinity Pool Outline */}
                  <motion.path
                    d="M 405 180 H 486 V 166 H 405"
                    stroke="#c4a35a"
                    strokeWidth="1.3"
                    style={{ pathLength: pathLengthRooftop }}
                  />
                  <motion.line
                    x1="486"
                    y1="166"
                    x2="486"
                    y2="180"
                    stroke="#c4a35a"
                    strokeWidth="1.6"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Infinity Pool Water Ripple Lines */}
                  <motion.path
                    d="
                      M 412 171 H 480
                      M 418 175 H 478
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.8"
                    strokeOpacity="0.65"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Central Sky-Bar Pavilion Structure */}
                  <motion.path
                    d="
                      M 320 180 V 132
                      M 390 180 V 130
                      M 310 132 L 400 126
                    "
                    stroke="white"
                    strokeWidth="1.3"
                    strokeOpacity="0.85"
                    style={{ pathLength: pathLengthRooftop }}
                  />
                  <motion.path
                    d="
                      M 338 180 V 130
                      M 356 180 V 129
                      M 374 180 V 128
                      M 330 162 H 380
                    "
                    stroke="white"
                    strokeWidth="0.6"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Shaded Pergola Frame & Slat Lines */}
                  <motion.path
                    d="
                      M 255 180 V 140 H 312 V 180
                      M 252 140 H 315
                    "
                    stroke="white"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                    style={{ pathLength: pathLengthRooftop }}
                  />
                  {/* 11 Vertical Pergola Louver Slats */}
                  <motion.path
                    d="
                      M 258 138 V 150
                      M 263 138 V 150
                      M 268 138 V 150
                      M 273 138 V 150
                      M 278 138 V 150
                      M 283 138 V 150
                      M 288 138 V 150
                      M 293 138 V 150
                      M 298 138 V 150
                      M 303 138 V 150
                      M 308 138 V 150
                    "
                    stroke="white"
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Rooftop Mechanical Louver Screen */}
                  <motion.path
                    d="
                      M 342 128 V 105 H 370 V 127
                      M 344 110 H 368
                      M 344 115 H 368
                      M 344 120 H 368
                    "
                    stroke="white"
                    strokeWidth="0.7"
                    strokeOpacity="0.4"
                    style={{ pathLength: pathLengthRooftop }}
                  />

                  {/* Spire Antenna & Beacon Crosshair */}
                  <motion.line
                    x1="356"
                    y1="105"
                    x2="356"
                    y2="65"
                    stroke="#c4a35a"
                    strokeWidth="1.3"
                    style={{ pathLength: pathLengthRooftop }}
                  />
                  <motion.path
                    d="
                      M 351 65 H 361
                      M 356 60 V 70
                    "
                    stroke="#c4a35a"
                    strokeWidth="0.9"
                    style={{ pathLength: pathLengthRooftop }}
                  />
                </g>

                {/* ── 3. DETAILS LAYER ──────────────────────────────── */}
                <g id="details">
                  {/* Subtle Balcony Shadow Underlines */}
                  <motion.path
                    d="
                      M 226 557 H 335 M 385 557 H 494
                      M 226 467 H 335 M 385 467 H 494
                      M 226 377 H 335 M 385 377 H 494
                      M 226 287 H 335 M 385 287 H 494
                      M 285 602 H 435 M 285 512 H 435
                      M 285 422 H 435 M 285 332 H 435
                    "
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.18"
                    style={{ pathLength: pathLengthDetails }}
                  />
                </g>

                {/* ── 4. ANNOTATIONS LAYER ─────────────────────────── */}
                <motion.g
                  id="annotations"
                  style={{ opacity: annotationOpacity }}
                  className="select-none pointer-events-none"
                >
                  {/* Elevation Axis Labels (Right Datum) */}
                  <text x="548" y="113" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+70.00</text>
                  <text x="548" y="183" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+62.00</text>
                  <text x="548" y="243" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+54.00</text>
                  <text x="548" y="423" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+36.00</text>
                  <text x="548" y="603" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+21.60</text>
                  <text x="548" y="673" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+14.40</text>
                  <text x="548" y="743" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">+7.20</text>
                  <text x="548" y="823" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">±0.00</text>

                  {/* Grid Axis Column Identifiers */}
                  <text x="100" y="858" fill="#c4a35a" fillOpacity="0.9" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">A</text>
                  <text x="240" y="858" fill="#c4a35a" fillOpacity="0.9" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">B</text>
                  <text x="360" y="858" fill="#c4a35a" fillOpacity="0.9" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">C</text>
                  <text x="480" y="858" fill="#c4a35a" fillOpacity="0.9" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">D</text>

                  {/* Programmatic Blueprint Labels */}
                  <text x="415" y="156" fill="#c4a35a" fillOpacity="0.85" fontSize="7" letterSpacing="0.18em" textAnchor="start">
                    INFINITY POOL
                  </text>
                  <line x1="440" y1="159" x2="440" y2="166" stroke="#c4a35a" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.6" />

                  <text x="355" y="120" fill="#c4a35a" fillOpacity="0.85" fontSize="7" letterSpacing="0.18em" textAnchor="middle">
                    SKY BAR
                  </text>

                  <text x="282" y="132" fill="#c4a35a" fillOpacity="0.85" fontSize="7" letterSpacing="0.18em" textAnchor="middle">
                    PERGOLA
                  </text>

                  <text x="360" y="210" fill="#c4a35a" fillOpacity="0.85" fontSize="7.5" letterSpacing="0.18em" textAnchor="middle">
                    PENTHOUSE SUITES
                  </text>

                  <text x="360" y="380" fill="#c4a35a" fillOpacity="0.8" fontSize="7" letterSpacing="0.2em" textAnchor="middle">
                    GUEST RESIDENCES · L03-L10
                  </text>

                  <text x="360" y="635" fill="#c4a35a" fillOpacity="0.8" fontSize="7" letterSpacing="0.18em" textAnchor="middle">
                    BALLROOM &amp; SPA
                  </text>

                  <text x="360" y="705" fill="#c4a35a" fillOpacity="0.8" fontSize="7" letterSpacing="0.18em" textAnchor="middle">
                    RESTAURANT COLONNADE
                  </text>

                  <text x="310" y="795" fill="#c4a35a" fillOpacity="0.8" fontSize="7" letterSpacing="0.18em" textAnchor="middle">
                    PORTE-COCHÈRE &amp; LOBBY
                  </text>

                  <text x="135" y="585" fill="#c4a35a" fillOpacity="0.8" fontSize="7" letterSpacing="0.18em" textAnchor="middle">
                    VILLA WING
                  </text>
                </motion.g>
              </svg>
            </motion.div>
          </div>

          {/* Right Column: Narrative Steps (Clean Monograph Detailing without vertical border lines) */}
          <div className="w-full md:w-1/2 h-full relative z-10 overflow-hidden flex flex-col px-6 md:px-12 lg:px-20">
            <motion.div style={{ y: contentY }} className="flex flex-col">
              
              {/* Block 1 */}
              <div className="min-h-screen flex flex-col justify-center max-w-lg my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  PROTOCOL 01 // SUBSIDIARY
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
              <div className="min-h-screen flex flex-col justify-center max-w-lg my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  PROTOCOL 02 // LEASING
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
              <div className="min-h-screen flex flex-col justify-center max-w-lg my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  PROTOCOL 03 // BROKERAGE
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
              <div className="min-h-screen flex flex-col justify-center max-w-lg my-auto">
                <span className="font-display text-xs tracking-[0.25em] text-greyon-gold uppercase block mb-3">
                  PROTOCOL 04 // STEWARDSHIP
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

          {/* Bottom Right: Clean Borderless Architectural Chips */}
          <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 flex flex-wrap items-center justify-end gap-2 pointer-events-auto">
            {['Rental', 'Cleaning', 'Laundry', 'Decoration', 'Resales'].map((tag) => (
              <span
                key={tag}
                className="rounded-none bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-display tracking-widest uppercase text-white/90 hover:bg-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROPERTY CARE (Editorial Monograph Section) ──────── */}
      <section className="bg-greyon-cream py-28 md:py-36 text-greyon-ink">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Header & Minimalist Text Tab Switcher (No Box Borders) */}
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep">
                Stewardship Protocols
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-light tracking-tight text-greyon-ink">
                Architectural Home Care
              </h2>
            </div>

            {/* Minimalist Editorial Tabs (layoutId underline in champagne gold) */}
            <div className="flex items-center space-x-8">
              {PROPERTY_CARE_SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx
                return (
                  <button
                    key={slide.tabName}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className="relative pb-3 text-left focus:outline-none cursor-pointer"
                  >
                    <span
                      className={`font-display text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? 'text-greyon-ink font-medium' : 'text-greyon-muted/70 hover:text-greyon-ink'
                      }`}
                    >
                      {slide.tabName}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="serviceTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a35a]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Full-Bleed Architectural Banner (Clean, borderless photographic canvas) */}
          <div className="mb-16 md:mb-24 relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden rounded-none bg-greyon-sand">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85"
              alt="GREYON Architectural Stewardship & Habitat Assurance"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Exhibition Content Grid (2-Part Inspection Showcase) */}
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

                  <div className="pt-4 space-y-4 mb-6">
                    {PROPERTY_CARE_SLIDES[activeSlide].bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-greyon-gold-deep font-light select-none mr-3">—</span>
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

            {/* Right: Sharp Borderless Architectural Photography Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-greyon-sand">
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
                  {/* <span className="font-display text-[11px] tracking-[0.2em] uppercase text-white/90 bg-greyon-dark/70 px-3 py-1">
                    Phase {PROPERTY_CARE_SLIDES[activeSlide].index}
                  </span> */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
