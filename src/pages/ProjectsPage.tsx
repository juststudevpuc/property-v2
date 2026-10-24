import { useState, useMemo } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, SlidersHorizontal } from 'lucide-react'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'

type FilterStatus = 'all' | 'available' | 'sold-out'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterStatus>('all')

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return PROJECTS
    return PROJECTS.filter((p) => p.status === filter)
  }, [filter])

  const counts = useMemo(
    () => ({
      all: PROJECTS.length,
      available: PROJECTS.filter((p) => p.status === 'available').length,
      'sold-out': PROJECTS.filter((p) => p.status === 'sold-out').length,
    }),
    []
  )

  return (
    <div className="min-h-screen bg-[#0D1117] pt-28 md:pt-36 pb-24">
      {/* ── Page Header ── */}
      <section className="container-large mb-16 md:mb-20">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#8FA5B3]" />
            <span className="text-xs font-medium tracking-[0.35em] uppercase text-[#8FA5B3]">
              Portfolio &amp; Architecture
            </span>
          </div>

          <h1 className="heading-h1 text-[#EAF3FB] mb-6">
            Signature Residences &amp;<br />
            Bangkok Landmarks
          </h1>

          <p className="text-base sm:text-lg font-light text-[#D4DDE3]/80 leading-relaxed max-w-2xl">
            Explore our curated collection of super-luxury detached homes, boutique low-rise
            sanctuaries, and iconic skyline towers. Each residence embodies human-centric space
            design and timeless craftsmanship.
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <div className="mt-12 pt-8 border-t border-[#1E2633] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8FA5B3] mr-2">
              <SlidersHorizontal size={14} />
              <span className="tracking-widest uppercase">Filter:</span>
            </div>

            {(
              [
                { id: 'all', label: 'All Residences' },
                { id: 'available', label: 'Available for Viewing' },
                { id: 'sold-out', label: 'Sold Out / Archive' },
              ] as const
            ).map((tab) => {
              const active = filter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                    active
                      ? 'bg-[#D4DDE3] text-[#0D1117]'
                      : 'bg-[#161C26] text-[#8FA5B3] hover:text-[#D4DDE3] border border-[#1E2633]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      active
                        ? 'bg-[#0D1117] text-[#D4DDE3]'
                        : 'bg-[#1E2633] text-[#8FA5B3]'
                    }`}
                  >
                    {counts[tab.id]}
                  </span>
                </button>
              )
            })}
          </div>

          <span className="text-xs text-[#8FA5B3] tracking-widest font-mono">
            Showing {filteredProjects.length} of {PROJECTS.length} Projects
          </span>
        </div>
      </section>

      {/* ── Projects Responsive Grid ── */}
      <section className="container-large">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-dashed border-[#1E2633] rounded-sm">
            <p className="text-[#8FA5B3] text-sm tracking-widest uppercase">
              No projects found in this category.
            </p>
          </div>
        )}

        {/* ── Bottom Inquiries Card ── */}
        <div className="mt-24 p-8 sm:p-12 rounded-sm bg-[#161C26]/60 border border-[#1E2633] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#8FA5B3] block mb-2">
              Private Client Advisory
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#EAF3FB] mb-2">
              Seeking a Tailored Investment Consultation?
            </h2>
            <p className="text-sm font-light text-[#D4DDE3]/80 max-w-xl">
              Connect with our property consultants to receive confidential architectural brochures,
              custom floor plans, and priority viewing invitations.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 btn-primary px-8 py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase shrink-0"
          >
            <span>Book Consultation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
