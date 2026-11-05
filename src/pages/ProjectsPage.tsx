import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/types'

const CATEGORIES = ['All Projects', 'Condominium', 'Detached House'] as const
type Category = (typeof CATEGORIES)[number]

function isDetachedHouse(project: Project): boolean {
  return Boolean(
    project.id === 'cira-residences' ||
      project.tagline?.toLowerCase().includes('detached house') ||
      project.tags?.some(
        (t) =>
          t.toLowerCase().includes('detached house') ||
          t.toLowerCase().includes('villa')
      )
  )
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All Projects')

  const categoryCounts = useMemo(() => {
    return {
      'All Projects': PROJECTS.length,
      'Condominium': PROJECTS.filter((p) => !isDetachedHouse(p)).length,
      'Detached House': PROJECTS.filter(isDetachedHouse).length,
    }
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') return PROJECTS
    if (activeCategory === 'Detached House') {
      return PROJECTS.filter(isDetachedHouse)
    }
    if (activeCategory === 'Condominium') {
      return PROJECTS.filter((p) => !isDetachedHouse(p))
    }
    return PROJECTS
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink pt-32 sm:pt-40 pb-28 select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ── Page Header & Monograph Eyebrow ──────────────────── */}
        <header className="border-b border-greyon-stone/40 pb-10 mb-14 sm:mb-20">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep">
            Portfolio Archive
          </p>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-greyon-ink">
              Selected Residences
            </h1>
            <p className="font-body italic text-greyon-muted text-sm sm:text-base max-w-md">
              A curated collection of bespoke habitats defined by spatial purity, noble materials, and quiet distinction.
            </p>
          </div>
        </header>

        {/* ── Split Layout: Sticky Index + Exhibition Stack ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Sidebar (Editorial Category Menu) ─────────── */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-40 flex flex-col items-start border-l border-greyon-stone/50 pl-6 space-y-6">
              <nav className="flex flex-row lg:flex-col flex-wrap gap-4 lg:gap-5 w-full">
                {CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategory === cat
                  const count = categoryCounts[cat]
                 
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className="group flex items-baseline justify-between w-full text-left py-1 focus:outline-none transition-all duration-300"
                    >
                      <div className="flex items-baseline space-x-3">
                        <span
                          className={`font-display text-xs tracking-wider transition-colors duration-300 ${
                            isActive
                              ? 'text-greyon-gold-deep font-medium'
                              : 'text-greyon-stone group-hover:text-greyon-muted'
                          }`}
                        >
                          
                        </span>
                        <span
                          className={`font-display text-xl sm:text-2xl font-light tracking-tight transition-all duration-300 ${
                            isActive
                              ? 'text-greyon-ink font-normal translate-x-1'
                              : 'text-greyon-muted/60 group-hover:text-greyon-ink'
                          }`}
                        >
                          {cat}
                        </span>
                      </div>

                      <span
                        className={`font-display text-xs tracking-widest transition-colors duration-300 pl-4 ${
                          isActive
                            ? 'text-greyon-gold-deep'
                            : 'text-greyon-stone group-hover:text-greyon-muted'
                        }`}
                      >
                        
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* ── Right Column (Sharp Monolith Project Exhibition) ── */}
          <main className="lg:col-span-9">
            <motion.div layout className="flex flex-col space-y-12 sm:space-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative"
                  >
                    <Link
                      to={`/project/${project.slug || project.id}`}
                      className="block focus:outline-none"
                    >
                      {/* Image Canvas with Crisp Geometry */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-none bg-greyon-sand border border-greyon-stone/30">
                        <img
                          src={project.coverImage}
                          alt={project.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />

                        {/* Quiet Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/80 via-greyon-dark/20 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />

                        {/* Top Metadata Bar */}
                        <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-between text-white/80 pointer-events-none">
                          <span className="font-display text-xs tracking-[0.25em] uppercase text-greyon-gold">
                            Residences — {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display text-xs tracking-widest uppercase text-white/70">
                            {isDetachedHouse(project) ? 'Detached House' : 'Condominium'}
                          </span>
                        </div>

                        {/* Bottom Editorial Caption */}
                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                          <div className="max-w-xl">
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">
                              {project.name}
                            </h2>
                            {project.tagline && (
                              <p className="mt-2 font-body italic text-xs sm:text-sm text-greyon-sand/85 font-light leading-relaxed">
                                {project.tagline}
                              </p>
                            )}
                          </div>

                          {/* Hover Trigger Cue */}
                          <div className="inline-flex items-center space-x-2 border-b border-greyon-gold/50 pb-1 self-start md:self-end">
                            <span className="font-display text-xs tracking-widest uppercase text-white group-hover:text-greyon-gold transition-colors duration-300">
                              Explore Residence
                            </span>
                            <span className="text-greyon-gold text-sm transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="py-28 text-center border border-greyon-stone/40 bg-white/40">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-greyon-muted">
                  No residences cataloged in this classification.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}