import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Download,
  Eye,
  X,
  Check,
  ArrowRight,
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

/* ─── Property Filter Definitions ─────────────────────────── */
const PROPERTY_FILTERS = [
  'All Properties',
  'Corporate & Residences',
  'Phuket',
  'Bangkok',
  'Siem Reap',
  'Krabi',
] as const

type PropertyFilter = (typeof PROPERTY_FILTERS)[number]

/* ─── Visual Archive Category Definitions ─────────────────── */
const ARCHIVE_CATEGORIES = [
  'All Assets',
  'Architecture & Exteriors',
  'Pavilions & Villas',
  'Dining & Wellness',
] as const

type ArchiveCategory = (typeof ARCHIVE_CATEGORIES)[number]

/* ─── Press Kits & Monograph Data ─────────────────────────── */
interface PressKitItem {
  id: string
  property: PropertyFilter
  categoryEyebrow: string
  title: string
  specLine: string
  highlights: string[]
  image: string
  fileSize: string
  fileType: string
  updatedDate: string
  metadata: {
    format: string
    pages: string
    language: string
    resolution: string
  }
}

const PRESS_KITS: PressKitItem[] = [
  {
    id: 'pk-phuket',
    property: 'Phuket',
    categoryEyebrow: 'PRESS KIT // PHUKET, THAILAND',
    title: 'GREYON Phuket Sanctuary Press Kit',
    specLine: 'PDF Fact Sheet • 18.4 MB • Updated Nov 2026',
    highlights: [
      'Comprehensive Ayutthaya-inspired architectural schematics & masterplan',
      'Holistic Wellness Centre clinical treatments & culinary profiles',
    ],
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    fileSize: '18.4 MB',
    fileType: 'PDF Fact Sheet',
    updatedDate: 'November 2026',
    metadata: {
      format: 'Adobe PDF (Archival Standard)',
      pages: '28 Pages with High-Res Plates',
      language: 'English (US & UK Editions)',
      resolution: 'Vector Typography & 300 DPI Imagery',
    },
  },
  {
    id: 'pk-bangkok',
    property: 'Bangkok',
    categoryEyebrow: 'PRESS KIT // BANGKOK, THAILAND',
    title: 'GREYON Bangkok Sanctuary Press Kit',
    specLine: 'PDF Fact Sheet • 16.2 MB • Updated Nov 2026',
    highlights: [
      'Wireless Road diplomatic quarter site history & rain tree conservation',
      '3-level circadian spa specifications & culinary salon dossier',
    ],
    image:
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85',
    fileSize: '16.2 MB',
    fileType: 'PDF Fact Sheet',
    updatedDate: 'November 2026',
    metadata: {
      format: 'Adobe PDF (Archival Standard)',
      pages: '24 Pages with High-Res Plates',
      language: 'English (US & UK Editions)',
      resolution: 'Vector Typography & 300 DPI Imagery',
    },
  },
  {
    id: 'pk-siemreap',
    property: 'Siem Reap',
    categoryEyebrow: 'PRESS KIT // SIEM REAP, CAMBODIA',
    title: 'GREYON Siem Reap Sanctuary Press Kit',
    specLine: 'PDF Fact Sheet • 19.8 MB • Updated Nov 2026',
    highlights: [
      '1960s New Khmer Architecture restoration & archaeological context',
      'Royal villa estate floorplates & private temple excursion guide',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    fileSize: '19.8 MB',
    fileType: 'PDF Fact Sheet',
    updatedDate: 'November 2026',
    metadata: {
      format: 'Adobe PDF (Archival Standard)',
      pages: '32 Pages with Archival Drawings',
      language: 'English (US & UK Editions)',
      resolution: 'Vector Typography & 300 DPI Imagery',
    },
  },
  {
    id: 'pk-krabi',
    property: 'Krabi',
    categoryEyebrow: 'PRESS KIT // KRABI, THAILAND',
    title: 'GREYON Krabi Cove Press Kit',
    specLine: 'PDF Fact Sheet • 15.6 MB • Updated Nov 2026',
    highlights: [
      'Phang Nga Bay maritime topography & cliffside engineering dossier',
      'Marine conservation reserve charter & sea-cave hydrotherapy',
    ],
    image:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=85',
    fileSize: '15.6 MB',
    fileType: 'PDF Fact Sheet',
    updatedDate: 'November 2026',
    metadata: {
      format: 'Adobe PDF (Archival Standard)',
      pages: '22 Pages with Coastal Maps',
      language: 'English (US & UK Editions)',
      resolution: 'Vector Typography & 300 DPI Imagery',
    },
  },
  {
    id: 'pk-brand-book',
    property: 'Corporate & Residences',
    categoryEyebrow: 'MONOGRAPH // CORPORATE',
    title: 'GREYON Architectural Identity & Brand Book',
    specLine: 'PDF Monograph • 24.5 MB • Logo, Palette & Philosophy',
    highlights: [
      'Brand aesthetic guidelines, typography metrics & color theory',
      'Executive leadership philosophy & sustainable development commitments',
    ],
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    fileSize: '24.5 MB',
    fileType: 'Brand Monograph',
    updatedDate: 'November 2026',
    metadata: {
      format: 'Adobe PDF Monograph',
      pages: '56 Pages Bound Editorial',
      language: 'English & French Editions',
      resolution: 'Full Color Gamut & Master Glyphs',
    },
  },
  {
    id: 'pk-residences',
    property: 'Corporate & Residences',
    categoryEyebrow: 'MONOGRAPH // RESIDENCES',
    title: 'Branded Residences Development Portfolio',
    specLine: 'PDF Monograph • 31.2 MB • Floorplates & Advisory',
    highlights: [
      'Private branded residences specifications, privacy buffers & services',
      'Asset management protocols & private owner privileges dossier',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    fileSize: '31.2 MB',
    fileType: 'Development Monograph',
    updatedDate: 'November 2026',
    metadata: {
      format: 'Adobe PDF Monograph',
      pages: '48 Pages with Cadastral Plans',
      language: 'English (International Standard)',
      resolution: 'Architectural Line Drawings & 300 DPI Renders',
    },
  },
]

/* ─── Visual Archive Image Bank ───────────────────────────── */
interface VisualAsset {
  id: string
  code: string
  title: string
  property: PropertyFilter
  category: ArchiveCategory
  printSpec: string
  image: string
  photographer: string
  aspect: string
  dimensions: string
  colorSpace: string
}

const VISUAL_ASSETS: VisualAsset[] = [
  {
    id: 'asset-1',
    code: 'ID: GRY-HKT-001',
    title: 'Pansea Bay Shoreline & Coconut Grove Elevation',
    property: 'Phuket',
    category: 'Architecture & Exteriors',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '6000 × 3750 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-2',
    code: 'ID: GRY-BKK-002',
    title: 'Century Rain Tree Canopy & Urban Facade Horizon',
    property: 'Bangkok',
    category: 'Architecture & Exteriors',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '5800 × 3625 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-3',
    code: 'ID: GRY-HKT-003',
    title: 'Ocean Pool Pavilion Sunken Terrazzo Sala & Plunge Pool',
    property: 'Phuket',
    category: 'Pavilions & Villas',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '6200 × 3875 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-4',
    code: 'ID: GRY-REP-004',
    title: 'Courtyard Suite Sandstone Reflecting Pool & Frangipani Garden',
    property: 'Siem Reap',
    category: 'Pavilions & Villas',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '5600 × 3500 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-5',
    code: 'ID: GRY-KRB-005',
    title: 'Limestone Karst Seafront Villa Deck & Marine Horizon',
    property: 'Krabi',
    category: 'Pavilions & Villas',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '6100 × 3812 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-6',
    code: 'ID: GRY-HKT-006',
    title: 'Southern Siamese Lotus Pavilion Dinner & Atmospheric Sala',
    property: 'Phuket',
    category: 'Dining & Wellness',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '5400 × 3375 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-7',
    code: 'ID: GRY-BKK-007',
    title: 'Circadian Hydrotherapy Sanctuary & Cedar Banya Chamber',
    property: 'Bangkok',
    category: 'Dining & Wellness',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '5700 × 3562 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-8',
    code: 'ID: GRY-KRB-008',
    title: 'Phang Nga Bay Secluded Cove Sunset & Sea-Karst Silhouette',
    property: 'Krabi',
    category: 'Architecture & Exteriors',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '6000 × 3750 px',
    colorSpace: 'Adobe RGB (1998)',
  },
  {
    id: 'asset-9',
    code: 'ID: GRY-COR-009',
    title: 'Architectural Monograph, Natural Stone & Joinery Craft',
    property: 'Corporate & Residences',
    category: 'Architecture & Exteriors',
    printSpec: '300 DPI • TIFF / RAW Print Ready',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    photographer: 'Archival Collection // Courtesy of GREYON',
    aspect: '16/10',
    dimensions: '5900 × 3688 px',
    colorSpace: 'Adobe RGB (1998)',
  },
]

/* ─── Accolades Data ──────────────────────────────────────── */
interface AccoladeItem {
  year: string
  title: string
  body: string
  sanctuary: string
}

const ACCOLADES: AccoladeItem[] = [
  {
    year: '2026',
    title: 'Best Architectural Hotel Sanctuary in Asia',
    body: 'Prix Versailles World Architecture & Design Awards',
    sanctuary: 'GREYON Phuket Sanctuary',
  },
  {
    year: '2026',
    title: 'World’s Leading Holistic Wellness Retreat',
    body: 'Condé Nast Traveler Readers’ Choice Awards',
    sanctuary: 'GREYON Phuket Sanctuary',
  },
  {
    year: '2025',
    title: 'Best Urban Haven & Metropolitan Architectural Design',
    body: 'Architectural Digest Great Design Honors',
    sanctuary: 'GREYON Bangkok Sanctuary',
  },
  {
    year: '2025',
    title: 'Heritage Conservation & Regional Sustainability Citation',
    body: 'UNESCO Asia-Pacific Cultural Heritage Awards',
    sanctuary: 'GREYON Siem Reap Sanctuary',
  },
  {
    year: '2025',
    title: 'Best Secluded Coastal Hideaway in Southeast Asia',
    body: 'Travel + Leisure World’s Best Awards',
    sanctuary: 'GREYON Krabi Cove',
  },
]

export default function MediaPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyFilter>('All Properties')
  const [selectedArchiveCategory, setSelectedArchiveCategory] = useState<ArchiveCategory>('All Assets')

  // Lightbox / Modal States
  const [activeDossierModal, setActiveDossierModal] = useState<PressKitItem | null>(null)
  const [activeAssetModal, setActiveAssetModal] = useState<VisualAsset | null>(null)

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerDownloadToast = (title: string, type: string) => {
    setToastMessage(`Dossier Download Initiated: ${title} (${type})`)
    setTimeout(() => {
      setToastMessage(null)
    }, 3800)
  }

  // Filtered Press Kits
  const filteredPressKits = useMemo(() => {
    if (selectedProperty === 'All Properties') {
      return PRESS_KITS
    }
    return PRESS_KITS.filter((kit) => kit.property === selectedProperty)
  }, [selectedProperty])

  // Filtered Visual Assets
  const filteredVisualAssets = useMemo(() => {
    let list = VISUAL_ASSETS

    if (selectedProperty !== 'All Properties') {
      list = list.filter((asset) => asset.property === selectedProperty)
    }

    if (selectedArchiveCategory !== 'All Assets') {
      list = list.filter((asset) => asset.category === selectedArchiveCategory)
    }

    return list
  }, [selectedProperty, selectedArchiveCategory])

  return (
    <div className="min-h-screen bg-[#faf8f6] text-greyon-ink selection:bg-greyon-gold/20">
      
      {/* ── 1. Centered Editorial Header & Authorship Protocol ─────── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-14 md:pb-20">
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
                Press Room &amp; Brand Media Hub
              </span>
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
            </div>

            {/* Display Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-greyon-ink tracking-tight leading-[1.15] mb-6">
              Media &amp; Archival Monographs
            </h1>

            {/* Lead Narrative */}
            <p className="font-body text-sm sm:text-base text-greyon-muted font-light leading-relaxed max-w-2xl mx-auto">
              Providing journalists, architectural editors, and media partners with official property
              fact sheets, brand monographs, and high-resolution visual assets. Dedicated to documenting
              the evolution of GREYON’s contemporary luxury sanctuaries and residential developments.
            </p>

            {/* Authorship & Usage Protocol Strip */}
            <div className="border-y border-stone-300/60 py-6 max-w-4xl mx-auto mt-10 text-center px-4">
              <p className="font-display text-xs sm:text-sm text-stone-500 font-light italic leading-relaxed">
                “When quoting directly or publishing archival photography from GREYON, please credit
                <span className="text-greyon-ink font-normal not-italic"> &lsquo;Courtesy of GREYON Sanctuaries &amp; Residences&rsquo;</span>.
                Commercial or on-property filming requires prior written clearance from the PR Desk.”
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Sticky Property Filter Bar ──────────────────────────── */}
      <section className="sticky top-20 z-30 bg-[#faf8f6]/95 backdrop-blur-md border-y border-stone-300/60 py-3.5 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Property Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            {PROPERTY_FILTERS.map((property) => {
              const isActive = selectedProperty === property
              return (
                <button
                  key={property}
                  type="button"
                  onClick={() => setSelectedProperty(property)}
                  className="relative pb-2 pt-1 text-xs sm:text-sm tracking-wider uppercase font-display whitespace-nowrap transition-colors cursor-pointer focus:outline-none"
                >
                  <span
                    className={
                      isActive
                        ? 'text-greyon-ink font-medium'
                        : 'text-greyon-muted/75 hover:text-greyon-ink'
                    }
                  >
                    {property}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="mediaPropertyFilter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a35a]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Live Dossier Count */}
          <div className="text-[11px] sm:text-xs tracking-widest uppercase font-display text-greyon-muted self-end sm:self-center shrink-0">
            {filteredPressKits.length < 10
              ? `0${filteredPressKits.length}`
              : filteredPressKits.length}{' '}
            {filteredPressKits.length === 1 ? 'Dossier Available' : 'Dossiers Available'}
          </div>

        </div>
      </section>

      {/* ── 3. Property Press Kits & Brand Monographs ──────────────── */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
              <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
                Press Kits &amp; Fact Sheets
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight">
              Sanctuary &amp; Corporate Dossiers
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-greyon-muted font-light max-w-md leading-relaxed">
            Curated architectural schematics, property fact sheets, operational specifications, and culinary overviews ready for editorial distribution.
          </p>
        </div>

        {/* 2- or 3-Column Dossier Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          <AnimatePresence mode="popLayout">
            {filteredPressKits.map((kit) => (
              <motion.article
                key={kit.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group flex flex-col bg-[#faf8f6]"
              >
                {/* Photo with subtle hover scale */}
                <div
                  onClick={() => setActiveDossierModal(kit)}
                  className="relative aspect-[16/10.5] w-full overflow-hidden rounded-none bg-stone-200 cursor-pointer"
                >
                  <img
                    src={kit.image}
                    alt={kit.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Subtle Badge */}
                  <div className="absolute top-3 left-3 bg-[#faf8f6]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-widest uppercase font-display text-greyon-ink">
                    {kit.fileType}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-6 flex flex-col flex-1">
                  
                  {/* Eyebrow */}
                  <span className="text-[11px] tracking-[0.25em] uppercase text-greyon-gold-deep font-display font-medium block mb-1">
                    {kit.categoryEyebrow}
                  </span>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveDossierModal(kit)}
                    className="font-display text-2xl font-light text-greyon-ink tracking-tight group-hover:text-greyon-primary transition-colors cursor-pointer"
                  >
                    {kit.title}
                  </h3>

                  {/* File Spec Line */}
                  <div className="text-xs uppercase tracking-wider font-display text-stone-500 py-2.5 border-y border-stone-200/80 my-3">
                    {kit.specLine}
                  </div>

                  {/* Highlight Bullets with #c4a35a Em-Dashes */}
                  <ul className="space-y-1.5 mb-6">
                    {kit.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-greyon-muted font-light flex items-start gap-2 leading-relaxed">
                        <span className="text-[#c4a35a] font-normal shrink-0">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Triggers */}
                  <div className="pt-4 mt-auto flex items-center justify-between border-t border-stone-200/60">
                    <button
                      type="button"
                      onClick={() => setActiveDossierModal(kit)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-display text-greyon-ink hover:text-[#c4a35a] transition-colors font-medium border-b border-stone-300 pb-0.5 cursor-pointer focus:outline-none"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Dossier</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerDownloadToast(kit.title, kit.fileType)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Fact Sheet ↓</span>
                    </button>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* ── 4. High-Res Archival Photography Bank ──────────────────── */}
      <section className="py-20 md:py-28 border-t border-stone-300/60 bg-[#f7f5f2]/70">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1px] bg-[#c4a35a]" />
                <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
                  Visual Archive
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight">
                High-Resolution Image Bank
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-none py-1">
              {ARCHIVE_CATEGORIES.map((category) => {
                const isCatActive = selectedArchiveCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedArchiveCategory(category)}
                    className={`text-xs uppercase tracking-widest font-display px-3 py-1.5 border transition-all cursor-pointer focus:outline-none ${
                      isCatActive
                        ? 'border-greyon-ink bg-greyon-ink text-white'
                        : 'border-stone-300/80 bg-transparent text-stone-600 hover:border-greyon-ink'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3-Column Image Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredVisualAssets.map((asset) => (
                <motion.article
                  key={asset.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="group flex flex-col bg-[#faf8f6] p-4 border border-stone-200/80"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => setActiveAssetModal(asset)}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-stone-200 cursor-pointer"
                  >
                    <img
                      src={asset.image}
                      alt={asset.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Below Image Meta */}
                  <div className="pt-4 flex flex-col flex-1">
                    {/* Archival Code */}
                    <span className="text-[11px] font-mono tracking-wider text-[#c4a35a] font-medium block">
                      {asset.code}
                    </span>

                    {/* Title / Caption */}
                    <h3
                      onClick={() => setActiveAssetModal(asset)}
                      className="font-display text-base font-normal text-greyon-ink tracking-tight mt-1 mb-2 group-hover:text-greyon-primary transition-colors cursor-pointer"
                    >
                      {asset.title}
                    </h3>

                    {/* Print Spec */}
                    <div className="text-[11px] uppercase tracking-wider font-display text-stone-400 mt-auto pt-2 border-t border-stone-200/60">
                      {asset.printSpec}
                    </div>

                    {/* Twin Triggers */}
                    <div className="pt-3 mt-2 flex items-center justify-between border-t border-stone-200/40">
                      <button
                        type="button"
                        onClick={() => setActiveAssetModal(asset)}
                        className="text-xs uppercase tracking-widest font-display text-greyon-ink hover:text-[#c4a35a] transition-colors font-medium cursor-pointer"
                      >
                        View Lightbox
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerDownloadToast(asset.title, '300 DPI TIFF')}
                        className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download High-Res ↓</span>
                      </button>
                    </div>

                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ── 5. Accolades & Global Recognition Ledger ───────────────── */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#c4a35a]" />
            <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
              Accolades // 2025 – 2026
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight">
            International Honors &amp; Recognition
          </h2>
          <p className="font-body text-xs sm:text-sm text-greyon-muted font-light mt-3 leading-relaxed">
            A permanent record of global citations across hospitality architecture, restorative wellness, and environmental stewardship.
          </p>
        </div>

        {/* Clean Hairline Table */}
        <div className="divide-y divide-stone-300/60 border-y border-stone-300/60">
          {ACCOLADES.map((accolade, idx) => (
            <div
              key={idx}
              className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline group hover:bg-[#f7f5f2]/40 transition-colors px-2"
            >
              {/* Year */}
              <div className="sm:col-span-2 text-xs font-mono tracking-widest uppercase text-stone-400">
                {accolade.year}
              </div>

              {/* Award Title */}
              <div className="sm:col-span-5 font-display text-base sm:text-lg font-light text-greyon-ink tracking-tight">
                {accolade.title}
              </div>

              {/* Issuing Body */}
              <div className="sm:col-span-3 text-xs uppercase tracking-wider font-display text-stone-500">
                {accolade.body}
              </div>

              {/* Sanctuary */}
              <div className="sm:col-span-2 text-xs uppercase tracking-widest font-display text-greyon-gold-deep text-left sm:text-right font-medium">
                {accolade.sanctuary}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── 6. Global PR Contacts & Location Shoot Request Desk ────── */}
      <section className="py-20 md:py-28 border-t border-stone-300/60 bg-[#f7f5f2]/50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#c4a35a]" />
              <span className="text-xs uppercase tracking-[0.3em] font-display text-greyon-gold-deep font-medium">
                Press Inquiries &amp; Permissions
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-greyon-ink tracking-tight">
              Global Media Desks
            </h2>
          </div>

          {/* 3-Column Hairline Dossier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-10 border-y border-stone-300/60">
            
            {/* Bureau 1 */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c4a35a] block mb-2">
                BUREAU // APAC
              </span>
              <h3 className="text-xs uppercase tracking-[0.25em] text-greyon-ink font-display font-medium mb-3">
                Asia-Pacific PR Desk
              </h3>
              <p className="font-body text-xs sm:text-sm text-greyon-muted font-light leading-relaxed mb-4">
                Bangkok &amp; Singapore Bureaus. Direct editorial liaison for regional dispatches, interviews, and property openings.
              </p>
              <a
                href="mailto:ap-press@greyon.com"
                className="inline-flex items-center gap-2 text-xs font-mono text-greyon-ink hover:text-[#c4a35a] transition-colors border-b border-stone-300 pb-0.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#c4a35a]" />
                <span>ap-press@greyon.com</span>
              </a>
            </div>

            {/* Bureau 2 */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c4a35a] block mb-2">
                BUREAU // EMEA &amp; AMERICAS
              </span>
              <h3 className="text-xs uppercase tracking-[0.25em] text-greyon-ink font-display font-medium mb-3">
                Global &amp; European Desk
              </h3>
              <p className="font-body text-xs sm:text-sm text-greyon-muted font-light leading-relaxed mb-4">
                London &amp; Zurich Bureaus. Architectural syndication, international monographs, and international press junkets.
              </p>
              <a
                href="mailto:global-pr@greyon.com"
                className="inline-flex items-center gap-2 text-xs font-mono text-greyon-ink hover:text-[#c4a35a] transition-colors border-b border-stone-300 pb-0.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#c4a35a]" />
                <span>global-pr@greyon.com</span>
              </a>
            </div>

            {/* Bureau 3: Filming */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c4a35a] block mb-2">
                PRODUCTION // PERMITS
              </span>
              <h3 className="text-xs uppercase tracking-[0.25em] text-greyon-ink font-display font-medium mb-3">
                Filming &amp; Photo Shoots
              </h3>
              <p className="font-body text-xs sm:text-sm text-greyon-muted font-light leading-relaxed mb-4">
                Commercial and editorial productions require 14 days advance written clearance. Drone operations subject to local aviation laws.
              </p>
              <Link
                to="/contact?subject=media-shoot"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-display text-greyon-gold-deep hover:text-greyon-ink transition-colors font-medium group/permit"
              >
                <span>Request Shoot Permit</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/permit:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ── 7. Dossier Preview Lightbox Modal ───────────────────────── */}
      <AnimatePresence>
        {activeDossierModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setActiveDossierModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#faf8f6] text-greyon-ink border border-stone-300/80 rounded-none p-6 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveDossierModal(null)}
                className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 border border-stone-300/80 bg-[#faf8f6]/80 backdrop-blur-sm rounded-none transition-colors cursor-pointer"
                aria-label="Close dossier preview"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Preview */}
              <div className="aspect-[16/9] w-full overflow-hidden rounded-none bg-stone-200 mb-6">
                <img
                  src={activeDossierModal.image}
                  alt={activeDossierModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Eyebrow & Title */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-[1px] bg-[#c4a35a]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-display text-greyon-gold-deep font-medium">
                  {activeDossierModal.categoryEyebrow}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-3">
                {activeDossierModal.title}
              </h3>

              {/* Specs */}
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider font-display text-stone-500 py-3 border-y border-stone-200/80 my-4">
                <span>{activeDossierModal.fileType}</span>
                <span>•</span>
                <span>{activeDossierModal.fileSize}</span>
                <span>•</span>
                <span>{activeDossierModal.updatedDate}</span>
              </div>

              {/* Metadata Dossier */}
              <div className="mb-6">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-display text-stone-500 font-medium mb-3">
                  Document Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 font-light">
                  <div>
                    <span className="font-medium text-greyon-ink">Format: </span>
                    {activeDossierModal.metadata.format}
                  </div>
                  <div>
                    <span className="font-medium text-greyon-ink">Pagination: </span>
                    {activeDossierModal.metadata.pages}
                  </div>
                  <div>
                    <span className="font-medium text-greyon-ink">Language: </span>
                    {activeDossierModal.metadata.language}
                  </div>
                  <div>
                    <span className="font-medium text-greyon-ink">Resolution: </span>
                    {activeDossierModal.metadata.resolution}
                  </div>
                </div>
              </div>

              {/* Editorial Highlights */}
              <div className="mb-8">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-display text-stone-500 font-medium mb-3">
                  Key Document Contents
                </h4>
                <ul className="space-y-2">
                  {activeDossierModal.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs text-greyon-muted font-light flex items-start gap-2">
                      <span className="text-[#c4a35a]">—</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandatory Credit */}
              <div className="p-4 bg-[#f7f5f2] border border-stone-200/80 mb-6 text-xs text-stone-500 font-light italic">
                Mandatory Media Credit: &ldquo;Courtesy of GREYON Sanctuaries &amp; Residences. Official Media Monograph.&rdquo;
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveDossierModal(null)}
                  className="text-xs uppercase tracking-widest font-display text-stone-500 hover:text-greyon-ink transition-colors font-medium order-2 sm:order-1 cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerDownloadToast(activeDossierModal.title, activeDossierModal.fileType)
                    setActiveDossierModal(null)
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-display font-medium px-8 py-3.5 bg-greyon-primary text-white hover:bg-greyon-primary-hover transition-colors rounded-none order-1 sm:order-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Complete Dossier ({activeDossierModal.fileSize})</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 8. Visual Asset Lightbox Modal ─────────────────────────── */}
      <AnimatePresence>
        {activeAssetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setActiveAssetModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#faf8f6] text-greyon-ink border border-stone-300/80 rounded-none p-6 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveAssetModal(null)}
                className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 border border-stone-300/80 bg-[#faf8f6]/80 backdrop-blur-sm rounded-none transition-colors cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Full Image */}
              <div className="aspect-[16/10] w-full overflow-hidden rounded-none bg-stone-200 mb-6">
                <img
                  src={activeAssetModal.image}
                  alt={activeAssetModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Archival Code & Title */}
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-[#c4a35a] font-medium">
                  {activeAssetModal.code}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs uppercase tracking-widest font-display text-stone-500">
                  {activeAssetModal.property} // {activeAssetModal.category}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink tracking-tight mb-4">
                {activeAssetModal.title}
              </h3>

              {/* Technical Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3.5 border-y border-stone-200/80 my-4 text-xs font-display uppercase tracking-wider text-stone-500">
                <div>
                  <span className="block text-[10px] text-stone-400">Dimensions</span>
                  <span className="text-greyon-ink font-mono">{activeAssetModal.dimensions}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400">Resolution</span>
                  <span className="text-greyon-ink font-mono">300 DPI Raw Ready</span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400">Color Profile</span>
                  <span className="text-greyon-ink font-mono">{activeAssetModal.colorSpace}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400">Format</span>
                  <span className="text-greyon-ink font-mono">TIFF / JPEG Pro</span>
                </div>
              </div>

              {/* Usage Credit Note */}
              <div className="p-4 bg-[#f7f5f2] border border-stone-200/80 mb-6 text-xs text-stone-600 font-light leading-relaxed">
                <span className="font-medium uppercase tracking-wider font-display block text-greyon-ink mb-1">
                  Editorial Usage Clearance
                </span>
                Courtesy of GREYON Sanctuaries &amp; Residences. Mandatory credit for all print and digital editorial publications. Non-exclusive editorial license granted to accredited journalists.
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveAssetModal(null)}
                  className="text-xs uppercase tracking-widest font-display text-stone-500 hover:text-greyon-ink transition-colors font-medium order-2 sm:order-1 cursor-pointer"
                >
                  Close Lightbox
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerDownloadToast(activeAssetModal.title, '300 DPI Master TIFF')
                    setActiveAssetModal(null)
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-display font-medium px-8 py-3.5 bg-greyon-ink text-white hover:bg-greyon-primary transition-colors rounded-none order-1 sm:order-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res Master Asset (300 DPI)</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 9. Toast Notification ──────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-6 right-6 z-50 bg-greyon-ink text-white px-5 py-4 border border-white/20 shadow-none flex items-center gap-3 max-w-md rounded-none"
          >
            <div className="w-5 h-5 rounded-none bg-[#c4a35a] text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="text-xs font-display tracking-wide font-light leading-relaxed">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
