import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Award,
} from 'lucide-react'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

const SERVICES = [
  {
    id: 'architecture',
    icon: Compass,
    title: 'Bespoke Architecture & Master Planning',
    subtitle: 'Contextual, site-responsive design that rejects repetition.',
    description:
      'We orchestrate every phase of architectural development from raw land appraisal to master planning. Every blueprint is an original thesis, balancing natural microclimates, acoustic tranquility, and bold monumental form.',
    deliverables: [
      'Site feasibility & solar-wind microclimate modeling',
      'Structural engineering with post-tension spans',
      'Biophilic green facade integration & organic louvers',
      'High-performance acoustic & thermal insulation',
    ],
  },
  {
    id: 'interior-curation',
    icon: Sparkles,
    title: 'Interior Curation & Space Making',
    subtitle: 'Where tactile luxury meets functional harmony.',
    description:
      'Interior architecture at The Creators HQ begins with how human movement flows through space. We collaborate directly with Italian and German ateliers to customize every surface, cabinet, and luminaire.',
    deliverables: [
      'Custom millwork & imported Italian natural marble',
      'Integrated Sub-Zero, Wolf, and Miele gourmet appliances',
      'Subterranean climate-controlled wine cellar curation',
      'Atmospheric low-glare architectural lighting scenes',
    ],
  },
  {
    id: 'private-advisory',
    icon: ShieldCheck,
    title: 'Private Client & Investment Advisory',
    subtitle: 'Confidential asset allocation and multi-generational security.',
    description:
      'Our dedicated advisory practice provides high-net-worth families, family offices, and foreign investors with discrete access to off-market allotments, portfolio diversification, and strategic yield management.',
    deliverables: [
      'Priority pre-launch show villa previews & allocations',
      'Cross-border ownership structuring & legal assistance',
      'Long-term capital appreciation & yield modeling',
      'Bespoke unit consolidation & custom layout tailoring',
    ],
  },
  {
    id: 'estate-management',
    icon: Building2,
    title: 'Luxury Asset & Estate Stewardship',
    subtitle: 'Preserving pristine condition and hospitality-level care.',
    description:
      'We safeguard long-term property valuation by maintaining full operational custody of our communities post-completion, providing white-glove concierge and preventative technical maintenance.',
    deliverables: [
      '24/7 biometric security & digital concierge coordination',
      'Smart EV charging infrastructure maintenance',
      'Dedicated landscape horticulturists & water feature care',
      'Vetted tenant screening & rental management services',
    ],
  },
]

const WORKFLOW = [
  {
    step: '01',
    title: 'Site Vision & Curation',
    description:
      'Exhaustive location analysis in central Bangkok corridors to select parcels that offer enduring tranquility and capital stability.',
  },
  {
    step: '02',
    title: 'Architectural Thesis',
    description:
      'Formulating unique spatial proportions, natural cross-ventilation corridors, and private elevator foyers tailored to the site.',
  },
  {
    step: '03',
    title: 'Precision Craftsmanship',
    description:
      'Direct procurement of noble materials and relentless structural oversight to guarantee multi-generational durability.',
  },
  {
    step: '04',
    title: 'Lifetime Stewardship',
    description:
      'Flawless white-glove handover followed by proactive long-term asset management and concierge services.',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] pt-28 md:pt-36 pb-24">
      {/* ── Page Header ── */}
      <section className="container-large mb-20 md:mb-28">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#8FA5B3]" />
            <span className="text-xs font-medium tracking-[0.35em] uppercase text-[#8FA5B3]">
              Integrated Property Capabilities
            </span>
          </div>

          <h1 className="heading-h1 text-[#EAF3FB] mb-8">
            Bespoke Architecture, Interior Curation &amp; Private Advisory
          </h1>

          <p className="text-lg md:text-xl font-light text-[#D4DDE3]/85 leading-relaxed max-w-3xl">
            The Creators HQ operates as an end-to-end luxury space maker. We bridge vision, master
            craftsmanship, and discrete advisory to deliver residences of extraordinary lasting value.
          </p>
        </motion.div>
      </section>

      {/* ── Services Detailed Grid ── */}
      <section className="container-large mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="p-8 sm:p-12 rounded-sm bg-[#161C26]/70 border border-[#1E2633] hover:border-[#2A3649] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-sm bg-[#1E2633] flex items-center justify-center text-[#D4DDE3] mb-8">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  <h2 className="text-2xl font-light text-[#EAF3FB] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-xs font-medium tracking-wider uppercase text-[#8FA5B3] mb-6">
                    {service.subtitle}
                  </p>

                  <p className="text-sm font-light text-[#D4DDE3]/80 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-6 border-t border-[#1E2633]">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-[#D4DDE3]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Workflow Methodology ── */}
      <section className="bg-[#161C26]/60 py-24 md:py-32 border-y border-[#1E2633] mb-28">
        <div className="container-large">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
              Methodology
            </p>
            <h2 className="heading-h2 text-[#EAF3FB]">
              Our Four Stages of Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW.map(({ step, title, description }) => (
              <div
                key={step}
                className="p-8 rounded-sm bg-[#0D1117]/80 border border-[#1E2633] relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-3xl font-light text-[#8FA5B3] block mb-4 border-b border-[#1E2633] pb-3">
                    {step}
                  </span>
                  <h3 className="text-lg font-normal text-[#EAF3FB] mb-3">
                    {title}
                  </h3>
                  <p className="text-xs font-light text-[#8FA5B3] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="container-large">
        <div className="p-8 sm:p-14 rounded-sm bg-[#161C26] border border-[#1E2633] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8FA5B3] block mb-2">
              Bespoke Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#EAF3FB] mb-2">
              Discuss Your Project With Our Advisory Board
            </h2>
            <p className="text-sm font-light text-[#D4DDE3]/80 max-w-xl">
              Arrange an executive consultation regarding joint developments, acquisitions, or private portfolio management.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 btn-primary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase shrink-0"
          >
            <span>Book Consultation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
