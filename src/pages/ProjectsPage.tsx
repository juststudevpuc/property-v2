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
    <div className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      {/* ── Split Layout Container ── */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* ── Left Sidebar (Sticky Category Menu) ── */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="sticky top-32 flex flex-col items-start gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left text-3xl lg:text-5xl font-light tracking-tight transition-colors duration-300 focus:outline-none ${
                    isActive
                      ? 'text-slate-900 font-normal'
                      : 'text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </aside>

        {/* ── Right Column (Project Stack) ── */}
        <main className="col-span-12 md:col-span-8 lg:col-span-9">
          <motion.div layout className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.165, 0.84, 0.44, 1] }}
                >
                  <Link
                    to={`/project/${project.slug}`}
                    className="relative block w-full h-[50vh] md:h-[60vh] overflow-hidden group"
                  >
                    {/* Background Project Image */}
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Logo/Title Overlay in Top Right */}
                    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 text-right pointer-events-none">
                      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                        {project.name}
                      </h2>
                      {project.tagline && (
                        <p className="text-white/85 text-xs sm:text-sm font-light tracking-widest uppercase mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                          {project.tagline}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-24 text-center border border-dashed border-slate-200 rounded-sm">
              <p className="text-slate-400 text-sm tracking-widest uppercase">
                No projects found in this category.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
