import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Compass,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Award,
  Gem,
  Leaf,
  Users,
} from 'lucide-react'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

const TIMELINE_EVENTS = [
  {
    year: '2015',
    title: 'Inception of The Creators HQ',
    description:
      'Established in Bangkok with a radical vision: rejecting repetitive developer formulas to champion tailored architectural spaces centered on human wellness.',
  },
  {
    year: '2017',
    title: 'C Ekkamai Milestone',
    description:
      'Unveiled our premier 44-story skyline tower on Sukhumvit 63, earning critical acclaim for elevating high-density vertical living into an art form.',
  },
  {
    year: '2019',
    title: 'Common TU Community Hub',
    description:
      'Pioneered human-scale co-living with Common TU, selling out in record time and setting new benchmarks for university-adjacent student residences.',
  },
  {
    year: '2022',
    title: 'Corner Ratchathewi',
    description:
      'Launched an iconic high-rise 300 meters from BTS Ratchathewi, blending skyline hydroponic gardens with dual-key layouts for global citizens.',
  },
  {
    year: '2024',
    title: 'Curva Ekkamai Boutique Release',
    description:
      'Engineered an ultra-exclusive 12-unit low-rise sanctuary showcasing fluid curved facades and private botanical courtyard lift entries.',
  },
  {
    year: '2025',
    title: 'CIRA Residences Flagship',
    description:
      'Introduced our crown jewel: ultra-luxury private detached houses in prime central Bangkok starting at 125 MB, designed for multi-generational wealth preservation.',
  },
]

const VALUES = [
  {
    icon: Gem,
    title: 'Authentic Craftsmanship',
    description:
      'We curate raw, noble materials—hand-selected Italian marbles, solid natural timber, and tactile stone—that age gracefully with time.',
  },
  {
    icon: Layers,
    title: 'Bespoke Individuality',
    description:
      'No two developments share the same blueprint. Every residence is an original architectural thesis responding to its specific urban setting.',
  },
  {
    icon: Leaf,
    title: 'Ecological Intelligence',
    description:
      'Integrating natural cross-ventilation, microclimate courtyards, and smart energy grids to minimize environmental footprints sustainably.',
  },
  {
    icon: Users,
    title: 'Multi-Generational Vision',
    description:
      'Our spaces are conceived as lasting legacies, offering enduring functional flexibility for families across multiple life chapters.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] pt-28 md:pt-36 pb-24">
      {/* ── Visionary Hero Section ── */}
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
              About The Creators HQ
            </span>
          </div>

          <h1 className="heading-h1 text-[#EAF3FB] mb-8">
            Crafting Habitats Where Architecture Meets The Human Soul
          </h1>

          <p className="text-lg md:text-2xl font-light text-[#D4DDE3] leading-relaxed mb-8">
            We are space makers. Since 2015, we have reshaped the Bangkok skyline by delivering
            residences that transcend utilitarian shelters—crafting living works of art that nurture
            clarity, connection, and timeless distinction.
          </p>
        </motion.div>

        {/* Hero visual banner */}
        <div className="relative h-[380px] sm:h-[480px] md:h-[560px] w-full overflow-hidden rounded-sm border border-[#1E2633] mt-8">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="The Creators HQ architectural vision"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-[#0D1117]/30" />
        </div>
      </section>

      {/* ── Core Philosophy Narrative ── */}
      <section className="container-large mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
              The Manifesto
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#EAF3FB] leading-snug">
              Every Square Meter Must Have Purpose and Emotion
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base md:text-lg font-light text-[#D4DDE3]/85 leading-relaxed">
            <p>
              In a rapidly modernizing metropolis like Bangkok, high-density residential towers too
              frequently succumb to repetitive grids and disposable materials. The Creators HQ was
              founded as a deliberate counterweight to this commodification.
            </p>
            <p>
              We believe great architecture is experienced from the inside out: how morning sunlight
              filters through a bespoke louver, how natural acoustic dampening creates quietude in a
              vibrant district, and how spatial proportions instill tranquility after demanding days.
            </p>
            <p>
              By collaborating exclusively with award-winning master planners, structural innovators,
              and landscape visionaries, each development under our banner is an enduring testament
              to elevated living.
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline Milestone Block ── */}
      <section className="bg-[#161C26]/60 py-24 md:py-32 border-y border-[#1E2633] mb-28">
        <div className="container-large">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
              A Decade of Distinction
            </p>
            <h2 className="heading-h2 text-[#EAF3FB]">
              Our Journey &amp; Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TIMELINE_EVENTS.map(({ year, title, description }) => (
              <div
                key={year}
                className="p-8 rounded-sm bg-[#0D1117]/70 border border-[#1E2633] hover:border-[#2A3649] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-light text-[#EAF3FB] tracking-wider block mb-4 border-b border-[#1E2633] pb-3">
                    {year}
                  </span>
                  <h3 className="text-lg font-normal text-[#EAF3FB] mb-3">
                    {title}
                  </h3>
                  <p className="text-sm font-light text-[#8FA5B3] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values Grid ── */}
      <section className="container-large mb-28">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
            Guiding Principles
          </p>
          <h2 className="heading-h2 text-[#EAF3FB]">
            The Pillars of Our Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-sm bg-[#161C26]/40 border border-[#1E2633] hover:border-[#2A3649] transition-all group"
            >
              <div className="h-10 w-10 rounded-sm bg-[#1E2633] flex items-center justify-center text-[#D4DDE3] mb-6 group-hover:bg-[#2A3649] group-hover:text-white transition-all">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-normal text-[#EAF3FB] mb-3">
                {title}
              </h3>
              <p className="text-xs font-light text-[#8FA5B3] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="container-large">
        <div className="p-8 sm:p-14 rounded-sm bg-[#161C26] border border-[#1E2633] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8FA5B3] block mb-2">
              Explore Our Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#EAF3FB] mb-2">
              Ready to Discover Your Next Sanctuary?
            </h2>
            <p className="text-sm font-light text-[#D4DDE3]/80 max-w-xl">
              From super-luxury detached villas to landmark skyline condominiums, tour our complete portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 btn-primary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 btn-secondary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
